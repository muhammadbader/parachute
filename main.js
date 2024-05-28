var highScoreDiv;
var scoreDisplay;
var livesDisplay;
var gameArea;
var plane;
var boat;
var dropParachutistIntervalId;
var dropParachutistIntervalDuration = 1500;
var parachutists = [];
var score = 0;
var lives = 3;
var planeGoingLeft = false;
var boatPastXPosition;
var boatWidth = 100;
var highScore = "HIGH_SCORE";
var setdropParachutistIntervalId = function (value) {
    dropParachutistIntervalId = value;
};
var incrementScore = function () {
    var currentHighScore = Number(localStorage.getItem(highScore));
    score += 10;
    scoreDisplay.textContent = "Score: ".concat(score);
    if (currentHighScore < score) {
        localStorage.setItem(highScore, String(score));
        highScoreDiv.textContent = "High Score: ".concat(score);
    }
    return score;
};
var decrementLives = function () {
    lives--;
    livesDisplay.textContent = "Lives: ".concat(lives);
};
/** before the load event, efficiency */
document.addEventListener("DOMContentLoaded", function () {
    scoreDisplay = document.getElementById("score");
    livesDisplay = document.getElementById("lives");
    gameArea = document.getElementById("game");
    highScoreDiv = document.getElementById("high-score");
    boat = document.getElementById("boat");
    boatPastXPosition = Number(boat.getBoundingClientRect().left);
    setInterval(moveParachutists, 20);
    document.addEventListener("mousemove", moveboat);
    setInterval(flipBoat, 100);
    var currentHighScore = Number(localStorage.getItem(highScore));
    console.log("currentHighScore", currentHighScore);
    highScoreDiv.textContent = "High Score: ".concat(currentHighScore);
    plane = document.getElementById("plane");
    setInterval(movePlane, 25);
    setdropParachutistIntervalId(setInterval(dropParachutist, dropParachutistIntervalDuration));
});
function moveboat(event) {
    var rect = gameArea.getBoundingClientRect();
    var x = event.clientX - rect.left - boatWidth / 2;
    if (x < 0)
        x = 0;
    if (x + boatWidth > rect.width)
        x = rect.width - boatWidth;
    boat.style.left = "".concat(x, "px");
}
var flipBoat = function () {
    var currentX = Number(boat.getBoundingClientRect().left);
    if (currentX !== boatPastXPosition) {
        // moved to right
        if (currentX > boatPastXPosition) {
            if (!boat.classList.contains("flipped")) {
                boat.classList.add("flipped");
            }
        }
        else {
            // moved to left
            if (boat.classList.contains("flipped")) {
                boat.classList.remove("flipped");
            }
        }
    }
    boatPastXPosition = currentX;
};
var movePlane = function () {
    var pos = parseInt(plane.style.left);
    var rect = gameArea.getBoundingClientRect();
    if (!isNaN(pos)) {
        if (pos < 50) {
            planeGoingLeft = false;
            plane.classList.remove("flipped");
        }
        else if (pos > rect.right - 200) {
            planeGoingLeft = true;
            plane.classList.add("flipped");
        }
    }
    plane.style.left = planeGoingLeft
        ? "".concat(isNaN(pos) ? 10 : pos - 10, "px")
        : "".concat(isNaN(pos) ? 10 : pos + 10, "px");
};
function dropParachutist() {
    //dont drop
    if (Math.random() > 0.45)
        return;
    // drop
    var item = document.createElement("div");
    item.classList.add("parachutist");
    var left = plane.style.left;
    item.style.left = left;
    item.style.top = "0px";
    gameArea.appendChild(item);
    parachutists.push(item);
}
function moveParachutists() {
    if (lives === 0) {
        alert("Game Over\nGood luck next time");
        document.location.reload();
    }
    for (var i = 0; i < parachutists.length; i++) {
        var parachutist = parachutists[i];
        var top_1 = parseInt(parachutist.style.top);
        top_1 += 5;
        parachutist.style.top = "".concat(top_1, "px");
        if (top_1 + 100 > gameArea.clientHeight) {
            gameArea.removeChild(parachutist);
            parachutists.splice(i, 1);
            i--;
            decrementLives();
        }
        else if (isCaught(parachutist)) {
            gameArea.removeChild(parachutist);
            parachutists.splice(i, 1);
            i--;
            var score_1 = incrementScore();
            // amke the game harder every 500 points
            if (score_1 % 150 === 0 && score_1 > 0) {
                clearInterval(dropParachutistIntervalId);
                if (dropParachutistIntervalDuration > 250)
                    dropParachutistIntervalDuration -= 10;
                setInterval(dropParachutist, dropParachutistIntervalDuration);
            }
        }
    }
}
function isCaught(parachutist) {
    var parachutistRect = parachutist.getBoundingClientRect();
    var boatRect = boat.getBoundingClientRect();
    // in case the parachutist is within the boat rect
    return (parachutistRect.bottom >= boatRect.top &&
        parachutistRect.left >= boatRect.left &&
        parachutistRect.right <= boatRect.right);
}
