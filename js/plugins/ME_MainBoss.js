/*:
 * @plugindesc Phased main bosses with named attacks, warned targets and pose sequences.
 * @help Enable after ME_Boss and ME_Custodians. Opt-in: <ME_MainBoss: Underwriter>
 * Definitions below are the runtime contract. No commands, permanent actor skills,
 * timer-driven damage or changes to untagged enemies. Phase two latches at <=50%.
 * Warnings execute one turn before a slow strike. Restriction cancels the charge.
 * Transition cancels old warnings visibly and consumes remaining boss actions that
 * turn. Death wins normally. Healing never reverses a phase. See tools/main-boss.
 */
var ME_MainBoss=ME_MainBoss||{};
(function(B){'use strict';
B.definitions={Underwriter:{image:'Underwriter',defeatArt:{image:'UnderwriterDefeat',scale:.24,anchor:[724,969]},scale:.51,phaseAt:.5,recover:184,
 transitionText:'HOSTILE ACQUISITION! Old claims cancelled. New attacks unlock.',
 rects:[[0,0,520,490],[520,0,500,490],[1020,0,516,490],[0,490,590,534],[570,490,480,534],[1050,490,486,534]],
 anchors:[[260,477],[260,477],[270,477],[290,480],[220,480],[260,480]],
 exclude:{3:[[570,250,20,284]],4:[[0,0,20,180]]},
 phases:{1:['slam','spit'],2:['outbreak','slam','siphon','spit']},
 attacks:{
  slam:{warn:176,skill:177,phase:1,target:'one',text:'CLAIM DENIED: {target}. Guard next turn!',motion:'slam'},
  spit:{warn:178,skill:179,phase:1,target:'one',text:'HERPES FINE PRINT: {target}. Guard! Parcel Fever lasts two turns.',motion:'spit'},
  outbreak:{warn:180,skill:181,phase:2,target:'all',text:'OPEN ENROLLMENT: whole party. Guard next turn, then heal!',motion:'outbreak'},
  siphon:{warn:182,skill:183,phase:2,target:'one',text:'PREMIUM EXTRACTION: {target}. Guard to reduce his healing!',motion:'siphon'}
 },
 sequences:{idle:[[0,90]],warn_slam:[[0,12],[5,24],[0,18]],warn_spit:[[0,12],[2,24],[0,18]],warn_outbreak:[[0,12],[3,24],[0,18]],warn_siphon:[[0,12],[4,24],[0,18]],
 slam:[[0,8],[1,26],[5,12]],spit:[[0,8],[2,30],[5,12]],outbreak:[[5,8],[3,40],[5,12]],siphon:[[0,8],[4,40],[5,12]],transition:[[5,18],[3,18],[5,24]],recover:[[5,20],[0,16]],hit:[[5,12],[0,10]],defeat:[[5,150]]}
}};
B.config=function(e){var m=e&&e.isEnemy&&e.isEnemy()&&/<ME_MainBoss:\s*(\w+)>/.exec(e.enemy().note||'');return m&&B.definitions[m[1]];};
B.state=function(e){return e._mainBoss||(e._mainBoss={phase:1,cursor:0,charge:null,recovery:false,lastTurn:-1,transitionTurn:-1,pending:false,motion:null});};
B.entry=function(c,id){for(var k in c.attacks){var a=c.attacks[k];if(a.warn===id||a.skill===id)return {key:k,attack:a,warning:a.warn===id};}return null;};
B.say=function(text){if(!BattleManager._logWindow)return;var lines=text.match(/.{1,58}(?:\s|$)|\S+/g)||[text];lines.forEach(function(line){BattleManager._logWindow.push('addText',line.trim());});};
B.cancel=function(e,text){var s=B.state(e);if(s.charge){s.charge=null;s.recovery=true;B.say(text||'Charge interrupted. The claim expires.');}};
B.transition=function(e){var c=B.config(e);if(!c||!e.isAlive())return false;var s=B.state(e);if(s.phase!==1||(!s.pending&&e.hpRate()>c.phaseAt))return false;
 s.phase=2;s.pending=false;s.cursor=0;s.charge=null;s.recovery=false;s.transitionTurn=$gameTroop.turnCount();
 B.say(c.transitionText);if(BattleManager._logWindow){BattleManager._logWindow.push('mainBossMotion',e,'transition');BattleManager._logWindow.push('mainBossWait',60);}return true;
};
B.frame=function(c,motion,t){var seq=c.sequences[motion]||c.sequences.idle;for(var i=0;i<seq.length;i++){if(t<seq[i][1])return seq[i][0];t-=seq[i][1];}return seq[seq.length-1][0];};
B.duration=function(c,motion){return (c.sequences[motion]||c.sequences.idle).reduce(function(n,f){return n+f[1];},0);};
B.draw=function(ctx,c,im,motion,t){if(motion==='defeat'&&c.defeatArt&&im._mainBossDefeat){var d=c.defeatArt;ctx.save();ctx.scale(d.scale,d.scale);ctx.drawImage(im._mainBossDefeat,-d.anchor[0],-d.anchor[1]);ctx.restore();return;}var frame=B.frame(c,motion,t),r=c.rects[frame],a=c.anchors[frame];ctx.save();ctx.scale(c.scale,c.scale);if(c.exclude&&c.exclude[frame]){ctx.beginPath();ctx.rect(-a[0],-a[1],r[2],r[3]);c.exclude[frame].forEach(function(e){ctx.rect(e[0]-a[0],e[1]-a[1],e[2],e[3]);});ctx.clip('evenodd');}ctx.drawImage(im,r[0],r[1],r[2],r[3],-a[0],-a[1],r[2],r[3]);ctx.restore();};
if(typeof Game_Enemy==='undefined')return;
var setHp=Game_Enemy.prototype.setHp;
Game_Enemy.prototype.setHp=function(hp){setHp.call(this,hp);var c=B.config(this);if(c&&this.isAlive()&&this.hpRate()<=c.phaseAt&&B.state(this).phase===1)B.state(this).pending=true;};
var setup=Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup=function(){setup.apply(this,arguments);this._mainBoss=null;};
var make=Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions=function(){var c=B.config(this);if(!c)return make.call(this);Game_Battler.prototype.makeActions.call(this);var s=B.state(this),next=$gameTroop.turnCount()+1,id=c.recover;
 if(s.charge&&s.charge.due===next)id=c.attacks[s.charge.key].skill;
 else if(!s.recovery){var list=c.phases[s.phase];id=c.attacks[list[s.cursor%list.length]].warn;}
 // One meaningful action per round even if states grant extra actions.
 for(var i=0;i<this.numActions();i++)this.action(i).setSkill(i===0?id:c.recover);this.setActionState('waiting');
};
var restrict=Game_Battler.prototype.onRestrict;
Game_Battler.prototype.onRestrict=function(){restrict.call(this);if(B.config(this))B.cancel(this);};
var turnEnd=Game_Enemy.prototype.onTurnEnd;
Game_Enemy.prototype.onTurnEnd=function(){turnEnd.call(this);if(!B.config(this))return;var s=B.state(this);if(s.charge&&s.charge.due<=$gameTroop.turnCount())B.cancel(this,'The missed warning expires.');B.transition(this);};
var targets=Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets=function(){var c=B.config(this.subject());if(c){var a=B.entry(c,this.item().id);if(a&&!a.warning&&a.attack.target==='one'){var id=this._mainBossTarget,actor=$gameActors.actor(id);return actor&&actor.isAlive()&&$gameParty.battleMembers().indexOf(actor)>=0?[actor]:[];}}return targets.call(this);};
B.prepare=function(e,action,turn){var c=B.config(e);if(c){var s=B.state(e),entry=B.entry(c,action.item().id);
  if(s.transitionTurn===turn||s.lastTurn===turn||!entry||entry.attack.phase>s.phase){action.setSkill(c.recover);if(s.lastTurn!==turn)s.recovery=false;}
  else if(entry.warning){var living=$gameParty.aliveMembers(),target=living[Math.randomInt(living.length)];if(!target){action.setSkill(c.recover);}else{s.charge={key:entry.key,due:turn+1,target:target.actorId()};s.cursor++;s.recovery=false;B.say(entry.attack.text.replace('{target}',target.name()));}}
  else{var charge=s.charge,target=charge&&$gameActors.actor(charge.target);if(!charge||charge.key!==entry.key||charge.due!==turn||(entry.attack.target==='one'&&(!target||!target.isAlive()||$gameParty.battleMembers().indexOf(target)<0))){action.setSkill(c.recover);B.say('Claim cancelled. No valid warned target.');}else{action._mainBossTarget=charge.target;}s.charge=null;s.recovery=true;}
  s.lastTurn=turn;
 }};
var start=BattleManager.startAction;
BattleManager.startAction=function(){B.prepare(this._subject,this._subject.currentAction(),$gameTroop.turnCount());start.call(this);};
var end=BattleManager.endAction;
BattleManager.endAction=function(){end.call(this);$gameTroop.members().forEach(B.transition);};
Window_BattleLog.prototype.mainBossMotion=function(e,name){var c=B.config(e);B.state(e).motion={name:name,start:Graphics.frameCount,duration:B.duration(c,name)};};
Window_BattleLog.prototype.mainBossWait=function(frames){this._waitCount=frames;};
var logStart=Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction=function(e,action,targets){var c=B.config(e);if(c){var entry=B.entry(c,action.item().id),motion=entry?(entry.warning?'warn_':'')+entry.key:'recover';this.push('mainBossMotion',e,motion);this.push('mainBossWait',entry&&!entry.warning?12:24);}logStart.call(this,e,action,targets);};
var logEnd=Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.endAction=function(e){var c=B.config(e);if(c){this.push('mainBossWait',24);this.push('mainBossMotion',e,'recover');this.push('mainBossWait',24);}logEnd.call(this,e);};
var bitmap=Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap=function(){var c=B.config(this._enemy);if(!c)return bitmap.call(this);if(!this._mainBossSource){this._mainBossSource=ImageManager.loadBitmap('img/bosses/main/',c.image,0,true);this._mainBossDefeat=c.defeatArt?ImageManager.loadBitmap('img/bosses/main/',c.defeatArt.image,0,true):null;this.bitmap=new Bitmap(420,310);this.initVisibility();}if(!this._mainBossSource.isReady()||(this._mainBossDefeat&&!this._mainBossDefeat.isReady()))return;if(this._mainBossDefeat)(this._mainBossSource._canvas||this._mainBossSource._image)._mainBossDefeat=this._mainBossDefeat._canvas||this._mainBossDefeat._image;var s=B.state(this._enemy),m=s.motion,t=m?Graphics.frameCount-m.start:0,name=this._enemy.isDead()?'defeat':m&&t<m.duration?m.name:'idle',stamp=name+':'+B.frame(c,name,t);if(this._mainBossStamp===stamp)return;this._mainBossStamp=stamp;this.bitmap.clear();var ctx=this.bitmap._context;ctx.save();ctx.translate(210,300);B.draw(ctx,c,this._mainBossSource._canvas||this._mainBossSource._image,name,t);ctx.restore();this.bitmap._setDirty();};
var collapseStart=Sprite_Enemy.prototype.startCollapse,collapseUpdate=Sprite_Enemy.prototype.updateCollapse;
Sprite_Enemy.prototype.startCollapse=function(){var c=B.config(this._enemy);if(c&&c.defeatArt){this._effectDuration=120;this._appeared=false;this.opacity=255;this.blendMode=0;this.setBlendColor([0,0,0,0]);}else collapseStart.call(this);};
Sprite_Enemy.prototype.updateCollapse=function(){var c=B.config(this._enemy);if(c&&c.defeatArt){this.blendMode=0;this.setBlendColor([0,0,0,0]);this.opacity=255*Math.min(1,this._effectDuration/30);}else collapseUpdate.call(this);};
var icons=Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateStateSprite=function(){if(B.config(this._enemy))this._stateIconSprite.y=-265;else icons.call(this);};
// Active-page map portrait; the victory page restores its terminal graphic.
function mapDefinition(sprite){var e=sprite._character;if(!(e instanceof Game_Event)||!e.page())return null;var list=e.list();for(var i=0;i<list.length;i++)if(list[i].code===108){var m=/<ME_MainBossMap: (\w+)>/.exec(list[i].parameters[0]);if(m)return B.definitions[m[1]];}return null;}
var mapBitmap=Sprite_Character.prototype.updateBitmap,mapFrame=Sprite_Character.prototype.updateFrame;
Sprite_Character.prototype.updateBitmap=function(){var c=mapDefinition(this);if(c){if(!this._mainMap){this._mainMap=c;this.bitmap=ImageManager.loadBitmap('img/bosses/main/',c.image,0,true);}this.scale.set(.15,.15);return;}if(this._mainMap){this._mainMap=null;this._characterName=null;this.scale.set(1,1);}mapBitmap.call(this);};
Sprite_Character.prototype.updateFrame=function(){if(this._mainMap){var r=this._mainMap.rects[0];this.setFrame(r[0],r[1],r[2],r[3]);}else mapFrame.call(this);};
})(ME_MainBoss);
