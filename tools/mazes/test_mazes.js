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

ok(items[152].scope===8&&items[152].effects[0].dataId===6,'Notebook menu compatibility');
for(const q of manifest.quests){
 reset();const key=q.key;
 run(key+'_first');run(key+'_second');run(key+'_final');ok(!flag(q.first)&&!flag(q.evidence),'No early evidence');
 run(key+'_giver',[1]);ok(!flag(q.active),'Declining is safe');run(key+'_giver');ok(flag(q.active)&&inventory[152]===1,'Accept and notebook');
 run(key+'_depth_in');ok(!transfer,'Gate locked');run(key+'_second');run(key+'_depth_in');ok(!transfer,'Both clues needed');run(key+'_first');run(key+'_depth_in');ok(transfer?.[0]===q.maps[1],'Gate opens');
 run(key+'_final',[1]);ok(!flag(q.evidence),'Wrong solution retryable');run(key+'_final',[0,2]);ok(!flag(q.evidence),'Defer outcome');run(key+'_final',[0,0]);ok(flag(q.evidence)&&flag(q.public),'Public choice');run(key+'_giver');ok(gold===q.reward&&flag(q.complete),'Reward');run(key+'_giver');ok(gold===q.reward,'No duplicate reward');
 for(let depth=0;depth<2;depth++){run(key+'_'+depth+'_cache');const before=gold;run(key+'_'+depth+'_cache');ok(gold===before,'Cache once only');}
 reset();run(key+'_giver');run(key+'_first');run(key+'_second');run(key+'_final',[0,1]);run(key+'_giver');ok(flag(q.complete)&&!flag(q.public),'Private outcome');
}
for(const [id,l]of Object.entries(manifest.layouts)){ok(l.rooms.length===9,'Nine rooms per floor');ok(l.edges.length===9,'Connected graph with loop');const seen=new Set([6]);for(let n=0;n<9;n++)for(const [a,b]of l.edges){if(seen.has(a))seen.add(b);if(seen.has(b))seen.add(a);}ok(seen.size===9,'Room graph connected');}
for(const q of manifest.quests){
 const seen=new Set([q.maps[0]]);for(let n=0;n<q.roomMaps.length;n++)for(const [a,,b]of manifest.routes)if(seen.has(a)&&q.roomMaps.includes(b))seen.add(b);
 ok(q.roomMaps.length===18&&q.roomMaps.every(id=>seen.has(id)),'All eighteen separate room maps connected');
}
for(const [a,b]of manifest.roomLinks){ok(manifest.roomLinks.some(([x,y])=>x===b&&y===a),'Room door has reverse link');run(`room_${a}_to_${b}`);ok(transfer?.[0]===b,'Native door transfers to intended room');}
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
const report={passed:true,assertions,mapsParsed:Object.keys(maps).length,newMaps:manifest.newMaps,questCount:6,battleCommandsAdded:0,randomEncountersAdded:0};
fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));

