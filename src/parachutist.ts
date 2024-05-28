import { getPlane } from "./plane";
import {
  getGameArea,
  getLives,
  incrementScore,
  decrementLives,
} from "./script";
import { getBoat } from "./boat";

let dropParachutistIntervalId: number;
let dropParachutistIntervalDuration: number = 1500;
const parachutists: HTMLDivElement[] = [];

export const initParachutist = () => {
  setInterval(moveParachutists, 20);
  setInterval(dropParachutist, dropParachutistIntervalDuration);
  dropParachutistIntervalId = window.setInterval(
    dropParachutist,
    dropParachutistIntervalDuration
  );
};

function dropParachutist() {
  //dont drop
  if (Math.random() < 0.45) return;

  // drop
  const item = document.createElement("div");
  item.classList.add("parachutist");
  const left = getPlane().style.left;

  item.style.left = left;
  item.style.top = "0px";
  getGameArea().appendChild(item);
  parachutists.push(item);
}

function moveParachutists() {
  if (getLives() === 0) {
    alert("Game Over\nGood luck next time");
    document.location.reload();
  }

  for (let i = 0; i < parachutists.length; i++) {
    const parachutist = parachutists[i];
    let top = parseInt(parachutist.style.top);
    top += 5;
    parachutist.style.top = `${top}px`;
    const gameArea = getGameArea();
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
      if (score % 500 === 0 && score > 0) {
        clearInterval(dropParachutistIntervalId);
        if (dropParachutistIntervalDuration > 250)
          dropParachutistIntervalDuration -= 10;

        setInterval(moveParachutists, dropParachutistIntervalDuration);
      }
    }
  }
}

function isCaught(parachutist: HTMLDivElement): boolean {
  const parachutistRect = parachutist.getBoundingClientRect();
  const boatRect = getBoat().getBoundingClientRect();
  // in case the parachutist is within the boat rect
  return (
    parachutistRect.bottom >= boatRect.top &&
    parachutistRect.left >= boatRect.left &&
    parachutistRect.right <= boatRect.right
  );
}
