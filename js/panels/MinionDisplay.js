var panels = panels || {};

panels.MinionDisplay = function () {
  var self = this;
  
  var stats = $('#stats');
  
  self.id = "minionDisplay";

  var top = (stats.length > 0) ? (stats.height() + 'px') : '0px';

  $( "body" ).append( "<div id='" + self.id + "' class='display' style='position: absolute; left: 0px; top: " + top + ";'></div>" );

  var display = $('#' + self.id);
  
  self.content = function (m) {
    var el = '<ul>'
    
    var props = _.map(m.trackedProperties, function (p) {
      return "<li>" + p + " : " + m[p] + "</li>";
    });
    
    return _.reduce(props, function (a,l) {return a + l}) + '</ul>'; 
  };

  self.createDetail = function (m) {
    return "<div class='minionDetail' id='" + m.mesh.uuid + "'>" + self.content(m) + "</div>";
  };

  models.Minion.onSelected(function (m) {
    display.append(self.createDetail(m));    
  });

  models.Minion.onDeselected(function (m) {
    var detailMatcher = '#' + m.mesh.uuid + '.minionDetail';
    var minionDetail = display.find(detailMatcher);
    minionDetail.remove();
  });
};