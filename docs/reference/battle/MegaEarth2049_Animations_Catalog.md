> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Animations Catalog

Generated on: 04/19/2025 07:04:12

## Table of Contents
- [Overview](#overview)
- [Animation Statistics](#animation-statistics)
- [Animation Categories](#animation-categories)
- [Complete Animation Catalog](#complete-animation-catalog)
- [Animation Graphics](#animation-graphics)

## Overview

This document provides a comprehensive catalog of all animations in the MegaEarth2049 game. Each animation is listed with its properties, including name, position, graphics used, and other relevant details.

The Animations.json file is a core component of the MegaEarth2049 RPG Maker MV project, defining all battle animations used in the game. These animations are visual effects that play when skills, items, or other actions are performed during battle.

## Animation Statistics

- **Total Animations**: 175
- **Animation Positions**:
  - Screen: 2
  - Target: 103
  - Center: 28
  - Behind: 42

- **Animation Categories**:
  - Basic Attack (1-20): 20
  - Special Effect (21-40): 20
  - Powerful Attack (41-80): 40
  - Environmental (81-100): 20
  - Other (101+): 75

## Animation Categories

Animations in MegaEarth2049 are organized into several categories based on their visual effects and usage:

### 1. Basic Attack Animations (IDs 1-20)

These animations represent basic physical attacks and are often used with the default Attack command or physical skills.

| ID | Name | Description | Usage |
|----|----|-------------|-------|
| 1 | Hit Physical | Basic physical hit effect | Default Attack skill |
| 2 | Hit Effect | Enhanced hit with photon effect | Physical skills with special effects |
| 6 | Slash Physical | Basic slash effect | Sword skills |
| 7 | Slash Effect | Enhanced slash with photon effect | Special sword skills |
| 11 | Pierce Physical | Basic piercing effect | Spear and piercing weapon skills |
| 16 | Claw Physical | Basic claw attack effect | Claw and natural weapon skills |

### 2. Elemental Animations

These animations represent elemental effects and are used with elemental magic and skills.

| Element | Basic (Single) | Medium (Single) | Strong (AoE) |
|---------|----------------|-----------------|--------------|
| Fire | Hit Fire (3) | Slash Fire (8) | Pierce Fire (13) |
| Ice | Hit Ice (4) | Slash Ice (9) | Pierce Ice (14) |
| Thunder | Hit Thunder (5) | Slash Thunder (10) | Pierce Thunder (15) |
| Water | Water One 1 (81) | Water One 2 (82) | Water All 1 (83) |
| Earth | Earth One 1 (86) | Earth One 2 (87) | Earth All 1 (88) |
| Wind | Wind One 1 (91) | Wind One 2 (92) | Wind All 1 (93) |
| Light | Light One 1 (96) | Light One 2 (97) | Light All 1 (98) |

### 3. Special Effect Animations (IDs 21-40)

These animations represent special effects like healing, buffs, debuffs, and status effects.

### 4. Powerful Attack Animations (IDs 41-80)

These animations represent powerful attacks and are often used with high-level skills and limit breaks.

### 5. Environmental Effect Animations (IDs 81-100)

These animations represent environmental effects like water, earth, wind, and light.

## Complete Animation Catalog

### Basic Attack Animations

| ID | Name | Position | Graphics |
|-------|------|----------|----------|
| 7 | Hit Fire | Target | Slash, SlashPhoton |
| 6 | Powerup | Target | Slash |
| 8 | Fire1 | Target | SlashFire |
| 10 | Hit Ice | Target | SlashThunder |
| 9 | Blow3 | Target | SlashIce |
| 2 | Blow3 | Target | Hit1, HitPhoton |
| 1 | Hit Physical | Target | Hit1 |
| 3 | Hit Effect | Target | Hit2, HitFire |
| 5 | Damage4 | Target | Hit2, HitThunder |
| 4 | Evasion2 | Target | Hit2, HitIce |
| 11 | Ice4 | Target | Stick |
| 18 | Slash Effect | Target | Claw, SlashFire |
| 17 | Slash1 | Target | Claw, ClawPhoton |
| 19 | Evasion2 | Target | Claw (Hue: 161), SlashIce |
| 20 | Slash1 | Target | Claw (Hue: 17), SlashThunder |
| 13 | Hit Thunder | Target | Stick, HitFire |
| 12 | Blow3 | Target | Stick, StickPhoton |
| 14 | Thunder8 | Target | Stick (Hue: 135), HitIce |
| 16 | Slash Physical | Target | Claw |
| 15 | Blow3 | Target | Stick, HitThunder |

### Special Effect Animations

| ID | Name | Position | Graphics |
|-------|------|----------|----------|
| 29 | Slash1 | Target | ArrowSpecial |
| 28 | Slash Thunder | Target | ClawSpecial1, ClawSpecial2 |
| 30 | Thunder8 | Target | Special1, Special2 |
| 32 | Thunder1 | Behind | Breath |
| 31 | Pierce Physical | Target | Special3 |
| 24 | Fire1 | Target | SlashSpecial2 |
| 23 | Slash1 | Target | SlashSpecial1 |
| 25 | Slash Ice | Behind | SlashSpecial3 |
| 27 | Ice4 | Target | StickSpecial2 (Hue: 160), StickSpecial3 |
| 26 | Slash1 | Target | StickSpecial1 |
| 33 | Sword5 | Behind | Pollen |
| 40 | Sword5 | Behind | Flash |
| 39 | Thunder1 | Target | Howl, Cure4 |
| 35 | Evasion2 | Behind | Mist |
| 34 | Pierce Effect | Behind | Sonic |
| 36 | Thunder4 | Behind | Song |
| 38 | Pierce Fire | Center | Blow, Special2 |
| 37 | Powerup | Behind | Howl, Recovery4 |
| 22 | Slash Fire | Target | Hit2, HitSpecial2 |
| 21 | Powerup | Target | HitSpecial1 |

### Powerful Attack Animations

| ID | Name | Position | Graphics |
|-------|------|----------|----------|
| 41 | Fire1 | Center | Recovery1 |
| 43 | Thunder1 | Behind | Recovery2 |
| 42 | Pierce Ice | Target | Recovery3, Recovery4 |
| 44 | Sword5 | Behind | Recovery4, Recovery5 |
| 73 | Slash1 | Behind | Ice1, Ice2 |
| 72 | Blow1 | Center | Ice3 (Hue: 60), HitIce |
| 74 | Thunder5 | Behind | Ice4 |
| 76 | Blow1 | Center | Thunder1 |
| 75 | Hit Special 2 | Behind | PreSpecial1 (Hue: 150), Ice5 |
| 68 | Thunder8 | Behind | Fire1 |
| 67 | Slash2 | Center | Fire2 |
| 69 | Hit Special 1 | Behind | Fire2 |
| 71 | Blow3 | Target | Ice1 |
| 70 | Blow1 | Behind | PreSpecial1 (Hue: 330), Fire3 |
| 77 | Blow1 | Target | Thunder2 |
| 79 | Blow1 | Behind | Thunder3, Thunder4 |
| 78 | Blow3 | Behind | Thunder1 |
| 80 | Blow2 | Behind | PreSpecial1 (Hue: 230), Thunder5 |
| 66 | Attack2 | Center | Fire1 |
| 51 | Attack2 | Center | StateDown1 (Hue: 149) |
| 50 | Claw Physical | Screen | Revival2 |
| 52 | Slash2 | Center | StateUp1 |
| 54 | Evasion2 | Center | StateDown1 |
| 53 | Claw Effect | Target | StateUp2 |
| 46 | Pierce Thunder | Center | Cure3 (Hue: 250), Recovery5 |
| 45 | Ice4 | Center | Cure1 |
| 47 | Thunder1 | Behind | Cure2 |
| 49 | Thunder8 | Center | Revival1 |
| 48 | Sword5 | Behind | Cure4, Recovery5 |
| 55 | Attack2 | Center | StateDown2 |
| 62 | Attack2 | Target | StateSleep |
| 61 | Claw Ice | Target | StateSilent |
| 63 | Slash2 | Target | StateChaos |
| 65 | Claw Thunder | Target | StateDeath |
| 64 | Ice4 | Target | StateParalys |
| 57 | Claw Fire | Center | Curse |
| 56 | Powerup | Target | StateDown3 |
| 58 | Attack2 | Target | Absorb |
| 60 | Fire1 | Target | StateDark |
| 59 | Slash2 | Target | 30FPS_ACQ012_Poison |

### Environmental Effect Animations

| ID | Name | Position | Graphics |
|-------|------|----------|----------|
| 95 | Sword4 | Behind | PreSpecial1 (Hue: 60), Wind5 |
| 94 | Slash1 | Behind | Wind4 |
| 96 | Attack3 | Center | Holy1 |
| 98 | Sword4 | Behind | Holy2 |
| 97 | Slash Special 2 | Target | Holy3 |
| 90 | Sword4 | Behind | PreSpecial1 (Hue: 350), Earth5 |
| 89 | Sword3 | Behind | Earth4 |
| 91 | Slash1 | Center | Wind1 |
| 93 | Sword4 | Target | Wind2 |
| 92 | Sword3 | Target | Wind3 |
| 99 | Slash2 | Behind | Holy4 |
| 100 | Wind7 | Behind | PreSpecial2 (Hue: 360), Holy5 |
| 88 | Slash1 | Behind | Earth2 |
| 84 | Blow2 | Behind | Water4 |
| 83 | Blow3 | Behind | Water2 |
| 85 | Blow3 | Behind | PreSpecial1 (Hue: 180), Water5 |
| 87 | Slash Special 1 | Target | Earth3 |
| 86 | Damage2 | Target | Earth1 |
| 82 | Blow3 | Target | Water3 |
| 81 | Blow1 | Target | Water1 |

### Other Animations

| ID | Name | Position | Graphics |
|-------|------|----------|----------|
| 117 | Slash1 | Center | Light1 |
| 116 | Sword5 | Behind | Laser2 |
| 118 | Sword5 | Center | Light2 |
| 120 | Sword5 | Target | Light4 |
| 119 | Slash1 | Target | Light3 |
| 112 | Pierce Special 1 | Target | Gun3 |
| 111 | Sword3 | Target | Gun1 |
| 113 | Wind6 | Behind | Gun1 |
| 115 | Slash1 | Target | Laser1 |
| 114 | Sword5 | Behind | Gun2 |
| 121 | Slash1 | Target | 30FPS_ACQ009_Remedy |
| 128 | Slash2 | Target | 30FPS_ACQ011_Bite |
| 127 | Sword5 | Target | 30FPS_ACQ021_Fire |
| 129 | Sword4 | Target | 30FPS_AC2Q014_Logic_Bomb |
| 131 | Slash2 | Target | 30FPS_AC2Q025_Blackhole |
| 130 | Sword5 | Target | 30FPS_AC2Q025_Blackhole |
| 123 | Slash2 | Target | 30FPS_AC2Q003_Shot |
| 122 | Sword4 | Target | 30FPS_ACQ007_Potion |
| 124 | Pierce Special 2 | Screen | Water3 (Hue: 224) |
| 126 | Sword4 | Target | 30FPS_ACQ014_Curse |
| 125 | Wind5 | Target | Slash |
| 110 | Wind6 | Behind | Meteor, Gun2 |
| 106 | Slash2 | Target | Magic1 (Hue: 20) |
| 105 | Slash Special 3 | Behind | PreSpecial3, Darkness5 |
| 107 | Slash3 | Target | Explosion1, 30FPS_AC2Q023_Star_Aura |
| 109 | Slash3 | Behind | Explosion2, Explosion1 |
| 108 | Slash2 | Behind | Magic2 |
| 101 | Slash3 | Target | Darkness1 |
| 102 | Wind7 | Target | Darkness3 |
| 104 | Ice4 | Behind | Darkness4 |
| 103 | Slash1 | Behind | Darkness2 |
| 132 | Sword4 | Target | 30FPS_AC2Q025_Blackhole |
| 161 | Damage2 | Target |  |
| 160 | Slash1 | Target |  |
| 162 | General Special 2 | Target |  |
| 164 | Slash1 | Target |  |
| 163 | Thunder3 | Target |  |
| 156 | Slash1 | Target |  |
| 155 | General Special 1 | Target | BlastBeam1_2 By Coopziana |
| 157 | Slash4 | Target |  |
| 159 | Slash2 | Target |  |
| 158 | Slash5 | Target |  |
| 165 | Slash1 | Target |  |
| 172 | Pollen | Target |  |
| 171 | Thunder1 | Target |  |
| 173 | Darkness4 | Target |  |
| 175 | Sonic Wave | Target |  |
| 174 | Darkness3 | Target |  |
| 167 | Powerup | Target |  |
| 166 | Thunder3 | Target |  |
| 168 | Slash3 | Target |  |
| 170 | Fire3 | Target |  |
| 169 | Breath | Target |  |
| 154 | Wind6 | Center | StateUp1 (Hue: 54) |
| 139 | Attack2 | Target | Barrier By Coopziana |
| 138 | Slash2 | Target | Jlx2fTz (Hue: 35) |
| 140 | Slash3 | Center | dozer4, Hit2 |
| 142 | Slash2 | Target | grenade |
| 141 | Attack2 | Center | grenade, Explosion2 |
| 134 | Slash2 | Target | 30FPS_ACQ012_Poison (Hue: 277) |
| 133 | Sword5 | Target | 30FPS_ACQ012_Poison (Hue: 277) |
| 135 | Sword4 | Target | 30FPS_AC2Q018_Barrier_Break |
| 137 | Attack3 | Target | Recovery2 (Hue: 93) |
| 136 | Claw Special | Target | StateUp2 |
| 143 | Attack2 | Center | grenade, 30FPS_AC3T026_Nova |
| 150 | Attack3 | Center | StateUp1 (Hue: 243) |
| 149 | Crossbow | Center | StateUp1 (Hue: 288) |
| 151 | Attack3 | Center | StateUp1 (Hue: 211) |
| 153 | Attack3 | Center | StateUp1 (Hue: 126) |
| 152 | Attack3 | Center | StateUp1 (Hue: 170) |
| 145 | Attack2 | Center | grenade, 30FPS_ACQ017_Cure |
| 144 | Slash3 | Behind | grenade, Darkness2 |
| 146 | Slash1 | Target | 30FPS_AC2Q012_Scan (Hue: 241) |
| 148 | Arrow Special | Target | 30FPS_AC2Q013_Virus |
| 147 | Monster2 | Target | 30FPS_AC2Q011_Delete (Hue: 135) |

## Animation Graphics

The following animation graphics are used in the game:

| Graphic Name | Usage Count |
|-------------|------------|
| StateUp1 | 7 |
| PreSpecial1 | 6 |
| Stick | 5 |
| grenade | 5 |
| Claw | 5 |
| Hit2 | 5 |
| HitIce | 3 |
| Slash | 3 |
| 30FPS_AC2Q025_Blackhole | 3 |
| Recovery4 | 3 |
| Recovery5 | 3 |
| 30FPS_ACQ012_Poison | 3 |
| HitFire | 2 |
| Gun1 | 2 |
| Explosion2 | 2 |
| Howl | 2 |
| SlashFire | 2 |
| Fire2 | 2 |
| Explosion1 | 2 |
| SlashIce | 2 |
| Gun2 | 2 |
| Water3 | 2 |
| Cure4 | 2 |
| Ice1 | 2 |
| StateUp2 | 2 |
| SlashThunder | 2 |
| HitThunder | 2 |
| Recovery2 | 2 |
| Darkness2 | 2 |
| Thunder1 | 2 |
| Fire1 | 2 |
| StateDown1 | 2 |
| Hit1 | 2 |
| Special2 | 2 |
| Cure3 | 1 |
| Laser2 | 1 |
| Holy3 | 1 |
| Flash | 1 |
| Curse | 1 |
| Special1 | 1 |
| Revival2 | 1 |
| SlashSpecial3 | 1 |
| Earth4 | 1 |
| ClawPhoton | 1 |
| Wind2 | 1 |
| Wind4 | 1 |
| Recovery3 | 1 |
| HitPhoton | 1 |
| Light2 | 1 |
| BlastBeam1_2 By Coopziana | 1 |
| Breath | 1 |
| 30FPS_AC2Q012_Scan | 1 |
| Water5 | 1 |
| Wind3 | 1 |
| Darkness3 | 1 |
| StateDark | 1 |
| Mist | 1 |
| Gun3 | 1 |
| Cure2 | 1 |
| Sonic | 1 |
| 30FPS_ACQ017_Cure | 1 |
| Light1 | 1 |
| 30FPS_AC2Q011_Delete | 1 |
| StickSpecial1 | 1 |
| Thunder5 | 1 |
| Holy5 | 1 |
| 30FPS_AC2Q014_Logic_Bomb | 1 |
| Jlx2fTz | 1 |
| Light4 | 1 |
| Darkness5 | 1 |
| StateDown2 | 1 |
| Water1 | 1 |
| Laser1 | 1 |
| 30FPS_ACQ021_Fire | 1 |
| StickSpecial2 | 1 |
| Water2 | 1 |
| Blow | 1 |
| 30FPS_ACQ007_Potion | 1 |
| 30FPS_AC2Q003_Shot | 1 |
| StateDeath | 1 |
| Recovery1 | 1 |
| Holy2 | 1 |
| PreSpecial2 | 1 |
| Light3 | 1 |
| Song | 1 |
| 30FPS_ACQ009_Remedy | 1 |
| StickSpecial3 | 1 |
| Meteor | 1 |
| ArrowSpecial | 1 |
| HitSpecial2 | 1 |
| Holy4 | 1 |
| Holy1 | 1 |
| 30FPS_ACQ014_Curse | 1 |
| Darkness1 | 1 |
| StateDown3 | 1 |
| Earth5 | 1 |
| Magic1 | 1 |
| Magic2 | 1 |
| 30FPS_ACQ011_Bite | 1 |
| Earth3 | 1 |
| HitSpecial1 | 1 |
| SlashSpecial2 | 1 |
| 30FPS_AC2Q023_Star_Aura | 1 |
| Absorb | 1 |
| StateSilent | 1 |
| Cure1 | 1 |
| Barrier By Coopziana | 1 |
| Revival1 | 1 |
| StateSleep | 1 |
| 30FPS_AC3T026_Nova | 1 |
| Ice5 | 1 |
| ClawSpecial2 | 1 |
| ClawSpecial1 | 1 |
| 30FPS_AC2Q013_Virus | 1 |
| Wind5 | 1 |
| Thunder3 | 1 |
| Ice3 | 1 |
| Ice4 | 1 |
| Earth2 | 1 |
| StateChaos | 1 |
| Darkness4 | 1 |
| StickPhoton | 1 |
| 30FPS_AC2Q018_Barrier_Break | 1 |
| dozer4 | 1 |
| StateParalys | 1 |
| Earth1 | 1 |
| Water4 | 1 |
| Thunder2 | 1 |
| Ice2 | 1 |
| SlashPhoton | 1 |
| Special3 | 1 |
| Thunder4 | 1 |
| Fire3 | 1 |
| Pollen | 1 |
| PreSpecial3 | 1 |
| Wind1 | 1 |
| SlashSpecial1 | 1 |

## Conclusion

This catalog provides a comprehensive overview of all animations in the MegaEarth2049 game. Use this as a reference when creating or modifying animations, or when integrating animations with skills and other game systems.

---

*This documentation was generated on 04/19/2025 07:04:12 using the MegaEarth2049 Animation Analysis Tools.*
