/*:
-------------------------------------------------------------------------
@title Placeholder States
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Jan 10, 2015
@filename HIME_PlaceholderStates.js
@url http://himeworks.com/2016/01/placeholder-states/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.0 - allows you to create a state that may resolve to a different
state when it is added or removed.
@help 
-------------------------------------------------------------------------------
== Description ==

Placeholder States are special states that use a formula to determine which
state will be added, when they are actually being added to a battler.

For example, let's say you had a state called "Freeze". When you first apply
the freeze state, the enemy will be frozen. However, if you applied the freeze
state to an enemy that is already frozen, they will shatter and die.

As another example, suppose you had a state called Poison. When you first
apply the state to a battler, Poison 1 will be added. When you add the Poison
state to a battler that already has Poison 1, it will be removed, and replaced
with Poison 2.

This allows you to create states that can be used on the same battler multiple
times, but potentially have different results.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.0 - Jan 10, 2016
 - initial release

== Usage ==

Note-tag states with

<placeholder state>
  FORMULA
</placeholder state>

Where the FORMULA is any javascript expression that returns a number, which
will be the ID of the state that is actually added or removed. You can use
any number of conditions.

The following formula variables are available

  a - "this" battler.
  v - game variables
  
-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_PlaceholderStates = 1;
TH.PlaceholderStates = TH.PlaceholderStates || {};

(function ($) {

  $.Regex = /<placeholder[-_ ]state>([\s\S]*?)<\/placeholder[-_ ]state>/im  
  
  $.isPlaceholderState = function(state) {
    return $.placeholderStateFormula(state) !== ""
  }
  
  $.placeholderStateFormula = function(state) {
    if (state.placeholderStateFormula === undefined) {
      state.placeholderStateFormula = "";
      var res = $.Regex.exec(state.note);
      if (res) {
        state.placeholderStateFormula = res[1];
        console.log(res)
      }
    }
    return state.placeholderStateFormula;
  };

  var TH_GameBattler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function(stateId) {
    stateId = this.evalPlaceholderState(stateId);
    TH_GameBattler_addState.call(this, stateId);    
  };
  
  var TH_GameBattler_removeState = Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function(stateId) {
    stateId = this.evalPlaceholderState(stateId);
    TH_GameBattler_removeState.call(this, stateId);
  };
  
  Game_Battler.prototype.evalPlaceholderState = function(stateId) {
    var state = $dataStates[stateId]
    if ($.isPlaceholderState(state)) {
      var formula = $.placeholderStateFormula(stateId);
      var a = this;    
      var v = $gameVariables;
      return eval(state.placeholderStateFormula);
    }
    else {
      return stateId;
    }
  };

})(TH.PlaceholderStates);