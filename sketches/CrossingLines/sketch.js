let lineWidth = 14;
let lineSpacing = 25;
let slidingFrames = 100;
let rotationFrames = 1000;

let lineLength;
let count;

function setup() {
    let CANVAS_SIZE = int(new URLSearchParams(window.location.search).get("size")) || 800;
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    frameRate(50);
    background(0);
    colorMode(RGB);

    count = floor(height / lineWidth);
    lineLength = height / 3;
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(lineWidth);
    strokeCap(ROUND);

    translate(width / 2, height / 2);
    rotate(map(frameCount, 0, rotationFrames, 0, TWO_PI));

    let phase = map(frameCount, 0, slidingFrames, 0, TWO_PI);

    for (let i = -count / 2; i < count / 2; i++) {
        let shift = map(i, 0, count, -PI, PI);
        let rotation = sin(phase + shift) * (width / 2 - lineLength / 2) - lineLength / 2;

        line(rotation, i * lineSpacing, rotation + lineLength, i * lineSpacing);
        line(i * lineSpacing, rotation, i * lineSpacing, rotation + lineLength);
    }
}