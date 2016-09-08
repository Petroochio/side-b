import { run } from '@cycle/rxjs-run';
import { Observable, Scheduler } from 'rxjs';
import { h, div, makeDOMDriver } from '@cycle/dom';

const fullScreenStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
}

const vw = window.innerWidth;
const vh = window.innerHeight;

/**
 * Mutate canvas size to match window size
 */
const hackCanvasSize = element => {
  if (element.width !== vw) {
    element.width = `${vw}`;
    element.height = `${vh}`;
  }
  return element;
};

const mapPageCoords = ({ touches }) => ({ x: touches[0].pageX, y: touches[0].pageY });

const main = ({ DOM }) => {
  const canvas = DOM.select('#render');
  const ctx$ = canvas.elements()
    .map(([canvas]) => canvas ? hackCanvasSize(canvas) : null)
    .map(canvas => canvas ? canvas.getContext('2d') : null);

  const frame$ = Observable
    .interval(33, requestAnimationFrame)
    .withLatestFrom(ctx$)
    .subscribe(([__, ctx]) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.scale(1, 1);
      ctx.beginPath();
      ctx.arc(70, 70, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    });

  // CONTROLS
  const drawStart$ = canvas.events('touchstart').map(mapPageCoords);
  const drawMove$ = canvas.events('touchmove').map(mapPageCoords);
  const drawEnd$ = canvas.events('touchend');

  const sling$ = Observable.combineLatest(drawStart$, drawMove$);

  const release$ = sling$
    .sample(drawEnd$)
    .subscribe((e) => console.log(e));

  const s$ = sling$
    .startWith(false)
    .map((e) => {
      return div('.everything', [
        h('canvas#render', { style: fullScreenStyle })
      ]);
    }
  );

  const sinks = {
    DOM: s$,
  }

  return sinks;
};

window.onload = () => run(main, { DOM: makeDOMDriver('#app_container')});
