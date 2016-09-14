// Find a way to pass an initial game state into this
export default function() {
  return tick$ => tick$.scan(
    (state, t) => {
      return {
        players: state.players.map(({ x }) => ({ x: t })),
      }
    }
  );
}
