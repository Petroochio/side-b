//Function for making player objects and adding them to the game
"use strict";
var game = game || {};

game.Player = function() {
  var Player = function(id, color, x, y, name) {
    this.pos = new Vec(x, y);
    this.velocity = new Vec(0, 0);
    this.acc = new Vec(0, 0);
    this.r = .05;
    this.color = color;
    this.dash_time = 0;
    this.dash_vec = new Vec(0, 0);
    this.resting = false;
  };

  var p = Player.prototype;

  p.update = function(dt) {
    //Some logic to be moved to helper functions
    if(this.dash_time > 0){
      this.dash_time -= dt;
      this.acc.y = 0;
    } else if(!this.resting){
      this.acc.y = .5;
    }

    if(this.pos.y > .95){
      this.acc.y = 0;
      this.pos.y = .95;
      this.velocity.scale(0);
      this.resting = true;
    }
    
    if(this.pos.x > 16/9 -.05) {
      this.pos.x = 16/9 -.05;
      this.velocity.x = 0;
    } else if(this.pos.x < .05) {
      this.pos.x = .05;
      this.velocity.x = 0;
    }
    //Fix this

    this.move(dt);
  };

  p.move = function(dt) {
    //Update velocity and position
    this.velocity.add({x: this.acc.x * dt, y: this.acc.y * dt});
    this.pos.add({x: this.velocity.x * dt, y: this.velocity.y * dt});
  };

  p.start_dash = function(x, y){
    //Get rid of aim
    
    //do dash
    this.dash_vec.x = -x;
    this.dash_vec.y = -y;
    this.dash_time = .1;
    this.acc.x = 0;
    this.acc.y = 0;
    this.velocity.x = -x;
    this.velocity.y = -y;
    this.resting = false;
  };

  p.render = function() {
    game.draw.circle(this.pos.x,
                     this.pos.y,
                     this.r,
                     'black');
    this.render_aim();
  };

  p.render_aim = function() {
    if(this.aiming){

    }
  };

  return Player;
}();