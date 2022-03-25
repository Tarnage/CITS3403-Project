'use strict'
// This is for testing purposes do not launch

// onclick callback
function formSubmit() {
    let form = document.forms["loginDetails"];

    let name = form["uName"].value;
    let pass = form["pwd"].value;

    alert("Thank you for submitting this form:\nName: " + name + "\nPassword: " + pass + "\n");
}

// Put event listeners in here
$(window).on('load', () => {
    // DO THINGS
    
});