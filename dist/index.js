"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var script_1 = require("./script");
var boat_1 = require("./boat");
var parachutist_1 = require("./parachutist");
var plane_1 = require("./plane");
document.addEventListener("DOMContentLoaded", function () {
    (0, script_1.initScriptTags)();
    (0, boat_1.initBoat)();
    (0, parachutist_1.initParachutist)();
    (0, plane_1.initPlane)();
});
