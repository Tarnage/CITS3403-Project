'use strict'

// TODO randomly pick a word and fill in the 'key' class

const targetWord = {
    "target":   ["debuggers"],

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

}

// Global to track current tags that hold randomised chars
// current_letters is initizalised on window load.
// TODO: could use a stack instead. eg. everytime a letter is pressed the tag is pushed onto the stack.
var current_letters;

/**
 * Virtual Keyboard functionality actives on click
 * 
 * TODO: deal with physical keybord presses
 * @param {tag/node} e 
 */
function input(e) {
    let char = e.innerText;
    if (char.toLowerCase() === "delete"){
        pop_current_guess();
    } 
    else if ( char.toLowerCase() === "return") {
        // TODO check if guess is valid
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
}

/**
 * Enables button when letter leaves the current guess
 * @param {letter} e 
 */
function enable_button(e) {

    for(const x in current_letters) {
        let letter = current_letters[x].innerText.toLowerCase();
        if ( (letter === e.toLowerCase()) && current_letters[x].hasAttribute("disabled") ) {
            current_letters[x].removeAttribute("disabled");
            current_letters[x].setAttribute("enabled", "");
            break;
        }
    }
}

/**
 * Adds letters to the current guess string
 * 
 * @param {string} letter 
 */
function current_guess(letter) {
    let guess = document.getElementById("current-guess");
    let current = guess.innerText;
    current += letter;
    guess.innerText = current;
}

/**
 * Removes last letter of guess
 * 
 * 
 */
function pop_current_guess() {
    let guess = document.getElementById("current-guess");
    let current = guess.innerHTML;

    // letter that was popped
    let popped = current.slice(-1);

    guess.innerText = current.slice(0, -1);

    // renable button corresponding to letter
    enable_button(popped);
}

$(window).on("load", () => {

    current_letters = document.getElementsByClassName("keys");

    // for(const x in current_letters){
    //     console.log(current_letters[x]);
    // }

});
