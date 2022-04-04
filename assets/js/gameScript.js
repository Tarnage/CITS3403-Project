'use strict'
//------------------------------------------------------------------BUG LISTS------------------------------------------------------------
// ADD FOUND BUGS HERE


//------------------------------------------------------------GLOBALS AND STATISTICS-----------------------------------------------------


// current user stats
let userStats;

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
let wordDict;

// Stack to keep track of used letters
// Holds the location of the document children
let usedLetters;

// Stack current word
let guessStack;

// holds current guess div
// <div id="current-guess" class="current-guess" data-text="GUESS WINDOW" contenteditable="false">
// initilized window on load
let guessWindow;

// Holds all the words the user has guessed correctly
let foundWords;


//----------------------------------------------------------------INIT FUNCTIONS------------------------------------------------------


// TODO: stats tracker - percentage overall, and percentage of each catergory 
// TODO: hints, we can look in wordDicts and randomly pick a word as a hint
// TODO: add meaningful nav bar links
// TODO: add loading screen
// TODO: reset still has bugs
// TODO: READ in json files
// TODO: local storage / cookies

/**
 * Initialize game or resets progress
 * TODO: randomly choose root word from a db
 * TODO: add more stats
 * @param {boolean} reset
 */
function init(reset) {
    // reset stats
    if (reset) resetStats();

    // init globals
    usedLetters = [];
    guessStack  = [];
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
    userStats = {
        "guesses"       : 0,
        "hintsUsed"     : 0,
        "totalFound"    : 0,
        "avgWordLength" : 0,
        "streak"        : 0
    };

    // Initializes letters in the game interface
    // get elements to fill with letters
    initLetters();
    initGuessWindow();
}


/**
 * Initializes the game interface with letters - randomly
 * NOTE the root-letter is not random
 */
function initLetters() {

    // find the button letter elements
    let keyboard    = document.getElementsByClassName("letter");
    let rootKey     = document.getElementById("root-letter");

    // get the "Secret word" and "required" letter
    let rootWord    = wordDict[ DICT_KEYS[2] ][0];
    let rootLetter  = wordDict[ DICT_KEYS[3] ][0];
    
    // remove the rootLetter from root word
    rootWord        = rootWord.replace(rootLetter, "");

    // shuffle letters
    let shuffled    = rootWord.split('').sort(() => {
            return 0.5-Math.random()
        });

    // assign letters to element buttons
    rootKey.innerText = rootLetter;
    for ( const key of keyboard ) {
        let char = shuffled.pop();
        key.innerText = char;
    }
}


/**
 * Initialize guess window
 */
function initGuessWindow() {
    guessWindow = document.getElementById("current-guess");
}


/**
 * Resets stats
 */
 function resetStats() {
    let progBar     = document.getElementsByClassName( "progress-bar" );
    let progWords   = document.getElementsByClassName( "progress-words" );

    if ( progBar.length != progWords.length ) {
        alert("Something went wrong resetting progress bars\n");
        return;
    }

    for (let i = 0; i < progBar.length; i++) {
        // reset progress bars
        progBar[i].setAttribute( "style",            "width: 0%" );
        progBar[i].setAttribute( "aria-valuenow",    "0" );
        progBar[i].nextElementSibling.innerText = "0% complete";

        // remove found words from html
        progWords[i].innerHTML = "";
    }
}


//----------------------------------------------------------------FUNCTIONS------------------------------------------------------


/**
 * Handles click presses on the virtual keyboard
 * @param {HTML element} e 
 */
function handleClick( e ) {
    let char = e.innerText.toLowerCase();

    switch ( char ) {
        case "delete":
            // only do precudure if there is something to delete
            if( usedLetters.length != 0 ) popCurrentGuess();
            break;

        case "enter":
            checkGuess();
            break;
    
        default:
            buildWord(e, char);
            break;
    }
}

/**
 * Handles keyboard input
 * @param {keypress} e 
 * @returns 
 */
function handleKeyPress( e ) {

    switch ( e.key ) {
        case "Backspace": 
        case "Delete":
            if( usedLetters.length != 0 ) popCurrentGuess();
            break;

        case "Enter":
            checkGuess();
            break;

        default:
            // If key press is a letter check if letter is vaild
            if ( e.key.match(/^[A-Za-z]$/) ) {
            pressKey(e.key.toLowerCase());
            }
            break;
    }
}

/**
 * Helper function checks if key press is vaild and in play
 * @param {string} key 
 * @returns 
 */
function pressKey(key) {
    // Get the HTML elements that are buttons
    let letters     = document.getElementsByClassName( "letter" );
    let rootKey     = document.getElementById( "root-letter" );

    // check is button is root key
    if ( key === rootKey.innerText.toLocaleLowerCase() 
            && !rootKey.hasAttribute( "disabled" ) ) {
        buildWord( rootKey, key );
        return;
    }

    // iterate through all buttons
    for ( const e of letters ) {
        if (  key === e.innerText.toLowerCase() 
                && !e.hasAttribute( "disabled" ) ) {
            buildWord( e, key );
            return;
        }
    }
}


/**
 * Disables button when letter is in the current guess
 * @param {button} e 
 */
function disableButton( e ) {
    // add element to the stack of used letters
    usedLetters.push( e );

    let peek = usedLetters[usedLetters.length - 1];

    // remove enabled attribute
    if ( peek.hasAttribute("enabled") ) peek.removeAttribute( "enabled" );

    // add disabled attribute
    peek.setAttribute( "disabled", "" );
}


/**
 * Enables button when letter leaves the current guess
 * 
 */
function enableButton() {
    // usedLetters is a stack that tracks disabled elements
    // sorted in the order first to last
    let top = usedLetters.pop();

    // remove disabled attribute before adding a new attribute
    if ( top.hasAttribute("disabled") ) top.removeAttribute( "disabled" );

    // add enable attribute
    top.setAttribute( "enabled", "" );
}


/**
 * Adds letters to the current guess stack
 * 
 * @param {string} letter 
 */
function currentGuess( letter ) {
    //add letter to guessStack
    guessStack.push( letter );

    // Updates HTML with new letter
    guessWindow.innerText += letter;
}


/**
 * Helper function
 * disables button element and adds char to guesswindow
 * @param {HTML element} ele 
 * @param {string} char 
 */
 function buildWord(ele, char) {
    disableButton( ele );
    currentGuess ( char );
}


/**
 * Removes last letter of the current guess word
 */
function popCurrentGuess() {
    // essientially a backspace
    guessStack.pop();

    // updates the word in the HTML
    guessWindow.innerText = guessStack.join( "" );

    // renable button corresponding to letter
    enableButton();
}


/**
 * clears the guess window
 */
 function resetGuess() {
    while ( usedLetters.length > 0 ) {
        popCurrentGuess();
    }
}


//----------------------------------------------------------------VALIDATION FUNCTIONS------------------------------------------------------


/**
 * Validates users word
 * @returns null or notdefined? when guess is not correct length or does not inculde root letter
 */
function checkGuess() {
    let word        = guessStack.join( "" );
    let length      = word.length;
    let currentKey  = DICT_KEYS[length];

    // min word length 4 and must contain the root letter checks
    if ( length < 4 ) {
        alert( "Minimum word length is 4" );
        return;
    }

    if ( !word.includes(wordDict["root_letter"][0]) ) {
        let s = wordDict["root_letter"][0].toUpperCase();
        alert( `Guess must contain the letter ${s}` );
        return;
    }

    // Checks if word is valid / found in the pool of words
    if ( wordDict[currentKey].includes(word) ) {
        // add word to list of words currently found by the user
        addToFoundWords( currentKey, word );

        // resets the guess window and guess stack
        resetGuess();

        // updates progress bar and writes the words to the screen
        updateStats( currentKey );

        // TODO: remove for production release
        alert( word + " is in the list" );
    } 
    // else check if we already found the word
    else if( foundWords[currentKey].includes(word) ) {
        alert( word.toUpperCase() + " already found" );
    } 
    // else not a word
    else {
        // TODO: change to a nicer interface modal or window that fades 
        // alerts user if word is in pool
        alert( word + " is NOT the list" );
    }
}

/**
 * USED FOR TESTING
 * alerts iff word is in pool
 * @param {string} word 
 * @param {boolean} found 
 */
function alert_found( word, found ) {

    if ( found ) {
        alert( word + " is in the list" );
    } else {
        alert( word + " is NOT the list" );
    }
}

/**
 * Removes word from the word dictionary and 
 * adds it to the users current found words dictionary
 * @param {string} key 
 * @param {string} word 
 */
function addToFoundWords( key, word ) {
    // find the index of the word
    let index = wordDict[key].indexOf( word );

    // remove word from the word dictionary
    let sliced = wordDict[key].slice( index, index + 1 );

    // convert the array returned by slice into a string
    sliced = sliced.toString();
    wordDict[key].splice( index, 1 );

    // add word to the list of found words
    foundWords[key].push( sliced );
}

/**
 * Updates stats
 * TODO: add more stats
 * 
 * @param {string} value length of the word being queried
 */
function updateStats( value ) {
    // Current count of words found by user ()
    let foundCount      = foundWords[value].length;
    // Remainding words to find
    let notFoundCount   = wordDict[value].length;
    
    // Get the progress bar elements to minipulate
    let progBar         = document.getElementById( `bar-${value}` );
    let progWords       = document.getElementById( `bar-${value}-words` );
    let percentage      = Math.round( (100 / (foundCount + notFoundCount)) * foundCount );
    
    // set/display the progress bar
    progBar.setAttribute( "style",           `width: ${percentage}%;` );
    progBar.setAttribute( "aria-valuenow",   `${percentage};` );

    // set/dispaly the word found by the user
    progBar.nextElementSibling.innerText = `${percentage}% complete`;
    progWords.innerText = foundWords[value].join( ", " );
}


//----------------------------------------Local Storage-------------------------------------------------

//TODO: 
/**
 * Save to local storage / cookies
 */
function populateStorage() {
    console.log("CHECK");
    localStorage.setItem( 'wordDict',       JSON.stringify( wordDict )    );
    localStorage.setItem( 'usedLetters',    JSON.stringify( usedLetters ) );
    localStorage.setItem( 'foundWords',     JSON.stringify( foundWords )  );
    localStorage.setItem( 'guessStack',     JSON.stringify( guessStack )  );
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
    wordDict    = JSON.parse( localStorage.getItem( 'wordDict' )    );
    usedLetters = JSON.parse( localStorage.getItem( 'usedLetters' ) );
    foundWords  = JSON.parse( localStorage.getItem( 'foundWords' )  );
    guessStack  = JSON.parse( localStorage.getItem( 'guessStack' )  );
    // guessWindow = localStorage.getItem('guessWindow');
    // keyboard    = localStorage.getItem('keyboard');
    // rootKey     = localStorage.getItem('rootKey');
    console.log(foundWords);
}

//----------------------------------------jQUERY-------------------------------------------------


$(window).on("load", () => {

    // clears cookies
    localStorage.clear();

    init(false);
    // if (!localStorage.getItem("foundWords")) {
    //     populateStorage();
    // } else {

    //     setStorage();
    // }

    // adds the onclick function for all keys
    $( ".keys" ).click( function() {
        handleClick( this );
    });

    // add keyboard listner callback
    document.addEventListener( "keydown", handleKeyPress );
});

