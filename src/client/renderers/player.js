import { curry } from 'ramda';

const renderPlayer = ( ctx, player ) => {
  console.log( player.launch );
  const [ px, py ] = player.position.value;
  const inverseY = window.innerHeight - py; // invert Y so my math is easy

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.scale(1, 1);
  ctx.beginPath();
  ctx.arc( px, inverseY, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
};

export default curry( renderPlayer );
