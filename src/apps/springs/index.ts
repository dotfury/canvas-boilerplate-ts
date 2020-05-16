import Particle from '../../classes/particle';

export default class Springs {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, width: number, height: number) {
    this.canvas = canvas;
    this.context = context;
    this.width = width;
    this.height = height;
  }

  run() {
    const width = this.width;
    const height = this.height;
    const context = this.context;
    const springPoint = {
      x: this.width / 2,
      y: this.height / 2
    };
    const weight = new Particle(Math.random() * this.width, Math.random() * height, 50, Math.random() * Math.PI * 2);
    const k = 0.1;

    weight.radius = 20;
    weight.friction = 0.9;
    weight.addSpring(springPoint, k);

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      weight.update();

      context.beginPath();
      context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.moveTo(weight.x, weight.y);
      context.lineTo(springPoint.x, springPoint.y);
      context.stroke();

      requestAnimationFrame(update);
    }
  }
}
