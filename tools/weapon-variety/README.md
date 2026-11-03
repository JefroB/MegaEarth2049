# Weapon variety

Adds weapons 61–72, attack skills 185–196, cures 197–198, states 48–51, items 154–156, animations 176–187 and icons 1984–2015. Existing IDs, original weapons and story progression are preserved. Data backup: before.zip. build.py deliberately refuses to append twice.

## Existing projectile audit
- Grenade animations 141–145 contain hand-authored cell movement, rotation and impacts. Toss Grenade 142 is used by Smoke Bomb 76 and Bulldoze 68 through YEP action-sequence notes.
- Most guns use target-centered Shoot Normal 111 (Gun1 sprite sheet).
- Lazer Shotgun 39 uses Laser Blast 155. Automatic Gunfire 123 and Laser One/All 115–116 also exist. Security Pulse 157 uses 115.
- Weapon Image tags choose held weapon graphics, not projectile animations.
- YEP BattleEngineCore/ActSeq packs are not active. Existing action-sequence text does not execute under the current stack. No YEP core was enabled or legacy action sequence changed by this patch.
- Enabled existing WeaponSkill.js: native per-weapon Attack skills and ally selection. First equipped weapon controls the skill. No new battle framework is needed.

## Rendering
New animations use RPG Maker MV's native Sprite_Animation cells, with transparent 192px cells in ME_WeaponVariety.png. Thrown props rotate along an incoming arc; invoice returns; staples/spikes travel straight; melee swipes and supportive pulses use separate paths. They are target-relative authored animations like the original grenade, not dynamically traced from the actor's exact hand position. Native battle busy handling waits for animation completion before resolving actions.

## Gameplay
Hardware shop Map103/event2 stocks 61,62,63,64,68,70. Newtown salvage Map105/event4 stocks 65,66,67,69,71,72 and all three cures. Pharmacy Map105/event5 also stocks cures. All weapons have a playable class that can equip them. No class weapon restrictions changed.

Stapled: AGI x0.6, 2 turns. Glitterblind: HIT -0.25, 2 turns. Recall Rash: HP regeneration -2%, 3 turns. Fine Print: MDF x0.75, 3 turns. All expire after battle, respect ordinary state resistance, and do not restrict turns. Adhesive Remover clears Stapled/Glitterblind; Recall Lotion clears Rash; Retraction Stamp clears Fine Print. Shake It Off (10 TP, self) clears the first two. Clinical Reset (4 MP, ally) clears all four. Existing Cheer classes receive Shake It Off; Priest/Mod Doctor receive Clinical Reset through traits so existing saves benefit.

Visual review: art/weapons/preview.html. Build art with pack.js; it only packs generated atlas pixels. Gameplay/runtime checks: node tools/weapon-variety/test.js. Test fixture manipulations do not change game data. Balance is a conservative first pass and still merits normal campaign playtesting.
