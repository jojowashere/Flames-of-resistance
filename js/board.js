/**
 * Flames of Resistance: A Fahrenheit 451-inspired board game
 * Board space definitions with branching paths
 */

const boardSpaces = [
    // Starting space
    {
        name: "Resistance HQ",
        type: "safe-house",
        icon: "fas fa-home",
        connections: [1, 2]  // This space connects to spaces 1 and 2
    },
    // Path A - Upper Route
    {
        name: "Book Cache",
        type: "book",
        icon: "fas fa-book",
        connections: [3, 4]
    },
    // Path B - Lower Route
    {
        name: "Literary Trivia",
        type: "trivia",
        icon: "fas fa-question",
        connections: [5, 6]
    },
    // Path A continuation
    {
        name: "City Park",
        type: "event",
        icon: "fas fa-tree",
        connections: [7]
    },
    {
        name: "Fireman Patrol",
        type: "danger",
        icon: "fas fa-fire",
        connections: [8]
    },
    // Path B continuation
    {
        name: "Abandoned Library",
        type: "book",
        icon: "fas fa-book",
        connections: [9]
    },
    {
        name: "Underground Meeting",
        type: "event",
        icon: "fas fa-comments",
        connections: [10]
    },
    // Paths converge at shop
    {
        name: "Resistance Shop",
        type: "shop",
        icon: "fas fa-store",
        connections: [11, 12, 13]
    },
    // Path A from shop
    {
        name: "Safe House",
        type: "safe-house",
        icon: "fas fa-home",
        connections: [14]
    },
    // Path B from shop
    {
        name: "Mechanical Hound",
        type: "danger",
        icon: "fas fa-dog",
        connections: [15]
    },
    // Path C from shop
    {
        name: "Hidden Stash",
        type: "book",
        icon: "fas fa-book",
        connections: [16]
    },
    // Upper Path continues
    {
        name: "Literary Trivia",
        type: "trivia",
        icon: "fas fa-question",
        connections: [17, 18]
    },
    // Middle Path continues
    {
        name: "Unexpected Event",
        type: "event",
        icon: "fas fa-exclamation",
        connections: [19, 20]
    },
    // Lower Path continues
    {
        name: "Fireman Headquarters",
        type: "danger",
        icon: "fas fa-fire",
        connections: [21]
    },
    // Branching path
    {
        name: "Secret Passage",
        type: "event",
        icon: "fas fa-door-open",
        connections: [25, 26] // Skip ahead on the board
    },
    // Row 3 - Paths converge
    {
        name: "Book People Camp",
        type: "safe-house",
        icon: "fas fa-campground",
        connections: [22, 23]
    },
    {
        name: "Literary Trivia",
        type: "trivia",
        icon: "fas fa-question",
        connections: [24]
    },
    {
        name: "Rare Manuscript",
        type: "book",
        icon: "fas fa-book",
        connections: [24]
    },
    {
        name: "City Alert",
        type: "danger",
        icon: "fas fa-exclamation-triangle",
        connections: [28]
    },
    {
        name: "Resistance Shop",
        type: "shop",
        icon: "fas fa-store",
        connections: [28, 29]
    },
    {
        name: "Literary Trivia",
        type: "trivia",
        icon: "fas fa-question",
        connections: [30]
    },
    {
        name: "Banned Book",
        type: "book",
        icon: "fas fa-book",
        connections: [30]
    },
    // Row 4 - Multiple paths
    {
        name: "Professor's House",
        type: "safe-house",
        icon: "fas fa-university",
        connections: [31, 32]
    },
    {
        name: "Search Party",
        type: "danger",
        icon: "fas fa-search",
        connections: [33]
    },
    {
        name: "Literary Trivia",
        type: "trivia",
        icon: "fas fa-question",
        connections: [33]
    },
    {
        name: "Unexpected Event",
        type: "event",
        icon: "fas fa-exclamation",
        connections: [34, 35]
    },
    {
        name: "Ancient Text",
        type: "book",
        icon: "fas fa-book",
        connections: [36]
    },
    {
        name: "Fireman Ambush",
        type: "danger",
        icon: "fas fa-fire",
        connections: [37]
    },
    {
        name: "Literary Trivia",
        type: "trivia",
        icon: "fas fa-question",
        connections: [38]
    },
    // Row 5 - Moving toward finale
    {
        name: "Riverside Camp",
        type: "safe-house",
        icon: "fas fa-water",
        connections: [39, 40]
    },
    {
        name: "Unexpected Event",
        type: "event",
        icon: "fas fa-exclamation",
        connections: [41]
    },
    {
        name: "Banned Book",
        type: "book",
        icon: "fas fa-book",
        connections: [41]
    },
    {
        name: "Resistance Shop",
        type: "shop",
        icon: "fas fa-store",
        connections: [42, 43]
    },
    {
        name: "Mechanical Hound",
        type: "danger",
        icon: "fas fa-dog",
        connections: [44]
    },
    {
        name: "Unexpected Event",
        type: "event",
        icon: "fas fa-exclamation",
        connections: [44]
    },
    {
        name: "Poetry Collection",
        type: "book",
        icon: "fas fa-feather-alt",
        connections: [45, 46]
    },
    // Row 6 - Final approaches
    {
        name: "Abandoned Station",
        type: "safe-house",
        icon: "fas fa-subway",
        connections: [47]
    },
    {
        name: "Literary Trivia",
        type: "trivia",
        icon: "fas fa-question",
        connections: [47]
    },
    {
        name: "City Alarm",
        type: "danger",
        icon: "fas fa-bell",
        connections: [48]
    },
    {
        name: "Unexpected Event",
        type: "event",
        icon: "fas fa-exclamation",
        connections: [48]
    },
    {
        name: "Final Resistance Shop",
        type: "shop",
        icon: "fas fa-store",
        connections: [49]
    },
    {
        name: "Classic Novel",
        type: "book",
        icon: "fas fa-book",
        connections: [49]
    },
    {
        name: "Fireman Patrol",
        type: "danger",
        icon: "fas fa-fire",
        connections: [49]
    },
    // Final space
    {
        name: "Countryside",
        type: "safe-house",
        icon: "fas fa-mountain",
        connections: [0] // Loops back to start
    }
];
