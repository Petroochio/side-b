import { run } from '@cycle/rxjs-run';
import { Observable, Scheduler } from 'rxjs';
import { h, div, makeDOMDriver } from '@cycle/dom';

const mapPageCoords = ({ touches }) => ({ x: touches[0].pageX, y: touches[0].pageY });

const main = ({ DOM }) => {
  const canvas = DOM.select('#render');
  const ctx$ = canvas.elements()
    .map(([canvas]) => canvas ? canvas.getContext('2d') : null);

  const frame$ = Observable
    .interval(33, requestAnimationFrame)
    .withLatestFrom(ctx$)
    .subscribe(([__, ctx]) => {
      // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, 2 * Math.PI);// window.innerWidth/2, window.innerHeight/2, 20, 0, Math.PI * 2);
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
        h('canvas#render', { style: { width: '100vw', height: '100vh' }})
      ]);
    }
  );

  const sinks = {
    DOM: s$,
  }

  return sinks;
};

window.onload = () => run(main, { DOM: makeDOMDriver('#app_container')});
