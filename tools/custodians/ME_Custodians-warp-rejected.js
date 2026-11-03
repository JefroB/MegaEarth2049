/*:
 * @plugindesc Six custodian minibosses: registered artwork and warned attacks.
 * @help Load after other ME plugins. Opt-in enemy tag <ME_Custodian: Key>.
 * Warn / signature / recovery cycle. A skipped warning never arms a strike.
 * Native troop pages provide singing. No changes to untagged enemies or maps.
 */
var ME_Custodians=ME_Custodians||{};
(function(C){'use strict';
// Regions use normalized source coordinates; stationary pixels are never warped.
C.definitions={
 Compliance:{ground:0.9824854045037531,first:158,height:235,soft:[[.50,.23,.25,.22],[.53,.43,.21,.14]]},
 Duke:{ground:0.9778156996587031,first:161,height:240,soft:[[.40,.25,.15,.15],[.43,.47,.18,.18],[.42,.62,.15,.15]]},
 Septic:{ground:0.9891576313594662,first:164,height:230,soft:[[.34,.28,.17,.15],[.60,.28,.16,.16],[.36,.59,.15,.13]],rotors:[[.588,.082,.037,.045]]},
 Clap:{ground:0.9905741216795202,first:167,height:235,soft:[[.42,.20,.13,.10],[.44,.64,.18,.15]],rotors:[[.633,.487,.088,.098]]},
 REM:{ground:0.9941902687000727,first:170,height:220,soft:[[.44,.24,.24,.12],[.23,.17,.35,.10]]},
 Widow:{ground:0.9860262008733625,first:173,height:225,soft:[],rotors:[[.465,.287,.063,.077]],glow:[.453,.460,.045,.033]}
};
C.key=function(e){var m=e&&e.isEnemy&&e.isEnemy()&&/<ME_Custodian:\s*(\w+)>/.exec(e.enemy().note||'');return m&&C.definitions[m[1]]?m[1]:null;};
C.triangle=function(c,im,a,b,d,A,B,D){var det=(b[0]-a[0])*(d[1]-a[1])-(d[0]-a[0])*(b[1]-a[1]);if(!det)return;var xx=((B[0]-A[0])*(d[1]-a[1])-(D[0]-A[0])*(b[1]-a[1]))/det,xy=((D[0]-A[0])*(b[0]-a[0])-(B[0]-A[0])*(d[0]-a[0]))/det,yx=((B[1]-A[1])*(d[1]-a[1])-(D[1]-A[1])*(b[1]-a[1]))/det,yy=((D[1]-A[1])*(b[0]-a[0])-(B[1]-A[1])*(d[0]-a[0]))/det;c.save();c.beginPath();c.moveTo(A[0],A[1]);c.lineTo(B[0],B[1]);c.lineTo(D[0],D[1]);c.closePath();c.clip();c.transform(xx,yx,xy,yy,A[0]-xx*a[0]-xy*a[1],A[1]-yx*a[0]-yy*a[1]);c.drawImage(im,0,0);c.restore();};
C.draw=function(c,key,im,stage,t,phase){var d=C.definitions[key],w=im.width,h=im.height,scale=d.height/h;
 c.save();c.translate(stage===2&&['Duke','Septic','Clap'].indexOf(key)>=0?Math.sin(Math.min(1,t/20)*Math.PI)*10:0,0);c.scale(scale,scale);c.translate(-w/2,-h*(d.ground||1));
 c.save();c.beginPath();c.rect(0,0,w,h);d.soft.forEach(function(r){c.rect(r[0]*w,r[1]*h,r[2]*w,r[3]*h);});c.clip('evenodd');c.drawImage(im,0,0);c.restore();
 d.soft.forEach(function(r,idx){var x=r[0]*w,y=r[1]*h,rw=r[2]*w,rh=r[3]*h;
  var amount=(stage===2?32:stage===1?15:6)*(phase===2?1.3:1),beat=Math.sin(t/(stage===0?15:5)+idx);
  function pt(u,v){return [x+rw*u,y+rh*v];}
  function def(u,v){var p=pt(u,v),weight=Math.pow(Math.sin(u*Math.PI)*Math.sin(v*Math.PI),2);return [p[0]+weight*amount*beat*.35,p[1]+weight*amount*beat];}
  for(var row=0;row<5;row++)for(var col=0;col<6;col++){var u=col/6,v=row/5,U=(col+1)/6,V=(row+1)/5;C.triangle(c,im,pt(u,v),pt(U,v),pt(u,V),def(u,v),def(U,v),def(u,V));C.triangle(c,im,pt(U,v),pt(U,V),pt(u,V),def(U,v),def(U,V),def(u,V));}
 });
 (d.rotors||[]).forEach(function(r){var x=r[0]*w,y=r[1]*h,rx=r[2]*w,ry=r[3]*h;c.save();c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.clip();c.translate(x,y);c.scale(rx,ry);c.rotate(t*(stage===2?.16:stage===1?.08:.025)*(phase===2?1.3:1));c.drawImage(im,x-rx,y-ry,rx*2,ry*2,-1,-1,2,2);c.restore();});
 if(d.glow){var g=d.glow;c.save();c.beginPath();c.ellipse(g[0]*w,g[1]*h,g[2]*w,g[3]*h,0,0,Math.PI*2);c.clip();c.globalCompositeOperation='screen';c.fillStyle='rgba(255,90,10,'+((stage===2?.35:.08)+Math.abs(Math.sin(t/7))*.08)+')';c.fillRect(0,0,w,h);c.restore();}
 c.restore();
};
if(typeof Sprite_Enemy==='undefined')return;
var bitmap=Sprite_Enemy.prototype.updateBitmap,icons=Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateBitmap=function(){var key=C.key(this._enemy);if(!key)return bitmap.call(this);if(this._custodianKey!==key){this._custodianKey=key;this._custodianSource=ImageManager.loadBitmap('img/bosses/custodians/',key,0,true);this.bitmap=new Bitmap(380,280);this.initVisibility();}if(!this._custodianSource.isReady())return;var m=this._enemy._custodianMotion,stage=m&&Graphics.frameCount<m.until?m.stage:(this._enemy._custodianCharge?1:0),t=m&&Graphics.frameCount<m.until?Graphics.frameCount-m.start:Graphics.frameCount,phase=this._enemy.hpRate()<=.4?2:1,stamp=stage+':'+phase+':'+Math.floor(t/4);if(this._custodianStamp===stamp)return;this._custodianStamp=stamp;this.bitmap.clear();var ctx=this.bitmap._context;ctx.save();ctx.translate(190,280);C.draw(ctx,key,this._custodianSource._canvas||this._custodianSource._image,stage,t,phase);ctx.restore();this.bitmap._setDirty();};
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
