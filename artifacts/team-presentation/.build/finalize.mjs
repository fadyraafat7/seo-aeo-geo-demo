import path from 'node:path';
import {pathToFileURL} from 'node:url';
process.env.RUNTIME_NODE_MODULES='C:/Users/Tech House/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const root=process.cwd();
const skill='C:/Users/Tech House/.codex/plugins/cache/openai-primary-runtime/presentations/26.1104.22356/skills/presentations';
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')));
const result=await finalizePresentation({
 workspaceDir:root,
 candidatePath:path.join(root,'artifacts/team-presentation/.build/candidate-rtl.pptx'),
 finalPath:path.join(root,'artifacts/team-presentation/output/SEO-AEO-GEO-Team-Arabic-Ready.pptx'),
 pythonExecutable:'C:/Users/Tech House/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',
 integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit',...[2,4,8,9,10,11].flatMap(n=>['--require-native-table-slide',String(n)])],
 explicitTotalSlideCount:14,requiredNativeTableOwnerSlides:[2,4,8,9,10,11],requiredNativeChartOwnerSlides:[],
 fontPolicy:{basis:'design',families:['Arial','Consolas']},verifyArtifactToolImport:true,
 receiptPath:path.join(root,'artifacts/team-presentation/.build/validation-ready.json'),
});console.log(JSON.stringify(result,null,2));
