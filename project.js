/* =========================================================================
   1. STATE VARIABLES (Global State)
   - In Python, these are your global variables storing numbers and lists.
   - 'let' declares a variable that can be reassigned later.
   ========================================================================= */
let score = 0;
let highscore = 0;
let wordBank = [];           // Python: word_bank = []
let currPoem = [];           // Python: curr_poem = [] (list of words in the active poem)
let allNonsensePoems = [];   // History of dismissed poems

/* =========================================================================
   2. DOM ELEMENT REFERENCES
   - In Python, printing to a console is just print(). In a browser, we must
     grab references to specific HTML elements in the DOM tree using their IDs.
   - 'const' declares a constant reference (the pointer won't change).
   ========================================================================= */
const scoreDisplay = document.getElementById('score-display');
const highscoreDisplay = document.getElementById('highscore-display');
const currPoemDisplay = document.getElementById('poem-display');
const poemWall = document.getElementById('poem-wall');

/* =========================================================================
   3. ASYNCHRONOUS DATA LOADING (Fetching words.json)
   - Unlike Python's synchronous `with open("words.json") as f:`, browsers load
     files over HTTP asynchronously so the user interface doesn't freeze.
   - Promises (.then): "Go download this, and WHEN you finish, run this callback."
   ========================================================================= */
fetch('words.json')
    .then(response => response.json()) // Step 1: Parse incoming raw text as JSON (like json.loads())
    .then(data => {
        // Step 2: Access data["words"] and save to our wordBank list
        wordBank = data.words;
        // Seed the page with the initial word once the dictionary is ready
        addWord();
    })
    .catch(error => console.error('Error loading JSON:', error)); // Exception handler (like except Exception as e:)

/* =========================================================================
   4. HELPER FUNCTIONS
   ========================================================================= */

/**
 * Picks a random word from wordBank.
 * Python equivalent:
 *   import random
 *   return random.choice(word_bank) if word_bank else ''
 */
function getRandomWord() {
    if (wordBank.length === 0) return '';
    
    // Math.random() returns a float in [0, 1)
    // Multiply by length and Math.floor() to get a valid integer index [0, len - 1]
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

/**
 * Adds a word to the active poem, updates current and high scores,
 * and refreshes the DOM elements on the screen.
 * Bound to the "Meaningful" button in index.html.
 */
function addWord(){
    const newWord = getRandomWord();
    if (newWord) {
        currPoem.push(newWord);              // Python: curr_poem.append(new_word)
        currPoemDisplay.textContent = currPoem.join(' '); // Python: " ".join(curr_poem)
    }
    
    score += 1;
    if (score > highscore){
        highscore = score;
    }

    // Reflect the updated state in the HTML (DOM manipulation)
    scoreDisplay.textContent = score;
    highscoreDisplay.textContent = highscore;
}

/**
 * Resets the active poem, dumps it onto the background wall,
 * resets the current streak score, and contains an easter egg.
 * Bound to the "Nonsense" button in index.html.
 */
function clearPoem(){
    // Only save to background wall if a poem actually exists
    if (currPoem.length > 0 && poemWall) {
        const poemText = currPoem.join(' ');
        
        // Add to history array at index 0 (Python: all_nonsense_poems.insert(0, poem_text))
        allNonsensePoems.unshift(poemText);
        
        // Dynamically create a new <p> node in memory and attach it to the webpage
        const p = document.createElement('p');
        p.className = 'background-poem-item';
        p.textContent = poemText;
        poemWall.prepend(p); // Inserts as the first child of the background container
    }
    
    // Easter Egg: 30% chance (Math.random() < 0.3) of triggering a modal lock
    // WARNING: In JavaScript, while(true) with alert() creates an infinite blocking loop!
    if (Math.random() < 0.3) {
        while (true) {
            window.alert("Are you sure?");
            window.alert("Are you really sure?");
            window.alert("I tried really hard.");
            window.alert("I don't feel appreciated.");
            window.alert("Can you think a little harder?");
            window.alert("I think you should leave.");
            window.alert("I'm a little tired of this.");
            window.alert("I think you should leave.");
            window.alert("I think you should leave.");
            window.alert("I think you should leave.");
            window.alert("I think you should leave.");
            window.alert("I think you should leave.");
            window.alert("I think you should leave.");
            window.alert("Aren't you tired of this too?");
        }
    }

    // Reset local state back to defaults
    currPoem = [];
    score = 0;
    currPoemDisplay.textContent = '';
    scoreDisplay.textContent = score;

    // Start fresh with 1 word
    addWord();
}