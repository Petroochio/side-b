import { updateGame, launchPlayer } from '../engine/main';

const reducer = {
  'UPDATE': updateGame,
  'RELEASE': launchPlayer,
};

// Find a way to pass an initial game state into this
export default function() {
  return tick$ => tick$.scan(
    ( state, action ) => reducer[action.type]( state, action.payload )
  );
}
