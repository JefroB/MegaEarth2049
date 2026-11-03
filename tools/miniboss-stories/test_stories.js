const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'../..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const bosses=read('tools/miniboss-stories/stories.json');
const c={console,Graphics:{frameCount:0},Utils:{isOptionValid:()=>false},ImageManager:{requestFace:()=>{}},SceneManager:{isSceneChanging:()=>false}};
vm.createContext(c);vm.runInContext('Array.prototype.clone=function(){return this.slice()}',c);
vm.runInContext(fs.readFileSync(path.join(root,'js/rpg_objects.js'),'utf8'),c);
c.$gameMap={mapId:()=>1};let text=[],selected=0;
c.$gameMessage={isBusy:()=>false,setFaceImage:()=>{},setBackground:()=>{},setPositionType:()=>{},add:s=>text.push(s),setChoices:()=>{},setChoiceBackground:()=>{},setChoicePositionType:()=>{},setChoiceCallback:f=>f(selected)};
let runs=0;
for(const b of bosses)for(const k of ['entry','arena']){
 const m=read(`data/Map${String(b[k]).padStart(3,'0')}.json`),e=m.events[1],list=e.pages[0].list;
 assert(e.pages[0].trigger===0);assert(list.at(-1).code===0);
 let lines=0;
 for(const cmd of list){assert([0,101,401,102,402,404].includes(cmd.code));if(cmd.code===101)lines=0;if(cmd.code===401){assert(++lines<=4);assert(cmd.parameters[0].length<=46);}}
 for(selected=0;selected<2;selected++){
  text=[];c.list=JSON.stringify(list);const it=new c.Game_Interpreter();it.setup(vm.runInContext('JSON.parse(list)',c),1);
  for(let n=0;n<1000&&it.isRunning();n++){c.Graphics.frameCount++;it.update();}
  assert(!it.isRunning());
  if(k==='arena')assert(text.join(' ').includes(b.dossier) === (selected===0));
  else assert(text.join(' ').includes(b.clue));
  runs++;
 }
}
console.log(`PASS: ${bosses.length} bosses, 12 narrative markers, ${runs} native interpreter runs; Read/Leave branches, message bounds, no gameplay mutations.`);
