"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initParachutist = void 0;
var plane_1 = require("./plane");
var script_1 = require("./script");
var boat_1 = require("./boat");
var dropParachutistIntervalId;
var dropParachutistIntervalDuration = 1500;
var parachutists = [];
var initParachutist = function () {
    setInterval(moveParachutists, 20);
    setInterval(dropParachutist, dropParachutistIntervalDuration);
    dropParachutistIntervalId = window.setInterval(dropParachutist, dropParachutistIntervalDuration);
};
exports.initParachutist = initParachutist;
function dropParachutist() {
    //dont drop
    if (Math.random() < 0.45)
        return;
    // drop
    var item = document.createElement("div");
    item.classList.add("parachutist");
    var left = (0, plane_1.getPlane)().style.left;
    item.style.left = left;
    item.style.top = "0px";
    (0, script_1.getGameArea)().appendChild(item);
    parachutists.push(item);
}
function moveParachutists() {
    if ((0, script_1.getLives)() === 0) {
        alert("Game Over\nGood luck next time");
        document.location.reload();
    }
    for (var i = 0; i < parachutists.length; i++) {
        var parachutist = parachutists[i];
        var top_1 = parseInt(parachutist.style.top);
        top_1 += 5;
        parachutist.style.top = "".concat(top_1, "px");
        var gameArea = (0, script_1.getGameArea)();
        if (top_1 + 100 > gameArea.clientHeight) {
            gameArea.removeChild(parachutist);
            parachutists.splice(i, 1);
            i--;
            (0, script_1.decrementLives)();
        }
        else if (isCaught(parachutist)) {
            gameArea.removeChild(parachutist);
            parachutists.splice(i, 1);
            i--;
            var score = (0, script_1.incrementScore)();
            // amke the game harder every 500 points
            if (score % 500 === 0 && score > 0) {
                clearInterval(dropParachutistIntervalId);
                if (dropParachutistIntervalDuration > 250)
                    dropParachutistIntervalDuration -= 10;
                setInterval(moveParachutists, dropParachutistIntervalDuration);
            }
        }
    }
}
function isCaught(parachutist) {
    var parachutistRect = parachutist.getBoundingClientRect();
    var boatRect = (0, boat_1.getBoat)().getBoundingClientRect();
    // in case the parachutist is within the boat rect
    return (parachutistRect.bottom >= boatRect.top &&
        parachutistRect.left >= boatRect.left &&
        parachutistRect.right <= boatRect.right);
}
