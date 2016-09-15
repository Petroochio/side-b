import R from 'ramda';
import Vector2 from '../engine/Vector2';

const gravity = new Vector2( 0, -10 );
const updatePlayer = ( dt, { position, velocity } ) => {
  // Update player position and velocity
  return {
    position: position.add( velocity.scale( dt ) ),
    velocity: velocity.add( gravity.scale( dt ) )
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
