/*:
 * @plugindesc Map portraits for custodian encounter pages; no new character sheets.
 * @help Active event page comment: <ME_CustodianMap: Duke> (or another key).
 * Shows the existing complete master at 72px height. Removing the comment on
 * the victory page restores the ordinary event graphic and normal scale.
 */
(function(){'use strict';
function key(sprite){var ch=sprite._character;if(!(ch instanceof Game_Event)||!ch.page())return null;var list=ch.list();for(var i=0;i<list.length;i++){if(list[i].code===108){var m=/<ME_CustodianMap:\s*(\w+)>/.exec(list[i].parameters[0]);if(m&&ME_Custodians.definitions[m[1]])return m[1];}}return null;}
var bitmap=Sprite_Character.prototype.updateBitmap,frame=Sprite_Character.prototype.updateFrame;
Sprite_Character.prototype.updateBitmap=function(){var k=key(this);if(k){if(this._custodianMapKey!==k){this._custodianMapKey=k;this.bitmap=ImageManager.loadBitmap('img/bosses/custodians/',k,0,true);}if(this.bitmap.isReady())this.scale.set(72/this.bitmap.height,72/this.bitmap.height);return;}if(this._custodianMapKey){this._custodianMapKey=null;this._characterName=null;this.scale.set(1,1);}bitmap.call(this);};
Sprite_Character.prototype.updateFrame=function(){if(this._custodianMapKey){if(this.bitmap.isReady())this.setFrame(0,0,this.bitmap.width,this.bitmap.height);}else frame.call(this);};
})();
