const fs=require('fs'),path=require('path'),assert=require('assert');
const {chromium}=require('C:/Users/jborn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{
 const p=await b.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('http://game.test/**',r=>{const f=path.resolve(decodeURIComponent(new URL(r.request().url()).pathname.slice(1)));return fs.existsSync(f)?r.fulfill({path:f}):r.fulfill({status:404,body:''});});
 await p.goto('http://game.test/index.html');await p.waitForFunction(()=>window.SceneManager&&SceneManager._scene instanceof Scene_Title);
 const m=JSON.parse(fs.readFileSync('tools/local-projects/manifest.json')),maps=Object.fromEntries(m.maps.map(n=>[n,JSON.parse(fs.readFileSync('data/Map'+String(n).padStart(3,'0')+'.json'))]));
 const checks=await p.evaluate(({m,maps})=>{
  const checks=[];function ok(v,s){if(!v)throw Error(s);checks.push(s);}
  function fresh(){DataManager.setupNewGame();$gamePlayer.clearTransferInfo();$gameMessage.clear();}
  function map(n){$dataMap=maps[n];$gameMap.setup(n);$gamePlayer.clearTransferInfo();}
  function execute(list,id,answers=[]){const i=new Game_Interpreter(),lines=[];i.setup(list,id);let count=0;while(i.isRunning()&&count++<800){lines.push(...$gameMessage._texts);if($gameMessage.isChoice())$gameMessage.onChoice(answers.length?answers.shift():$gameMessage.choiceCancelType());$gameMessage.clear();i._waitCount=0;i._waitMode='';i.update();}if(count>=800)throw Error('stalled event '+id);return lines.join(' ').replace(/\s+/g,' ');}
  function run(n,id,a=[]){map(n);return execute(maps[n].events[id].pages[0].list,id,a);}
  function npc(a){return run(...m.archivist,a);}
  function sort(a){return run(...m.sorter,a);}
  function terminal(a){return run(...m.terminal,a);}
  const flag=id=>$gameSwitches.value(id),v=id=>$gameVariables.value(id),count=id=>$gameParty.numItems($dataItems[id]),gain=(id,n)=>$gameParty.gainItem($dataItems[id],n);
  function save(){DataManager.extractSaveContents(JsonEx.parse(JsonEx.stringify(DataManager.makeSaveContents())));}
  function solve(){terminal([1,0]);terminal([1,1]);terminal([1,2]);}
  function standing(){execute($dataCommonEvents[10].list,0);return v(51);}
  const push=SceneManager.push,prepare=SceneManager.prepareNextScene;let captured=null;
  function hardware(){try{SceneManager.push=function(c){ok(c===Scene_Shop,'hardware opens native shop');};SceneManager.prepareNextScene=function(goods,purchaseOnly){captured=goods;ok(purchaseOnly===false,'hardware retains native selling');};run(103,2,[0]);return captured;}finally{SceneManager.push=push;SceneManager.prepareNextScene=prepare;}}
  fresh();ok(JSON.stringify($gameParty._actors)==='[1,3,4]','starting party unchanged');ok(standing()===0,'new save starts with local standing zero');
  const g=hardware();ok(JSON.stringify(g)===JSON.stringify(m.originalGoods),'zero-standing hardware has exact previous inventory and prices');
  $gameSwitches.setValue(191,true);save();ok(standing()===1,'older save recycling completion credited without replay');
  const one=hardware();ok(JSON.stringify(one)===JSON.stringify(m.originalGoods),'one point does not discount');
  $gameSwitches.setValue(200,true);ok(standing()===2,'second distinct deed unlocks threshold');const two=hardware();
  ok(two[0][3]===45&&two[4][3]===378&&two[6][3]===765&&two[2][3]===162,'local discount correctly handles explicit and database prices');
  ok(two.every((g,i)=>g[0]===m.originalGoods[i][0]&&g[1]===m.originalGoods[i][1]),'discount preserves every merchandise identity');
  ok($dataWeapons[1].price===50&&$dataWeapons[61].price===420,'discount does not mutate database or native sell prices');
  for(let n=0;n<4;n++)standing();ok(v(51)===2,'viewing standing cannot farm points');
  $gameSwitches.setValue(199,true);save();ok(standing()===3,'all three distinct deeds cap standing at three');
  fresh();let hp=$gameParty.leader().hp,mp=$gameParty.leader().mp;
  terminal([2]);ok(v(52)===0&&!flag(195),'terminal can be declined');
  terminal([1,2]);ok(v(52)===0,'posted hint is free and does not advance');
  terminal([1,1]);ok(v(52)===0&&!flag(195),'unsafe first operation resets safely');
  terminal([1,0]);ok(v(52)===1,'isolation is first stage');save();terminal([1,3]);ok(v(52)===1&&!flag(195),'leaving after isolation retains saved progress');
  terminal([1,0]);ok(v(52)===0,'production overwrite in second stage resets');
  terminal([1,0]);terminal([1,1]);ok(v(52)===2,'read-only copy is second stage');save();terminal([1,0]);ok(v(52)===0,'deleting original in final stage safely resets');
  ok($gameParty.gold()===0&&$gameParty.leader().hp===hp&&$gameParty.leader().mp===mp,'terminal failures cost no credits HP or MP');
  gain(9,99);solve();ok(flag(195)&&!flag(196)&&v(52)===0,'solve persists while full stipend inventory defers payment');
  gain(9,-99);terminal([1]);ok(flag(196)&&count(9)===1&&$gameParty.gold()===80,'terminal reserved stipend claimed exactly');
  save();terminal([1]);ok(count(9)===1&&$gameParty.gold()===80,'terminal stipend cannot repeat across saves');
  ok(!flag(194),'standalone hacking does not silently accept archive job');
  for(const publicChoice of[true,false]){
   fresh();run(106,5,[1]);run(244,4,[1]);ok(!flag(197)&&!flag(198),'archive copies require accepted brief '+publicChoice);
   npc([0,1]);ok(!flag(194),'archive job may be declined '+publicChoice);
   npc([0,0]);ok(flag(194),'archive accepts explicitly '+publicChoice);
   npc([0,0]);ok(!flag(199),'archive cannot finish with missing records '+publicChoice);
   // Any order: permission first, then canteen, then terminal.
   const memorialFlags=[121,122,123,124,125,126,127,183,184].map(flag);
   run(244,4,[1]);run(106,5,[1]);run(244,4,[1]);run(106,5,[1]);
   ok(flag(197)&&flag(198),'two authorized copies retained without duplicates '+publicChoice);
   solve();ok(flag(195)&&!flag(199),'terminal copy completes evidence but not turn-in '+publicChoice);
   save();npc([0,0,2]);ok(!flag(199)&&!flag(202),'archive publication decision may be postponed '+publicChoice);
   gain(171,99);npc([0,0,publicChoice?0:1]);ok(!flag(199)&&!flag(202)&&$gameParty.gold()===80,'full Panacea inventory leaves archive unfiled '+publicChoice);
   gain(171,-99);npc([0,0,publicChoice?0:1]);
   ok(flag(199)&&flag(202)===publicChoice&&count(171)===1&&$gameParty.gold()===260,'archive choice and exact single reward '+publicChoice);
   ok(standing()===1,'archive grants one local standing point '+publicChoice);
   ok(JSON.stringify(memorialFlags)===JSON.stringify([121,122,123,124,125,126,127,183,184].map(flag)),'archive preserves memorial privacy and vending policy '+publicChoice);
   save();npc([0,0,0]);ok(count(171)===1&&$gameParty.gold()===260,'archive reward cannot repeat '+publicChoice);
  }
  fresh();solve();npc([0,0]);ok(flag(195)&&flag(194),'pre-solved mirror qualifies when archive accepted later');
  for(const answers of [[3],[0,3],[0,0,3],[0,0,1,3],[0,1],[0,0,0],[0,0,1,0]]){
   fresh();sort(answers.slice());ok(!flag(200)&&!flag(201)&&v(53)===0&&$gameParty.gold()===0&&count(170)===0,'sorting refusal/mistake resets without reward '+answers.join('/'));
   ok($gameParty.leader().states().length===0,'sorting props cannot cause disease '+answers.join('/'));
  }
  fresh();gain(170,99);sort([0,0,1,2]);ok(flag(200)&&!flag(201)&&standing()===1,'perfect sort earns standing with reward safely pending');
  sort([1]);ok(!flag(201)&&$gameParty.gold()===0,'full inventory still defers earned sorting reward');
  gain(170,-99);save();sort([1]);ok(flag(201)&&count(170)===1&&$gameParty.gold()===150,'reserved sorting reward claimed after save');
  sort([0,0,1,2]);sort([1]);ok(count(170)===1&&$gameParty.gold()===150&&standing()===1,'repeat sorting practice cannot farm rewards or reputation');
  fresh();$gameParty.gainGold($gameParty.maxGold());solve();ok(flag(195)&&!flag(196),'gold cap defers hacking stipend');
  $gameParty.loseGold(80);terminal([1]);ok(flag(196)&&$gameParty.gold()===$gameParty.maxGold(),'gold-cap hacking claim exact');
  fresh();$gameParty.gainGold($gameParty.maxGold());sort([0,0,1,2]);ok(flag(200)&&!flag(201),'gold cap preserves sorting claim');
  $gameParty.loseGold(150);sort([1]);ok(flag(201)&&$gameParty.gold()===$gameParty.maxGold(),'gold-cap sorting claim exact');
  // New events must be approachable using native passage and event collision.
  fresh();map(103);const seen=new Set(),areas=[];
  for(let y=0;y<$gameMap.height();y++)for(let x=0;x<$gameMap.width();x++){
   let key=x+','+y;if(seen.has(key)||$gameMap.eventsXyNt(x,y).some(e=>e.isNormalPriority())||![2,4,6,8].some(d=>$gameMap.isPassable(x,y,d)))continue;
   const area=new Set([key]),q=[[x,y]];seen.add(key);for(let k=0;k<q.length;k++){const[x,y]=q[k];for(const[dx,dy,d]of[[0,1,2],[-1,0,4],[1,0,6],[0,-1,8]]){const xx=x+dx,yy=y+dy,key=xx+','+yy;if(seen.has(key)||!$gameMap.isValid(xx,yy)||!$gameMap.isPassable(x,y,d)||!$gameMap.isPassable(xx,yy,10-d)||$gameMap.eventsXyNt(xx,yy).some(e=>e.isNormalPriority()))continue;seen.add(key);area.add(key);q.push([xx,yy]);}}areas.push(area);
  }
  const main=areas.sort((a,b)=>b.size-a.size)[0];for(const eid of[m.archivist[1],m.sorter[1],2,5,11,14]){const e=maps[103].events[eid];ok([[0,1],[-1,0],[1,0],[0,-1]].some(([dx,dy])=>main.has((e.x+dx)+','+(e.y+dy))),'new and original Rivet event reachable '+eid);}
  const messageWindow=new Window_Message();let messageLines=0;
  for(const n of m.maps)for(const e of maps[n].events.filter(Boolean))for(const pg of e.pages){let lines=0;for(const c of pg.list){if(c.code===101)lines=0;if(c.code===401){lines++;if(lines>4||messageWindow.textWidth(c.parameters[0])>messageWindow.contentsWidth())throw Error('message overflow '+n+'/'+e.id+'/'+c.parameters[0]);messageLines++;}}}
  ok(messageLines>0,'all affected-map message lines fit actual native font and window');
  return checks;
 },{m,maps});
 assert.deepEqual(errors,[]);fs.writeFileSync('tools/local-projects/validation.json',JSON.stringify({passed:true,checks,errors},null,2));console.log('PASS local projects: '+checks.length+' native checks (includes message bounds)');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});
