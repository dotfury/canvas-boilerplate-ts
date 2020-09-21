import { distanceXY, map, randomRange } from '../../utils';

class Star {
  moveRadius: number;
  step: number;
  position: number;
  size: number;

  constructor(moveRadius: number, step: number, position: number, size: number) {
    this.moveRadius = moveRadius;
    this.step = step;
    this.position = position;
    this.size = size;
  }

  draw(context: CanvasRenderingContext2D, width: number, height: number, color: string) {
    context.beginPath();
    context.arc(
      Math.cos(this.position) * this.moveRadius + width / 2,
      Math.sin(this.position) * this.moveRadius + height / 2,
      this.moveRadius / 55,
      0,
      Math.PI * 2
    );
    context.closePath();
    context.fillStyle = color;
    context.fill();
  }

  update(context: CanvasRenderingContext2D, width: number, height: number, color: string) {
    this.position += this.step + this.moveRadius * 0.00001;
    this.draw(context, width, height, color);
  }
}

export default class Stars {
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
    const particles: Star[] = [];
    const center = {
      x: width / 2,
      y: height / 2
    };

    for (let i = 0; i < 500; i++) {
      const moveRadius = Math.random() * width;
      const step = randomRange(0.002, 0.02);
      const position = Math.random() * (Math.PI * 2);
      const size = randomRange(1, 2);

      particles.push(new Star(moveRadius, step, position, size));
    }

    function getColor(star: Star): string {
      const distance = Math.round(
        Math.abs(
          distanceXY(
            center.x,
            center.y,
            Math.cos(star.position) * star.moveRadius + width / 2,
            Math.sin(star.position) * star.moveRadius + height / 2
          )
        )
      );

      // const getPositionBasedColor = () =>
      //   Math.max(map(Math.cos(star.position), 0, width, 50, 255), map(Math.sin(star.position), 0, height, 50, 255));

      const r = map(distance, 0, width, 0, 255);
      const g = map(distance, 0, width, 0, 255);
      const b = map(distance, 0, width, 10, 255);

      return `rgba(${r}, ${g}, ${b})`;
    }

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      // context.fillStyle = 'rgba(0,0,0,0.1)';
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const color = getColor(particles[i]);
        particles[i].update(context, width, height, color);
      }
      requestAnimationFrame(update);
    }
  }
}
