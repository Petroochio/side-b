//Contains draw methods for different game states, and helper functions
"use strict";
var game = game || {};
//Any values used as coordinates for functions here should be between 0 and 16/9
//To keep everything relative to the canvas size
//All values will be multiplied by canvas.height
//This means that the corner of the screen will be (16/9 , 1)
game.draw = {
  canvas : undefined,
  ctx : undefined,
  /** Init function for draw
   * @param canvas : canvas to draw on
   * @param ctx : rendering context
   */
  init : function(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  },
  /** Fills a circle at the coordinates provided
   * @param x : X coordinate
   * @param y : Y coordinate
   * @param r : radius of circle
   * @param color : color of circle
   */
  circle : function(x, y, r, color) {
    var Xscaled = x * this.canvas.height;
    var Yscaled = y * this.canvas.height;
    var Rscaled = r * this.canvas.height;

    this.ctx.save();//save the draw state
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(Xscaled, Yscaled, Rscaled, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();//restore the draw state
  },
  /** Fills a polygon at the coordinates provided
   * @param path : path for shape
   * @param color : color of shape
   */
  fill_path : function(path, color){
    var s = this.canvas.height;//Scale factor

    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(path[0].x*s, path[0].y*s);
    
    for(var i = 1; i < path.length; i++) {
      this.ctx.lineTo(path[i].x*s, path[i].y*s);
    }

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  },
  /** strokes an arc at the coordinates provided
   * @param x : X coordinate
   * @param y : Y coordinate
   * @param r : radius of circle
   * @param color : color of circle
   */
  strokeArc : function(x, y, r, color, lineWidth, startPi, endPi) {
    var Xscaled = x * this.canvas.height;
    var Yscaled = y * this.canvas.height;
    var Rscaled = r * this.canvas.height;
    var lw = lineWidth * this.canvas.height; 

    this.ctx.save();//save the draw state
    this.ctx.lineWidth = lw;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(Xscaled, Yscaled, Rscaled, startPi, endPi);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();//restore the draw state
  },
  //image draw function
  img : function(image, imgX, imgY, imgW, imgH, x, y, w, h) {
    this.ctx.drawImage(image, imgX, imgY, imgW, imgH, 
      x*this.canvas.height, y*this.canvas.height, w*this.canvas.height, h*this.canvas.height);
  },
  /** Draws text to the screen
   * @param string : text to be rendered
   * @param x : x coord of text
   * @param y : y coord of text
   * @param size : size of text
   * @param col : color of text
   */
  text: function( string, x, y, size, col) {
    x *= this.canvas.height;
    y *= this.canvas.height;
    size *= this.canvas.height;  
    this.ctx.save();
    this.ctx.font = size+'px Lato';
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = col;
    this.ctx.fillText(string, x, y);
    this.ctx.restore();
  },
};