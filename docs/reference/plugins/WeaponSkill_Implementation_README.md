> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# WeaponSkill Implementation Plan for MegaEarth2049

This document outlines a comprehensive plan for implementing the WeaponSkill plugin in the MegaEarth2049 project, including weapon skill designs, integration with existing systems, and implementation steps.

## Table of Contents
- [Plugin Overview](#plugin-overview)
- [Implementation Phases](#implementation-phases)
- [Weapon Skill Designs](#weapon-skill-designs)
- [Character-Specific Weapons](#character-specific-weapons)
- [System Integration](#system-integration)
- [Code Examples](#code-examples)
- [Testing Protocol](#testing-protocol)

## Plugin Overview

The WeaponSkill plugin by Sasuke KANNAZUKI allows weapons to use custom skills instead of the default Attack command. This is achieved by adding a note tag to weapons in the database:

```
<skill_id:X>
```

Where X is the ID of the skill to be used when attacking with that weapon.

### Key Features
- Weapons can trigger custom skills instead of the default attack
- For dual-wielding, the dominant hand's weapon skill is used
- Skills can have different targeting options (single, multiple, allies)
- Recommended to use skill type "none" (0) to avoid skill blocking

## Implementation Phases

### Phase 1: Basic Implementation
- Create foundational weapon skills
- Assign to initial weapons
- Test basic functionality

### Phase 2: Character-Specific Weapons
- Design unique weapons for each character
- Create skills that complement character roles
- Implement and test

### Phase 3: System Integration
- Integrate with Party Limit Gauge
- Create row-dependent weapons
- Add JP-enhancing weapons

### Phase 4: Cyberpunk-Themed Weapons
- Create thematic weapon categories
- Implement special effects fitting the setting
- Balance and test

### Phase 5: Progression System
- Implement tiered weapon system
- Create upgrade paths
- Balance throughout game progression

## Weapon Skill Designs

### Basic Weapon Skills

| Skill ID | Name | Type | Target | Effect | Animation |
|----------|------|------|--------|--------|-----------|
| 200 | Rapid Fire | None | Single Enemy | 2x 70% damage | Gunshot animation |
| 201 | Wide Slash | None | All Enemies | 70% damage to all | Slash animation |
| 202 | Precision Strike | None | Single Enemy | 90% damage + 10% crit chance | Stab animation |
| 203 | Neural Hack | None | Single Enemy | 80% damage + 30% chance to apply "Confused" | Electric animation |
| 204 | Repair Pulse | None | Single Ally | Heal 15% of target's max HP | Healing animation |

### Cyberpunk-Themed Skills

#### Hacking Weapons
| Skill ID | Name | Effect | Formula |
|----------|------|--------|---------|
| 250 | Malware Injection | Damage + DoT effect | `a.atk * 1.2` + State 31 (DoT) |
| 251 | DDoS Attack | Damage all + slow | `a.atk * 0.8` to all + State 32 (Slow) |
| 252 | Firewall Breach | Damage + barrier reduction | `a.atk * 1.0` + Reduce barrier by 50 |
| 253 | Ransomware | Damage + item block | `a.atk * 0.9` + State 33 (No Items) |

#### Cybernetic Enhancements
| Skill ID | Name | Effect | Formula |
|----------|------|--------|---------|
| 255 | Overclock | Damage + self ATK buff | `a.atk * 1.0` + Self Buff (ATK +25%) |
| 256 | System Purge | Damage + remove states | `a.atk * 0.9` + Remove all states from user |
| 257 | Power Surge | High damage + recoil | `a.atk * 1.8` + Self damage 10% of max HP |
| 258 | Emergency Backup | Damage + auto-revive | `a.atk * 0.8` + State 34 (Auto-Life) |

## Character-Specific Weapons

### Rex (Hacker)
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Data Spike | Data Breach | Damage + defense down | `<skill_id:210>` |
| Neural Disruptor | System Crash | Damage + chance to stun | `<skill_id:211>` |
| Hacking Deck | Backdoor Access | Damage + party damage buff | `<skill_id:212>` |

### Jen (Priest/Medic)
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Med-Staff | Healing Strike | Damage + heal ally | `<skill_id:215>` |
| Cleansing Gun | Purifying Shot | Damage + remove debuffs | `<skill_id:216>` |
| Regen Wand | Rejuvenation Wave | AoE damage + party heal | `<skill_id:217>` |

### Zack (Construction Worker)
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Pneumatic Hammer | Demolition Strike | Heavy damage + break barriers | `<skill_id:220>` |
| Scanning Drill | Structural Weakness | Damage + vulnerability | `<skill_id:221>` |
| Explosive Wrench | Area Demolition | AoE damage | `<skill_id:222>` |

### Zed (Mod Doctor)
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Mod Syringe | Experimental Injection | Damage + random status | `<skill_id:225>` |
| Overclocking Tool | Cybernetic Overload | Damage + chance for bonus | `<skill_id:226>` |
| Prototype Implanter | Unstable Modification | Variable damage | `<skill_id:227>` |

## System Integration

### Party Limit Gauge Integration
| Weapon | Skill | Effect | Note Tags |
|--------|-------|--------|-----------|
| Energy Blade | Energy Siphon | Damage + +2 Party Limit | `<skill_id:230>` + `<Ally Party Limit Gauge: +2>` |
| Tactical Scanner | Team Coordinator | Damage + conditional +3 Party Limit | `<skill_id:231>` |
| Limit Catalyst | Limit Breaker | Uses 1 Party Limit + 150% damage | `<skill_id:232>` + `<Party Limit Cost: 1>` |

### Row Formation Synergy
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Front-liner | Front Line Assault | 130% damage from front row | `<skill_id:235>` |
| Long-range Rifle | Ranged Precision | 120% damage from back row | `<skill_id:236>` |
| Tactical Weapon | Tactical Position | Row-based damage | `<skill_id:237>` |

### Job Points Enhancement
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Data Extractor | Knowledge Extractor | Damage + JP on kill | `<skill_id:240>` |
| Wisdom Staff | Experience Amplifier | Damage + party JP | `<skill_id:241>` |

## Weapon Progression System

### Tier 1: Basic Weapons (Early Game)
- Standard attacks or simple effects
- Example: Basic Pistol (`<skill_id:200>` - Rapid Fire)

### Tier 2: Advanced Weapons (Mid-Game)
- Additional effects like status or buffs
- Example: Advanced Neural Disruptor (`<skill_id:211>` - System Crash)

### Tier 3: Prototype Weapons (Late-Game)
- Multiple powerful effects
- Example: Quantum Device (`<skill_id:264>` - Quantum Uncertainty)

### Tier 4: Legendary Weapons (End-Game/Rare)
- Game-changing unique effects
- Example: A.S.P. Neutralizer (unique anti-A.S.P. skill)

## Code Examples

### Basic Damage Formula
```javascript
// Rapid Fire (Skill ID 200)
// Hits twice for 70% damage each
var baseDmg = a.atk * 0.7;
return baseDmg * 2;
```

### Row-Based Damage Formula
```javascript
// Front Line Assault (Skill ID 235)
var baseDmg = a.atk * 2;
// Check if user is in front row (row 0)
if (a.row() === 0) {
  return baseDmg * 1.3; // 130% damage from front row
} else {
  return baseDmg * 0.7; // 70% damage from other rows
}
```

### Action Sequence for JP Bonus
```javascript
// Knowledge Extractor (Skill ID 240)
<target action>
if (target.hp <= 0)
{
  var bonus = 25;
  user.gainJp(bonus, user.currentClass().id);
  // Show popup
  target.startAnimation(45, false, 0);
  var text = "+" + bonus + " JP";
  target.setupTextPopup(text, 0, 1, 3);
}
</target action>
```

## Testing Protocol

1. **Basic Functionality**: Verify each weapon correctly uses its assigned skill
2. **Dual Wielding**: Test with dual-wielding characters to ensure correct skill is used
3. **Target Selection**: Test skills with different targeting types (single, all, random)
4. **Effect Verification**: Confirm all additional effects (states, buffs, etc.) apply correctly
5. **Balance Testing**: Compare damage output and utility across different weapons
6. **Integration Testing**: Verify interactions with other systems (Party Limit, Row Formation, etc.)

## Balancing Considerations

1. **Damage Output**: Skills with additional effects should deal less base damage
2. **MP/TP Costs**: Consider adding costs to more powerful weapon skills
3. **Limitations**: Powerful effects might have chances to fail or limited uses
4. **Character Synergy**: Ensure weapons complement character roles
5. **Progression**: Scale weapon skills appropriately throughout the game

## Corporate-Themed Weapons

To further enhance the cyberpunk setting of MegaEarth2049, here are weapon designs themed after the five MegaCorps:

### NeuraTech Weapons
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| NeuraTech Mindwipe | Neural Purge | Damage + remove buffs | `<skill_id:260>` |
| Consciousness Probe | Memory Extraction | Damage + reveal weaknesses | `<skill_id:265>` |
| Synaptic Disruptor | Brain Scramble | Damage + confusion | `<skill_id:266>` |

### OmniCorp Weapons
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| OmniCorp Enforcer | Suppression Fire | Damage + reduce attack | `<skill_id:261>` |
| Riot Control Baton | Crowd Control | AoE damage + stun chance | `<skill_id:267>` |
| Executive Override | Corporate Takeover | Damage + steal buffs | `<skill_id:268>` |

### Vitalix Weapons
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Vitalix Mutagen | Genetic Corruption | Damage + random state | `<skill_id:262>` |
| Bio-Organic Injector | Cellular Modification | Damage + transform effect | `<skill_id:269>` |
| Symbiotic Parasite | Host Invasion | Damage + drain HP | `<skill_id:270>` |

### Armatek Weapons
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Armatek Demolisher | Structural Collapse | Heavy single target damage | `<skill_id:263>` |
| Industrial Crusher | Compression | Damage + defense down | `<skill_id:271>` |
| Nano-Concrete Sprayer | Rapid Hardening | Damage + barrier creation | `<skill_id:272>` |

### Quantum Dynamics Weapons
| Weapon | Skill | Effect | Note Tag |
|--------|-------|--------|----------|
| Quantum Device | Uncertainty Principle | Random effect each use | `<skill_id:264>` |
| Probability Shifter | Reality Distortion | Damage + status effect chance up | `<skill_id:273>` |
| Entanglement Projector | Quantum Link | Damage + share damage with other enemies | `<skill_id:274>` |
