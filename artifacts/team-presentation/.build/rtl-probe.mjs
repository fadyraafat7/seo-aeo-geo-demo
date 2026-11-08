import fs from 'node:fs/promises';
import {Presentation} from '@oai/artifact-tool';
const p=Presentation.create({slideSize:{width:1280,height:720}});const s=p.slides.add();s.background.fill='#ffffff';
const base='الظهور في البحث وإجابات الذكاء الاصطناعي';
const values=[base.replaceAll(' ','\u00A0'),base.replaceAll(' ','\u202F'),base.replaceAll(' ','\u2007'),base.replaceAll(' ','\u2009'),base.replaceAll(' ','\u2060 \u2060')];
for(let i=0;i<values.length;i++){const t=s.shapes.add({geometry:'textbox',position:{left:80,top:55+i*125,width:1100,height:95},fill:'none'});t.text=values[i];t.text.style={fontSize:38,typeface:'Arial',alignment:'right'};}
await fs.writeFile('artifacts/team-presentation/.build/rtl-probe.png',new Uint8Array(await (await p.export({slide:s,format:'png',scale:1})).arrayBuffer()));
