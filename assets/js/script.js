var emailArray = [];
var passwordArray = [];

function register() {
    event.preventDefault();

    var username = document.getElementById("uName").value;
    var password = document.getElementById("pwd").value;

    if (username == "") {
        alert("Username required.");
        return;
    } else if (password == "") {
        alert("Password required.");
        return;
    } else if (emailArray.indexOf(username) == -1) {
        emailArray.push(username);
        passwordArray.push(password);

        alert(username + "  Thanks for registration. \nTry to login Now");

        document.getElementById("uName").value = "";
        document.getElementById("pwd").value = "";
    } else {
        alert(username + " is already registered.");
        return;
    }
}

function login() {
    event.preventDefault();

    var username = document.getElementById("uName").value;
    var password = document.getElementById("pwd").value;

    var i = emailArray.indexOf(username);

    if (emailArray.indexOf(username) == -1) {
        if (username == "") {
            alert("Username required.");
            return;
        }
        alert("Username does not exist.");
        return;
    } else if (passwordArray[i] != password) {
        if (password == "") {
            alert("Password required.");
            return;
        }
        alert("Password does not match.");
        return;
    } else {
        var getInput = true;
        sessionStorage.setItem("logged_in", getInput);
        alert(username + " You are logged in \n welcome to our website.");
        window.location = "./game.html";
        return;
    }

}

function logged_in_actions() {
    logged_in = sessionStorage.getItem("logged_in")
    console.log(logged_in)
    if (logged_in == "true") {
        document.getElementById("stats").style.visibility = "visible";
        document.getElementById("logout").style.visibility = "visible";
    } else {
        document.getElementById("stats").style.visibility = "hidden";
        document.getElementById("logout").style.visibility = "hidden";
    }
}
=======
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
