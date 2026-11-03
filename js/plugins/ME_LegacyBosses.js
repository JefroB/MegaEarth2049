/*:
 * @plugindesc v1.0 Fixed-geometry cutout rigs for legacy minibosses and their adds.
 * @author MegaEarth2049
 * @help
 * Load after ME_Boss. Opt-in enemy tag: <ME_Rig: Poop>, Turd, Spider,
 * SpiderHuge, SpiderMassive, SpiderRecluse, SpiderIcky, Seam or Drone.
 * Same source parts and constant scales in every pose. No frame resizing.
 * Does not change enemy AI or reinforcement troop pages. Repossessor and
 * PunkBoss do not opt in. Rigs use idle/windup/strike/recovery action timing.
 */
var ME_Rigs=ME_Rigs||{};
(function(R){'use strict';
function part(id,rect,pivot,x,y,scale,rotation){return {id:id,rect:rect,pivot:pivot,x:x,y:y,scale:scale,rotation:rotation||0};}
R.definitions={
 Poop:{image:'LegacyPoop',parts:[part('body',[0,0,660,660],[330,639],0,0,.32),part('arm',[660,0,594,660],[55,350],50,-90,.20),part('projectile',[660,660,594,594],[295,320],130,-100,.07)]},
 Turd:{image:'LegacyPoop',parts:[part('body',[0,660,660,594],[335,500],0,0,.15)]},
 Spider:{image:'LegacySpider',parts:[]},
 Seam:{image:'LegacySeam',parts:[part('body',[0,0,1024,600],[500,570],0,0,.28),part('arm',[175,620,720,450],[75,125],75,-65,.20),part('needleTip',[815,1070,80,110],[-565,-325],75,-65,.20),part('wheel',[290,1070,440,420],[230,210],-42,-55,.10)]},
 Drone:{image:'LegacyDrone',parts:[part('body',[0,0,1024,720],[510,680],0,-15,.24),part('rotorLeft',[300,1100,420,420],[210,210],-68,-100,.13),part('rotorRight',[300,1100,420,420],[210,210],70,-100,.13),part('arm',[70,760,900,330],[140,165],65,-70,.16)]}
};
for(var i=0;i<8;i++){var side=i<4?-1:1,j=i%4;var p=part('leg'+i,[700,0,554,660],[105,385],-25+j*13,-33,.16,(-.45+j*.27)*side);p.mirror=side;R.definitions.Spider.parts.push(p);}
R.definitions.Spider.parts.push(part('body',[0,0,700,660],[350,510],0,-20,.17));
R.definitions.Spider.parts.push(part('fang',[0,660,700,594],[165,205],40,-18,.05));
['SpiderHuge','SpiderMassive','SpiderRecluse','SpiderIcky'].forEach(function(key,i){var d=JSON.parse(JSON.stringify(R.definitions.Spider));d.factor=[1.15,1.35,.85,1][i];d.tint=[0xcbd5e8,0xe7c896,0xbe9979,0x9dcc8d][i];R.definitions[key]=d;});
// Pure pose sampling is shared by the game, preview and registration tests.
R.pose=function(key,stage,t){var d=R.definitions[key],factor=d.factor||1;return d.parts.map(function(p){var x=p.x,y=p.y,r=p.rotation,visible=true;
 if(p.id==='projectile'){visible=stage===2;x+=Math.min(t,24)*3;y-=Math.sin(Math.min(t,24)/24*Math.PI)*25;}
 if(p.id==='arm'||p.id==='needleTip')r+=[0,-.65,.22,.10][stage];
 if(p.id==='wheel'||p.id.indexOf('rotor')===0)r+=Math.floor(t/6)*.22;
 if(p.id.indexOf('leg')===0){var n=+p.id.slice(3);r+=(n%2?1:-1)*([0,.10,-.12,.04][stage]);}
 if(p.id==='fang')r+=[0,-.25,.12,0][stage];
 if(key==='Turd'&&p.id==='body'){x+=[0,-4,12,4][stage];y-=[0,3,12,4][stage];}
 return {id:p.id,rect:p.rect,pivot:p.pivot,x:x*factor,y:y*factor,rotation:r,scale:p.scale*factor,mirror:p.mirror||1,visible:visible,tint:d.tint||0xffffff};});};
R.key=function(e){if(!e||!e.isEnemy||!e.isEnemy())return null;var m=/<ME_Rig:\s*(\w+)>/i.exec(e.enemy().note||'');return m&&R.definitions[m[1]]?m[1]:null;};
if(typeof Sprite_Enemy==='undefined')return;
var bitmap=Sprite_Enemy.prototype.updateBitmap,frame=Sprite_Enemy.prototype.updateFrame,update=Sprite_Enemy.prototype.update,icons=Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateBitmap=function(){var key=R.key(this._enemy);if(!key)return bitmap.call(this);if(this._meRigKey===key)return;this._meRigKey=key;this.bitmap=new Bitmap(1,1);this._meRigParts=[];var d=R.definitions[key],image=ImageManager.loadBitmap('img/bosses/',d.image,0,true);d.parts.forEach(function(p){var sprite=new Sprite(image);sprite.setFrame.apply(sprite,p.rect);sprite.anchor.set(p.pivot[0]/p.rect[2],p.pivot[1]/p.rect[3]);this._meRigParts.push(sprite);this.addChild(sprite);},this);this.addChild(this._stateIconSprite);this.initVisibility();};
Sprite_Enemy.prototype.updateFrame=function(){if(R.key(this._enemy))this.setFrame(0,0,1,1);else frame.call(this);};
Sprite_Enemy.prototype.updateStateSprite=function(){var key=R.key(this._enemy);if(!key)return icons.call(this);this._stateIconSprite.y=key==='Poop'?-205:key==='Seam'||key==='Drone'?-185:-85;};
Sprite_Enemy.prototype.update=function(){update.call(this);if(!this._meRigParts)return;var e=this._enemy,s=e._meRigMotion||{stage:0,start:0,until:0};var stage=Graphics.frameCount<s.until?s.stage:0;var poses=R.pose(this._meRigKey,stage,Graphics.frameCount-s.start);poses.forEach(function(p,i){var sprite=this._meRigParts[i];sprite.x=p.x;sprite.y=p.y;sprite.rotation=p.rotation;sprite.scale.set(p.scale*p.mirror,p.scale);sprite.tint=p.tint;sprite.visible=p.visible;},this);};
Window_BattleLog.prototype.meRigPose=function(e,stage,frames){e._meRigMotion={stage:stage,start:Graphics.frameCount,until:Graphics.frameCount+frames};};
Window_BattleLog.prototype.meRigWait=function(frames){this._waitCount=frames;};
var start=Window_BattleLog.prototype.startAction,end=Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.startAction=function(e,a,targets){if(R.key(e)&&a.item().damage.type>0){this.push('meRigPose',e,1,18);this.push('meRigWait',18);this.push('meRigPose',e,2,180);}start.call(this,e,a,targets);};
Window_BattleLog.prototype.endAction=function(e){if(R.key(e)){this.push('meRigPose',e,3,16);this.push('meRigWait',16);}end.call(this,e);};
})(ME_Rigs);
