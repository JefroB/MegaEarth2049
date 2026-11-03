# MegaEarth 2049 — Diseases and states

Jump to: [Traditional states](#traditional-combat-states) · [Application sources](#disease-application-sources) · [Field Guide](#body-and-firmware-field-guide)

## Which status additions are fully wired in?

The two recent batches add states 52–75, with application/removal skills, icons, native animations, selected ordinary-enemy uses and shop remedies. They last 2–3 turns and clear at battle end. These are fictional RPG effects, not medical descriptions or treatment advice.

| State | Current effect |
|---|---|
|Influenza|AGI -20%, healing received -20%. Sick leave denied.|
|Scabies|HIT -15%, AGI -10%. Mandatory team infestation.|
|Chrome Rot|DEF and MDF -15%. Your implant warranty has dissolved.|
|Nanite Sepsis|Lose 3% HP per turn; healing received -20%. Internal hostile takeover.|
|Adrenal Surge|ATK +20%, AGI +15%. Overtime in a syringe.|
|Nanite Repair|Restore 4% HP per turn. Your body has opened a repair ticket.|
|Dermal Plating|Physical damage taken -20%. Skin now meets building code.|
|Signal Focus|MAT +20%, MP costs -20%. Premium brain bandwidth.|
|Enfeebled|ATK -25%. Strength has been outsourced.|
|Armor Fracture|DEF -25%. Structural integrity is a paid extra.|
|Packet Loss|Tech skills sealed. Basic attacks, Ability and items still work.|
|Optic Desync|HIT -20%, EVA -10%. Your eyes are buffering.|
|Athlete's Foot|AGI -20%. Corporate showers charge extra for fungus.|
|Beneficial Parasites|ATK +15%, AGI +10%; lose 3% HP each turn. Your tenant eats rent.|
|Wi-Fi Allergy|Lose 2% HP per turn; Thunder damage -35%. Allergic to connectivity.|
|Digital Dementia|HIT -15%, CRI +8%. Forgot the plan; remembered the weak spot.|
|Aim Assist|HIT +10%, CRI +10%. Premium aiming subscription.|
|Reflex Cache|EVA +15%. Dodge now, process the paperwork later.|
|Countermeasure|15% magic reflection chance. Returns incoming spell hostility.|
|Capacitor Reserve|Restore 4% MP per turn. Electricity billed to your employer.|
|Exposed|Physical damage taken +20%. Your protection plan has a hole.|
|Curse|LUK -30%; lose 3% MP each turn. Interest compounds in the dark.|
|Heat Lock|MP costs +40%. Thermal throttling has reached your brain.|
|Target Painted|Target weight doubled; EVA -5%. Applies to random enemy targeting.|

## How are they removed?

- **Clinical Flush / Pathogen Purge:** both batches of diseases, legacy STDs27–31, Queasy, Parcel Fever and Recall Rash. This also removes Beneficial Parasites' bonuses.
- **Neural Reboot / Neural Reset Cartridge:** both batches of debuffs, plus Stapled, Glitterblind and Fine Print.
- **Revoke Benefits / Benefit Revocation / Deauthorize:** specified new buff states and ordinary stat buffs from an enemy.
- **Safe Mode:** specified new buff states from an ally.
- **Emergency Rollback:** all 24 new states, including beneficial ones.
- **Acme Footloose, Evict-A-Worm, Airplane Mode and Clean Slate:** narrower options described in their item text.

The new items are stocked at Newtown Reclamation Market's salvage dealer and pharmacy. These removers do not clear Knockout, Immortal or unrelated scripted states.

## Do all the older disease names have effects?

Legacy states27–31 now have bounded combat effects: Herpes drains 2% HP per turn; Aids reduces healing received by 20%; Gonorrhea reduces AGI by 15%; Syphalis lowers hit rate by 10 percentage points; The Clap reduces ATK by 15%. Each lasts three turns, ends after battle, and is removed by Clinical Flush or Pathogen Purge. These are fictional combat abstractions. Five disease samples and five ordinary-enemy attacks now apply these ailments; matching Acme remedies are sold in the Timbuc Item Shop and Newtown market. Bosses resist application at half rate. Unused drafts and scripted placeholders are classified in [the repair record](FAQ_08_Technical_Issues.md#legacy-repair-record).

Rabinex and Rabies exist. Do not assume that every named Acme cure from the older catalog is an available item. Five named Acme remedies and explicit battle application paths are now implemented. There is no automatic contagion simulation.

## Do diseases spread, change dialogue or unlock achievements automatically?

No general contagion/social-reaction/achievement system was verified. A specific enemy skill or event can apply a state. Marked salvage caches already offer explicit disease risks; the Field Guide supplies the reference catalog. Further authored reactions would need their own implementation. Random permanent skill loss, lighting-dependent disorders and player-specific diagnoses are not current mechanics.

## Can a disease be useful?

Yes. Beneficial Parasites raises ATK/AGI but drains HP; Wi-Fi Allergy trades HP loss for Thunder resistance; Digital Dementia lowers accuracy while increasing critical chance. These are explicit temporary tradeoffs adapted from the old designs, not hidden permanent character changes.

Evidence: `data/States.json`, `data/Skills.json`, `data/Items.json`, `data/Map105.json`; [first preview](../art/states/preview.html), [second preview](../art/states-2/preview.html), [audit](FAQ_08_Technical_Issues.md#documentation-audit-and-current-status).


See [the additions guide](FAQ_05_Equipment_and_Items.md#fixed-weapon-exchanges-and-remedies) for Green Herb, Panacea, the five named Acme cures, and Probably Not Poison.


## Is there an in-game reference?

Yes. Open **Field Guide** from the main menu or read it at a clinic. It lists live effects, durations, actual cures, application sources and current party conditions. A reusable copy is added to Key Items. See [controls and coverage](FAQ_09_Disease_System.md#body-and-firmware-field-guide).


<a id="traditional-combat-states"></a>

## Paralysis, Temporal Stasis and Stone Skin

- Paralysis prevents actions for two turn-end counters. Temporal Stasis prevents the remainder of the current turn and cancels the target's queued native actions; it does not freeze the whole battle. Both clear at battle end. Named custom bosses resist these hard locks through native immunity; the training echo has 50% state rates instead.
- Stone Skin lasts three turn-end counters, multiplying physical damage received by0.75 and AGI by0.85. Removing it removes both effects. It also clears at battle end.
- Skills269–274 provide Nerve Clamp, Borrowed Second, Stone Skin, Release Motor Lock, Shed Stone and Break Stone. Existing class traits make them available to eligible old-save characters without new recruitment or leveling requirements. Enemy variants275–277 are available to Foot Soldier8, Advanced Protection Type1 enemy110 and Black Ogre63.
- Acme Motor Recall192 clears Paralysis/Stasis; Acme Soft Reset193 clears Stone Skin. Existing applicable cleanses and strips also include the new states; the live Field Guide lists exact targets and coverage. Native animations220–224 accompany the applications and removals.


## Disease application sources

- **Lake salvage dealer (Map105):** five disposable disease samples, 35 Credits each. They have a60% base chance against one enemy; state resistance applies. Five ordinary enemies now use corresponding45% attacks on turn2 and every fourth turn thereafter. Named bosses have50% state rates for these five ailments; their attack scripts and phases are unchanged.

Warning caches110/112/114 separately offer resistance-aware50% exposure to Chrome Rot, Scabies and Influenza. Refusal is safe, sterilization consumes one Pathogen Purge, and a full pack causes no exposure or charge. See [salvage collections](FAQ_07_Secrets_and_Easter_Eggs.md#off-clock-collections-and-salvage).


<a id="body-and-firmware-field-guide"></a>

## Body & Firmware Field Guide

Open **Field Guide** from the main menu, or **Read field guide** at B.M.N.E.C. reception, Dorlund triage, the D Town body-mod technician or the Mod Center counter. Opening it gives one free reusable copy in **Key Items**. The book works outside battle and is not consumed.

The fixed reference contains67 public state entries and 3 calibrated implants. It is available immediately on existing saves, without an encounter-discovery grind or new save fields. Internal immortality, empty drafts and scripted placeholder records are omitted.

### Controls

- Left/Right chooses Diseases, Buffs, Debuffs or Implants.
- OK enters the entry list; Up/Down selects an entry.
- OK again focuses the detail pane. Up/Down and Page keys scroll it.
- Cancel returns to entries, then categories, then the previous scene.
- Clinic and Key Item common-event entry return to the map when closed, following native MV item-event behavior.

The navigation footer has its own full-height area. Details wrap to the available width, and longer entries scroll with native arrows; they do not require squeezing text below the window.

### What the reference shows

State traits, restrictions and removal rules are read from the current database when displayed. Entries include automatic duration and removal timing, persistence after battle, damage/walking removal where relevant, current affected party members and remaining turn counters. Cure and application lists are derived from actual item/skill effects, with ally/foe targeting labels and base application chance. Application sources may belong to enemies or characters outside the current party; hit checks and resistance still apply.

Clinic Recovery is documented as the general state-clearing HP/MP service. The guide itself does not heal, remove states, advance timers, grant skills or change party members. Beneficial Parasites explicitly warns that removing it removes its bonuses. Panacea is never shown as a KO or plot-quarantine cure.

Implant entries read live accessory traits and show prototype/calibration costs, slot requirements, exact unequip/return behavior, current inventory and equipped users. Third Eye’s carried/equipped exploration behavior is included.

### Corrections found during the live-data check

Herpes27 and Queasy76 had recently been wired to xparam0 (accuracy) while their descriptions promised HP loss. They now use xparam7 (HP regeneration): Herpes loses2% of maximum HP per turn; Queasy loses3%, each for 3 turns and cleared after battle. Their existing cures remain valid. The tests exercise actual sample/potion application, all three native turn-end ticks, expiry, unchanged accuracy and stopping damage with a cure.

Other legacy effects are described as they currently work, even when an old name is misleading. This pass does not silently rebalance the older state set.

[Native state-animation viewer](../art/bounded/animations.html) · [Exact icon and effect cells](../art/bounded/preview.html).
