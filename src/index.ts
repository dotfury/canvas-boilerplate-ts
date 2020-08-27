import '../src/styles/app.scss';

import ParticlesEffect from './apps/particleseffect';

window.onload = function() {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  const context = <CanvasRenderingContext2D>canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const particles = new ParticlesEffect(canvas, context, width, height);
  particles.run();
};
