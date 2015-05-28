//comment
var mobile = mobile || {};

mobile.controller = {
  controls : undefined,
  stick1 : undefined,
  socket : undefined,
  init : function() {
    var me = this;

    me.controls = document.querySelector("#controls");
    me.stick1 = document.querySelector("#stick1");
    me.socket = io.connect( window.location.origin, {query: 'user='+name, type: 'mobile'});
    me.socket.emit("player_join", {});
    
    me.make_joystick(stick1, 250);
  },
  /////////////////////////////////////
  //Joystick function
  //--This could be more generic
  /////////////////////////////////////
  make_joystick : function (stick, size) {
    var me = this;
    //Add pad for user to pull
    stick.innerHTML = "<div class='pad'></div>";
    //set the whole joystick's size 
    stick.style.width = size+"px";
    stick.style.height = size+"px";
    stick.style.borderRadius = size/2+"px";
    //get reference to the pad
    var pad = stick.querySelectorAll(".pad")[0];
    var pad_x = size/3, pad_y = size/3;
    //set the pad's styles
    pad.style.width = size/3+"px";
    pad.style.height = size/3+"px";
    pad.style.borderRadius = size/6+"px";
    pad.style.top = pad_x+"px";
    pad.style.left = pad_y+"px";
    //Make it dragable
    var drag_pad = new Draggabilly(pad, {
      containment: stick
    });
    //send the charge start event
    drag_pad.on( 'dragStart', function( e ) {
      me.socket.emit("charge_start", {});
    });

    drag_pad.on( 'dragStart', function( e ) {
      var x = (parseInt(e.target.style.left)- pad_x)/(2/3);
      var y = (parseInt(e.target.style.top)- pad_y)/(2/3);

      var aim = new Vec(x, y);
      aim.normalize();
      me.socket.emit("charge_aim", {x:aim.x, y:aim.y});
    });
    //snap it to the center of the stick
    drag_pad.on( 'dragEnd', function( e ) {
      //get distance from center
      var x = (parseInt(e.target.style.left)- pad_x)/(2/3);
      var y = (parseInt(e.target.style.top)- pad_y)/(2/3);

      var aim = new Vec(x, y);
      aim.normalize();
      //send the data
      me.socket.emit("charge_fire", {x:aim.x, y:aim.y});
      console.log(aim);
      //reset pad
      e.target.style.left = pad_x+"px";
      e.target.style.top = pad_y+"px";
    });
  }
};