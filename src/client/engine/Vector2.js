import R from 'ramda';

/**
 * Constructor for Vector2 monad
 * @param {number} x
 * @param {number} y
 */
export const Vector2 = function ( x, y ) {
  this.value = [ x, y ];
};

Vector2.prototype.setY = function ( y ) {
  const [ x, _ ] = this.value;
  return new Vector2( x, y );
};

Vector2.prototype.setX = function ( x ) {
  const [ _, y ] = this.value;
  return new Vector2( x, y );
};

Vector2.prototype.map = function ( func ) {
  const [ x, y ] = this.value.map( func );
  return new Vector2( x, y );
};

Vector2.prototype.mapY = function ( func ) {
  const [ x, y ] = this.value;
  return new Vector2( x, func( y ) );
};

Vector2.prototype.mapX = function ( func ) {
  const [ x, y ] = this.value;
  return new Vector2( func( x ), y );
};

/**
 * Returns the result of adding a given Vector2 to this one
 * @param {Vector2} vec
 * @return Vector2
 */
Vector2.prototype.add = function ( vec ) {
  const [ x1, y1 ] = this.value;
  const [ x2, y2 ] = vec.value;

  return new Vector2(
    x1 + x2,
    y1 + y2
  );
};

/**
 * Returns the result of subtracting a given Vector2 from this one
 * @param {Vector2} vec
 * @return Vector2
 */
Vector2.prototype.subtract = function ( vec ) {
  const [ x1, y1 ] = this.value;
  const [ x2, y2 ] = vec.value;

  return new Vector2(
    x1 - x2,
    y1 - y2
  );
};

/**
 * Returns the result of scaling this Vector2 by a give Scalar
 * @param {Scalar} scalar : value to scale vector by
 * @return Vector2
 */
Vector2.prototype.scale = function ( scalar ) {
  const [ x, y ] = this.value;

  return new Vector2(
    x * scalar,
    y * scalar
  );
};

Vector2.prototype.scaleY = function ( scalar ) {
  const [ x, y ] = this.value;

  return new Vector2(
    x,
    y * scalar
  );
};

Vector2.prototype.scaleX = function ( scalar ) {
  const [ x, y ] = this.value;

  return new Vector2(
    x * scalar,
    y
  );
};

/**
 * Magnitude of this Vector2
 * @return Scalar
 */
Vector2.prototype.mag = function () {
  const [ x, y ] = this.value;
  return Math.sqrt( x * x + y * y );
};

/**
 * Unit vector of this Vector2
 * @return Vector2
 */
Vector2.prototype.unit = function () {
  const [ x, y ] = this.value;
  return this.scale( 1 / this.mag() );
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




export default Vector2;
