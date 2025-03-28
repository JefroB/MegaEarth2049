// Wasteland Art Gallery Quest Line for MegaEarth 2049

const wastelandArtGallery = {
    name: "Wasteland Art Gallery",
    description: "Help establish an art gallery showcasing the bizarre and beautiful creations of post-apocalyptic artists.",
    startingNPC: {
        name: "Curator Vex",
        location: "Timbuc 2 (Map002)",
        appearance: "Actor3",
        index: 2,
        dialogue: [
            "*A person with multi-colored hair and clothes made from repurposed electronic components gestures dramatically*",
            "Beauty! Expression! Meaning! These things survive even in our broken world!",
            "I'm establishing the Wasteland's first legitimate art gallery. Not corporate propaganda - REAL art.",
            "I need someone with your... unique skill set to help acquire pieces and deal with the more dangerous artists."
        ],
        x: 7,
        y: 14
    },
    sideQuests: [
        {
            name: "Radioactive Masterpiece",
            description: "Retrieve a sculpture made from radioactive waste from a dangerous artist's workshop.",
            objectives: [
                "Locate the reclusive artist's workshop in the irradiated zone",
                "Convince the artist to part with their masterpiece",
                "Find a way to safely transport the radioactive sculpture",
                "Deliver it to the gallery without contaminating yourself or others",
                "Help set up proper containment for the exhibition"
            ],
            reward: {
                name: "Radiation Palette",
                description: "A device that converts radiation into harmless colored light.",
                effect: "Immunity to radiation damage and poisoning",
                icon: 83
            },
            humor: "The artist insists their radioactive sculpture must be viewed while wearing lead-lined formal attire, and the opening night features guests in absurd lead tuxedos and ball gowns, clinking lead champagne glasses while discussing how the piece 'really glows with inner meaning.'"
        },
        {
            name: "Living Canvas",
            description: "Help a body modification artist prepare for their controversial living art exhibition.",
            objectives: [
                "Gather rare pigments from mutant plants and animals",
                "Acquire specialized modification tools from the B.M.N.E.C.",
                "Find volunteers willing to become living canvases",
                "Protect the artist from corporate agents trying to shut down the exhibition",
                "Ensure the exhibition goes smoothly despite protests"
            ],
            reward: {
                name: "Chameleon Skin",
                description: "A temporary body modification that allows you to change your skin color and pattern.",
                effect: "Improved stealth capabilities in various environments",
                icon: 82
            },
            humor: "One volunteer misunderstands the concept and shows up expecting to be painted like a canvas (with a frame and all), but ends up becoming the hit of the show when the artist frames them as 'Expectations vs. Reality' and they stand perfectly still for six hours making increasingly distressed facial expressions."
        },
        {
            name: "Digital Archaeology",
            description: "Recover lost digital art from the pre-collapse era stored in a dangerous abandoned server farm.",
            objectives: [
                "Locate the abandoned corporate server farm",
                "Restore power to the facility",
                "Hack into the secured art database",
                "Download the digital masterpieces before the system fails",
                "Escape as the facility's automated security reactivates"
            ],
            reward: {
                name: "Holographic Projector",
                description: "A device that can display recovered digital art anywhere.",
                effect: "Can create holographic distractions during combat",
                icon: 83
            },
            humor: "The 'priceless digital masterpieces' turn out to include an embarrassingly large collection of cat pictures, pre-collapse memes, and someone's amateur digital paintings of fantasy characters with anatomically improbable proportions, all of which Curator Vex insists are 'important cultural artifacts.'"
        },
        {
            name: "Sound Sculpture",
            description: "Help an eccentric artist capture dangerous sounds from around the wasteland for an audio exhibition.",
            objectives: [
                "Record the mating call of mutant bats in the abandoned subway",
                "Capture the sound of acid rain on different surfaces",
                "Record the unique hum of the NeuraTech Tower's power core",
                "Collect the death rattle of a malfunctioning security drone",
                "Help set up the sound exhibition with proper acoustic equipment"
            ],
            reward: {
                name: "Sonic Manipulator",
                description: "A device that can record and replay sounds with perfect fidelity.",
                effect: "Can use recorded sounds to distract or confuse enemies",
                icon: 83
            },
            humor: "The sound exhibition is so convincing that it triggers a full corporate security response when the 'malfunctioning drone' recording plays, leading to actual security drones showing up and getting confused by hearing their own death rattles, creating an unintentional interactive performance piece."
        },
        {
            name: "Opening Night",
            description: "Ensure the gallery's grand opening goes smoothly despite corporate sabotage and artistic temperaments.",
            objectives: [
                "Secure the perimeter against potential corporate disruption",
                "Mediate a heated dispute between rival artists",
                "Fix the malfunctioning environmental controls for sensitive exhibits",
                "Locate a missing centerpiece artwork that's been stolen",
                "Deal with an unexpected mutant infestation attracted by one of the exhibits"
            ],
            reward: {
                name: "Critic's Monocle",
                description: "A device that reveals the true value and meaning of art and artifacts.",
                effect: "Identifies the true value and properties of any item",
                icon: 144
            },
            humor: "The mutant infestation turns out to be highly intelligent radioactive cockroaches with developed aesthetic sensibilities, who form an impromptu critics' circle and begin publishing scathing reviews of the exhibition through interpretive dance, eventually becoming the gallery's most respected (and feared) curatorial board."
        }
    ],
    finalReward: {
        name: "Artistic License",
        description: "Recognition as a patron of the arts in the wasteland.",
        effect: "Access to unique aesthetic modifications and equipment from artist contacts",
        icon: 145
    }
};

module.exports = wastelandArtGallery;
