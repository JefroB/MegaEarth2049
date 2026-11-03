/*:
 * @plugindesc v1.0 Cohesive spider, SEAM-3000 and A.S.P. miniboss artwork.
 * @author MegaEarth2049
 * @help Load after ME_Boss and ME_PoopSprites. Opt-in: <ME_Remaining: key>.
 * Spider variants use intentional organic crouch/lunge deformation.
 * Machines reuse exactly the same body raster and transform in every pose;
 * only defined optic/fan regions and soft cloth animate. Native combat effects remain.
 */
var ME_RemainingArt=ME_RemainingArt||{};
(function(R){'use strict';
R.definitions={
 Spider:{image:'spider-master',origin:[770,967],scale:.085,canvas:[200,115],organic:true,hue:0},
 Recluse:{image:'spider-master',origin:[770,967],scale:.075,canvas:[190,105],organic:true,hue:0,overlay:'rgba(126,76,35,.48)'},
 Huge:{image:'spider-master',origin:[770,967],scale:.095,canvas:[210,125],organic:true,hue:315},
 Massive:{image:'spider-master',origin:[770,967],scale:.105,canvas:[230,135],organic:true,hue:335},
 Icky:{image:'spider-master',origin:[770,967],scale:.085,canvas:[200,115],organic:true,hue:95},
 Seam:{image:'seam-cloth-master-v4',origin:[755,1076],scale:.15,canvas:[360,185],organic:false,hue:0,lens:[1215,325,18],clothRows:[[930,1180,1462],[960,1160,1462],[1000,1155,1462],[1040,1165,1462],[1076,1190,1462]]},
 Drone:{image:'drone-master',origin:[735,950],scale:.19,canvas:[260,190],organic:false,hue:0,lens:[1092,578,45],fans:[[410,646,85,100],[466,256,75,32]]}
};
R.pose=function(key,stage,t){var d=R.definitions[key];if(!d.organic)return {x:0,y:0,sx:1,sy:1};var a=[0,1,2,3].indexOf(stage)>=0?stage:0;return {x:[0,-4,16,5][a],y:[0,0,-3,0][a],sx:[1,1.035,1.015,1.005][a],sy:[1+Math.sin(t/20)*.008,.94,.985,.995][a]};};
// Warp a continuous fabric region of ONE complete character image. No extra art.
R.clothPoint=function(d,x,y,stage,t){var amount=stage===2?Math.min(1,t/22):stage===3?Math.max(0,1-t/12):0;var left=d.clothRows[0][1];for(var k=0;k<d.clothRows.length-1;k++){var lo=d.clothRows[k],hi=d.clothRows[k+1];if(y>=lo[0]&&y<=hi[0])left=lo[1]+(hi[1]-lo[1])*(y-lo[0])/(hi[0]-lo[0]);}var v=Math.max(0,Math.min(1,(y-930)/146)),u=Math.max(0,Math.min(1,(x-left)/(1462-left)));var w=v*v*(3-2*v)*u;return [x+140*amount*w,y-14*amount*w*(1+Math.sin(t/6+v*4))*.5];};
R.clothTriangle=function(c,image,a,b,z,A,B,Z){var det=(b[0]-a[0])*(z[1]-a[1])-(z[0]-a[0])*(b[1]-a[1]);if(Math.abs(det)<.001)return;var xx=((B[0]-A[0])*(z[1]-a[1])-(Z[0]-A[0])*(b[1]-a[1]))/det,xy=((Z[0]-A[0])*(b[0]-a[0])-(B[0]-A[0])*(z[0]-a[0]))/det,yx=((B[1]-A[1])*(z[1]-a[1])-(Z[1]-A[1])*(b[1]-a[1]))/det,yy=((Z[1]-A[1])*(b[0]-a[0])-(B[1]-A[1])*(z[0]-a[0]))/det;c.save();c.beginPath();c.moveTo(A[0],A[1]);c.lineTo(B[0],B[1]);c.lineTo(Z[0],Z[1]);c.closePath();c.clip();c.transform(xx,yx,xy,yy,A[0]-xx*a[0]-xy*a[1],A[1]-yx*a[0]-yy*a[1]);c.drawImage(image,0,0);c.restore();};
R.drawClothMaster=function(c,d,image,stage,t){var rows=d.clothRows;c.save();c.beginPath();c.rect(-2,-2,image.width+4,image.height+4);c.moveTo(rows[0][1],rows[0][0]);rows.forEach(function(r){c.lineTo(r[2],r[0]);});for(var j=rows.length-1;j>=0;j--)c.lineTo(rows[j][1],rows[j][0]);c.closePath();c.clip('evenodd');c.drawImage(image,0,0);c.restore();for(var row=0;row<rows.length-1;row++){var top=rows[row],bottom=rows[row+1];for(var col=0;col<8;col++){var f=col/8,g=(col+1)/8,a=[top[1]+(top[2]-top[1])*f,top[0]],b=[top[1]+(top[2]-top[1])*g,top[0]],z=[bottom[1]+(bottom[2]-bottom[1])*f,bottom[0]],q=[bottom[1]+(bottom[2]-bottom[1])*g,bottom[0]];var A=R.clothPoint(d,a[0],a[1],stage,t),B=R.clothPoint(d,b[0],b[1],stage,t),Z=R.clothPoint(d,z[0],z[1],stage,t),Q=R.clothPoint(d,q[0],q[1],stage,t);R.clothTriangle(c,image,a,b,z,A,B,Z);R.clothTriangle(c,image,b,q,z,B,Q,Z);}}};
R.draw=function(ctx,key,image,stage,t){var d=R.definitions[key],p=R.pose(key,stage,t);ctx.save();ctx.translate(p.x,p.y);ctx.scale(d.scale*p.sx,d.scale*p.sy);ctx.translate(-d.origin[0],-d.origin[1]);if(d.clothRows)R.drawClothMaster(ctx,d,image,stage,t);else ctx.drawImage(image,0,0);
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
