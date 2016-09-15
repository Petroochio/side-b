import Vector2 from '../engine/Vector2';

const gravity = new Vector2( 0, -0.3 );
const updatePlayer = ({ position, velocity }) =>
  ({
    position: position.add( velocity ),
    velocity: velocity.add( gravity )
  });

// Find a way to pass an initial game state into this
export default function() {
  return tick$ => tick$.scan(
    ({ players }, t) => {
      return {
        players: players.map( updatePlayer ),
      };
    }
  );
}
