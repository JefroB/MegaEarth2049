// Native MV interpreter and collision checks; no simulated quest implementation.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'../..'),stage=process.argv.includes('--live')?path.join(root,'data'):path.join(__dirname,'staged');
const read=n=>JSON.parse(fs.readFileSync(fs.existsSync(path.join(stage,n))?path.join(stage,n):path.join(root,'data',n),'utf8').replace(/^\uFEFF/,''));
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'manifest.json'))),maps={};
for(const i of read('MapInfos.json').filter(Boolean))maps[i.id]=read(`Map${String(i.id).padStart(3,'0')}.json`);
const ts=read('Tilesets.json'),items=read('Items.json'),commons=read('CommonEvents.json');
const c={console,$dataSystem:read('System.json'),$dataTilesets:ts,$dataItems:items,$dataCommonEvents:commons,Graphics:{frameCount:0},Utils:{isOptionValid:()=>false},ImageManager:{requestFace:()=>{}},SceneManager:{isSceneChanging:()=>false}};
vm.createContext(c);vm.runInContext('Array.prototype.clone=function(){return this.slice(0);};',c);vm.runInContext(fs.readFileSync(path.join(root,'js/rpg_objects.js'),'utf8'),c);
let mid=103,gold=0,inventory={},transfer=null,text=[],assertions=0;
c.$gameMap={mapId:()=>mid,requestRefresh:()=>{},refreshIfNeeded:()=>{}};
c.$gameSwitches=new c.Game_Switches();c.$gameVariables=new c.Game_Variables();c.$gameSelfSwitches=new c.Game_SelfSwitches();
c.$gameParty={gold:()=>gold,gainGold:n=>gold+=n,hasItem:item=>!!inventory[item?.id],gainItem:(item,n)=>inventory[item.id]=(inventory[item.id]||0)+n,inBattle:()=>false,members:()=>[],allMembers:()=>[]};
c.$gamePlayer={reserveTransfer:(...p)=>transfer=p,isTransferring:()=>false};
c.$gameScreen={startFadeOut:()=>{},startFadeIn:()=>{}};
let callback=null;
c.$gameMessage={isBusy:()=>false,setFaceImage:()=>{},setBackground:()=>{},setPositionType:()=>{},add:s=>text.push(s),setChoices:()=>{},setChoiceBackground:()=>{},setChoicePositionType:()=>{},setChoiceCallback:fn=>callback=fn};
function ok(condition,message){assert(condition,message);assertions++;}
function selected(map,event){
 const dummy=Object.create(c.Game_Event.prototype);dummy._mapId=map;dummy._eventId=event.id;
 return [...event.pages].reverse().find(p=>dummy.meetsConditions(p));
}
function runList(list,choices=[0],eid=1){
 text=[];transfer=null;callback=null;let pos=0;
 // Choices resolve while setupChoices is still running, just as its callback
 // ultimately resolves in the engine; preserve the engine's branch handling.
 c.$gameMessage.setChoiceCallback=fn=>fn(choices[pos++]??0);
 c.listJSON=JSON.stringify(list);const it=new c.Game_Interpreter();it.setup(vm.runInContext('JSON.parse(listJSON)',c),eid);
 for(let i=0;i<2000&&it.isRunning();i++){c.Graphics.frameCount++;it.update();}
 ok(!it.isRunning(),'Interpreter must finish');return {text:text.join(' '),transfer};
}
function run(key,choices=[0]){const [map,eid]=manifest.events[key];mid=map;c.$dataMap=maps[mid];return runList(selected(mid,maps[mid].events[eid]).list,choices,eid);}
function flag(n){return c.$gameSwitches.value(n);}
function reset(){c.$gameSwitches=new c.Game_Switches();c.$gameSelfSwitches=new c.Game_SelfSwitches();inventory={};gold=0;}
function notes(index){return runList(commons[5].list,[index]).text;}
// IDs and no-boss/no-combat invariant.
for(const id of manifest.newMaps){const m=maps[id];ok(m.data.length===m.width*m.height*6,`Map ${id} layer length`);ok(m.encounterList.length===0,`Map ${id} must have no random encounters`);ok(m.events[0]===null,`Map ${id} reserved event zero`);}
for(const [name,[id,eid]]of Object.entries(manifest.events)){
 const e=maps[id].events[eid];ok(e.id===eid,`${name} index`);
 for(const p of e.pages){
  ok(p.list.at(-1).code===0,`${name} terminator`);
  ok(p.trigger===0,`${name} must not auto-run`);
  ok(!p.image.characterName||fs.existsSync(path.join(root,'img/characters',p.image.characterName+'.png')),`${name} sprite exists`);
  for(const cmd of p.list){ok(![301,355,356].includes(cmd.code),`${name} must not add combat or script/plugin dependencies`);if(cmd.code===401)ok(cmd.parameters[0].length<=46,`${name} text width`);}
 }
}
for(const id of manifest.newMaps)for(const name of ts[maps[id].tilesetId].tilesetNames.filter(Boolean))ok(fs.existsSync(path.join(root,'img/tilesets',name+'.png')),`Missing tileset ${name}`);
ok(items[151].id===151&&items[151].itypeId===2&&items[151].occasion===2&&!items[151].consumable,'Field Notes is a reusable menu-only Key Item');
ok(items[151].effects[0].dataId===5&&commons[5].trigger===0,'Field Notes common event is manually invoked');

// Early visits and declining work do not mutate quest state.
for(const key of ['meter','billing','ledger','vent','drain','heater','rescue','airlog','timecards','interlock','roster'])run(key);
ok(!Object.values(manifest.switches).some((_,i)=>flag(Number(Object.keys(manifest.switches)[i]))),'No early objective collection');
for(const key of ['lien_giver','thaw_giver','shift_giver'])run(key,[1]);
ok(!flag(101)&&!flag(111)&&!flag(121)&&!inventory[151],'Declining grants no quest or notebook');
// Quest 1, alternate acquisition order, public ending, repeat-safe rewards.
run('lien_giver');ok(flag(101)&&inventory[151]===1,'Lien accepted');run('lien_giver');ok(gold===0&&inventory[151]===1,'No repeat acceptance reward');
run('rivet_depth_in');ok(!transfer,'Registry locked before repairs');
run('billing',[1]);ok(!flag(103),'Unsafe billing option is harmless');run('billing');ok(flag(103),'Billing isolated');
run('rivet_depth_in');ok(!transfer,'Both repairs required');run('meter',[1]);ok(!flag(102),'Water shutdown is refused');run('meter');
run('rivet_depth_in');ok(transfer?.[0]===111,'Registry accessible after both repairs');
run('ledger',[2]);ok(!flag(104),'Deferring the ledger decision does not complete it');run('ledger');ok(flag(104)&&flag(105),'Public ledger decision');
ok(notes(0).includes('Return to Forewoman Latch'),'Notes show turn-in');run('lien_giver');ok(gold===260&&flag(106),'Lien reward');run('lien_giver');ok(gold===260,'Lien reward is once only');ok(notes(0).includes('COMPLETED'),'Completed Lien notes');
// Quest 2, all incorrect sequences, rescue and privacy choice.
run('thaw_giver');ok(inventory[151]===1,'Notebook is not duplicated across quests');
run('heater');run('drain');ok(!flag(114)&&!flag(113),'Heat and drain cannot precede vent');run('vent');run('heater');ok(!flag(114),'Heat still requires drain');
run('drain');ok(flag(113),'Coolant drained');run('heater');ok(flag(114),'Heat restored');
run('thaw_depth_in');ok(transfer?.[0]===113,'Ward unlocked');run('rescue');ok(flag(115)&&flag(117),'Rescue with identities protected');
let [workerMap,workerId]=manifest.events.rescued_worker;ok(selected(workerMap,maps[workerMap].events[workerId]).image.characterName==='SF_People2','Rescued worker appears at hub');
let [rescueMap,rescueId]=manifest.events.rescue;ok(selected(rescueMap,maps[rescueMap].events[rescueId]).image.characterName==='','Worker leaves ward');
run('thaw_giver');ok(flag(116)&&gold===560,'Thaw reward');run('thaw_giver');ok(gold===560,'Thaw reward once only');
// Quest 3, evidence in either order and retryable chronology.
run('shift_giver');run('interlock');ok(!flag(124),'Archive requires evidence');run('timecards');run('interlock');ok(!flag(124),'Both evidence records required');run('airlog');
run('interlock',[1]);run('interlock',[2]);ok(!flag(124),'Wrong timelines do not unlock');run('interlock');ok(flag(124),'Correct timeline unlocks archive');run('mine_depth_in');ok(transfer?.[0]===115,'Archive transfer');
run('roster',[1]);ok(flag(125)&&!flag(126),'Private family-copy ending');run('shift_giver');ok(flag(127)&&gold===920,'Shift reward');run('shift_giver');ok(gold===920,'Shift reward once only');ok(run('memorial').text.includes('THEIRS TO SHARE'),'Private memorial reacts');
// Opposite outcomes are valid and change follow-up text.
reset();run('lien_giver');run('meter');run('billing');run('ledger',[1]);run('lien_giver');ok(!flag(105)&&run('lien_giver').text.includes('Families keep'),'Private lien outcome');
run('thaw_giver');run('vent');run('drain');run('heater');run('rescue',[1]);run('thaw_giver');ok(!flag(117)&&run('thaw_giver').text.includes('complaint is public'),'Public complaint outcome');
run('shift_giver');run('airlog');run('timecards');run('interlock');run('roster');run('shift_giver');ok(flag(126)&&run('memorial').text.includes('Names restored'),'Public memorial outcome');
for(const key of ['rivet_cache','registry_cache','ice_cache','ward_cache','mine_cache','archive_cache']){const before=gold;run(key);ok(gold>before,`${key} pays`);const after=gold;run(key);ok(gold===after,`${key} cannot repeat`);}
// Static routes use native passage flags and actual page conditions in both states.
const dirs=[[0,1,2],[-1,0,4],[1,0,6],[0,-1,8]],k=(x,y)=>x+','+y;
function areas(id){
 const m=maps[id];c.$dataMap=m;const gm=Object.create(c.Game_Map.prototype);gm._tilesetId=m.tilesetId;gm.tileEvents=[];
 const blocked=new Set(m.events.filter(Boolean).filter(e=>{let p=selected(id,e);return p&&p.priorityType===1&&!p.through;}).map(e=>k(e.x,e.y)));
 const pass=(x,y,d)=>x>=0&&y>=0&&x<m.width&&y<m.height&&gm.isPassable(x,y,d);
 const unseen=new Set();for(let y=0;y<m.height;y++)for(let x=0;x<m.width;x++)if(dirs.some(([, ,d])=>pass(x,y,d))&&!blocked.has(k(x,y)))unseen.add(k(x,y));
 const out=[];while(unseen.size){let start=unseen.values().next().value,q=[start.split(',').map(Number)],seen=new Set([start]);unseen.delete(start);for(let i=0;i<q.length;i++){let [x,y]=q[i];for(let [dx,dy,d]of dirs){let key=k(x+dx,y+dy);if(unseen.has(key)&&pass(x,y,d)&&pass(x+dx,y+dy,10-d)){unseen.delete(key);seen.add(key);q.push([x+dx,y+dy]);}}}out.push(seen);}return out.sort((a,b)=>b.size-a.size);
}
for(const enabled of [false,true]){
 for(const s of Object.keys(manifest.switches))c.$gameSwitches.setValue(+s,enabled);
 const all=Object.fromEntries(manifest.changed.map(id=>[id,areas(id)]));
 for(const [name,[id,eid]]of Object.entries(manifest.events)){
  const e=maps[id].events[eid],p=selected(id,e),main=all[id][0];
  ok(dirs.some(([dx,dy])=>main.has(k(e.x+dx,e.y+dy)))||(p?.priorityType!==1&&main.has(k(e.x,e.y))),`${name} approachable, flags=${enabled}`);
 }
 for(const [source,eid,target,x,y]of manifest.routes)ok(all[target][0].has(k(x,y)),`Landing ${source}/${eid} -> ${target} (${x},${y}) flags=${enabled}`);
}
// All transfer coordinates stay within the target, including gates not yet open.
for(const [id,m]of Object.entries(maps))for(const e of m.events.filter(Boolean))for(const p of e.pages)for(const cmd of p.list)if(cmd.code===201&&cmd.parameters[0]===0){let [,target,x,y]=cmd.parameters,t=maps[target];ok(t&&x>=0&&y>=0&&x<t.width&&y<t.height,`Transfer ${id}/${e.id} bounds`);}
const report={passed:true,assertions,mapsParsed:Object.keys(maps).length,newMaps:manifest.newMaps,questCount:3,battleCommandsAdded:0,randomEncountersAdded:0};
fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));

