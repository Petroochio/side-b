"use strict";
var game = game || {};

game.sockets = {
  socket : undefined,
  room: "",
  init : function(app) {
    //setting client's own properties (MIGHT NOT BE THE BEST PRACTICE);
    var socket = io.connect( window.location.origin, {query: 'user='+name, type: 'desktop'});
    this.socket = socket;
    var self = this;
    var room = this.room;
    var password = "";
    var connectData = {};
    var me = this;

    //Set up socket events --Ha Andrew don't look at this --You can't stop me
    socket.on('player_join', function(data){
      if(app.state === "GAME") {
        console.log('join');
        var x = 8/9, y = .5;
        app.players[data.id] = new game.Player(data.id, data.color, x, y, data.name);
        app.playerIDs.push(data.id);
      }
    });

    socket.on("charge_fire", function(data){
      app.players[data.id].start_dash(data);
    });

    socket.on("charge_aim", function(data){
      app.players[data.id].aim_dash(data);
    });

    socket.on("charge_start", function(data){
      app.players[data.id].charge_dash(data);
    });

    socket.on('player leave', function(data){
      if(app.players[data.id])
        app.playerIDs.splice(app.playerIDs.indexOf(data.id),1);
      delete app.players[data.id];
    });
    //use for sending data between different views
    socket.on('getSnapshot', function(data){
      me.sendSnapshot(data);
    });
    app.loop();
  },

  changeState : function(newState) {
    var data = {state : newState, room: this.room};
    this.socket.emit('state change', data);
  },
  //sends snapshot to server to update other views with
  sendSnapshot : function(data) {

  }
}