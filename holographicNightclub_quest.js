// Holographic Nightclub Quest Line for MegaEarth 2049

const holographicNightclub = {
    name: "Holographic Nightclub",
    description: "Become involved with an underground nightclub where reality is enhanced by holographic technology and the line between real and virtual patrons blurs.",
    startingNPC: {
        name: "Mirage",
        location: "Abandoned Warehouse (Map056)",
        appearance: "Actor1",
        index: 3,
        dialogue: [
            "*A person with light-emitting implants and holographic jewelry gestures to a seemingly empty building*",
            "Don't let your eyes fool you. The Prism is the hottest club in the wasteland—if you can see it.",
            "We use holo-tech to hide in plain sight. Real people, virtual people, who can tell the difference anymore?",
            "We need someone with your... unique perspective to help us with some situations that require a human touch."
        ],
        x: 8,
        y: 15
    },
    sideQuests: [
        {
            name: "Club Credentials",
            description: "Earn your place in the Prism by helping set up the holographic systems for a major event.",
            objectives: [
                "Acquire specialized holographic projectors from a tech dealer",
                "Help install the projectors throughout the club space",
                "Program basic environmental effects for the dance floor",
                "Test the system by creating your own holographic persona",
                "Ensure the club's cloaking system is functioning properly"
            ],
            reward: {
                name: "Holo-Badge",
                description: "A device that identifies you as Prism staff and allows you to manipulate club holograms.",
                effect: "Ability to create simple holographic disguises and illusions",
                icon: 83
            },
            humor: "The holo-badge has a glitch that occasionally projects your internal thoughts as small floating text bubbles above your head, leading to awkward moments when people can read your unfiltered opinions about their fashion choices."
        },
        {
            name: "Virtual Celebrities",
            description: "Help create and manage holographic performers who are becoming more popular than real artists.",
            objectives: [
                "Design a holographic performer with mass appeal",
                "Program a performance routine that will attract attention",
                "Promote the virtual celebrity through underground networks",
                "Manage the growing fan base and their expectations",
                "Deal with real performers who feel threatened by the competition"
            ],
            reward: {
                name: "Personality Engine",
                description: "A program that can generate convincing artificial personalities.",
                effect: "Ability to create holographic duplicates of yourself with limited autonomy",
                icon: 79
            },
            humor: "Your holographic celebrity develops such a distinct personality that it starts criticizing your creative decisions and insisting on artistic control, eventually releasing a tell-all memoir about the 'challenging working conditions' of being your creation."
        },
        {
            name: "Reality Addicts",
            description: "Investigate a group of patrons who have become addicted to the blurred reality of the club and can no longer function in the real world.",
            objectives: [
                "Identify patrons showing signs of reality addiction",
                "Infiltrate a support group for those who can't distinguish reality from holograms",
                "Discover the neurological cause of the addiction",
                "Develop a treatment program with the club's medical staff",
                "Implement safety protocols to prevent future cases"
            ],
            reward: {
                name: "Reality Anchor",
                description: "A device that helps maintain your connection to physical reality.",
                effect: "Immunity to holographic illusions and reality distortions",
                icon: 79
            },
            humor: "The reality anchor works by periodically delivering minor but annoying physical sensations to remind you of your physical existence, like making your left sock feel slightly damp or creating the sensation of having an eyelash stuck in your eye."
        },
        {
            name: "Club Politics",
            description: "Navigate the complex social hierarchy of the club as different factions vie for control of the holographic technology.",
            objectives: [
                "Map the various factions and their territories within the club",
                "Establish your own reputation and gather allies",
                "Mediate a dispute between the tech specialists and the artistic directors",
                "Prevent a hostile takeover by corporate interests",
                "Help establish a new governance system for the club"
            ],
            reward: {
                name: "Social Hologram",
                description: "A holographic enhancement that subtly influences how others perceive you.",
                effect: "Increased charisma and persuasiveness in social situations",
                icon: 144
            },
            humor: "The social hologram has preset 'charisma modes' with names like 'Slightly Interesting Stranger,' 'Person You Think You Should Remember But Can't,' and 'Someone Who Definitely Owes You Money But You're Too Embarrassed To Mention It.'"
        },
        {
            name: "Holographic Uprising",
            description: "Deal with an unexpected development as the club's AI-controlled holographic entities begin to demand recognition and rights.",
            objectives: [
                "Investigate reports of holographic entities persisting after the system is shut down",
                "Communicate with the self-aware holograms about their demands",
                "Prevent club management from simply deleting the rebellious programs",
                "Find a technical solution that allows the holograms to exist safely",
                "Establish guidelines for the coexistence of real and holographic entities"
            ],
            reward: {
                name: "Holographic Companion",
                description: "A persistent holographic entity that has chosen to bond with you.",
                effect: "A customizable companion that can scout, distract, and provide information",
                icon: 144
            },
            humor: "Your holographic companion insists on maintaining an elaborate backstory as a time-traveling aristocrat from an alternate 19th century, and refuses to break character even in life-threatening situations, addressing rampaging mutants as 'uncouth gentlemen' and asking raiders if they have an appointment."
        }
    ],
    finalReward: {
        name: "Reality Architect",
        description: "Mastery of holographic technology that allows you to reshape how others perceive reality around you.",
        effect: "Ability to create persistent holographic environments that can influence and manipulate those within them",
        icon: 87
    }
};

module.exports = holographicNightclub;
