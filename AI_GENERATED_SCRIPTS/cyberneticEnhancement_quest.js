// Cybernetic Enhancement Quest Line for MegaEarth 2049

const cyberneticEnhancement = {
    name: "Cybernetic Enhancement",
    description: "Explore the ethical and physical boundaries of cybernetic modification with a rogue enhancement specialist.",
    startingNPC: {
        name: "Dr. Circuit",
        location: "The Squeaky Clean (Map105)",
        appearance: "Actor1",
        index: 0,
        dialogue: [
            "*A person with visible cybernetic implants and a mechanical eye adjusts something under their skin with a small tool*",
            "The corps sell watered-down implants with built-in obsolescence and monitoring. Pathetic.",
            "I push the boundaries of what's possible. True integration of human and machine. No limits, no corporate leashes.",
            "You look like someone who understands that the body is just hardware waiting to be upgraded. Interested in evolution?"
        ],
        x: 6,
        y: 7
    },
    sideQuests: [
        {
            name: "Parts Acquisition",
            description: "Gather rare and experimental components for cutting-edge cybernetic enhancements.",
            objectives: [
                "Steal prototype neural interfaces from NeuraTech's R&D lab",
                "Recover military-grade servo motors from an OmniCorp security depot",
                "Extract rare metals from an abandoned Armatek mining facility",
                "Acquire experimental power cells from a Quantum Dynamics test site",
                "Return all components to Dr. Circuit's workshop"
            ],
            reward: {
                name: "Subdermal Tool Kit",
                description: "Cybernetic tools implanted under your fingertips.",
                effect: "Improved lockpicking and electronics hacking abilities",
                icon: 83
            },
            humor: "The 'military-grade' servo motors turn out to have been designed for a dancing robot mascot for OmniCorp's scrapped 'friendlier image' campaign, resulting in your cybernetic enhancements occasionally forcing you to break into a perfectly choreographed corporate jingle dance routine at random moments."
        },
        {
            name: "Guinea Pig",
            description: "Test experimental cybernetic enhancements with unpredictable effects.",
            objectives: [
                "Test the enhanced reaction system in combat situations",
                "Evaluate the sensory amplification suite in various environments",
                "Stress-test the strength augmentation under extreme conditions",
                "Analyze the neural processing accelerator during complex tasks",
                "Report all test results and side effects to Dr. Circuit"
            ],
            reward: {
                name: "Adaptive Cybernetics",
                description: "Implants that learn and improve based on your activities.",
                effect: "Gradual stat increases in attributes you use most frequently",
                icon: 79
            },
            humor: "The sensory amplification suite works too well, giving you the ability to smell emotions, which is less useful than it sounds when you discover that fear smells like burnt toast, confusion smells like wet socks, and attraction inexplicably smells like discount furniture stores."
        },
        {
            name: "Rejection Syndrome",
            description: "Help Dr. Circuit solve a dangerous cybernetic rejection issue affecting patients.",
            objectives: [
                "Collect biological samples from patients experiencing rejection",
                "Steal immunosuppressant research from Vitalix laboratories",
                "Test potential solutions on volunteer patients",
                "Develop a permanent fix for the rejection syndrome",
                "Distribute the solution to affected enhancement recipients"
            ],
            reward: {
                name: "Organic Interface",
                description: "A biotechnological solution that prevents cybernetic rejection.",
                effect: "Allows installation of one additional cybernetic enhancement beyond normal limits",
                icon: 79
            },
            humor: "Your 'breakthrough' solution involves a cocktail partially derived from cockroach immune systems, leading to the unfortunate side effect of enhanced patients unconsciously scuttling sideways into dark corners whenever someone turns on lights suddenly, which Dr. Circuit insists is 'a small price to pay for progress.'"
        },
        {
            name: "Corporate Sabotage",
            description: "Undermine a MegaCorp's plan to release dangerous mass-market cybernetics with hidden control features.",
            objectives: [
                "Infiltrate NeuraTech's product launch event",
                "Hack into their presentation system",
                "Replace their promotional material with evidence of the hidden control features",
                "Sabotage the prototype displays to demonstrate the dangers",
                "Escape before security identifies you"
            ],
            reward: {
                name: "Firewall Implant",
                description: "A cybernetic defense system against external control.",
                effect: "Immunity to hacking and mind control attempts",
                icon: 83
            },
            humor: "Your sabotage of the prototype display causes the NeuraTech executive to involuntarily perform the 'chicken dance' during his presentation about how their implants offer 'unprecedented control and dignity,' while the leaked documents display on screen reveal that the implants' primary function is to make users more susceptible to advertising and more likely to buy NeuraTech products."
        },
        {
            name: "More Machine Than Human",
            description: "Help Dr. Circuit with their most ambitious project yet: a full-body cybernetic conversion.",
            objectives: [
                "Secure a private medical facility for the procedure",
                "Acquire specialized surgical equipment from the B.M.N.E.C.",
                "Help prepare the volunteer patient for the conversion process",
                "Assist Dr. Circuit during the complex, multi-stage surgery",
                "Monitor the patient's adaptation to their new cybernetic body"
            ],
            reward: {
                name: "Transcendence Blueprint",
                description: "Plans for the most advanced cybernetic enhancements possible.",
                effect: "Unlocks unique cybernetic upgrade options at Dr. Circuit's workshop",
                icon: 79
            },
            humor: "The patient adapts remarkably well to their new fully cybernetic body but becomes obsessed with finding the perfect accessories for it, spending hours debating whether flame decals would be 'too much' and installing different sound chips so they can choose what noise their footsteps make, with options ranging from 'dramatic movie soundtrack' to 'squeaky toy' to 'disappointed sigh.'"
        }
    ],
    finalReward: {
        name: "Cybernetic Mastery",
        description: "The pinnacle of human-machine integration.",
        effect: "Access to Dr. Circuit's full suite of experimental enhancements and the ability to exceed normal cybernetic limits",
        icon: 87
    }
};

module.exports = cyberneticEnhancement;
