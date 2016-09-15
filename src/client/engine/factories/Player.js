import Vector2 from '../Vector2';

export default function ( x, y ) {
  return {
    position: new Vector2( x, y ),
    velocity: new Vector2( 0, 0 ),
  }
}
