var model = model || {};

model.Wall = function (color, mesh) {
  var self = this;
  var _$ = model.Wall;

  self = _.extend(this, new models.BaseModel(color, mesh));

  self.onSelected(function () { 
    _$.selected.push(self);
  });

  self.onDeselected(function () {
    _$.selected = _.reject(_$.selected, function (w) { return w == self});
  });

  self.onRemoved(function () {
    _$.selected = _.reject(_$.selected, function (w) { return w == self});    
  });

  return self;
};

model.Wall.selected = [];