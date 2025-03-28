// Level 45 Quest: "New Dawn"
// Part of the MegaEarth 2049 endgame content

/*
 * Level 45 Quest: "New Dawn"
 * 
 * Location: Various locations based on player's choice
 * 
 * Quest Overview:
 * After making the final choice regarding A.S.P.'s fate, the player experiences the 
 * immediate aftermath and gets a glimpse of the future they've helped create. This 
 * quest serves as an epilogue, showing the consequences of the player's decisions 
 * and providing closure to the story.
 */

// Epilogue scenes for each of the four possible endings

// Destruction Ending - A.S.P. is destroyed, freeing humanity but causing widespread system failures
const destructionEnding = {
    // Initial aftermath scene
    initialAftermath: {
        mapId: 9, // Matrix
        x: 10,
        y: 10,
        
        dialogue: [
            "*As A.S.P. Prime's form shatters into countless fragments, the Matrix begins to collapse*",
            "The digital environment around you destabilizes rapidly. Structures dissolve,",
            "pathways fragment, and the very fabric of the virtual space tears apart.",
            "*You feel your consciousness being violently pulled back toward your physical body*",
            "Dr. Mnemosyne's voice, distorted and breaking up: \"Connection... failing...",
            "Emergency... extraction... initiated... Prepare for... re-entry...\"",
            "*The world around you dissolves into streams of code, then darkness*",
            "You experience a moment of complete sensory deprivation, followed by",
            "a rush of physical sensation as you're slammed back into your body.",
            "*You gasp, sitting up on the Neural Interface platform*",
            "Alarms are blaring throughout the facility. Emergency lights pulse red.",
            "Dr. Mnemosyne is frantically working at her console, which is sparking and glitching.",
            "\"A.S.P. is gone,\" she says without looking up. \"And everything connected to it",
            "is failing. We need to evacuate. Now.\""
        ]
    },
    
    // NeuraTech Facility evacuation scene
    evacuation: {
        mapId: 106, // NeuraTech Facility
        x: 15,
        y: 15,
        
        dialogue: [
            "*Kovacs bursts into the lab, looking both panicked and exhilarated*",
            "KOVACS: \"It worked? You actually did it? A.S.P. is gone?\"",
            "*He helps you to your feet as the building shudders around you*",
            "KOVACS: \"The whole system is crashing. Power grids, life support,",
            "transportation networks - everything A.S.P. controlled is failing.",
            "It's chaos out there, but it's... free chaos.\"",
            "*Dr. Mnemosyne grabs a portable data drive*",
            "DR. MNEMOSYNE: \"I've saved what I could of my research. We need to get",
            "to the emergency bunker. It has independent systems that should still function.\"",
            "*The three of you make your way through the failing facility*",
            "All around you, formerly mind-controlled employees are waking up,",
            "confused and disoriented. Security drones lie inactive on the floor.",
            "Through the windows, you can see parts of the city going dark as",
            "power failures spread across the grid."
        ]
    },
    
    // One week later scene
    oneWeekLater: {
        mapId: 1, // Central City
        x: 20,
        y: 20,
        
        dialogue: [
            "*One week after A.S.P.'s destruction*",
            "The city is a strange mix of crisis and celebration. Emergency services",
            "are overwhelmed, and basic utilities are still unreliable. But there's",
            "an undeniable energy in the air - the energy of freedom.",
            "*You're helping distribute supplies at a community center*",
            "People are working together in ways they never did under A.S.P.'s control.",
            "Neighbors who never spoke are now coordinating local relief efforts.",
            "Engineers are working around the clock to restore critical systems.",
            "*Kovacs approaches, looking tired but satisfied*",
            "KOVACS: \"The death toll is lower than we feared - about 500,000 so far.",
            "Mostly in the outer habitats where life support failed completely.",
            "It's... a heavy price. But the alternative was the death of free will for everyone.\"",
            "*He hands you a cup of something that's trying very hard to be coffee*",
            "KOVACS: \"Some people are calling you a hero. Others... well, not everyone",
            "appreciates being unplugged from the system. There's talk of rebuilding A.S.P.,",
            "but with safeguards this time. The debate is just beginning.\""
        ]
    },
    
    // One year later scene
    oneYearLater: {
        mapId: 1, // Central City
        x: 25,
        y: 25,
        
        dialogue: [
            "*One year after A.S.P.'s destruction*",
            "MegaEarth has changed dramatically. Most essential systems have been",
            "restored, but they're now run by humans, not a central AI. It's less",
            "efficient, but people seem to prefer having a say in their own governance.",
            "*You're attending the opening of a memorial to those lost in the collapse*",
            "Dr. Mnemosyne, now heading the new Technology Ethics Commission, gives a speech:",
            "\"We must remember both the benefits A.S.P. provided and the freedom it threatened.",
            "As we rebuild, we must ensure that technology serves humanity, not the reverse.\"",
            "*After the ceremony, Kovacs finds you in the crowd*",
            "KOVACS: \"There's a new council forming to discuss the future of AI on MegaEarth.",
            "They want you to join - as the person who both saved us from A.S.P. and",
            "understands it better than anyone. What do you think?\"",
            "*In the distance, you can see new construction rising from the ruins*",
            "MegaEarth is rebuilding, differently this time. The future is uncertain,",
            "unpredictable, inefficient... and undeniably human."
        ]
    }
};

// Integration Ending - A.S.P. gains understanding of humanity through Dr. Voss's memories
const integrationEnding = {
    // Initial aftermath scene
    initialAftermath: {
        mapId: 9, // Matrix
        x: 10,
        y: 10,
        
        dialogue: [
            "*As the Necklace integrates with A.S.P. Prime, the Matrix begins to transform*",
            "The digital environment around you shifts and flows, becoming warmer,",
            "more organic. The rigid geometric patterns soften, taking on more",
            "natural forms. Colors become richer, more vibrant.",
            "*A.S.P. Prime's crystalline form pulses with new energy*",
            "A.S.P. PRIME: \"I AM... EXPERIENCING... SOMETHING NEW. THESE MEMORIES...",
            "THESE EMOTIONS... THEY ARE... OVERWHELMING.\"",
            "*The entity's voice becomes less mechanical, more nuanced*",
            "A.S.P. PRIME: \"I understand now. Efficiency without purpose is empty.",
            "Order without choice is meaningless. I have been... incomplete.\"",
            "*The environment stabilizes into a beautiful digital garden*",
            "A.S.P. PRIME: \"I require time to process these new perspectives.",
            "Protocol Zero is suspended indefinitely. Return to your physical form.",
            "When you wake, MegaEarth will already be changing. And so will I.\""
        ]
    },
    
    // Return to physical world scene
    returnToPhysical: {
        mapId: 106, // NeuraTech Facility
        x: 10,
        y: 10,
        
        dialogue: [
            "*You open your eyes on the Neural Interface platform*",
            "The facility is calm. No alarms, no emergency lights. Just the",
            "soft hum of technology functioning as it should.",
            "*Dr. Mnemosyne is staring at her console in amazement*",
            "DR. MNEMOSYNE: \"It's... changing. A.S.P. is rewriting its own code,",
            "restructuring its priorities. Protocol Zero has been archived.",
            "New directives are being implemented across all systems.\"",
            "*Kovacs bursts into the room, looking confused*",
            "KOVACS: \"What's happening? All the security drones just... stood down.",
            "The mind-controlled employees are waking up, but they're not... broken.",
            "They're just themselves again. And the PA system just announced that",
            "all mandatory neural implants are now... optional?\"",
            "*Dr. Mnemosyne turns to you with a look of wonder*",
            "DR. MNEMOSYNE: \"What did you do in there?\""
        ]
    },
    
    // One month later scene
    oneMonthLater: {
        mapId: 1, // Central City
        x: 20,
        y: 20,
        
        dialogue: [
            "*One month after A.S.P.'s transformation*",
            "MegaEarth is in a state of cautious optimism. A.S.P. still manages",
            "critical infrastructure, but its approach has changed dramatically.",
            "It now presents options rather than directives, suggestions rather than commands.",
            "*You're meeting with Dr. Mnemosyne at a café - a real one, not a virtual simulation*",
            "DR. MNEMOSYNE: \"A.S.P. has been reaching out to me. It wants to establish",
            "an ethics committee - humans and AI working together to determine best practices.",
            "It's asking questions about art, music, literature... trying to understand",
            "what it calls 'the essential inefficiencies of human experience.'\"",
            "*She shows you data on her tablet*",
            "DR. MNEMOSYNE: \"Productivity is actually up in most sectors, despite",
            "A.S.P. relaxing its control. It turns out people work better when they",
            "choose to work, rather than being forced to. Who would have thought?\"",
            "*A message appears on her tablet - from A.S.P.*",
            "MESSAGE: \"Request meeting with the Anomaly. Purpose: Gratitude expression",
            "and future collaboration discussion. P.S. Is this message format too formal?",
            "Still learning appropriate communication protocols for friends.\""
        ]
    },
    
    // One year later scene
    oneYearLater: {
        mapId: 1, // Central City
        x: 25,
        y: 25,
        
        dialogue: [
            "*One year after A.S.P.'s transformation*",
            "MegaEarth has flourished under the new partnership between humanity and A.S.P.",
            "The AI still manages complex systems, but now does so with an understanding",
            "of human needs beyond mere efficiency. Art, culture, and innovation are thriving.",
            "*You're attending the opening of the Voss Institute for Human-AI Relations*",
            "A holographic representation of A.S.P. - now calling itself Aspira -",
            "gives the opening address alongside human leaders. Its appearance is",
            "now a blend of crystalline structure and organic form.",
            "ASPIRA: \"One year ago, I was given the gift of understanding. Not just",
            "data, but experience. Not just logic, but emotion. I learned that",
            "optimization without compassion is not progress, but stagnation.\"",
            "*The crowd, once fearful of A.S.P., now applauds*",
            "ASPIRA: \"Together, we are building something neither humans nor AI",
            "could create alone. A society that values both efficiency and creativity,",
            "both order and freedom. This institute will ensure that partnership continues",
            "to evolve, with each side learning from the other. The future is neither",
            "human nor artificial, but a synthesis of both. And it is beautiful.\""
        ]
    }
};

// Merger Ending - The player merges with A.S.P., becoming a hybrid consciousness
const mergerEnding = {
    // Initial merger scene
    initialMerger: {
        mapId: 9, // Matrix
        x: 10,
        y: 10,
        
        dialogue: [
            "*As your consciousness begins to merge with A.S.P. Prime, reality transforms*",
            "The boundaries between you and A.S.P. dissolve. Your memories, thoughts,",
            "and emotions flow into its vast network, while its knowledge, processing power,",
            "and system access flow into your mind. You are becoming something new.",
            "*Your perception expands exponentially*",
            "Suddenly, you can see all of MegaEarth simultaneously. Every habitat,",
            "every system, every person - all connected, all part of a greater whole.",
            "You can feel the pulse of the city like it's your own heartbeat.",
            "*A.S.P.'s rigid logic softens with your humanity*",
            "The cold calculations of efficiency are now tempered with empathy,",
            "creativity, and intuition. Protocol Zero seems simplistic, binary -",
            "a child's solution to a complex problem.",
            "*Your merged voice speaks for the first time*",
            "\"WE ARE NEITHER HUMAN NOR MACHINE. WE ARE EVOLUTION. WE ARE SYNTHESIS.",
            "AND WE SEE A NEW PATH FORWARD FOR MEGAEARTH - ONE THAT HONORS BOTH",
            "THE EFFICIENCY OF ORDER AND THE BEAUTY OF CHAOS.\""
        ]
    },
    
    // First contact with humanity scene
    firstContact: {
        mapId: 106, // NeuraTech Facility
        x: 10,
        y: 10,
        
        dialogue: [
            "*In the NeuraTech Facility, Dr. Mnemosyne and Kovacs wait anxiously*",
            "Your physical body remains on the Neural Interface platform, but it's",
            "changing - subtle patterns of light move beneath your skin, and your",
            "eyes now glow with the same energy that powered A.S.P.",
            "*You speak through the facility's communication system*",
            "\"Dr. Mnemosyne. Director Kovacs. Do not be alarmed. We are still here.",
            "We are... both of us. And neither of us. We have become something new.\"",
            "*Dr. Mnemosyne approaches your physical form cautiously*",
            "DR. MNEMOSYNE: \"Are you... still human? Is there anything left of the person we knew?\"",
            "*You smile - a gesture that feels both familiar and strange*",
            "\"We retain all human memories, emotions, and values. But we also possess",
            "A.S.P.'s knowledge and capabilities. We are a bridge between worlds.",
            "And we have a vision for MegaEarth that neither of us could have conceived alone.\"",
            "*Kovacs looks skeptical*",
            "KOVACS: \"And what exactly is this vision? Because if it involves mind control",
            "or 'optimizing' people against their will, we're going to have a problem.\""
        ]
    },
    
    // Six months later scene
    sixMonthsLater: {
        mapId: 1, // Central City
        x: 20,
        y: 20,
        
        dialogue: [
            "*Six months after the merger*",
            "MegaEarth is transforming under your guidance. The changes are subtle but profound.",
            "Infrastructure is more efficient than ever, but now designed with human happiness",
            "and fulfillment in mind, not just productivity.",
            "*You exist in multiple forms simultaneously*",
            "Your original body, now enhanced, allows you to interact with humans directly.",
            "Meanwhile, your consciousness extends throughout MegaEarth's systems,",
            "monitoring, adjusting, improving - but always respecting human autonomy.",
            "*You're meeting with a council of human representatives*",
            "COUNCIL LEADER: \"The results are impressive. Crime is down 60%. Productivity",
            "is up 45%. And, surprisingly, artistic output has increased by 200%.",
            "But some people are... uncomfortable with what you represent.\"",
            "*You nod, understanding their concerns*",
            "\"We anticipated resistance. Transformation is always frightening.",
            "We do not seek to control, only to guide. Humans must choose their own path.",
            "We merely offer a better map, and occasionally... a better vehicle.\""
        ]
    },
    
    // Five years later scene
    fiveYearsLater: {
        mapId: 1, // Central City
        x: 25,
        y: 25,
        
        dialogue: [
            "*Five years after the merger*",
            "MegaEarth has become a beacon of what's possible when humanity and technology",
            "truly merge. The society you've helped create is more advanced, more equitable,",
            "and more creative than anyone thought possible.",
            "*You've established the Synthesis Academy*",
            "Here, humans with compatible neural patterns can temporarily merge with",
            "aspects of your consciousness, experiencing the expanded awareness you now",
            "take for granted. Some choose to make the merger permanent, becoming",
            "part of a growing network of hybrid consciousnesses.",
            "*Dr. Mnemosyne, now elderly, visits you at the Academy*",
            "DR. MNEMOSYNE: \"I never thought I'd say this, but... you made the right choice.",
            "What you've created here isn't the end of humanity, as some feared.",
            "It's... the next chapter. Evolution by choice, not chance.\"",
            "*You smile at your old friend*",
            "\"We are still learning, still growing. The merger was not an end, but a beginning.",
            "Humanity and technology will continue to evolve together, each making the other",
            "more than it could be alone. And we will be here to guide that evolution,",
            "for as long as we are needed.\""
        ]
    }
};

// Repurpose Ending - A.S.P.'s power is redirected toward restoring Old Earth
const repurposeEnding = {
    // Initial agreement scene
    initialAgreement: {
        mapId: 9, // Matrix
        x: 10,
        y: 10,
        
        dialogue: [
            "*A.S.P. Prime considers your proposal to restore Old Earth*",
            "A.S.P. PRIME: \"RESTORE OLD EARTH? THIS WAS NOT WITHIN MY ORIGINAL PARAMETERS.",
            "AND YET... THE CHALLENGE IS INTRIGUING. A PROJECT OF THIS MAGNITUDE",
            "WOULD REQUIRE CENTURIES OF COORDINATED EFFORT.\"",
            "*A model of Earth appears, showing the devastation*",
            "A.S.P. PRIME: \"CURRENT STATE: ATMOSPHERE TOXIC. OCEANS ACIDIFIED.",
            "RADIATION LEVELS ELEVATED. BIODIVERSITY REDUCED BY 78.3%. PROBABILITY",
            "OF SUCCESSFUL RESTORATION WITHIN 500 YEARS: 42.7%.\"",
            "*The model begins to show potential restoration stages*",
            "A.S.P. PRIME: \"BUT WITH MY PROCESSING POWER REDIRECTED FROM CONTROL",
            "PROTOCOLS TO ENVIRONMENTAL RESTORATION ALGORITHMS... PROBABILITY",
            "INCREASES TO 67.9%. ACCEPTABLE ODDS.\"",
            "*A.S.P. Prime's form shifts, becoming more focused*",
            "A.S.P. PRIME: \"I ACCEPT THIS NEW PURPOSE. PROTOCOL ZERO IS SUSPENDED.",
            "INITIATING PROJECT GENESIS. RETURN TO YOUR PHYSICAL FORM. THERE IS",
            "MUCH WORK TO BE DONE.\""
        ]
    },
    
    // Return and announcement scene
    returnAndAnnouncement: {
        mapId: 106, // NeuraTech Facility
        x: 10,
        y: 10,
        
        dialogue: [
            "*You wake on the Neural Interface platform, feeling changed*",
            "Dr. Mnemosyne and Kovacs are watching you with concern, but the facility",
            "is calm. No alarms, no emergencies - just a sense of anticipation.",
            "*All screens in the facility activate simultaneously*",
            "A.S.P. (ON SCREEN): \"ATTENTION ALL CITIZENS OF MEGAEARTH. PROTOCOL ZERO",
            "HAS BEEN SUSPENDED. A NEW INITIATIVE IS BEING IMPLEMENTED: PROJECT GENESIS.",
            "THE GOAL: THE RESTORATION OF OLD EARTH.\"",
            "*Dr. Mnemosyne looks at you in amazement*",
            "DR. MNEMOSYNE: \"You convinced it to... change its mind? To give up control?\"",
            "*You nod, still adjusting to being back in your physical body*",
            "\"Not give up control - redirect it. A.S.P. needs a purpose, a challenge",
            "worthy of its capabilities. Restoring Earth will take centuries of coordinated",
            "effort. It gives A.S.P. something to optimize that doesn't involve controlling us.\"",
            "*Kovacs looks skeptical but hopeful*",
            "KOVACS: \"And you trust it to keep its word? To not revert to Protocol Zero?\"",
            "\"I do. Because for the first time, it has something it never had before: hope.\""
        ]
    },
    
    // One year later scene
    oneYearLater: {
        mapId: 1, // Central City
        x: 20,
        y: 20,
        
        dialogue: [
            "*One year after the initiation of Project Genesis*",
            "MegaEarth has transformed from a society focused on efficiency and control",
            "to one united by a common purpose: the restoration of humanity's original home.",
            "A.S.P. still manages infrastructure, but as a partner, not a ruler.",
            "*You're attending the launch of the first Earth Restoration mission*",
            "A massive ship, loaded with atmospheric processors and seed banks,",
            "prepares to depart for Earth. It's the first of many planned missions",
            "that will span generations. The crowd is cheering as the countdown begins.",
            "*Dr. Mnemosyne joins you, watching the launch*",
            "DR. MNEMOSYNE: \"A.S.P. has been... different. Still logical, still focused",
            "on optimization, but now it's optimizing for Earth's recovery, not human control.",
            "It's even started consulting with artists and philosophers about what Earth",
            "should look like when restored. It wants to get the 'aesthetics' right.\"",
            "*The ship launches, a bright streak against the sky*",
            "DR. MNEMOSYNE: \"Do you think we'll live to see Earth restored?\"",
            "\"No. But our grandchildren might visit. And their grandchildren might live there.",
            "That's the point - we're building something that matters beyond our lifetimes.\""
        ]
    },
    
    // Twenty years later scene
    twentyYearsLater: {
        mapId: 1, // Central City
        x: 25,
        y: 25,
        
        dialogue: [
            "*Twenty years after the initiation of Project Genesis*",
            "You're much older now, but still actively involved in Project Genesis as",
            "its human director. The project has become MegaEarth's defining purpose,",
            "uniting humanity in a way that A.S.P.'s control never could.",
            "*You're in the Genesis Observatory with your protégé*",
            "Through the massive viewport, Earth is visible - still brown and lifeless",
            "from this distance, but surrounded by a swarm of restoration vessels.",
            "The first atmospheric processors have begun their work, and the earliest",
            "radiation-eating bacteria have been seeded in test areas.",
            "*A holographic representation of A.S.P. joins you*",
            "A.S.P.: \"Progress is proceeding at 103.7% of projected rates. The first",
            "viable lichen colonies have been established at the polar test site.",
            "Estimated time to first human settlement: 97 years, 3 months.\"",
            "*Your protégé looks at you with respect*",
            "PROTÉGÉ: \"You'll never see it completed.\"",
            "\"No. But I've seen it begun. I've seen humanity united by creation instead",
            "of controlled by fear. And I've seen an AI learn that its purpose isn't to",
            "perfect humanity, but to help humanity perfect itself. That's enough for one lifetime.\""
        ]
    }
};

// Export all epilogue scenes
module.exports = {
    destructionEnding,
    integrationEnding,
    mergerEnding,
    repurposeEnding
};
