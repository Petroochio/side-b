var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var MobileDetect = require('mobile-detect');
//var mongoose = require('mongoose'); 
var users = {};
var rooms = {};
var port = process.env.PORT || process.env.NODE_PORT || 3000;
//models
/*var models = require('./models');
var Account = models.Account;*/

var dbURL = process.env.MONGOLAB_URI || "mongodb://localhost/BirdMaker";
/*
var db = mongoose.connect(dbURL, function(err) {
    if(err) {
        console.log("Could not connect to database");
        throw err;
    }
});*/
//Function for generating a random room key
var generateRoomKey = function(){
  var pw = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var string_length = 4;
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    pw += chars.substring(rnum,rnum+1);
  }
  return pw;
}

app.use('/assets', express.static(path.resolve(__dirname) + '../../assets'));
app.get('/', function(req, res){
  //the html string being sent
  var md = new MobileDetect(req.headers['user-agent']);
  var filepath = path.resolve(__dirname + '/../assets/views/index.html');
  if(md.mobile() != null) {
    filepath = path.resolve(__dirname + '/../assets/views/mobile_index.html');
  }
  res.sendFile(filepath);
});
// **** ACTIONS DONE BY SERVER HAVE HIGHER PRIORITY AND INIT BEFORE CLIENT ACTIONS

// Setup socket.io
// listen to connection
io.on('connection', function(socket){
  //broadcast that a user has connected
  //pass an object containing user informatiojn?
  //Create a new room to host the game
  //////////////////
  //ACCOUNT EVENTS
  //////////////////
  socket.on('player_join', function(data){
    data.id = socket.id;
    data.color = "red";
    // check if total players have maxed
    io.emit('player_join', data);
    io.to(socket.id).emit('player id', socket.id);
  });
  
  //////////////////
  //GAME EVENTS
  //////////////////
  socket.on('sling_fire', function(data){
    data.id = socket.id;
    io.emit('sling_fire', data);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});