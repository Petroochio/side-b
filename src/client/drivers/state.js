import { updateGame, launchPlayer, aimLaunch } from '../engine/main';

const reducer = {
  'UPDATE': updateGame,
  'RELEASE': launchPlayer,
  'TOUCH_DRAG': aimLaunch,
};

// Find a way to pass an initial game state into this
export default function() {
  return tick$ => tick$.scan(
    ( state, { type, payload } ) => reducer[ type ]( state, payload )
  );
}
