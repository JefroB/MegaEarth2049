# Conditions of Employment

States 52–63; player skills 199–214; enemy variants 215–226; items 157–160; native animations 188–203; icons 2016–2047.

All new states use native traits, fixed turn-end duration and battle-end removal. Harmful application skills use magical hit type so normal state-rate/resist traits are honored. Beneficial applications and removals use certain hit. No battle plugins or legacy state records changed. Reapplication resets duration; states do not stack with themselves. Different states can combine.

| State | Effect | Turns | Apply | Remove |
|---|---|---|---|---|
|Influenza|AGI -20%, healing received -20%. Sick leave denied.|3|Aerosol Benefits|Clinical Flush / Pathogen Purge|
|Scabies|HIT -15%, AGI -10%. Mandatory team infestation.|3|Mite Shift|Clinical Flush / Pathogen Purge|
|Chrome Rot|DEF and MDF -15%. Your implant warranty has dissolved.|3|Corrupt Implant|Clinical Flush / Pathogen Purge|
|Nanite Sepsis|Lose 3% HP per turn; healing received -20%. Internal hostile takeover.|3|Dirty Nanites|Clinical Flush / Pathogen Purge|
|Adrenal Surge|ATK +20%, AGI +15%. Overtime in a syringe.|3|Adrenal Surge|Revoke Benefits (enemy), Safe Mode (ally) / Benefit Revocation (enemy)|
|Nanite Repair|Restore 4% HP per turn. Your body has opened a repair ticket.|3|Repair Swarm|Revoke Benefits (enemy), Safe Mode (ally) / Benefit Revocation (enemy)|
|Dermal Plating|Physical damage taken -20%. Skin now meets building code.|3|Install Plating|Revoke Benefits (enemy), Safe Mode (ally) / Benefit Revocation (enemy)|
|Signal Focus|MAT +20%, MP costs -20%. Premium brain bandwidth.|3|Tune Signal|Revoke Benefits (enemy), Safe Mode (ally) / Benefit Revocation (enemy)|
|Enfeebled|ATK -25%. Strength has been outsourced.|3|Outsource Strength|Neural Reboot / Neural Reset Cartridge|
|Armor Fracture|DEF -25%. Structural integrity is a paid extra.|3|Stress Fracture|Neural Reboot / Neural Reset Cartridge|
|Packet Loss|Tech skills sealed. Basic attacks, Ability and items still work.|2|Throttle Connection|Neural Reboot / Neural Reset Cartridge|
|Optic Desync|HIT -20%, EVA -10%. Your eyes are buffering.|2|Scramble Optics|Neural Reboot / Neural Reset Cartridge|

Emergency Rollback clears all twelve new states from an ally, including buffs. Revoke Benefits and Benefit Revocation also strip native stat buffs. Removers enumerate their targets and do not remove Knockout, Immortal or unrelated scripted states. Packet Loss seals Tech only; Ability-based cures and items remain available.

Class traits grant skills to existing and new saves. MP costs: applications 5–7; Clinical Flush 6; Neural Reboot 5; Revoke Benefits 6; Safe Mode 2. Shops: Map105 events 4 and 5. Prices: 60/55/75/90 gold. All items are battle consumables.

Enemy variants reuse the same effect/animation/icon and intentionally cost no MP because these ordinary enemies have zero MP. They appear on turn 2 and every 4 turns thereafter, with rating 4 against ordinary attack rating 5. This leaves normal attacks available and does not touch bosses.

- Enemy 6: Aerosol Benefits (215).
- Enemy 5: Mite Shift (216).
- Enemy 48: Corrupt Implant (217).
- Enemy 100: Dirty Nanites (218).
- Enemy 27: Adrenal Surge (219).
- Enemy 50: Repair Swarm (220).
- Enemy 51: Install Plating (221).
- Enemy 39: Tune Signal (222).
- Enemy 40: Outsource Strength (223).
- Enemy 62: Stress Fracture (224).
- Enemy 47: Throttle Connection (225).
- Enemy 49: Scramble Optics (226).

Art: generated atlas.png; pack.js creates the icon and 192px-cell animation sheets. Effects use modest 12–30% scales with distinct positions/choreography, not enlarged full-screen symbols. preview.py reads live records to prevent preview/runtime drift.

Build once using build.py (duplicate IDs refused). Original files are in before.zip. Test with node tools/state-expansion/test.js. Review art/states/preview.html. Validation covers native effects, resistance, duration, cures, enemy eligibility, class availability, save roundtrip and full action timing. Campaign balance still needs ordinary playtesting.
