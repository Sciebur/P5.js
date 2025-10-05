const positionIncrement = 4;
const colorIncrement = 10;

let canvas_size;

let x = 0;
let y = 0;

let r = 0;
let g = 0;
let b = 0;

function setup() {
    canvas_size = int(new URLSearchParams(window.location.search).get("size")) || 800;
    createCanvas(canvas_size, canvas_size);

    frameRate(1000);
    background(0);
}

function moveWalker() {
    x = x + random(-positionIncrement, positionIncrement);
    y = y + random(-positionIncrement, positionIncrement);
    x = constrain(x, -width / 2, width / 2);
    y = constrain(y, -height / 2, height / 2);
}

function changeColor() {
    r = r + random(-colorIncrement, colorIncrement);
    g = g + random(-colorIncrement, colorIncrement);
    b = b + random(-colorIncrement, colorIncrement);
    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);

    stroke(r, g, b);
}

function drawWalker() {
    push();
    translate(width / 2, height / 2);
    point(x, y);
    point(x, -y);
    point(-x, y);
    point(-x, -y);
    pop();
}

function draw() {
    moveWalker();
    changeColor();
    drawWalker();
}
