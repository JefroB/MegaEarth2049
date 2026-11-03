const fs=require('fs'),path=require('path'),assert=require('assert');
const {chromium}=require('C:/Users/jborn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{
 const p=await b.newPage({viewport:{width:1280,height:900}}),errors=[],checks=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.route('http://game.test/**',r=>{const f=path.resolve(decodeURIComponent(new URL(r.request().url()).pathname.slice(1)));return fs.existsSync(f)?r.fulfill({path:f}):r.fulfill({status:404,body:''});});
 await p.goto('http://game.test/index.html');await p.waitForFunction(()=>window.SceneManager&&SceneManager._scene instanceof Scene_Title);
 const m=JSON.parse(fs.readFileSync('tools/local-projects/manifest.json'));
 async function ready(n){await p.waitForFunction(n=>SceneManager._scene instanceof Scene_Map&&SceneManager._scene.isActive()&&$gameMap.mapId()===n&&!$gamePlayer.isTransferring()&&!$gameMap.isEventRunning()&&!$gameMap.events().some(e=>e.isStarting())&&!$gameMessage.isBusy()&&SceneManager._scene._fadeDuration===0,n,{timeout:20000});}
 async function event(id,answers=[]){await p.evaluate(({id,answers})=>{window.answers=answers;$gameMap.event(id).start();},{id,answers});}
 async function move(n,x,y,d=8){await p.evaluate(({n,x,y,d})=>$gamePlayer.reserveTransfer(n,x,y,d,0),{n,x,y,d});await ready(n);}
 async function choice(){await p.waitForFunction(()=>SceneManager._scene._messageWindow&&SceneManager._scene._messageWindow._choiceWindow.active&&SceneManager._scene._messageWindow._choiceWindow.openness===255&&answers.length===0);}
 await p.evaluate(()=>{DataManager.setupNewGame();$gameSystem.disableEncounter();window.answers=[];window.holdText='';window.auto=setInterval(()=>{const s=SceneManager._scene,w=s._messageWindow;if(!w)return;if(w._textState)w._showFast=true;const c=w._choiceWindow;if($gameMessage.isChoice()){if(c.active&&c.openness===255&&answers.length){const n=answers.shift();c.select(n);c.processOk();}}else if(w.pause&&w._waitCount===0){if(holdText&&$gameMessage._texts.join(' ').includes(holdText))return;w.pause=false;w.terminateMessage();}},30);$gamePlayer.reserveTransfer(103,17,19,8,0);SceneManager.goto(Scene_Map);});await ready(103);
 await p.screenshot({path:'tools/local-projects/rivet-projects.png'});
 await event(m.archivist[1],[0,0]);await ready(103);assert(await p.evaluate(()=>$gameSwitches.value(194)));checks.push('Splice accepts archive through native NPC choices');
 await move(108,7,4);await event(3,[1]);await choice();await p.screenshot({path:'tools/local-projects/hacking-procedure.png'});
 let sizes=await p.evaluate(()=>{const w=SceneManager._scene._messageWindow,c=w._choiceWindow;return $gameMessage.choices().map(t=>[c.textWidth(t),c.contentsWidth()-c.textPadding()*2]);});assert(sizes.every(([w,max])=>w<=max));
 await p.evaluate(()=>answers.push(0));await ready(108);assert.equal(await p.evaluate(()=>$gameVariables.value(52)),1);
 await event(3,[1,1]);await ready(108);assert.equal(await p.evaluate(()=>$gameVariables.value(52)),2);
 await event(3,[1,2]);await ready(108);assert(await p.evaluate(()=>$gameSwitches.value(195)&&$gameSwitches.value(196)&&$gameParty.gold()===80));checks.push('three separate terminal operations solve and pay once in native map scene');
 await move(106,14,7);await event(5,[1]);await ready(106);assert(await p.evaluate(()=>$gameSwitches.value(197)));checks.push('public safety strip copied without changing memorial');
 await move(244,14,7);await event(4,[1]);await ready(244);assert(await p.evaluate(()=>$gameSwitches.value(198)));checks.push('Inez grants archive permission through native dialogue');
 await move(103,17,19);await event(m.archivist[1],[0,0]);await choice();await p.screenshot({path:'tools/local-projects/archive-choice.png'});assert.deepEqual(await p.evaluate(()=>$gameMessage.choices()),['Publish safety notices','Crew reference copies only','Decide later']);
 await p.evaluate(()=>answers.push(0));await ready(103);assert(await p.evaluate(()=>$gameSwitches.value(199)&&$gameSwitches.value(202)&&$gameParty.gold()===260&&$gameParty.numItems($dataItems[171])===1));checks.push('complete archive route across four maps with chosen publication and exact reward');
 await move(103,m.newEventLocations[m.sorter[1]][0],m.newEventLocations[m.sorter[1]][1]+1);await event(m.sorter[1],[0]);await choice();await p.screenshot({path:'tools/local-projects/sorting-crate.png'});
 assert.deepEqual(await p.evaluate(()=>$gameMessage.choices()),['Metal bin','Electronics bin','Biohazard bin','Leave practice']);
 await p.evaluate(()=>answers.push(0,1,2));await ready(103);assert(await p.evaluate(()=>$gameSwitches.value(200)&&$gameSwitches.value(201)&&$gameParty.gold()===410&&$gameParty.numItems($dataItems[170])===1&&$gameVariables.value(51)===2));checks.push('three native sorting choices award first-pass reward and second standing point');
 await event(m.sorter[1],[0,0,1,2]);await ready(103);assert.equal(await p.evaluate(()=>$gameParty.gold()),410);checks.push('actual repeat practice pays no extra Credits');
 await p.evaluate(()=>{window.holdText='Rivet crew standing';});await event(2,[0]);await p.waitForFunction(()=>SceneManager._scene._messageWindow.pause&&$gameMessage._texts.join(' ').includes('Rivet crew standing'));await p.screenshot({path:'tools/local-projects/standing.png'});
 const widths=await p.evaluate(()=>{const w=SceneManager._scene._messageWindow;return $gameMessage._texts.map(t=>[w.textWidth(t),w.contentsWidth()]);});assert(widths.every(([w,max])=>w<=max));
 await p.evaluate(()=>holdText='');await p.waitForFunction(()=>SceneManager._scene instanceof Scene_Shop&&SceneManager._scene.isActive());
 const purchase=await p.evaluate(()=>{const s=SceneManager._scene,item=$dataWeapons[1],i=s._buyWindow._data.indexOf(item);if(s._buyWindow._price[i]!==45)throw Error('local discount missing');s._item=item;const g=$gameParty.gold(),n=$gameParty.numItems(item);s.doBuy(1);s.commandBuy();s._buyWindow.select(i);s._buyWindow.updateHelp();s._goldWindow.refresh();return {gold:$gameParty.gold(),spent:g-$gameParty.gold(),gained:$gameParty.numItems(item)-n,databasePrice:item.price,leadPipePrice:s._buyWindow._price[s._buyWindow._data.findIndex(o=>o.id===17)]};});
 assert.deepEqual(purchase,{gold:365,spent:45,gained:1,databasePrice:50,leadPipePrice:162});await p.screenshot({path:'tools/local-projects/discount-shop.png'});checks.push('native hardware purchase uses 45 Credits, preserves database price and discounts custom goods');
 await p.evaluate(()=>SceneManager.pop());await ready(103);assert.deepEqual(errors,[]);
 fs.writeFileSync('tools/local-projects/visual-validation.json',JSON.stringify({passed:true,checks,purchase,errors},null,2));console.log('PASS end-to-end local projects route, sorting replay and actual discounted shop purchase');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});
