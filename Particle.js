class Particle {
  constructor(x, y, a) {
    this.pos = createVector(x, y);
    this.goal = null;
    this.start = null;

    this.startTime = null;
    this.goalTime = null;
    this.func = null;

    this.alpha = a;
  }

  setGoal(goal, time, func) {
    this.goal = goal;
    this.start = this.pos.copy();
    this.startTime = millis();
    this.goalTime = time;
    this.func = func;
  }


  update() {
    let prog = (millis() - this.startTime) / this.goalTime;

    if(prog >= 1) {
      this.pos = this.goal;
      this.goal = null;
      this.start = null;
      this.startTime = null;
      this.goalTime = null;
      this.func = null;

      return;
    }

    prog = this.func(prog);

    this.pos.set(p5.Vector.sub(this.goal, this.start).mult(prog)).add(this.start);
  }


  draw() {
    stroke(255);
    point(this.pos.x, this.pos.y);
  }

  go() {
    if(this.goal) this.update();
    this.draw();
  }
}
