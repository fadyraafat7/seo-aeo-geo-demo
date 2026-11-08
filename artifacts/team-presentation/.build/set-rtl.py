"""Set native paragraph direction in the Artifact Tool export; retain editable text."""
import re
import sys
import zipfile
from lxml import etree as ET

source, target = sys.argv[1:]
A = 'http://schemas.openxmlformats.org/drawingml/2006/main'
NS = {'a': A}
changed = 0
with zipfile.ZipFile(source) as original, zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as output:
    for entry in original.infolist():
        data = original.read(entry.filename)
        if re.fullmatch(r'ppt/(slides/slide\d+|notesSlides/notesSlide\d+)\.xml', entry.filename):
            root = ET.fromstring(data)
            for paragraph in root.findall('.//a:p', NS):
                text = ''.join(paragraph.itertext())
                if not re.search('[\u0600-\u06ff]', text):
                    continue
                props = paragraph.find('a:pPr', NS)
                if props is None:
                    props = ET.Element(f'{{{A}}}pPr')
                    paragraph.insert(0, props)
                props.set('rtl', '1')
                for run in paragraph.findall('a:r', NS):
                    rpr = run.find('a:rPr', NS)
                    if rpr is None:
                        rpr = ET.Element(f'{{{A}}}rPr')
                        run.insert(0, rpr)
                    rpr.set('lang', 'ar-SA')
                    cs = rpr.find('a:cs', NS)
                    if cs is None:
                        cs = ET.SubElement(rpr, f'{{{A}}}cs')
                    cs.set('typeface', 'Arial')
                changed += 1
            data = ET.tostring(root, xml_declaration=True, encoding='UTF-8', standalone=True)
        output.writestr(entry, data)
print(f'Set native RTL direction on {changed} Arabic paragraphs. Text remains in logical reading order.')
