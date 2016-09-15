import { run } from '@cycle/rxjs-run';
import { Observable, Scheduler } from 'rxjs';
import { h, div, makeDOMDriver } from '@cycle/dom';

import makeRenderDriver from './drivers/render';
import makeUpdateDriver from './drivers/state';
import makePlayer from './engine/factories/Player';

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
  if ( element.width !== vw ) {
    element.width = vw;
    element.height = vh;
  }
  return element;
};

const mapPageCoords = ({ touches }) => ({
  x: touches[0].pageX,
  y: touches[0].pageY
});

const main = ({ DOM, state }) => {
  const canvas = DOM.select( '#render' );
  const ctx$ = canvas.elements()
  .map( ([ canvas ]) => canvas ? hackCanvasSize( canvas ) : null )
  .map( canvas => canvas ? canvas.getContext( '2d' ) : null );

  // CONTROLS : somehow pipe into game update logic ... need a redux state, do a merge?
  const drawStart$ = canvas.events( 'touchstart' ).map( mapPageCoords );
  const drawMove$ = canvas.events( 'touchmove' ).map( mapPageCoords );
  const drawEnd$ = canvas.events( 'touchend' );
  const sling$ = Observable.combineLatest( drawStart$, drawMove$ );
  const release$ = sling$
    .sample(drawEnd$)
    .subscribe(e => console.log( e ));

  // RENDER
  const frame$ = state.withLatestFrom( ctx$ );
  const tick$ = Observable.interval( 33, requestAnimationFrame )
    .startWith({ players: [ makePlayer( 0, vh ) ] }); // pass in inital state here

  const s$ = sling$
    .startWith( false )
    .map(
      e => {
        return div(
          '.everything',
          [
            h('canvas#render', { style: fullScreenStyle })
          ]
        );
      }
    );

  const sinks = {
    DOM: s$,
    render: frame$,
    state: tick$,
  }

  return sinks;
};

const drivers = () => ({
  DOM: makeDOMDriver('#app_container'),
  render: makeRenderDriver(),
  state: makeUpdateDriver(),
});

window.onload = () => run(main, drivers());
