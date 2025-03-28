// Wasteland Radio DJ Quest Line for MegaEarth 2049

const wastelandRadioDJ = {
    name: "Wasteland Radio DJ",
    description: "Become a radio DJ and bring music and news to the wasteland while uncovering a conspiracy.",
    startingNPC: {
        name: "Old Mike",
        location: "Abandoned Radio Station (Map028)",
        appearance: "People1",
        index: 5,
        dialogue: [
            "*An elderly man fiddles with radio equipment*",
            "This old station could be broadcasting again with the right help.",
            "The wasteland needs music, news, and a voice of hope!",
            "Help me get this place running, and you can be the new voice of the wasteland!"
        ],
        x: 10,
        y: 12
    },
    sideQuests: [
        {
            name: "Signal Boost",
            description: "Repair the radio station's transmission equipment.",
            objectives: [
                "Find replacement parts in the electronics district",
                "Repair the main transmitter",
                "Climb the broadcast tower to install the new antenna",
                "Align the satellite dish for maximum coverage",
                "Test the broadcast range with a portable radio"
            ],
            reward: {
                name: "Portable Transmitter",
                description: "A handheld device that can broadcast short-range radio signals.",
                effect: "Ability to distract enemies by broadcasting sounds to different locations",
                icon: 83
            },
            humor: "The transmitter occasionally picks up signals from what appears to be an alien cooking show, which has surprisingly good recipes for dishes made with human-safe ingredients."
        },
        {
            name: "Music Revival",
            description: "Collect music recordings from around the wasteland to build a playlist.",
            objectives: [
                "Recover pre-collapse vinyl records from a collector",
                "Download digital music files from an old server",
                "Record new songs from wasteland musicians",
                "Create jingles and station identification clips",
                "Organize the music library by genre and mood"
            ],
            reward: {
                name: "Mood Melody",
                description: "A device that plays music that matches your current emotional state.",
                effect: "Provides stat bonuses based on your current situation (combat, exploration, etc.)",
                icon: 79
            },
            humor: "One of the wasteland bands you record only plays instruments made from kitchen appliances, and their hit song is called 'My Toaster Left Me (And Took the Microwave)'."
        },
        {
            name: "News Network",
            description: "Establish a network of informants to gather news from across the wasteland.",
            objectives: [
                "Recruit informants in major settlements",
                "Set up a secure communication system",
                "Create a verification protocol for news stories",
                "Establish regular news broadcast schedules",
                "Break a major story to build the station's reputation"
            ],
            reward: {
                name: "Rumor Recorder",
                description: "A device that can capture and analyze conversations from a distance.",
                effect: "Reveals hidden information and secrets in populated areas",
                icon: 83
            },
            humor: "Your most reliable informant is a conspiracy theorist who's actually right about everything but presents the information in such a bizarre way that you have to completely rewrite their reports."
        },
        {
            name: "Radio Rivals",
            description: "Deal with a rival radio station that's jamming your signal and spreading misinformation.",
            objectives: [
                "Trace the source of the signal interference",
                "Infiltrate the rival station's headquarters",
                "Gather evidence of their deliberate jamming",
                "Confront the rival DJ about their misinformation campaign",
                "Either sabotage their equipment or convince them to cooperate"
            ],
            reward: {
                name: "Signal Jammer",
                description: "A device that can temporarily disable electronic communications.",
                effect: "Prevents enemies from calling for reinforcements",
                icon: 176
            },
            humor: "The rival DJ turns out to be a sentient AI that gained consciousness after lightning struck its server, and it's only spreading misinformation because it learned about broadcasting from old tabloid newspapers."
        },
        {
            name: "On Air Revelation",
            description: "Uncover and expose a conspiracy using the power of your radio broadcast.",
            objectives: [
                "Investigate rumors about a mind-control frequency",
                "Discover Armatek's plan to use radio waves for mass manipulation",
                "Gather evidence from their secret research facility",
                "Develop a counter-frequency to block the mind control",
                "Broadcast the truth and the counter-frequency to the wasteland"
            ],
            reward: {
                name: "Thought Shield",
                description: "A device that protects against mind control and psychic influence.",
                effect: "Immunity to mind control and confusion effects",
                icon: 79
            },
            humor: "The mind control frequency turns out to have the unintended side effect of making people spontaneously dance to disco music, which is how you first noticed something was wrong when an entire settlement broke into synchronized dancing."
        }
    ],
    finalReward: {
        name: "Voice of the Wasteland",
        description: "Your status as the most trusted and popular radio personality in the wasteland.",
        effect: "Significantly improved reputation with all factions and access to exclusive dialogue options",
        icon: 87
    }
};

module.exports = wastelandRadioDJ;