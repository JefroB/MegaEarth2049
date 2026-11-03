# Side Effects of Employment — second state batch

Implements selected historical ideas from GameFAQs/FAQ_09_Disease_System.md, FAQ_11_Body_Modification_System.md and DICTIONARY/DICTIONARY.md. See GameFAQs/FAQ_08_Technical_Issues.md#documentation-audit-and-current-status for what was adapted and what remains unimplemented.

States 64–75; player skills 227–242; enemy variants 243–254; items 161–164; animations 204–219; icons 2048–2079. No plugins or boss scripts changed.

| State | Mechanical effect and flavor | Apply |
|---|---|---|
|Athlete's Foot|AGI -20%. Corporate showers charge extra for fungus.|Locker-Room Dividend (enemy)|
|Beneficial Parasites|ATK +15%, AGI +10%; lose 3% HP each turn. Your tenant eats rent.|Symbiotic Contract (ally)|
|Wi-Fi Allergy|Lose 2% HP per turn; Thunder damage -35%. Allergic to connectivity.|Broadcast Irritant (enemy)|
|Digital Dementia|HIT -15%, CRI +8%. Forgot the plan; remembered the weak spot.|Memory Leak (enemy)|
|Aim Assist|HIT +10%, CRI +10%. Premium aiming subscription.|Calibrate Optics (ally)|
|Reflex Cache|EVA +15%. Dodge now, process the paperwork later.|Cache Reflexes (ally)|
|Countermeasure|15% magic reflection chance. Returns incoming spell hostility.|Arm Countermeasure (ally)|
|Capacitor Reserve|Restore 4% MP per turn. Electricity billed to your employer.|Charge Reserve (ally)|
|Exposed|Physical damage taken +20%. Your protection plan has a hole.|Open Liability (enemy)|
|Curse|LUK -30%; lose 3% MP each turn. Interest compounds in the dark.|Compound Misfortune (enemy)|
|Heat Lock|MP costs +40%. Thermal throttling has reached your brain.|Thermal Throttle (enemy)|
|Target Painted|Target weight doubled; EVA -5%. Applies to random enemy targeting.|Sell Location Data (enemy)|

All states last 3 turns except Heat Lock/Target Painted (2); all expire at battle end. Harmful applications are magical and respect native state rates/resistance and magic evasion/reflection. Allies receive sure-hit applications. Native magic reflection is used for Countermeasure; it does not replace the Attack skill or invoke physical counters. Target Painted affects random target weighting, not scripted targets or all-target actions. Percentage HP/MP regeneration follows native rounding and slip-death configuration.

Beneficial Parasites is deliberately applied to allies for a risk/reward buff. It is still a disease for cleansing. Wi-Fi Allergy and Digital Dementia have advantages but are hostile applications. These are fictional battle interpretations, not real-world disease claims or treatments.

New removers: Parasite Eviction (65), Grounding Routine (66/67/74/75), Clear Liability (64–67/72–75), Deauthorize (56–59/68–71 and ordinary stat buffs). Existing Clinical Flush, Neural Reboot, Revoke Benefits, Safe Mode and corresponding remedies were expanded to both batches. Emergency Rollback clears states 52–75 including buffs. No death/immortality/script-only state is removed.

Newtown Map105 event4 salvage and event5 pharmacy stock Acme Footloose (35), Evict-A-Worm (40), Airplane Mode (55), Clean Slate (90). Skills are granted through class traits so existing saves gain them. No weapon or skill type restrictions changed.

Twelve ordinary enemy variants have zero MP cost because their existing MP pools are zero. Each is eligible on turn 2 and every four turns afterwards, rating4 versus basic attack rating5. Existing actions remain. Targets/poses use the native engine.

- Enemy 82: skill 243 Locker-Room Dividend.
- Enemy 93: skill 244 Symbiotic Contract.
- Enemy 110: skill 245 Broadcast Irritant.
- Enemy 111: skill 246 Memory Leak.
- Enemy 7: skill 247 Calibrate Optics.
- Enemy 12: skill 248 Cache Reflexes.
- Enemy 106: skill 249 Arm Countermeasure.
- Enemy 107: skill 250 Charge Reserve.
- Enemy 63: skill 251 Open Liability.
- Enemy 102: skill 252 Compound Misfortune.
- Enemy 112: skill 253 Thermal Throttle.
- Enemy 113: skill 254 Sell Location Data.

build.py appends once and rejects duplicate IDs. before.zip preserves changed database files and IconSet. pack.js packs generated atlas art into icon and native animation cells. preview.py reads live data. test.js checks state effects, tradeoffs, resistance, expiration, removers, existing cure extensions, enemy eligibility, class access, save roundtrip and 28 full actions. Normal campaign balance testing remains useful.

Art uses 12–26% cell scales at normal battle resolution; no large body-sized projectiles. Exposed pries protection away before revealing the vulnerable target symbol; it does not assemble armor like a buff.
