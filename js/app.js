/*-------------------------------- Constants --------------------------------*/

const wordLength = 5;
const MAX_ATTEMPTS = 6;

const wordList= [
    { "word": "apple", "hint": "This fruit is often associated with knowledge and temptation, and is a common symbol in various cultures." },
    { "word": "house", "hint": "This structure provides shelter and is often a reflection of its inhabitants' personalities and lifestyles." },
    { "word": "chair", "hint": "An essential piece of furniture, often designed for comfort during prolonged periods of sitting." },
    { "word": "table", "hint": "Typically used for dining or working, this object serves as a surface for various activities." },
    { "word": "bread", "hint": "A fundamental food item, historically referred to as the 'staff of life,' with countless regional variations." },
    { "word": "water", "hint": "This vital compound, essential for all known forms of life, exists in three states: solid, liquid, and gas." },
    { "word": "sunny", "hint": "Describing a condition characterized by the absence of clouds and an abundance of light from the star at the center of our solar system." },
    { "word": "happy", "hint": "An emotional state often characterized by feelings of joy, satisfaction, or contentment, sometimes associated with personal achievements." },
    { "word": "sound", "hint": "This phenomenon can be perceived through the auditory system and is produced by vibrating objects." },
    { "word": "dance", "hint": "A form of expression involving coordinated movement, often performed in response to music or rhythm." }
]
/*---------- Variables (state) ---------*/

let secretWord = "";
let secretHint = "";
let currentGuess = "";
let guesses = [];
let currentRow = 0;

/*----- Cached Element References  -----*/

const gameArea = document.getElementById("gameArea");
const keyboard = document.getElementById("keyboard");
const hintText = document.getElementById("hintText");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startButton");
const messageArea = document.getElementById("messageArea");
const gameDis = document.getElementById("gameDis");

/*-------------- Functions -------------*/

restartButton.style.display = "none";
hint.style.display = "none";

function startGame() {
    resetGameState();
    const selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    secretWord = selectedWord.word;
    secretHint = selectedWord.hint;

    hintText.textContent = `Hint: ${secretHint}`;
    hintText.style.display = "inline";
    hint.style.display = "inline";
    createTiles();
    createKeyboard();
   
    startButton.style.display = "none";
    gameDis.style.display = "none";
}

function restartGame() {
    startGame();
    restartButton.style.display = "none";
    messageArea.textContent = "";
}


function createTiles() {
    for (let i = 0; i < MAX_ATTEMPTS * wordLength; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("id", `tile-${i}`);
        gameArea.appendChild(tile);
    }
}

function createKeyboard() {
    keyboard.innerHTML = "";
    const keys = "abcdefghijklmnopqrstuvwxyz".split("");

    keys.forEach((key) => {
        const keyElement = document.createElement("div");
        keyElement.classList.add("key");
        keyElement.textContent = key;
        keyboard.appendChild(keyElement);

        keyElement.addEventListener("click", () => handleKeyPress(key));
    });
}

function handleKeyPress(letter) {
    if (currentGuess.length < wordLength) {
        currentGuess += letter;
        updateTiles();
    }

    if (currentGuess.length === wordLength) {
        checkGuess();
    }
}

function updateTiles() {
    for (let row = 0; row <= currentRow; row++) {
        for (let i = 0; i < wordLength; i++) {
            const tile = document.getElementById(`tile-${row * wordLength + i}`);
            tile.textContent = guesses[row] ? guesses[row][i] : ""; // (?) other way to do if else 
        }
    }

    for (let i = 0; i < wordLength; i++) {
        const tile = document.getElementById(`tile-${currentRow * wordLength + i}`);
        tile.textContent = currentGuess[i] ;
    }
}

function checkGuess() {
    if (currentGuess.length !== wordLength) {
        return;
    }
    guesses[currentRow] = currentGuess;
    revealTiles();

    if (currentGuess === secretWord) {
        endGame("You Win!");
    } else if (currentRow === MAX_ATTEMPTS - 1) {
        endGame(`You Lose! The word was: ${secretWord}`);
    } else {
        currentRow++;
        currentGuess = "";
    }
}

function revealTiles() {
    for (let i = 0; i < wordLength; i++) {
        const tile = document.getElementById(`tile-${currentRow * wordLength + i}`);
        const letter = currentGuess[i];

        setTimeout(() => {
            tile.style.transform = "rotateX(90deg)";
            setTimeout(() => {
                tile.style.transform = "rotateX(0deg)";
                tile.style.transition = "background-color 0.3s ease";

                if (secretWord[i] === letter) {
                    tile.classList.add("correct");
                } else if (secretWord.includes(letter)) {
                    tile.classList.add("present");
                } else {
                    tile.classList.add("absent");
                }
            }, 300);
        }, i * 500);
    }
}


function endGame(message) {
    messageArea.textContent = message;
    restartButton.style.display = "block";
}

function resetGameState() {
    currentRow = 0;
    currentGuess = "";
    gameArea.innerHTML = "";
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.textContent = "";
        tile.classList.remove("correct", "present", "absent");
    });
}

/*----------- Event Listeners ----------*/

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);