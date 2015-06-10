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
    this.can_dash = true;
    this.charging = false;
    this.charge_time = 0;
    this.max_charge = 2;
  };
  var p = Player.prototype; //fetch the prototype of player

  p.update = function(dt) {
    if(this.charging && this.charge_time < this.max_charge) 
      this.charge_time += dt;
    //Some logic to be moved to helper functions
    if(this.dash_time > 0){
      this.dash_time -= dt;
    } else if(!this.resting){
//////////////THIS NEEDS TO CHANGE DO SOMETHING WITH END DASH/////////////////
      this.acc.x = 0;
      this.acc.y = .5;
    }
    //Containment and stage/platform collision
    //this is all placeholder
    /*if(this.pos.y > .95){
      this.pos.y = .95;
      this.velocity.scale(.6);
      this.velocity.y *= -1;
      this.can_dash = true;
    }
    
    if(this.pos.x > 16/9 -.05) {
      this.pos.x = 16/9 -.05;
      this.velocity.scale(.6);
      this.velocity.x *= -1;
      this.can_dash = true;
    } else if(this.pos.x < .05) {
      this.pos.x = .05;
      this.velocity.scale(.6);
      this.velocity.x *= -1;
      this.can_dash = true;

    }*/
    //Fix this
    this.move(dt);
  };

  p.move = function(dt) {
    //Update velocity and position
    this.velocity.add({x: this.acc.x * dt, y: this.acc.y * dt});
    this.pos.add({x: this.velocity.x * dt, y: this.velocity.y * dt});
  };

  p.start_dash = function(target){
    console.log(target);
    //Get rid of aim
    if(!this.charging) return;
    //do dash
    this.dash_time = 0.2;
    this.acc.x = -target.x*3 * this.charge_time;
    this.acc.y = -target.y*3 * this.charge_time;
    this.resting = false;
    this.can_dash = false;
    this.charging = false;
    this.charge_time = 0;
  };

  p.aim_dash = function(target) {
    //update the dash vec for rendering
  };

  p.charge_dash = function() {
    if(!this.can_dash) return;
    console.log('charge')
    this.charging = true;
  };

  p.end_dash = function() {

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