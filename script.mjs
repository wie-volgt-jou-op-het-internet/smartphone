import {Kiosk} from "./libraries/kiosk.mjs";
import {moveEyes} from "./libraries/eye.mjs";

function init() {
    // Initialise face detection and eye movement.
    initFacetracking((x, y) => moveEyes(x, y));

    // Initialize the kiosk.
    const kioskName = window.location.hash.slice(1);
    console.log(kioskName);
    if (kioskName) {
        const kiosk = new Kiosk(kioskName);

        // Hide the body if the kiosk is not active.
        const overlay = document.getElementById('overlay');
        const bodyElement = document.getElementsByTagName('body')[0];
        setInterval(async () => {
            if (await kiosk.isActive()) {
                overlay.style.opacity = '0';
            } else {
                overlay.style.opacity = '1';
            }
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});

