"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrementLives = exports.incrementScore = exports.getLives = exports.getGameArea = exports.initScriptTags = void 0;
var highScoreDiv;
var scoreDisplay;
var livesDisplay;
var gameArea;
var score = 0;
var lives = 3;
var highScore = "HIGH_SCORE";
var initScriptTags = function () {
    scoreDisplay = document.getElementById("score");
    livesDisplay = document.getElementById("lives");
    gameArea = document.getElementById("game");
    highScoreDiv = document.getElementById("high-score");
    var currentHighScore = Number(localStorage.getItem(highScore));
    highScoreDiv.textContent = "High Score: ".concat(currentHighScore);
};
exports.initScriptTags = initScriptTags;
var getGameArea = function () { return gameArea; };
exports.getGameArea = getGameArea;
var getLives = function () { return lives; };
exports.getLives = getLives;
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
exports.incrementScore = incrementScore;
var decrementLives = function () {
    lives--;
    livesDisplay.textContent = "Lives: ".concat(lives);
};
exports.decrementLives = decrementLives;
