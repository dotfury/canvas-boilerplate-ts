export default class Vector {
  private _x: number;
  private _y: number;

  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
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

  public getAngle(): number {
    return Math.atan2(this._y, this._x);
  }

  public setAngle(angle: number) {
    const length = this.getLength();

    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  public setLength(length: number) {
    const angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  public getLength() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  public add(v2: Vector): Vector {
    const newX = this._x + v2.x;
    const newY = this._y + v2.y;

    return new Vector(newX, newY);
  }

  public subtract(v2: Vector): Vector {
    const newX = this._x - v2.x;
    const newY = this._y - v2.y;

    return new Vector(newX, newY);
  }

  public multiply(value: number): Vector {
    const newX = this._x * value;
    const newY = this._y * value;

    return new Vector(newX, newY);
  }

  public divide(value: number): Vector {
    const newX = this._x / value;
    const newY = this._y / value;

    return new Vector(newX, newY);
  }

  public addTo(v2: Vector) {
    this._x += v2.x;
    this._y += v2.y;
  }

  public subtractFrom(v2: Vector) {
    this._x -= v2.x;
    this._y -= v2.y;
  }

  public multiplyBy(value: number) {
    this._x *= value;
    this._y *= value;
  }

  public divideBy(value: number) {
    this._x /= value;
    this._y /= value;
  }
}
