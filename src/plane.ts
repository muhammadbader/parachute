import { getGameArea } from "./script";

let plane: HTMLDivElement;
let planeGoingLeft: boolean = false;

export const initPlane = () => {
  plane = document.getElementById("plane") as HTMLDivElement;

  setInterval(movePlane, 25);
};

export const getPlane = () => plane;

const movePlane = () => {
  let pos = parseInt(plane.style.left);
  const rect = getGameArea().getBoundingClientRect();

  if (!isNaN(pos)) {
    if (pos < -100) {
      planeGoingLeft = false;
      plane.classList.remove("flipped");
    } else if (pos > rect.right - 50) {
      planeGoingLeft = true;

      plane.classList.add("flipped");
    }
  }

  plane.style.left = planeGoingLeft
    ? `${isNaN(pos) ? 10 : pos - 10}px`
    : `${isNaN(pos) ? 10 : pos + 10}px`;
};
