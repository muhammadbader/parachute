"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlane = exports.initPlane = void 0;
var script_1 = require("./script");
var plane;
var planeGoingLeft = false;
var initPlane = function () {
    plane = document.getElementById("plane");
    setInterval(movePlane, 25);
};
exports.initPlane = initPlane;
var getPlane = function () { return plane; };
exports.getPlane = getPlane;
var movePlane = function () {
    var pos = parseInt(plane.style.left);
    var rect = (0, script_1.getGameArea)().getBoundingClientRect();
    if (!isNaN(pos)) {
        if (pos < -100) {
            planeGoingLeft = false;
            plane.classList.remove("flipped");
        }
        else if (pos > rect.right - 50) {
            planeGoingLeft = true;
            plane.classList.add("flipped");
        }
    }
    plane.style.left = planeGoingLeft
        ? "".concat(isNaN(pos) ? 10 : pos - 10, "px")
        : "".concat(isNaN(pos) ? 10 : pos + 10, "px");
};
