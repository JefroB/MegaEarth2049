# MegaEarth 2049 — Quests and storyline

Jump to: [Burlap](#burlap-pants-conspiracy) · [Clown Court](#clown-court) · [Vending uprising](#vending-machine-uprising) · [Rivet projects](#rivet-local-projects) · [Perfect Fit](#the-perfect-fit) · [Completion Log](#local-completion-log)

## What story should new content follow?

Build on Rex's implant, corporate control, the Necklace and A.S.P./Protocol Zero material. The authoritative current constraints are in [STORY_PROGRESSION.md](../docs/story/STORY_PROGRESSION.md). Older story outlines remain sources, but their proposed quest names and ending variants are not proof of playable events.

## Are there 800 side quests and six completed endings?

Those counts were unsupported and have been removed. The repository contains named quest switches, journal text and map events at different levels of completion. Journal entries alone do not prove a complete quest chain, rewards or traversable route. No replacement completion count is asserted without a quest-by-quest playthrough.

## What existing quest material can we build on?

- Necklace pieces and assembly requirements.
- Smelly Keys and the Timbuc Cellar rooms.
- Jen's necklace/recruitment event.
- Engine Blueprint/components and completion events.
- Burlap Package, Fabric Sample and SEAM-3000 confrontation.
- Armatek Underworks, Cold Storage and Dorlund's Unpaid Shift/Payroll Ossuary.
- Six newer maze investigations and their custodian encounters.

The duplicated engine hand-in has been consolidated. Bring blueprint128 and components129–131 to the MegaEarth mechanic: they are consumed for Completed Engine132, once. This is separate from Zack’s crane-engine quest.

## How much of the Burlap Pants Conspiracy exists?

Timbuc has package/researcher events; Timbuc 2's Pants-O-Rama events lead to troop52 and the SEAM control module. The imported walkthrough's delivery-truck pursuit, factory levels, lab analysis and reprogram-or-destroy ending are not established by that shorter live chain. The duplicate events are consolidated. Return the SEAM control module to the researcher in Timbuc for one of three safe burlap garments and 150 Credits. Both the researcher and Pants-O-Rama then sell the safe clothing. Alternate reprogramming endings remain unimplemented.

## What is the Underwriter's role?

It is a regional Dorlund boss connected to the recovered payroll roster. Defeating it opens the Claims Audit Archive. It neither replaces the Necklace guardian nor completes the game's final castle sequence.

## Which optional stories are playable?

Clown Court, the Vending Machine Uprising, the first Hidden Dojo trial, the Workers Memory archive, the Perfect Fit aftermath, nine original-companion chapters and MAX-E-MUM’s inspection are implemented within their documented scope. See the walkthroughs below, [companions](FAQ_04_Characters_and_NPCs.md#companion-chapters) and [the Dojo](FAQ_10_Ninja_System.md#hidden-dojo-first-trial). Further stories are tracked in [the roadmap](ROADMAP.md).

## What is the endgame plan?

Return to the first world map, gain entry to and navigate the floating castle, then fight two bosses back to back. Preserve existing resource/Necklace requirements and ending themes. The number of endings, final identities and checkpoint policy remain unresolved; no secret seventh ending is advertised.


## Burlap Pants Conspiracy

1. Find the Mysterious Burlap Package in Timbuc (Map010,event10).
2. Talk to the Armatek AI Researcher nearby (event11). Analysis labels a fabric sample and reveals SEAM-3000’s mind-control nanites. Declining leaves the offer available.
3. Search behind the counter at Pants-O-Rama in Timbuc2 (Map002,event23). Defeat SEAM-3000 (troop52) to recover its control module. Defeat grants no module or completion; the encounter can be retried.
4. Return to the researcher. Choose one garment and receive150 Credits. The module is handed in, and the reward can only be claimed once. Declining or having99 copies of the selected garment leaves the claim available.
5. The researcher and Pants-O-Rama now sell all three deprogrammed garments.

| Garment | Slot | Effects | Shop price |
|---|---|---|---|
| Deprogrammed Burlap Pants65 | Pants | DEF+6, AGI−2, Poison application rate×0.75 |120 Credits|
| Off-Clock Burlap Vest66 | Jacket | DEF+5, MDF+4 |160 Credits|
| Union Stitch Gloves67 | Gloves | ATK+3, DEF+2, hit rate+3 percentage points |100 Credits|

All use Clothing armor permission and existing equipment slots. Removing them reverses their equipment effects. There is no forced clothing, permanent stat grant, dimensional set bonus, or new SEAM attack/animation.

### Existing saves

The researcher accepts an owned control module or the prior canonical/retired Pants-O-Rama victory self-switch. Earlier winners do not need to repeat the fight or start the package sequence again. Reward completion is recorded by self-switchB on Map010 events11/13; shop victory flags remain intact. The duplicate event IDs remain retired. No campaign, necklace, regional-boss or castle gates change.

After the original reward, Pants-O-Rama offers [The Perfect Fit](FAQ_06_Quests_and_Storylines.md#the-perfect-fit), a separate projection inspection and payment.


## Clown Court

Speak to **Bailiff Honk in Timbuc**, west of the Burlap package/researcher area. He gives Court Summons138 and offers entry to the underground court. You can defer attendance, leave freely, and return later.

The case follows the existing Clown Court story: a neighbourhood clown has charged Rex with Insufficient Whimsy, and the underground court accepts pie-based evidence and interpretive argument.

### Investigation and hearing

- **Department of Whimsy (Map241):** speak to the filing clerk for directions. The left stair hatch leads to Evidence Discovery; the right leads to the hearing chamber. The front hatch returns to Timbuc.
- **Pie Discovery Room (Map242):** recover Pie-Based Evidence139 from the exhibit. The baked-in receipt proves a guilty verdict was prepaid. Read the prosecution billing ledger or invite the mime witness to testify. Either supplies corroboration.
- **Chamber of Appeals (Map243):** speak to Judge Honk at the bench. With the pie and ledger, choose **Juggle the invoice dates**. With the pie and mime testimony, choose **Call the mime; mime innocence**.

Sincere argument adjourns the hearing without a fine or lost evidence. Unsupported arguments explain what is missing. Recess returns control so you can investigate; mistakes do not permanently fail the quest.

### Verdict and reward

An acquittal consumes one pie exhibit and awards **250 Credits once**. Switch176 records permanent Clown Court good graces; it is a relationship/progression flag, not an invisible permanent combat buff. The court usher then shares directions for the existing experimental-engine components. The clue grants no parts or campaign shortcuts.

The summons remains in your inventory. The exhibit stops providing new pies after acquittal. Older saves already holding the summons or pie can use them normally; they still need corroboration. Save/load preserves evidence, testimony and verdict flags, and cannot repeat the payout.


## Vending Machine Uprising

The Snack Liberation Front follows the existing story: three former patients of Zed installed a defective emotional module, and machines began dispensing terrible unsolicited advice. The new investigation connects the human founders to the machine-rights/maintenance demands in the older outline.

### Where to go

Inspect **memory labels** at all three machines, in any order:

| Machine | Location | Diagnostic |
|---|---|---|
| CARE-O-MATIC | Timbuc, eastern street near the researcher | Pip’s clinic-socket firmware fragment |
| CAREER-O-MATIC | Timbuc2, eastern street | Mox’s skipped advice filter |
| SELF-CARE-O-MATIC | B.M.N.E.C. public frontage, against the building | Inez’s emotional-module fragment |

The first inspection grants Vending Machine Manifesto140. Its description keeps the three locations and next lead visible. Repeated inspections do not create extra manifestos. An old save already holding the manifesto still needs the three diagnostics.

After all three, speak to **Pip at the service hatch in Timbuc**, on the western path north of Bailiff Honk. Enter the SLF break room (Map244), speak to the three founders, and use the consent/firmware terminal.

### Policy choice and rewards

| Choice | Immediate reward | All three machines afterward |
|---|---|---|
| Opt-in advice patch |100 Credits once | Ask before advice; Hot Links32 Credits, Energy Drink72 Credits |
| Disable defective advice module |100 Credits,2 Hot Links and 2 Energy Drinks once | Advice off; regular Hot Links40 Credits, Energy Drink90 Credits |

Both options show their effects and ask for confirmation. Cancelling or postponing leaves the case unresolved. The supply option requires room for both items; if inventory is full, nothing is consumed or awarded and the policy remains pending. The chosen policy is permanent for that save and cannot be flipped for another payout.

Machines remain ordinary native buy-only shops. Co-op prices are20% below the current regular item prices and remain above ordinary resale values. The discount applies only at these three machines, not every vendor. Opt-in advice also includes an optional machine-to-microwave love-letter gag with no extra quest or stat reward.

The hatch exit works before and after resolution. Existing quests and campaign gates are preserved. No boss, combat plugin, reputation simulation or universal machine sentience system is added.


## Rivet local projects

These four optional additions use the existing Rivet workers, workshop, Last Shift Canteen and Snack Liberation Front. The archive is a bounded first contribution to the authored Wasteland Historians idea; it does not claim to finish that larger story or the Wasteland Radio DJ quest.

### Where to start

Speak to **Splice**, the retired records worker in the southeast of Rivet Commons' Workers' Salvage Yard. The **three-bin sorting station** is nearby on open sand. The existing **Shared Workshop repair bench** now offers both its original tool shop and an archive-terminal option.

### A14: Rivet crew standing

Standing is a local0–3 score, refreshed when discussing local projects or visiting Beryl. Each of these counts once:

1. Complete Beryl's six-part recycling exchange.
2. Finish Splice's Workers Memory archive.
3. Pass all three sorting classifications in one run.

At **2/3**, Beryl discounts hardware purchases by **10%**, rounded down. The same merchandise remains available. Database prices, selling prices, other shops and existing fixed weapon-upgrade costs are unchanged. Older saves with recycling already completed receive that point without replaying it. Repeating practice or opening the standing display grants no additional points.

This is one workers' group's standing prototype. It does not add global corporate reputation, affection, bounty hunters or ending conditions.

### A17: the archive-terminal puzzle

Use **Patch archive mirror** at the workshop repair bench. The posted procedure is:

1. Isolate the actuator link.
2. Copy the read-only mirror.
3. Verify the copied checksum.

Each visit performs one stage. Leaving or saving preserves a correct partial sequence. Unsafe operations reset the sandbox; they do not damage characters, equipment or inventory. Hints and retries are free. Solving the terminal pays **80 Credits and 1 Energy Drink once** and preserves the workshop maintenance record. You can solve it before accepting Splice's job.

There is no typing timer, live implant connection, arbitrary code execution or new combat dependency. If reward inventory or Credits are capped, the repair stipend remains available at the solved terminal.

### A18: Workers Memory archive

Accept Splice's job, then collect three authorized copies in any order:

| Copy | Source |
|---|---|
| Workshop maintenance record | Solve the Shared Workshop sandbox terminal. A previous solve qualifies. |
| Public canteen safety strip | Use the new copy option at the Last Shift Canteen memorial board. |
| SLF reuse permission | Ask firmware author Inez in the SLF break room. |

The SLF's existing entry requirements remain: inspect the three vending memory labels in Timbuc, Timbuc2 and the B.M.N.E.C. frontage, then speak to Pip at Timbuc's service hatch. Either later vending-policy outcome is compatible; the archive does not change it.

Return to Splice. Choose a local public safety archive or crew-only reference copies, or postpone the decision. Both completed outcomes pay **180 Credits and 1 Panacea once** and earn the same standing point. They copy no patient memories, missing-worker names or private family records. The memorial's existing public/private decision remains intact.

Progress and exact source reminders are available from Splice. Full reward inventory or a Credits cap leaves all records and the publication decision pending.

### A23: sorting practice

The station posts the rules: bare clean metal goes to **Metal**, unpowered circuit boards to **Electronics**, and biologically coated material to **Biohazard**. Three sealed training crates must be classified correctly in one run.

Mistakes stop the run with the correct classification explained; leaving is always available. There is no entry fee, disease exposure, item consumption or damage. The first perfect run earns **150 Credits and 1 Green Herb** and a standing point. If the reward cannot fit, claim it later without repeating the run. Further practice is free and awards no additional rewards or standing.

Technical allocation: switches194–202, variables51–53 and manual common event10. Variable51 also occurs in legacy Golden Gear events; see [roadmap B01](ROADMAP.md#repair-priorities).


## The Perfect Fit

After the original SEAM-3000 hand-in reward, visit **Pants-O-Rama in Timbuc2** and choose **Inspect fitting-room projection**. Buying safe clothing and leaving keep their original menu positions and behavior. Legacy researcher completions are accepted; no second SEAM fight is required.

Armatek's old showroom claims that its trousers fit perfectly because the sales projection shrinks the customer's reflection. Inspect two fixed, connected layouts: **Original Measure** and **Sales Reflection**. This is an optional local aftermath of the Burlap Pants Conspiracy, not another dimension replacing the main story. Actual bodies, outfits, equipment, status conditions and campaign geography are unchanged.

### Puzzle route

1. Enter the warm showroom. Read the **Original seam tape**, the left red fixture: **FOUR, ONE, THREE** in the maker's original left-to-right orientation.
2. Use the central crystal to compare the recorded blue layout. Read the **Mirror maintenance note**, the right red fixture. The image reverses left/right; calibration wiring retains the original orientation.
3. Use the north calibration fixture in either room. Set **Left: four stitches → Centre: one stitch → Right: three stitches**. Both records are required.
4. Choose **Disconnect the sales pitch** or **Keep an opt-in demonstration**. The result is recorded in the shop response, control fixture and Completion Log. If disconnected, the other layout remains an explicitly opened archive; the crystal cannot restart the sales pitch.
5. Use either room's **green south return station**. It always exits to clear floor outside Pants-O-Rama, even with no clue or a partial puzzle. Return to the shop inspection option for **150 Credits and 1 Panacea**, once.

The clue records and solved calibration survive saves and leaving. Wrong counts commit nothing, cost nothing and preserve both records. You can stop adjusting or postpone the policy choice. If the wallet or Panacea stack is full, the entire reward waits; no partial payment or duplicated reward is issued. Both policies earn the same reward.

### Engine scope

Maps249–250 are authored layouts with different palette/floor arrangements and mirrored spokesperson positions. They use existing tiles and character art; there is no map regeneration, screen inversion, arbitrary physics rewrite, forced clothing, boss, combat, plugin or real operating-system effect. All fixtures have tested floor approaches and both room transfers use checked landing tiles.

Switches259–265 track accepted inspection, original tape, maintenance note, calibration solved, reward claimed, opt-in policy and resolution recorded. No new item, actor, variable or skill is created. The original SEAM animation, encounter, module/researcher payoff, clothing inventory and rewards remain separate.


## Local Completion Log

Open **Completion Log** from the main menu. It is available immediately on new and existing saves. Use Left/Right to select a category, OK to browse entries, OK again to scroll details, and Cancel to step back. Up/Down and Page keys scroll the list or detail pane.

The log covers **38 implemented optional activities**:

- **25 projects:** the three original expanded dungeon investigations, six maze recovery quests, Clown Court, Vending Machine Uprising, Workers Memory archive, archive sandbox terminal and sorting practice, Zack's Weight Bearing repair, Jen's Without a Badge care case, Zed's Bench Warranty tests Pink's A Thought of Her Own rehearsal, Black's A Fixed Point, Blue's Stand Down, Niles's Nobody Rents My Fuse, Jack's Passengers Are Not Freight and Dick's Nothing Worth Stealing and The Perfect Fit showroom inspection, plus MAX-E-MUM’s No Pain, No Subscription gym inspection.
- **4 collections:** six-part recycling, joke-card/cookbook payoff, the machine letter delivery and the Burlap researcher hand-in.
- **9 encounters/trials:** the first Collective credential, Repossessor, six custodian victories and the Underwriter regional encounter.

Each entry shows its status, progress, location and route hint. Long names wrap in the list and long descriptions scroll. The total counts these tracked activities; it is not a percentage of the whole campaign or a claim that unbuilt content is playable.

### What counts as complete?

Existing payment, verdict, delivery, credential and victory flags establish completion. Recovered evidence or a passed challenge with an unclaimed reward is shown as **Reward pending** where the existing events distinguish those states.

Consumed recycling parts and a delivered letter stay complete after their exchange/delivery. Joke-card progress also shows cards currently carried. Buying a burlap garment alone does not complete the researcher quest; either canonical or honored legacy researcher completion flag qualifies. Public/private archive and memorial choices and both vending-policy outcomes remain valid.

The log does not infer historical clinic visits, calibrations, weapon ownership or similar achievements from items that can be sold or returned. Those activities have no suitable permanent completion record. It also does not count future companion arcs, cosmetic variants, castle traversal or the unbuilt final pair.

The gym inspection is complete when both dummy checks are verified and MAX records the result. Accepting his separate recruitment invitation is optional and does not alter that completion.

### Compatibility

`ME_CompletionLog.js` reads current save data without adding fields, awarding items, changing flags, starting quests or opening gates. It refreshes when reopened and needs no migration. Opening is refused during battle. It runs after `ME_FieldGuide` and preserves that menu command and its clinic/Key Item entry points.

This is a focused native menu plugin, separate from the old imported QuestJournal descriptions. It adds no Steam/backend integration, online achievements, reward thresholds or arbitrary debug commands. The story, boss stack and database assets are unchanged.

Native previews: [Rivet local projects](../art/local-projects/preview.html), [Perfect Fit](../art/illusion-room/preview.html), [Completion Log](../art/completion-log/preview.html).
