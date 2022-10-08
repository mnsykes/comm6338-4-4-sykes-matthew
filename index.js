let wordToGuess = document.querySelector("#word-to-guess");
let previousWord = document.querySelector("#previous-word");
let incorrectLettersDisplay = document.querySelector("#incorrect-letters");
let remainingGuessesDisplay = document.querySelector("#remaining-guesses");
let wins = document.querySelector("#wins");
let losses = document.querySelector("#losses");

let words = [
	"bananas",
	"grapes",
	"carousel",
	"milkshake",
	"javascript",
	"limousine",
	"chocolate",
	"programming",
	"meatloaf",
	"ukulele",
	"mango"
];

let guesses = 10;
let winCount = 0;
let lossCount = 0;

let blanks = [];
let incorrect = [];
let correct = [];

let word;
let lettersToGuess;

const playGame = () => {
	// set game state
	guesses = 10;
	lettersToGuess = 0;
	blanks.length = 0;
	incorrect.length = 0;
	correct.length = 0;
	wordToGuess.textContent = "";
	previousWord.textContent = word;
	remainingGuessesDisplay.textContent = guesses;
	incorrectLettersDisplay.textContent = "";
	wins.textContent = winCount;
	losses.textContent = lossCount;

	// if we don't have a word loaded in - get a new one
	if (wordToGuess.textContent === "") {
		word = words[Math.floor(Math.random() * words.length)];
		lettersToGuess = word.length;

		// create blanks
		for (let char of word) {
			blanks.push("_");
			wordToGuess.textContent = blanks.join("");
		}
	}
	// console.log(`
	// 		Word to guess: ${wordToGuess.textContent}
	// 		Guesses: ${guesses}
	// 		Remaining guesses: ${remainingGuessesDisplay.textContent}
	// 		Letters to guess: ${lettersToGuess}
	// 		Word: ${word}
	// 		Blanks array: ${blanks}
	// 		Wins: ${winCount}
	// 		Losses: ${lossCount}
	// `);

	// get the value of the key press
	document.onkeyup = (e) => {
		let keyVal = e.key.toLowerCase();
		let keyIndex = word.indexOf(keyVal);
		let keyCode = e.code.toLowerCase();

		// filter out non-alphabetic key presses
		if (keyCode.includes("key")) {
			// check for matching index
			if (keyIndex >= 0) {
				for (let j = 0; j < word.length; j++) {
					if (word[j] === keyVal && !correct.includes(j)) {
						// if we have a match add letter to same index of placeholder
						// no match add letter to incorrect array
						correct.push(j);
						blanks[j] = keyVal;
						lettersToGuess -= 1;

						if (lettersToGuess === 0) {
							winCount += 1;
							playGame();
						}
					}
					// replace blank with correct letter
					wordToGuess.textContent = blanks.join("");
				}
			} else if (!incorrect.includes(keyVal)) {
				incorrect.push(keyVal);
				guesses -= 1;
				remainingGuessesDisplay.textContent = guesses;
				incorrectLettersDisplay.textContent += `${keyVal} `;

				if (guesses === 0) {
					lossCount += 1;
					playGame();
				}
			}
		}
	};
};

playGame();
