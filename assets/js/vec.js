/* Vector class to be used for physics calculations and other
 *  vector based math
**/
"use strict";

var Vec = function() {
  //Constructor
  var Vec = function(x, y){
    this.x = x;
    this.y = y;
  };
  var v = Vec.prototype;
  /* Function for adding one vector's values onto this one
   * @param vector : vec to be added
   */
  v.add = function(vector){
    this.x += vector.x;
    this.y += vector.y;
  };
  /* Function for subtracting one vector's values from this one
   * @param vector : vec to be subtracted
   */
  v.sub = function(vector){
    this.x -= vector.x;
    this.y -= vector.y;
  };
  /** Normalizes this vector
    */
  v.normalize = function(){
    var mag = this.get_mag();
    this.scale((1/mag));
  };
  /* Scales this vector  by the scalar
   * @param s : value to scale by
   */
  v.scale = function(s) {
    this.x *= s;
    this.y *= s;
  };
  /** Returns the magnitude of this vector
    */
  v.get_mag = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  };
  /* Returns the dot product with another vector
   * @param vector : vec to get dot product with
   */
  v.dot = function(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  return Vec;
};