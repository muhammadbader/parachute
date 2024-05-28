let highScoreDiv: HTMLDivElement;
let scoreDisplay: HTMLDivElement;
let livesDisplay: HTMLDivElement;
let gameArea: HTMLDivElement;

let score: number = 0;
let lives: number = 3;

const highScore = "HIGH_SCORE";

export const initScriptTags = () => {
  scoreDisplay = document.getElementById("score") as HTMLDivElement;
  livesDisplay = document.getElementById("lives") as HTMLDivElement;
  gameArea = document.getElementById("game") as HTMLDivElement;
  highScoreDiv = document.getElementById("high-score") as HTMLDivElement;

  const currentHighScore = Number(localStorage.getItem(highScore));
  highScoreDiv.textContent = `High Score: ${currentHighScore}`;
};

export const getGameArea = () => gameArea;
export const getLives = () => lives;

export const incrementScore = (): number => {
  const currentHighScore = Number(localStorage.getItem(highScore));
  score += 10;
  scoreDisplay.textContent = `Score: ${score}`;

  if (currentHighScore < score) {
    localStorage.setItem(highScore, String(score));
    highScoreDiv.textContent = `High Score: ${score}`;
  }

  return score;
};

export const decrementLives = (): void => {
  lives--;
  livesDisplay.textContent = `Lives: ${lives}`;
};
