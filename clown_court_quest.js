// Clown Court Justice Quest Line for MegaEarth 2049

const clownCourtJustice = {
    name: "Clown Court Justice",
    description: "Navigate the bizarre underground legal system of the Clown Court to clear your name of a crime you didn't commit.",
    startingNPC: {
        name: "Judge Bozo",
        location: "Timbuc Underground (Map011)",
        appearance: "People2",
        index: 0,
        dialogue: [
            "*A stern-looking clown bangs a rubber chicken on the desk*",
            "Order in the court! Order in the court!",
            "You have been accused of First-Degree Buzzkill, a serious offense!",
            "Report to the Clown Court immediately for your trial, or face the consequences!"
        ],
        x: 18,
        y: 7
    },
    sideQuests: [
        {
            name: "Legal Representation",
            description: "Find a lawyer willing to represent you in the bizarre Clown Court system.",
            objectives: [
                "Search for lawyers in Timbuc's entertainment district",
                "Complete a series of increasingly absurd 'interviews'",
                "Convince the Sad Mime to break their vow of silence to defend you",
                "Help them prepare your defense using clown legal precedents",
                "Officially register them as your legal representation"
            ],
            reward: {
                name: "Mime Makeup Kit",
                description: "A kit that allows you to disguise yourself as a mime.",
                effect: "Grants invisibility when standing completely still",
                icon: 144
            },
            humor: "The Sad Mime's legal strategy consists entirely of elaborate charades that somehow make perfect sense to everyone in the court except you."
        },
        {
            name: "Gathering Evidence",
            description: "Collect evidence to prove your innocence in the Clown Court.",
            objectives: [
                "Interview witnesses to the alleged buzzkill",
                "Collect security footage from the scene",
                "Find the real culprit who was wearing your face paint",
                "Document instances of your own humor and joviality",
                "Organize all evidence in a way that will amuse the jury"
            ],
            reward: {
                name: "Joke Book",
                description: "A collection of the worst puns and dad jokes in the wasteland.",
                effect: "Can be used to temporarily stun enemies with terrible humor",
                icon: 121
            },
            humor: "The 'evidence' in Clown Court must be presented in the form of a slapstick routine, with more laughs equaling more credibility."
        },
        {
            name: "Jury Selection",
            description: "Help select a jury that might be sympathetic to your case.",
            objectives: [
                "Study the profiles of potential jurors",
                "Participate in the 'Jury Circus' selection process",
                "Perform comedy routines to impress favorable jurors",
                "Use strategic pie-throwing to disqualify biased jurors",
                "Finalize a jury of 12 clowns, mimes, and jesters"
            ],
            reward: {
                name: "Cream Pie Launcher",
                description: "A weapon that fires custard pies with surprising force.",
                effect: "Temporarily blinds enemies and causes them to slip and fall",
                icon: 98
            },
            humor: "The jury selection process includes tests like 'how many jurors can fit in a tiny car' and 'who can make the most convincing honking noise'."
        },
        {
            name: "The Trial",
            description: "Survive the chaotic trial in Clown Court and present your case.",
            objectives: [
                "Endure the opening statements (which are actually song-and-dance numbers)",
                "Cross-examine witnesses while standing on a unicycle",
                "Present your evidence during the 'Funny Evidence Hour'",
                "Make your closing argument while dodging thrown objects",
                "Await the jury's verdict, delivered via confetti cannon"
            ],
            reward: {
                name: "Legal Precedent",
                description: "A document that can be used to get out of future legal trouble.",
                effect: "Automatically win certain confrontations with authority figures",
                icon: 87
            },
            humor: "The judge keeps overruling objections by honking a horn, and sustaining them by squirting water from a flower on his lapel."
        },
        {
            name: "Sentence Commutation",
            description: "Even if found innocent, you must perform community service to the clown community.",
            objectives: [
                "Entertain sick children at the Wasteland Hospital",
                "Repair the Clown Court's dilapidated big top",
                "Recover stolen clown supplies from a gang of anti-comedy terrorists",
                "Train a new generation of clown lawyers",
                "Organize a parade to restore public faith in the Clown Court system"
            ],
            reward: {
                name: "Clown Credentials",
                description: "Official recognition as an honorary clown.",
                effect: "Access to secret clown passages throughout the city",
                icon: 145
            },
            humor: "Your community service supervisor is a former executioner clown who keeps 'accidentally' dropping guillotine blades and then acting surprised when they bounce like rubber."
        }
    ],
    finalReward: {
        name: "Diplomatic Immunity",
        description: "Your status as a Clown Court alumnus grants you special legal privileges throughout the wasteland.",
        effect: "Immunity to arrest and prosecution by conventional authorities",
        icon: 105
    }
};

// Export the quest line
module.exports = clownCourtJustice;
