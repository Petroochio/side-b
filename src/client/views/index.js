import { h, div } from '@cycle/dom';

export default function () {
  return div(
    '.everything',
    [
      h('canvas#render')
    ]
  );
}
