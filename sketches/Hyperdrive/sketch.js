const minimal_radius = 3;
const maximal_radius = 6;
const star_count = 500;

let canvas_size;
let stars = [];
let farthestPoint;

let acceleration;
let growth;

function setup() {
    canvas_size = int(new URLSearchParams(window.location.search).get("size")) || 800;
    createCanvas(canvas_size, canvas_size);
    background(0);
    frameRate(120);

    farthestPoint = Math.sqrt(2) * canvas_size / 2;

    for (let i = 0; i < star_count; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    background(0);

    push();
    translate(width / 2, height / 2);

    acceleration = map(mouseY, 0, height, 1.2, 1.0);
    growth = map(mouseY, 0, height, 1.0, 0.5);

    for (let star of stars) {
        star.show();
        star.move();
    }
    pop();
}

// Star class below
class Star {
    constructor() {
        this.radius = random(minimal_radius, maximal_radius);
        this.position = p5.Vector.random2D();
        this.position.setMag(random(farthestPoint));
        this.previousPosition = this.position.copy();
        this.color = color(255, 255, 255, random(0, 50));
    }

    show() {
        noStroke();
        fill(this.color);
        stroke(this.color);
        strokeWeight(3);

        circle(this.position.x, this.position.y, this.radius);
        line(this.previousPosition.x, this.previousPosition.y,
            this.position.x, this.position.y);
    }

    move() {
        this.previousPosition = this.position.copy();
        this.position.setMag(this.position.mag() * acceleration);
        this.radius *= growth * (this.position.mag() / farthestPoint);

        if (this.position.mag() > farthestPoint) {
            this.position.setMag(random(farthestPoint));
            this.radius = random(minimal_radius, maximal_radius);
            this.color.setAlpha(0);
        }
        else {
            // print(this.radius);
            this.color.setAlpha(this.color._getAlpha() + 5);
        }
    }

}
