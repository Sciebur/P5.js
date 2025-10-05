let canvas_size;

let x;
let y;
let r;
let g;
let b;
let dPos;
let dColor;
let rot;

function setup() {
    canvas_size = int(new URLSearchParams(window.location.search).get("size")) || 800;
    createCanvas(canvas_size, canvas_size);

    dPos = 3;
    dColor = 8;
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
    x = x + random(-dPos, dPos);
    y = y + random(-dPos, dPos);

    r = r + random(-dColor, dColor);
    g = g + random(-dColor, dColor);
    b = b + random(-dColor, dColor);

    rot += 0.0001;

    if (x < -width / 2) x = -width / 2;
    else if (x > width / 2) x = width / 2;

    if (y < -height / 2) y = -height / 2;
    else if (y > height / 2) y = height / 2;

    if (r < 0) r = 0;
    else if (r > 255) r = 255;

    if (g < 0) g = 0;
    else if (g > 255) g = 255;

    if (b < 0) b = 0;
    else if (b > 255) b = 255;

    push();
    translate(width / 2, height / 2);
    //rotate(rot);
    stroke(r, g, b);
    point(x, y);
    point(x, -y);
    point(-x, y);
    point(-x, -y);
    pop();
}
