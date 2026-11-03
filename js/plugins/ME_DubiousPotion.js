/*:
 * @plugindesc Bounded Probably Not Poison outcome; native MV action hook.
 * @author MegaEarth2049
 * @help <ME Dubious Potion> on a one-ally consumable, repeats 1.
 * One roll per successful target: 50% 150 HP, 25% 30 MP, 25% Queasy.
 * No save data, global switches, common events or damage-formula side effects.
 */
(function(){
 'use strict';
 var apply=Game_Action.prototype.applyItemUserEffect;
 Game_Action.prototype.applyItemUserEffect=function(target){
  apply.call(this,target);
  if(!this.isItem() || !/<ME Dubious Potion>/i.test(this.item().note || '')) return;
  var roll=Math.randomInt(4);
  if(roll<2){this.itemEffectRecoverHp(target,{value1:0,value2:150});}
  else if(roll===2){this.itemEffectRecoverMp(target,{value1:0,value2:30});}
  else {target.addState(76);this.makeSuccess(target);}
 };
})();
