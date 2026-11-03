"""Stage consolidated FAQs from the immutable pre-cleanup snapshot."""
from pathlib import Path
import json,re,zipfile
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent;F=ROOT/'GameFAQs'
with zipfile.ZipFile(OUT/'before.zip')as z:D={Path(n).name:z.read(n).decode('utf-8-sig').replace('\r\n','\n').replace('\r','\n')for n in z.namelist()}
rename={'FAQ_11_Disease_System.md':'FAQ_09_Disease_System.md','FAQ_12_Ninja_System.md':'FAQ_10_Ninja_System.md','FAQ_13_Body_Modification_System.md':'FAQ_11_Body_Modification_System.md'}
targets={
'README.md':'FAQ_01_Getting_Started.md','ADDITIONS_BACKLOG.md':'ROADMAP.md',
'CURRENT_IMPLEMENTATION_AUDIT.md':'FAQ_08_Technical_Issues.md#documentation-audit-and-current-status',
'BACKLOG_REPAIRS.md':'FAQ_08_Technical_Issues.md#legacy-repair-record',
'MAP_PLACEMENT_AUDIT.md':'FAQ_08_Technical_Issues.md#map-placement-and-passage-audit',
'HIGH_VALUE_ADDITIONS.md':'FAQ_05_Equipment_and_Items.md#fixed-weapon-exchanges-and-remedies',
'BOUNDED_ADDITIONS.md':'FAQ_07_Secrets_and_Easter_Eggs.md#off-clock-collections-and-salvage',
'LOCAL_PROJECTS.md':'FAQ_06_Quests_and_Storylines.md#rivet-local-projects',
'BURLAP_QUEST.md':'FAQ_06_Quests_and_Storylines.md#burlap-pants-conspiracy',
'CLOWN_COURT.md':'FAQ_06_Quests_and_Storylines.md#clown-court',
'VENDING_UPRISING.md':'FAQ_06_Quests_and_Storylines.md#vending-machine-uprising',
'ILLUSION_ROOM.md':'FAQ_06_Quests_and_Storylines.md#the-perfect-fit',
'COMPLETION_LOG.md':'FAQ_06_Quests_and_Storylines.md#local-completion-log',
'COMPANION_CHAPTERS.md':'FAQ_04_Characters_and_NPCs.md#companion-chapters',
'ZACK_STORY.md':'FAQ_04_Characters_and_NPCs.md#zack-weight-bearing',
'JEN_STORY.md':'FAQ_04_Characters_and_NPCs.md#jen-without-a-badge',
'ZED_STORY.md':'FAQ_04_Characters_and_NPCs.md#zed-bench-warranty',
'PINK_STORY.md':'FAQ_04_Characters_and_NPCs.md#pink-a-thought-of-her-own',
'MAX_E_MUM.md':'FAQ_04_Characters_and_NPCs.md#max-e-mum',
'MOD_CLINIC.md':'FAQ_11_Body_Modification_System.md#prototype-mod-clinic',
'COSMETIC_SKINS.md':'FAQ_11_Body_Modification_System.md#chromatic-skin',
'FIELD_GUIDE.md':'FAQ_09_Disease_System.md#body-and-firmware-field-guide',
'HIDDEN_DOJO.md':'FAQ_10_Ninja_System.md#hidden-dojo-first-trial'}
assert set(targets)=={n for n in D if not n.startswith('FAQ_')}
def refs(text,inside=False):
 for old,new in rename.items():text=text.replace(old,new)
 for old,new in targets.items():
  if old=='README.md':
   if not inside:text=text.replace('GameFAQs/README.md','GameFAQs/'+new)
  else:text=text.replace(old,new)
 return text

def trim(name,stop=None):
 s=D[name].split('\n',1)[1].strip()
 return s.split('\n## '+stop,1)[0].rstrip()if stop else s

def section(title,anchor,body):
 body=re.sub(r'^(#{2,5}) ',r'#\1 ',body,flags=re.M)
 auto=re.sub(r'[^\w\- ]','',title.lower()).replace(' ','-')
 prefix='' if auto==anchor else '<a id="'+anchor+'"></a>\n\n'
 return '\n\n'+prefix+'## '+title+'\n\n'+body.strip()+'\n'

def clean_counts(s):
 s=s.replace('**37 optional activities:24 projects,4 collections,9 encounters/trials**','**38 optional activities:25 projects,4 collections,9 encounters/trials**')
 s=s.replace('Its total is now31 tracked optional activities. ','').replace('now tracks37 optional activities','tracks38 optional activities').replace('all37 entries','all38 entries')
 return s
P={rename.get(n,n):s for n,s in D.items()if n.startswith('FAQ_')}
n='FAQ_01_Getting_Started.md';s=P[n].replace('rather than old instructions promising nonexistent clinic upgrades or a fixed list of hundreds of quests.','rather than old instructions promising unsupported unlocks or hundreds of completed quests. Reversible prototype calibration and Rex cosmetics are available at the existing clinics.').replace('Feasible future ideas are explicitly listed in [the additions backlog](ADDITIONS_BACKLOG.md)','Unfinished and unstarted work is explicitly listed in [the roadmap](ROADMAP.md)')
index='''These FAQs consolidate the current guides as of November2,2026. Implemented routes are described here; proposed work belongs in [ROADMAP.md](ROADMAP.md). Source snapshots and test evidence remain under `tools/` and `art/`.

| FAQ | Topic |
|---|---|
|01|[Getting started](FAQ_01_Getting_Started.md)|
|02|[Combat](FAQ_02_Combat_System.md)|
|03|[Locations and spaceship travel](FAQ_03_Locations_Guide.md)|
|04|[Characters, recruitment and companion chapters](FAQ_04_Characters_and_NPCs.md)|
|05|[Equipment, items and exchanges](FAQ_05_Equipment_and_Items.md)|
|06|[Quests, local projects and Completion Log](FAQ_06_Quests_and_Storylines.md)|
|07|[Secrets, salvage and off-clock collections](FAQ_07_Secrets_and_Easter_Eggs.md)|
|08|[Technical help, repair history and verification](FAQ_08_Technical_Issues.md)|
|09|[Diseases, states and Field Guide](FAQ_09_Disease_System.md)|
|10|[Ninjas and Hidden Dojo](FAQ_10_Ninja_System.md)|
|11|[Prototype calibration and cosmetic skin](FAQ_11_Body_Modification_System.md)|
'''
P[n]=s.split('\n',1)[0]+'\n\n'+index+'\n'+s.split('\n',1)[1].lstrip()
n='FAQ_02_Combat_System.md';P[n]=P[n].replace('The two recent batches add 24 temporary states, with application skills, enemy variants, removers and shop remedies. They expire and clear after battle.','States52–75 provide24 temporary ailments, buffs and debuffs. Later additions include Paralysis77, Temporal Stasis78 and Stone Skin79, with application/removal paths and remedies. These additions expire and clear after battle.')
n='FAQ_03_Locations_Guide.md';s=P[n].replace('| Underwriter branch | 238 Executive Liability, 239 Claims Audit Archive |','| Underwriter branch |238 Executive Liability,239 Claims Audit Archive|\n| Underworks service annex |240, optional Third Eye/filter bypass|\n| Clown Court |241–243, connected filing/evidence/hearing rooms|\n| SLF break room |244, through Pip after machine diagnostics|\n| Hidden Dojo |245–248, first Collective trial|\n| Perfect Fit showroom |249–250, paired projection rooms|\n| Iron Circuits |251, optional MAX-E-MUM recruitment gym|')
s+='''\n## How does the Marcus Garvey2.0 work?\n\nIt is the party’s spaceship for travel between planets. Reusable Ship Transponder144 works from the menu on worlds001,028 and039 when owned; it boards the existing bridge Map050 at(7,11). The navigation station retains its authored destinations and berth checks. It does not summon the ship inside a dungeon, grant ownership, bypass castle requirements or repurpose Beanstalk Access switch21. Jack’s bridge invitation does not award the ship. See [Jack’s chapter](FAQ_04_Characters_and_NPCs.md#jack-passengers-are-not-freight).\n''';P[n]=s
n='FAQ_04_Characters_and_NPCs.md';s=P[n];overview=trim('COMPANION_CHAPTERS.md','The five new routes').replace('Proposed new companions remain separate under A26.','MAX-E-MUM is the separate, implemented A26 companion below; other proposed companions remain future work.')
s+=section('Companion chapters','companion-chapters',overview)
for old,title,anchor in [('ZACK_STORY.md','Zack: Weight Bearing','zack-weight-bearing'),('JEN_STORY.md','Jen: Without a Badge','jen-without-a-badge'),('ZED_STORY.md','Zed: Bench Warranty','zed-bench-warranty'),('PINK_STORY.md','Pink: A Thought of Her Own','pink-a-thought-of-her-own')]:
 b=trim(old,'Verification'if old!='PINK_STORY.md'else 'Implementation and verification')
 b=b.replace('The Completion Log now includes **Weight Bearing: Zack** as one of31 tracked activities,','The Completion Log includes **Weight Bearing: Zack**,')
 b=b.replace('It now tracks37 optional activities:24 projects,4 collections and9 encounters. ','')
 s+=section(title,anchor,clean_counts(b))
full=D['COMPANION_CHAPTERS.md'];five=full.split('## The five new routes\n',1)[1].split('\n## Persistence and rewards',1)[0]
for part in re.split(r'\n### ', '\n'+five):
 part=part.strip()
 if not part:continue
 title,body=part.split('\n',1);title=title.removeprefix('### ');key={'Black — A Fixed Point':'black-a-fixed-point','Blue — Stand Down':'blue-stand-down','Niles — Nobody Rents My Fuse':'niles-nobody-rents-my-fuse','Jack — Passengers Are Not Freight':'jack-passengers-are-not-freight','Dick — Nothing Worth Stealing':'dick-nothing-worth-stealing'}[title]
 s+=section(title,key,body)
persist=full.split('## Persistence and rewards\n',1)[1].split('\n## Verification',1)[0].split('The Completion Log now has',1)[0].strip();s+=section('Shared rewards and persistence for Black, Blue, Niles, Jack and Dick','five-chapter-persistence',persist)
s+=section('MAX-E-MUM: No Pain, No Subscription','max-e-mum',trim('MAX_E_MUM.md'));P[n]=clean_counts(s)
n='FAQ_05_Equipment_and_Items.md';s=P[n].split('\n## Implemented additions',1)[0];bullets=[x for x in trim('HIGH_VALUE_ADDITIONS.md').splitlines()if x.startswith('- **')]
equipment='\n\n'.join(x for x in bullets if any(t in x for t in ['**Timbuc Item Shop','**Salvage workshop','**Probably Not Poison']))
s+=section('Fixed weapon exchanges and remedies','fixed-weapon-exchanges-and-remedies',equipment+'\n\nThese recipes use approved weapon animations and retain their corrected scales. See [weapons preview](../art/weapons/preview.html), [diseases](FAQ_09_Disease_System.md) and [ninja techniques](FAQ_10_Ninja_System.md#personal-ninja-techniques).')
s+=section('Clothing and local disguises','local-disguises','''Buy the outfits from **Pants Witness Protection in Rivet Commons**. Wear **Hard Hat50 + Work Boots51**, or **Coolt White Helmet58 + Protective Vest59**, on the same walking party member. Split outfits across two actors or reserve-only wearers do not qualify.

Forewoman Latch, the Newtown reclamation magistrate and the canteen pension auditor have authored reactions. Original services and evidence requirements remain. These repaired Clothing records do not confer quest authority, discounts or automatic victories. Deprogrammed burlap clothing has its own [reward and shop table](FAQ_06_Quests_and_Storylines.md#burlap-pants-conspiracy).''');P[n]=s
n='FAQ_06_Quests_and_Storylines.md';s=P[n].split('\nEvidence:',1)[0];a=s.index('## What remains feasible to add?');b=s.index('## What is the endgame plan?',a)
s=s[:a]+'''## Which optional stories are playable?\n\nClown Court, the Vending Machine Uprising, the first Hidden Dojo trial, the Workers Memory archive, the Perfect Fit aftermath, nine original-companion chapters and MAX-E-MUM’s inspection are implemented within their documented scope. See the walkthroughs below, [companions](FAQ_04_Characters_and_NPCs.md#companion-chapters) and [the Dojo](FAQ_10_Ninja_System.md#hidden-dojo-first-trial). Further stories are tracked in [the roadmap](ROADMAP.md).\n\n'''+s[b:]
for old,title,key,stop in [('BURLAP_QUEST.md','Burlap Pants Conspiracy','burlap-pants-conspiracy','Validation'),('CLOWN_COURT.md','Clown Court','clown-court','Implementation and validation'),('VENDING_UPRISING.md','Vending Machine Uprising','vending-machine-uprising','Verification'),('LOCAL_PROJECTS.md','Rivet local projects','rivet-local-projects','Implementation and evidence'),('ILLUSION_ROOM.md','The Perfect Fit','the-perfect-fit','Verification'),('COMPLETION_LOG.md','Local Completion Log','local-completion-log','Verification')]:
 b=trim(old,stop)
 if old=='BURLAP_QUEST.md':b+='\n\nAfter the original reward, Pants-O-Rama offers [The Perfect Fit](ILLUSION_ROOM.md), a separate projection inspection and payment.'
 if old=='ILLUSION_ROOM.md':b=b.replace('The Completion Log now tracks **37 optional activities:24 projects,4 collections,9 encounters/trials**.','')
 if old=='LOCAL_PROJECTS.md':b+='\n\nTechnical allocation: switches194–202, variables51–53 and manual common event10. Variable51 also occurs in legacy Golden Gear events; see [roadmap B01](ROADMAP.md#repair-priorities).'
 s+=section(title,key,b)
P[n]=s
n='FAQ_07_Secrets_and_Easter_Eggs.md';s=P[n].replace('## What silly secrets could we add?','## Which bounded secrets and collections are playable?');rows=[line for line in D['BOUNDED_ADDITIONS.md'].splitlines()if line.startswith(('| A13:','| A16:','| A19:'))]
s+=section('Off-clock collections and salvage','off-clock-collections-and-salvage','| Activity | Where to find it | Behavior and reward |\n|---|---|---|\n'+'\n'.join(rows)+'\n\nThe three warning caches have explicit refusal/sterilization choices; no automatic contagion is implied. The cookbook is a readable reward, not an implemented crafting system. Read cards, recipes, letter progress and outfit clues through the reusable Off-Clock Scrapbook190. See [Rivet local projects](LOCAL_PROJECTS.md) for sorting and the archive.');P[n]=s
n='FAQ_08_Technical_Issues.md';s=P[n]
s+=section('Documentation audit and current status','documentation-audit-and-current-status','''The November1 imported-FAQ audit covered13 source pages and154 question sections; it was not a campaign playthrough. Fabricated modding/community material was removed. Original wording and the initial database are preserved in [the audit snapshot](../tools/faq-audit/before.zip) and [original section index](../tools/faq-audit/original-sections.json).

The November2 consolidation keeps11 topical FAQs plus one unfinished-work roadmap. It absorbs completed-addition reports and walkthroughs, updates references, and renumbers Disease/Ninja/Body Modification as09/10/11. Pre-consolidation documents and migration evidence are retained under [tools/faq-cleanup](../tools/faq-cleanup/README.md).

Current scope:251 maps, actor13 MAX-E-MUM after the original12 actor records, unchanged starting party[1,3,4], and38 Completion Log activities (25 projects,4 collections,9 encounters/trials). Custom boss controllers and native battle flow are active; installed Yanfly Battle Engine Core/action-sequence packs remain inactive. The enabled QuestJournal file contains descriptions without a working journal UI. Field Guide and Completion Log are separate implemented menus.

A01–A26 are complete only within their documented bounded scope. A15 covers one local chapter for each original companion actor2–10; A26 implements MAX-E-MUM, not every proposed character. Older absence findings about these now-finished features are historical, not current limitations. Move future work into a player FAQ only after its prerequisites, actual route/effects/rewards, exits and persistence are verified.''')
repairs=D['BACKLOG_REPAIRS.md'].split('## Behavior\n',1)[1].split('\n## Validation',1)[0].replace('No application callers exist in native Skills/Items; boss attacks remain unchanged. Adding encounters or named Acme cures remains A01.','The subsequent A01 pass added ordinary application paths and named Acme cures without rewriting existing boss attacks.')
s+=section('Legacy repair record','legacy-repair-record','R01–R06 below describe completed focused repairs. Subsequent additions extend these foundations; they are not open roadmap tasks.\n\n'+repairs+'\n\nThe original repair suite records49 native checks, including actual Pink recruitment through victory. [Evidence](../tools/backlog-repairs/validation.json) · [original snapshot](../tools/backlog-repairs/before.zip).')
placement=trim('MAP_PLACEMENT_AUDIT.md','Separate legacy quest finding');start=placement.index('The audit covers');end=placement.index('## What was wrong')
placement=placement[:start]+'''The initial248-map repair corrected209 shared flags,21 event positions and one landing. Current inventory:251 maps,197 person-event pages at156 coordinates,635 fixed transfers and2148 used decoration/tileset combinations. The latest static scan reports no suspect people/landings or vertical-wall passage errors. The2182-check native report belongs to the preceding250-map audit; separate MAX route tests cover the added gym. These are different evidence layers, not a251-map campaign playthrough.\n\n'''+placement[end:]
s+=section('Map placement and passage audit','map-placement-and-passage-audit',placement)
completed=D['ADDITIONS_BACKLOG.md'].split('## Highest-value additions\n',1)[1].split('\n## Further scope',1)[0].strip()
s+=section('Completed additions register','completed-additions-register','Original A-identifiers are retained for source/test traceability. These are completed scoped additions, not pending roadmap tasks.\n\n'+completed)
evidence=[('Prototype calibration','mod-clinic','validation.json','84 transaction/stat checks;7 counter integration checks'),('Named cures, weapons, ninja techniques and service annex','high-value-additions','validation.json','107 focused checks;27 full actions;8 pharmacy purchases in visual evidence'),('Burlap payoff','burlap-quest','validation.json','39 checks including defeat/retry/victory and hand-in'),('Clown Court','clown-court','validation.json','61 checks and actual case flow'),('Vending uprising','vending-uprising','validation.json','65 checks;12 purchases and town-access checks'),('Field Guide','field-guide','validation.json','43 mechanics/UI checks'),('Collections, states and outfits','bounded-additions','logic-validation.json','159 logic checks;11 full actions and48 atlas cells in companion reports'),('Rivet local projects','local-projects','validation.json','84 checks plus live routes and discounted shop purchase'),('Hidden Dojo','hidden-dojo','validation.json','Native movement, alarm, care and battle outcomes; separate access checks'),('Zack chapter','zack-story','validation.json','76 checks plus free/paid live routes'),('Jen chapter','jen-story','validation.json','78 checks plus clinic walking/consent/care routes'),('Zed chapter','zed-story','validation.json','58 checks including earn/purchase/free-calibration flow'),('Pink chapter','pink-story','validation.json','Both routes, three fight outcomes and full skill actions'),('Other five original companion chapters','companions-final','validation.json','166 checks, invitations and native walking/action routes'),('Perfect Fit','illusion-room','validation.json','49 checks and full walking/policy/reward route'),('Completion Log','completion-log','validation.json','93 model/native UI checks, now38 activities'),('Rex chromatic skins','cosmetic-skins','validation.json','35 state/loading/pixel/clinic checks; three native battles in battle-validation.json'),('MAX-E-MUM','max-e-mum','validation.json','36 recruitment/save/mechanics/walking/Formation checks;6 battle checks,67 runtime art cells and four moving tread directions')]
table='| Feature | Evidence | Verified scope |\n|---|---|---|\n'+'\n'.join('|'+label+'|[Report](../tools/'+folder+'/'+report+') · [tool files](../tools/'+folder+'/)|'+details+'|'for label,folder,report,details in evidence)
s+=section('Feature verification and art evidence','feature-verification-and-art-evidence',table+'''\n\nReports are scoped fixture results, not release-wide guarantees. Preserve manifests, original snapshots, measured crop rectangles and atlas reports with the tools. Generated icon/animation art uses exact runtime-cell review on contrasting backgrounds; do not cure neighbouring fragments by deleting disconnected pieces or cropping through limbs/cables. Mechanical sprite geometry stays registered. The clapping-hands disease icon intentionally remains as a pun. Previews and production files remain under `art/` and `img/`.

The static map audit recorded a separate unresolved Golden Gear duplicate-event/variable51 conflict. It was not repaired by moving contacts onto floor. See [roadmap repair priorities](ROADMAP.md#repair-priorities).''');P[n]=s
n='FAQ_09_Disease_System.md';s=P[n].replace('Other unused drafts and scripted placeholder states are documented in the repair report.','Unused drafts and scripted placeholders are classified in [the repair record](BACKLOG_REPAIRS.md).').replace('A bounded hazardous room, optional diagnosis catalog or explicit NPC reaction is feasible future work.','Marked salvage caches already offer explicit disease risks; the Field Guide supplies the reference catalog. Further authored reactions would need their own implementation.')
combat=D['BOUNDED_ADDITIONS.md'].split('## Combat specifics\n',1)[1].split('\n## Artwork',1)[0];combat='\n'.join(line for line in combat.splitlines()if not line.startswith('- The two outfits'))
s+=section('Paralysis, Temporal Stasis and Stone Skin','traditional-combat-states',combat)
applications='\n\n'.join(x for x in bullets if '**Lake salvage dealer' in x)
s+=section('Disease application sources','disease-application-sources',applications+'\n\nWarning caches110/112/114 separately offer resistance-aware50% exposure to Chrome Rot, Scabies and Influenza. Refusal is safe, sterilization consumes one Pathogen Purge, and a full pack causes no exposure or charge. See [salvage collections](BOUNDED_ADDITIONS.md).')
s+=section('Body & Firmware Field Guide','body-and-firmware-field-guide',trim('FIELD_GUIDE.md','Verification and files'));P[n]=s
n='FAQ_10_Ninja_System.md';s=P[n].split('\n## Implemented additions',1)[0];tech='\n\n'.join(x for x in bullets if '**Black Ninja:**' in x);s+=section('Personal ninja techniques','personal-ninja-techniques',tech)
do=trim('HIDDEN_DOJO.md','Verification').replace('The larger individual recruitment missions remain future work.','Black and Blue now offer explicit invitations after the first credential and local chapters. These invitations are separate from passing the original trial. Other colours and wider individual missions remain future work.')
s+=section('Hidden Dojo: first Collective trial','hidden-dojo-first-trial',do);P[n]=s
n='FAQ_11_Body_Modification_System.md';s='''# MegaEarth2049 — Body modification

## Which body modifications are implemented?

Disco Implant133, Third Eye Mod134 and Experimental Neural Enhancer153 calibrate into reversible accessories at four existing clinic counters. Rex also has two reversible chromatic skin finishes. These are bounded services, not permanent limb replacement, general surgery slots, rejection/maintenance simulation or arbitrary body compositing. Temporary combat states are described in [the disease/state FAQ](FAQ_09_Disease_System.md).
'''
clinic=trim('MOD_CLINIC.md').split('\n## Chromatic skin service',1)[0];s+=section('Prototype mod clinic','prototype-mod-clinic',clinic);s+=section('Chromatic skin','chromatic-skin',trim('COSMETIC_SKINS.md'));P[n]=s
P['ROADMAP.md']='''# MegaEarth2049 — Unfinished-work roadmap

Reviewed November2,2026. This is the single list of retained unfinished or unstarted work after bounded A01–A26. It is not a walkthrough or implementation promise. Completed A-identifiers are indexed in [FAQ08](FAQ_08_Technical_Issues.md#completed-additions-register); current routes are indexed in [FAQ01](FAQ_01_Getting_Started.md).

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
|B10|Unstarted runtime UI|A real quest journal/tracker, if desired.|Track actual quest states and pending rewards with old-save and native text/scrolling checks. The imported QuestJournal file is descriptions only; the38-entry Completion Log already works and must not be replaced by invented records.|Medium–large|
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
'''

annex='\n\n'.join(x for x in bullets if '**Armatek Underworks' in x)
P['FAQ_03_Locations_Guide.md']+=section('Underworks service annex','underworks-service-annex',annex)
P['FAQ_09_Disease_System.md']+='\n[Native state-animation viewer](../art/bounded/animations.html) · [Exact icon and effect cells](../art/bounded/preview.html).\n'
P['FAQ_06_Quests_and_Storylines.md']+='\nNative previews: [Rivet local projects](../art/local-projects/preview.html), [Perfect Fit](../art/illusion-room/preview.html), [Completion Log](../art/completion-log/preview.html).\n'
P['FAQ_04_Characters_and_NPCs.md']+='\nNative companion previews: [Zack](../art/zack-story/preview.html), [Jen](../art/jen-story/preview.html), [Zed](../art/zed-story/preview.html), [Pink](../art/pink-story/preview.html), [Black/Blue/Niles/Jack/Dick](../art/companions-final/preview.html).\n'

for n in P:
 P[n]=clean_counts(refs(P[n],inside=True))
 P[n]=P[n].replace('as one of31 tracked activities','among the tracked activities').replace('all nine existing companions','all nine original companions')
 P[n]=re.sub('nine existing companions','nine original companions',P[n],flags=re.I)
 P[n]=P[n].replace('The Completion Log now includes','The Completion Log includes')
 P[n]=re.sub(r'November([12]),2026',r'November \1, 2026',P[n])
 P[n]=re.sub(r'\b(The|the|for|of|all|with|now|has|tracks|and)(?=\d)',r'\1 ',P[n])
P['FAQ_11_Body_Modification_System.md']=P['FAQ_11_Body_Modification_System.md'].replace('Original art and Actors.json remain unchanged.','The cosmetic service preserves the original art and Rex’s actor record.').replace('all ten ordinary actor classes','the original ten ordinary actor classes')
# Remove repeated index pointers which become self-links after consolidation.
for n in ['FAQ_04_Characters_and_NPCs.md']:
 P[n]=re.sub(r' A15 now has one bounded chapter for each existing companion; see \[all nine chapters\]\([^)]*\)\. Jack\'s bridge invitation and chapter are now implemented; see \[all nine companion chapters\]\([^)]*\)\.','',P[n])

nav={
'FAQ_04_Characters_and_NPCs.md':[('Chapter index','companion-chapters'),('Zack','zack-weight-bearing'),('Jen','jen-without-a-badge'),('Zed','zed-bench-warranty'),('Pink','pink-a-thought-of-her-own'),('Black','black-a-fixed-point'),('Blue','blue-stand-down'),('Niles','niles-nobody-rents-my-fuse'),('Jack','jack-passengers-are-not-freight'),('Dick','dick-nothing-worth-stealing'),('MAX-E-MUM','max-e-mum')],
'FAQ_06_Quests_and_Storylines.md':[('Burlap','burlap-pants-conspiracy'),('Clown Court','clown-court'),('Vending uprising','vending-machine-uprising'),('Rivet projects','rivet-local-projects'),('Perfect Fit','the-perfect-fit'),('Completion Log','local-completion-log')],
'FAQ_08_Technical_Issues.md':[('Current status','documentation-audit-and-current-status'),('Closed repairs','legacy-repair-record'),('Map audit','map-placement-and-passage-audit'),('Completed A-register','completed-additions-register'),('Test evidence','feature-verification-and-art-evidence')],
'FAQ_09_Disease_System.md':[('Traditional states','traditional-combat-states'),('Application sources','disease-application-sources'),('Field Guide','body-and-firmware-field-guide')],
'FAQ_10_Ninja_System.md':[('Personal techniques','personal-ninja-techniques'),('Hidden Dojo','hidden-dojo-first-trial')],
'FAQ_11_Body_Modification_System.md':[('Prototype clinic','prototype-mod-clinic'),('Cosmetic skin','chromatic-skin')]}
for name,links in nav.items():
 h,b=P[name].split('\n',1);P[name]=h+'\n\nJump to: '+' · '.join('['+label+'](#'+anchor+')'for label,anchor in links)+'\n'+b

stage=OUT/'staged';stage.mkdir(exist_ok=True)
for n,s in P.items():(stage/n).write_text(s.strip()+'\n',encoding='utf8')
(OUT/'consolidation.json').write_text(json.dumps(dict(originalFiles=len(D),finalFiles=len(P),renames=rename,absorbed=targets,stagedNames=sorted(P)),indent=2),encoding='utf8')
print('Staged',len(P),'documents; live originals retained until review.')
