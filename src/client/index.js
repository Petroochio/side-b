import { run } from '@cycle/rxjs-run';
import { Observable, Scheduler } from 'rxjs';
import { h, div, makeDOMDriver } from '@cycle/dom';

import makeRenderDriver from './drivers/render';
import makeUpdateDriver from './drivers/state';
import getUpdateStream from './engine/stream';
import renderMainView from './views';

const fullScreenStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
};

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

const main = ({ DOM, state }) => {
  const ctx$ = DOM.select( '#render' ).elements()
    .map( ([ c ]) => c ? hackCanvasSize( c ) : null )
    .map( c => c ? c.getContext( '2d' ) : null );

  const vdom$ = DOM.select( '#render' )
    .events( 'click' )
    .startWith( false )
    .map( renderMainView );

  const sinks = {
    DOM: vdom$,
    render: state.withLatestFrom( ctx$ ),
    state: getUpdateStream( DOM ),
  }

  return sinks;
};

const drivers = () => ({
  DOM: makeDOMDriver('#app_container'),
  render: makeRenderDriver(),
  state: makeUpdateDriver(),
});

window.onload = () => run(main, drivers());
