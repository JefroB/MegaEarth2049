/*:
 * @plugindesc Heal up hp/mp from actors on lvl up
 * @author Alejandro López
 *
 * @param % of HP
 * @desc Percentage to heal up the health point on level up, set 0 to disable
 * @type number
 * @max 100
 * @min 0
 * @default 100
 *
 * @param % of MP
 * @desc Percentage to heal up the magic point on level up, set 0 to disable
 * @type number
 * @max 100
 * @min 0
 * @default 100
 *
 * @param Value of HP
 * @desc Value to heal up the health point on level up, set 0 to disable
 * @type number
 * @max 2000
 * @min 50
 * @default 0
 *
 * @param Value of MP
 * @desc Value to heal up the magic point on level up, set 0 to disable
 * @type number
 * @max 2000
 * @min 10
 * @default 0
 *
 * @param % or value
 * @desc Mode of use: 1 for percentage or 2 for value specific
 * @type number
 * @max 2
 * @min 1
 * @default 1
 */

(function() {
	var parameters = PluginManager.parameters('ROKI_HealOnLvUp');
	
	var percentageHP = parseInt(parameters['% of HP']);
	var percentageMP = parseInt(parameters['% of MP']);
	var valueHP = parseInt(parameters['Value of HP']);
	var valueMP = parseInt(parameters['Value of MP']);
	var healValueMode = parseInt(parameters['% or value']);
	
	Game_Actor.prototype.levelUp = function() {
		this._level++;

		var healAmountHP = valueHP;
		var healAmountMP = valueMP;
		
		if (healValueMode == 1) {
			healAmountHP = Math.round((this.mhp * percentageHP) / 100);
			healAmountMP = Math.round((this.mmp * percentageMP) / 100);
		}
		
		this._hp = healAmountHP > this.mhp ? this.mhp : this._hp + healAmountHP;
		this._mp = healAmountMP > this.mmp ? this.mmp : this._mp + healAmountMP;

		this.currentClass().learnings.forEach(function(learning) {
			if (learning.level === this._level) {
				this.learnSkill(learning.skillId);
			}
		}, this);

	};

})();