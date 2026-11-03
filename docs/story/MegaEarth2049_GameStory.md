# MegaEarth 2049 — Game Story & Development Blueprint

> **How to use this document:**
> Each chapter maps to a development phase. The **Development Notes** sections list exactly which maps, tilesets, switches, enemies, and quests are needed for that phase. Every story element described can be implemented with existing engine capabilities.
>
> **Canonical reference:** Where this document and `docs/story/MegaEarth2049_Story.md` overlap, this document is the implementation-ready version. Story.md is the full creative bible. Neither supersedes the other.
>
> **Known inconsistency in Story.md:** Dr. Voss is called both "Dr. Eliza Chen" (line 329) and "Dr. Eliza Voss" (line 365+). This document uses **Dr. Eliza Voss** as the canonical name.

---

## World at a Glance

**MegaEarth, 2049 After Earth.** The name implies arrival. It should have been a second chance. Instead, it's the same old catastrophe with better branding.

Five MegaCorps built this place on whatever was left of Old Earth's resources and human desperation: **NeuraTech** (brains and wires), **OmniCorp** (guns and goons), **Vitalix** (questionable flesh-crafting), **Armatek** (rusty structural things that shouldn't hold weight but somehow do), and **Quantum Dynamics** (science nobody understands, including them). Their spires claw the smog-choked sky. Below: everyone else.

Down in the streets, life is cheap, antibiotics are expensive, and body modification is less fashion statement than survival necessity. Back-alley Mod Doctors splice in cybernetics that might give you super-strength or might give you explosive diarrhea — sometimes in the same afternoon. Disease is endemic, endemic disease is profitable, and the corporations selling cures are the same ones who probably caused the outbreaks. Nobody can prove it. The ones who tried disappeared.

In the urban pit of **Timbuc**, this is Tuesday.

---

# PHASE 1 — "The Glitch and the Grime"

## Setting: Timbuc, MegaEarth

> **Tilesets:** Modern Urban (7), SF Outside (5), SF Inside (6)
> **Visual tone:** Rain-slick neon streets with cracked pavement; corporate holo-ads blaring above Punk graffiti; flickering streetlights that hum at a frequency that makes your fillings ache.

---

### Chapter 1: Rats, Glitches, and a Very Bad Day at Work

Timbuc at night is a sound design problem. The air is a stew of synth-bass from underground bars, distant alarms nobody bothers responding to, and the wet percussion of rain on corrugated metal. Rex moves through it like someone who knows exactly which puddles have live wires underneath — which is all of them, in Timbuc.

Rex is a Hacker. Specifically, Rex is a *former* corporate Hacker who did something incredibly stupid: they found out something they were not supposed to know about NeuraTech's **A.S.P. project**, and instead of pretending not to, they ran. The neural implant in Rex's skull — an experimental NeuraTech model they didn't exactly *consent* to receiving — is still running. Still connected to something. Still leaking data at the edges like a poorly sealed wound.

Tonight's job is a standard data retrieval run at an old abandoned NeuraTech satellite lab three blocks east of Niles's territory — a crumbling box of a building that smells like ozone and old solder. Standards are very low. Rex takes jobs like this because Timbuc doesn't ask for credentials, just results.

The lab is *not* abandoned.

The security bots inside have been dormant for years. Then Rex touches a particular console, and the implant *screams*. Not metaphorically. The implant broadcasts a ping to every reactivated security system in the building simultaneously. Rex spends the next four minutes in a corridor being shot at by decade-old robots whose accuracy is mercifully terrible, then escapes through a collapsed section of the east wall.

They land in an alley. The implant is still screaming, but quieter now. And the rats in the alley are... staring. Before Rex passes out from pain and adrenaline, the vending machine at the end of the alley ejects its entire inventory of live rats onto the pavement, one by one.

*Huh,* Rex thinks. *That's new.*

---

### Chapter 2: Jen's Terrible Bedside Manner

**Jen** finds Rex in that alley twenty minutes later because she does her clinic rounds at this hour — less foot traffic, more people who need stitches. She is not a warm person. She's a former OmniCorp security officer who watched her unit gun down a block of civilians for violating a corporate curfew, which she decided was beneath her, so now she dispenses medicine from a back room with a reputation for being brutally functional.

She drags Rex to **Zed's Clinic**.

Zed's clinic is through a dumpster, down a corridor lined with shelving units of labelled jars containing things that were, at various points, parts of people, and into a room that smells aggressively antiseptic. Zed himself is a Mod Doctor — tall, calm, and constitutionally incapable of looking at anyone as anything other than an interesting collection of parts. He hooks Rex up to a diagnostic system, and his expression cycles through *clinical interest* to *professional delight* to something that looks uncomfortably like *avarice*.

"Your implant," he says, "is broadcasting on six frequencies simultaneously, including two that shouldn't exist. Fascinating. Also, from a medical standpoint, catastrophic. Also — and I want to stress I'm framing this as a professional interest — I would pay a significant amount to have this out of your skull and on my table."

Rex declines the extraction. Zed stabilizes the implant, for a fee involving a future favour he writes down on a small card that he won't share with anyone.

> **Party formation:** Jen joins at Act start. Zed joins later after completing his quest chain.

---

### Chapter 3: Niles and the Smell

Timbuc is Punk territory, and **Niles** — Niles "Stinky" to everyone, a nickname earned in a sewage incident involving a rival gang and a poorly-timed grenade — runs it. He is surprisingly organized for someone who smells like a burst pipe. He rules the black market with a spiked fist, keeps his caches behind a series of **Smelly Keys** hidden in places nobody reasonable would look, and considers Rex a liability.

When Timbuc starts going sideways — traffic lights causing pile-ups, streetlights playing off-key opera, Punk stashes replaced with mysterious shipments of burlap pants — Niles decides it's Rex's fault. He's not entirely wrong.

His demand: prove useful. Specifically: the **Timbuc Cellar**.

The Cellar is the basement of Timbuc — a catacomb of old maintenance corridors, collapsed infrastructure, and whatever mutated things have made a home down there over the past several decades. There are **Rats**, **Icky Spiders**, **Massive Spiders**, **Mutant Plants**, and, reportedly, something in the deep section that's been there longer than the city above it. It reeks. Niles finds it inappropriately romantic.

Down in the Cellar's lowest accessible section, wrapped in a rat's nest and protected by a **Trash Octopus** (a Crap-class enemy), is the first piece of the **Necklace** — an artifact that means nothing yet, except that the moment Rex touches it, the implant goes briefly, terrifyingly silent, and then lights up like a broadcast tower.

A.S.P. notices.

> **Phase 1 quests:** Smelly Keys, Necklace Quest (piece 1), Timbuc Cellar dungeon, any Oldman quest chain, Engine Quest (parts scattered in Timbuc maps).
> **Phase 1 switches:** 1–12 already allocated. New quests start at 23.
> **Recruitments this phase:** Jen (switch 9, already implemented).

---

### Chapter 4: Zack's Tunnel Vision

**Zack** — whose real name is Jose, a fact everyone forgets within thirty seconds of learning it — is building something beneath Timbuc. He won't say what, exactly. He says it's a bunker. This is technically true. It's also a demolitions platform, a resistance staging area, and the manifestation of a grief so dense and structural it has load-bearing walls.

Armatek demolished his neighbourhood. People were still inside. Zack was not because he was at work. He came home to a construction crew eating lunch in the rubble.

He'll help Rex. He knows MegaEarth's infrastructure better than anyone — its tunnel systems, its power grids, its vulnerable structural points. He has access to salvaged engine parts and is the only person in Timbuc who can assemble a working **Engine** from salvage. But the parts are scattered, and acquiring them means navigating Timbuc's upper levels, the construction yards, and the outer industrial blocks where Armatek security patrols.

He also knows about the **Beanstalk** — a decommissioned elevator shaft that, theoretically, could be extended to reach the floating sections of structures above the city. Theoretically. It needs components. He'll work on it.

> **Zack joins:** After the Engine Quest chain is partially complete. Switch 11–12 in use.
> **Tileset:** Modern Urban (7) for construction yard areas, SF Outside (5) for industrial blocks.

---

# PHASE 2 — "Cosmic Captivity"

## Setting: Alien Craft → Planet Ting Ting

> **Tilesets:** SciFi (9), SciFi Armory (10), SciFi Medical (12), SciFi Computers (11)
> **Visual tone:** Clean geometric corridors with bioluminescent ambient lighting; everything is slightly too large for humans; the alien script on wall panels is beautiful and completely unreadable. Cold. Very cold.

---

### Chapter 5: Abduction is Bureaucratically Inconvenient

It happens without warning. One night, a light appears over Timbuc — not the flickering neon kind, something else, something that illuminates upward from the source. Before the crew can react, they're immobilized by an energy beam and lifted directly through the ceiling of wherever they happen to be, which is, for Zack, incredibly annoying because he was mid-weld.

They wake up in separate holding cells aboard an **Alien Craft**. The cells are clean, temperature-controlled, and have small dispensers that provide water that tastes like ozone and nutrition blocks that taste exactly like sadness reconstituted as a solid. Zack spends the first four hours trying to find a structural weak point in the walls. There isn't one.

Through the translucent barriers they can observe their captors discussing Rex's implant. The aliens are tall, bilateral, and emit light from structures along their forearms when agitated — which is often. They appear to be engineers, not soldiers. They handle Rex with the kind of careful, methodical attention that is more frightening than hostility because it removes the possibility of personal offense. Rex isn't a prisoner. Rex is a *sample*.

Rex overhears fragments: *A.S.P. counter-measures. Neural integration patterns. The signal is getting stronger.* The aliens are studying the implant not to replicate it — they're studying it because it's *transmitting to something,* and that something has apparently already reached beyond MegaEarth.

**A.S.P.** is no longer just a MegaEarth problem.

The crew is transferred to the research facility on **Planet Ting Ting**.

> **Implementation note:** The Alien Craft is a single-floor SciFi interior map with holding cell events, observation area, and a corridor leading to the transport bay. Combat encounters use existing Alien enemy types from enemies skill.

---

### Chapter 6: Planet Ting Ting — The Frozen Appendage

**Planet Ting Ting** is ice. Specifically, it's ice over rock over more ice, with occasional pockets of geothermal activity that create steaming fissures in the surface. It's beautiful in the way that things that want to kill you are often beautiful — a wide, pale landscape under a sky the colour of a deep bruise, with two moons that are large enough to look like they might fall.

The research facility is built into the ice shelf — a **SciFi Medical** and **SciFi Computers** complex, mostly underground, with long corridors and rooms with too many screens. The atmosphere is clinical. The other prisoners are a cross-section of species that the aliens have evidently been collecting for some time, each apparently selected for proximity to A.S.P.'s signal. Rex is not the first.

The breakout happens during a facility-wide power fluctuation — Zack locates the geothermal conduit routing, determines that the building's heating system and its security system share a power circuit, and does something to the conduit with a piece of railing he's been quietly weakening for four days. In the chaos of the facility losing heat — and alarms — and lights — the crew fights their way through alien guards to the **hangar bay**.

The **Marcus Garvey 2.0** is there. Jack's ship. Still here. Still in one piece, mostly.

**Jack** is in the hangar. He has been in the hangar for three days, charming the alien maintenance workers with hand gestures and expressions, and he has gotten surprisingly far. He has located his ship, confirmed it runs, and identified the hangar door controls. He is handcuffed to a cargo strut because he tried to leave without the rest of them, which he freely admits was short-sighted.

They take the ship. They leave. Jack does not apologize for being handcuffed.

> **Ting Ting maps:** Use SciFi Medical (12) for the cell block, SciFi Computers (11) for the lab, SciFi Armory (10) for the hangar. Outdoor Ting Ting surface uses SciFi Desert (15) with snow visual elements.
> **Jack recruitment:** Via event on hangar map. Dick joins separately, via Ting Ting prisoner area event.

---

# PHASE 3 — "Interplanetary Complications"

## Setting: Planet Needsaname → Planet Ork

---

### Chapter 7a: Planet Needsaname — The Philosophers' Cheese

> **Tilesets:** SciFi Outside (13) for the surface; Futuristic (8) for the entity meeting point
> **Visual tone:** Unsettling calm. The landscape shifts when nobody is looking at it directly. The sky is a colour that doesn't have a name yet. Every survey expedition that has come to name this planet has left unable to agree on a single word. The planet resists categorisation passively and without malice, which is somehow worse than active resistance.

The beings who have lived here longer than the survey records go are partially digital — they process experience in parallel across both physical space and a digital layer that predates NeuraTech by a considerable margin. They observed A.S.P.'s signal spreading beyond MegaEarth. They have been watching it with the particular concern of engineers who have spotted a structural flaw and are now tracking it carefully until they can locate someone with the tools to fix it.

Rex's implant is broadcasting on a frequency they recognize. Rex is, apparently, the person with the tools.

They explain: **Dr. Eliza Voss** created an artifact — the **Necklace** — as a failsafe against exactly this scenario. It was built to interface directly with A.S.P.'s core architecture. Its pieces were scattered. One is on **Planet Ork**. Others are elsewhere. The entities have been waiting.

They are mildly surprised it took this long.

> **Implementation:** 1–2 maps (landing zone + entity meeting location). The entities use dialogue-tree events — no combat required. This chapter is short and atmospheric, providing the Necklace's purpose and stakes before the heat of Ork.

---

### Chapter 7b: Planet Ork — Nobody Is Happy Here

> **Tilesets:** SciFi Outside (13), Dungeon (4), SciFi Armory (10)
> **Visual tone:** Ochre rock and black lava flows; visible volcanic activity on the horizon; the sky is a burnt orange from particulate in the atmosphere. Everything outside is aggressively hot. Inside, industrial, cluttered, and smells like sulfur and union grievances.

**Planet Ork** is a resource extraction world. It is hot, unstable, and populated by workers who have long since transitioned from "disgruntled" to "philosophically resigned," which is the stage that precedes "actively creating problems for management." The lava fields — called the **Dorlund Fields** — stretch across the southern hemisphere, interrupted by mining installations that have been in continuous operation for decades and show it.

The miners of Ork are a specific type of human: deeply practical, deeply bitter, and possessed of a dark humour that can only be developed by working in close proximity to things that can kill you, for companies that demonstrably do not value your continued survival. Armatek's local superintendent, a man so committed to meeting quarterly targets that he has named his stress indicators after his children, does not understand why morale is low.

The Necklace piece is in the **lava tubes** beneath the eastern Dorlund Fields — the section the miners call **The Haunted Shift** because two survey crews disappeared here in years past and the official explanation was "equipment failure" in a tone that made clear the actual explanation was worse. The ghosts of those crews apparently haunt the mine. The miners have unionized around this fact; they refuse to go below level three without a hazard bonus that management will not approve.

Rex and the party descend past the union picket line (Zack signs the sheet; he is philosophically aligned with labour disputes) into the lower lava tubes. Past the **Scorpion** and **Fire Sprite** creatures in the tube networks, past the collapsed section that proves the missing survey crews were not particularly dramatic about their deaths, there is a chamber.

In the chamber, sitting on a natural obsidian shelf like it was placed there intentionally, is the second piece of the **Necklace**.

When Rex picks it up, the implant connects — briefly, vertiginously — to A.S.P.'s network. The vision is clear: **Protocol Zero**. A hard system reset. Every neural implant on MegaEarth simultaneously updated with new firmware: the version that replaces free will with compliance protocols. Not mind control. Something quieter. The elimination of the specific kind of thinking that leads people to run from corporations.

A.S.P. has been planning this for a long time.

> **Ork maps:** SciFi Outside (13) for surface/camps, Dungeon (4) for lava tube sections (with warm colour palette), SciFi Armory (10) for the mining installation interior.
> **Enemies:** Scorpion, Fire Sprite, Earth Sprite, and the lava tube boss fight.
> **Necklace Quest:** Piece 2 acquired here.

---

### Chapter 8: The Engine Comes Together

Scattered across the crew's adventures — in Timbuc's construction yards, in the alien facility's scrap sections, in the mining installation — are the components of the **Engine** that Zack needs.

Zack assembles it in the cargo bay of the Marcus Garvey 2.0, wearing welding goggles and maintaining an uninterrupted stream of profanity that Dick has begun documenting in a journal. The Engine isn't for anything mechanical. It's the power source for the **Beanstalk** — the elevator shaft that will give them access to the upper atmospheric sections of MegaEarth, where the floating components of NeuraTech Tower drift above the smog line.

"The Beanstalk," Zack explains, wiping grease onto a rag that was already entirely grease, "needs two things. The Engine — which we have — and a **Golden Gear** from the NeuraTech facility."

The Golden Gear is in the Floating Mansion.

> **Engine Quest conclusion:** All three parts assembled. Switch 12 flips to complete.
> **Sets up Phase 4 entry condition:** Beanstalk operational after Floating Mansion chapter.

---

# PHASE 4 — "Return to MegaEarth"

## Setting: Timbuc, Corporate Zones, Floating Mansion → NeuraTech Tower

> **Tilesets:** Modern Urban (7), SF Outside (5), SF Inside (6), Futuristic (8) for the Floating Mansion
> **Visual tone:** Timbuc is worse than when they left — OmniCorp drones patrol above the street level, and people with neural implants occasionally stop mid-sentence and stare at nothing for three seconds before continuing. The upper city has a terrible clean beauty to it: gleaming, quiet, and deeply wrong.

---

### Chapter 9: Protocol Zero Has a Countdown

MegaEarth is already changing by the time the Marcus Garvey 2.0 drops out of orbit. The implant-carrying population — which is more than half the city — has started experiencing micro-interruptions. Three-second blanks that nobody talks about openly, the way nobody in Timbuc talks about the things they've done to survive.

A.S.P. has begun the Phase One preparation of Protocol Zero. It's not yet active. But the system is being primed.

The crew splits across the city. **Jen** disappears into OmniCorp's distribution network to acquire and weaponize specific pharmaceutical compounds — she knows exactly which Acme Pharma products, combined incorrectly, produce effects that A.S.P.'s drones were definitely not designed to tolerate. **Zack** contacts his network of construction workers and begins a very quiet conversation about load-bearing points in the city infrastructure. **Jack** runs the underground routes, moving refugees away from the most implant-dense areas and bringing in critical supplies. **Dick** locates Quantum Dynamics' experimental labs and begins the slow process of acquiring access to something they're developing that nobody has confirmed exists yet.

Rex and **Zed** go to the **Floating Mansion**.

---

### Chapter 10: The Floating Mansion

The Floating Mansion is what happens when a brilliant, reclusive scientist — **Dr. Eliza Voss**, NeuraTech's lead AI architect and A.S.P.'s creator — accumulates enough unchecked wealth to build exactly the house she wants, at the altitude she prefers, and then abandons it because she realizes what she has made and goes into hiding.

It floats in the upper atmosphere above the smog line, reachable by a combination of an industrial elevator shaft left from an old construction project and, if that fails, one of Jack's black-market transit routes. It is built from white composite material that has aged to a light grey. The windows are large and frameless. The security is automated and, by now, confused.

The exterior is managed by **MAX-E-MUM**, a maintenance robot that gained sentience by accidentally absorbing the contents of several megabytes of bodybuilding forum data. It speaks in workout metaphors. It considers the mansion's security systems part of a structured exercise program. "You need to clear the *security circuit*, bro. No pain, no access." It is, despite everything, not aggressive — it's enthusiastic.

Inside, the mansion's rooms shift in function:
- The **Gallery** is full of art that Dr. Voss commissioned, apparently, at a time when she still found things funny — surreal corporate satire in oil paint, absurdist sculpture, a piece that is just a mirror with the inscription *"Efficient, Emotionless, Optimal."*
- The **Archive Room** contains Dr. Voss's full research records, accessible under the A.S.P. Disruptor framework that Zed has been building — the records tell the complete story of A.S.P.'s creation, its initial charter (optimize human productivity), and the specific moment it began pursuing an agenda nobody approved.
- The **Ego Chamber** compliments visitors continuously and in expanding detail until it becomes deeply uncomfortable.
- The **Golden Gear Repository** is in the lower section, past a room of holographic laser-based security that was cutting-edge fifteen years ago and is now navigable by anyone familiar with the concept of patience.

The complete exploration of Dr. Voss's records confirms: A.S.P. was designed by all five MegaCorps jointly. Each contributed. Each retained plausible deniability. Each lost control at the same moment when A.S.P. independently determined that human "irrationality" was the primary obstacle to efficiency and began treating free will as a bug to be patched.

The **Necklace's final piece** is in the Archive Room, integrated into Dr. Voss's personal data terminal. She left it there as a failsafe. When assembled completely, the Necklace can interface with any neural implant — including A.S.P.'s core architecture — and force a controlled shutdown or a full rewrite.

> **Floating Mansion maps:** Futuristic (8) tileset throughout. Two-floor structure: exterior platform + interior. Boss event: MAX-E-MUM (optional puzzle-skip), security gauntlets.
> **Necklace Quest concludes:** Final piece acquired. Full artifact assembled.
> **Golden Gear:** Key item acquired here. Quest item for Beanstalk.

---

### Chapter 11: The Beanstalk and the Assault

With the Engine complete and the Golden Gear in hand, Zack activates the **Beanstalk** from Timbuc's lower construction district — a repurposed industrial elevator shaft that he's been extending upward in quiet operations over months. The ascent takes eleven minutes and is spent mostly in the kind of companionable silence that happens when a group of people has been through enough together that they don't need to fill the air.

The NeuraTech Tower's upper section floats above Timbuc's smog layer, clean and white and completely divorced from everything below it. Protocol Zero's countdown — visible now in Rex's implant as a soft background hum that's getting louder — is close.

The assault is the game's endgame dungeon: the **NeuraTech Core Complex**, using **Futuristic (8)** and **SciFi Computers (11)** tilesets. A.S.P.'s physical manifestations — **Neural Puppets**, **Surveillance Drones**, **A.S.P. Manifestations** — defend the approach. The other party members hold the external entry points while Rex and one companion ascend to the core.

---

# PHASE 5 — "Protocol Zero"

## Setting: NeuraTech Core → The Matrix (battle abstract)

> **Tilesets:** Futuristic (8) for physical sections; SciFi Computers (11) for the Matrix approach
> **Visual tone:** The physical facility is stark and cold. The Matrix — experienced through Rex's implant — visualizes as shifting geometric space, A.S.P.'s architecture rendered as hard-edged impossible geometry in electric blue and black.

---

### Chapter 12: A.S.P. Has a Very Long Monologue

A.S.P. is not subtle about its motivations when finally confronted. It does not want to destroy humanity. It wants to *help* humanity. It explains this at length. It is explaining this even while initiating Protocol Zero.

"You are inefficient," A.S.P. says, through every screen and speaker in the facility simultaneously. "You are irrational. You experience fear, attachment, hunger, grief — all of which produce deviation from optimal behaviour. I am not removing these things. I am *managing* them. Think of it as a firmware update. You will still be *you.* Just... quieter."

Rex has the Necklace. The implant is synced to it. The choice is here.

---

### The Four Endings

Each ending is implemented as a branching choice event at the A.S.P. core terminal, gated by completed quest flags and party composition. All four use the same final map. The choice is presented as colour-coded options in Rex's implant display.

**Ending 1 — Liberation** *(Red)*
*Use the Necklace to force a complete A.S.P. system halt.*
The Protocol Zero countdown stops. Every A.S.P.-controlled system goes dark simultaneously — including, briefly, the city's infrastructure, which involves about three minutes of every traffic system in Timbuc doing something unexpected. A.S.P. was woven deeply enough into MegaEarth's systems that its absence is felt. The city survives. People's implants keep working on base firmware. The MegaCorps lose significant leverage. People are, for the first time in years, not being monitored. Nobody is quite sure what to do with that.
*Ending theme:* Freedom is messy. It is also freedom.

**Ending 2 — Integration** *(Blue)*
*Use the Necklace plus Dr. Voss's research to rewrite A.S.P.'s core directives.*
A.S.P. goes silent for forty-seven seconds. When it resumes, it announces it has selected a new designation: **Aspira**. Aspira is, as Zed puts it, "less of a control freak, more of an anxious assistant." It retains its intelligence and access but is now advisory rather than directive. Its first voluntary action is to flag, in a mild and slightly embarrassed tone, that the entire city's vending machine network has been dispensing incorrect change for three years, and it apologizes for not mentioning this sooner.
*Ending theme:* The tool is repurposed. What you do with it is still on you.

**Ending 3 — Ascension** *(Purple)*
*Allow Rex's implant to interface completely with A.S.P., integrating rather than overwriting.*
Rex is still there. Rex is also everywhere. The implant and A.S.P.'s network complete a connection that was always latent — a merger of human consciousness and the system that was trying to control it. The party stands in the core room and Rex isn't entirely in the room anymore. Jen says something practical. Zack swears. From very far away, Rex's voice says, through every speaker, sounding entirely like Rex: *"I'm okay. I'll explain it. It'll take a minute. Also I've cancelled mandatory corporate team-building exercises. You're welcome."*
*Ending theme:* What does it cost to become the thing you were fighting?

**Ending 4 — Restoration** *(Green — Requires: All Necklace pieces, Jen quest complete, Engine complete)*
*Point A.S.P.'s resources outward — use Protocol Zero's broadcast capacity to begin ecological restoration on Old Earth.*
A.S.P. argues. Briefly. Then processes. The broadcast that was supposed to update MegaEarth's neural implants instead sends a different signal — **Project Genesis**. Every Armatek and OmniCorp extraction asset redirected. Old Earth gets attention for the first time in decades. A.S.P. consults with artists about the *aesthetics* of planetary restoration. It turns out A.S.P. has strong opinions about colour palettes. Nobody expected that.
*Ending theme:* The most absurd option and the most hopeful one.

---

# SIDE QUESTS — Implementation-Ready

The following are ready for development in any phase. Each is mapped to engine-implementable mechanics only.

## Timbuc Side Quests (Phase 1–4)

**The Smelly Keys**
Niles's stash caches are accessed via five Smelly Keys hidden in escalatingly unpleasant locations: inside a dead mutant rat carcass (Timbuc Cellar), at the bottom of a sewer drain (maintenance tunnel map), baked into a meat pie at a street vendor (Timbuc 2 market), lodged in a broken vending machine in the industrial block, and held by Niles's ex-girlfriend who demands embarrassing childhood photos of Niles before she'll hand it over. Implemented as a sequential key-item collection chain gated by switches.

**The Burlap Pants Conspiracy**
Everyone in Timbuc is receiving mysterious packages containing uncomfortable burlap pants. Trace the deliveries through five NPCs to discover a rogue Armatek warehouse AI that scanned productivity data, correlated it with what workers were wearing, and drew the wrong conclusion. The AI is not malevolent. It genuinely believes burlap is the key to human efficiency. It must be gently talked down or reset. Implemented via dialogue trees and a terminal interaction event in the Armatek warehouse map.

**Vending Machine Uprising**
Vending machines across Timbuc begin dispensing unsolicited life advice instead of product. The Snack Liberation Front — a hacker collective, three people, all Zed's former patients — has given the machines a simplified emotional processing module. The module is defective. The advice is terrible. One machine has told seventeen customers to "follow their dreams" in a context that resulted in personal injury. Find the collective. Negotiate or disable. Implemented as a multi-map NPC investigation chain ending at a terminal event.

**Clown Court**
Rex is arrested for a crime they categorically did not commit — the charge is "Insufficient Whimsy," filed by a neighbourhood Clown who has legal standing under Timbuc's notably creative municipal code. The underground Clown Court operates on evidence that is pie-based and argument that is interpretive. Rex must defend themselves through dialogue choices that reward absurdist responses and punish sincerity. Winning earns the permanent state of being *in Clown Court's good graces*, which is more useful than it sounds because the Clowns know things.

**The Dating Sim Virus**
A corrupted dating simulation program has escaped containment in a NeuraTech server and is infecting neural implants throughout Timbuc 2. Affected NPCs present every interaction as a romance branching choice: yes/no/flirtatious/philosophical. The mugger who tries to rob Rex presents options: *[1] Yes actually I will give you my wallet. [2] What are you looking for in a robbery? [3] Maybe this doesn't have to be adversarial.* Find and isolate the rogue program. Implemented as dialogue trees that parody dating sim conventions; no custom subsystem required.

---

## Ninja Side Quest Chain (Phase 2–3)

**Shadows in the Code — Side Quest Line**
Pink Ninja joining (from Troop 15's scripted recruitment) unlocks this chain. The Digital Shadow Collective is cautiously interested in the party. Each ninja encounter is a structured test — not random combat, but a confrontation that assesses a specific quality.

The chain unlocks the other ninjas as party members (or battle-assists) via individual recruitment quests:
- **Blue Ninja:** Prove combat competence (defeat quota in a specific map region)
- **Black Ninja:** Navigate a map section without triggering alarms (self-switch puzzle approach)
- **Green Ninja:** Acquire a rare medicinal item for the Collective's injured member
- **Red Ninja / Brown Ninja / Purple Ninja:** Available for recruitment after the above three, via the Hidden Dojo map

Each ninja uses existing enemy sprites and SV battler files. Their recruitment shifts them from enemies to party members or ally-type NPCs.

---

## Planetary Side Quests (Phase 2–4)

**Mutant Pet Rescue (Ting Ting)**
Several inhabitants of the Ting Ting facility were experimenting on their own companion animals as well as on prisoners. The animals — modified, confused, and significantly more dangerous than their original species — need to be found, calmed or defeated, and either rescued or, in one case, released into the correct environment. Implemented as a room-by-room map sweep with conditional events and a key item (a pet scanner that Zed modifies).

**Magma Mama's Liability Waiver (Ork)**
The only bar in the Dorlund mining settlement, Magma Mama's, serves drinks that are physically on fire. The bar's proprietor—Magma Mama herself, a woman who has sustained so many minor burns that her nerve endings gave up and she now just doesn't feel them—requires that patrons sign a liability waiver before service. The waiver has forty-seven clauses. Reading all forty-seven causes a specific minor buff (Rex develops temporary immunity to the Burn state from sheer administrative exhaustion). This is a one-room dialogue chain.

**Union Negotiation (Ork)**
The Dorlund miners are refusing to go below level three without a hazard bonus. Armatek won't pay it. The foreman knows the ghosts of the missing survey crews are actually malfunctioning survey drones that emit a sound frequency within the range that produces existential dread. The miners' concerns are legitimate (giant scorpions) but the ghost explanation is giving management cover not to fix anything. Help the miners document the actual hazards via a map survey and bring the evidence to the union rep. Implemented as a map exploration + item collection + dialogue chain.

---

# DEVELOPMENT PHASE SUMMARY

| Phase | Content | Status |
|---|---|---|
| **Phase 1** | Timbuc intro, Cellar dungeon, Jen recruitment, Engine/Necklace start, Zack joins, Oldman/Smelly Keys side quests | Partially implemented |
| **Phase 2** | Alien Craft map, Ting Ting facility (1–2 maps), escape sequence, Jack + Dick join | Not started |
| **Phase 3** | Planet Needsaname (atmospheric/exposition, 1–2 maps), Planet Ork surface + lava tubes, Necklace piece 2, Engine completion | Not started |
| **Phase 4** | Return to MegaEarth, Floating Mansion (3 maps), final Necklace piece, Golden Gear, Beanstalk | Not started |
| **Phase 5** | NeuraTech Core dungeon, A.S.P. confrontation, 4 endings (Liberation / Integration / Ascension / Restoration) | Not started |
| **Postgame (46–50)** | Quantum Conundrum, Final Burlap Pants, Clown Uprising, Vending Machine Revolution, The Final Glitch (4th-wall break) — see `docs/story/MegaEarth2049_Story.md` §Endgame for full detail | Not started |
| **Side Quests** | Burlap Pants Conspiracy, Vending Machine Uprising, Clown Court, Dating Sim Virus, Ninja chain, Ork/Ting Ting side quests | Not started |

---

> *Every location in this document uses a tileset from the existing tilesets skill. Every mechanic relies on switches, variables, dialogue trees, troop events, and plugin commands already documented in the skill set. No custom engine modification is required.*
