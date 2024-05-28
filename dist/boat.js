"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBoat = exports.getBoat = void 0;
var script_1 = require("./script");
var boat;
var boatPastXPosition;
var boatWidth = 100;
var getBoat = function () { return boat; };
exports.getBoat = getBoat;
var initBoat = function () {
    boat = document.getElementById("boat");
    boatPastXPosition = Number(boat.getBoundingClientRect().left);
    document.addEventListener("mousemove", moveboat);
    setInterval(flipBoat, 100);
};
exports.initBoat = initBoat;
function moveboat(event) {
    var rect = (0, script_1.getGameArea)().getBoundingClientRect();
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
