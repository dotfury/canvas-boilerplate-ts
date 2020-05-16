import '../src/styles/app.scss';

// import Springs from './apps/springs';
import Tween from './apps/tween';

window.onload = function() {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  const context = <CanvasRenderingContext2D>canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  // const springs = new Springs(canvas, context, width, height);
  // springs.run();

  const tween = new Tween(canvas, context, width, height);
  tween.run();
};
