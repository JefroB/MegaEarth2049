const fs=require('fs'),http=require('http'),path=require('path');
const {chromium}=require('C:/Users/jborn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),stage=path.join(__dirname,'staged'),manifest=require('./manifest.json');
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');let f=path.resolve(root,'.'+(url.pathname==='/'?'/index.html':decodeURIComponent(url.pathname)));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}if(url.pathname.startsWith('/data/')&&fs.existsSync(path.join(stage,path.basename(f))))f=path.join(stage,path.basename(f));fs.readFile(f,(e,b)=>{if(e)res.writeHead(404).end();else res.end(b);});});
(async()=>{let browser;const errors=[],report={passed:false,loadedMaps:[]};try{
await new Promise(r=>server.listen(0,'127.0.0.1',r));browser=await chromium.launch({channel:'chrome',headless:true,args:['--autoplay-policy=no-user-gesture-required']});const page=await browser.newPage();page.on('pageerror',e=>errors.push(String(e)));
await page.goto(`http://127.0.0.1:${server.address().port}/`);await page.waitForFunction(()=>window.SceneManager&&SceneManager._scene instanceof Scene_Title);
await page.evaluate(()=>{DataManager.setupNewGame();$gamePlayer.reserveTransfer(103,9,12,8,0);SceneManager.goto(Scene_Map);});
const ready=async id=>page.waitForFunction(id=>$gameMap.mapId()===id&&!$gamePlayer.isTransferring()&&SceneManager._scene instanceof Scene_Map&&SceneManager._scene.isActive()&&ImageManager.isReady(),id);
await ready(103);
// Use real event interpreters with deterministic dialogue responses.
const run=async key=>{const [id,eid]=manifest.events[key];await page.evaluate(id=>$gamePlayer.reserveTransfer(id,1,1,2,0),id);await ready(id);return page.evaluate(eid=>{
$gameMap.refresh();const it=new Game_Interpreter();it.setup($gameMap.event(eid).list(),eid);
for(let n=0;n<3000&&it.isRunning();n++){if($gameMessage.isChoice())$gameMessage.onChoice(0);$gameMessage.clear();it.update();}if(it.isRunning())throw Error('Event did not finish');$gameMessage.clear();return $gameParty.gold();},eid);};
await run('names_giver');await run('names_first');await run('names_0_cache');
report.saveRoundTrip=await page.evaluate(()=>{const gold=$gameParty.gold(),self=JSON.stringify($gameSelfSwitches._data),save=JsonEx.stringify(DataManager.makeSaveContents());DataManager.createGameObjects();DataManager.extractSaveContents(JsonEx.parse(save));return $gameSwitches.value(131)&&$gameSwitches.value(132)&&$gameParty.hasItem($dataItems[152])&&$gameParty.gold()===gold&&JSON.stringify($gameSelfSwitches._data)===self;});if(!report.saveRoundTrip)throw Error('Save roundtrip failed');
await run('names_second');await run('names_final');await run('names_giver');
report.questCompleted=await page.evaluate(()=>$gameSwitches.value(136));if(!report.questCompleted)throw Error('Quest failed');
// Invoke the actual item scene's item-use path; common event must return to map.
await page.evaluate(()=>SceneManager.push(Scene_Item));await page.waitForFunction(()=>SceneManager._scene instanceof Scene_Item&&SceneManager._scene.isActive());
await page.evaluate(()=>{const s=SceneManager._scene;s._categoryWindow.select(3);s._itemWindow.setCategory('keyItem');s._itemWindow.refresh();const i=s._itemWindow._data.indexOf($dataItems[152]);if(i<0)throw Error('Notes missing from Key Items');s._itemWindow.select(i);s.onItemOk();if(!s.canUse())throw Error('Notes unusable');s.onActorOk();});
await page.waitForFunction(()=>SceneManager._scene instanceof Scene_Map&&$gameMessage.isChoice());
report.fieldNotesMenu=await page.evaluate(()=>{const options=$gameMessage.choices().slice();$gameMessage.onChoice(0);$gameMessage.clear();return options;});
await page.waitForFunction(()=>$gameMessage.isChoice());await page.evaluate(()=>{$gameMessage.onChoice(0);$gameMessage.clear();});await page.waitForFunction(()=>$gameMessage.hasText());report.fieldNotesText=await page.evaluate(()=>$gameMessage.allText());if(!report.fieldNotesText.includes('COMPLETED'))throw Error('Notes status incorrect');
await page.evaluate(()=>{$gameMessage.clear();$gameMap._interpreter.clear();});
for(const id of manifest.newMaps){const route=manifest.routes.find(r=>r[2]===id);await page.evaluate(r=>$gamePlayer.reserveTransfer(r[2],r[3],r[4],2,0),route);await ready(id);const reachable=await page.evaluate(()=>{const q=[[$gamePlayer.x,$gamePlayer.y]],seen=new Set([q[0].join(',')]);for(let i=0;i<q.length;i++){const [x,y]=q[i];for(const [dx,dy,d]of [[0,1,2],[-1,0,4],[1,0,6],[0,-1,8]]){const k=[x+dx,y+dy].join(',');if(!seen.has(k)&&$gamePlayer.canPass(x,y,d)){seen.add(k);q.push([x+dx,y+dy]);}}}return seen.size;});if(reachable<12)throw Error('Landing blocked '+id);report.loadedMaps.push({id,reachable});}
// Walk to a real room door, activate it, and transfer using the map interpreter.
const [doorSource,doorTarget]=manifest.roomLinks[0],doorKey=`room_${doorSource}_to_${doorTarget}`,doorId=manifest.events[doorKey][1];
const doorRoute=manifest.routes.find(r=>r[2]===doorSource);
await page.evaluate(r=>$gamePlayer.reserveTransfer(r[2],r[3],r[4],2,0),doorRoute);await ready(doorSource);
const walk=await page.evaluate(eid=>{const e=$gameMap.event(eid),q=[[$gamePlayer.x,$gamePlayer.y,[]]],seen=new Set();for(let i=0;i<q.length;i++){const [x,y,steps]=q[i],k=x+','+y;if(seen.has(k))continue;seen.add(k);if(Math.abs(x-e.x)+Math.abs(y-e.y)===1)return steps;for(const [dx,dy,d]of [[0,1,2],[-1,0,4],[1,0,6],[0,-1,8]])if($gamePlayer.canPass(x,y,d))q.push([x+dx,y+dy,[...steps,d]]);}throw Error('Door unreachable');},doorId);
for(const d of walk){await page.evaluate(d=>$gamePlayer.executeMove(d),d);await page.waitForFunction(()=>!$gamePlayer.isMoving());}
await page.evaluate(eid=>$gameMap.event(eid).start(),doorId);await page.waitForFunction(()=>$gameMessage.isChoice());await page.evaluate(()=>{$gameMessage.onChoice(0);$gameMessage.clear();});await ready(doorTarget);report.walkedDoorTransfer=[doorSource,doorTarget];
await page.screenshot({path:path.join(__dirname,'previews/in-game-archive.png')});report.pageErrors=errors;if(errors.length)throw Error(errors.join('\n'));report.passed=true;
}catch(e){report.error=e.stack;process.exitCode=1;}finally{fs.writeFileSync(path.join(__dirname,'browser-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(browser)await browser.close();server.close();}})();


