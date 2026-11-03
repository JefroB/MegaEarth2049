/* Validate staged maps with the bundled RPG Maker MV engine's passage logic.
 * node tools/world/validate_world.js [--live]
 */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'../..'),stage=process.argv.includes('--live')?path.join(root,'data'):path.join(__dirname,'staged');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const manifest=read(path.join(__dirname,'manifest.json'));
const infos=read(path.join(stage,'MapInfos.json'));
const tiles=read(path.join(root,'data/Tilesets.json'));
const maps={};
for(const info of infos.filter(Boolean)){
 const file=`Map${String(info.id).padStart(3,'0')}.json`;
 maps[info.id]=read(fs.existsSync(path.join(stage,file))?path.join(stage,file):path.join(root,'data',file));
}
const ctx={console,$dataTilesets:tiles};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,'js/rpg_objects.js'),'utf8'),ctx);
const errors=[],warnings=[];
const check=(ok,msg)=>{if(!ok)errors.push(msg)};
const dirs=[[0,1,2],[-1,0,4],[1,0,6],[0,-1,8]];
const key=(x,y)=>`${x},${y}`;
function passageMap(id){
 const m=maps[id];ctx.$dataMap=m;
 const g=Object.create(ctx.Game_Map.prototype);g._tilesetId=m.tilesetId;g.tileEvents=[];
 const masks=new Uint8Array(m.width*m.height);
 for(let y=0;y<m.height;y++)for(let x=0;x<m.width;x++)for(const [dx,dy,d] of dirs)if(g.isPassable(x,y,d))masks[y*m.width+x]|=1<<(d/2-1);
 return masks;
}
const masks=Object.fromEntries(Object.keys(maps).map(id=>[id,passageMap(id)]));
function pass(id,x,y,d){const m=maps[id];return x>=0&&y>=0&&x<m.width&&y<m.height&&!!(masks[id][y*m.width+x]&(1<<(d/2-1)));}
function groups(id){
 const m=maps[id],blocked=new Set(m.events.filter(Boolean).filter(e=>e.pages[0].priorityType===1&&!e.pages[0].through).map(e=>key(e.x,e.y)));
 const unseen=new Set();for(let y=0;y<m.height;y++)for(let x=0;x<m.width;x++)if(masks[id][y*m.width+x]&&!blocked.has(key(x,y)))unseen.add(key(x,y));
 const result=[];
 while(unseen.size){const first=unseen.values().next().value,group=new Set([first]),q=[first.split(',').map(Number)];unseen.delete(first);
  for(let i=0;i<q.length;i++){let [x,y]=q[i];for(let [dx,dy,d]of dirs){let nx=x+dx,ny=y+dy,k=key(nx,ny);if(unseen.has(k)&&pass(id,x,y,d)&&pass(id,nx,ny,10-d)){unseen.delete(k);group.add(k);q.push([nx,ny]);}}}
  result.push(group);
 }return result.sort((a,b)=>b.size-a.size);
}
const areas=Object.fromEntries(manifest.changed.map(id=>[id,groups(id)]));
const approaches=(e,group)=>dirs.some(([dx,dy])=>group.has(key(e.x+dx,e.y+dy)))||(e.pages[0].priorityType!==1&&group.has(key(e.x,e.y)));
for(const id of manifest.changed){
 const m=maps[id],ts=tiles[m.tilesetId];
 check(m.data.length===m.width*m.height*6,`Map${id}: six-layer length`);
 check(m.events[0]===null,`Map${id}: event zero must be null`);
 check(m.data.every(t=>Number.isInteger(t)&&t>=0),`Map${id}: tile values`);
 for(const name of ts.tilesetNames.filter(Boolean))check(fs.existsSync(path.join(root,'img/tilesets',name+'.png')),`Map${id}: missing tileset ${name}`);
 for(let i=0;i<m.events.length;i++){const e=m.events[i];if(!e)continue;check(e.id===i,`Map${id}: event index ${i} != ${e.id}`);}
}
for(const [id,eid]of manifest.addedEvents){
 const m=maps[id],e=m.events[eid],area=areas[id][0]||new Set();
 check(eid>0,`Map${id}/${eid}: event id is reserved`);
 check(e.x>=0&&e.y>=0&&e.x<m.width&&e.y<m.height,`Map${id}/${eid}: position outside map`);
 check(approaches(e,area),`Map${id}/${eid} ${e.name}: unreachable interaction`);
 for(const p of e.pages){
  const name=p.image.characterName;
  check(!name||fs.existsSync(path.join(root,'img/characters',name+'.png')),`Map${id}/${eid}: missing sprite ${name}`);
  check(p.list.at(-1).code===0,`Map${id}/${eid}: no event terminator`);
  check(![3,4].includes(p.trigger),`Map${id}/${eid}: unexpected autorun/parallel`);
  for(const c of p.list){
   check(c.code!==355&&c.code!==356,`Map${id}/${eid}: unexpected script/plugin dependency`);
   if(c.code===401)check(c.parameters[0].length<=48,`Map${id}/${eid}: dialogue too wide`);
   if(c.code===201){let [mode,target,x,y]=c.parameters;check(mode===0&&maps[target],`Map${id}/${eid}: invalid transfer target`);if(maps[target])check((areas[target]||groups(target))[0].has(key(x,y)),`Map${id}/${eid} -> ${target} (${x},${y}): landing blocked or disconnected`);}
   if(c.code===302||c.code===605){let [kind,index]=c.parameters;let db=read(path.join(root,'data',['Items','Weapons','Armors'][kind]+'.json'));check(db[index]&&db[index].name&&db[index].id===index,`Map${id}/${eid}: goods ${kind}/${index} not engine-addressable`);}
  }
 }
}
// Geography and support checks for the waterfront props and access points.
const market=maps[105],at=(x,y,z=0)=>market.data[(z*market.height+y)*market.width+x];
for(const [x,y]of [[27,13],[28,13],[27,21]]){
 check(at(x,y)===1590,`Market cargo ${x},${y} lacks decking`);
 check(at(x,y-1,2)===185,`Market cargo ${x},${y} lacks rear railing`);
}
for(let y=0;y<market.height;y++)for(let x=22;x<market.width;x++)if(at(x,y,2))check(at(x,y)===1590,`Waterfront prop ${x},${y} over water`);
for(const [x,y]of [[31,14],[28,22]])check(areas[105][0].has(key(x,y)),`Dock end ${x},${y} is blocked`);
check(maps[49].events.some(e=>e&&e.name.includes('Eastern quay')&&e.x>=35),'Market entrance must be on eastern/lake side of Newtown');
// Report pre-existing transfer faults separately; they cannot silently pass as verified.
for(const [id,m]of Object.entries(maps))for(const e of m.events.filter(Boolean))for(const p of e.pages)for(const c of p.list)if(c.code===201&&c.parameters[0]===0){let [,t,x,y]=c.parameters;let dest=maps[t];if(!dest||x<0||y<0||x>=dest.width||y>=dest.height)warnings.push(`Existing transfer ${id}/${e.id} -> ${t} (${x},${y}) outside destination`);}
const report={mapsParsed:Object.keys(maps).length,mapsChanged:manifest.changed.length,newEventsChecked:manifest.addedEvents.length,newMaps:manifest.newMaps,errors,warnings:[...new Set(warnings)]};
fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
