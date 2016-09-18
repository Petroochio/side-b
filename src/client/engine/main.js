import R from 'ramda';
import Vector2 from '../engine/Vector2';

// Values for window size, need to set these in state I think
const maxY = window.innerHeight;
const maxX = window.innerWidth;
const outOfBoundsY = y => y <= 20 || y >= maxY - 20;
const outOfBoundsX = x => x <= 20 || x >= maxX - 20;
const clampCollideY = R.clamp( 21, maxY - 21 );
const clampCollideX = R.clamp( 21, maxX - 21 );
const clampY = R.clamp( 20, maxY - 20 );
const clampX = R.clamp( 20, maxX - 20 );
const gravity = new Vector2( 0, -5 );

/////// BEGIN PLAYER LOGIC, MOVE THIS
const updatePlayer = ( dt, { position, velocity, launch, isStuck } ) => {
  const [ px, py ] = position.value;
  const [ vx, vy ] = velocity.value;
  let p = position;
  let v = velocity;

  if ( outOfBoundsY( py ) || outOfBoundsX( px ) ) {
    isStuck = true;
  }

  if ( isStuck ) {
    p = p.mapY( clampCollideY ).mapX( clampCollideX );
    v = new Vector2( 0, 0 );
  } else {
    p = p.add( v.scale( dt ) ).mapY( clampY ).mapX( clampX );
    v = v.add( gravity.scale( dt ) )
  }

  // Update player position and velocity
  return {
    position: p,
    velocity: v,
    launch,
    isStuck
  };
};

export const aimLaunch = ( state, { x, y, player } ) => {
  const launch = new Vector2( x, y )
    .unit()
    .scale( 60 );
  state.players[ player ].launch = launch;
  return state;
};

export const launchPlayer = ( state, { player } ) => {
  // Player cannot launch if they are not stuck
  if ( state.players[ player ].isStuck ) {
    state.players[ player ].velocity = state.players[ player ].launch;
    state.players[ player ].launch = new Vector2( 0, 0 );
    state.players[ player ].isStuck = false;
  }

  return state;
};
/////// END PLAYER LOGIC

// MAIN UPDATE FOR ALL THINGS
export const updateGame = state => {
  return { // This map could mean a loss of memory, consider mutating data
    players: state.players.map( R.curry( updatePlayer )( 0.33 ) ),
  };
};
