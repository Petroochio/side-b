//Main game file
"use strict";
var game = game || {};
//Battle balls game file
game.side_b = {
  /////////////////////////////////////
  //GLOBALS
  /////////////////////////////////////
  canvas : undefined,
  ctx : undefined,
  playerIDs : [],
  players : {},
  state : "GAME",
  /////////////////////////////////////
  //INITIALIZATION
  /////////////////////////////////////
  init : function(){
    var me = this;
    // create new instance of socket.io
    var num = Math.floor(Math.random()*10);
    var name ='user'+num;
    //setting client's own properties (MIGHT NOT BE THE BEST PRACTICE);
    me.canvas = document.querySelector('#area');
    me.ctx = me.canvas.getContext('2d');
    me.ctx.lineWidth = 5;
   
    // window screen size
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    
    //set up socket
    game.sockets.init(me);//This line of code needs to be called last
  },
  //main loop
  loop : function() {
    requestAnimationFrame(this.loop.bind(this));
    this.update();
    this.render();
  },
  /////////////////////////////////////
  //UPDATE
  /////////////////////////////////////
  //Main game loop
  update_game : function() {
    var dt = 0;
    var me = this;//save reference to this
  },
  //Update loop that handles all states
  update : function() {
    switch(this.state) {
      case "GAME" :
        this.update_game();
        break;
      default :
        break;
    }
  },
  //Resets game to state at start of game loop
  reset : function() {
    var me = this;
  },
  /////////////////////////////////////
  //RENDER
  /////////////////////////////////////
  //Render in game screen
  renderGame : function() {
    var me = this;//save reference to this
    me.ctx.save();
    me.ctx.fillStyle = 'red';
    me.ctx.fillRect(0,0, me.canvas.width, me.canvas.height);
    me.ctx.restore();
    //loop through and draw each player
    me.playerIDs.forEach(function(id) {
      var player = me.players[id];
      player.render(me.ctx);
    });
  },
  //Main render function that handles different render states
  render : function() {
    switch(this.state) {
      case "START" :
        this.renderStart();
        break;
      case "ONBOARD" :
        this.renderOnboard();
        break;
      case "GAME" :
        this.renderGame();
        break;
      case "END" :
        this.renderEnd();
        break;
      default :
        break;
    }
  },
  /////////////////////////////////////
  //HELPER
  /////////////////////////////////////
  //Resize function for keeping canvas at the right ratio
  resizeCanvas : function() {
    //get reference to canvas holder
    var canvasHolder = document.querySelector('#canvas-holder');
    
    this.canvas.width = canvasHolder.offsetWidth;
    this.canvas.height = canvasHolder.offsetHeight;
  }
}