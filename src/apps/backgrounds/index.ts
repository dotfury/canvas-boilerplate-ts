// 12:00
import Particle from '../../classes/particle';

import { circleCollision, map } from '../../utils';

export default class BackgroundEffect {
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
    const particleCount = Math.round((height * width) / 9000);
    const lineLength = 7;
    const center = {
      x: width / 2,
      y: height / 2
    };

    let angle = 0;
    let isCountUp = true;
    const speed = 0.001;

    const mouse: Circle = {
      x: undefined,
      y: undefined,
      radius: (height / 80) * (width / 80)
    };

    window.addEventListener('mousemove', ({ x, y }) => {
      mouse.x = x;
      mouse.y = y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle();

      particles.push(particle);
    }

    function createParticle() {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = 5;
      const speed = 1;
      const direction = Math.random() * Math.PI * 2;
      const particle = new Particle(x, y, radius, speed, direction);

      return particle;
    }

    function getColor(particle: Particle): string {
      const distanceX = Math.abs(center.x - particle.x);
      const distanceY = Math.abs(center.y - particle.y);
      // const distance = particleDistance(particle, center);

      const getPositionBasedColor = () =>
        Math.max(
          map(distanceX * Math.cos(angle), 0, width, 50, 255),
          map(distanceY * Math.sin(angle), 0, height, 50, 255)
        );

      const r = getPositionBasedColor();
      const g = map(distanceX * Math.cos(angle), 0, width, 50, 255);
      const b = map(distanceY * Math.sin(angle), 0, height, 50, 255);
      // const a = Math.min(map(distanceX, 0, width, 0, 1), map(distanceY, 0, height, 0, 1));

      return `rgba(${r}, ${g}, ${b})`;
    }

    function connect() {
      for (let i = 0; i < particleCount; i++) {
        for (let j = i; j < particleCount; j++) {
          const particleA = particles[i];
          const particleB = particles[j];
          // const distance = particleDistance(particleA, particleB); // spiderweb effect

          const distanceX = particleA.x - particleB.x;
          const distanceY = particleA.y - particleB.y;
          const distance = distanceX * distanceX + distanceY * distanceY;

          if (distance < (width / lineLength) * (height / lineLength)) {
            context.strokeStyle = getColor(particleA);
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particleA.x, particleA.y);
            context.lineTo(particleB.x, particleB.y);
            context.stroke();
          }
        }
      }
    }

    function drawParticles() {
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        p.boundaryBounce(width, height);

        if (mouse.x && mouse.y && circleCollision(mouse, p)) {
          if (mouse.x < p.x && p.x < width - p.radius * 10) {
            p.x += 10;
          }
          if (mouse.x > p.x && p.x > p.radius * 10) {
            p.x -= 10;
          }
          if (mouse.y < p.y && p.y < height - p.radius * 10) {
            p.y += 10;
          }
          if (mouse.y > p.y && p.y > p.radius * 10) {
            p.y -= 10;
          }
        }

        p.update();

        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'white';
        context.fill();
      }

      connect();
    }

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      if (isCountUp) {
        angle += speed;

        if (angle >= 1) isCountUp = false;
      } else {
        angle -= speed;

        if (angle <= 0) isCountUp = true;
      }

      drawParticles();

      requestAnimationFrame(update);
    }
  }
}
