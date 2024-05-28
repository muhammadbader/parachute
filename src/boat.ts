import { getGameArea } from "./script";

let boat: HTMLDivElement;
let boatPastXPosition: number;
const boatWidth: number = 100;

export const getBoat = () => boat;

export const initBoat = () => {
  boat = document.getElementById("boat") as HTMLDivElement;
  boatPastXPosition = Number(boat.getBoundingClientRect().left);

  document.addEventListener("mousemove", moveboat);
  setInterval(flipBoat, 100);
};

function moveboat(event: MouseEvent) {
  const rect = getGameArea().getBoundingClientRect();
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
