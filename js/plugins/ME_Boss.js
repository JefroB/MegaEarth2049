/*:
 * @plugindesc v1.0 MegaEarth telegraphed bosses and registered frame animation (MV).
 * @author MegaEarth2049
 * @help
 * Enable after other battle plugins. Enemy note: <ME_Boss: Repossessor>
 * Repossessor uses skills 151 scan, 152 charge, 153 clamp, 154 recovery,
 * 155 Jam Scanner. All living actors receive the temporary Jam Scanner command.
 * Scan -> one complete response round -> slow clamp. Two damaging hits or
 * one successful Jam Scanner interrupt it. Exposed bosses take 150% damage.
 * Below 50% HP: damaged art and stronger clamp; warning timing stays fair.
 * Configure ME_Boss.definitions for more atlas-based bosses. One boss HUD
 * is shown per battle. Ordinary enemies use the untouched native renderer.
 * No scripts in saves, no actor skill-list changes, no external dependencies.
 */
var Imported=Imported||{};Imported.ME_Boss=true;
var ME_Boss=ME_Boss||{};
(function(B){'use strict';
B.definitions={Repossessor:{normal:'RepossessorNormal',damaged:'RepossessorDamaged',scale:0.62,phaseAt:0.5,interruptHits:2,skills:{scan:151,charge:152,strike:153,recover:154,jam:155},rects:[[0,0,660,627],[660,0,594,627],[0,627,660,627],[660,627,594,627]],normalAnchors:[[137,584],[80,584],[137,542],[81,542]],damagedAnchors:[[137.5,588],[81.5,586],[136.5,543],[82,543]]}};
B.config=function(e){if(!e||!e.isEnemy||!e.isEnemy())return null;var m=/<ME_Boss:\s*(\w+)>/i.exec(e.enemy().note||'');return m?B.definitions[m[1]]||null:null;};
B.state=function(e){return e._meBoss||(e._meBoss={phase:1,charge:null,hits:0,exposedUntil:-1,frame:0,motionUntil:0});};
B.boss=function(){return $gameTroop.members().filter(function(e){return e.isAlive()&&B.config(e);})[0];};
B.say=function(t){if(BattleManager._logWindow)BattleManager._logWindow.push('addText',t);};
B.exposed=function(e){return B.state(e).exposedUntil >= $gameTroop.turnCount();};
B.interrupt=function(e){var s=B.state(e);s.charge=null;s.hits=0;s.exposedUntil=$gameTroop.turnCount()+1;s.frame=3;s.motionUntil=Graphics.frameCount+24;B.say('CLAMP JAMMED! Damage taken +50%.');};
var make=Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions=function(){var c=B.config(this);if(!c)return make.call(this);Game_Battler.prototype.makeActions.call(this);var s=B.state(this),next=$gameTroop.turnCount()+1,id=c.skills.scan;
if(s.charge)id=next>=s.charge.turn+2?c.skills.strike:c.skills.charge;else if(s.exposedUntil>=next)id=c.skills.recover;
for(var i=0;i<this.numActions();i++)this.action(i).setSkill(id);this.setActionState('waiting');};
var targets=Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets=function(){var e=this.subject(),c=B.config(e);if(c&&this.item().id===c.skills.strike){var charge=B.state(e).charge;var a=charge&&$gameActors.actor(charge.target);return a&&a.isAlive()&&$gameParty.battleMembers().indexOf(a)>=0?[a]:[];}return targets.call(this);};
var start=BattleManager.startAction;
BattleManager.startAction=function(){var e=this._subject,c=B.config(e),action=e.currentAction();if(c){var s=B.state(e),id=action.item().id;if(id===c.skills.scan){var actors=$gameParty.aliveMembers();if(actors.length){var a=actors[Math.randomInt(actors.length)];s.charge={target:a.actorId(),turn:$gameTroop.turnCount()};s.hits=0;B.say('MARKED: '+a.name()+'. Jam or guard!');}}else if(id===c.skills.strike){var a=s.charge&&$gameActors.actor(s.charge.target);if(!a||!a.isAlive()||!s.charge){action.setSkill(c.skills.recover);s.charge=null;}}}start.call(this);};
var damage=Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue=function(target,critical){var value=damage.call(this,target,critical);if(value>0&&B.config(target)&&B.exposed(target))value=Math.round(value*1.5);return value;};
var apply=Game_Action.prototype.apply;
Game_Action.prototype.apply=function(target){apply.call(this,target);var c=B.config(target);if(!c)return;var s=B.state(target),r=target.result();if(target.isDead()){s.charge=null;return;}if(s.phase===1&&target.hpRate()<=c.phaseAt){s.phase=2;B.say('OVERTIME! Armor off; clamp damage up.');}if(s.charge&&r.isHit()){if(this.item().id===c.skills.jam){B.interrupt(target);}else if(r.hpDamage>0){s.hits++;if(s.hits>=c.interruptHits)B.interrupt(target);}}};
// The log queue holds the actual attack until the wind-up drawing has played.
Window_BattleLog.prototype.meBossPose=function(e,frame,duration){var s=B.state(e);s.frame=frame;s.motionUntil=Graphics.frameCount+duration;};
Window_BattleLog.prototype.meBossWait=function(n){this._waitCount=n;};
var logStart=Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction=function(e,a,ts){var c=B.config(e);if(c&&a.item().id===c.skills.strike){this.displayAction(e,a.item());this.push('meBossPose',e,1,24);this.push('meBossWait',24);this.push('meBossPose',e,2,60);}else logStart.call(this,e,a,ts);};
var logEnd=Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.endAction=function(e){var c=B.config(e);if(c&&BattleManager._action&&BattleManager._action.item().id===c.skills.strike){B.state(e).charge=null;this.push('meBossPose',e,3,18);this.push('meBossWait',18);}logEnd.call(this,e);};
// Use the atlas directly. Per-frame foot anchors keep both phases on the floor.
var bitmap=Sprite_Enemy.prototype.updateBitmap,frame=Sprite_Enemy.prototype.updateFrame,icons=Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateBitmap=function(){var c=B.config(this._enemy);if(!c)return bitmap.call(this);var s=B.state(this._enemy),name=s.phase===2?c.damaged:c.normal;if(this._meSheet!==name){this._meSheet=name;this.bitmap=ImageManager.loadBitmap('img/bosses/',name,0,true);this.scale.set(c.scale,c.scale);if(!this._meInitialized){ImageManager.loadBitmap('img/bosses/',c.damaged,0,true);this.initVisibility();this._meInitialized=true;}}};
Sprite_Enemy.prototype.updateFrame=function(){var c=B.config(this._enemy);if(!c)return frame.call(this);var s=B.state(this._enemy);if(Graphics.frameCount>=s.motionUntil)s.frame=s.charge?1:0;var f=s.frame,r=c.rects[f],a=(s.phase===2?c.damagedAnchors:c.normalAnchors)[f];this.setFrame(r[0],r[1],r[2],r[3]);this.anchor.set(a[0]/r[2],a[1]/r[3]);};
Sprite_Enemy.prototype.updateStateSprite=function(){if(!B.config(this._enemy))return icons.call(this);this._stateIconSprite.x=120;this._stateIconSprite.y=-470;};
var commands=Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList=function(){commands.call(this);var e=B.boss(),c=B.config(e);if(this._actor&&c)this.addCommand('Jam Scanner','meJam',!!B.state(e).charge&&this._actor.canUse($dataSkills[c.skills.jam]));};
var actorWindow=Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow=function(){actorWindow.call(this);this._actorCommandWindow.setHandler('meJam',function(){var e=B.boss();if(!e)return this._actorCommandWindow.activate();var action=BattleManager.inputtingAction();if(!action)return this._actorCommandWindow.activate();action.setSkill(B.config(e).skills.jam);this.onSelectAction();}.bind(this));};
var cancel=Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel=function(){if(this._actorCommandWindow.currentSymbol()==='meJam'){this._enemyWindow.hide();this._actorCommandWindow.activate();}else cancel.call(this);};
function Window_MEBoss(){this.initialize.apply(this,arguments);}Window_MEBoss.prototype=Object.create(Window_Base.prototype);Window_MEBoss.prototype.constructor=Window_MEBoss;
Window_MEBoss.prototype.initialize=function(){Window_Base.prototype.initialize.call(this,0,0,Graphics.boxWidth,124);this.opacity=210;};
Window_MEBoss.prototype.update=function(){Window_Base.prototype.update.call(this);var e=B.boss();this.visible=!!e;if(!e)return;var s=B.state(e),c=B.config(e),a=s.charge&&$gameActors.actor(s.charge.target),remaining=s.charge?Math.max(0,s.charge.turn+2-$gameTroop.turnCount()):0;var text=s.charge?'TARGET: '+(a?a.name():'lost')+' | '+(remaining>0?'Clamp in '+remaining+' round(s)':'Clamp this round')+' | Interrupt: '+s.hits+'/'+c.interruptHits:'Scanner idle';if(B.exposed(e))text='CLAMP JAMMED | Exposed: +50% damage';var key=[e.hp,s.phase,text].join('|');if(key===this._key)return;this._key=key;this.contents.clear();this.contents.fontSize=20;this.drawText(e.name()+' — '+(s.phase===2?'OVERTIME':'COLLECTION MODE'),0,0,this.contentsWidth());this.drawText(e.hp+' / '+e.mhp+' HP',this.contentsWidth()-205,0,205,'right');this.drawText(text,0,25,this.contentsWidth());this.contents.fontSize=16;this.drawText('Jam Scanner or 2 hits cancel the clamp. Guard reduces its damage.',0,49,this.contentsWidth());};
var windows=Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows=function(){windows.call(this);if(B.boss()){this._meBossWindow=new Window_MEBoss();this.addWindow(this._meBossWindow);this._logWindow.y=124;}};
})(ME_Boss);
