
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
let correctGuess="";
let currentRow= 0;

/*----- Cached Element References  -----*/
const gameArea= document.getElementById("gameArea");
const keyboard= document.getElementById("keyboard");
const hintText= document.getElementById("hintText");
const restartButton= document.getElementById("restartButton");
const startButton= document.getElementById("startButton");

/*-------------- Functions -------------*/



/*----------- Event Listeners ----------*/
startButton.addEventListener("click",startButtonClick);
restartButton.addEventListener("click",restartButtonClick);
keyboard.addEventListener("click",keyboardClick);