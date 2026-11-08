import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const ROOT = process.cwd();
const BUILD = path.join(ROOT, 'artifacts/team-presentation/.build');
const OUT = path.join(ROOT, 'artifacts/team-presentation/output');
const SKILL = 'C:/Users/Tech House/.codex/plugins/cache/openai-primary-runtime/presentations/26.1104.22356/skills/presentations';
const PYTHON = 'C:/Users/Tech House/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
process.env.RUNTIME_NODE_MODULES='C:/Users/Tech House/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const {finalizePresentation} = await import(pathToFileURL(path.join(SKILL, 'container_tools/artifact_tool_utils.mjs')));
const measured = JSON.parse(await fs.readFile(path.join(ROOT,'artifacts/lighthouse/summary.json'),'utf8'));
const mobile = measured.reports.find(r=>r.device==='mobile');
const desktop = measured.reports.find(r=>r.device==='desktop');
const presentation = Presentation.create({slideSize:{width:1280,height:720}});
const C = {bg:'#F6F5F1',ink:'#172233',muted:'#4D5A6C',purple:'#674DA5',green:'#326C56',blue:'#2D638E',white:'#FFFFFF'};
const fontPolicy = {basis:'design',families:['Arial','Consolas']};
const allNotes=[];
function txt(slide,name,text,x,y,w,h,size=28,color=C.ink,bold=false,align='right',font='Arial'){
  const s=slide.shapes.add({geometry:'textbox',name,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  s.text=text;s.text.style={typeface:font,fontSize:size,color,bold,alignment:align,verticalAlignment:'middle',insets:0,autoFit:'none',wrap:'square'};return s;
}
function page(title,notes,{dark=false}={}){
  const s=presentation.slides.add();s.background.fill=dark?C.ink:C.bg;
  if(title)txt(s,'slide-title',title,72,48,1136,92,43,dark?C.white:C.ink,true);
  const number=presentation.slides.items.length;
  txt(s,'slide-number',String(number).padStart(2,'0'),72,663,60,26,17,dark?'#C6D0DF':C.muted,false,'left');
  txt(s,'footer','Signal Lab',1010,663,198,26,17,dark?'#C6D0DF':C.muted,false,'right');
  s.speakerNotes.text=notes;allNotes.push({slide:number,title,notes});return s;
}
function paragraphs(s,lines,{x=98,y=175,w=1085,size=29,gap=94,color=C.ink}={}){lines.forEach((line,i)=>txt(s,`paragraph-${i}`,line,x,y+i*gap,w,gap-16,size,color));}
function code(s,value,{x=80,y=200,w=630,h=340,size=24}={}){return txt(s,'code-excerpt',value,x,y,w,h,size,C.purple,false,'left','Consolas');}
function table(s,values,{x=72,y=180,w=1136,h=360,widths,size=26}={}){
  const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:h,values,columnWidths:widths});
  t.styleOptions={headerRow:true,bandedRows:false};
  t.borders.assign({fill:'#D5D8DE',width:1,style:'solid'});
  for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){
    const cell=t.getCell(r,c);cell.fill=r===0?C.ink:(r%2===0?'#ECEEEB':C.white);
    cell.text.style={fontSize:size,typeface:'Arial',color:r===0?C.white:C.ink,bold:r===0,alignment:c===values[0].length-1?'right':'center',verticalAlignment:'middle',insets:14,autoFit:'none'};
  }return t;
}
const projectSource='المصدر: ملفات المشروع المحلي src/App.jsx وsrc/site.js وscripts/prerender.mjs وscripts/check.mjs.';
const measureSource=`مصدر القياس: artifacts/lighthouse/summary.json، Lighthouse ${mobile.lighthouseVersion}، تشغيل الموبايل ${mobile.fetchedAt} وتشغيل الكمبيوتر ${desktop.fetchedAt}.`;

// 1 — cover
{
const s=page('',`المدة: 30 ثانية.\nالكلام اللي تقوله:\nإحنا النهارده هنشرح إزاي صفحة React تبقى مفهومة لمحركات البحث، وتجاوب سؤال المستخدم بوضوح، وتقدم محتوى ينفع كمصدر لإجابات الذكاء الاصطناعي. هنستخدم مشروع Signal Lab، ونربط كل فكرة بمثال من الكود ونتيجة نقدر نقيسها. العرض حوالي 12 إلى 15 دقيقة، وبعده نفتح الديمو سوا.\n${projectSource}`,{dark:true});
txt(s,'cover-title','الظهور في البحث\nوإجابات الذكاء الاصطناعي',100,130,1080,190,59,C.white,true);
txt(s,'cover-terms','SEO   /   AEO   /   GEO',100,350,1080,72,42,'#D1C2FF',true);
txt(s,'cover-subtitle','شرح للفريق بأمثلة من React ونتائج القياس المحلي',100,460,1080,80,29,'#DEE5ED');
txt(s,'cover-date','8 نوفمبر 2026',100,582,1080,35,22,'#C6D0DF');
}
// 2 — concepts
{
const s=page('الفرق بين SEO وAEO وGEO',`المدة: دقيقة.\nالكلام اللي تقوله:\nSEO بيركز على اكتشاف الصفحة وفهم موضوعها وظهورها في نتائج البحث. AEO بيركز على تقديم إجابة مباشرة ومفهومة لسؤال المستخدم. GEO بيركز على جودة المحتوى كمصدر داخل إجابات الذكاء الاصطناعي. المصطلحات متداخلة، والحدود بينها مش موحدة في السوق. بالتالي إحنا مش بنبني ثلاث صفحات مختلفة، ولا عندنا إعداد واحد يضمن أي نتيجة. نفس المحتوى والأساس التقني بيخدموا الأهداف دي بدرجات مختلفة.\nالمراجع: https://developers.google.com/search/docs/appearance/ai-features وhttps://arxiv.org/abs/2311.09735`);
table(s,[['مثال للظهور','التركيز','المفهوم'],['رابط داخل نتائج البحث','اكتشاف الصفحة وفهم موضوعها','SEO'],['إجابة واضحة على سؤال','صياغة الإجابة وتنظيمها','AEO'],['رابط مصدر في إجابة AI','محتوى دقيق يستحق الرجوع إليه','GEO']],{h:340,widths:[420,480,236],size:27});
txt(s,'overlap','الممارسات متداخلة، ونتائج الظهور تعتمد على كل محرك',90,559,1100,55,28,C.purple,true);
}
// 3 — actual project
{
const s=page('مشروع Signal Lab',`المدة: 45 ثانية.\nالكلام اللي تقوله:\nده المشروع اللي هنشرح عليه. هو صفحة عامة مبنية بـReact وVite، وفيها مقال يشرح قابلية اكتشاف صفحات React. الصفحة نفسها بتعرض شرح SEO وAEO وGEO، وتخلينا نشوف مقتطفات الكود وأدوات القياس. لقطة الشاشة دي من المشروع الفعلي. الأزرار والتبويبات للتعليم والتجربة، واختيار GEO مثلًا مش بيشغل وضع AI خفي. الممارسات الأساسية موجودة في الصفحة بالفعل.\nالديمو عند الحاجة: افتح http://127.0.0.1:5173/ واضغط Explore the example.\nالمصدر: artifacts/desktop.jpg وsrc/App.jsx.`);
const image=await fs.readFile(path.join(ROOT,'artifacts/desktop.jpg'));
s.images.add({blob:image.buffer.slice(image.byteOffset,image.byteOffset+image.byteLength),contentType:'image/jpeg',alt:'لقطة فعلية من صفحة Signal Lab',fit:'contain',position:{left:72,top:175,width:640,height:420}});
txt(s,'project-description','React + Vite',760,190,440,65,36,C.purple,true,'right');
paragraphs(s,['صفحة عامة بمحتوى جاهز في HTML','مقال بإجابة مباشرة ومصادر أصلية','تبويبات تعليمية وفحوص محلية'],{x:760,y:285,w:440,size:26,gap:105});
}
// 4 — rendering
{
const s=page('توليد الصفحة وإضافة التفاعل',`المدة: دقيقة.\nالكلام اللي تقوله:\nأهم قرار تقني عندنا إن المحتوى الأساسي بيتولد قبل ما JavaScript يشتغل في المتصفح. أثناء البناء، renderToString بيحوّل App إلى HTML. سكربت prerender بيجمعه مع العنوان والوصف والبيانات المنظمة في dist/index.html. أول ما المتصفح يستقبل الصفحة يقدر يعرض المقال. بعدها hydrateRoot بيربط React بالمحتوى الموجود ويضيف التبويبات والأزرار. في الإنتاج ده توليد ثابت وقت البناء، أما سيرفر التطوير فبيرندر عند الطلب. Google يقدر يرندر JavaScript، لكن قدرات الزحف بتختلف بين الأنظمة.\nالمراجع: src/entry-server.jsx، src/entry-client.jsx، scripts/prerender.mjs، https://react.dev/reference/react-dom/server/renderToString وhttps://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`);
table(s,[['النتيجة','الملف أو الدالة','المرحلة'],['محتوى React يصبح HTML','renderToString(<App />)','1. وقت البناء'],['ملف HTML بالـmetadata','scripts/prerender.mjs','2. التجميع'],['المقال جاهز للقراءة','dist/index.html','3. أول استجابة'],['التبويبات والأزرار تعمل','hydrateRoot(...)','4. التفاعل']],{h:360,widths:[425,430,281],size:26});
txt(s,'render-note','المحتوى الأساسي يظل موجودًا عند تعطيل JavaScript',90,575,1100,50,28,C.green,true);
}
// 5 — SEO
{
const s=page('تطبيق SEO في الكود',`المدة: دقيقة.\nالكلام اللي تقوله:\nفي src/site.js بنحدد عنوان الصفحة ووصفها مرة واحدة، وبعدها renderHead بيكتب عناصر head في HTML الأصلي. title بيوضح الموضوع، وdescription بيوفر وصفًا ممكن محرك البحث يستخدمه أو يختار بدلًا منه نصًا من الصفحة. canonical بيحدد الرابط الأساسي المفضل لنفس المحتوى. كمان بنولد sitemap وrobots.txt للاكتشاف والزحف. روابط Open Graph بتخدم المشاركة الاجتماعية. كل دي أساسيات، لكن وجودها مش وعد بالفهرسة أو الترتيب. الدومين example.com في المثال مؤقت، ولازم نضبط SITE_URL قبل النشر.\nاعرض View Page Source وابحث عن title وcanonical.\nالمصادر: src/site.js وscripts/files.mjs وhttps://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`);
code(s,'<title>React SEO, AEO & GEO</title>\n\n<meta name="description"\n  content="A practical React guide" />\n\n<link rel="canonical"\n  href="https://your-domain.com/" />',{w:650,h:360,size:23});
paragraphs(s,['عنوان يوضح موضوع الصفحة','وصف مختصر للمحتوى','رابط أساسي متسق مع sitemap'],{x:775,y:205,w:425,size:28,gap:105});
txt(s,'seo-file','src/site.js',80,590,600,35,21,C.muted,false,'left','Consolas');
}
// 6 — AEO
{
const s=page('تطبيق AEO في المقال',`المدة: دقيقة.\nالكلام اللي تقوله:\nهنا بنبدأ بسؤال محدد: إزاي نخلي صفحة React قابلة للاكتشاف؟ وتحته إجابة مباشرة تقدر تفهمها لوحدها. بعد الإجابة بنعرض خطوات وتفاصيل، وبعدها أسئلة شائعة. استخدام h2 وh3 بيوضح ترتيب الأفكار. data-direct-answer مجرد علامة داخلية اخترناها عشان كود الفحص يلاقي الإجابة، ومش معيار رسمي لمحركات الإجابة. الأسئلة الشائعة بتستخدم details وsummary، فالإجابات موجودة في HTML وفتحها بيشتغل حتى من غير React. وضوح الإجابة يخدم القارئ ويخلي المحتوى أسهل في الفهم، لكنه مش ضمان لاختيار الإجابة في البحث.\nالمصدر: src/App.jsx، مكونا ExampleArticle وQuestions.`);
txt(s,'question','How do you make a React\npage discoverable?',80,195,670,120,36,C.purple,true,'left');
txt(s,'answer','Pre-render your main content into HTML,\nadd descriptive page metadata, and answer\nthe visitor’s question clearly.',80,345,670,145,28,C.ink,false,'left');
paragraphs(s,['سؤال المستخدم في العنوان','إجابة مباشرة قبل التفاصيل','خطوات وأسئلة متابعة واضحة'],{x:795,y:210,w:405,size:29,gap:105});
txt(s,'aeo-file','src/App.jsx / ExampleArticle',80,590,800,35,21,C.muted,false,'left','Consolas');
}
// 7 — GEO
{
const s=page('تطبيق GEO وجودة المصدر',`المدة: دقيقة.\nالكلام اللي تقوله:\nعشان المحتوى ينفع كمصدر، لازم القارئ يقدر يعرف مين نشره ويراجع الكلام اللي فيه. المثال بيذكر Signal Lab كناشر تعليمي، وبيربط النص بتوثيق Google الأصلي. مفيش خبرة أو قياسات مختلقة. JSON-LD بيوصف المقال والناشر ويربطهم بمعرفات واضحة. ده وصف للكيانات الموجودة في الصفحة، مش شيفرة خاصة تجبر AI يستشهد بينا. Google بيقول إن ميزات AI في البحث مش محتاجة schema مخصوصة أو ملف AI خاص. في موقع حقيقي، تجاربنا الأصلية وبياناتنا الموثقة تضيف قيمة أكبر من إعادة كتابة نصائح عامة.\nالمراجع: src/site.js، src/App.jsx، https://developers.google.com/search/docs/appearance/ai-features`);
code(s,'{\n  "@type": "Article",\n  "mainEntityOfPage": "https://site.com/",\n  "author": {\n    "@id": "https://site.com/#organization"\n  }\n}',{w:680,h:340,size:23});
paragraphs(s,['جهة نشر واضحة','مصادر أصلية تدعم الكلام','بيانات منظمة تطابق المحتوى'],{x:805,y:205,w:395,size:29,gap:105});
txt(s,'geo-note','JSON-LD يصف المقال والناشر، والاستشهاد يظل قرار المحرك',90,575,1100,55,27,C.green,true);
}
// 8 — breadcrumb
{
const s=page('إصلاح BreadcrumbList',`المدة: 50 ثانية.\nالكلام اللي تقوله:\nكان عندنا BreadcrumbList فيه عنصر واحد للصفحة الرئيسية. Google بيشترط عنصرين على الأقل لظهور breadcrumb، ولازم الوصف يعكس تنقلًا حقيقيًا. بما إن مشروعنا صفحة واحدة، الحل كان حذف الوصف غير المناسب. لما يبقى عندنا صفحات فعلية زي الرئيسية ثم الأدلة ثم المقال، نقدر نضيف وصفًا يطابق المسار الظاهر. أضفنا اختبار يمنع رجوع BreadcrumbList للصفحة الحالية، وباقي Organization وArticle اتفضلوا موجودين. المثال بيوضح فرق مهم: JSON سليم من ناحية الصياغة ممكن يفضل غير مناسب للمحتوى أو شروط Google.\nالمراجع: src/site.js، scripts/check.mjs، https://developers.google.com/search/docs/appearance/structured-data/breadcrumb`);
table(s,[['بعد الإصلاح','قبل الإصلاح'],['Organization وArticle','BreadcrumbList بعنصر واحد'],['وصف يطابق الصفحة الرئيسية','تسلسل صفحات غير موجود'],['اختبار يمنع رجوع المشكلة','فحص JSON لا يكفي وحده']],{y:190,h:300,widths:[568,568],size:29});
txt(s,'checks-total','8 / 8',85,535,350,70,49,C.green,true,'center');
txt(s,'checks-label','فحوص البناء والـHTML نجحت',480,545,700,60,31,C.ink,true);
}
// 9 — tools
{
const s=page('أدوات القياس وحدودها',`المدة: دقيقة.\nالكلام اللي تقوله:\nكل أداة بتجاوب سؤال مختلف. محليًا نقدر نشغل فحص البناء والـHTML، ونستخدم Lighthouse للأداء وإمكانية الوصول والفحوص التقنية. Rich Results Test يقدر يفحص HTML بلصقه في Code mode، لكنه خدمة خارجية ولم نشغله ضمن القياس المحلي الحالي. بعد النشر، Search Console بيوضح الفهرسة وظهور البحث. Bing AI Performance بيوضح استشهادات ضمن تجارب Microsoft المدعومة. Analytics بيقيس الزيارات والنتائج اللي اتجمعت فعلًا. ذكر الموقع في إجابة من غير نقرة مش زيارة Analytics. ومفيش درجة موحدة معتمدة تغطي AEO وGEO في كل المحركات.\nالمراجع: https://developer.chrome.com/docs/lighthouse/overview، https://support.google.com/webmasters/answer/9012289/، https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c، public/answer-review.csv`);
table(s,[['وقت الاستخدام','ما الذي تقيسه؟','الأداة'],['محليًا','وجود المحتوى واتساق البيانات','npm run check'],['محليًا','الأداء والوصول وSEO التقني','Lighthouse'],['بعد النشر والتحقق','الفهرسة وظهور البحث','Search Console'],['بعد النشر والتحقق','استشهادات ضمن التغطية المدعومة','Bing AI Performance'],['بعد تفعيل التتبع','الزيارات والنتائج','Analytics']],{y:170,h:420,widths:[280,465,391],size:24});
}
// 10 — scores
{
const s=page('نتائج Lighthouse المحلية',`المدة: دقيقة.\nالكلام اللي تقوله:\nدي أحدث نتائج محفوظة في summary.json، وقياسها اتعمل على نسخة الإنتاج بالموبايل والكمبيوتر. الأداء سجل ${mobile.scores.performance} للموبايل و${desktop.scores.performance} للكمبيوتر. إمكانية الوصول 96 في الاتنين، وأفضل الممارسات وSEO التقني 100. التشغيل السابق اللي اتناقش في الشات وفي RESULTS.md كان 89 و97 للأداء. الاختلاف مش دليل تحسن من تعديل بعينه، لأن التشغيلات المعملية بتتأثر بالتوقيت والشبكة وحالة الجهاز. اخترنا أحدث الملفات الخام كمصدر للعرض، ومش بنخلط أرقام تشغيلين. درجة SEO هنا بتخص مجموعة فحوص تقنية، ولا تثبت الفهرسة أو ترتيب البحث.\n${measureSource}`);
table(s,[['الكمبيوتر','الموبايل','المقياس'],[String(desktop.scores.performance),String(mobile.scores.performance),'الأداء'],['96','96','إمكانية الوصول'],['100','100','أفضل الممارسات'],['100','100','SEO التقني']],{h:360,widths:[290,290,556],size:31});
txt(s,'scores-date','أحدث ملفات القياس: 8 نوفمبر 2026، تشغيل معملي واحد لكل جهاز',90,580,1100,45,23,C.muted);
}
// 11 — timing
{
const s=page('سرعة الظهور واستقرار الصفحة',`المدة: 55 ثانية.\nالكلام اللي تقوله:\nFCP بيقيس ظهور أول محتوى، وLCP بيقيس ظهور أكبر محتوى مرئي. في أحدث تشغيل الاتنين حوالَي 2.63 ثانية للموبايل و0.53 ثانية للكمبيوتر. أكبر عنصر في الموبايل هو عنوان الصفحة. TBT وصل 97 مللي ثانية للموبايل وصفر للكمبيوتر، وده مقياس حجب معملي مختلف عن INP الحقيقي. تحرك التخطيط كان صغير جدًا، حوالي 0.005 للموبايل و0.004 للكمبيوتر. النتيجة بتقول إن الصفحة مستقرة، لكن تجربة الموبايل تستحق أولوية في تحسين ظهور المحتوى. دي بيانات مختبر وليست Core Web Vitals لمستخدمين حقيقيين.\n${measureSource}`);
table(s,[['الكمبيوتر','الموبايل','المقياس'],['0.53 ثانية','2.63 ثانية','FCP / أول محتوى'],['0.53 ثانية','2.63 ثانية','LCP / أكبر محتوى'],['0 ms','97 ms','TBT / وقت الحجب'],['0.004','0.005','CLS / تحرك التخطيط']],{h:360,widths:[290,290,556],size:28});
txt(s,'metrics-limit','TBT قياس معملي، وINP يحتاج بيانات تفاعل مستخدمين',90,580,1100,45,26,C.purple,true);
}
// 12 — findings
{
const s=page('الملاحظات التي تستحق التحسين',`المدة: دقيقة ونصف.\nالكلام اللي تقوله:\nأول أولوية هي القراءة والوصول. التقرير رصد تباينًا ضعيفًا في 117 عنصرًا بالموبايل و132 بالكمبيوتر. ده عدد عناصر متأثرة، مش عدد أسباب مستقلة، ودرجة 96 مش شهادة امتثال. عندنا كمان tabpanel على aside، والأفضل استخدام div مناسب للدور مع الحفاظ على الربط بالتبويب. اسم الشعار المتاح محتاج يطابق النص الظاهر. من ناحية الأداء، Google Fonts محملة بـCSS import، وده بيضيف سلسلة طلبات قبل الرسم. أحدث تقرير قدر فرصة توفير حوالي 1.36 ثانية للموبايل ضمن الموارد المعطلة للرسم، لكنه تقدير محتاج تجربة. رصدنا أيضًا حوالي 43 KiB JavaScript غير مستخدمة عند التحميل الأول، وبعضها بيخص تفاعل المستخدم لاحقًا.\nالمصدر: artifacts/lighthouse/mobile.json وdesktop.json، فحوص color-contrast وaria-allowed-role وlabel-content-name-mismatch وrender-blocking-resources وunused-javascript.`);
paragraphs(s,['تباين النصوص: 117 عنصرًا بالموبايل و132 بالكمبيوتر','ARIA: دور tabpanel واسم الشعار المقروء','الخطوط الخارجية: فرصة لتقليل تأخير الرسم','JavaScript: نحو 43 KiB غير مستخدمة عند التحميل الأول'],{y:174,gap:100,size:30});
txt(s,'findings-note','التقديرات تحدد أين نجرب التحسين، ثم نعيد القياس',90,595,1100,42,25,C.purple,true);
}
// 13 — demo
{
const s=page('خطوات الديمو وإعادة القياس',`المدة: دقيقة ونصف.\nالكلام اللي تقوله:\nهنفتح الموقع ونختار SEO ثم AEO ثم GEO، ونشوف كل تبويب بيشرح أي جزء. بعدها نضغط View code، ونلاحظ إن المعروض مقتطف تعليمي والكود الكامل في الملفات. نضغط Run page checks عشان نفحص DOM الحالي، ونفرّق ده عن فحص HTML النهائي. من التيرمنال نشغل npm run audit:local. الأمر بيبني المشروع، ويشغل الفحوص الثمانية، ويشغل Lighthouse على نسخة الإنتاج، ويحفظ تقارير HTML وJSON داخل artifacts/lighthouse. نفتح التقرير ونبدأ بالملاحظات، مش الدرجة بس. لأداة Rich Results الخارجية ننسخ dist/index.html ونلصقه في Code mode. بعد النشر، نستخدم URL عام بدل localhost.\nالمصدر: package.json، scripts/audit.mjs، scripts/check.mjs، src/App.jsx.`);
paragraphs(s,['1. تبويبات SEO وAEO وGEO داخل المثال','2. مقتطف الكود ثم Run page checks','3. تقرير Lighthouse وتفسير الملاحظات'],{y:175,gap:100,size:30});
code(s,'npm run audit:local',{x:88,y:495,w:1090,h:66,size:38});
txt(s,'report-path','artifacts/lighthouse/',88,579,1090,42,25,C.muted,false,'left','Consolas');
}
// 14 — next steps and closing
{
const s=page('خطة الفريق بعد العرض',`المدة: دقيقة.\nالكلام اللي تقوله:\nهنبدأ بتصحيح التباين ودلالات الوصول، وبعدها نجرب تحسين تحميل الخطوط ونقارن بنفس إعدادات القياس. قبل النشر نضبط SITE_URL، ونتأكد إن الروابط المفقودة بترجع 404. Vite Preview حاليًا بيرجع 200 للروابط المفقودة، فوجود 404.html وحده مش كفاية. أدوات قياسنا نفسها عليها ملاحظات تبعيات تطوير: 30 ملاحظة في تقرير npm، منها 20 متوسطة و10 عالية، مقابل صفر في تبعيات الإنتاج. نراجع توافق Node وLighthouse قبل تحديثها. بعد النشر نربط Search Console وBing وAnalytics، ونستخدم أسئلة ثابتة لتسجيل الاستشهادات ودقة الإجابات. سؤال النقاش للفريق: أي صفحة عامة عندنا نطبق عليها نفس الخطوات أولًا؟\nالمصادر: artifacts/lighthouse/summary.json وdependency-audit.json وproduction-dependency-audit.json و.env.example.\nمرجع Google لميزات AI: https://developers.google.com/search/docs/appearance/ai-features`);
paragraphs(s,['أولًا: تحسين التباين وARIA ثم إعادة القياس','قبل النشر: الدومين الصحيح واستجابة 404','بعد النشر: ظهور البحث والاستشهادات والزيارات'],{y:170,gap:108,size:31});
txt(s,'tooling-note','تبعيات أدوات التطوير: 30 ملاحظة تحتاج مراجعة، وتبعيات الإنتاج: صفر',90,510,1100,65,23,C.muted);
txt(s,'closing-question','أي صفحة عندنا هنبدأ بيها؟',90,593,1100,49,35,C.purple,true);
}

await fs.mkdir(path.join(BUILD,'renders'),{recursive:true});
await fs.writeFile(path.join(BUILD,'speaker-notes.json'),JSON.stringify(allNotes,null,2));
await fs.writeFile(path.join(BUILD,'source-measurements.json'),JSON.stringify(measured,null,2));
const draft=path.join(BUILD,'candidate.pptx');
await (await PresentationFile.exportPptx(presentation)).save(draft);
console.log(`Draft exported: ${presentation.slides.items.length} slides, each with Arabic speaker notes.`);
if(process.argv.includes('--draft-only')) process.exit(0);
for(let i=0;i<presentation.slides.items.length;i++){
  const png=await presentation.export({slide:presentation.slides.getItem(i),format:'png',scale:1});
  await fs.writeFile(path.join(BUILD,'renders',`slide-${i+1}.png`),new Uint8Array(await png.arrayBuffer()));
}
console.log('All slides rendered.');
const result=await finalizePresentation({
  workspaceDir:ROOT,candidatePath:draft,finalPath:path.join(OUT,'SEO-AEO-GEO-Team-Arabic.pptx'),
  pythonExecutable:PYTHON,
  integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit',...[2,4,8,9,10,11].flatMap(n=>['--require-native-table-slide',String(n)])],
  explicitTotalSlideCount:14,requiredNativeTableOwnerSlides:[2,4,8,9,10,11],requiredNativeChartOwnerSlides:[],
  fontPolicy,verifyArtifactToolImport:true,receiptPath:path.join(BUILD,'validation.json'),
});
console.log(JSON.stringify(result,null,2));
