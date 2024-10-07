
/*-------------- Constants -------------*/

const wordList= [{word:"Apple",hint:"A common fruit, often red or green."},
    {word:"House",hint:"A building where people live."},
    {word:"Chair",hint:"A piece of furniture for sitting."},
    {word:"Table",hint:"A piece of furniture with a flat top and legs."},
    {word:"Bread",hint:"A staple food made from flour and water."},
    {word:"Water",hint:" A clear, colorless liquid essential for life."},
    {word:"Sunny",hint:" Bright with sunlight."},
    {word:"Happy",hint:" Feeling or showing pleasure or contentment."},
    {word:"Sound",hint:"Vibrations that can be heard."},
    {word:"Dance",hint:"To move rhythmically to music."},
];

/*---------- Variables (state) ---------*/
let secretWord="";
let hint="";
let currentGuess="";
let currentRow= 0;

/*----- Cached Element References  -----*/
const gameArea = document.getElementById("gameArea");
const keyboard = document.getElementById("keyboard");
const hintText = document.getElementById("hintText");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startButton");

/*-------------- Functions -------------*/

function startGame() {
    const randomPic= Math.floor(Math.random() * wordList.length);
    secretWord = wordList[randomPic].word;
    hint = wordList[randomPic].hint;
    hintText.textContent = hint;
    hintText.style.display = "inline";

    console.log("Hint: " +hint);

    currentGuess = "";
    currentRow = 0;
    gameArea.innerHTML = ""; 
    createTiles();
    createKeyboard();
}


//restart the game function
function restartGame() {
    currentRow = 0;
    currentGuess = "";
    
    const randomPic= Math.floor(Math.random() * wordList.length);
    secretWord = wordList[randomPic].word;
    hint = wordList[randomPic].hint;
    hintText.textContent = hint;
    hintText.style.display = "inline";

    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.textContent = "";
        tile.classList.remove("correct", "present", "absent");
    });
    createTiles();

    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        key.classList.remove("correct", "present", "absent");
    });

}

//end game function
function endGame(message) {
    alert(message);  
}

// keyboard cration 
function createKeyboard() {
    keyboard.innerHTML = "";
    const keys = "abcdefghijklmnopqrstuvwxyz".split("");

    keys.forEach((key) => {
        const keyElement = document.createElement("div");
        keyElement.classList.add("key");
        keyElement.textContent = key;
        keyboard.appendChild(keyElement);
    });
}

// Handle key press
function handleKeyPress(letter) {
    if (currentGuess.length < 5) {
        currentGuess += letter;
        updateTiles();
    }

    if (currentGuess.length === 5) {
        checkGuess();
    }
}

// conected to the event listener
function startButtonClick(){
startGame();
}

function restartButtonClick() { 
    restartGame() 
}

function keyboardClick(event) {
    if (event.target.classList.contains("kry")) {
        const letter = event.target.textContent;
        handeleKeyPress(letter);
    }
}

/*----------- Event Listeners ----------*/
startButton.addEventListener("click",startButtonClick);
restartButton.addEventListener("click",restartButtonClick);
keyboard.addEventListener("click",keyboardClick);