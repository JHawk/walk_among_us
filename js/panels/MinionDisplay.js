var panels = panels || {};

panels.MinionDisplay = function () {
  var self = this;
  
  var stats = $('#stats');
  
  self.id = "minionDisplay";

  var top = (stats.length > 0) ? (stats.height() + 'px') : '0px';

  $( "body" ).append( "<div id='" + self.id + "' class='display' style='position: absolute; left: 0px; top: " + top + ";'></div>" );

  models.Minion.onSelection(function (m) {
    console.log("hi" + m.name);
  });
};