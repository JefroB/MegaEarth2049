# MegaEarth2049 — Unfinished-work roadmap

Reviewed November 2, 2026. This is the single list of retained unfinished or unstarted work after bounded A01–A26. It is not a walkthrough or implementation promise. Completed A-identifiers are indexed in [FAQ08](FAQ_08_Technical_Issues.md#completed-additions-register); current routes are indexed in [FAQ01](FAQ_01_Getting_Started.md).

**Status:** Unresolved = an observed conflict needing reconciliation; Partial = authored maps/systems/content exist, but the listed outcome is unfinished; Unstarted = the retained proposal has no verified implementation. Effort is relative; inspect live IDs before allocating anything. B-identifiers are new roadmap tasks; the six legacy R repairs are already closed.

<a id="repair-priorities"></a>

## Repair and campaign priorities

| ID | Status / priority | Work and foundation | Done when | Effort |
|---|---|---|---|---|
|B01|Unresolved / high|Reconcile duplicate legacy scientist/dealer/Golden Gear contacts and their variable51 use, which collides with Rivet standing. Placement fixes did not repair this logic.|One canonical branch per contact, legacy progress honored, no repeated rewards, and Gear/standing tracked independently; engine/castle conditions retained and tested.|Medium|
|B02|Partial / high|Campaign route audit across early quests, Necklace/components, all ship destinations and the return to MegaEarth. Current tests cover focused fixtures.|Reproducible new-game and representative old-save traversal proves prerequisites, transfers, required items, failure/retry and once-only rewards; remaining faults become explicit repairs.|Large|
|B03|Partial / high|Integrate floating-castle entry/traversal on existing Mansion maps038/040/091 and associated rooms, preserving Necklace, Golden Gear/Completed Engine and authored approach requirements.|Return to Map001 leads through the required entrance and floors without a service-vestibule shortcut; MAX’s security workout handles recruited and gym-resident cases without requiring optional recruitment.|Large|
|B04|Unstarted encounter sequence / high|Implement the confirmed two final bosses back to back after castle traversal. Main-boss infrastructure and A.S.P. assets/story exist; final identities, recovery/checkpoint rules and handoff are undecided.|Two distinct encounters, agreed recovery/retry/save policy, tested callbacks and outcomes, complete art/phase mechanics and story resolution afterward.|Large|
|B05|Partial authored story / high|Reconcile creator revelations, Memory Labyrinth, A.S.P. defenses and ending choices with the return/castle/final-pair route.|Playable events follow existing motives and verified gates; the Compiler claim does not silently overwrite creator canon; ending choices/counts are documented after implementation.|Large|
|B06|Partial plans / medium|Remaining regional main-boss payoffs where existing story needs them. Underwriter is Dorlund’s regional boss; Planet Ork’s authored fire-breathing scorpion Necklace guardian remains a distinct integration task.|Each selected encounter has a reconciled story/location, complete art/animations/phases, reachable route and tested reward/exit; regional victory never substitutes for the final pair.|Large|

## Retained feature and story additions

| ID | Status | Bounded next scope | Done when / constraint | Effort |
|---|---|---|---|---|
|B07|Partial|Continue Collective and individual ninja missions beyond the first trial and existing Black/Blue invitations.|One mission at a time, lore reconciled with creator/finale material, complete actor/art/skill/recruitment packages for any additional colour. Existing invitations are already done.|Medium–large|
|B08|Unstarted recruitable actors|Captain Calamari, The Narrator or other established proposed companions.|Choose an existing story anchor; build complete art, class/abilities, explicit invitation, reserves/save behavior and bounded quest. Preserve Calamari’s authored bar/security roles and Narrator’s implant ambiguity. MAX is already implemented.|Large per companion|
|B09|Partial|Later chapters for existing companions.|Extend the existing nine local chapters without undoing outcomes, replacing motivations or claiming to resolve entire arcs. Each chapter needs concrete prerequisites, reward/persistence and failure/exit checks.|Medium per chapter|
|B10|Unstarted runtime UI|A real quest journal/tracker, if desired.|Track actual quest states and pending rewards with old-save and native text/scrolling checks. The imported QuestJournal file is descriptions only; the 38-entry Completion Log already works and must not be replaced by invented records.|Medium–large|
|B11|Partial / unstarted branches|Wasteland Historians beyond the three-record Workers Memory archive; Wasteland Radio DJ and food-related story chains.|Reconcile each source quest with current events, then implement a bounded route/payoff. The cookbook is currently a readable reward, not a crafting system.|Medium–large|
|B12|Unstarted expansion|Burlap factory/truck-pursuit/reprogramming branches from older outlines.|Extend package → SEAM → researcher without invalidating old completions or Perfect Fit. Choose implementable maps/events and explicit new outcomes; no freeform fabric physics.|Large|
|B13|Unstarted compatibility integration|Enable Yanfly Battle Engine Core/action-sequence packs when a concrete new attack needs them.|Prove normal/ally/multi-target actions, misses, enemy turns, custom minibosses, main-boss phases/defeat and callbacks; resolve prior null-slot/stalled-wait risks. Native animation/custom bosses already work, so activation is not required for all polish.|Large|
|B14|Unstarted optional extras|Finger Guns; a ninja cookbook collectible; an authored cat companion or pet interaction.|Select separately and implement explicit triggers, effects/art and save-safe rewards. No existing hidden upgrade tree, arbitrary pet ecosystem or permanent stat exploit is claimed.|Small–medium per item|
|B15|Unfinished unused drafts|Review Constipation12, Fever37, Sickness38 and Protection43 before choosing any to finish.|Check actual callers/intent, preserve IDs, deliberately add applications/removers and update the Guide only if public mechanics are implemented. Scripted/internal placeholders are not automatically defects.|Small per state|

## Verification alongside future work

Use [current technical evidence](FAQ_08_Technical_Issues.md#feature-verification-and-art-evidence) as the baseline. New work needs native interaction/action checks, save persistence, reward/retry/exit guards, complete registered art, clear-floor placement and relevant regressions. Focused fixtures do not replace campaign balance, packaging/missing-asset checks or release performance measurements; those remain part of campaign/release validation under B02.

## Scope that is not a pending promise

Fabricated modding/community ecosystems stay removed. No eight-player online world, universal NPC/romance/death-replacement simulation, daily procedural planet regeneration, unrestricted anatomy/cloth physics, arbitrary OS changes or executable developer-console rewards are queued here. Unsupported800-quest totals, exact rare encounter odds and invented ending counts remain removed. Modest authored variants can be proposed separately; removing an unrealistic promise does not make it a mandatory future feature.

Story authority: [confirmed progression](../docs/story/STORY_PROGRESSION.md), [existing story](../docs/story/MegaEarth2049_Story.md), affected live events and the user’s explicit decisions. Technical source: [map audit](../tools/map-placement-audit/audit.json), [repair inventory](../tools/backlog-repairs/empty-state-audit.json), active plugins and source manifests linked from the FAQs.
