import { Observable } from 'rxjs';

const mapPageCoords = ({ touches }) => ({
  x: touches[0].pageX,
  y: touches[0].pageY
});

export default function ( DOM ) {  // CONTROLS : somehow pipe into game update logic ... need a redux state, do a merge?
  const canvas = DOM.select( '#render' );
  const drawEnd$ = canvas.events( 'touchend' );
  const sling$ = Observable.combineLatest(
    canvas.events( 'touchstart' ).map( mapPageCoords ),
    canvas.events( 'touchmove' ).map( mapPageCoords )
  );

  const release$ = sling$.sample( drawEnd$ )
    .map( ([ p1, p2 ]) => ({
        x: p1.x - p2.x,
        y: p2.y - p1.y,
        player: 0,
      })
    )
    .map(
      sling => ({
        type: 'RELEASE',
        payload: sling,
      })
    );

  // RENDER
  const tempInitPlayers = [ makePlayer( 30, 300 ) ];
  tempInitPlayers[0].velocity = tempInitPlayers[0].velocity.setX( 30 );

  return Observable.interval( 33, requestAnimationFrame )
    .map(() => ({ type: 'UPDATE' }))
    .merge( release$ )
    .startWith({ players: tempInitPlayers }); // pass in inital state here
}
