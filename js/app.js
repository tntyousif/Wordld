
/*-------------- Constants -------------*/

const wordList= [{word:"Apple",hint:"A common fruit, often red or green."},
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
let secretWord="";
let hint="";
let currentGuess="";
let currentColumn= 0;

/*----- Cached Element References  -----*/
const gameArea = document.getElementById("gameArea");
const keyboard = document.getElementById("keyboard");
const hintText = document.getElementById("hintText");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startButton");
const tiles = document.getElementById('gameArea').children;

/*-------------- Functions -------------*/

function startGame() {
    const randomPic= Math.floor(Math.random() * wordList.length);
    secretWord = wordList[randomPic].word;
    hint = wordList[randomPic].hint;
    hintText.textContent = hint;
    hintText.style.display = "inline";

    console.log("Hint: " +hint);

    currentGuess = "";
    currentColumn = 0;
    gameArea.innerHTML = ""; 
    createTiles();
    createKeyboard();
    startButton.style.display = "none";
}


//restart the game function
function restartGame() {
    currentColumn = 0;
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


//Tile creation 
function createTiles() {
    for (let i=0; i<5; i++ ){
        const columnContainer = document.createElement("div");
        columnContainer.setAttribute("id",`column ${i}`);

        for (let column = 0; column < 6; column++) {
            const tile= document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("id",`tile-${i*5 + column }`);
            columnContainer.appendChild(tile);

            const letterDive = document.createElement("div");
            letterDive.classList.add("letter");
            tile.appendChild(letterDive);
        }

        gameArea.appendChild(columnContainer);
    }
}

//Update Tiles
function updateTiles() {
    
    for (let i = 0; i < currentGuess.length; i++) {
        const tile = document.getElementById(`tile-${currentColumn * 5 + i}`);
        const letterDiv = tile.querySelector(".letter");
        letterDiv.textContent = currentGuess[i];
    }
    
    for (let i = currentGuess.length; i < tiles.length; i++) {
        const tile = document.getElementById(`tile-${currentColumn * 5 + i}`);
        const letterDiv = tile.querySelector(".letter");
        letterDiv.textContent = '';
    }
}

function checkGuess() {
    if (wordList.map(wordObj => wordObj.word).includes(currentGuess)) {
        revealTiles();
        if (currentGuess === secretWord) {
            endGame("You Win!");
        }
        else if (currentColumn === 6) {
            endGame(`You Lose! The word was ${secretWord}`);
        }
        else {
            currentColumn++;
            currentGuess="";
        }
    }
}

//Reveal the gussed letters
function revealTiles() {
    for (let i =0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentColumn * 5 + i}`);
        const letter = currentGuess[i];
    
        setTimeout(() => {
            tile.style.transform = "rotateX(90deg)";
            setTimeout(() => {
                tile.style.transform = "rotateX(0deg)";
                tile.style.transition = "background-color 0.3s ease";
                
                if (secretWord[i] === letter) {
                    tile.classList.add("correct");
                    updateKeyboard(letter, "correct");
                } else if (secretWord.includes(letter)) {
                    tile.classList.add("present");
                    updateKeyboard(letter, "present");
                } else {
                    tile.classList.add("absent");
                    updateKeyboard(letter, "absent");
                }
            }, 300);
        }, i*500);

    }

}

//update keyboard on guess
function updateKeyboard(letter,status) {
    const keyElement = Array.from(keyboard.children).find((key)=> key.textContent === letter);
    if (keyElement && !keyElement.classList.contains("correct")) {
        keyElement.classList.add(status);
    }
}

// Handle key press
function handleKeyPress(letter) {
    if (currentGuess.length < tiles.length) {
        currentGuess += letter;
        updateTiles();

        if (currentGuess.length === tiles.length) {
            checkGuess();
        }
    }
}

// conected to the event listener
function startButtonClick(){
startGame();
}

function restartButtonClick() { 
    restartGame();
}

function keyboardClick(event) {
    if (event.target.classList.contains("key")) {
        const letter = event.target.textContent;
        handleKeyPress(letter);
    }
}

/*----------- Event Listeners ----------*/
startButton.addEventListener("click",startButtonClick);
restartButton.addEventListener("click",restartButtonClick);
keyboard.addEventListener("click",keyboardClick);



document.addEventListener('keydown', function(event) {
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        handleKeyPress(event.key);
    }
});

document.getElementById('keyboard').addEventListener('click', function(event) {
    event.preventDefault();
    return false;
});