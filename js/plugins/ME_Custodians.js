/*:
 * @plugindesc Six custodian minibosses: registered artwork and warned attacks.
 * @help Load after other ME plugins. Opt-in enemy tag <ME_Custodian: Key>.
 * Warn / signature / recovery cycle. A skipped warning never arms a strike.
 * Native troop pages provide singing. No changes to untagged enemies or maps.
 */
var ME_Custodians=ME_Custodians||{};
(function(C){'use strict';
// Hand-drawn poses use one scale; source rectangles include deliberate attack reach.
C.definitions={
 Compliance:{first:158,height:250,image:'Compliance-poses',scale:.40,rects:[[0,0,627,650],[627,0,627,650],[0,650,627,604],[627,650,627,604]],anchors:[[316,634],[311,634],[316,558],[309,558]],lockDesk:true},
 Duke:{first:161,height:240,image:'Duke-poses',scale:.38,rects:[[0,0,650,625],[650,0,604,625],[0,625,650,629],[650,625,604,629]],anchors:[[315,600],[296,600],[290,606],[313,606]],extra:{2:[650,625,80,170]},exclude:{3:[[0,0,80,170]]}},
 Septic:{first:164,height:235,idleImage:'Septic-idle-corrected',image:'Septic-poses',scale:.38,rects:[[0,0,680,600],[680,0,632,600],[0,600,680,599],[680,600,632,599]],anchors:[[328,585],[365,585],[328,564],[403,570]],extra:{2:[680,600,76,215]},exclude:{3:[[0,0,76,215]]}},
 Clap:{first:167,height:235,image:'Clap-poses',scale:.39,rects:[[0,0,710,588],[710,0,637,588],[0,588,710,580],[710,588,637,580]],anchors:[[355,584],[312,584],[329,561],[307,561]],extra:{2:[710,588,74,245]},exclude:{3:[[0,0,74,245]]}},
 REM:{first:170,height:225,image:'REM-poses',scale:.37,rects:[[0,0,627,627],[627,0,627,627],[0,627,627,627],[627,627,627,627]],anchors:[[314,601],[309,601],[314,601],[312,601]],extra:{2:[627,627,88,420]},exclude:{3:[[0,210,95,205]]},lockPedestal:true},
 Widow:{first:173,height:225,image:'Widow',ground:1129/1145,rotors:[[.465,.287,.063,.077]],glow:[.453,.460,.045,.033]}
};
C.key=function(e){var m=e&&e.isEnemy&&e.isEnemy()&&/<ME_Custodian:\s*(\w+)>/.exec(e.enemy().note||'');return m&&C.definitions[m[1]]?m[1]:null;};
C.polygon=function(c,ps){c.moveTo(ps[0][0],ps[0][1]);for(var i=1;i<ps.length;i++)c.lineTo(ps[i][0],ps[i][1]);c.closePath();};
C.legs=[
 {pivot:[321,776],points:[[303,739],[375,751],[340,890],[360,945],[366,1057],[302,1100],[212,1098],[258,1000],[269,924],[276,830]],sign:1},
 {pivot:[1010,850],points:[[960,811],[1041,801],[1068,956],[1129,1080],[1142,1126],[1076,1132],[979,1095],[1012,1028],[990,939]],sign:-1}
];
C.poseIndex=function(stage,t){return stage===0?(Math.floor(t/(180))%3===2&&t%180<35?3:0):stage;};
C.drawAtlas=function(c,d,im,stage,t){var f=C.poseIndex(stage,t),r=d.rects[f],a=d.anchors[f],anchor=d.anchors[0];if(f===0&&im._custodianIdle&&im._custodianIdle.complete)im=im._custodianIdle;c.save();c.scale(d.scale,d.scale);c.translate(-a[0],-a[1]);
 // Attack overflow belongs only to its attack pose, never the adjacent recovery.
 c.save();var excluded=d.exclude&&d.exclude[f];if(excluded){c.beginPath();c.rect(0,0,r[2],r[3]);excluded.forEach(function(e){c.rect(e[0],e[1],e[2],e[3]);});c.clip('evenodd');}
 c.drawImage(im,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);c.restore();
 var ext=d.extra&&d.extra[f];if(ext)c.drawImage(im,ext[0],ext[1],ext[2],ext[3],ext[0]-r[0],ext[1]-r[1],ext[2],ext[3]);
 // Chest hardware remains integrated with each complete pose; no duplicate patch.


 c.restore();
 // Fixed structures start from an identical transform, avoiding sampling jitter.
 if(d.lockDesk||d.lockPedestal){c.save();c.scale(d.scale,d.scale);c.translate(-anchor[0],-anchor[1]);
  if(d.lockDesk){c.clearRect(-10,440,1000,400);c.drawImage(im,0,440,627,210,0,440,627,210);}
  if(d.lockPedestal){c.beginPath();C.polygon(c,[[267,383],[350,383],[358,425],[414,446],[431,504],[467,579],[467,593],[312,604],[157,589],[181,543],[188,496],[213,465],[224,443],[267,423]]);c.clip();c.clearRect(0,0,627,627);c.drawImage(im,0,0,627,627,0,0,627,627);}
  c.restore();
 }
};
C.draw=function(c,key,im,stage,t,phase){var d=C.definitions[key];if(d.rects)return C.drawAtlas(c,d,im,stage,t);
 var w=im.width,h=im.height,scale=d.height/h;c.save();c.scale(scale,scale);c.translate(-w/2,-h*d.ground);
 c.save();c.beginPath();c.rect(0,0,w,h);C.legs.forEach(function(l){C.polygon(c,l.points);});c.clip('evenodd');c.drawImage(im,0,0);c.restore();
 C.legs.forEach(function(l,i){var angle=(stage===2?.17:stage===1?.075:.025)*Math.sin(t/(stage===2?6:16)+i*Math.PI)*l.sign;c.save();c.translate(l.pivot[0],l.pivot[1]);c.rotate(angle);c.translate(-l.pivot[0],-l.pivot[1]);c.beginPath();C.polygon(c,l.points);c.clip();c.drawImage(im,0,0);c.restore();});
 (d.rotors||[]).forEach(function(r){var x=r[0]*w,y=r[1]*h,rx=r[2]*w,ry=r[3]*h;c.save();c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.clip();c.translate(x,y);c.scale(rx,ry);c.rotate(t*(stage===2?.16:stage===1?.08:.025));c.drawImage(im,x-rx,y-ry,rx*2,ry*2,-1,-1,2,2);c.restore();});
 var g=d.glow;c.save();c.beginPath();c.ellipse(g[0]*w,g[1]*h,g[2]*w,g[3]*h,0,0,Math.PI*2);c.clip();c.globalCompositeOperation='screen';c.fillStyle='rgba(255,90,10,'+((stage===2?.35:.08)+Math.abs(Math.sin(t/7))*.08)+')';c.fillRect(0,0,w,h);c.restore();c.restore();
};
if(typeof Sprite_Enemy==='undefined')return;
var bitmap=Sprite_Enemy.prototype.updateBitmap,icons=Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateBitmap=function(){var key=C.key(this._enemy);if(!key)return bitmap.call(this);if(this._custodianKey!==key){this._custodianKey=key;this._custodianSource=ImageManager.loadBitmap('img/bosses/custodians/',C.definitions[key].image,0,true);this._custodianIdle= C.definitions[key].idleImage?ImageManager.loadBitmap('img/bosses/custodians/',C.definitions[key].idleImage,0,true):null;this.bitmap=new Bitmap(380,280);this.initVisibility();}if(!this._custodianSource.isReady()||(this._custodianIdle&&!this._custodianIdle.isReady()))return;if(this._custodianIdle)(this._custodianSource._canvas||this._custodianSource._image)._custodianIdle=this._custodianIdle._image;var m=this._enemy._custodianMotion,stage=m&&Graphics.frameCount<m.until?m.stage:(this._enemy._custodianCharge?1:0),t=m&&Graphics.frameCount<m.until?Graphics.frameCount-m.start:Graphics.frameCount,phase=this._enemy.hpRate()<=.4?2:1,stamp=stage+':'+phase+':'+Math.floor(t/4);if(this._custodianStamp===stamp)return;this._custodianStamp=stamp;this.bitmap.clear();var ctx=this.bitmap._context;ctx.save();ctx.translate(190,280);C.draw(ctx,key,this._custodianSource._canvas||this._custodianSource._image,stage,t,phase);ctx.restore();this.bitmap._setDirty();};
Sprite_Enemy.prototype.updateStateSprite=function(){var key=C.key(this._enemy);if(key)this._stateIconSprite.y=-C.definitions[key].height-20;else icons.call(this);};
var make=Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions=function(){var key=C.key(this);if(!key)return make.call(this);Game_Battler.prototype.makeActions.call(this);var d=C.definitions[key],turn=$gameTroop.turnCount()+1,mode=(turn-1)%3,id=mode===0?d.first:mode===1&&this._custodianCharge===turn?d.first+1:d.first+2;for(var i=0;i<this.numActions();i++)this.action(i).setSkill(id);this.setActionState('waiting');};
var start=BattleManager.startAction;
BattleManager.startAction=function(){var e=this._subject,key=C.key(e);if(key){var d=C.definitions[key],a=e.currentAction(),id=a.item().id;if(id===d.first)e._custodianCharge=$gameTroop.turnCount()+1;if(id===d.first+1){if(e._custodianCharge!==$gameTroop.turnCount())a.setSkill(d.first+2);e._custodianCharge=0;}}start.call(this);};
var turnEnd=Game_Enemy.prototype.onTurnEnd;
Game_Enemy.prototype.onTurnEnd=function(){turnEnd.call(this);if(C.key(this)&&this._custodianCharge<=$gameTroop.turnCount())this._custodianCharge=0;};
Window_BattleLog.prototype.custodianPose=function(e,stage,n){e._custodianMotion={stage:stage,start:Graphics.frameCount,until:Graphics.frameCount+n};};
Window_BattleLog.prototype.custodianWait=function(n){this._waitCount=n;};
var ls=Window_BattleLog.prototype.startAction,le=Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.startAction=function(e,a,targets){var key=C.key(e);if(key){var mode=a.item().id-C.definitions[key].first;if(mode===1){this.push('custodianPose',e,1,20);this.push('custodianWait',20);this.push('custodianPose',e,2,120);}else this.push('custodianPose',e,mode===0?1:3,60);}ls.call(this,e,a,targets);};
Window_BattleLog.prototype.endAction=function(e){if(C.key(e)){this.push('custodianPose',e,3,18);this.push('custodianWait',18);}le.call(this,e);};
})(ME_Custodians);
