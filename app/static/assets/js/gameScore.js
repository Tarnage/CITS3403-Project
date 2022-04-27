function game_score() {
    score = sessionStorage.getItem("current_score")
    max_score = sessionStorage.getItem("max_score")
    low_score = sessionStorage.getItem("low_score")
    recent_score = sessionStorage.getItem("recent_score")

    if (low_score == null) {
        low_score = 100
    }
    if (recent_score == null) {
        recent_score = 0
    }

    if (score > max_score) {
        sessionStorage.setItem("max_score", score)
    }
    if (score < low_score) {
        sessionStorage.setItem("low_score", score)
    }
    max_score = sessionStorage.getItem("max_score")
    low_score = sessionStorage.getItem("low_score")
    console.log(low_score, recent_score)

    console.log(score)
    document.getElementById("current_score").innerText = score;
    document.getElementById("max_score").innerText = max_score;
    document.getElementById("low_score").innerText = low_score;
    document.getElementById("most_recent_score").innerText = recent_score;


    sessionStorage.setItem("recent_score", score)

}