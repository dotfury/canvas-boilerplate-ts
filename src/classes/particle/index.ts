export default class Particle {
  private _x: number;
  private _y: number;
  private _vx: number;
  private _vy: number;
  private _gravity: number;
  private _mass: number;
  private _radius: number;
  private _speed: number;
  private _heading: number;
  private _friction: number;
  protected _springs: Spring[];
  protected _gravitations: Particle[];
  bounce: number;

  constructor(x = 0, y = 0, radius = 0, speed = 0, direction = 0, gravity = 0, mass = 1) {
    this._x = x;
    this._y = y;
    this._vx = Math.cos(direction) * speed;
    this._vy = Math.sin(direction) * speed;
    this._gravity = gravity;
    this._mass = mass;
    this._radius = radius;
    this._speed = speed;
    this._heading = 0;
    this._friction = 1;
    this._springs = [];
    this._gravitations = [];
    this.bounce = -1;
  }

  addGravitation(particle: Particle) {
    this.removeGravitation(particle);
    this._gravitations.push(particle);
  }

  removeGravitation(particle: Particle) {
    for (let i = 0; i < this._gravitations.length; i++) {
      if (particle === this._gravitations[i]) {
        this._gravitations.splice(i, 1);
        return;
      }
    }
  }

  addSpring(point: Point, k: number, length: number = 0) {
    this.removeSpring(point);
    this._springs.push({
      point,
      k,
      length
    });
  }

  removeSpring(point: Point) {
    for (let i = 0; i < this._springs.length; i++) {
      if (point === this._springs[i].point) {
        this._springs.splice(i, 1);
        return;
      }
    }
  }

  get friction(): number {
    return this._friction;
  }

  set friction(friction: number) {
    this._friction = friction;
  }

  get x(): number {
    return this._x;
  }

  set x(x: number) {
    this._x = x;
  }

  get y(): number {
    return this._y;
  }

  set y(y: number) {
    this._y = y;
  }

  get vx(): number {
    return this._vx;
  }

  set vx(vx: number) {
    this._vx = vx;
  }

  get vy(): number {
    return this._vy;
  }

  set vy(vy: number) {
    this._vy = vy;
  }

  get gravity(): number {
    return this._gravity;
  }

  set gravity(gravity: number) {
    this._gravity = gravity;
  }

  get mass(): number {
    return this._mass;
  }

  set mass(mass: number) {
    this._mass = mass;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(radius: number) {
    this._radius = radius;
  }

  get speed(): number {
    return Math.sqrt(this._vx * this._vx + this._vy * this._vy);
  }

  set speed(speed: number) {
    const heading = this._heading;

    this._vx = Math.cos(heading) * speed;
    this._vy = Math.sin(heading) * speed;
  }

  get heading(): number {
    return Math.atan2(this._vy, this._vx);
  }

  set heading(heading: number) {
    const speed = this._speed;

    this._vx = Math.cos(heading) * speed;
    this._vy = Math.sin(heading) * speed;
  }

  public accelerate(ax: number, ay: number) {
    this._vx += ax;
    this._vy += ay;
  }

  public update() {
    this.handleSprings();
    this.handleGravitations();

    // friction
    this._vx *= this.friction;
    this._vy *= this.friction;
    // gravity
    this._vy += this.gravity;
    // position
    this._x += this.vx;
    this._y += this.vy;
  }

  private handleGravitations() {
    for (let i = 0; i < this._gravitations.length; i++) {
      const gravitation = this._gravitations[i];

      this.gravitateTo(gravitation);
    }
  }

  private handleSprings() {
    for (let i = 0; i < this._springs.length; i++) {
      const spring = this._springs[i];

      this.springTo(spring.point, spring.k, spring.length);
    }
  }

  public angleTo(particle: Particle) {
    return Math.atan2(particle.y - this._y, particle.x - this._x);
  }

  public distanceTo(particle: Particle) {
    // pythagorean theorem
    const dx = particle.x - this.x;
    const dy = particle.y - this.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  public boundaryBounce(width: number, height: number) {
    if (this.x + this.radius >= width) {
      this.x = width - this.radius;
      this.vx *= this.bounce;
    }
    if (this.x - this.radius <= 0) {
      this.x = this.radius;
      this.vx *= this.bounce;
    }
    if (this.y + this.radius >= height) {
      this.y = height - this.radius;
      this.vy *= this.bounce;
    }
    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.vy *= this.bounce;
    }
  }

  private gravitateTo(target: Particle) {
    const distanceX = target.x - this.x;
    const distanceY = target.y - this.y;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    const distance = Math.sqrt(distanceSquared);
    const force = target.mass / distanceSquared;
    const ax = (distanceX / distance) * force; // adjacent/hypotenuse instead of calling Math.cos
    const ay = (distanceY / distance) * force; // opposite/hypotenuse instead of calling Math.sin

    this.vx += ax;
    this.vy += ay;
  }

  private springTo(point: Point, k: number, length = 0) {
    const distanceX = point.x - this.x;
    const distanceY = point.y - this.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const springForce = (distance - length) * k; // Hooke's law

    this.vx += (distanceX / distance) * springForce;
    this.vy += (distanceY / distance) * springForce;
  }
}
