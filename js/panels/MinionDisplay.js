var panels = panels || {};

panels.MinionDisplay = function () {
  var self = this;
  
  var stats = $('#stats');
  
  self.id = "minionDisplay";

  var top = (stats.length > 0) ? (stats.height() + 'px') : '0px';

  $( "body" ).append( "<div id='" + self.id + "' class='display' style='position: absolute; left: 0px; top: " + top + ";'></div>" );

  var display = $('#' + self.id);

  models.Minion.onSelected(function (m) {
    display.append("<div class='minionDetail' id='" + m.mesh.uuid + "'>" + m.characterName + " - " + m.name + "</div>");    
  });

  models.Minion.onDeselected(function (m) {
    var detailMatcher = '#' + m.mesh.uuid + '.minionDetail';
    var minionDetail = display.find(detailMatcher);
    minionDetail.remove();
  });
};