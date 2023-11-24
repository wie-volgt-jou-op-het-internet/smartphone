export function moveEyes(x, y) {
    let balls = document.getElementsByClassName('ball');
    let xPercent = Math.round(x * 100) + "%";
    let yPercent = Math.round(y * 100) + "%";

    for (const ball of balls) {
        ball.style.left = xPercent;
        ball.style.top = yPercent;
        ball.style.transform = "translate(-" + x + ",-" + y + ")";
    }
}