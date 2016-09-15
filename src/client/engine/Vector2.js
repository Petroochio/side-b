import R from 'ramda';

/**
 * Constructor for Vector2 monad
 * @param {number} x
 * @param {number} y
 */
export const Vector2 = function ( x, y ) {
  this.value = [ x, y ];
}

/**
 * Returns the result of adding a given Vector2 to this one
 * @param {Vector2} vec
 * @return Vector2
 */
Vector2.prototype.add = function ( vec ) {
  return new Vector2(
    ...R.zipWith(
      R.add,
      this.value,
      vec.value
    )
  );
};

/**
 * Returns the result of subtracting a given Vector2 from this one
 * @param {Vector2} vec
 * @return Vector2
 */
Vector2.prototype.subtract = function ( vec ) {
  return new Vector2(
    ...R.zipWith(
      R.subtract,
      this.value,
      vec.value
    )
  );
};

/**
 * Returns the result of scaling this Vector2 by a give Scalar
 * @param {Scalar} scalar : value to scale vector by
 * @return Vector2
 */
Vector2.prototype.scale = function ( scalar ) {
  return new Vector2(
    ...R.map(
      R.multiply( scalar ),
      this.value
    )
  );
};

// Utilities
/**
 * Returns dot product of two vector2 monads
 * @param {Vector2} a
 * @param {Vector2} b
 * @return Scalar
 */
export const dotProduct2 = ( a, b ) => {
  const [ ax, ay ] = a.value;
  const [ bx, by ] = b.value;
  return ax * bx + ay * by;
};

/**
 * Magnitude of given Vector2
 * @param {Vector2} vec
 * @return Scalar
 */
export const magnitude2 = vec => {
  const [ x, y ] = vec.value;
  return Math.sqrt( x * 2 + y * 2 );
};


export default Vector2;
