'use strict'
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

// TODO randomly pick a word and fill in the 'key' class
const word_dict = {
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

// TODO READ in json files
// var testData;

// fetch("./testWords.json")
// .then(response => {
//    return response.json();
// })
// .then(jsondata => testData = jsondata);

// console.log("TESTING " + testData);

// Stack to keep track of used letters
// Holds the location of the document children
var used_letters;

// Stack current word
var guess_stack;

// holds current guess div
// <div id="current-guess" class="current-guess" data-text="GUESS WINDOW" contenteditable="false">
// initilized window on load
var guess_window;

// Holds all the words the user has guessed correctly
var found_words;

// holds the button letter elements 
var keyboard;
var root_key;

//----------------------------------------------------------------FUNCTIONS------------------------------------------------------
// TODO: progress bar
// TODO: stats tracker - percentage overall, and percentage of each catergory 
// TODO: show words you have found
// TODO: hints, we can look in word_dicts and randomly pick a word as a hint
// TODO: add nav bar
// TODO: add loading screen

/**
 * Initialize game or reset progress
 * TODO: randomly choose root word from a db
 */
function init() {
    used_letters    = [];
    guess_stack     = [];
    guess_window    = undefined; // unset variable
    var guess_window;
    found_words     =  {
        "root_word" : [],
        "eight"     : [],
        "seven"     : [],
        "six"       : [],
        "five"      : [],
        "four"      : []
    };

    // Initializes letters in the game interface
    // get elements to fill with letters
    init_letters(keyboard, root_key);
}

/**
 * Initializes the game interface with letters - randomly
 * NOTE the root-letter is not random
 * @param {array} letters
 * @param {element} main_letter 
 */
function init_letters(letters, main_letter) {
    let root_word = word_dict[DICT_KEYS[2]][0];
    let root_letter = word_dict[DICT_KEYS[3]][0];
    
    // remove the root_letter from root word
    root_word = root_word.replace(root_letter, "");

    // shuffle letters
    let shuffled = root_word.split('').sort(() => {return 0.5-Math.random()});

    // assign letters to element buttons
    main_letter.innerText = root_letter;
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
        if(used_letters.length != 0) {
            pop_current_guess();
        }
    } 
    else if ( char === "enter") {
        check_guess();
    }
    else {
        disable_button(e);
        current_guess(char);
    }
}

/**
 * Disables button when letter is in the current guess
 * @param {button} e 
 */
function disable_button(e) {
    if( e.hasAttribute("enabled") ) {
        e.removeAttribute("enabled");
    }
    e.setAttribute("disabled", "");
    used_letters.push(e);
}

/**
 * Enables button when letter leaves the current guess
 * 
 */
function enable_button() {
    let top = used_letters.pop();
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
function current_guess(letter) {
    guess_stack.push(letter);
    // Updates HTML with new letter
    guess_window.innerText += letter;
}

/**
 * Removes last letter of the current guess word
 */
function pop_current_guess() {
    guess_stack.pop();
    guess_window.innerText = guess_stack.join("");
    // renable button corresponding to letter
    enable_button();
}

/**
 * Validates users word
 * @returns null or notdefined? when guess is not correct length or does not inculde root letter
 */
function check_guess() {
    let word        = guess_stack.join("");
    let length      = word.length;
    let found       = false;
    let current_key = DICT_KEYS[length];

    // min word length 4 and must contain the root letter checks
    if (length < 4) {
        alert("Minimum word length is 4");
        return;
    }
    else if ( !word.includes(word_dict["root_letter"][0]) ) {
        let s = word_dict["root_letter"][0].toUpperCase();
        alert(`Guess must contain the letter ${s}`);
        return;
    }

    // TODO: could use an array of enums 
    switch (length) {
        case 4:
            if(word_dict[current_key].includes(word)) {
                found = true;
                add_to_found_dict(current_key, word);
            }
            else if(found_words[current_key].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        case 5:
            if(word_dict[current_key].includes(word)) {
                found = true;
                add_to_found_dict(current_key, word);
            }
            else if(found_words[current_key].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        case 6:
            if(word_dict[current_key].includes(word)) {
                found = true;
                add_to_found_dict(current_key, word);
            }
            else if(found_words[current_key].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        case 7:
            if(word_dict[current_key].includes(word)) {
                found = true;
                add_to_found_dict(current_key, word);
            }
            else if(found_words[current_key].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        case 8:
            if(word_dict[current_key].includes(word)) {
                found = true;
                add_to_found_dict(current_key, word);
            }
            else if(found_words[current_key].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;
    
        case 9:
            if(word_dict[current_key].includes(word)) {
                found = true;
                add_to_found_dict(current_key, word);
            }
            else if(found_words[current_key].includes(word)) {
                alert(word.toUpperCase() + " already found");
                return;
            }
            break;

        default:
            // DO NOTHING
            break;
    }

    // resets guess window if your word is valid
    if(found)
        reset_guess();

    // alerts user if word is in pool
    alert_found(word.toUpperCase(), found);
}

/**
 * clears the guess window
 */
function reset_guess() {
    while ( used_letters.length > 0 ) {
        pop_current_guess();
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
    let index = word_dict[key].indexOf(word);
    // remove word from the word dictionary
    let sliced = word_dict[key].slice(index, index+1);
    // convert the array returned by slice into a string
    sliced = sliced.toString();
    word_dict[key].splice(index, 1);
    // add word to the list of found words
    found_words[key].push(sliced);
}


//----------------------------------------jQUERY-------------------------------------------------

$(window).on("load", () => {

    //current_letters = document.getElementsByClassName("keys");
    guess_window = document.getElementById("current-guess");
    // for(const x in current_letters){
    //     console.log(current_letters[x]);
    // }

    // find the button letter elements
    keyboard = document.getElementsByClassName("letter");
    root_key = document.getElementById("root-letter");

    init();
});
