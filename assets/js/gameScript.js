'use strict'
//------------------------------------------------------------------BUG LISTS------------------------------------------------------------
// ADD FOUND BUGS HERE


//------------------------------------------------------------GLOBALS AND STATISTICS-----------------------------------------------------

// Used in a similar manner to traditional enums
const DICT_KEYS = {
    0:      null,
    1:      null,
    2:      "root_word",
    3:      "root_letter",
    4:      "four",
    5:      "five",
    6:      "six",
    7:      "seven",
    8:      "eight",
    9:      "root_word"
};

// current anagaram dicitonary
var wordDict;

// Stack to keep track of used letters
// Holds the location of the document children
var usedLetters;

// Stack current word
var guessStack;

// holds current guess div
// <div id="current-guess" class="current-guess" data-text="GUESS WINDOW" contenteditable="false">
// initilized window on load
var guessWindow;

// Holds all the words the user has guessed correctly
var foundWords;

// holds the button letter elements 
var keyboard;
var rootKey;

//----------------------------------------------------------------FUNCTIONS------------------------------------------------------
// TODO: progress bar
// TODO: stats tracker - percentage overall, and percentage of each catergory 
// TODO: show words you have found
// TODO: hints, we can look in wordDicts and randomly pick a word as a hint
// TODO: add nav bar
// TODO: add loading screen
// TODO: reset still has bugs
// TODO READ in json files

/**
 * Initialize game or reset progress
 * TODO: randomly choose root word from a db
 * @param {boolean} reset
 */
function init(reset) {
    if (reset) {
        // clears guess window
        guessWindow.innerText = "";
        // enables the buttons
        while (usedLetters.length >= 0) {
            enableButton();
        }

    } else {
        // must init the list
        usedLetters = [];
    }

    guessStack     = [];
    foundWords     =  {
        "root_word" : [],
        "eight"     : [],
        "seven"     : [],
        "six"       : [],
        "five"      : [],
        "four"      : []
    };
    wordDict = {
        "root_word"    :["debuggers"],
    
        "root_letter"  :["g"],
    
        "eight"        :["buggered"],
    
        "seven"        :["grudges"],
    
        "six"          :["begged",
                        "bedrug",
                        "begged",
                        "budger",
                        "budges",
                        "bugged",
                        "bugger",
                        "burgee",
                        "debugs",
                        "edgers"],
    
        "five"         :["dregs",
                        "drugs",
                        "edger",
                        "greed",
                        "grubs",
                        "serge",
                        "grese",
                        "budge",
                        "egger",
                        "surge"],
    
        "four"         :["begs",
                        "berg",
                        "bugs",
                        "burg",
                        "degs",
                        "degu",
                        "dugs",
                        "eggs",
                        "geed",
                        "grub",
                        "rugs",
                        "urge"]
    
    };

    // Initializes letters in the game interface
    // get elements to fill with letters
    initLetters(keyboard, rootKey);
}

/**
 * Initializes the game interface with letters - randomly
 * NOTE the root-letter is not random
 * @param {array} letters
 * @param {element} mainLetter 
 */
function initLetters(letters, mainLetter) {
    let rootWord = wordDict[DICT_KEYS[2]][0];
    let rootLetter = wordDict[DICT_KEYS[3]][0];
    
    // remove the rootLetter from root word
    rootWord = rootWord.replace(rootLetter, "");

    // shuffle letters
    let shuffled = rootWord.split('').sort(() => {return 0.5-Math.random()});

    // assign letters to element buttons
    mainLetter.innerText = rootLetter;
    for (let i = 0; i < letters.length; i++) {
        let char = shuffled.pop();
        letters[i].innerText = char;
    }
}

/**
 * Virtual Keyboard functionality actives on click
 * TODO: deal with physical keybord presses
 * @param {tag/node} e 
 */
function input(e) {
    let char = e.innerText.toLowerCase();
    if (char === "delete"){
        // Theres are letters to delete
        if(usedLetters.length != 0) {
            popCurrentGuess();
        }
    } 
    else if ( char === "enter") {
        checkGuess();
    }
    else {
        disableButton(e);
        currentGuess(char);
    }
}

/**
 * Disables button when letter is in the current guess
 * @param {button} e 
 */
function disableButton(e) {
    if( e.hasAttribute("enabled") ) {
        e.removeAttribute("enabled");
    }
    e.setAttribute("disabled", "");
    usedLetters.push(e);
}

/**
 * Enables button when letter leaves the current guess
 * 
 */
function enableButton() {
    let top = usedLetters.pop();
    if ( top.hasAttribute("disabled")) {
        top.removeAttribute("disabled");
        top.setAttribute("enabled", "");
    }
}

/**
 * Adds letters to the current guess stack
 * 
 * @param {string} letter 
 */
function currentGuess(letter) {
    guessStack.push(letter);
    // Updates HTML with new letter
    guessWindow.innerText += letter;
}

/**
 * Removes last letter of the current guess word
 */
function popCurrentGuess() {
    guessStack.pop();
    guessWindow.innerText = guessStack.join("");
    // renable button corresponding to letter
    enableButton();
}

/**
 * Validates users word
 * @returns null or notdefined? when guess is not correct length or does not inculde root letter
 */
function checkGuess() {
    let word        = guessStack.join("");
    let length      = word.length;
    let found       = false;
    let currentKey = DICT_KEYS[length];

    // min word length 4 and must contain the root letter checks
    if (length < 4) {
        alert("Minimum word length is 4");
        return;
    }
    else if ( !word.includes(wordDict["root_letter"][0]) ) {
        let s = wordDict["root_letter"][0].toUpperCase();
        alert(`Guess must contain the letter ${s}`);
        return;
    }

    // TODO: could use an array of enums 
    switch (length) {
        case 4:
            if(wordDict[currentKey].includes(word)) {
                found = true;
                add_to_found_dict(currentKey, word);
            }
            else if(foundWords[currentKey].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        case 5:
            if(wordDict[currentKey].includes(word)) {
                found = true;
                add_to_found_dict(currentKey, word);
            }
            else if(foundWords[currentKey].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        case 6:
            if(wordDict[currentKey].includes(word)) {
                found = true;
                add_to_found_dict(currentKey, word);
            }
            else if(foundWords[currentKey].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        case 7:
            if(wordDict[currentKey].includes(word)) {
                found = true;
                add_to_found_dict(currentKey, word);
            }
            else if(foundWords[currentKey].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        case 8:
            if(wordDict[currentKey].includes(word)) {
                found = true;
                add_to_found_dict(currentKey, word);
            }
            else if(foundWords[currentKey].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;
    
        case 9:
            if(wordDict[currentKey].includes(word)) {
                found = true;
                add_to_found_dict(currentKey, word);
            }
            else if(foundWords[currentKey].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        default:
            // DO NOTHING
            break;
    }

    // resets guess window if your word is valid
    if(found){
        resetGuess();
        updateStats(currentKey);
    }
        
    // alerts user if word is in pool
    alert_found(word.toUpperCase(), found);
}

/**
 * clears the guess window
 */
function resetGuess() {
    while ( usedLetters.length > 0 ) {
        popCurrentGuess();
    }
}

/**
 * USED FOR TESTING
 * alerts iff word is in pool
 * @param {string} word 
 * @param {boolean} found 
 */
function alert_found(word, found) {

    if (found) {
        alert(word + " is in the list");
    } else {
        alert(word + " is NOT the list");
    }
}

/**
 * Removes word from the word dictionary and 
 * adds it to the users current found words dictionary
 * @param {string} key 
 * @param {string} word 
 */
function add_to_found_dict(key, word) {
    // find the index of the word
    let index = wordDict[key].indexOf(word);
    // remove word from the word dictionary
    let sliced = wordDict[key].slice(index, index+1);
    // convert the array returned by slice into a string
    sliced = sliced.toString();
    wordDict[key].splice(index, 1);
    // add word to the list of found words
    foundWords[key].push(sliced);
}

/**
 * Updates stats
 * TODO: add more stats
 */
function updateStats(key) {
    let progBar = document.getElementById(`bar-${key}`);
    let percentage = Math.round((100 / (foundWords[key].length + wordDict[key].length)) * foundWords[key].length);
    progBar.setAttribute("style", `width: ${percentage}%;`);
    progBar.setAttribute("aria-valuenow", `${percentage};`);
    progBar.nextElementSibling.innerText = `${percentage}% complete`;
    let progWords = document.getElementById(`bar-${key}-words`);
    progWords.innerText = foundWords[key].join(", ");
}

//----------------------------------------Local Storage-------------------------------------------------

//TODO: 
/**
 * Save to local storage / cookies
 */
function populateStorage() {
    console.log("CHECK");
    localStorage.setItem('wordDict',  JSON.stringify(wordDict));
    localStorage.setItem('usedLetters', JSON.stringify(usedLetters));
    localStorage.setItem('foundWords', JSON.stringify(foundWords));
    localStorage.setItem('guessStack', JSON.stringify(guessStack));
    // localStorage.setItem('guessWindow', guessWindow);
    // localStorage.setItem('keyboard', keyboard);
    // localStorage.setItem('rootKey', rootKey);

    setStorage();
}

/**
 * Load from local storage
 */
function setStorage() {
    console.log("SETSTORAGE");
    wordDict    = JSON.parse(localStorage.getItem('wordDict'));
    usedLetters = JSON.parse(localStorage.getItem('usedLetters'));
    foundWords  = JSON.parse(localStorage.getItem('foundWords'));
    guessStack  = JSON.parse(localStorage.getItem('guessStack'));
    // guessWindow = localStorage.getItem('guessWindow');
    // keyboard    = localStorage.getItem('keyboard');
    // rootKey     = localStorage.getItem('rootKey');
    console.log(foundWords);
}
//----------------------------------------jQUERY-------------------------------------------------

$(window).on("load", () => {

    //current_letters = document.getElementsByClassName("keys");
    guessWindow = document.getElementById("current-guess");
    // for(const x in current_letters){
    //     console.log(current_letters[x]);
    // }

    // find the button letter elements
    keyboard = document.getElementsByClassName("letter");
    rootKey = document.getElementById("root-letter");

    // clears cookies
    localStorage.clear();

    init(false);
    // if (!localStorage.getItem("foundWords")) {
    //     populateStorage();
    // } else {

    //     setStorage();
    // }
});