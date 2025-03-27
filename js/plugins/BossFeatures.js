//=============================================================================
// BossFeatures.js
//=============================================================================

/*:
 * @plugindesc Adds special features for boss enemies, including red flashing when near death.
 * @author Cline
 *
 * @help
 * This plugin adds special features for boss enemies in MegaEarth2049.
 * 
 * Features:
 * - Identifies enemies with the <Boss Enemy> note tag as bosses
 * - Makes bosses flash red when their HP falls below a threshold
 * - Supports custom threshold via <Near Death Threshold: X> tag (default: 25%)
 * - Automatically handles larger boss sprites (96x96 pixels)
 * 
 * Note Tags (add to enemy notes):
 * <Boss Enemy> - Identifies an enemy as a boss
 * <Flash When Near Death> - Enables red flashing when HP is low
 * <Near Death Threshold: X> - Sets the HP percentage threshold (default: 25)
 * 
 * No plugin commands are needed - features are applied automatically.
 */

(function() {
    //=============================================================================
    // Game_Enemy - Add boss-specific properties and methods
    //=============================================================================
    
    var _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _Game_Enemy_initMembers.call(this);
        this._isBoss = false;
        this._flashWhenNearDeath = false;
        this._nearDeathThreshold = 25; // Default threshold (25% of max HP)
        this._isNearDeath = false;
        this._nearDeathFlashDuration = 0;
    };
    
    var _Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function(enemyId, x, y) {
        _Game_Enemy_setup.call(this, enemyId, x, y);
        this.setupBossFeatures();
    };
    
    Game_Enemy.prototype.setupBossFeatures = function() {
        if (this.enemy().note.match(/<Boss Enemy>/i)) {
            this._isBoss = true;
            
            // Check if boss should flash when near death
            if (this.enemy().note.match(/<Flash When Near Death>/i)) {
                this._flashWhenNearDeath = true;
            }
            
            // Get custom near death threshold if specified
            var thresholdMatch = this.enemy().note.match(/<Near Death Threshold: (\d+)>/i);
            if (thresholdMatch) {
                this._nearDeathThreshold = parseInt(thresholdMatch[1]);
            }
        }
    };
    
    Game_Enemy.prototype.isBoss = function() {
        return this._isBoss;
    };
    
    Game_Enemy.prototype.isNearDeath = function() {
        if (!this._isBoss || !this._flashWhenNearDeath) return false;
        
        var hpRate = this.hp / this.mhp * 100;
        return hpRate <= this._nearDeathThreshold;
    };
    
    var _Game_Enemy_update = Game_Enemy.prototype.update;
    Game_Enemy.prototype.update = function() {
        _Game_Enemy_update.call(this);
        this.updateBossFeatures();
    };
    
    Game_Enemy.prototype.updateBossFeatures = function() {
        if (this._isBoss && this._flashWhenNearDeath) {
            var wasNearDeath = this._isNearDeath;
            this._isNearDeath = this.isNearDeath();
            
            // If just entered near death state, start flashing
            if (!wasNearDeath && this._isNearDeath) {
                this._nearDeathFlashDuration = 60; // Flash for 1 second initially
            }
            
            // Update flash duration
            if (this._isNearDeath) {
                if (this._nearDeathFlashDuration > 0) {
                    this._nearDeathFlashDuration--;
                } else {
                    this._nearDeathFlashDuration = 60; // Reset flash duration
                }
            }
        }
    };
    
    //=============================================================================
    // Sprite_Enemy - Add boss-specific rendering
    //=============================================================================
    
    var _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        _Sprite_Enemy_updateBitmap.call(this);
        this.updateBossEffects();
    };
    
    Sprite_Enemy.prototype.updateBossEffects = function() {
        if (this._enemy && this._enemy.isBoss()) {
            // Apply near death flashing effect
            if (this._enemy._isNearDeath && this._enemy._flashWhenNearDeath) {
                // Flash red when near death (alternating every 10 frames)
                if (this._enemy._nearDeathFlashDuration % 20 < 10) {
                    this.setColorTone([255, 0, 0, 128]); // Red tint
                } else {
                    this.setColorTone([0, 0, 0, 0]); // Normal
                }
            } else {
                this.setColorTone([0, 0, 0, 0]); // Normal
            }
        }
    };
    
    //=============================================================================
    // Handle larger boss sprites (96x96 pixels)
    //=============================================================================
    
    var _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
    Sprite_Enemy.prototype.loadBitmap = function(name, hue) {
        _Sprite_Enemy_loadBitmap.call(this, name, hue);
        this.adjustBossSprite();
    };
    
    Sprite_Enemy.prototype.adjustBossSprite = function() {
        if (this._enemy && this._enemy.isBoss()) {
            // Check for custom frame size in note tags
            var frameWidthMatch = this._enemy.enemy().note.match(/<Sideview Frame Width: (\d+)>/i);
            var frameHeightMatch = this._enemy.enemy().note.match(/<Sideview Frame Height: (\d+)>/i);
            
            if (frameWidthMatch && frameHeightMatch) {
                this._frameWidth = parseInt(frameWidthMatch[1]);
                this._frameHeight = parseInt(frameHeightMatch[1]);
            } else {
                // Default boss size is 96x96
                this._frameWidth = 96;
                this._frameHeight = 96;
            }
            
            // Adjust sprite scale if needed
            if (this._frameWidth > 64 || this._frameHeight > 64) {
                // Optional: Scale the sprite if it's too large for the battle area
                // this.scale.x = 0.8;
                // this.scale.y = 0.8;
            }
        }
    };
    
    var _Sprite_Enemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
    Sprite_Enemy.prototype.updateFrame = function() {
        if (this._enemy && this._enemy.isBoss() && this._frameWidth && this._frameHeight) {
            // Custom frame update for boss sprites
            var bitmap = this._mainSprite.bitmap;
            if (bitmap) {
                var frameWidth = this._frameWidth;
                var frameHeight = this._frameHeight;
                
                // Get animation frame count from note tag if available
                var frameCountMatch = this._enemy.enemy().note.match(/<Sideview Animation Frames: (\d+)>/i);
                var frameCount = frameCountMatch ? parseInt(frameCountMatch[1]) : 8; // Default to 8 frames
                
                // Calculate total number of frames in the sprite sheet
                var totalFrames = Math.floor(bitmap.width / frameWidth);
                
                // Limit to actual available frames
                frameCount = Math.min(frameCount, totalFrames);
                
                // Calculate current frame based on animation pattern
                var pattern = this._pattern < frameCount ? this._pattern : this._pattern % frameCount;
                var sx = pattern * frameWidth;
                var sy = 0;
                
                // If near death and in the "red flash" phase, use the near-death frames if available
                if (this._enemy._isNearDeath && 
                    this._enemy._flashWhenNearDeath && 
                    this._enemy._nearDeathFlashDuration % 20 < 10 &&
                    bitmap.height >= frameHeight * 2) {
                    sy = frameHeight; // Use second row for near-death frames
                }
                
                this._mainSprite.setFrame(sx, sy, frameWidth, frameHeight);
            }
        } else {
            _Sprite_Enemy_updateFrame.call(this);
        }
    };
})();
