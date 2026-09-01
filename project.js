let score = 0;
let highscore = 0;
let wordBank = [];
let currPoem = []
const scoreDisplay = document.getElementById('score-display');
const highscoreDisplay = document.getElementById('highscore-display');
const currPoemDisplay = document.getElementById('poem-display');
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
    const newWord = getRandomWord()
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
    currPoem = [];
    score = 0;
    currPoemDisplay.textContent = '';
    scoreDisplay.textContent = score;
    addWord();
}
