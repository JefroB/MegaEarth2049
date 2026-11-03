/*:
 * @plugindesc v1.0 Cohesive spider, SEAM-3000 and A.S.P. miniboss artwork.
 * @author MegaEarth2049
 * @help Load after ME_Boss and ME_PoopSprites. Opt-in: <ME_Remaining: key>.
 * Spider variants use intentional organic crouch/lunge deformation.
 * Machines reuse exactly the same body raster and transform in every pose;
 * only defined indicator/fan regions animate. Native combat effects remain.
 */
var ME_RemainingArt=ME_RemainingArt||{};
(function(R){'use strict';
R.definitions={
 Spider:{image:'spider-master',origin:[770,967],scale:.085,canvas:[200,115],organic:true,hue:0},
 Recluse:{image:'spider-master',origin:[770,967],scale:.075,canvas:[190,105],organic:true,hue:0,overlay:'rgba(126,76,35,.48)'},
 Huge:{image:'spider-master',origin:[770,967],scale:.095,canvas:[210,125],organic:true,hue:315},
 Massive:{image:'spider-master',origin:[770,967],scale:.105,canvas:[230,135],organic:true,hue:335},
 Icky:{image:'spider-master',origin:[770,967],scale:.085,canvas:[200,115],organic:true,hue:95},
 Seam:{image:'seam-master',origin:[755,1056],scale:.15,canvas:[270,180],organic:false,hue:0,lens:[1208,374,20]},
 Drone:{image:'drone-master',origin:[735,950],scale:.19,canvas:[260,190],organic:false,hue:0,lens:[1092,578,45],fans:[[410,646,85,100],[466,256,75,32]]}
};
R.pose=function(key,stage,t){var d=R.definitions[key];if(!d.organic)return {x:0,y:0,sx:1,sy:1};var a=[0,1,2,3].indexOf(stage)>=0?stage:0;return {x:[0,-4,16,5][a],y:[0,0,-3,0][a],sx:[1,1.035,1.015,1.005][a],sy:[1+Math.sin(t/20)*.008,.94,.985,.995][a]};};
R.draw=function(ctx,key,image,stage,t){var d=R.definitions[key],p=R.pose(key,stage,t);ctx.save();ctx.translate(p.x,p.y);ctx.scale(d.scale*p.sx,d.scale*p.sy);ctx.translate(-d.origin[0],-d.origin[1]);ctx.drawImage(image,0,0);
 if(d.overlay){ctx.save();ctx.globalCompositeOperation='source-atop';ctx.fillStyle=d.overlay;ctx.fillRect(0,0,image.width,image.height);ctx.restore();}
 if(!d.organic){
  // Indicator effects are clipped inside the original optic, not the chassis.
  var l=d.lens,alpha=[.10,.55,.85,.20][stage];ctx.save();ctx.beginPath();ctx.arc(l[0],l[1],l[2],0,Math.PI*2);ctx.clip();ctx.globalCompositeOperation='screen';ctx.fillStyle='rgba(255,100,35,'+alpha+')';ctx.fillRect(l[0]-l[2],l[1]-l[2],l[2]*2,l[2]*2);ctx.restore();
  (d.fans||[]).forEach(function(f){ctx.save();ctx.beginPath();ctx.ellipse(f[0],f[1],f[2],f[3],0,0,Math.PI*2);ctx.clip();ctx.translate(f[0],f[1]);ctx.scale(f[2],f[3]);ctx.rotate(Math.floor(t/5)*Math.PI/6);ctx.drawImage(image,f[0]-f[2],f[1]-f[3],f[2]*2,f[3]*2,-1,-1,2,2);ctx.restore();});
 }ctx.restore();};
R.key=function(e){var m=e&&e.isEnemy&&e.isEnemy()&&/<ME_Remaining:\s*(\w+)>/.exec(e.enemy().note||'');return m&&R.definitions[m[1]]?m[1]:null;};
if(typeof Sprite_Enemy==='undefined')return;
// Both legacy entrances represent the same encounter, including old saves.
var refreshMap=Game_Map.prototype.refresh;
Game_Map.prototype.refresh=function(){var slots=this.mapId()===2?[23,26]:this.mapId()===30?[1,2]:[];var mapId=this.mapId();if(slots.some(function(id){return $gameSelfSwitches.value([mapId,id,'A']);})){slots.forEach(function(id){if(!$gameSelfSwitches.value([mapId,id,'A']))$gameSelfSwitches.setValue([mapId,id,'A'],true);});}refreshMap.call(this);};
var bitmap=Sprite_Enemy.prototype.updateBitmap,icons=Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateBitmap=function(){var key=R.key(this._enemy);if(!key)return bitmap.call(this);var d=R.definitions[key];if(this._remainingKey!==key){this._remainingKey=key;this._remainingSource=ImageManager.loadBitmap('img/bosses/remaining-v2/',d.image,d.hue,true);this.bitmap=new Bitmap(d.canvas[0],d.canvas[1]);this.initVisibility();this._remainingStamp=null;}if(!this._remainingSource.isReady())return;var m=this._enemy._remainingMotion,stage=m&&Graphics.frameCount<m.until?m.stage:0,t=m&&stage?Graphics.frameCount-m.start:Graphics.frameCount+this._enemy.index()*19,stamp=stage+':'+Math.floor(t/5);if(stamp===this._remainingStamp)return;this._remainingStamp=stamp;this.bitmap.clear();var c=this.bitmap._context;c.save();c.translate(d.canvas[0]/2,d.canvas[1]);R.draw(c,key,this._remainingSource._canvas||this._remainingSource._image,stage,t);c.restore();this.bitmap._setDirty();};
Sprite_Enemy.prototype.updateStateSprite=function(){if(R.key(this._enemy))this._stateIconSprite.y=-this.bitmap.height-12;else icons.call(this);};
Window_BattleLog.prototype.remainingPose=function(e,stage,frames){e._remainingMotion={stage:stage,start:Graphics.frameCount,until:Graphics.frameCount+frames};};
Window_BattleLog.prototype.remainingWait=function(frames){this._waitCount=frames;};
var start=Window_BattleLog.prototype.startAction,end=Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.startAction=function(e,a,targets){if(R.key(e)&&a.item().damage.type>0){this.push('remainingPose',e,1,16);this.push('remainingWait',16);this.push('remainingPose',e,2,180);}start.call(this,e,a,targets);};
Window_BattleLog.prototype.endAction=function(e){if(R.key(e)){this.push('remainingPose',e,3,12);this.push('remainingWait',12);}end.call(this,e);};
})(ME_RemainingArt);
