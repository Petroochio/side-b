//Function for making player objects and adding them to the game
"use strict";
var game = game || {};

game.Player = function() {
  var Player = function(id, color, x, y, name) {
    this.pos = new Vec(x, y);
    this.velocity = new Vec(0, 0);
    this.acc = new Vec(0, 0);
    this.r = 20;
    this.color = color;
    this.dash_time = 0;
    this.dash_vec = new Vec(0, 0);
  };

  var p = Player.prototype;

  p.update = function(dt) {
    //Some logic to be moved to helper functions
    if(this.dash_time > 0){
      this.dash_time -= dt;
    } else {
      this.acc.y = .01;
    }

    if(this.y > .999){
      this.acc.y = 0;
      this.pos.y = .99;
      this.velocity.y = 0; 
    }

    if(this.x > .999) {
      this.pos.x = .999;
      this.velocity.x = 0;
    } else if(this.x < .001) {
      this.pos.x = .001;
      this.velocity.x = 0;
    }
    //Fix this

    this.move(dt);
  };

  p.move = function(dt) {
    //Update velocity and position
    this.velocity.add(x: this.acc.x * dt, y: this.acc.y * dt});
    this.pos.add({x: this.velocity.x * dt, y: this.velocity.y * dt});
  };

  p.start_dash = function(x, y){
    this.dash_vec.x = x;
    this.dash_vec.y = y;
    this.dash_time = 1;
    this.acc.x = 0;
    this.acc.y = 0;
    this.velocity.x = x;
    this.velocity.y = y;
  };

  p.render = function() {

  };

  return Player;
}();