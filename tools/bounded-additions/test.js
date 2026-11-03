const fs = require('fs'), path = require('path'), assert = require('assert');
const { chromium } = require('C:/Users/jborn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('http://game.test/**', r => {
      const file = path.resolve(decodeURIComponent(new URL(r.request().url()).pathname.slice(1)));
      return fs.existsSync(file) ? r.fulfill({ path: file }) : r.fulfill({ status: 404, body: '' });
    });
    await page.goto('http://game.test/index.html');
    await page.waitForFunction(() => window.SceneManager && SceneManager._scene instanceof Scene_Title);
    const manifest = JSON.parse(fs.readFileSync('tools/bounded-additions/manifest.json'));
    const maps = Object.fromEntries([103,105,106,108,110,112,114,244].map(n => [n, JSON.parse(fs.readFileSync('data/Map'+String(n).padStart(3,'0')+'.json'))]));
    const checks = await page.evaluate(({ m, maps }) => {
      const checks = [];
      function ok(value, label) { if (!value) throw Error(label); checks.push(label); }
      function fresh() { DataManager.setupNewGame(); $gamePlayer.clearTransferInfo(); $gameMessage.clear(); }
      function map(n) { $dataMap=maps[n]; $gameMap.setup(n); $gamePlayer.clearTransferInfo(); }
      function runList(list, id, answers) {
        const i = new Game_Interpreter(), lines = [], choices = [];
        i.setup(list, id);
        let count=0;
        while (i.isRunning() && count++ < 800) {
          lines.push(...$gameMessage._texts);
          if ($gameMessage.isChoice()) {
            choices.push($gameMessage.choices().slice());
            $gameMessage.onChoice(answers.length ? answers.shift() : $gameMessage.choiceCancelType());
          }
          $gameMessage.clear(); i._waitCount=0; i._waitMode=''; i.update();
          if ($gamePlayer.isTransferring()) break;
        }
        if(count>=800) throw Error('Interpreter stalled '+id);
        return {lines:lines.join(' ').replace(/\s+/g,' '), choices};
      }
      function run(n,id,answers=[],pg=0) { map(n); return runList(maps[n].events[id].pages[pg].list,id,answers); }
      const count = id => $gameParty.numItems($dataItems[id]);
      const gain = (id,n=1) => $gameParty.gainItem($dataItems[id],n);
      const save = () => DataManager.extractSaveContents(JsonEx.parse(JsonEx.stringify(DataManager.makeSaveContents())));
      const random=Math.random, randomInt=Math.randomInt;
      try {
        for (const p of m.pickups) {
          fresh(); run(p.map,p.event,[1]); ok(count(p.item)===0,'decline salvage '+p.item);
          gain(p.item,99); run(p.map,p.event,[0]); ok(!$gameSelfSwitches.value([p.map,p.event,'A']),'full pack preserves cache '+p.item);
          gain(p.item,-99); run(p.map,p.event,[0]); run(p.map,p.event,[0]);
          ok(count(p.item)===1 && count(190)===1,'salvage and notebook awarded once '+p.item);
          gain(p.item,-1); save(); run(p.map,p.event,[0]); ok(count(p.item)===0,'consumed salvage cannot respawn '+p.item);
        }
        for(const p of m.hazards) {
          fresh(); const warn=run(p.map,p.event,[2]);
          ok(warn.lines.includes('50%') && count(p.item)===0 && !$gameParty.leader().isStateAffected(p.state),'warning and safe decline '+p.state);
          run(p.map,p.event,[0]); ok(count(p.item)===0,'sterilizing requires purge '+p.state);
          gain(157,2); gain(p.item,99); run(p.map,p.event,[0]);
          ok(count(157)===2 && !$gameSelfSwitches.value([p.map,p.event,'A']),'capacity prevents purge cost and cache loss '+p.state);
          gain(p.item,-99); Math.random=()=>0; run(p.map,p.event,[0]);
          ok(count(157)===1 && count(p.item)===1 && !$gameParty.leader().isStateAffected(p.state),'protected collection costs one and avoids exposure '+p.state);
          run(p.map,p.event,[1]); ok(count(157)===1 && !$gameParty.leader().isStateAffected(p.state),'cleared hazard cannot expose again '+p.state);
          fresh(); Math.random=()=>0; run(p.map,p.event,[1]);
          ok($gameParty.leader().isStateAffected(p.state) && count(p.item)===1,'bare collection applies disease '+p.state);
          const act=new Game_Action($gameParty.leader()); act.setItem(157); act.apply($gameParty.leader());
          ok(!$gameParty.leader().isStateAffected(p.state),'available purge cures hazard disease '+p.state);
          fresh(); Math.random=()=>0.99; run(p.map,p.event,[1]); ok(!$gameParty.leader().isStateAffected(p.state),'exposure can fail '+p.state);
          fresh(); const a=$gameParty.leader(), klass=$dataClasses[a._classId];
          klass.traits.push({code:13,dataId:p.state,value:0}); Math.random=()=>0; run(p.map,p.event,[1]);
          ok(!a.isStateAffected(p.state),'state-rate zero respected '+p.state); klass.traits.pop();
          fresh(); const b=$gameParty.leader(), cls=$dataClasses[b._classId];
          cls.traits.push({code:14,dataId:p.state,value:1}); run(p.map,p.event,[1]);
          ok(!b.isStateAffected(p.state),'full immunity respected '+p.state); cls.traits.pop();
        }
        fresh(); run(103,2,[1,0]); ok(!$gameSwitches.value(191),'exchange rejects incomplete set');
        m.parts.forEach(id=>gain(id)); run(103,2,[1,1]); ok(m.parts.every(id=>count(id)===1),'exchange may be postponed');
        gain(171,99); run(103,2,[1,0]); ok(m.parts.every(id=>count(id)===1)&&!$gameSwitches.value(191),'full Panacea inventory preserves six parts');
        gain(171,-99); run(103,2,[1,0]);
        ok(m.parts.every(id=>count(id)===0) && count(171)===1 && $gameParty.gold()===250 && $gameSwitches.value(191),'six-part exchange exact reward');
        save(); m.parts.forEach(id=>gain(id)); run(103,2,[1,0]); ok($gameParty.gold()===250&&count(171)===1,'exchange persists and cannot pay twice');
        fresh(); run(106,2,[1,0]); ok(!$gameSwitches.value(192),'cookbook requires all three cards');
        for(const p of m.jokes) { const route=a=>p.map===103&&p.event===5?[0,...a]:a; run(p.map,p.event,route([1])); ok(!count(p.item),'joke can be declined '+p.item); run(p.map,p.event,route([0])); run(p.map,p.event,route([0])); ok(count(p.item)===1,'unique joke source '+p.item); }
        run(106,2,[1,1]); ok(!count(189),'cookbook reward can be postponed');
        gain(189,99); run(106,2,[1,0]); ok(!$gameSwitches.value(192)&&$gameParty.gold()===0,'cookbook full capacity defers payment');
        gain(189,-99); run(106,2,[1,0]);
        ok(count(189)===1 && m.jokeItems.every(id=>count(id)===1) && $gameParty.gold()===100,'cookbook plus credits with readable cards retained');
        save(); run(106,2,[1,0]); ok(count(189)===1&&$gameParty.gold()===100,'joke reward once across saves');
        for(const policy of [false,true]) {
          fresh(); run(244,6,[0]); ok(!count(191),'letter locked until uprising resolved '+policy);
          $gameSwitches.setValue(183,true); $gameSwitches.setValue(184,policy); run(244,6,[0]); run(244,6,[0]);
          ok(count(191)===1,'archived letter available once for policy '+policy);
          gain(9,99); run(106,2,[2]); ok(count(191)===1&&!$gameSwitches.value(193),'letter reward capacity preserves letter '+policy);
          gain(9,-99); run(106,2,[2]); ok(count(191)===0&&count(9)===1&&$gameSwitches.value(193),'letter delivery exact reward '+policy);
          save(); run(244,6,[0]); run(106,2,[2]); ok(!count(191)&&count(9)===1,'letter cannot reprint or repay '+policy);
        }
        fresh(); gain(186); gain(180); const reference=runList($dataCommonEvents[9].list,0,[0]);
        ok(reference.lines.includes('Joke cards: 1/3')&&reference.lines.includes('Recycling: 1/6')&&reference.lines.includes('Joint Venture'),'scrapbook uses actual counts and readable collected joke');
        const emptyRecipes=runList($dataCommonEvents[9].list,0,[1]); ok(emptyRecipes.lines.includes('Collect the three joke cards'),'unearned cookbook not fabricated');
        gain(189); const recipes=runList($dataCommonEvents[9].list,0,[1]); ok(recipes.lines.includes('100 HP')&&recipes.lines.includes('150 HP')&&recipes.lines.includes('30 MP'),'earned cookbook uses real food values');
        for(const choice of [2,3,4,5]) ok(runList($dataCommonEvents[9].list,0,[choice]).choices.length===1,'scrapbook category exits '+choice);
        fresh(); $gameParty._inBattle=true; Math.random=()=>0; Math.randomInt=()=>0;
        const user=$gameParty.leader(), target=$gameParty.members()[1];
        for(const [skill,state] of [[269,77],[270,78],[271,79]]) {
          target.recoverAll(); target.clearResult(); const act=new Game_Action(user); act.setSkill(skill); act.apply(target);
          ok(target.isStateAffected(state),'native skill applies '+state);
          const turns=$dataStates[state].maxTurns;
          for(let n=1;n<=turns;n++){ target.onTurnEnd(); ok(target.isStateAffected(state)===(n<turns),'exact turn-end expiry '+state+'/'+n); }
        }
        target.recoverAll(); target.clearResult(); const agi=target.agi,pdr=target.pdr;
        target.addState(79); ok(target.pdr===pdr*.75 && target.agi===Math.round(agi*.85),'Stone Skin applies PDR and AGI tradeoff');
        let act=new Game_Action(user);act.setSkill(273);act.apply(target);ok(target.pdr===pdr&&target.agi===agi,'Shed Stone restores both original values');
        for(const [kind,id,states] of [['skill',272,[77,78]],['item',192,[77,78]],['item',193,[79]],['skill',274,[79]],['item',171,[77,78]]]){
          target.recoverAll();target.clearResult();states.forEach(s=>target.addState(s));
          act=new Game_Action(user);kind==='item'?act.setItem(id):act.setSkill(id);act.apply(target);
          ok(states.every(s=>!target.isStateAffected(s)),'actual remover '+kind+' '+id);
        }
        for(const id of [115,117,...Array.from({length:10},(_,i)=>142+i)]){
          const boss=new Game_Enemy(id,300,300);
          for(const [skill,state] of [[269,77],[270,78]]) {act=new Game_Action(user);act.setSkill(skill);act.apply(boss);ok(!boss.isStateAffected(state),'boss immunity '+id+'/'+state);}
        }
        for(const [enemy,skill] of [[8,275],[110,276],[63,277]]) { const e=new Game_Enemy(enemy,300,300),a=e.enemy().actions.find(a=>a.skillId===skill); $gameTroop._turnCount=enemy===110?3:2; ok(e.isActionValid(a),'enemy can use added action '+enemy+'/'+skill); }
        for(const [actor,skills] of [[1,[270,274]],[2,[271,272,273]],[3,[269,271]],[4,[269,272]],[5,[269,273]]]) ok(skills.every(id=>$gameActors.actor(actor).isLearnedSkill(id)||$gameActors.actor(actor).addedSkills().includes(id)),'existing-save actor receives class techniques '+actor);
        target.clearResult();target.addState(77);ok(!target.canMove(),'Paralysis actually blocks action');target.onBattleEnd();ok(!target.isStateAffected(77),'hard lock removed at battle end');$gameParty._inBattle=false;
        const enemy=new Game_Enemy(8,300,300);enemy.makeActions();enemy.clearResult();
        act=new Game_Action(user);act.setSkill(270);act.apply(enemy);
        ok(enemy.isStateAffected(78)&&!enemy.canMove()&&enemy.numActions()===0,'Temporal Stasis cancels queued native actions');
        enemy.onTurnEnd();ok(!enemy.isStateAffected(78)&&enemy.canMove(),'Temporal Stasis releases target at current turn end');
        ok($dataSkills[270].speed===200,'Borrowed Second has explicit fast-action priority');
        fresh();
        function outfit(a,ids){ for(const id of ids){const armor=$dataArmors[id],slot=a.equipSlots().indexOf(armor.etypeId); $gameParty.gainItem(armor,1); a.changeEquip(slot,armor);ok(a.equips().includes(armor),'native outfit piece equips '+id); } }
        const a=$gameParty.members()[1], b=$gameParty.leader(); const clean=a.equips().slice();
        outfit(a,[50]);outfit(b,[51]);let reaction=run(106,4,[1]).lines;
        ok(!reaction.includes('leased your ankles'),'split outfit across actors does not trigger');
        outfit(a,[51]); for(const [n,e] of m.reactionNPCs) {const r=run(n,e,[1]);ok(r.lines.includes(n===103?'chalk outline':n===105?'leaking into the invoices':'leased your ankles'),'work outfit recognized '+n);}
        a.equipSlots().forEach((_,i)=>a.changeEquip(i,clean[i]));reaction=run(106,4,[1]).lines;ok(!reaction.includes('leased your ankles'),'unequipping changes reaction');
        outfit(a,[58,59]); for(const [n,e] of m.reactionNPCs) {const r=run(n,e,[1]);ok(r.lines.includes(n===103?'repossess a spleen':n===105?'jurisdiction upgrade':'pension is still payable in teeth'),'inspector outfit recognized '+n);}
        $gameParty.addActor(2);$gameParty.addActor(5);$gameParty._actors=[1,4,2,5,3];
        ok(!run(106,4,[1]).lines.includes('pension is still payable in teeth'),'outfit on a reserve member does not trigger visible-party reaction');
        ok(!$gameSwitches.value(191)&&!$gameSwitches.value(192)&&!$gameSwitches.value(193),'outfit reactions do not complete side quests');
        const shop=maps[103].events[3].pages[0].list; for(const id of [50,51,58,59])ok(shop.some(c=>[302,605].includes(c.code)&&c.parameters[0]===2&&c.parameters[1]===id&&c.parameters[2]===1&&c.parameters[3]>0),'outfit sold at explicit price '+id);
        const pharma=maps[105].events[5].pages[0].list; for(const id of [192,193])ok(pharma.some(c=>[302,605].includes(c.code)&&c.parameters[0]===0&&c.parameters[1]===id),'new cure available at pharmacy '+id);
        fresh();$gameParty.gainGold(50);$gameParty.leader().setHp(1);run(106,2,[0,0]);ok($gameParty.gold()===30&&$gameParty.leader().hp===$gameParty.leader().mhp,'original canteen rest still works at 20 credits');
        const guide=ME.FieldGuide;for(const id of [77,78,79])ok(guide.model({kind:'state',id}).rows.map(r=>r.text).join('\n').includes($dataStates[id].name),'live Field Guide covers state '+id);
        // Verify every new cache can be approached from the main native walkable area.
        for(const p of [...m.pickups,...m.hazards]) {
          fresh();map(p.map);const e=maps[p.map].events[p.event],seen=new Set(),areas=[];
          for(let y=0;y<$gameMap.height();y++)for(let x=0;x<$gameMap.width();x++){
            const seed=x+','+y;if(seen.has(seed)||$gameMap.eventsXyNt(x,y).some(e=>e.isNormalPriority())||![2,4,6,8].some(d=>$gameMap.isPassable(x,y,d)))continue;
            const q=[[x,y]],area=new Set([seed]);seen.add(seed);
            for(let k=0;k<q.length;k++){let[x,y]=q[k];for(const[dx,dy,d]of[[0,1,2],[-1,0,4],[1,0,6],[0,-1,8]]){const xx=x+dx,yy=y+dy,key=xx+','+yy;if(seen.has(key)||!$gameMap.isValid(xx,yy)||!$gameMap.isPassable(x,y,d)||!$gameMap.isPassable(xx,yy,10-d)||$gameMap.eventsXyNt(xx,yy).some(e=>e.isNormalPriority()))continue;seen.add(key);area.add(key);q.push([xx,yy]);}}
            areas.push(area);
          }
          const largest=areas.sort((a,b)=>b.size-a.size)[0];
          ok([[0,1],[-1,0],[1,0],[0,-1]].some(([dx,dy])=>largest.has((e.x+dx)+','+(e.y+dy))),'new cache reachable using native collision '+p.map+'/'+p.event);
        }
        return checks;
      } finally {Math.random=random;Math.randomInt=randomInt;$gameParty._inBattle=false;}
    }, {m:manifest,maps});
    fs.writeFileSync('tools/bounded-additions/logic-validation.json',JSON.stringify({passed:true,checks,errors},null,2));
    assert.deepEqual(errors,[]); console.log('PASS '+checks.length+' native event/mechanic checks');
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
