const positionIncrement = 3;
const colorIncrement = 8;

let canvas_size;

let x;
let y;

let r;
let g;
let b;

function limit(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function setup() {
    canvas_size = int(new URLSearchParams(window.location.search).get("size")) || 800;
    createCanvas(canvas_size, canvas_size);

    frameRate(1000);
    background(0);

    x = 0;
    y = 0;
    r = 0;
    g = 0;
    b = 0;
    rot = 0;
}

function draw() {
    x = x + random(-positionIncrement, positionIncrement);
    y = y + random(-positionIncrement, positionIncrement);

    r = r + random(-colorIncrement, colorIncrement);
    g = g + random(-colorIncrement, colorIncrement);
    b = b + random(-colorIncrement, colorIncrement);

    x = limit(x, -width / 2, width / 2);
    y = limit(y, -height / 2, height / 2);
    r = limit(r, 0, 255);
    g = limit(g, 0, 255);
    b = limit(b, 0, 255);

    push();
    translate(width / 2, height / 2);
    stroke(r, g, b);
    point(x, y);
    point(x, -y);
    point(-x, y);
    point(-x, -y);
    pop();
}
