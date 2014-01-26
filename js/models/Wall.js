var models = models || {};

models.Wall = function (x,y) {
  var self = this;
  self.hitPoints = 10;
  self.name = "Wall";
  self = _.extend(this, new style.Colors());
  var _$ = models.Wall;
  self.boardPosition = [x,y];


  var color = self.blockColor();

  var mesh = new meshes.Wall().create(x,y,color);

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

  self.onDamaged(self.degradeColors);

  mesh.model = self;

  return self;
};

models.Wall.selected = [];