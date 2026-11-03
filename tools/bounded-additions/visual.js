const fs=require('fs'),path=require('path'),assert=require('assert');
const {chromium}=require('C:/Users/jborn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({channel:'chrome',headless:true});
 try{
  const p=await b.newPage({viewport:{width:1280,height:900}}),errors=[],checks=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.route('http://game.test/**',r=>{const f=path.resolve(decodeURIComponent(new URL(r.request().url()).pathname.slice(1)));return fs.existsSync(f)?r.fulfill({path:f}):r.fulfill({status:404,body:''});});
  await p.goto('http://game.test/index.html');await p.waitForFunction(()=>window.SceneManager&&SceneManager._scene instanceof Scene_Title);
  async function ready(n){await p.waitForFunction(n=>SceneManager._scene instanceof Scene_Map&&SceneManager._scene.isActive()&&$gameMap.mapId()===n&&!$gamePlayer.isTransferring()&&!$gameMap.isEventRunning()&&!$gameMap.events().some(e=>e.isStarting())&&!$gameMessage.isBusy()&&SceneManager._scene._fadeDuration===0,n,{timeout:18000});}
  await p.evaluate(()=>{DataManager.setupNewGame();$gameSystem.disableEncounter();$gamePlayer.reserveTransfer(110,27,22,6,0);SceneManager.goto(Scene_Map);window.autoMessages=setInterval(()=>{let s=SceneManager._scene;if(!$gameMessage.isChoice()&&$gameMessage.hasText()&&s._messageWindow)s._messageWindow.terminateMessage();},30);});await ready(110);
  await p.evaluate(()=>$gameMap.event(7).start());await p.waitForFunction(()=>$gameMessage.isChoice()&&SceneManager._scene._messageWindow._choiceWindow.openness===255);await p.screenshot({path:'tools/bounded-additions/hazard.png'});
  assert(await p.evaluate(()=>$gameMessage.choices()[2]==='Leave untouched'));checks.push('actual hazard warning offers cost, exposure and safe exit');
  await p.evaluate(()=>{let s=SceneManager._scene;$gameMessage.onChoice(2);s._messageWindow.terminateMessage();s._messageWindow._choiceWindow.close();s._messageWindow._choiceWindow.deactivate();});await ready(110);
  // Native key-item UI and common-event return path.
  await p.evaluate(()=>{$gameParty.gainItem($dataItems[190],1);$gameParty.gainItem($dataItems[186],1);$gameParty.gainItem($dataItems[180],1);SceneManager.push(Scene_Item);});
  await p.waitForFunction(()=>SceneManager._scene instanceof Scene_Item&&SceneManager._scene.isActive());
  await p.evaluate(()=>SceneManager._scene._categoryWindow.selectSymbol('keyItem'));
  await p.waitForFunction(()=>SceneManager._scene._itemWindow._category==='keyItem');
  await p.evaluate(()=>{let s=SceneManager._scene;s._categoryWindow.processOk();s._itemWindow.select(s._itemWindow._data.findIndex(i=>i&&i.id===190));s._itemWindow.updateHelp();});
  await p.screenshot({path:'tools/bounded-additions/scrapbook-item.png'});
  await p.evaluate(()=>{clearInterval(autoMessages);SceneManager._scene._itemWindow.processOk();});
  await p.waitForFunction(()=>SceneManager._scene instanceof Scene_Map&&SceneManager._scene._messageWindow&&SceneManager._scene._messageWindow.pause);
  await p.screenshot({path:'tools/bounded-additions/scrapbook-counts.png'});
  const introWidth=await p.evaluate(()=>{const s=SceneManager._scene,w=s._messageWindow,lines=$gameMessage._texts.slice();return {lines,width:w.contentsWidth(),measure:lines.map(text=>w.textWidth(text))};});
  assert(introWidth.lines.length===3&&introWidth.measure.every(w=>w<=introWidth.width));checks.push('dynamic scrapbook counts fit three native message lines');
  await p.waitForFunction(()=>SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0);
  await p.keyboard.press('Enter',{delay:100});await p.waitForTimeout(80);
  await p.evaluate(()=>{window.autoMessages=setInterval(()=>{const s=SceneManager._scene;if(!$gameMessage.isChoice()&&$gameMessage.hasText()&&s._messageWindow)s._messageWindow.terminateMessage();},30);});
  try{await p.waitForFunction(()=>SceneManager._scene instanceof Scene_Map&&$gameMessage.isChoice()&&SceneManager._scene._messageWindow._choiceWindow.openness===255,null,{timeout:8000});}catch(e){console.log(await p.evaluate(()=>{const w=SceneManager._scene._messageWindow,i=$gameMap._interpreter;return {texts:$gameMessage._texts,choices:$gameMessage.choices(),pause:w.pause,textState:w._textState,openness:w.openness,choiceOpen:w._choiceWindow.openness,index:i._index,wait:i._waitMode,child:i._childInterpreter&&{index:i._childInterpreter._index,wait:i._childInterpreter._waitMode}};}));throw e;}
  await p.screenshot({path:'tools/bounded-additions/scrapbook-menu.png'});checks.push('native Key Item opens scrapbook common event with six choices');
  await p.evaluate(()=>{const s=SceneManager._scene;$gameMessage.onChoice(5);s._messageWindow.terminateMessage();s._messageWindow._choiceWindow.close();s._messageWindow._choiceWindow.deactivate();});await ready(110);
  // Existing shop command goods, actual purchases at event prices.
  const armorGoods=JSON.parse(fs.readFileSync('data/Map103.json')).events[3].pages[0].list.filter(c=>[302,605].includes(c.code)).map(c=>c.parameters.slice(0,4));
  await p.evaluate(goods=>{$gameParty.gainGold(2000);SceneManager.push(Scene_Shop);SceneManager.prepareNextScene(goods,false);},armorGoods);
  await p.waitForFunction(()=>SceneManager._scene instanceof Scene_Shop&&SceneManager._scene.isActive());
  const bought=await p.evaluate(()=>{const s=SceneManager._scene,out=[];for(const[id,price]of[[50,100],[51,90],[58,140],[59,180]]){const item=$dataArmors[id],index=s._buyWindow._data.indexOf(item);if(index<0||s._buyWindow._price[index]!==price)throw Error('wrong outfit goods '+id);s._item=item;const g=$gameParty.gold(),n=$gameParty.numItems(item);s.doBuy(1);if($gameParty.gold()!==g-price||$gameParty.numItems(item)!==n+1)throw Error('wrong outfit purchase '+id);out.push(id);}s.commandBuy();s._buyWindow.select(s._buyWindow._data.indexOf($dataArmors[59]));s._buyWindow.updateHelp();s._goldWindow.refresh();return out;});
  assert.deepEqual(bought,[50,51,58,59]);await p.screenshot({path:'tools/bounded-additions/outfit-shop.png'});checks.push('all four costume pieces bought at stated prices');
  await p.evaluate(()=>SceneManager.pop());await ready(110);
  await p.evaluate(()=>{const a=$gameParty.members()[1];for(const id of[50,51])a.changeEquip(a.equipSlots().indexOf($dataArmors[id].etypeId),$dataArmors[id]);$gamePlayer.reserveTransfer(103,16,10,8,0);});await ready(103);
  await p.evaluate(()=>{clearInterval(autoMessages);$gameMap.event(11).start();});await p.waitForFunction(()=>SceneManager._scene._messageWindow.pause);await p.screenshot({path:'tools/bounded-additions/outfit-reaction.png'});
  await p.evaluate(()=>{window.autoMessages=setInterval(()=>{let s=SceneManager._scene;if($gameMessage.isChoice()){$gameMessage.onChoice($gameMessage.choiceCancelType());s._messageWindow.terminateMessage();s._messageWindow._choiceWindow.close();s._messageWindow._choiceWindow.deactivate();}else if($gameMessage.hasText()&&s._messageWindow)s._messageWindow.terminateMessage();},30);});await ready(103);checks.push('native equipped outfit triggers Forewoman dialogue and returns safely');
  // Full BattleManager actions: real actors and enemies, animated waits, exactly one effect.
  await p.evaluate(()=>{DataManager.setupNewGame();$gamePlayer.clearTransferInfo();$gameParty.addActor(2);$gameSystem.disableEncounter();BattleManager.setup(1,true,false);SceneManager.push(Scene_Battle);});
  await p.waitForFunction(()=>SceneManager._scene instanceof Scene_Battle&&BattleManager._phase==='input'&&!BattleManager.isBusy());
  await p.evaluate(()=>{window.finished=0;window.executed=[];window.animSeen={};const end=BattleManager.endAction;BattleManager.endAction=function(){end.call(this);this._phase='input';finished++;};const apply=Game_Action.prototype.apply;Game_Action.prototype.apply=function(target){if(SceneManager._scene._spriteset.isAnimationPlaying())throw Error('effect applied before animation finished');executed.push([this.isItem()?'item':'skill',this.item().id,target.isActor()?'actor':'enemy']);return apply.call(this,target);};const update=Sprite_Animation.prototype.updateFrame;Sprite_Animation.prototype.updateFrame=function(){update.call(this);if(this._animation&&this._animation.id>=220)animSeen[this._animation.id]=(animSeen[this._animation.id]||0)+1;};$gameTroop.members().forEach(e=>{e.addParam(0,50000);e.recoverAll();});});
  const rows=[['skill',269,3],['skill',270,1],['skill',271,3],['skill',272,2],['skill',273,2],['skill',274,1],['item',192,1],['item',193,1],['enemy',275,0],['enemy',276,0],['enemy',277,0]];
  for(let k=0;k<rows.length;k++){
   await p.evaluate(([kind,id,actor])=>{const a=kind==='enemy'?$gameTroop.members()[0]:$gameActors.actor(actor);$gameParty.members().forEach(a=>{a.recoverAll();a.clearResult();});$gameTroop.members().forEach(e=>{e.recoverAll();e.clearResult();});if([272,192].includes(id))$gameParty.leader().addState(77);if([273,193].includes(id))$gameParty.leader().addState(79);if(id===274)$gameTroop.members()[0].addState(79);if(kind!=='enemy'&&kind!=='item'&&!a.skills().some(s=>s.id===id))throw Error('actor lacks skill '+id);a.forceAction(1,0);if(kind==='item'){$gameParty.gainItem($dataItems[id],1);a.currentAction().setItem(id);}else a.currentAction().setSkill(id);a.currentAction().setTarget(0);BattleManager.forceAction(a);['_partyCommandWindow','_actorCommandWindow','_skillWindow','_itemWindow','_actorWindow','_enemyWindow'].forEach(key=>SceneManager._scene[key].deactivate());BattleManager.processForcedAction();},rows[k]);
   if(k===0||k===2){await p.waitForFunction(()=>SceneManager._scene._spriteset.isAnimationPlaying());await p.waitForTimeout(300);await p.screenshot({path:'tools/bounded-additions/battle-'+rows[k][1]+'.png'});}
   await p.waitForFunction(n=>finished>=n,k+1,{timeout:15000});
  }
  const runtime=await p.evaluate(()=>({executed,animSeen}));assert.equal(runtime.executed.length,11);for(let id=220;id<=224;id++)assert(runtime.animSeen[id]>0);checks.push('all nine skills and both remedies execute full actions, each applying once after animation');
  await p.evaluate(()=>{SceneManager._scene._partyCommandWindow.setup();});await p.waitForFunction(()=>SceneManager._scene._partyCommandWindow.active&&SceneManager._scene._partyCommandWindow.openness===255);await p.screenshot({path:'tools/bounded-additions/battle-ready.png'});
  assert.deepEqual(errors,[]);fs.writeFileSync('tools/bounded-additions/visual-validation.json',JSON.stringify({passed:true,checks,...runtime,errors},null,2));console.log('PASS native UI/purchases and 11 full actions; 5 animations rendered');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exit(1)});
