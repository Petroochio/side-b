import renderPlayer from '../renderers/player';

const renderAll = ([state, ctx]) => {
  if ( ctx ) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    state.players.forEach(renderPlayer(ctx));
  }
};

export default function () {
  return frame$ => frame$.subscribe(renderAll);
}
