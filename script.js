// Interface for status information about the kiosk.
class Kiosk {
    constructor() {
        this.systemActive = false;
        this.systemApi = `http://192.168.88.100:7379/GET/enable/`;
        this.kioskActive = false;
        this.kioskApi = `http://192.168.88.100:7379/GET/${window.location.hash.slice(1)}`;
    }
    async update() {
        try {
            // Check if the system is active.
            const systemApiResponse = await fetch(this.systemApi)
                .then(res => res.json())
                .then(res => res['GET']);
            this.systemActive = Boolean(systemApiResponse);
            // Check if this kiosk is active.
            const kioskApiRespone = await fetch(this.kioskApi)
                .then(res => res.json)
                .then(res => res['GET']);
            this.kioskActive = Boolean(kioskApiRespone) && this.systemActive;
        } catch (e) {
            console.error(e);
        }
    }
    isActive() {
        return this.kioskActive;
    }
}

// Interface for 2D rendering context of HTML Canvas.
class Context2D {
    constructor(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.context = canvas.getContext('2d');
    }
    drawCircle(x, y, radius, fillStyle) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fillStyle = fillStyle;
        this.context.fill();
        this.context.closePath();
    }
}

// Interface for drawing eyes on a 2D context.
class Eye {
    constructor(context2d, x, y, radius, fillStyle) {
        this.context2d = context2d;
        this.x = x; // x window coordinate
        this.y = y; // y window coordinate
        this.eyeRadius = radius;
        this.irisRadius = radius / 2;
        this.pupilRadius = radius / 4;
        this.maxOffset = this.eyeRadius - this.irisRadius;
    }
    // Open the eye.
    open(gazeX = 0, gazeY = 0) {
        // draw eye
        this.context2d.drawCircle(this.x, this.y, this.eyeRadius, 'red');
        // calculate offset of iris and pupil
        const xOffset = this.maxOffset * gazeX;
        const yOffset = this.maxOffset * gazeY * -1;
        // draw iris
        this.context2d.drawCircle(this.x + xOffset, this.y + yOffset, this.irisRadius, 'white');
        // draw pupil
        this.context2d.drawCircle(this.x + xOffset, this.y + yOffset, this.pupilRadius, 'black');
    }
    // Close the eye.
    close() {
        // TODO
    }
}

function init() {
    // Initialise the kiosk; and update state every 500ms.
    const kiosk = new Kiosk();
    setInterval(kiosk.update, 500);

    // Initialise the eyes.
    const context2d = new Context2D(document.getElementById('canvas-eyes'));
    let eye1 = new Eye(context2d, 450, 300, 100);
    let eye2 = new Eye(context2d, 750, 300, 100);

    // Initialise face detection.
    JEELIZFACEFILTER.init({
        canvasId: 'canvas-face-track',
        NNCPath: 'neural-nets/NN_DEFAULT.json',
        maxFacesDetected: 1,
        callbackReady: (error, spec) => {
            if (error) {
                console.error(error);
            } else {
                console.info('jeelizFaceFilter is ready');
            }
        },
        // Draw or close eyes;
        // depending on the state of the kiosk and the position of detected faces.
        callbackTrack: function (state) {
            // If eyes must be open.
            if (kiosk.isActive) {
                eye1.open(state.x * -1, state.y);
                eye2.open(state.x * -1, state.y);
            } else
            // If eyes must be closed.
            {
                eye1.close();
                eye2.close();
            }

        }
    });
}

init();