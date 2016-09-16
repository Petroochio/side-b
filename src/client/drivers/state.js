import R from 'ramda';
import Vector2 from '../engine/Vector2';

// Values for window size, need to set these in state I think
const maxY = window.innerHeight;
const maxX = window.innerWidth;
const outOfBoundsY = y => y <= 20 || y >= maxY - 20;
const outOfBoundsX = x => x <= 20 || x >= maxX - 20;
const clampY = R.clamp( 20, maxY - 20 );
const clampX = R.clamp( 20, maxX - 20 );

const gravity = new Vector2( 0, -10 );
const updatePlayer = ( dt, { position, velocity } ) => {
  const [ px, py ] = position.value;
  const [ vx, vy ] = velocity.value;
  let p = position;
  let v = velocity;

  if ( outOfBoundsY( py ) ) {
    v = v.scaleY( -0.6 );
  }
  if ( outOfBoundsX( px ) ) {
    v = v.scaleX( -0.6 );
  }

  // Update player position and velocity
  return {
    position: p.add( v.scale( dt ) ).mapY( clampY ).mapX( clampX ),
    velocity: v.add( gravity.scale( dt ) )
  };
};

const updateGame = state => {
  return {
    players: state.players.map( R.curry(updatePlayer)( 0.33 ) ),
  };
}

// Find a way to pass an initial game state into this
export default function() {
  return tick$ => tick$.scan(updateGame);
}
