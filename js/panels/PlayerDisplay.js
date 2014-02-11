var panels = panels || {};

panels.PlayerDisplay = function (player, focus) {
  var self = this;

  self.updateTimeMs = 1000;
  self.time = 60000;
  
  self.id = "playerDisplay";

  $( "body" ).append( 
    "<div id='" + self.id + "' class='display' style='position: absolute; right: 0px; top: 0px;'></div>" );

  var display = $('#' + self.id);

  self.onTimeUp = _.once(function () {
    
    _.times(_.random(0, 40), function () {
      models.Board.board.spawnEnemy();
    });
    
  });

  self.content = function () {
    var el = 
      '<ul>' +
        "<li>Attack Countdown : " + Math.ceil(Math.ceil(self.time / 1000)) + "</li>" +
        "<li>Life : " + focus.hitPoints + "</li>" +
        "<li>Gold : " + player.gold + "</li>" +
      '</ul>';
    
    return el;
  };

  self.updateDisplay = function () {
    display.html(
      "<div class='playerDetail'>" + self.content() + "</div>"
    );
  };

  self.update = _.throttle(function () {
    var newTime = self.time - 1000;
    if (newTime < 0) 
    {
      self.time = 0;
      self.onTimeUp();
    }
    else {
      self.time = newTime; 
    }
    self.updateDisplay();
  }, self.updateTimeMs);

  display.show();
};