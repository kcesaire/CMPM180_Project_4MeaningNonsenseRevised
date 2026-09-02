let score = 0;
let highscore = 0;
let wordBank = [];
let currPoem = [];
let allNonsensePoems = [];

const scoreDisplay = document.getElementById('score-display');
const highscoreDisplay = document.getElementById('highscore-display');
const currPoemDisplay = document.getElementById('poem-display');
const poemWall = document.getElementById('poem-wall');

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        wordBank = data.words;
        addWord();
    })
    .catch(error => console.error('Error loading JSON:', error));

function getRandomWord() {
    if (wordBank.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

function addWord(){
    const newWord = getRandomWord();
    if(newWord){
        currPoem.push(newWord);
        currPoemDisplay.textContent = currPoem.join(' ');
    }
    
    score += 1;
    if (score > highscore){
        highscore = score;
    }

    scoreDisplay.textContent = score;
    highscoreDisplay.textContent = highscore;
}

function clearPoem(){
    if (currPoem.length > 0 && poemWall) {
        const poemText = currPoem.join(' ');
        
        allNonsensePoems.unshift(poemText);
        
        const p = document.createElement('p');
        p.className = 'background-poem-item';
        p.textContent = poemText;
        poemWall.prepend(p);
    }
    
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

    currPoem = [];
    score = 0;
    currPoemDisplay.textContent = '';
    scoreDisplay.textContent = score;

    addWord();
}