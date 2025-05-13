/**
 * Flames of Resistance: A Fahrenheit 451-inspired board game
 * Trivia questions about Fahrenheit 451
 */

const triviaQuestions = [
    {
        question: "What temperature does Bradbury claim is the temperature at which book paper burns (in Fahrenheit)?",
        options: ["351°F", "451°F", "551°F", "651°F"],
        correctIndex: 1,
        explanation: "The title of the book, '451°F,' refers to the temperature at which Bradbury believed book paper combusts."
    },
    {
        question: "What is the name of the main protagonist in Fahrenheit 451?",
        options: ["Captain Beatty", "Guy Montag", "Professor Faber", "Clarisse McClellan"],
        correctIndex: 1,
        explanation: "Guy Montag is the protagonist, a fireman who begins to question his role in burning books."
    },
    {
        question: "What is Guy Montag's profession at the beginning of the novel?",
        options: ["Teacher", "Policeman", "Fireman", "Librarian"],
        correctIndex: 2,
        explanation: "In this dystopian future, firemen don't put out fires; they start them to burn books."
    },
    {
        question: "Which young woman opens Montag's eyes to the emptiness of his life?",
        options: ["Mildred", "Clarisse", "Faber's daughter", "Mrs. Phelps"],
        correctIndex: 1,
        explanation: "Clarisse McClellan is a young, free-thinking neighbor who makes Montag question his happiness and purpose."
    },
    {
        question: "What is the mechanical hound used for in the novel?",
        options: ["Finding lost children", "Hunting book owners", "Guarding the fire station", "Entertainment for firemen"],
        correctIndex: 1,
        explanation: "The mechanical hound is a robotic dog-like creature that hunts down and kills those who possess books."
    },
    {
        question: "What happens to Clarisse in the novel?",
        options: ["She marries Montag", "She moves to another city", "She disappears/is killed", "She becomes a fireman"],
        correctIndex: 2,
        explanation: "Clarisse mysteriously disappears and is presumed dead, hit by a speeding car."
    },
    {
        question: "What does Montag's wife Mildred do that almost kills her?",
        options: ["Takes an overdose of sleeping pills", "Jumps from a window", "Sets herself on fire", "Starves herself"],
        correctIndex: 0,
        explanation: "Mildred takes an overdose of sleeping pills, though she claims it was an accident when she recovers."
    },
    {
        question: "What does Mildred spend most of her time doing?",
        options: ["Reading secretly", "Working as a nurse", "Watching interactive wall-sized TVs", "Gardening"],
        correctIndex: 2,
        explanation: "Mildred is addicted to interactive television shows that play on three wall-sized screens, which she calls her 'family'."
    },
    {
        question: "What does Montag do to Captain Beatty?",
        options: ["Promotes him", "Burns him with the flamethrower", "Hides him from authorities", "Convinces him to join the book people"],
        correctIndex: 1,
        explanation: "Montag burns Captain Beatty with his flamethrower after Beatty discovers Montag's book collection."
    },
    {
        question: "What group of people does Montag meet by the river at the end of the novel?",
        options: ["Revolutionary soldiers", "Book people who memorize books", "Government officials", "Other firemen who changed sides"],
        correctIndex: 1,
        explanation: "Montag meets the 'book people,' a group of former academics who each memorize a book to preserve literature."
    },
    {
        question: "What natural disaster occurs at the end of the novel?",
        options: ["Earthquake", "Flood", "Nuclear war/bombing", "Tornado"],
        correctIndex: 2,
        explanation: "The novel ends with the city being destroyed by nuclear bombs, while Montag and the book people survive in the countryside."
    },
    {
        question: "What mythological creature does Bradbury reference in relation to Montag's transformation?",
        options: ["Phoenix", "Dragon", "Griffin", "Minotaur"],
        correctIndex: 0,
        explanation: "The phoenix symbolizes rebirth and transformation, paralleling Montag's journey from book-burner to book-preserver."
    },
    {
        question: "What do the 'parlor walls' represent in the novel?",
        options: ["Safety", "Knowledge", "Censorship", "Distraction and escapism"],
        correctIndex: 3,
        explanation: "The parlor walls (wall-sized TVs) represent how society uses mindless entertainment to distract people from thinking critically."
    },
    {
        question: "Who helps Montag understand the books he's trying to read?",
        options: ["Mildred", "Captain Beatty", "Professor Faber", "Granger"],
        correctIndex: 2,
        explanation: "Professor Faber, a former English professor, helps Montag understand the books and provides him with a two-way radio earpiece."
    },
    {
        question: "What book does Montag memorize at the end?",
        options: ["Book of Ecclesiastes", "Book of Genesis", "Book of Revelation", "Book of Psalms"],
        correctIndex: 0,
        explanation: "Montag begins to memorize the Book of Ecclesiastes from the Bible, becoming a living vessel for this text."
    }
];

/**
 * Events that can occur during gameplay
 */
const events = [
    {
        description: "You find a hidden cache of banned books!",
        effect: {
            type: "books",
            value: 2
        }
    },
    {
        description: "A neighbor reports suspicious activity in your home.",
        effect: {
            type: "censorship",
            value: 2
        }
    },
    {
        description: "You attend a secret meeting of the resistance.",
        effect: {
            type: "knowledge",
            value: 3
        }
    },
    {
        description: "The mechanical hound picks up your scent!",
        effect: {
            type: "move",
            value: -3
        }
    },
    {
        description: "You help another book person memorize a chapter.",
        effect: {
            type: "knowledge",
            value: 2
        }
    },
    {
        description: "A fireman patrol passes by. You must hide quickly!",
        effect: {
            type: "move",
            value: -2
        }
    },
    {
        description: "You manage to convert a fireman to your cause.",
        effect: {
            type: "censorship",
            value: -2
        }
    },
    {
        description: "Your hidden books are discovered and burned.",
        effect: {
            type: "books",
            value: -1
        }
    },
    {
        description: "You find a working radio and listen to underground broadcasts.",
        effect: {
            type: "knowledge",
            value: 2
        }
    },
    {
        description: "You discover a secret passage leading to a safe house.",
        effect: {
            type: "move",
            value: 3
        }
    },
    {
        description: "Captain Beatty becomes suspicious of your activities.",
        effect: {
            type: "censorship",
            value: 3
        }
    },
    {
        description: "You successfully memorize a chapter from a classic novel.",
        effect: {
            type: "knowledge",
            value: 3
        }
    }
];
