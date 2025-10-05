let slidingFrames = 100;
let rotationFrames = 3000;

let canvas_size;
let lineWidth
let lineSpacing;
let lineLength;
let count;

function setup() {
    canvas_size = int(new URLSearchParams(window.location.search).get("size")) || 800;
    createCanvas(canvas_size, canvas_size);
    frameRate(50);
    background(0);
    colorMode(RGB);

    lineWidth = Math.floor(0.02 * canvas_size);
    lineSpacing = Math.floor(0.03 * canvas_size);
    count = Math.floor(canvas_size / lineWidth);
    lineLength = canvas_size / 3;
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(lineWidth);
    strokeCap(ROUND);

    translate(canvas_size / 2, canvas_size / 2);
    rotate(map(frameCount, 0, rotationFrames, 0, TWO_PI));

    let phase = map(frameCount, 0, slidingFrames, 0, TWO_PI);

    for (let i = -count / 2; i < count / 2; i++) {
        let shift = map(i, 0, count, -PI, PI);
        let rotation = sin(phase + shift) * (canvas_size / 2 - lineLength / 2) - lineLength / 2;

        line(rotation, i * lineSpacing, rotation + lineLength, i * lineSpacing);
        line(i * lineSpacing, rotation, i * lineSpacing, rotation + lineLength);
    }
}