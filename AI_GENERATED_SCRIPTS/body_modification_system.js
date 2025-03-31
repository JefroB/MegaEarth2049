/**
 * Body Modification System for MegaEarth 2049
 * 
 * This script implements the core mechanics of the body modification system,
 * including modification types, effects, installation procedures, and side effects.
 */

const fs = require('fs');
const path = require('path');
const { backupFile } = require('../utils/core/backup-utils');

// Constants for modification categories
const MOD_CATEGORIES = {
    CYBERNETIC: 'cybernetic',
    BIOLOGICAL: 'biological',
    AESTHETIC: 'aesthetic',
    EXPERIMENTAL: 'experimental'
};

// Constants for modification slots
const MOD_SLOTS = {
    HEAD: 'head',
    EYES: 'eyes',
    EARS: 'ears',
    FACE: 'face',
    NECK: 'neck',
    TORSO: 'torso',
    ARMS: 'arms',
    HANDS: 'hands',
    LEGS: 'legs',
    FEET: 'feet',
    SKIN: 'skin',
    INTERNAL: 'internal',
    NEURAL: 'neural',
    SPECIAL: 'special'
};

// Constants for modification rarity
const MOD_RARITY = {
    COMMON: 'common',
    UNCOMMON: 'uncommon',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary'
};

// Constants for modification origins
const MOD_ORIGINS = {
    CORPORATE: 'corporate',
    WASTELAND: 'wasteland',
    MILITARY: 'military',
    LUXURY: 'luxury',
    TRIBAL: 'tribal'
};

// Define body modifications
const BODY_MODIFICATIONS = [
    // Cybernetic Modifications
    {
        id: 'mantis_blades',
        name: 'Mantis Blades',
        description: 'Retractable blades installed in the forearms, allowing for devastating close-quarters combat capabilities.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.ARMS,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.MILITARY,
        cost: 5000,
        requirements: {
            level: 15,
            stats: { strength: 5 }
        },
        effects: {
            stats: { strength: 2, agility: 1 },
            skills: { melee: 3 },
            abilities: ['Blade Strike', 'Execution', 'Blade Parry']
        },
        sideEffects: [
            { 
                description: 'Occasional blade deployment during moments of stress or anger',
                chance: 0.15,
                severity: 'medium'
            },
            {
                description: 'Metallic taste in mouth after extended use',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: ['power_fists', 'bone_spurs'],
            synergy: ['neural_reflexes', 'targeting_optics']
        },
        iconIndex: 126
    },
    {
        id: 'targeting_optics',
        name: 'Targeting Optics',
        description: 'Cybernetic eye replacements that increase ranged accuracy through enhanced zoom, trajectory calculation, and environmental factor analysis.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.EYES,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.MILITARY,
        cost: 3500,
        requirements: {
            level: 10,
            stats: { perception: 4 }
        },
        effects: {
            stats: { perception: 3 },
            skills: { ranged: 2, detection: 2 },
            abilities: ['Precision Shot', 'Threat Scanning', 'Night Vision']
        },
        sideEffects: [
            { 
                description: 'Occasional visual glitches in bright light',
                chance: 0.2,
                severity: 'low'
            },
            {
                description: 'Targeting overlay sometimes persists when not in combat',
                chance: 0.1,
                severity: 'medium'
            }
        ],
        installationTime: 1.5, // hours
        recoveryTime: 24, // hours
        compatibility: {
            incompatible: ['chameleon_eyes', 'third_eye'],
            synergy: ['neural_processor', 'mantis_blades']
        },
        iconIndex: 79
    },
    {
        id: 'reinforced_skeleton',
        name: 'Reinforced Skeleton',
        description: 'Metal-infused bones that increase durability and provide resistance to physical damage.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 7000,
        requirements: {
            level: 20,
            stats: { endurance: 6 }
        },
        effects: {
            stats: { endurance: 3, strength: 2 },
            skills: { resistance: 3 },
            abilities: ['Impact Absorption', 'Bone Density', 'Fall Resistance']
        },
        sideEffects: [
            { 
                description: 'Increased weight makes swimming difficult',
                chance: 1.0,
                severity: 'medium'
            },
            {
                description: 'Joints occasionally lock up in cold weather',
                chance: 0.25,
                severity: 'medium'
            }
        ],
        installationTime: 4, // hours
        recoveryTime: 72, // hours
        compatibility: {
            incompatible: [],
            synergy: ['subdermal_armor', 'power_legs']
        },
        iconIndex: 128
    },
    {
        id: 'neural_processor',
        name: 'Neural Processor',
        description: 'Brain implant that enhances cognitive functions, provides HUD displays, and allows for direct interface with compatible technology.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.NEURAL,
        rarity: MOD_RARITY.EPIC,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 8000,
        requirements: {
            level: 25,
            stats: { intelligence: 7 }
        },
        effects: {
            stats: { intelligence: 3, perception: 2 },
            skills: { hacking: 3, technology: 3, science: 2 },
            abilities: ['Tech Interface', 'Data Analysis', 'Memory Enhancement']
        },
        sideEffects: [
            { 
                description: 'Occasional headaches when processing complex information',
                chance: 0.3,
                severity: 'low'
            },
            {
                description: 'Susceptibility to electronic interference',
                chance: 0.2,
                severity: 'high'
            },
            {
                description: 'Dreams sometimes include data streams and code fragments',
                chance: 0.5,
                severity: 'low'
            }
        ],
        installationTime: 3, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: ['consciousness_splitter', 'hive_mind'],
            synergy: ['targeting_optics', 'circuit_patterns']
        },
        iconIndex: 83
    },
    {
        id: 'power_fists',
        name: 'Power Fists',
        description: 'Mechanical hand replacements with enhanced striking power and reinforced knuckles.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.HANDS,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.WASTELAND,
        cost: 4000,
        requirements: {
            level: 12,
            stats: { strength: 5 }
        },
        effects: {
            stats: { strength: 3 },
            skills: { melee: 2, unarmed: 3 },
            abilities: ['Power Punch', 'Crushing Grip', 'Ground Pound']
        },
        sideEffects: [
            { 
                description: 'Reduced fine motor control makes delicate tasks difficult',
                chance: 0.8,
                severity: 'medium'
            },
            {
                description: 'Occasional power surges cause unintended strength',
                chance: 0.15,
                severity: 'medium'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 36, // hours
        compatibility: {
            incompatible: ['mantis_blades', 'prometheus_hand'],
            synergy: ['reinforced_skeleton', 'neural_reflexes']
        },
        iconIndex: 127
    },

    // Biological Modifications
    {
        id: 'toxin_filters',
        name: 'Toxin Filters',
        description: 'Modified liver and kidneys that neutralize poisons and environmental toxins, providing resistance to chemical attacks and contaminated consumables.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 3000,
        requirements: {
            level: 8,
            stats: { endurance: 3 }
        },
        effects: {
            stats: { endurance: 1 },
            skills: { survival: 2 },
            abilities: ['Poison Immunity', 'Alcohol Tolerance', 'Toxin Neutralization']
        },
        sideEffects: [
            { 
                description: 'Increased thirst due to enhanced filtration',
                chance: 0.7,
                severity: 'low'
            },
            {
                description: 'Medications have reduced effectiveness',
                chance: 0.5,
                severity: 'medium'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 24, // hours
        compatibility: {
            incompatible: [],
            synergy: ['oxygen_efficiency', 'regenerative_tissue']
        },
        iconIndex: 72
    },
    {
        id: 'adrenal_boosters',
        name: 'Adrenal Boosters',
        description: 'Enhanced adrenal glands that can produce more adrenaline on demand, providing bursts of strength, speed, and reaction time in combat situations.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.MILITARY,
        cost: 5500,
        requirements: {
            level: 15,
            stats: { agility: 5, endurance: 4 }
        },
        effects: {
            stats: { agility: 2, strength: 1, endurance: -1 },
            skills: { athletics: 2, reflexes: 3 },
            abilities: ['Adrenaline Rush', 'Combat Focus', 'Fight or Flight']
        },
        sideEffects: [
            { 
                description: 'Increased aggression and irritability',
                chance: 0.6,
                severity: 'medium'
            },
            {
                description: 'Occasional insomnia and restlessness',
                chance: 0.4,
                severity: 'low'
            },
            {
                description: 'Crash after adrenaline surge causes temporary weakness',
                chance: 0.3,
                severity: 'high'
            }
        ],
        installationTime: 2.5, // hours
        recoveryTime: 36, // hours
        compatibility: {
            incompatible: ['neural_dampeners'],
            synergy: ['neural_reflexes', 'muscle_grafts']
        },
        iconIndex: 72
    },
    {
        id: 'dermal_hardening',
        name: 'Dermal Hardening',
        description: 'Biological modification that toughens skin to provide natural armor, reducing damage from physical attacks and environmental hazards.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.WASTELAND,
        cost: 4000,
        requirements: {
            level: 10,
            stats: { endurance: 4 }
        },
        effects: {
            stats: { endurance: 2 },
            skills: { resistance: 3 },
            abilities: ['Damage Reduction', 'Environmental Protection', 'Impact Resistance']
        },
        sideEffects: [
            { 
                description: 'Reduced sensitivity to touch',
                chance: 0.8,
                severity: 'low'
            },
            {
                description: 'Skin becomes visibly textured and leathery',
                chance: 1.0,
                severity: 'low'
            },
            {
                description: 'Increased vulnerability to electrical damage',
                chance: 0.4,
                severity: 'medium'
            }
        ],
        installationTime: 3, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: ['chameleon_skin', 'circuit_patterns'],
            synergy: ['subdermal_armor', 'toxin_filters']
        },
        iconIndex: 72
    },
    {
        id: 'oxygen_efficiency',
        name: 'Oxygen Efficiency',
        description: 'Modified lungs that require less oxygen, allowing for longer breath-holding and survival in low-oxygen environments.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 3500,
        requirements: {
            level: 8,
            stats: { endurance: 3 }
        },
        effects: {
            stats: { endurance: 1 },
            skills: { swimming: 2, survival: 2 },
            abilities: ['Extended Breath', 'Altitude Adaptation', 'Smoke Resistance']
        },
        sideEffects: [
            { 
                description: 'Voice becomes deeper and raspier',
                chance: 0.7,
                severity: 'low'
            },
            {
                description: 'Occasional coughing fits when transitioning between environments',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 24, // hours
        compatibility: {
            incompatible: [],
            synergy: ['toxin_filters', 'regenerative_tissue']
        },
        iconIndex: 72
    },
    {
        id: 'regenerative_tissue',
        name: 'Regenerative Tissue',
        description: 'Enhanced healing capabilities through modified cell regeneration, allowing for faster recovery from injuries.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 6000,
        requirements: {
            level: 18,
            stats: { endurance: 5 }
        },
        effects: {
            stats: { endurance: 2 },
            skills: { survival: 1 },
            abilities: ['Rapid Healing', 'Wound Closure', 'Toxin Purging']
        },
        sideEffects: [
            { 
                description: 'Increased appetite to fuel regeneration',
                chance: 0.9,
                severity: 'low'
            },
            {
                description: 'Occasional growth of excess scar tissue',
                chance: 0.2,
                severity: 'medium'
            },
            {
                description: 'Heightened cancer risk due to accelerated cell division',
                chance: 0.1,
                severity: 'high'
            }
        ],
        installationTime: 3, // hours
        recoveryTime: 36, // hours
        compatibility: {
            incompatible: [],
            synergy: ['toxin_filters', 'oxygen_efficiency', 'dermal_hardening']
        },
        iconIndex: 72
    },

    // Aesthetic Modifications
    {
        id: 'circuit_patterns',
        name: 'Circuit Patterns',
        description: 'Glowing circuit-like patterns embedded under the skin, often connected to neural systems to display mood or system status.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.COMMON,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 1500,
        requirements: {
            level: 5
        },
        effects: {
            stats: {},
            skills: { charisma: 1 },
            abilities: ['Mood Display', 'Status Indicator', 'Low-Light Illumination']
        },
        sideEffects: [
            { 
                description: 'Patterns glow brighter during emotional states, revealing feelings',
                chance: 0.8,
                severity: 'low'
            },
            {
                description: 'Occasional flickering in electromagnetic fields',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 1, // hours
        recoveryTime: 12, // hours
        compatibility: {
            incompatible: ['dermal_hardening', 'chameleon_skin'],
            synergy: ['neural_processor', 'mood_indicator']
        },
        iconIndex: 144
    },
    {
        id: 'metallic_dermal_layers',
        name: 'Metallic Dermal Layers',
        description: 'Skin with a metallic sheen or texture, providing a distinctive appearance and minor protection.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.LUXURY,
        cost: 2500,
        requirements: {
            level: 7
        },
        effects: {
            stats: { endurance: 1 },
            skills: { charisma: 1, intimidation: 1 },
            abilities: ['Minor Damage Reduction', 'Temperature Regulation', 'Distinctive Appearance']
        },
        sideEffects: [
            { 
                description: 'Skin becomes conductive, increasing vulnerability to electrical damage',
                chance: 0.6,
                severity: 'medium'
            },
            {
                description: 'Temperature extremes cause uncomfortable expansion or contraction',
                chance: 0.4,
                severity: 'low'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 24, // hours
        compatibility: {
            incompatible: ['chameleon_skin'],
            synergy: ['subdermal_armor', 'circuit_patterns']
        },
        iconIndex: 144
    },
    {
        id: 'bioluminescent_tattoos',
        name: 'Bioluminescent Tattoos',
        description: 'Tattoos that glow in the dark using bioluminescent compounds, creating striking patterns visible in low light.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.COMMON,
        origin: MOD_ORIGINS.TRIBAL,
        cost: 1000,
        requirements: {
            level: 3
        },
        effects: {
            stats: {},
            skills: { charisma: 1 },
            abilities: ['Night Visibility', 'Mood Expression', 'Tribal Identification']
        },
        sideEffects: [
            { 
                description: 'Glow intensity fluctuates with emotional state',
                chance: 0.5,
                severity: 'low'
            },
            {
                description: 'Occasional itching when the compounds are active',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 1, // hours
        recoveryTime: 6, // hours
        compatibility: {
            incompatible: [],
            synergy: ['circuit_patterns', 'chameleon_skin']
        },
        iconIndex: 144
    },
    {
        id: 'structural_horns',
        name: 'Structural Horns',
        description: 'Decorative bone growths, typically on the head, that can be shaped into various designs for aesthetic or intimidation purposes.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.HEAD,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.TRIBAL,
        cost: 2000,
        requirements: {
            level: 6
        },
        effects: {
            stats: {},
            skills: { intimidation: 2 },
            abilities: ['Intimidation Display', 'Tribal Marking', 'Minor Defensive Weapon']
        },
        sideEffects: [
            { 
                description: 'Difficulty wearing standard headgear',
                chance: 1.0,
                severity: 'medium'
            },
            {
                description: 'Occasional headaches during horn growth phases',
                chance: 0.4,
                severity: 'low'
            },
            {
                description: 'Tendency to get caught on low doorways and obstacles',
                chance: 0.7,
                severity: 'low'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: [],
            synergy: ['dermal_hardening', 'reinforced_skeleton']
        },
        iconIndex: 145
    },
    {
        id: 'chromatic_eyes',
        name: 'Chromatic Eyes',
        description: 'Eyes that can change color at will, allowing for expression of mood or camouflage.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.EYES,
        rarity: MOD_RARITY.COMMON,
        origin: MOD_ORIGINS.LUXURY,
        cost: 1200,
        requirements: {
            level: 4
        },
        effects: {
            stats: {},
            skills: { charisma: 1, deception: 1 },
            abilities: ['Color Shifting', 'Mood Expression', 'Minor Light Sensitivity Adjustment']
        },
        sideEffects: [
            { 
                description: 'Eyes sometimes change color involuntarily with strong emotions',
                chance: 0.6,
                severity: 'low'
            },
            {
                description: 'Occasional brief color flickering when tired',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 1, // hours
        recoveryTime: 12, // hours
        compatibility: {
            incompatible: ['targeting_optics', 'third_eye'],
            synergy: ['circuit_patterns', 'mood_indicator']
        },
        iconIndex: 79
    },

    // Experimental Modifications
    {
        id: 'probability_manipulator',
        name: 'Probability Manipulator',
        description: 'Experimental modification that slightly increases luck at the cost of occasional reality glitches, altering probability fields around the user.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.NEURAL,
        rarity: MOD_RARITY.EPIC,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 10000,
        requirements: {
            level: 30,
            stats: { intelligence: 8, luck: 7 }
        },
        effects: {
            stats: { luck: 3 },
            skills: { gambling: 3 },
            abilities: ['Probability Shift', 'Critical Success Boost', 'Danger Sense']
        },
        sideEffects: [
            { 
                description: 'Random minor reality glitches in the immediate vicinity',
                chance: 0.7,
                severity: 'medium'
            },
            {
                description: 'Occasional déjà vu or premonition experiences',
                chance: 0.5,
                severity: 'low'
            },
            {
                description: 'Rare but severe probability inversions (good luck becomes bad)',
                chance: 0.1,
                severity: 'high'
            }
        ],
        installationTime: 4, // hours
        recoveryTime: 72, // hours
        compatibility: {
            incompatible: ['quantum_stabilizer', 'temporal_anchor'],
            synergy: ['neural_processor', 'quantum_uncertainty_principle']
        },
        iconIndex: 83
    },
    {
        id: 'dimensional_storage',
        name: 'Dimensional Storage',
        description: 'A small pocket dimension accessible through a body part, allowing for storage of items in a space that defies normal physics.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.SPECIAL,
        rarity: MOD_RARITY.EPIC,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 12000,
        requirements: {
            level: 35,
            stats: { intelligence: 8 }
        },
        effects: {
            stats: {},
            skills: {},
            abilities: ['Extra Inventory Space', 'Hidden Storage', 'Secure Item Containment']
        },
        sideEffects: [
            { 
                description: 'Occasional loss of items in the dimensional pocket',
                chance: 0.2,
                severity: 'high'
            },
            {
                description: 'Strange noises emanating from the storage space',
                chance: 0.4,
                severity: 'low'
            },
            {
                description: 'Items sometimes emerge covered in unknown substances',
                chance: 0.3,
                severity: 'medium'
            },
            {
                description: 'Rare dimensional leakage affecting nearby reality',
                chance: 0.05,
                severity: 'extreme'
            }
        ],
        installationTime: 5, // hours
        recoveryTime: 96, // hours
        compatibility: {
            incompatible: ['quantum_stabilizer'],
            synergy: ['probability_manipulator', 'stomach_of_holding']
        },
        iconIndex: 193
    },
    {
        id: 'quantum_stabilizer',
        name: 'Quantum Stabilizer',
        description: 'Reduces the effects of radiation and other environmental hazards by stabilizing the quantum state of cells.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 8000,
        requirements: {
            level: 25,
            stats: { endurance: 7, intelligence: 6 }
        },
        effects: {
            stats: { endurance: 2 },
            skills: { survival: 3 },
            abilities: ['Radiation Resistance', 'Quantum Field Stability', 'Environmental Adaptation']
        },
        sideEffects: [
            { 
                description: 'Occasional quantum "freezing" causing momentary paralysis',
                chance: 0.15,
                severity: 'high'
            },
            {
                description: 'Slight blurring of physical form at the edges',
                chance: 0.4,
                severity: 'low'
            },
            {
                description: 'Technology malfunctions more frequently in your presence',
                chance: 0.3,
                severity: 'medium'
            }
        ],
        installationTime: 3, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: ['probability_manipulator', 'dimensional_storage', 'temporal_anchor'],
            synergy: ['toxin_filters', 'oxygen_efficiency']
        },
        iconIndex: 83
    },
    {
        id: 'temporal_anchor',
        name: 'Temporal Anchor',
        description: 'Provides limited resistance to time-altering effects by partially anchoring the user in their own timestream.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.SPECIAL,
        rarity: MOD_RARITY.EPIC,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 15000,
        requirements: {
            level: 40,
            stats: { intelligence: 9, perception: 8 }
        },
        effects: {
            stats: { perception: 2 },
            skills: { reflexes: 3 },
            abilities: ['Temporal Resistance', 'Déjà Vu Sensing', 'Paradox Protection']
        },
        sideEffects: [
            { 
                description: 'Occasional perception of events slightly before they happen',
                chance: 0.3,
                severity: 'medium'
            },
            {
                description: 'Temporal echoes causing you to repeat actions unconsciously',
                chance: 0.2,
                severity: 'medium'
            },
            {
                description: 'Rare but severe temporal displacement episodes',
                chance: 0.05,
                severity: 'extreme'
            }
        ],
        installationTime: 6, // hours
        recoveryTime: 120, // hours
        compatibility: {
            incompatible: ['probability_manipulator', 'quantum_stabilizer'],
            synergy: ['neural_processor', 'chronos_module']
        },
        iconIndex: 193
    },
    {
        id: 'consciousness_splitter',
        name: 'Consciousness Splitter',
        description: 'Allows the user to perform two mental tasks simultaneously by partially dividing consciousness into separate streams.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.NEURAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 9000,
        requirements: {
            level: 30,
            stats: { intelligence: 8 }
        },
        effects: {
            stats: { intelligence: 2 },
            skills: { multitasking: 3 },
            abilities: ['Dual Processing', 'Split Attention', 'Parallel Thinking']
        },
        sideEffects: [
            { 
                description: 'Occasional personality fragmentation',
                chance: 0.2,
                severity: 'high'
            },
            {
                description: 'Talking to yourself more frequently',
                chance: 0.7,
                severity: 'low'
            },
            {
                description: 'Difficulty fully focusing on a single task',
                chance: 0.4,
                severity: 'medium'
            }
        ],
        installationTime: 4, // hours
        recoveryTime: 72, // hours
        compatibility: {
            incompatible: ['neural_processor', 'hive_mind'],
            synergy: ['neural_reflexes']
        },
        iconIndex: 83
    },

    // Legendary Modifications
    {
        id: 'prometheus_hand',
        name: 'The Prometheus Hand',
        description: 'A cybernetic hand that can generate and control fire, originally designed for Armatek\'s elite demolition teams.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.HANDS,
        rarity: MOD_RARITY.LEGENDARY,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 20000,
        requirements: {
            level: 35,
            stats: { strength: 7, intelligence: 7 },
            quest: 'Prometheus Unbound'
        },
        effects: {
            stats: { strength: 3, intelligence: 2 },
            skills: { pyrokinesis: 5, intimidation: 3 },
            abilities: ['Flame Generation', 'Heat Resistance', 'Fire Control', 'Ignition Touch']
        },
        sideEffects: [
            { 
                description: 'Occasionally ignites objects the user touches when emotional',
                chance: 0.4,
                severity: 'high'
            },
            {
                description: 'Constant feeling of warmth in the modified hand',
                chance: 1.0,
                severity: 'low'
            },
            {
                description: 'Dreams of fire and burning that feel unusually real',
                chance: 0.6,
                severity: 'medium'
            }
        ],
        installationTime: 8, // hours
        recoveryTime: 120, // hours
        compatibility: {
            incompatible: ['power_fists', 'chameleon_skin'],
            synergy: ['neural_processor', 'dermal_hardening']
        },
        iconIndex: 127
    },
    {
        id: 'chameleon_skin',
        name: 'Chameleon Skin',
        description: 'Advanced biological modification that allows near-perfect camouflage, developed by OmniCorp for covert operations.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.LEGENDARY,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 25000,
        requirements: {
            level: 40,
            stats: { agility: 8, perception: 7 },
            quest: 'Ghost Protocol'
        },
        effects: {
            stats: { agility: 2, perception: 2 },
            skills: { stealth: 5, survival: 2 },
            abilities: ['Active Camouflage', 'Thermal Adaptation', 'Pattern Mimicry']
        },
        sideEffects: [
            { 
                description: 'Sometimes activates involuntarily during moments of stress or fear',
                chance: 0.3,
                severity: 'high'
            },
            {
                description: 'Skin feels unusually sensitive to temperature changes',
                chance: 0.8,
                severity: 'low'
            },
            {
                description: 'Occasional difficulty returning to normal appearance',
                chance: 0.2,
                severity: 'medium'
            }
        ],
        installationTime: 10, // hours
        recoveryTime: 168, // hours
        compatibility: {
            incompatible: ['dermal_hardening', 'metallic_dermal_layers', 'prometheus_hand'],
            synergy: ['neural_reflexes', 'adrenal_boosters']
        },
        iconIndex: 72
    },
    {
        id: 'third_eye',
        name: 'The Third Eye',
        description: 'A mysterious implant of unknown origin that allows the user to see invisible entities and energy patterns.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.HEAD,
        rarity: MOD_RARITY.LEGENDARY,
        origin: MOD_ORIGINS.WASTELAND,
        cost: 30000,
        requirements: {
            level: 45,
            stats: { perception: 9, intelligence: 8 },
            quest: 'Visions Beyond'
        },
        effects: {
            stats: { perception: 4, intelligence: 2 },
            skills: { detection: 5, occult: 4 },
            abilities: ['Aura Sight', 'Energy Detection', 'Invisible Entity Perception', 'Dimensional Glimpse']
        },
        sideEffects: [
            { 
                description: 'Occasional visions of other realities that can be disorienting',
                chance: 0.5,
                severity: 'high'
            },
            {
                description: 'Constant subtle awareness of things others cannot see',
                chance: 1.0,
                severity: 'medium'
            },
            {
                description: 'Rare but intense prophetic dreams',
                chance: 0.1,
                severity: 'medium'
            },
            {
                description: 'Entities sometimes notice when you observe them',
                chance: 0.2,
                severity: 'extreme'
            }
        ],
        installationTime: 12, // hours
        recoveryTime: 240, // hours
        compatibility: {
            incompatible: ['targeting_optics', 'chromatic_eyes'],
            synergy: ['neural_processor', 'consciousness_splitter']
        },
        iconIndex: 79
    },
    {
        id: 'quantum_heart',
        name: 'Quantum Heart',
        description: 'A replacement heart that exists partially outside normal space-time, making the user extremely difficult to kill.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.LEGENDARY,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 35000,
        requirements: {
            level: 50,
            stats: { endurance: 10 },
            quest: 'Heart of the Matter'
        },
        effects: {
            stats: { endurance: 5 },
            skills: { survival: 5 },
            abilities: ['Death Resistance', 'Quantum Regeneration', 'Temporal Displacement', 'Immortality']
        },
        sideEffects: [
            { 
                description: 'Occasionally phases partially out of reality',
                chance: 0.3,
                severity: 'high'
            },
            {
                description: 'Heartbeat sometimes audible to others as a strange, echoing sound',
                chance: 0.6,
                severity: 'low'
            },
            {
                description: 'Rare moments where time flows differently for the user',
                chance: 0.15,
                severity: 'extreme'
            },
            {
                description: 'Constant feeling of being slightly out of sync with the world',
                chance: 1.0,
                severity: 'medium'
            }
        ],
        installationTime: 24, // hours
        recoveryTime: 336, // hours
        compatibility: {
            incompatible: ['regenerative_tissue'],
            synergy: ['temporal_anchor', 'quantum_stabilizer']
        },
        iconIndex: 72
    },
    {
        id: 'hive_mind',
        name: 'The Hive Mind',
        description: 'A neural implant that allows the user to mentally control insects and small creatures.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.NEURAL,
        rarity: MOD_RARITY.LEGENDARY,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 28000,
        requirements: {
            level: 40,
            stats: { intelligence: 9, charisma: 7 },
            quest: 'The Swarm'
        },
        effects: {
            stats: { intelligence: 3, charisma: 2 },
            skills: { animal_control: 5, surveillance: 4 },
            abilities: ['Insect Control', 'Swarm Perception', 'Collective Intelligence', 'Micro-Organism Communication']
        },
        sideEffects: [
            { 
                description: 'Sometimes adopts insect-like behaviors unconsciously',
                chance: 0.4,
                severity: 'medium'
            },
            {
                description: 'Constant background awareness of nearby insects',
                chance: 1.0,
                severity: 'low'
            },
            {
                description: 'Occasional difficulty separating personal thoughts from swarm input',
                chance: 0.3,
                severity: 'high'
            },
            {
                description: 'Insects are naturally drawn to the user',
                chance: 0.7,
                severity: 'medium'
            }
        ],
        installationTime: 14, // hours
        recoveryTime: 192, // hours
        compatibility: {
            incompatible: ['neural_processor', 'consciousness_splitter'],
            synergy: ['toxin_filters', 'oxygen_efficiency']
        },
        iconIndex: 83
    },
    {
        id: 'chronos_module',
        name: 'Chronos Module',
        description: 'A temporal manipulation device that can briefly slow time from the user\'s perspective.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.SPECIAL,
        rarity: MOD_RARITY.LEGENDARY,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 40000,
        requirements: {
            level: 50,
            stats: { agility: 10, intelligence: 9 },
            quest: 'Out of Time'
        },
        effects: {
            stats: { agility: 4, perception: 3 },
            skills: { reflexes: 5, combat: 4 },
            abilities: ['Time Dilation', 'Bullet Time', 'Temporal Awareness', 'Reaction Enhancement']
        },
        sideEffects: [
            { 
                description: 'Extended use causes rapid aging',
                chance: 0.8,
                severity: 'extreme'
            },
            {
                description: 'Occasional temporal displacement symptoms (seeing echoes of past/future)',
                chance: 0.5,
                severity: 'high'
            },
            {
                description: 'Perception of time becomes permanently altered',
                chance: 1.0,
                severity: 'medium'
            },
            {
                description: 'Rare but severe temporal paradoxes in immediate vicinity',
                chance: 0.05,
                severity: 'extreme'
            }
        ],
        installationTime: 20, // hours
        recoveryTime: 288, // hours
        compatibility: {
            incompatible: ['probability_manipulator'],
            synergy: ['neural_reflexes', 'temporal_anchor', 'quantum_heart']
        },
        iconIndex: 193
    }
];

// Unique modifications for special NPCs
const UNIQUE_NPC_MODIFICATIONS = [
    {
        id: 'zeds_third_arm',
        name: 'Zed\'s Third Arm',
        description: 'A fully functional third arm attached to Zed\'s back, allowing him to perform complex surgeries solo.',
        npc: 'Zed',
        category: MOD_CATEGORIES.CYBERNETIC,
        abilities: ['Multi-tasking Surgery', 'Back Scratching', 'Surprise Handshake']
    },
    {
        id: 'rex_neural_implant',
        name: 'Mysterious Neural Implant',
        description: 'The protagonist\'s mysterious neural implant of unknown origin, central to the main plot.',
        npc: 'Rex',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        abilities: ['A.S.P. Resistance', 'Memory Access', 'Unknown Potential']
    }
];

// Fast travel options to Zed's clinic
const FAST_TRAVEL_OPTIONS = [
    {
        id: 'mod_doctor_hotline',
        name: 'Mod Doctor Hotline',
        description: 'A special item that calls one of Zed\'s assistants to escort you to the clinic from almost anywhere.',
        obtainedFrom: 'Completing Zed\'s initial quest "The Guinea Pig"',
        cooldown: 24, // hours
        iconIndex: 186
    },
    {
        id: 'zeds_vip_card',
        name: 'Zed\'s VIP Card',
        description: 'Allows instant teleportation to the clinic from any safe location.',
        obtainedFrom: 'Completing the quest line "Spare Parts"',
        cooldown: 6, // hours
        iconIndex: 83
    },
    {
        id: 'distress_beacon',
        name: 'Distress Beacon',
        description: 'Emergency extraction to Zed\'s clinic, causing damage and temporary stat penalties.',
        obtainedFrom: 'Installing the "Emergency Protocols" modification',
        cooldown: 72, // hours
        penalties: {
            health: -30,
            stats: { strength: -2, endurance: -2, agility: -2 },
            duration: 4 // hours
        },
        iconIndex: 189
    }
];

// Zed's quests that unlock special modifications
const ZEDS_QUESTS = [
    {
        id: 'the_guinea_pig',
        name: 'The Guinea Pig',
        description: 'Zed needs someone to test his newest modification. What could go wrong?',
        reward: 'Mod Doctor Hotline',
        unlocks: ['basic_cybernetics', 'basic_aesthetics']
    },
    {
        id: 'spare_parts',
        name: 'Spare Parts',
        description: 'Help Zed "acquire" some rare components from a corporate research facility.',
        reward: 'Zed\'s VIP Card',
        unlocks: ['advanced_cybernetics', 'advanced_biologicals']
    },
    {
        id: 'prometheus_unbound',
        name: 'Prometheus Unbound',
        description: 'Track down an Armatek researcher who stole the prototype for the Prometheus Hand.',
        reward: 'Discount on The Prometheus Hand',
        unlocks: ['the_prometheus_hand']
    },
    {
        id: 'ghost_protocol',
        name: 'Ghost Protocol',
        description: 'Infiltrate an OmniCorp black site to steal their chameleon skin technology.',
        reward: 'Discount on Chameleon Skin',
        unlocks: ['chameleon_skin']
    },
    {
        id: 'visions_beyond',
        name: 'Visions Beyond',
        description: 'Help Zed communicate with a mysterious entity that promises the secret of the Third Eye.',
        reward: 'Discount on The Third Eye',
        unlocks: ['the_third_eye']
    },
    {
        id: 'heart_of_the_matter',
        name: 'Heart of the Matter',
        description: 'Recover a quantum stabilizer from a crashed corporate transport to complete the Quantum Heart.',
        reward: 'Discount on Quantum Heart',
        unlocks: ['quantum_heart']
    },
    {
        id: 'the_swarm',
        name: 'The Swarm',
        description: 'Collect rare insect specimens from the toxic wastes for Zed\'s hive mind research.',
        reward: 'Discount on The Hive Mind',
        unlocks: ['the_hive_mind']
    },
    {
        id: 'out_of_time',
        name: 'Out of Time',
        description: 'Enter a temporal anomaly to retrieve the components needed for the Chronos Module.',
        reward: 'Discount on Chronos Module',
        unlocks: ['chronos_module']
    }
];

/**
 * Gets all available modifications based on player level and completed quests
 * @param {number} playerLevel - The player's current level
 * @param {Array<string>} completedQuests - Array of completed quest IDs
 * @returns {Array} - Available modifications
 */
function getAvailableModifications(playerLevel, completedQuests = []) {
    return BODY_MODIFICATIONS.filter(mod => {
        // Check level requirement
        if (mod.requirements.level > playerLevel) {
            return false;
        }
        
        // Check quest requirement if present
        if (mod.requirements.quest && !completedQuests.includes(mod.requirements.quest)) {
            return false;
        }
        
        return true;
    });
}

/**
 * Calculates the final price of a modification based on player stats and reputation with Zed
 * @param {Object} modification - The modification object
 * @param {number} reputationWithZed - Reputation level with Zed (0-100)
 * @param {Object} playerStats - Player's stats
 * @returns {number} - The final price
 */
function calculateModificationPrice(modification, reputationWithZed = 0, playerStats = {}) {
    let price = modification.cost;
    
    // Apply reputation discount (up to 30%)
    const reputationDiscount = Math.min(reputationWithZed * 0.3, 30) / 100;
    price = price * (1 - reputationDiscount);
    
    // Apply charisma discount (up to 20%)
    if (playerStats.charisma) {
        const charismaDiscount = Math.min(playerStats.charisma * 0.02, 0.2);
        price = price * (1 - charismaDiscount);
    }
    
    // Apply rarity multiplier
    const rarityMultipliers = {
        [MOD_RARITY.COMMON]: 1,
        [MOD_RARITY.UNCOMMON]: 1.2,
        [MOD_RARITY.RARE]: 1.5,
        [MOD_RARITY.EPIC]: 2,
        [MOD_RARITY.LEGENDARY]: 3
    };
    
    price = price * (rarityMultipliers[modification.rarity] || 1);
    
    return Math.round(price);
}

/**
 * Determines if a modification is compatible with currently installed modifications
 * @param {Object} newMod - The modification to check
 * @param {Array} installedMods - Array of currently installed modification IDs
 * @returns {Object} - Compatibility information
 */
function checkModificationCompatibility(newMod, installedMods = []) {
    const incompatible = [];
    const synergies = [];
    
    // Check for incompatibilities
    if (newMod.compatibility && newMod.compatibility.incompatible) {
        for (const incompatibleModId of newMod.compatibility.incompatible) {
            if (installedMods.includes(incompatibleModId)) {
                const incompatibleMod = BODY_MODIFICATIONS.find(mod => mod.id === incompatibleModId);
                if (incompatibleMod) {
                    incompatible.push(incompatibleMod.name);
                }
            }
        }
    }
    
    // Check for synergies
    if (newMod.compatibility && newMod.compatibility.synergy) {
        for (const synergyModId of newMod.compatibility.synergy) {
            if (installedMods.includes(synergyModId)) {
                const synergyMod = BODY_MODIFICATIONS.find(mod => mod.id === synergyModId);
                if (synergyMod) {
                    synergies.push(synergyMod.name);
                }
            }
        }
    }
    
    return {
        isCompatible: incompatible.length === 0,
        incompatible,
        synergies
    };
}

/**
 * Generates random side effects for a modification based on its defined chances
 * @param {Object} modification - The modification object
 * @returns {Array} - Active side effects
 */
function generateSideEffects(modification) {
    const activeSideEffects = [];
    
    if (modification.sideEffects) {
        for (const sideEffect of modification.sideEffects) {
            const roll = Math.random();
            if (roll <= sideEffect.chance) {
                activeSideEffects.push({
                    description: sideEffect.description,
                    severity: sideEffect.severity
                });
            }
        }
    }
    
    return activeSideEffects;
}

/**
 * Creates a new map for Zed's clinic
 * @param {string} outputPath - Path to save the map JSON
 * @returns {boolean} - Success status
 */
function createClinicMap(outputPath) {
    try {
        // Create a basic map structure for Zed's clinic
        const clinicMap = {
            "autoplayBgm": false,
            "autoplayBgs": false,
            "battleback1Name": "Cobblestone1",
            "battleback2Name": "Hospital",
            "bgm": {
                "name": "Dungeon3",
                "pan": 0,
                "pitch": 100,
                "volume": 90
            },
            "bgs": {
                "name": "Drips",
                "pan": 0,
                "pitch": 100,
                "volume": 40
            },
            "disableDashing": false,
            "displayName": "The Squeaky Clean",
            "encounterList": [],
            "encounterStep": 30,
            "height": 20,
            "note": "Zed's body modification clinic",
            "parallaxLoopX": false,
            "parallaxLoopY": false,
            "parallaxName": "",
            "parallaxShow": true,
            "parallaxSx": 0,
            "parallaxSy": 0,
            "scrollType": 0,
            "specifyBattleback": true,
            "tilesetId": 5,
            "width": 25,
            "data": [], // This would be a large array of tile data
            "events": [
                null, // Event 0 is always null
                {
                    "id": 1,
                    "name": "Zed",
                    "note": "Main mod doctor",
                    "pages": [
                        {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": false,
                            "image": {
                                "characterIndex": 0,
                                "characterName": "Actor1",
                                "direction": 2,
                                "pattern": 1,
                                "tileId": 0
                            },
                            "list": [
                                {
                                    "code": 101,
                                    "indent": 0,
                                    "parameters": ["Actor1", 0, 0, 2]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["ZED: Well, well! Another brave soul seeking"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["improvement! Or is it desperation?"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["*adjusts surgical mask with bloodstained gloves*"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["What'll it be today? Something practical?"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["Something deadly? Something... weird?"]
                                },
                                {
                                    "code": 102,
                                    "indent": 0,
                                    "parameters": [["Browse Modifications", "Ask About Quests", "Leave"], 1, 0, 2, 0]
                                },
                                {
                                    "code": 402,
                                    "indent": 0,
                                    "parameters": [0, "Browse Modifications"]
                                },
                                {
                                    "code": 356,
                                    "indent": 1,
                                    "parameters": ["OpenBodyModificationShop"]
                                },
                                {
                                    "code": 0,
                                    "indent": 1,
                                    "parameters": []
                                },
                                {
                                    "code": 402,
                                    "indent": 0,
                                    "parameters": [1, "Ask About Quests"]
                                },
                                {
                                    "code": 356,
                                    "indent": 1,
                                    "parameters": ["OpenZedQuestMenu"]
                                },
                                {
                                    "code": 0,
                                    "indent": 1,
                                    "parameters": []
                                },
                                {
                                    "code": 402,
                                    "indent": 0,
                                    "parameters": [2, "Leave"]
                                },
                                {
                                    "code": 101,
                                    "indent": 1,
                                    "parameters": ["Actor1", 0, 0, 2]
                                },
                                {
                                    "code": 401,
                                    "indent": 1,
                                    "parameters": ["ZED: Leaving with all your original parts?"]
                                },
                                {
                                    "code": 401,
                                    "indent": 1,
                                    "parameters": ["How disappointingly conventional!"]
                                },
                                {
                                    "code": 0,
                                    "indent": 1,
                                    "parameters": []
                                },
                                {
                                    "code": 404,
                                    "indent": 0,
                                    "parameters": []
                                },
                                {
                                    "code": 0,
                                    "indent": 0,
                                    "parameters": []
                                }
                            ],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [
                                    {
                                        "code": 0,
                                        "parameters": []
                                    }
                                ],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 1,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 0,
                            "walkAnime": true
                        }
                    ],
                    "x": 12,
                    "y": 10
                },
                {
                    "id": 2,
                    "name": "Assistant",
                    "note": "Zed's assistant",
                    "pages": [
                        {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": false,
                            "image": {
                                "characterIndex": 1,
                                "characterName": "People1",
                                "direction": 2,
                                "pattern": 1,
                                "tileId": 0
                            },
                            "list": [
                                {
                                    "code": 101,
                                    "indent": 0,
                                    "parameters": ["People1", 1, 0, 2]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["ASSISTANT: *nervously organizing tools*"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["I used to be a patient, you know. Now I"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["help out to pay off my... modifications."]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["*lowers voice* Word of advice: always ask"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["what the side effects are BEFORE the surgery."]
                                },
                                {
                                    "code": 0,
                                    "indent": 0,
                                    "parameters": []
                                }
                            ],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [
                                    {
                                        "code": 0,
                                        "parameters": []
                                    }
                                ],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 1,
                            "priorityType": 1,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 0,
                            "walkAnime": true
                        }
                    ],
                    "x": 15,
                    "y": 8
                },
                {
                    "id": 3,
                    "name": "Operating Table",
                    "note": "Main surgery station",
                    "pages": [
                        {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": true,
                            "image": {
                                "characterIndex": 0,
                                "characterName": "",
                                "direction": 2,
                                "pattern": 1,
                                "tileId": 48
                            },
                            "list": [
                                {
                                    "code": 101,
                                    "indent": 0,
                                    "parameters": ["", 0, 0, 2]
                                },
/**
 * Body Modification System for MegaEarth 2049
 * 
 * This script implements the core mechanics of the body modification system,
 * including modification types, effects, installation procedures, and side effects.
 */

const fs = require('fs');
const path = require('path');
const { backupFile } = require('../utils/core/backup-utils');

// Constants for modification categories
const MOD_CATEGORIES = {
    CYBERNETIC: 'cybernetic',
    BIOLOGICAL: 'biological',
    AESTHETIC: 'aesthetic',
    EXPERIMENTAL: 'experimental'
};

// Constants for modification slots
const MOD_SLOTS = {
    HEAD: 'head',
    EYES: 'eyes',
    EARS: 'ears',
    FACE: 'face',
    NECK: 'neck',
    TORSO: 'torso',
    ARMS: 'arms',
    HANDS: 'hands',
    LEGS: 'legs',
    FEET: 'feet',
    SKIN: 'skin',
    INTERNAL: 'internal',
    NEURAL: 'neural',
    SPECIAL: 'special'
};

// Constants for modification rarity
const MOD_RARITY = {
    COMMON: 'common',
    UNCOMMON: 'uncommon',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary'
};

// Constants for modification origins
const MOD_ORIGINS = {
    CORPORATE: 'corporate',
    WASTELAND: 'wasteland',
    MILITARY: 'military',
    LUXURY: 'luxury',
    TRIBAL: 'tribal'
};

// Define body modifications
const BODY_MODIFICATIONS = [
    // Cybernetic Modifications
    {
        id: 'mantis_blades',
        name: 'Mantis Blades',
        description: 'Retractable blades installed in the forearms, allowing for devastating close-quarters combat capabilities.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.ARMS,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.MILITARY,
        cost: 5000,
        requirements: {
            level: 15,
            stats: { strength: 5 }
        },
        effects: {
            stats: { strength: 2, agility: 1 },
            skills: { melee: 3 },
            abilities: ['Blade Strike', 'Execution', 'Blade Parry']
        },
        sideEffects: [
            { 
                description: 'Occasional blade deployment during moments of stress or anger',
                chance: 0.15,
                severity: 'medium'
            },
            {
                description: 'Metallic taste in mouth after extended use',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: ['power_fists', 'bone_spurs'],
            synergy: ['neural_reflexes', 'targeting_optics']
        },
        iconIndex: 126
    },
    {
        id: 'targeting_optics',
        name: 'Targeting Optics',
        description: 'Cybernetic eye replacements that increase ranged accuracy through enhanced zoom, trajectory calculation, and environmental factor analysis.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.EYES,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.MILITARY,
        cost: 3500,
        requirements: {
            level: 10,
            stats: { perception: 4 }
        },
        effects: {
            stats: { perception: 3 },
            skills: { ranged: 2, detection: 2 },
            abilities: ['Precision Shot', 'Threat Scanning', 'Night Vision']
        },
        sideEffects: [
            { 
                description: 'Occasional visual glitches in bright light',
                chance: 0.2,
                severity: 'low'
            },
            {
                description: 'Targeting overlay sometimes persists when not in combat',
                chance: 0.1,
                severity: 'medium'
            }
        ],
        installationTime: 1.5, // hours
        recoveryTime: 24, // hours
        compatibility: {
            incompatible: ['chameleon_eyes', 'third_eye'],
            synergy: ['neural_processor', 'mantis_blades']
        },
        iconIndex: 79
    },
    {
        id: 'reinforced_skeleton',
        name: 'Reinforced Skeleton',
        description: 'Metal-infused bones that increase durability and provide resistance to physical damage.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 7000,
        requirements: {
            level: 20,
            stats: { endurance: 6 }
        },
        effects: {
            stats: { endurance: 3, strength: 2 },
            skills: { resistance: 3 },
            abilities: ['Impact Absorption', 'Bone Density', 'Fall Resistance']
        },
        sideEffects: [
            { 
                description: 'Increased weight makes swimming difficult',
                chance: 1.0,
                severity: 'medium'
            },
            {
                description: 'Joints occasionally lock up in cold weather',
                chance: 0.25,
                severity: 'medium'
            }
        ],
        installationTime: 4, // hours
        recoveryTime: 72, // hours
        compatibility: {
            incompatible: [],
            synergy: ['subdermal_armor', 'power_legs']
        },
        iconIndex: 128
    },
    {
        id: 'neural_processor',
        name: 'Neural Processor',
        description: 'Brain implant that enhances cognitive functions, provides HUD displays, and allows for direct interface with compatible technology.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.NEURAL,
        rarity: MOD_RARITY.EPIC,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 8000,
        requirements: {
            level: 25,
            stats: { intelligence: 7 }
        },
        effects: {
            stats: { intelligence: 3, perception: 2 },
            skills: { hacking: 3, technology: 3, science: 2 },
            abilities: ['Tech Interface', 'Data Analysis', 'Memory Enhancement']
        },
        sideEffects: [
            { 
                description: 'Occasional headaches when processing complex information',
                chance: 0.3,
                severity: 'low'
            },
            {
                description: 'Susceptibility to electronic interference',
                chance: 0.2,
                severity: 'high'
            },
            {
                description: 'Dreams sometimes include data streams and code fragments',
                chance: 0.5,
                severity: 'low'
            }
        ],
        installationTime: 3, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: ['consciousness_splitter', 'hive_mind'],
            synergy: ['targeting_optics', 'circuit_patterns']
        },
        iconIndex: 83
    },
    {
        id: 'power_fists',
        name: 'Power Fists',
        description: 'Mechanical hand replacements with enhanced striking power and reinforced knuckles.',
        category: MOD_CATEGORIES.CYBERNETIC,
        slot: MOD_SLOTS.HANDS,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.WASTELAND,
        cost: 4000,
        requirements: {
            level: 12,
            stats: { strength: 5 }
        },
        effects: {
            stats: { strength: 3 },
            skills: { melee: 2, unarmed: 3 },
            abilities: ['Power Punch', 'Crushing Grip', 'Ground Pound']
        },
        sideEffects: [
            { 
                description: 'Reduced fine motor control makes delicate tasks difficult',
                chance: 0.8,
                severity: 'medium'
            },
            {
                description: 'Occasional power surges cause unintended strength',
                chance: 0.15,
                severity: 'medium'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 36, // hours
        compatibility: {
            incompatible: ['mantis_blades', 'prometheus_hand'],
            synergy: ['reinforced_skeleton', 'neural_reflexes']
        },
        iconIndex: 127
    },

    // Biological Modifications
    {
        id: 'toxin_filters',
        name: 'Toxin Filters',
        description: 'Modified liver and kidneys that neutralize poisons and environmental toxins, providing resistance to chemical attacks and contaminated consumables.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 3000,
        requirements: {
            level: 8,
            stats: { endurance: 3 }
        },
        effects: {
            stats: { endurance: 1 },
            skills: { survival: 2 },
            abilities: ['Poison Immunity', 'Alcohol Tolerance', 'Toxin Neutralization']
        },
        sideEffects: [
            { 
                description: 'Increased thirst due to enhanced filtration',
                chance: 0.7,
                severity: 'low'
            },
            {
                description: 'Medications have reduced effectiveness',
                chance: 0.5,
                severity: 'medium'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 24, // hours
        compatibility: {
            incompatible: [],
            synergy: ['oxygen_efficiency', 'regenerative_tissue']
        },
        iconIndex: 72
    },
    {
        id: 'adrenal_boosters',
        name: 'Adrenal Boosters',
        description: 'Enhanced adrenal glands that can produce more adrenaline on demand, providing bursts of strength, speed, and reaction time in combat situations.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.MILITARY,
        cost: 5500,
        requirements: {
            level: 15,
            stats: { agility: 5, endurance: 4 }
        },
        effects: {
            stats: { agility: 2, strength: 1, endurance: -1 },
            skills: { athletics: 2, reflexes: 3 },
            abilities: ['Adrenaline Rush', 'Combat Focus', 'Fight or Flight']
        },
        sideEffects: [
            { 
                description: 'Increased aggression and irritability',
                chance: 0.6,
                severity: 'medium'
            },
            {
                description: 'Occasional insomnia and restlessness',
                chance: 0.4,
                severity: 'low'
            },
            {
                description: 'Crash after adrenaline surge causes temporary weakness',
                chance: 0.3,
                severity: 'high'
            }
        ],
        installationTime: 2.5, // hours
        recoveryTime: 36, // hours
        compatibility: {
            incompatible: ['neural_dampeners'],
            synergy: ['neural_reflexes', 'muscle_grafts']
        },
        iconIndex: 72
    },
    {
        id: 'dermal_hardening',
        name: 'Dermal Hardening',
        description: 'Biological modification that toughens skin to provide natural armor, reducing damage from physical attacks and environmental hazards.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.WASTELAND,
        cost: 4000,
        requirements: {
            level: 10,
            stats: { endurance: 4 }
        },
        effects: {
            stats: { endurance: 2 },
            skills: { resistance: 3 },
            abilities: ['Damage Reduction', 'Environmental Protection', 'Impact Resistance']
        },
        sideEffects: [
            { 
                description: 'Reduced sensitivity to touch',
                chance: 0.8,
                severity: 'low'
            },
            {
                description: 'Skin becomes visibly textured and leathery',
                chance: 1.0,
                severity: 'low'
            },
            {
                description: 'Increased vulnerability to electrical damage',
                chance: 0.4,
                severity: 'medium'
            }
        ],
        installationTime: 3, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: ['chameleon_skin', 'circuit_patterns'],
            synergy: ['subdermal_armor', 'toxin_filters']
        },
        iconIndex: 72
    },
    {
        id: 'oxygen_efficiency',
        name: 'Oxygen Efficiency',
        description: 'Modified lungs that require less oxygen, allowing for longer breath-holding and survival in low-oxygen environments.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 3500,
        requirements: {
            level: 8,
            stats: { endurance: 3 }
        },
        effects: {
            stats: { endurance: 1 },
            skills: { swimming: 2, survival: 2 },
            abilities: ['Extended Breath', 'Altitude Adaptation', 'Smoke Resistance']
        },
        sideEffects: [
            { 
                description: 'Voice becomes deeper and raspier',
                chance: 0.7,
                severity: 'low'
            },
            {
                description: 'Occasional coughing fits when transitioning between environments',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 24, // hours
        compatibility: {
            incompatible: [],
            synergy: ['toxin_filters', 'regenerative_tissue']
        },
        iconIndex: 72
    },
    {
        id: 'regenerative_tissue',
        name: 'Regenerative Tissue',
        description: 'Enhanced healing capabilities through modified cell regeneration, allowing for faster recovery from injuries.',
        category: MOD_CATEGORIES.BIOLOGICAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 6000,
        requirements: {
            level: 18,
            stats: { endurance: 5 }
        },
        effects: {
            stats: { endurance: 2 },
            skills: { survival: 1 },
            abilities: ['Rapid Healing', 'Wound Closure', 'Toxin Purging']
        },
        sideEffects: [
            { 
                description: 'Increased appetite to fuel regeneration',
                chance: 0.9,
                severity: 'low'
            },
            {
                description: 'Occasional growth of excess scar tissue',
                chance: 0.2,
                severity: 'medium'
            },
            {
                description: 'Heightened cancer risk due to accelerated cell division',
                chance: 0.1,
                severity: 'high'
            }
        ],
        installationTime: 3, // hours
        recoveryTime: 36, // hours
        compatibility: {
            incompatible: [],
            synergy: ['toxin_filters', 'oxygen_efficiency', 'dermal_hardening']
        },
        iconIndex: 72
    },

    // Aesthetic Modifications
    {
        id: 'circuit_patterns',
        name: 'Circuit Patterns',
        description: 'Glowing circuit-like patterns embedded under the skin, often connected to neural systems to display mood or system status.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.COMMON,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 1500,
        requirements: {
            level: 5
        },
        effects: {
            stats: {},
            skills: { charisma: 1 },
            abilities: ['Mood Display', 'Status Indicator', 'Low-Light Illumination']
        },
        sideEffects: [
            { 
                description: 'Patterns glow brighter during emotional states, revealing feelings',
                chance: 0.8,
                severity: 'low'
            },
            {
                description: 'Occasional flickering in electromagnetic fields',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 1, // hours
        recoveryTime: 12, // hours
        compatibility: {
            incompatible: ['dermal_hardening', 'chameleon_skin'],
            synergy: ['neural_processor', 'mood_indicator']
        },
        iconIndex: 144
    },
    {
        id: 'metallic_dermal_layers',
        name: 'Metallic Dermal Layers',
        description: 'Skin with a metallic sheen or texture, providing a distinctive appearance and minor protection.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.LUXURY,
        cost: 2500,
        requirements: {
            level: 7
        },
        effects: {
            stats: { endurance: 1 },
            skills: { charisma: 1, intimidation: 1 },
            abilities: ['Minor Damage Reduction', 'Temperature Regulation', 'Distinctive Appearance']
        },
        sideEffects: [
            { 
                description: 'Skin becomes conductive, increasing vulnerability to electrical damage',
                chance: 0.6,
                severity: 'medium'
            },
            {
                description: 'Temperature extremes cause uncomfortable expansion or contraction',
                chance: 0.4,
                severity: 'low'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 24, // hours
        compatibility: {
            incompatible: ['chameleon_skin'],
            synergy: ['subdermal_armor', 'circuit_patterns']
        },
        iconIndex: 144
    },
    {
        id: 'bioluminescent_tattoos',
        name: 'Bioluminescent Tattoos',
        description: 'Tattoos that glow in the dark using bioluminescent compounds, creating striking patterns visible in low light.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.SKIN,
        rarity: MOD_RARITY.COMMON,
        origin: MOD_ORIGINS.TRIBAL,
        cost: 1000,
        requirements: {
            level: 3
        },
        effects: {
            stats: {},
            skills: { charisma: 1 },
            abilities: ['Night Visibility', 'Mood Expression', 'Tribal Identification']
        },
        sideEffects: [
            { 
                description: 'Glow intensity fluctuates with emotional state',
                chance: 0.5,
                severity: 'low'
            },
            {
                description: 'Occasional itching when the compounds are active',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 1, // hours
        recoveryTime: 6, // hours
        compatibility: {
            incompatible: [],
            synergy: ['circuit_patterns', 'chameleon_skin']
        },
        iconIndex: 144
    },
    {
        id: 'structural_horns',
        name: 'Structural Horns',
        description: 'Decorative bone growths, typically on the head, that can be shaped into various designs for aesthetic or intimidation purposes.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.HEAD,
        rarity: MOD_RARITY.UNCOMMON,
        origin: MOD_ORIGINS.TRIBAL,
        cost: 2000,
        requirements: {
            level: 6
        },
        effects: {
            stats: {},
            skills: { intimidation: 2 },
            abilities: ['Intimidation Display', 'Tribal Marking', 'Minor Defensive Weapon']
        },
        sideEffects: [
            { 
                description: 'Difficulty wearing standard headgear',
                chance: 1.0,
                severity: 'medium'
            },
            {
                description: 'Occasional headaches during horn growth phases',
                chance: 0.4,
                severity: 'low'
            },
            {
                description: 'Tendency to get caught on low doorways and obstacles',
                chance: 0.7,
                severity: 'low'
            }
        ],
        installationTime: 2, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: [],
            synergy: ['dermal_hardening', 'reinforced_skeleton']
        },
        iconIndex: 145
    },
    {
        id: 'chromatic_eyes',
        name: 'Chromatic Eyes',
        description: 'Eyes that can change color at will, allowing for expression of mood or camouflage.',
        category: MOD_CATEGORIES.AESTHETIC,
        slot: MOD_SLOTS.EYES,
        rarity: MOD_RARITY.COMMON,
        origin: MOD_ORIGINS.LUXURY,
        cost: 1200,
        requirements: {
            level: 4
        },
        effects: {
            stats: {},
            skills: { charisma: 1, deception: 1 },
            abilities: ['Color Shifting', 'Mood Expression', 'Minor Light Sensitivity Adjustment']
        },
        sideEffects: [
            { 
                description: 'Eyes sometimes change color involuntarily with strong emotions',
                chance: 0.6,
                severity: 'low'
            },
            {
                description: 'Occasional brief color flickering when tired',
                chance: 0.3,
                severity: 'low'
            }
        ],
        installationTime: 1, // hours
        recoveryTime: 12, // hours
        compatibility: {
            incompatible: ['targeting_optics', 'third_eye'],
            synergy: ['circuit_patterns', 'mood_indicator']
        },
        iconIndex: 79
    },

    // Experimental Modifications
    {
        id: 'probability_manipulator',
        name: 'Probability Manipulator',
        description: 'Experimental modification that slightly increases luck at the cost of occasional reality glitches, altering probability fields around the user.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.NEURAL,
        rarity: MOD_RARITY.EPIC,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 10000,
        requirements: {
            level: 30,
            stats: { intelligence: 8, luck: 7 }
        },
        effects: {
            stats: { luck: 3 },
            skills: { gambling: 3 },
            abilities: ['Probability Shift', 'Critical Success Boost', 'Danger Sense']
        },
        sideEffects: [
            { 
                description: 'Random minor reality glitches in the immediate vicinity',
                chance: 0.7,
                severity: 'medium'
            },
            {
                description: 'Occasional déjà vu or premonition experiences',
                chance: 0.5,
                severity: 'low'
            },
            {
                description: 'Rare but severe probability inversions (good luck becomes bad)',
                chance: 0.1,
                severity: 'high'
            }
        ],
        installationTime: 4, // hours
        recoveryTime: 72, // hours
        compatibility: {
            incompatible: ['quantum_stabilizer', 'temporal_anchor'],
            synergy: ['neural_processor', 'quantum_uncertainty_principle']
        },
        iconIndex: 83
    },
    {
        id: 'dimensional_storage',
        name: 'Dimensional Storage',
        description: 'A small pocket dimension accessible through a body part, allowing for storage of items in a space that defies normal physics.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.SPECIAL,
        rarity: MOD_RARITY.EPIC,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 12000,
        requirements: {
            level: 35,
            stats: { intelligence: 8 }
        },
        effects: {
            stats: {},
            skills: {},
            abilities: ['Extra Inventory Space', 'Hidden Storage', 'Secure Item Containment']
        },
        sideEffects: [
            { 
                description: 'Occasional loss of items in the dimensional pocket',
                chance: 0.2,
                severity: 'high'
            },
            {
                description: 'Strange noises emanating from the storage space',
                chance: 0.4,
                severity: 'low'
            },
            {
                description: 'Items sometimes emerge covered in unknown substances',
                chance: 0.3,
                severity: 'medium'
            },
            {
                description: 'Rare dimensional leakage affecting nearby reality',
                chance: 0.05,
                severity: 'extreme'
            }
        ],
        installationTime: 5, // hours
        recoveryTime: 96, // hours
        compatibility: {
            incompatible: ['quantum_stabilizer'],
            synergy: ['probability_manipulator', 'stomach_of_holding']
        },
        iconIndex: 193
    },
    {
        id: 'quantum_stabilizer',
        name: 'Quantum Stabilizer',
        description: 'Reduces the effects of radiation and other environmental hazards by stabilizing the quantum state of cells.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.INTERNAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 8000,
        requirements: {
            level: 25,
            stats: { endurance: 7, intelligence: 6 }
        },
        effects: {
            stats: { endurance: 2 },
            skills: { survival: 3 },
            abilities: ['Radiation Resistance', 'Quantum Field Stability', 'Environmental Adaptation']
        },
        sideEffects: [
            { 
                description: 'Occasional quantum "freezing" causing momentary paralysis',
                chance: 0.15,
                severity: 'high'
            },
            {
                description: 'Slight blurring of physical form at the edges',
                chance: 0.4,
                severity: 'low'
            },
            {
                description: 'Technology malfunctions more frequently in your presence',
                chance: 0.3,
                severity: 'medium'
            }
        ],
        installationTime: 3, // hours
        recoveryTime: 48, // hours
        compatibility: {
            incompatible: ['probability_manipulator', 'dimensional_storage', 'temporal_anchor'],
            synergy: ['toxin_filters', 'oxygen_efficiency']
        },
        iconIndex: 83
    },
    {
        id: 'temporal_anchor',
        name: 'Temporal Anchor',
        description: 'Provides limited resistance to time-altering effects by partially anchoring the user in their own timestream.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.SPECIAL,
        rarity: MOD_RARITY.EPIC,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 15000,
        requirements: {
            level: 40,
            stats: { intelligence: 9, perception: 8 }
        },
        effects: {
            stats: { perception: 2 },
            skills: { reflexes: 3 },
            abilities: ['Temporal Resistance', 'Déjà Vu Sensing', 'Paradox Protection']
        },
        sideEffects: [
            { 
                description: 'Occasional perception of events slightly before they happen',
                chance: 0.3,
                severity: 'medium'
            },
            {
                description: 'Temporal echoes causing you to repeat actions unconsciously',
                chance: 0.2,
                severity: 'medium'
            },
            {
                description: 'Rare but severe temporal displacement episodes',
                chance: 0.05,
                severity: 'extreme'
            }
        ],
        installationTime: 6, // hours
        recoveryTime: 120, // hours
        compatibility: {
            incompatible: ['probability_manipulator', 'quantum_stabilizer'],
            synergy: ['neural_processor', 'chronos_module']
        },
        iconIndex: 193
    },
    {
        id: 'consciousness_splitter',
        name: 'Consciousness Splitter',
        description: 'Allows the user to perform two mental tasks simultaneously by partially dividing consciousness into separate streams.',
        category: MOD_CATEGORIES.EXPERIMENTAL,
        slot: MOD_SLOTS.NEURAL,
        rarity: MOD_RARITY.RARE,
        origin: MOD_ORIGINS.CORPORATE,
        cost: 9000,
        requirements: {
            level: 30,
            stats: { intelligence: 8 }
        },
        effects: {
            stats: { intelligence: 2 },
            skills: { multitasking: 3 },
            abilities: ['Dual Processing', 'Split Attention', 'Parallel Thinking']
        },
        sideEffects: [
            { 
                description: 'Occasional personality fragmentation',
                chance: 0.2,
                severity: 'high'
            },
            {
                description: 'Talking to yourself more frequently',
                chance: 0.7,
                severity: 'low'
            },
            {
                description: 'Difficulty fully focusing on a single task',
                chance: 0.4,
                severity: 'medium'
            }
        ],
        installationTime: 4, // hours
        recoveryTime: 72, // hours
        compatibility: {
            incompatible: ['neural_processor', 'hive_mind'],
            synergy: ['neural_reflexes']
        },
        iconIndex: 83
    },

    // Legendary Modifications
    {
        id: 'prometheus_hand',
        name:
