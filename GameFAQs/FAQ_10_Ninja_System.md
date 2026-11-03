# MegaEarth 2049 — Ninjas

Jump to: [Personal techniques](#personal-ninja-techniques) · [Hidden Dojo](#hidden-dojo-first-trial)

## Which ninjas are party characters?

Black Ninja (actor5), Blue Ninja (actor6) and Pink Ninja (actor7) exist and share class5, Ninja. Other colors have enemy/art records; that is not the same as a complete recruitable party character.

Pink Ninja has been removed from the configured starting party. Existing saves are not stripped of their members.

## How does Pink Ninja recruitment currently work?

Troop15 now keeps Pink alive long enough for her defeat dialogue, recruits actor7 once, and then allows victory. The lethal-damage-to-recruitment sequence was tested in the running battle scene. After recruiting Pink, use the Internet Cafe or Matrix Collective handshake to authenticate dojo access.

## Do the colors have unique classes and the advertised powers?

All three party ninjas share class5, but each now has two personal techniques: Black disrupts, Blue attacks and defends, and Pink heals and supports. Blue Ninja is not granted every weapon type merely by being blue. The older Mind Shield, Thought Scan, Compiler's Mask, Shadow Step and color-specific ability lists are design candidates, not verified skill packages.

Current Ninja class additions include skills for temporary states such as Aim Assist, Reflex Cache, Packet Loss and Optic Desync. Use the live skill list and equipment restrictions.

## Is the Hidden Dojo available?

Yes. Recruit Pink Ninja, then choose **Follow Collective handshake** at the Internet Cafe terminal, or use the new Collective access point in the Matrix. The first trial has four connected maps and three challenges. See [the dojo route and reward](FAQ_10_Ninja_System.md#hidden-dojo-first-trial).

## Should the Collective and Compiler lore be discarded?

No. They can support future ninja missions, but the claim that the Compiler is A.S.P.'s creator must first be reconciled with the existing creator revelations and finale. Do not silently establish an incompatible origin through this FAQ.

## What ninja additions are practical?

Personal actor-granted skills are implemented. The first dojo circuit and a Silence/Confusion-resistant neural bandana are implemented. Further recruitment trials, a cookbook collectible and a scripted cat companion remain candidates. A full faction simulation, universal corporate disguises and freeform phasing through every wall are not current features.

Evidence: `data/Actors.json` 5–7; `data/Classes.json` 5; `data/Troops.json` 15; `data/System.json`; `data/MapInfos.json`; [backlog](ROADMAP.md).



## Personal ninja techniques

- **Black Ninja:** Smoke Severance attempts Blind; Cut the Feed damages and attempts Packet Loss. **Blue Ninja:** Blue Crosscut strikes twice; Hold the Line grants Dermal Plating and Reflex Cache. **Pink Ninja:** Field Dressing heals and clears Bleed/Poison; Mutual Aid buffs an ally and clears Stapled/Enfeebled. Blue/Pink are now manually controllable so these choices are usable. All retain blade/throwing equipment limits and dual wield. Actor-granted techniques also appear in existing saves; no recruitment is bypassed.


<a id="hidden-dojo-first-trial"></a>

## Hidden Dojo: first Collective trial

Recruit **Pink Ninja** through her established Church Street encounter. At the **Internet Cafe**, choose **Follow Collective handshake** on the existing Matrix computer. The Collective access point in the **Matrix** offers the same route. Pink’s implant authenticates the first visit; switch185 retains authorization afterward, including on existing saves that already recruited her. The original public Matrix connection and exits still work.

### Four connected maps

- **Handshake Hall245:** the hub. Speak to the steward for objectives. Left door: Silent Packet Run. Right door: Counterexample Ring. North door: Care Before Compliance. South exit returns to the Matrix access point.
- **Silent Packet Run246:** enter with the trial armed. Follow cyan grid tiles to the far console. Orange tiles are visible simulation alarms, not damaging floor. An armed alarm returns you safely to the start and disarms the attempt. Re-arm at the starting console or re-enter from the hall. Other trial progress is retained. There is no timing requirement or hidden alarm roll.
- **Counterexample Ring247:** speak to the Blue instructor to fight one Training Echo. Victory records the combat trial. Escape and defeat are safe; the event restores party HP/MP and states after every attempt. The echo uses normal attacks and Blue Crosscut, gives no drops, Credits or repeat EXP, and does not recruit a ninja.
- **Care Before Compliance248:** help the injured apprentice. Donate one Green Herb, or follow the posted consent/disconnect/patch sequence. A sealed cabinet supplies one herb if needed. Incorrect or declined choices allow retries; a completed care trial never takes more supplies.

Each trial has its own persistent completion flag. You can leave freely, save partway through and return. The dojo contains no random encounters.

### Reward

After all three trials, speak to the **Compiler relay** in the hall and claim the first-trial reward:

- **Collective Neural Bandana68:** Hat slot, Clothing permission; DEF+2, MDF+3, AGI+2; halves Silence6 and Confusion8 application while equipped. Removing it reverses its equipment effects.
- **Collective Trial Credential179:** a key-item record of completing the first circuit.
- **200 EXP for each current party member**, once.

Inventory capacity is checked before granting the reward. A full inventory or postponing the choice preserves the claim. Save/load and repeated dialogue cannot duplicate equipment, the credential or EXP.

### Story continuity

The existing notes describe both the Collective’s neural access and an eventual wider recruitment chain. This implements its bounded opening trial. It does not auto-recruit Blue, Black, Green or the other colors, or give them incomplete actor records. Black and Blue now offer explicit invitations after the first credential and local chapters. These invitations are separate from passing the original trial. Other colours and wider individual missions remain future work.

The hooded Compiler relay is a training projection. It acknowledges the Collective’s claim that the Compiler helped architect A.S.P., but cannot verify the identity. The existing creator revelations, Necklace plot, floating-castle route and final two bosses remain unresolved by this optional trial.
