import ms from 'ms';
import capetUtils from '../utils/capes.js';

const loop = () => {
  capetUtils.push();
};

const info = {
  name: 'CapeService',
  description: 'automatically pushes and pulls data from the cape database',
  interval: ms('1h'),
  disabled: false,
};

export {
  loop,
  info,
};
