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
      return "<li>" + _.humanize(p) + " : " + m[p] + "</li>";
    });
    
    return _.reduce(props, function (a,l) {return a + l}) + '</ul>'; 
  };

  self.findDetail = function (m) {
    var detailMatcher = '#' + m.mesh.uuid + '.minionDetail';
    var minionDetail = display.find(detailMatcher);
    return minionDetail;
  };

  self.createDetail = function (m) {
    return "<div class='minionDetail' id='" + m.mesh.uuid + "'>" + self.content(m) + "</div>";
  };

  self.updateDetail = function (m) {
    var detail = self.findDetail(m);
    if (detail.length > 0)
    {
      detail.empty();
      detail.append(self.content(m));
    }
    self.resize();
  };

  self.removeDetail = function (m) {
    self.findDetail(m).remove();
  };

  self.resize = function () {
    var mds = $('.minionDetail');
    var detailCount = mds.length;
    var detailMargin = parseInt( mds.css('margin'));
    var detailHeight = mds.height() + detailMargin;
    var newHeight = detailHeight * detailCount + detailMargin;
    
    display.height(newHeight);
    display.show();
  };

  models.Minion.onSelected(function (m) {
    display.append(self.createDetail(m));
    m.onTrackedChanged(function (prop, v) {
      self.updateDetail(m);
    });    
    m.onRemoved(self.removeDetail);
    self.resize();
  });

  models.Minion.onDeselected(function (m) {
    self.removeDetail(m);
    self.resize();
  });
};