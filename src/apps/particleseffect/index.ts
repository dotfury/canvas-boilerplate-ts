import Particle from '../../classes/particle';
import { map, randomRange } from '../../utils';

export default class ParticlesEffect {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, width: number, height: number) {
    this.canvas = canvas;
    this.context = context;
    this.width = width;
    this.height = height;

    document.body.style.backgroundColor = 'black';
  }

  run() {
    const width = this.width;
    const height = this.height;
    const context = this.context;
    const particles: Particle[] = [];

    for (let i = 0; i < 80; i++) {
      const particle = new Particle(
        randomRange(0, width),
        randomRange(0, height),
        randomRange(5, 20),
        randomRange(2, 4),
        randomRange(1, 90)
      );

      particles.push(particle);
    }

    function getColor(particle: Particle): string {
      const r = map(particle.y, 0, 255, 0, 255);
      const g = map(particle.x, 0, 255, 0, 255);
      const b = map(particle.y, 0, 255, 0, 255);

      return `rgb(${r}, ${g}, ${b})`;
    }

    function drawParticles() {
      const length = particles.length;

      for (let i = 0; i < length; i++) {
        const p = particles[i];

        p.boundaryBounce(width, height);
        p.update();

        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        context.strokeStyle = getColor(p);
        context.stroke();
      }
    }

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      drawParticles();

      requestAnimationFrame(update);
    }
  }
}
