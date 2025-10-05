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
    growth = map(mouseY, 0, height, 0.01, 0.005);

    for (let star of stars) {
        star.move();
        star.show();
    }

    stars[0].debug();
    pop();
}

// Star class below
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.position = p5.Vector.random2D();
        this.position.setMag(random(farthestPoint));
        this.previousPosition = this.position.copy();
        this.radius = random(minimal_radius, maximal_radius);
        this.transparency = 0;
    }

    show() {
        let newRadius = this.radius + growth * this.position.mag();
        let newColor = color(255, 255, 255, this.transparency)

        noStroke();
        fill(newColor);
        circle(this.position.x, this.position.y, newRadius);

        stroke(newColor);
        strokeWeight(newRadius * 2);
        // line(this.previousPosition.x, this.previousPosition.y, this.position.x, this.position.y);
    }

    move() {
        this.previousPosition = this.position.copy();
        this.position.setMag(this.position.mag() * acceleration);
        this.transparency += map(this.position.mag(), 0, farthestPoint, 0, 20);

        if (this.position.mag() > farthestPoint) {
            this.reset();
        }
    }

    debug() {
        if (frameCount % 12 == 0) {
            print("\n");
            print("radius", this.radius);
            print("magnitude", this.position.mag());
            print("farthestPoint", farthestPoint);
            print("acceleration", acceleration);
            print("growth", growth);
            print("transparency", this.transparency);
            print("mouseX", mouseX);
            print("mouseY", mouseY);
        }
    }
}
