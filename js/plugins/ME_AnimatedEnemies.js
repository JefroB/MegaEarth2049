/*:
 * @plugindesc Animates existing MV 9x6 enemy sheets without replacing battle flow.
 * @author MegaEarth2049
 * @help Load before ME boss plugins. Reads <Sideview Battler: filename> from
 * img/sv_actors and <Sideview Attack Motion: motion>. Legacy 'missle' is accepted.
 * ME-tagged bosses retain their own rendering. Do not enable together with
 * YEP_X_AnimatedSVEnemies. This is a sprite loader, not a YEP battle-engine replacement.
 */
(function() {
    'use strict';
    function sheet(enemy) {
        if (!enemy) return null;
        var note = enemy.enemy().note || '';
        if (/<ME_(?:Boss|PoopArt|Remaining|Custodian|MainBoss):/i.test(note)) return null;
        var match = /<Sideview Battler:\s*([^>]+)>/i.exec(note);
        return match ? match[1].trim() : null;
    }
    function idle(enemy) {
        var state = enemy.stateMotionIndex();
        return state === 3 ? 'dead' : state === 2 ? 'sleep' : state === 1 ? 'abnormal' :
            enemy.isDying() ? 'dying' : 'walk';
    }
    var updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        var name = sheet(this._enemy);
        if (!name) {
            if (this._meAnimatedSheet) {
                this._meAnimatedSheet = null;
                this._battlerName = null;
                this.scale.x = 1;
                this._stateIconSprite.scale.x = 1;
            }
            return updateBitmap.call(this);
        }
        if (this._meAnimatedSheet !== name) {
            this._meAnimatedSheet = name;
            this.bitmap = ImageManager.loadSvActor(name);
            this._meMotion = null;
            this.scale.x = -1;
            this._stateIconSprite.scale.x = -1;
            this.initVisibility();
        }
    };
    var updateFrame = Sprite_Enemy.prototype.updateFrame;
    Sprite_Enemy.prototype.updateFrame = function() {
        if (!sheet(this._enemy)) return updateFrame.call(this);
        if (!this.bitmap || !this.bitmap.isReady()) return;
        var requested = this._enemy.motionType();
        if (requested || !this._meMotion) {
            this._meMotion = Sprite_Actor.MOTIONS[requested || idle(this._enemy)] || Sprite_Actor.MOTIONS.walk;
            this._meMotionStart = Graphics.frameCount;
            this._enemy.clearMotion();
        }
        var motion = this._meMotion;
        var tick = Math.floor((Graphics.frameCount - this._meMotionStart) / 12);
        if (!motion.loop && tick >= 3 || motion.loop && this._enemy.isMotionRefreshRequested()) {
            motion = this._meMotion = Sprite_Actor.MOTIONS[idle(this._enemy)];
            this._meMotionStart = Graphics.frameCount;
            this._enemy.clearMotion();
            tick = 0;
        }
        var pattern = motion.loop ? [0,1,2,1][tick % 4] : Math.min(tick,2);
        var w = this.bitmap.width / 9, h = this.bitmap.height / 6;
        this.setFrame((Math.floor(motion.index / 6) * 3 + pattern) * w,
            motion.index % 6 * h, w, this._effectType === 'bossCollapse' ? Math.min(h,this._effectDuration) : h);
    };
    var updateIcons = Sprite_Enemy.prototype.updateStateSprite;
    Sprite_Enemy.prototype.updateStateSprite = function() {
        if (sheet(this._enemy) && this.bitmap) this._stateIconSprite.y = -this.bitmap.height / 6 - 12;
        else updateIcons.call(this);
    };
    var action = Game_Enemy.prototype.performAction;
    Game_Enemy.prototype.performAction = function(a) {
        action.call(this,a);
        if (!sheet(this)) return;
        var match = /<Sideview Attack Motion:\s*(\w+)>/i.exec(this.enemy().note);
        this.requestMotion(a.isAttack() ? (match ? match[1].toLowerCase().replace('missle','missile') : 'thrust') :
            a.isGuard() ? 'guard' : a.isMagicSkill() ? 'spell' : a.isItem() ? 'item' : 'skill');
    };
    ['performDamage','performEvasion','performMagicEvasion'].forEach(function(method) {
        var original = Game_Enemy.prototype[method];
        Game_Enemy.prototype[method] = function() {
            original.apply(this,arguments);
            if (sheet(this)) this.requestMotion(method === 'performDamage' ? 'damage' : 'evade');
        };
    });
})();
