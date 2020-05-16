import { tweenProperty, tweenObject } from '../../tween';
import Particle from '../../classes/particle';

export default class Tween {
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
    const start = {
      x: 100,
      y: 100
    };
    const target: Point = { x: 0, y: 0 };
    const change: Point = { x: 0, y: 0 };
    const particleChange: Point = { x: 0, y: 0 };
    let startTime: number;
    const duration = 1000;
    const particle = new Particle(50, 50, 0, 0, 0, 0);

    const particleStart = {
      x: particle.x,
      y: particle.y
    };

    drawCircle(start.x, start.y);
    drawParticle();

    document.body.addEventListener('click', function({ clientX, clientY }) {
      target.x = clientX;
      target.y = clientY;

      change.x = target.x - start.x;
      change.y = target.y - start.y;

      particleChange.x = target.x - particleStart.x;
      particleChange.y = target.y - particleStart.y;

      startTime = Math.round(new Date().getTime());
      update();
    });

    function update() {
      context.clearRect(0, 0, width, height);

      const currentTime: number = Math.round(new Date().getTime());
      const time: number = currentTime - startTime;

      if (time < duration) {
        // animation still running
        let x = tweenProperty(time, start.x, change.x, duration);
        let y = tweenProperty(time, start.y, change.y, duration);

        tweenObject(particle, particleStart, time, particleChange, duration, 'easeInOutBounce');

        drawCircle(x, y);
      } else {
        // animation done - draw circle at target and reset start position for next click
        drawCircle(target.x, target.y);
        start.x = target.x;
        start.y = target.y;

        particleStart.x = target.x;
        particleStart.y = target.y;
        particle.x = target.x;
        particle.y = target.y;
      }

      drawParticle();

      requestAnimationFrame(update);
    }

    function drawCircle(x: number, y: number) {
      context.beginPath();
      context.arc(x, y, 20, 0, Math.PI * 2, false);
      context.fill();
    }

    function drawParticle() {
      context.save();
      context.beginPath();
      context.fillStyle = 'red';
      context.arc(particle.x, particle.y, 10, 0, Math.PI * 2, false);
      context.fill();
      context.restore();
    }
  }
}
