'use strict'
//-------------------------------------------------------------------GLOBALS-----------------------------------------------------

// TODO randomly pick a word and fill in the 'key' class
const targetWord = {
    "target":   ["debuggers"],

    "t_letter": ["g"],

    "eight":    ["buggered"],

    "seven":    ["grudges"],

    "six":      ["begged",
                 "bedrug",
                 "begged",
                 "budger",
                 "budges",
                 "bugged",
                 "bugger",
                 "burgee",
                 "debugs",
                 "edgers"],

    "five":     ["dregs",
                 "drugs",
                 "edger",
                 "greed",
                 "grubs",
                 "serge",
                 "grese",
                 "budge",
                 "egger",
                 "surge"],

    "four":     ["begs",
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
var used_letters = [];

// Stack current word
var guess_stack = [];

// holds current guess div
// <div id="current-guess" class="current-guess" data-text="GUESS WINDOW" contenteditable="false">
// initilized window on load
var guess_window;

//----------------------------------------------------------------FUNCTIONS------------------------------------------------------

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
    else if ( char === "return") {
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
    guess_window.innerText = guess_stack.join("");
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

function check_guess() {
    let word = guess_stack.join("");
    let length = word.length;
    let found = false;

    // min word length 4 and 
    if (length < 4) {
        alert("Minimum word length is 4");
        return;
    }
    else if ( !word.includes(targetWord["t_letter"][0]) ) {
        let s = targetWord["t_letter"][0].toUpperCase();
        alert(`Guess must contain the letter ${s}`);
        return;
    }

    switch (length) {
        case 4:
            if(targetWord["four"].includes(word)) 
                found = true;
            break;

        case 5:
            if(targetWord["five"].includes(word)) 
                found = true;
            break;

        case 6:
            if(targetWord["six"].includes(word)) 
                found = true;
            break;

        case 7:
            if(targetWord["seven"].includes(word))
                found = true;
            break;

        case 8:
            if(targetWord["eight"].includes(word))
                found = true;
            break;
    
        case 9:
            if(targetWord["target"].includes(word)) 
                found = true;
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
 * alerts if word is in pool
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



//----------------------------------------jQUERY-------------------------------------------------

$(window).on("load", () => {

    //current_letters = document.getElementsByClassName("keys");
    guess_window = document.getElementById("current-guess");
    // for(const x in current_letters){
    //     console.log(current_letters[x]);
    // }

});
