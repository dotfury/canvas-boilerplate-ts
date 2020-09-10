import '../src/styles/app.scss';

import App from './apps/backgrounds';

window.onload = function() {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  const context = <CanvasRenderingContext2D>canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const app = new App(canvas, context, width, height);
  app.run();
};
