import {Kiosk} from "./libraries/kiosk.mjs";
import {moveEyes} from "./libraries/eye.mjs";

function init() {
    // Initialize the kiosk.
    const kioskName = window.location.hash.slice(1);
    const kiosk = new Kiosk(kioskName);

    // Kiosk specific changes.
    switch (kioskName) {
        case 'facebook':
            initFacetracking((x, y) => moveEyes(x, y));
            break;
        case 'microsoft':
            initFacetracking((x, y) => moveEyes(x, y));
            break;
        case 'x':
            initFacetracking((x, y) => moveEyes(x, y));
            break;
        case 'google':
            initFacetracking((x, y) => moveEyes(x, y));
            break;
        case 'apple':
            initFacetracking((x, y) => moveEyes(x, y));
            break;
        default:
            initFacetracking((x, y) => moveEyes(x, y));
            break;
    }

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
    }, 1000);

}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});

