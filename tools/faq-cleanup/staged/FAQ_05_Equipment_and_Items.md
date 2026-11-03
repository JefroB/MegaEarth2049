# MegaEarth 2049 — Equipment and items

## What can be equipped?

The configured slots are **Weapon, Shield, Hat, Jacket, Gloves, Pants, Shoes, Accessory**. Classes and actor traits determine equipment access. There is no separate general-purpose implant/program slot system in the active configuration.

## What weapons and armor are actually present?

Examples include the BFG, Chainsaw, Railgun, Yo-Yo, laser weapons, Bermuda Shorts and Armortech clothing. New surplus weapons include Executive Rubber Chicken, Boomerang Invoice, OSHA-Approved Brick and support weapons. The workshop now upgrades the chicken into Union Rubber Chicken, with useful damage and stronger TP drain.

Deprogrammed Burlap Pants, Off-Clock Burlap Vest and Union Stitch Gloves are now available after returning the SEAM control module to the researcher in Timbuc. Choose one plus150 Credits; the researcher and Pants-O-Rama then sell all three. They have ordinary equipment effects, not a dimensional set bonus.

## What consumables can I use?

Hot Links restore 100 HP; Spicy Burrito restores 150 HP; Energy Drink restores 30 MP; Stimulant grants 20 TP and removes Sleep; Rabinex removes Rabies. Acetaminophen and the new status remedies also exist. Check the in-game description and usable targets.

Newtown's reclamation-market pharmacy and salvage dealer stock the new cures and dispels. [State previews](../art/states/preview.html) and [second batch](../art/states-2/preview.html) show their effects.

## Is inventory limited by weight or durability?

The current native inventory is shared and normally caps each item at 99. A weight-by-Strength system, global weapon degradation, universal contraband checks and automatic STD contamination are not implemented by the active stack. Individual quest-specific checks can be added without building a full simulation.

## Are there upgrades or surgery services?

Disco Implant, Third Eye Mod and Experimental Neural Enhancer now have reversible accessory calibration through the [mod clinic](FAQ_11_Body_Modification_System.md#prototype-mod-clinic). Their prototype items are crafting inputs, not battle consumables. The salvage workshop's tool librarian now offers three fixed weapon exchanges. Third Eye unlocks an optional Underworks service route; a general surgery/crafting system remains unimplemented.

## Can I buy Probably Not Poison, Finger Guns or a Panacea?

Probably Not Poison and Panacea are sold at the Timbuc Item Shop and Newtown market pharmacy. The potion has explicit 50/25/25 healing/MP/Queasy outcomes. Panacea clears its listed combat ailments without revival or plot-state removal. Finger Guns remains a candidate.

Evidence: `data/System.json` equipTypes; `js/rpg_objects.js` `Game_Party.maxItems`; `data/Items.json`, `Weapons.json`, `Armors.json`; `data/Map105.json` events4/5.



## Fixed weapon exchanges and remedies

- **Timbuc Item Shop (Map003) and Newtown market pharmacy (Map105):** Acme Herpicin, Retroviral Relief, Gon-A-Gone, Syph-Off and Clapback. Each costs 25 Credits and clears its corresponding legacy combat STD. Green Herb costs25 and restores80 HP while clearing Poison/Queasy. Panacea costs120 and uses an explicit combat-ailment list; it does not revive or remove immortality, plot quarantine or ordinary positive buffs. It does remove Beneficial Parasites, including its bonuses.

- **Salvage workshop (Map108), tool librarian:** exchange one unequipped Executive Rubber Chicken +180 Credits for Union Rubber Chicken; OSHA-Approved Brick +240 for Reinforced Safety Brick; Pink-Slip Stapler +220 for Tenured Stapler. The nearby bench sells base weapons. Exchanges show effects and price, can be cancelled, reject missing funds/materials/full result inventory, and cannot recursively upgrade results. Equipped weapons are never taken.

- **Probably Not Poison:** sold alongside remedies for 15 Credits, battle-only, one living ally. Exactly one roll:50% heals150 HP,25% restores30 MP,25% inflicts Queasy. Queasy drains3% maximum HP per turn for 3 turns and ends with battle; Green Herb, Panacea, Clinical Flush or Pathogen Purge removes it. This is the only new plugin; it aliases the native item-use effect and stores no save data.

These recipes use approved weapon animations and retain their corrected scales. See [weapons preview](../art/weapons/preview.html), [diseases](FAQ_09_Disease_System.md) and [ninja techniques](FAQ_10_Ninja_System.md#personal-ninja-techniques).


<a id="local-disguises"></a>

## Clothing and local disguises

Buy the outfits from **Pants Witness Protection in Rivet Commons**. Wear **Hard Hat50 + Work Boots51**, or **Coolt White Helmet58 + Protective Vest59**, on the same walking party member. Split outfits across two actors or reserve-only wearers do not qualify.

Forewoman Latch, the Newtown reclamation magistrate and the canteen pension auditor have authored reactions. Original services and evidence requirements remain. These repaired Clothing records do not confer quest authority, discounts or automatic victories. Deprogrammed burlap clothing has its own [reward and shop table](FAQ_06_Quests_and_Storylines.md#burlap-pants-conspiracy).
