let highScoreDiv: HTMLDivElement;
let scoreDisplay: HTMLDivElement;
let livesDisplay: HTMLDivElement;
let gameArea: HTMLDivElement;
let plane: HTMLDivElement;

let boat: HTMLDivElement;

let dropParachutistIntervalId: number;
let dropParachutistIntervalDuration = 1500;
const parachutists: HTMLDivElement[] = [];

let score: number = 0;
let lives: number = 3;
let planeGoingLeft: boolean = false;

let boatPastXPosition: number;
const boatWidth: number = 100;
const highScore = "HIGH_SCORE";

const setdropParachutistIntervalId = (value: number) => {
  dropParachutistIntervalId = value;
};

const incrementScore = (): number => {
  const currentHighScore = Number(localStorage.getItem(highScore));
  score += 10;
  scoreDisplay.textContent = `Score: ${score}`;

  if (currentHighScore < score) {
    localStorage.setItem(highScore, String(score));
    highScoreDiv.textContent = `High Score: ${score}`;
  }

  return score;
};

const decrementLives = (): void => {
  lives--;
  livesDisplay.textContent = `Lives: ${lives}`;
};

/** before the load event, efficiency */
document.addEventListener("DOMContentLoaded", () => {
  scoreDisplay = document.getElementById("score") as HTMLDivElement;
  livesDisplay = document.getElementById("lives") as HTMLDivElement;
  gameArea = document.getElementById("game") as HTMLDivElement;

  highScoreDiv = document.getElementById("high-score") as HTMLDivElement;
  boat = document.getElementById("boat") as HTMLDivElement;
  boatPastXPosition = Number(boat.getBoundingClientRect().left);
  setInterval(moveParachutists, 20);

  document.addEventListener("mousemove", moveboat);
  setInterval(flipBoat, 100);

  const currentHighScore = Number(localStorage.getItem(highScore));
  console.log("currentHighScore", currentHighScore);
  highScoreDiv.textContent = `High Score: ${currentHighScore}`;
  plane = document.getElementById("plane") as HTMLDivElement;

  setInterval(movePlane, 25);
  setdropParachutistIntervalId(
    window.setInterval(dropParachutist, dropParachutistIntervalDuration)
  );
});

function moveboat(event: MouseEvent): void {
  const rect = gameArea.getBoundingClientRect();
  let x = event.clientX - rect.left - boatWidth / 2;
  if (x < 0) x = 0;
  if (x + boatWidth > rect.width) x = rect.width - boatWidth;

  boat.style.left = `${x}px`;
}

const flipBoat = () => {
  const currentX = Number(boat.getBoundingClientRect().left);

  if (currentX !== boatPastXPosition) {
    // moved to right
    if (currentX > boatPastXPosition) {
      if (!boat.classList.contains("flipped")) {
        boat.classList.add("flipped");
      }
    } else {
      // moved to left
      if (boat.classList.contains("flipped")) {
        boat.classList.remove("flipped");
      }
    }
  }
  boatPastXPosition = currentX;
};

const movePlane = () => {
  let pos = parseInt(plane.style.left);
  const rect = gameArea.getBoundingClientRect();

  if (!isNaN(pos)) {
    if (pos < 50) {
      planeGoingLeft = false;
      plane.classList.remove("flipped");
    } else if (pos > rect.right - 200) {
      planeGoingLeft = true;

      plane.classList.add("flipped");
    }
  }

  plane.style.left = planeGoingLeft
    ? `${isNaN(pos) ? 10 : pos - 10}px`
    : `${isNaN(pos) ? 10 : pos + 10}px`;
};

function dropParachutist() {
  //dont drop
  if (Math.random() > 0.45) return;

  // drop
  const item = document.createElement("div");
  item.classList.add("parachutist");
  const left = plane.style.left;

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

  for (let i = 0; i < parachutists.length; i++) {
    const parachutist = parachutists[i];
    let top = parseInt(parachutist.style.top);
    top += 5;
    parachutist.style.top = `${top}px`;

    if (top + 100 > gameArea.clientHeight) {
      gameArea.removeChild(parachutist);
      parachutists.splice(i, 1);
      i--;
      decrementLives();
    } else if (isCaught(parachutist)) {
      gameArea.removeChild(parachutist);
      parachutists.splice(i, 1);
      i--;
      const score = incrementScore();

      // amke the game harder every 500 points
      if (score % 150 === 0 && score > 0) {
        clearInterval(dropParachutistIntervalId);
        if (dropParachutistIntervalDuration > 250)
          dropParachutistIntervalDuration -= 10;

        setInterval(dropParachutist, dropParachutistIntervalDuration);
      }
    }
  }
}

function isCaught(parachutist: HTMLDivElement): boolean {
  const parachutistRect = parachutist.getBoundingClientRect();
  const boatRect = boat.getBoundingClientRect();
  // in case the parachutist is within the boat rect
  return (
    parachutistRect.bottom >= boatRect.top &&
    parachutistRect.left >= boatRect.left &&
    parachutistRect.right <= boatRect.right
  );
}
