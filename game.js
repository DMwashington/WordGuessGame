
var wins = 0;
var losses = 0;
var complete = false;

var letterGuess = ""

var badGuesses = [];

var newWord = "";
 
var chanceCounter = 8;

var wordList = ["goku", "vegeta", "gohan", "trunks", "goten", "krillin", "master rosh", "piccolo", "ubb", "buu"]

var current = 0;

function printBlanks() {
    for (var i = 0; i < wordList[current].length; i++) {
        newWord = newWord + "_ ";
    };
    document.getElementById("word").innerHTML = newWord;
}

function remainingGuesses() {
    chanceCounter -= 1;
    document.getElementById("remaining").innerText = chanceCounter;
    if (chanceCounter === 0) {
        gameOver();
    }
}

function trackScore() {
    if (complete === true) {
        wins++;
        console.log("New Score: " + wins + " wins!");
        document.getElementById("wins").innerText = "Wins: " + wins;
    }
    else if (complete === false) {
        losses++;
        console.log("New Score: " + losses + " losses!");
        document.getElementById("losses").innerText = "Losses: " + losses;
    }
}

function printAnswer() {
    document.getElementById("previousWord").innerText = wordList[current];
}

function gameOver() {
    printAnswer();
    trackScore();
    complete = false;
    current++;
    newWord = "";
    badGuesses = [];
    chanceCounter = 8;
    document.getElementById("remaining").innerText = chanceCounter;
    document.getElementById("guessedLetters").innerText = badGuesses;
    
    if (current === wordList.length) {
        current = 0;
    }
    printBlanks();
};

function correctGuess() {
    var pos = 0;
    var oldWord = newWord;
    for (var i = 0; i < wordList[current].length; i++) {
        l = wordList[current].charAt(i);
        if (l == letterGuess) {
            pos = i * 2;
            newWord = oldWord.substr(0, pos) + l + " " + oldWord.substr(pos + 2, oldWord.length + 1);
            oldWord = newWord;
        }
    };
    document.getElementById("word").innerHTML = newWord;
}

function incorrectGuess() {
    if (badGuesses.indexOf(letterGuess) < 0) {
        badGuesses.push(letterGuess);
        document.getElementById("guessedLetters").innerText = badGuesses;
        remainingGuesses();
    }
}

function guessingTime() {
    letterGuess = event.key;
    letterGuess = letterGuess.toLowerCase();
    var n = wordList[current].indexOf(letterGuess);
    if (n >= 0) {
        correctGuess();
    }
    else {
        incorrectGuess();
    }
    if (newWord.indexOf("_") < 0) {
        complete = true;
        gameOver();
    }
}

onkeyup = function () {
    printBlanks(wordList);
    onkeyup = function () {
        guessingTime();
    }

}

window.onload = function now() {
    document.getElementById("wins").innerText = "Wins: " + wins;
    document.getElementById("losses").innerText = "Losses: " + losses;
    document.getElementById("guessedLetters").innerText = badGuesses;
    document.getElementById("remaining").innerText = chanceCounter;
};

