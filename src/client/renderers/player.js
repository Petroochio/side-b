import { curry } from 'ramda';

const drawAimVector = ( ctx, { position, launch } ) => {
  if ( launch.mag() != 0 ) {
    const [ px, py ] = position.value;
    const [ aimX, aimY ] = launch.value;
    const inverseY = window.innerHeight - py;

    ctx.beginPath();
    ctx.moveTo( px, inverseY );
    ctx.lineTo( px + aimX, inverseY - aimY );
    ctx.stroke();
    ctx.closePath();
  }
};

const drawPlayerSprite = ( ctx, { position }) => {
  const [ px, py ] = position.value;
  const inverseY = window.innerHeight - py; // invert Y so my math is easy

  ctx.beginPath();
  ctx.arc( px, inverseY, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
};

const renderPlayer = ( ctx, player ) => {
  drawAimVector( ctx, player );
  drawPlayerSprite( ctx, player );
};

export default curry( renderPlayer );
