/*-------------------------------- Constants --------------------------------*/

const wordLength = 5;
const MAX_ATTEMPTS = 6;

const wordList= [{word:"apple",hint:"A common fruit, often red or green."},
    {word:"house",hint:"A building where people live."},
    {word:"chair",hint:"A piece of furniture for sitting."},
    {word:"table",hint:"A piece of furniture with a flat top and legs."},
    {word:"bread",hint:"A staple food made from flour and water."},
    {word:"water",hint:" A clear, colorless liquid essential for life."},
    {word:"sunny",hint:" Bright with sunlight."},
    {word:"happy",hint:" Feeling or showing pleasure or contentment."},
    {word:"sound",hint:"Vibrations that can be heard."},
    {word:"dance",hint:"To move rhythmically to music."},
];

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

/*-------------- Functions -------------*/

restartButton.style.display = "none";
hint.style.display = "none";

function startGame() {
    resetGameState();
    const selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    secretWord = selectedWord.word;
    secretHint = selectedWord.hint;

    hintText.textContent = secretHint;
    hintText.style.display = "inline";
    hint.style.display = "inline";
    createTiles();
    createKeyboard();
   
    startButton.style.display = "none";
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
            tile.textContent = guesses[row] ? guesses[row][i] : "";
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

    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        key.classList.remove("correct", "present", "absent");
    });
}

/*----------- Event Listeners ----------*/

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);