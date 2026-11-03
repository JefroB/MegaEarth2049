// Execute the authored event commands with RPG Maker MV's real interpreter.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'../..'),dir=process.argv.includes('--live')?path.join(root,'data'):path.join(__dirname,'staged');
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'manifest.json')));
const data={};for(const id of manifest.changed)data[id]=JSON.parse(fs.readFileSync(path.join(dir,`Map${String(id).padStart(3,'0')}.json`)));
const code=fs.readFileSync(path.join(root,'js/rpg_objects.js'),'utf8');let assertions=0;
function run(mid,eid,{gold=1000,choice=0,inventory=[],page=0}={}){
 const e=data[mid].events[eid],state={gold,recovered:0,self:{},transfer:null,goods:null};
 const c={console,ImageManager:{requestFace:()=>{}},Graphics:{frameCount:0},Utils:{isOptionValid:()=>false},Scene_Shop:function(){},$dataMap:data[mid],$dataItems:JSON.parse(fs.readFileSync(path.join(root,'data/Items.json')))};
 vm.createContext(c);vm.runInContext('Array.prototype.clone = function() { return this.slice(0); };',c);vm.runInContext(code,c);
 c.$gameParty={gold:()=>state.gold,gainGold:n=>state.gold+=n,inBattle:()=>false,hasItem:item=>inventory.includes(item.id),members:()=>[{recoverAll:()=>state.recovered++}],allMembers:()=>[{recoverAll:()=>state.recovered++}]};
 c.$gameActors={actor:()=>({recoverAll:()=>state.recovered++})};
 c.$gameSelfSwitches={setValue:(k,v)=>state.self[k.join(',')]=v};
 c.$gameMap={mapId:()=>mid,refreshIfNeeded:()=>{},isEventRunning:()=>false};
 c.$gamePlayer={reserveTransfer:(...p)=>state.transfer=p,isTransferring:()=>false};
 c.$gameScreen={startFadeOut:()=>{},startFadeIn:()=>{}};
 c.$gameMessage={isBusy:()=>false,setFaceImage:()=>{},setBackground:()=>{},setPositionType:()=>{},add:()=>{},setChoices:()=>{},setChoiceBackground:()=>{},setChoicePositionType:()=>{},setChoiceCallback:cb=>cb(choice)};
 c.SceneManager={isSceneChanging:()=>false,push:()=>{},prepareNextScene:(goods)=>state.goods=goods};
 c.eventListJSON=JSON.stringify(e.pages[page].list);
 const interpreter=new c.Game_Interpreter();interpreter.setup(vm.runInContext('JSON.parse(eventListJSON)',c),eid);
 for(let i=0;i<1000&&interpreter.isRunning();i++){c.Graphics.frameCount++;interpreter.update();}
 assert(!interpreter.isRunning(),`${mid}/${eid}: interpreter did not finish`);assertions++;
 return state;
}
for(const [mid,eid]of manifest.addedEvents){
 const e=data[mid].events[eid],commands=e.pages[0].list;
 if(commands.some(c=>c.code===314)){
  let spend=commands.find(c=>c.code===125&&c.parameters[0]===1).parameters[2];
  let s=run(mid,eid,{gold:spend,choice:0});assert.equal(s.gold,0);assert.equal(s.recovered,1);assertions+=2;
  s=run(mid,eid,{gold:1000,choice:1});assert.equal(s.gold,1000);assert.equal(s.recovered,0);assertions+=2;
  if(spend){s=run(mid,eid,{gold:spend-1});assert.equal(s.gold,spend-1);assert.equal(s.recovered,0);assertions+=2;}
 }
 if(commands.some(c=>c.code===123)){
  let s=run(mid,eid),reward=commands.find(c=>c.code===125).parameters[2];assert.equal(s.gold,1000+reward);assert(s.self[[mid,eid,'A'].join(',')]);assertions+=2;
  s=run(mid,eid,{page:1});assert.equal(s.gold,1000);assertions++;
 }
 if(commands.some(c=>c.code===302)){let s=run(mid,eid);assert(s.goods?.length>0);assertions++;}
 if(e.name.startsWith('Transponder berth')){
  let s=run(mid,eid);assert.equal(s.transfer,null);assertions++;
  s=run(mid,eid,{inventory:[144]});assert.equal(s.transfer[0],50);assertions++;
 }
}
for(const [mid,eid,target,x,y]of manifest.links){let s=run(mid,eid);assert.deepEqual(s.transfer.slice(0,3),[target,x,y]);assertions++;s=run(mid,eid,{choice:1});assert.equal(s.transfer,null);assertions++;}
console.log(`${assertions} assertions passed using RPG Maker MV's event interpreter (shops, recovery, payment, decline, one-time rewards, gated boarding, transfers).`);
