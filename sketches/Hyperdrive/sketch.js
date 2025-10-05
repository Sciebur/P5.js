let canvas_size;
let stars = [];

function setup() {
    canvas_size = int(new URLSearchParams(window.location.search).get("size")) || 800;
    createCanvas(canvas_size, canvas_size);
    background(0);
    frameRate(120);

    for (let i = 0; i < 500; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    background(0);
    push();
    translate(width / 2, height / 2);
    for (let star of stars) {
        star.show();
        star.move();
    }
    pop();
}

// Star class below
class Star {
    constructor() {
        this.radius = random(3, 6);
        this.fi = random(TWO_PI);
        this.r = random(Math.sqrt(2) * width / 2);
        this.opaque = random(0, 50);
        this.fiPrev = this.fi;
        this.rPrev = this.r;
        this.repositioned = true;
        this.m_color = color(255, 255, 255);
        this.accel = 1.05;
        this.growth = 1.05;
    }

    show() {
        noStroke();
        fill(this.m_color.levels[0], this.m_color.levels[1], this.m_color.levels[2], this.opaque);
        circle(this.r * cos(this.fi), this.r * sin(this.fi), this.radius);
        if (!this.repositioned) {
            stroke(this.m_color.levels[0], this.m_color.levels[1], this.m_color.levels[2], this.opaque);
            strokeWeight(3);
            line(
                this.r * cos(this.fi), this.r * sin(this.fi),
                this.rPrev * cos(this.fiPrev), this.rPrev * sin(this.fiPrev)
            );
        }
    }

    move() {
        this.fiPrev = this.fi;
        this.rPrev = this.r;
        this.accel = map(mouseY, 0, height, 1.2, 1.0);
        this.growth = map(mouseY, 0, height, 1.0, 0.5);
        this.r *= this.accel;
        this.radius *= this.growth * this.r / 1000;
        if (this.repositioned) this.repositioned = false;
        if (this.r > Math.sqrt(2) * width / 2) {
            this.r = random(Math.sqrt(2) * width / 2);
            this.radius = random(3, 6);
            this.opaque = 0;
            this.repositioned = true;
        }
        if (this.opaque < 255) {
            this.opaque += map(this.r, 0, Math.sqrt(2) * width / 2, 0, 20);
        }
    }

}
