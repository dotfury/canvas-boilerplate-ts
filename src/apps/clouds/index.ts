import Particle from '../../classes/particle';

import { map, randomRange } from '../../utils';

export default class Clouds {
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

    const maxSize = 30;
    const minSize = 0;
    const maxDistance = 50;

    for (let i = 0; i < 500; i++) {
      const particle = createParticle();

      particle.color = 'white';

      particles.push(particle);
    }

    const target = new Particle(
      randomRange(0, width),
      randomRange(0, height),
      randomRange(5, 20),
      randomRange(9, 12),
      randomRange(1, 90)
    );

    function createParticle() {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const speed = Math.random() * 0.2 - 0.1;
      const direction = Math.random() * Math.PI * 2;
      const particle = new Particle(x, y, 0, speed, direction);

      return particle;
    }

    function getColor(particle: Particle): string {
      const r = map(particle.x, 0, width, 0, 255);
      const g = map(particle.y, 0, width, 0, 255);
      const b = map(particle.x, 0, width, 0, 255);

      return `rgb(${r}, ${g}, ${b})`;
    }

    function drawParticles() {
      const length = particles.length;

      for (let i = 0; i < length; i++) {
        const p = particles[i];

        p.boundaryBounce(width, height);
        p.update();

        // increase size if close to target
        if (
          target.x - p.x < maxDistance &&
          target.x - p.x > -maxDistance &&
          target.y - p.y < maxDistance &&
          target.y - p.y > -maxDistance
        ) {
          if (p.radius < maxSize) {
            p.radius += 3;
          }
        } else if (p.radius > minSize) {
          p.radius -= 0.1;
        }
        if (p.radius < 0) {
          p.radius = 0;
        }

        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        context.strokeStyle = getColor(p);
        context.stroke();
      }
    }

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      target.boundaryBounce(width, height);
      target.update();

      drawParticles();

      requestAnimationFrame(update);
    }
  }
}
