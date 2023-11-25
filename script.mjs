import {Kiosk} from "./libraries/kiosk.mjs";
import {moveEyes} from "./libraries/eye.mjs";

function init() {
    // Initialize the kiosk.
    const kiosk = new Kiosk(kioskName);

    // Move eyes randomly.
    setInterval(() => {
        moveEyes(Math.random(), Math.random());
    }, 1000);

    // Check if the kiosk is active.
    const overlay = document.getElementById('overlay');
    const sound = document.getElementById('sound');
    setInterval(async () => {
        if (!kioskName || await kiosk.isActive()) {
            overlay.style.opacity = '0';
            sound.muted = false;
        } else {
            overlay.style.opacity = '1';
            sound.muted = true;
        }
    }, 500);

}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});

