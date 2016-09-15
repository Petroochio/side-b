import R from 'ramda';

/**
 * Constructor for Scalar monad
 * @param {number} val
 */
const Scalar = function ( val ) {
  this.value = val;
};

export default Scalar;
