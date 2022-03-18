const targetWord = {
    "target":   ["debuggers"],

    "eight" :   ["buggered"],

    "seven" :   ["grudges"],

    "six"   :   ["begged",
                 "bedrug",
                 "begged",
                 "budger",
                 "budges",
                 "bugged",
                 "bugger",
                 "burgee",
                 "debugs",
                 "edgers"],

    "five"  :   ["dregs",
                 "drugs",
                 "edger",
                 "greed",
                 "grubs",
                 "serge",
                 "grese",
                 "budge",
                 "egger",
                 "surge"],

    "four"  :   ["begs",
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

start();

function start () {
    document.addEventListener("click", handleMouseClick);
}

function stop () {
    document.removeEventListener("click", handleMouseClick);
}

function handleMouseClick(e) {
    console.log("TEST\n");
}