/* Vector class to be used for physics calculations and other
 *	vector based math
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
		this.y += vector.y
	};
	/*
	v.scale = function(s) {
		return new Vec(this.x * s, this.y * s);
	}*/

	return Vec;
};