var panels = panels || {};

panels.PlayerDisplay = function () {
  var self = this;

  self.updateTimeMs = 1000;
  self.time = 60000;
  
  self.id = "playerDisplay";

  $( "body" ).append( 
    "<div id='" + self.id + "' class='display' style='position: absolute; right: 0px; top: 0px;'></div>" );

  var display = $('#' + self.id);

  self.onTimeUp = _.once(function () {
    models.Board.board.spawnEnemy();
  });

  self.update = _.throttle(function () {
    var newTime = self.time - 1000;
    if (newTime < 0) 
    {
      display.html(0);
      self.onTimeUp();
    }
    else {
      display.html(Math.ceil(Math.ceil(self.time / 1000)));
      self.time = newTime; 
    }
  }, self.updateTimeMs);

  display.show();
};