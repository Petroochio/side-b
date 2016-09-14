import { curry } from 'ramda';

const renderPlayer = (ctx, player) => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.scale(1, 1);
  ctx.beginPath();
  ctx.arc(player.x / 5, 70, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
};

export default curry(renderPlayer);
