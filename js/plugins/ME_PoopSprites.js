/* Shared deterministic renderer: immutable master body plus eye-only blink patch. */
var ME_PoopArt={
 definitions:{Poop:{image:'poop-master.png',width:1426,height:1103,origin:[765,949],scale:.23},Turd:{image:'turd-master.png',width:1536,height:1024,origin:[756,810],scale:.09}},
 draw:function(ctx,key,images,blink,hop){const d=this.definitions[key];ctx.save();ctx.translate(0,-(hop||0));ctx.scale(d.scale,d.scale);ctx.translate(-d.origin[0],-d.origin[1]);ctx.drawImage(images[d.image],0,0);if(key==='Poop'&&blink){ctx.save();ctx.beginPath();ctx.ellipse(818,506,96,89,-.21,0,Math.PI*2);ctx.ellipse(975,495,56,65,-.10,0,Math.PI*2);ctx.clip();ctx.drawImage(images['poop-blink.png'],0,0);ctx.restore();}ctx.restore();}
};
/*:
 * @plugindesc Stable complete-character art and restrained animation for Poopoo Caca and Crap.
 * @help Opt-in enemy tag <ME_PoopArt: Poop> or <ME_PoopArt: Turd>.
 * Body is immutable; blink is confined to eye interiors. No scaling animation.
 * Preserves native enemy actions, damage effects, collapse and troop events.
 */
(function(){'use strict';
function key(e){var m=e&&/<ME_PoopArt: (Poop|Turd)>/.exec(e.enemy().note);return m&&m[1];}
var oldBitmap=Sprite_Enemy.prototype.updateBitmap,oldIcons=Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateBitmap=function(){var k=key(this._enemy);if(!k)return oldBitmap.call(this);if(!this._poopImages){this._poopImages={};['poop-master.png','poop-blink.png','turd-master.png'].forEach(function(f){this._poopImages[f]=ImageManager.loadBitmap('img/bosses/poop-v2/',f.slice(0,-4),0,true);},this);this.bitmap=new Bitmap(320,260);this.initVisibility();}if(!Object.keys(this._poopImages).every(function(f){return this._poopImages[f].isReady();},this))return;var tick=Graphics.frameCount,elapsed=tick-(this._enemy._poopActionStart||-1000),blink=k==='Poop'&&(tick+this._enemy.index()*31)%210<7,hop=k==='Turd'&&elapsed<24&&elapsed>=0?Math.round(Math.sin(elapsed/24*Math.PI)*9):0;var state=k+':'+blink+':'+hop;if(this._poopDrawState===state)return;this._poopDrawState=state;this.bitmap.clear();var images={};Object.keys(this._poopImages).forEach(function(f){images[f]=this._poopImages[f]._image;},this);var c=this.bitmap._context;c.save();c.translate(160,260);ME_PoopArt.draw(c,k,images,blink,hop);c.restore();this.bitmap._setDirty();};
Sprite_Enemy.prototype.updateStateSprite=function(){if(key(this._enemy))this._stateIconSprite.y=key(this._enemy)==='Poop'?-220:-65;else oldIcons.call(this);};
var action=Game_Enemy.prototype.performAction;Game_Enemy.prototype.performAction=function(a){action.call(this,a);if(key(this))this._poopActionStart=Graphics.frameCount;};
})();
// Reuse the approved complete character on legacy dungeon encounter events.
(function(){'use strict';
var bitmap=Sprite_Character.prototype.updateBitmap,frame=Sprite_Character.prototype.updateFrame;
Sprite_Character.prototype.updateBitmap=function(){
 if(this._character instanceof Game_Event&&this._character.characterName()==='poopoocaca'){
  if(!this._poopMap){this._poopMap=true;this.bitmap=ImageManager.loadBitmap('img/bosses/poop-v2/','poop-master',0,true);}
  this.scale.set(72/1103,72/1103);this.anchor.set(765/1426,949/1103);return;
 }
 if(this._poopMap){this._poopMap=false;this._characterName=null;this.scale.set(1,1);this.anchor.set(.5,1);}
 bitmap.call(this);
};
Sprite_Character.prototype.updateFrame=function(){if(this._poopMap){if(this.bitmap.isReady())this.setFrame(0,0,this.bitmap.width,this.bitmap.height);}else frame.call(this);};
})();
