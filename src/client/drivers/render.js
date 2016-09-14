import renderPlayer from '../renderers/player';

const renderAll = ([state, ctx]) => {
  console.log(state);
  ctx && state.players.forEach(renderPlayer(ctx))
}

export default function () {
  return frame$ => frame$
    .subscribe(renderAll);
}
