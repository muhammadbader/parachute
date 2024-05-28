import { initScriptTags } from "./script";
import { initBoat } from "./boat";
import { initParachutist } from "./parachutist";
import { initPlane } from "./plane";

document.addEventListener("DOMContentLoaded", () => {
  initScriptTags();
  initBoat();
  initParachutist();
  initPlane();
});
