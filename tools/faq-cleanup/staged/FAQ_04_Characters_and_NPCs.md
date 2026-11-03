# MegaEarth 2049 — Characters

Jump to: [Chapter index](#companion-chapters) · [Zack](#zack-weight-bearing) · [Jen](#jen-without-a-badge) · [Zed](#zed-bench-warranty) · [Pink](#pink-a-thought-of-her-own) · [Black](#black-a-fixed-point) · [Blue](#blue-stand-down) · [Niles](#niles-nobody-rents-my-fuse) · [Jack](#jack-passengers-are-not-freight) · [Dick](#dick-nothing-worth-stealing) · [MAX-E-MUM](#max-e-mum)

## Which actors are defined?

| Actor IDs | Names | Current class |
|---|---|---|
| 1 | Rex | Hacker |
| 2 | Jen | Priest |
| 3 | Zack | Construction Worker |
| 4 | Zed | Clown |
| 5–7 | Black, Blue, Pink Ninja | Ninja |
| 8 | Niles | Punk |
| 9 | Jack | Smuggler |
| 10 | Dick | Thief |
| 11–12 | A.S.P. records | Hacker |
| 13 | MAX-E-MUM | Maintenance Coach |

Zed's mod-doctor story role does not change his current database class. Duplicate A.S.P. actor records are not evidence of two separately recruitable companions. New games now start with Rex, Zack and Zed only.

## How are Jen and Pink Ninja recruited?

Jen has a recruitment event in Map057/event2 gated by switch9; it adds actor2. Pink Ninja has a recruitment branch in troop15 which adds actor7 when the troop event condition is reached and she is not already in the party. The old automatic-alley recruitment story should not be used as a walkthrough. End-to-end progression still needs campaign testing.

## How do the other existing companions join?

Black and Blue offer explicit invitations at the Dojo after the first credential. Niles is in Timbuc, Jack is on the Marcus Garvey2.0 bridge, and Dick is at the Internet Cafe. Choose Invite, then Join our crew; use Formation if they enter reserves. Their chapter acceptance and tasks require them conscious in the walking party. All nine original companions now have one bounded chapter; see [the chapter index](FAQ_04_Characters_and_NPCs.md#companion-chapters). Invitations never reset existing actor state.

## Are all named story NPCs available companions?

No. MAX-E-MUM is now recruitable through the optional Iron Circuits inspection in Timbuc; see [location and abilities](FAQ_04_Characters_and_NPCs.md#max-e-mum). Captain Calamari, The Narrator and other proposed companions still have no recruitable actor records. Their story potential remains future work.

## Are romance, jealousy and global reputation implemented?

A general relationship/reputation system was not found in the current named variables, active plugins or searched event commands. Individual authored choices are not proof of that larger system. A [Rivet crew standing prototype](FAQ_06_Quests_and_Storylines.md#rivet-local-projects) now counts three specific local deeds and offers10% off Beryl's hardware purchases at2/3. It does not create a general relationship system, rival romances, faction bounty hunters or reputation-driven endings.

## Can NPC deaths be reversed by cloning or retcons?

There is no verified universal NPC death/replacement/resurrection system. Such outcomes would need explicit events for specific characters. Ordinary actor Knockout/revival mechanics are a different system.

## Who is the final boss?

The final pair has not been fixed as playable content. Preserve the existing A.S.P./Necklace story and [confirmed finale route](../docs/story/STORY_PROGRESSION.md); the imported list of unrelated romance and developer bosses is not an authoritative ending design.

Evidence: `data/Actors.json`, `data/Classes.json`, `data/System.json`, `data/Map057.json` event2, `data/Troops.json` troop15; event-search evidence in `tools/faq-audit/event-evidence.json`.


## Companion chapters

A15 now supplies **one playable personal chapter for each existing companion actor2–10**. This finishes the backlog item's bounded companion-story additions; it does not finish each character's entire lifetime arc or the main story. Rex is the protagonist. The two A.S.P. actor records are antagonist assets, not recruits. MAX-E-MUM is the separate, implemented A26 companion below; other proposed companions remain future work.

| Companion | Chapter and starting point | Requirement / reward |
|---|---|---|
| Zack | [Weight Bearing](FAQ_04_Characters_and_NPCs.md#zack-weight-bearing), Rivet community welder | Conscious walking member;200 personal EXP, finite repair reward and an inspection inscription |
| Jen | [Without a Badge](FAQ_04_Characters_and_NPCs.md#jen-without-a-badge), Orla on B.M.N.E.C. Floor2 | Existing recruitment, conscious walking member;200 personal EXP, patient care and volunteer kit |
| Zed | [Bench Warranty](FAQ_04_Characters_and_NPCs.md#zed-bench-warranty), Mod Center counter | Conscious walking member;200 personal EXP and one calibration-fee waiver |
| Pink | [A Thought of Her Own](FAQ_04_Characters_and_NPCs.md#pink-a-thought-of-her-own), Collective hall steward | Existing recruitment and first credential;200 personal EXP and Own Voice |
| Black | **A Fixed Point**, Black at the Collective hall | First credential; explicit invitation;200 personal EXP and 1 Energy Drink |
| Blue | **Stand Down**, practice instructor → Blue: Stand Down | First credential; explicit invitation;200 personal EXP and 1 Panacea |
| Niles | **Nobody Rents My Fuse**, Niles in Timbuc near Pip | Explicit invitation;200 personal EXP and 75 Credits |
| Jack | **Passengers Are Not Freight**, Jack on the Marcus Garvey2.0 bridge | Reach the existing ship and explicitly invite him;200 personal EXP and 1 Pathogen Purge |
| Dick | **Nothing Worth Stealing**, Dick at the Internet Cafe | Explicit invitation;200 personal EXP and 100 Credits |

### Invitations and party formation

Black, Blue, Niles, Jack and Dick previously had actor/art records but no live recruitment events. Their contacts now offer **Invite [name]** separately from **Discuss [chapter]**. The invitation can be declined. It adds only that existing actor, never initializes or resets an existing actor's level, equipment, HP or conditions, and does not alter the starting party `[1,3,4]`.

With four walking members, a recruit joins reserves. Use **Formation** in the menu to move them into the walking party. Acceptance, unfinished tasks, the final decision and reward claim require the relevant companion conscious in the walking party. A completed task remains readable after they leave.


## Zack: Weight Bearing

Speak to the **community welder in Rivet Commons** with **Zack in the walking party**, then choose **Zack: Weight Bearing**. His existing joke about Zack teaching the crew to brace roofs becomes the hook for reinforcing the existing west first-aid building, recognizable by its medical cross.

The story builds on Zack's construction background and the family he lost to Armatek's demolition. It does not reverse that loss, solve his whole character arc or change the beanstalk/castle storyline. This was the first completed companion side story. A15 now has one bounded chapter for each existing companion; see [the complete index](FAQ_04_Characters_and_NPCs.md#companion-chapters).

### Work order

1. Accept the repair shift at the welder. Declining leaves it available.
2. Ask **Socket in the Shared Workshop** for the free load sheet. Choose the Zack option; Socket's original prosthetic recall investigation remains a separate service.
3. Obtain a brace through either route:
   - **Free:** inspect the marked clean return-stock cache near the Underworks entrance and stage the brace for the crew. The service hatch is open independently of the organ-ledger investigation. No disease roll, boss or inventory sacrifice is involved.
   - **Paid:** ask Socket to stage a precut brace for **80 Credits**, with an explicit purchase confirmation. An already staged brace cannot be charged again.
4. Return to the welder with Zack in the walking party. Choose to credit the volunteer crew on the inspection label or record the repair without names. You may postpone this decision.

Both inscriptions finish the repair and award **100 Credits,1 Green Herb and 200 EXP to Zack only**. The paid material route retains its80-Credit cost. No weapon or equipped gear is consumed. The local inspection indicator changes from red to green; its text reflects the chosen inscription. Map geometry is unchanged—the indicator records the crew's work rather than adding a new building.

The reward checks both item capacity and maximum Credits before committing the inscription, completion or EXP. If the reward cannot fit, the crew keeps the materials staged. Partial progress and the final outcome survive saves; revisiting does not pay again. Missing or reserve-only Zack cannot accept or finish the shift, and the quest never recruits, removes or replaces him.

### Existing content preserved

- Welder: **Neighborhood / joke card** retains the prior conversation and joke-card source.
- Socket: **Prosthetic recall investigation** retains all three original event pages, clues,350-Credit payment and completed state.
- Underworks meter, water, billing, ledger and disease caches remain independent.
- Existing memorial privacy, vending policy, Rivet standing and main-story flags remain unchanged.
- Completion Log now includes **Weight Bearing: Zack** among the tracked activities, with partial, reward-pending and completed states.


## Jen: Without a Badge

Find **Orla on B.M.N.E.C. outpatient Floor 2**, near the desk, with **Jen conscious and in the walking party**. The quest follows Jen's established history: she left OmniCorp security and now helps people as a medic. Orla's absurd throat implant coughs up claim forms while a security-linked billing rule blocks local care. Having a body is explicitly treated as a pre-existing condition.

This is A15's second completed companion chapter, after Zack's Weight Bearing. A15 now covers all nine original companions; see [the complete index](FAQ_04_Characters_and_NPCs.md#companion-chapters). It does not recruit Jen or alter her original recruitment, the Necklace, A.S.P. or the castle/finale route.

### Route

1. Accept Orla's case. Ask what she permits and record her **limited consent**: local treatment notes, no implant-memory dump or security feed. Asking for more is refused safely and can be retried.
2. Choose either permit route:
   - **Reviewed permit:** take the existing lift to Floor 3. Ask the senior consent analyst for Jen's treatment-only review. In the posted preview, choose **Treatment notes only**, then **Offline clinic chart**. Wrong previews transmit nothing and can be retried.
   - **Civilian exemption:** return to Floor 1 intake, choose **Jen: Orla care case**, then request the civilian exemption. Jen signs as a civilian medic rather than using her former corporate badge. Confirm or postpone the request.
3. At Floor 1 intake, clear Orla's **offline care slot**. This needs the valid permit and consent; neither route costs money or a donated medicine.
4. Return to Orla with Jen. Reconfirm care and choose whether Orla keeps the obsolete security-denial stub as proof or has it shredded. Both outcomes keep her authorized chart local and provide the same reward.

The clinic treats Orla and **Jen gains200 EXP once**. A volunteer kit provides **1 Pathogen Purge once**. If the party already carries the maximum Purges, care and EXP still happen immediately. The kit waits with Orla; claim it later after making space, even if Jen has left the walking party. Repeated visits do not replay treatment or EXP.

The Completion Log distinguishes **care already provided / kit pending** from the claimed reward. This chapter is complete in the log after the kit is collected; Orla's care does not depend on claiming it.

### Existing systems retained

- Original intake calibration and Field Guide choices remain at their existing indices. Leave/cancel still exits safely.
- The senior analyst retains the original consent-form conversation.
- Existing lifts connect the same three floors. No new room, locked route or map geometry is introduced.
- Party HP/MP, states and routine paid Recovery are unaffected. This is a named NPC's local story outcome, not free party healing or a new universal medical system.
- Patient identity uses the same sprite before and after care, with a different facing and follow-up dialogue. No art or animation sheet was repacked.


## Zed: Bench Warranty

Visit the **Mod Center counter** with **Zed conscious in the walking party** and choose **Zed: Bench Warranty**. Zed is testing a Vitalix sample arm whose warranty software tries to repossess his tools. The isolated rig is in the same room.

This builds on his established experimental-mod business and ethically flexible rivalry with the MegaCorps. It does not change his current Clown database class, recruitment, implant traits or main-story role. A15 now has one chapter for each existing companion; see [the complete index](FAQ_04_Characters_and_NPCs.md#companion-chapters).

### The three tests

The bench posts each rule before asking for a response:

1. Emergency shutdown cannot require payment: choose **Physical cutoff**.
2. A removed module cannot keep running tasks: choose **Clear detached module task**.
3. The owner retains control of their joint: choose **Return local joint control**.

Leaving preserves passed tests, including across saves. A wrong response resets the three-test rig. It costs no money and changes no actual patient, implant, equipment or party condition. No timer or battle is involved.

Completing all three tests awards **200 EXP to Zed only** and **one calibration-fee waiver**. The bench indicator turns green. Repeating or revisiting cannot award more EXP or another waiver.

### Using the earned waiver

Redeem it at any existing prototype-calibration counter: B.M.N.E.C. intake, Dorlund triage, the D Town technician or the Mod Center.

- It covers **one successful calibration fee** for Disco Implant, Third Eye Mod or Experimental Neural Enhancer. Their standard fees remain100/150/180 Credits.
- You must supply the corresponding prototype. Buying one still costs500 Credits; the waiver does not cover that purchase.
- The final native confirmation explicitly displays your actual fee: **0 Credits** while the waiver is available, otherwise the standard amount.
- Cancelling, lacking a prototype, already owning/equipping the module, buying a prototype or returning an unequipped module does not spend the waiver.
- Successful free calibration consumes the prototype and the waiver once. Returning the module gives back the prototype, not Credits or a replacement waiver. A later calibration uses the standard fee.
- The waiver belongs to the party once earned; the clinic's normal calibration prerequisites still apply. The Field Guide and Completion Log show whether it remains available or has been used.

Routine Recovery prices, prototype purchase/return rules, equipped-module protection and actual implant effects remain intact. The Completion Log tracks 38 optional activities; redeeming the waiver does not undo this chapter's completion.


## Pink: A Thought of Her Own

After recruiting Pink and earning the **first Collective credential**, bring her **conscious in the walking party** to the **Collective Dojo hall steward**. Choose **Pink: A Thought of Her Own**.

Pink's former NeuraTech mind-control work is the story anchor: she recognizes a learned corporate directive and wants a technique that restores the listener's choice. This is a local rehearsal, not an explanation or resolution of A.S.P., the Compiler's identity, the Necklace or the floating-castle ending.

### Two routes

- **Care ward, isolated voice-trace console:** identify the source as **NeuraTech behavior controller**, then answer **I can leave**. The relevant distinction is posted before each choice. Wrong answers reset only these two stages; leaving and saving retain correct progress. No patient's memories or conditions are changed.
- **Practice room instructor, Pink: directive rehearsal:** face one **Directive Echo**, using established animated ninja training art. It uses ordinary attacks and can attempt **Directive Loop**, a 45% native Confusion application, on turn2 and every third turn afterward. Escape and defeat are safe; every outcome restores the party. Only victory passes the rehearsal. This separate fight grants no loot, Credits or battle EXP and never passes or resets the original first trial.

Return to the hall steward with Pink conscious in the walking party after either route. She receives **200 personal EXP** and learns **Own Voice** once. It costs **4 MP**, targets **one ally in battle**, and clears **Confusion (state8)**. It does not restore HP or remove other conditions. The ability uses the existing Neural Reboot effect; Directive Loop uses the existing Confusion effect.

The Completion Log shows accepted/progress/ready/claimed status and the completed rehearsal route.


<a id="black-a-fixed-point"></a>

## Black — A Fixed Point

At the Dojo hall, invite Black and accept the chapter. Use the **Anchor reference rig** in the Silent Packet Run: **Fix the doorway reference**. Then use the **Isolated Matrix anchor** at the public Matrix node: **Keep the local reference**. Return to Black and choose a shared Dojo reference or a crew-only reference. Both are local calibration records; neither rewrites physical coordinates or resolves the Compiler's identity.


<a id="blue-stand-down"></a>

## Blue — Stand Down

The practice instructor's original practice and Pink-rehearsal options retain their behavior. Choose **Blue: Stand Down**, invite Blue and accept. At the **Rules of engagement board** in the same practice room choose **Hold fire and open communication**. At the **Care-ward safety board** choose **Keep the exit open**. Return to Blue to post a standing order or retain a crew order. This builds on Blue's former OmniCorp role without changing the original first-trial win or patient-care flags. No new battle is required.


<a id="niles-nobody-rents-my-fuse"></a>

## Niles — Nobody Rents My Fuse

Invite Niles in Timbuc and accept his cache job. In the early **Timbuc Cellar**, inspect the **Dead timer casing** and **Remove the dummy battery**. Back in Timbuc, use **Niles cache relay** and **Isolate the cache trigger**. Return to Niles to credit the neighbourhood crew or leave the inspection unmarked. The exercise uses a dead casing and a wiring plan: it detonates nothing, grants no Smelly Keys and changes no punk boss or residential alarm event.


<a id="jack-passengers-are-not-freight"></a>

## Jack — Passengers Are Not Freight

Jack's bridge contact makes his established captain role and recruitment playable aboard the existing ship; it does not award the ship or bypass its transponder/navigation routes. Invite him and accept. At the engineering **Cargo isolation panel**, **Separate the sealed sample crate**. At the sickbay **release desk**, **Release bay clearance only**. Return to Jack to retain a sealed route copy or destroy the spare. Passenger identities remain offline in both cases. Jen and Jack's old biological-shipment history is the hook; no new disease is inflicted.


<a id="dick-nothing-worth-stealing"></a>

## Dick — Nothing Worth Stealing

Invite Dick at the Internet Cafe and accept his decoy heist. In the Matrix, use **Decoy index lock** and **Copy the empty decoy index**. At the Cafe **Owner-access test rig**, **Verify owner access still works**. Return to Dick to share his method with the crew or keep it private. Only the empty sandbox index is copied; Workers Memory archive permissions and the public Matrix connection are unchanged.


<a id="five-chapter-persistence"></a>

## Shared rewards and persistence for Black, Blue, Niles, Jack and Dick

All five routes have posted rules, free retries and no timer. The second task requires the first. A wrong second answer keeps the first task; leaving and saving preserve progress. A final decision may be postponed. Either resolution earns the same listed reward and changes the contact's settled response and Completion Log hint.

If the item stack or Credit wallet is full, the resolution persists while the **entire payment** waits. Return with room and the companion conscious in the walking party. The one-time flag and 200 personal EXP are paid only with the reward; repeated invitations, revisits and save/load cannot duplicate payment.


<a id="max-e-mum"></a>

## MAX-E-MUM: No Pain, No Subscription

MAX is the existing story’s cleaning robot who accidentally downloaded bodybuilding forums and runs Timbuc’s Iron Circuits. He is now an optional recruit with his own class, portrait, walking sheet and native battle motions.

### Recruitment

Find the **Iron Circuits public lift** in southeast Timbuc (Map010,14,10). Enter the basement gym for free. Talk to MAX, choose **Inspect the gym**, and check the two clearly labelled dummy rigs:

1. Left: test the emergency stop with the subscription off.
2. Right: keep the dummy telemetry record on local gym storage.
3. Return to MAX. The inspection is recorded; choose **Join our crew** to recruit him, or defer without penalty.

Wrong choices and cancellation spend nothing and change no real patient data. Either check may be done first. Completed checks survive saves. The south lift always returns to Timbuc floor(14,11), including before accepting the inspection.

Recruitment costs nothing and requires no arbitrary stat threshold. MAX joins at level8. If four actors already travel, he enters reserves: use **Formation** to bring him forward. Repeated invitations never reset his EXP, health, equipment or states. The gym becomes self-service while he travels; its diagnostic stations and exit remain available.

### Battle role

Maintenance Coach is a separate class with moderate physical stats, strong DEF and lower AGI. MAX starts with Spiked Gloves, can equip that weapon type and Clothing armor, and has the usual Attack, Guard, Ability and Item commands. He has normal actor KO/revival behavior and no special disease immunity.

| Ability | Cost | Effect |
|---|---|---|
| Spotter Protocol |6 TP | One ally: native DEF buff for 4 turns. Each buff level is +25%; native two-level stacking applies. |
| Active Recovery |8 TP | One ally: existing Nanite Repair, restoring4% max HP each turn for 3 turns; clears at battle end. No instant heal, revival or disease cure. |
| Deload Slam |6 AP | One enemy: one physical hit, `max(0,3×ATK−2×DEF)`,10% variance, ordinary hit/critical rules. No stun. |

All three are battle-only. DEF buffs expire through native turn handling; Nanite Repair uses the existing removal/battle-end rules. They reuse the appropriate existing support/physical animations and icons; there are no new status records or projectile plugins.

### Scope and continuity

This implements one bounded new companion, rather than the imported replacement/death/romance ecosystem. Captain Calamari, The Narrator and other proposed companions are not newly recruitable.

MAX’s authored Floating Mansion security-workout role remains future story material. The gym invitation grants no castle access, Necklace piece, Golden Gear, engine, A.S.P. revelation or ending. Future mansion scenes should account for actor13 already travelling or staying at the gym, rather than creating a duplicate MAX or withholding the campaign route for declining an optional companion.

### Saves and art

Actor13, class12, skills280–282, Map251 and switches266–269 are appended. Existing actor/class/skill records and starting party[1,3,4] remain unchanged. Old saves instantiate MAX lazily when needed; no automatic recruitment or migration runs. The Completion Log gains the inspection project (38 total activities,25 projects), independently of whether MAX joins.

[Animated art and native screenshots](../art/max-e-mum/preview.html) · [Build and verification evidence](../tools/max-e-mum/README.md)

Native companion previews: [Zack](../art/zack-story/preview.html), [Jen](../art/jen-story/preview.html), [Zed](../art/zed-story/preview.html), [Pink](../art/pink-story/preview.html), [Black/Blue/Niles/Jack/Dick](../art/companions-final/preview.html).
