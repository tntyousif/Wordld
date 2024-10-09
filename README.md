# Letter Quest

## The game Idea
Letter Quest is a wordle game, wher the player have to guess the secret word the user have six chances to correctly. to insert the guessed word the player has to interact with the on-scereen keyboard aftre every word the player guessed the letters will be colored baced on the status of the letter in the secrert word (correct letter: green, misplaced letter: yellow, incorrect letter: gray). If the player guessed the secret word a win message will appear, if the player did not guess the secret word and he used all the possible guesses lose message will appear and the secret word will be revile.

---

## Game pseudo code
 
1. game steps
Define five letter words, Randomly select one Worde from the list as the guessed word, display a hint related to the word, display empty six rows of five column grid for the guesses, display a keyboard on-screen with all the 26 characters, initialize variables to track the current guess and the state of the keyboard (correct, mis-placed, wrong)
 
2. user interaction:
When the user clicks on a letter on the keyboard if the current guess is less than five letters, add the clicked letter to the current guess, update the display to show the guess on the grid.
 
3. letter reveal:
Compare each letter of the guess to the secret word, if the letter is in the correct position, color the tile green, if it’s in the secret word but mis-placed, the tile color will change to yellow and mark the letter as present on the keyboard, if the letter is not in the secret word the tile color will be gray.

4. End of Game Conditions:
If the guess matches the secret word, display a message (You Win!) and the game end.
If the user has made six guesses without guessing the word, display (You Lose! The word was: [secret word]) and end the game.

6. post Game:
Provide an option for the user to restart the game (Restart button), which resets the grid, selects a new secret word, and clears the keyboard status.
