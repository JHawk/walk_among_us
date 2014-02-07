var models = models || {};

models.Tile = function (x,y) {
  var self = this;

  self.name = "Tile";
  
  var color = new style.Colors().tileColor;
  var mesh = new meshes.Tile().create(x,y, color);

  self = _.extend(this, new models.BaseModel(color, mesh));

  mesh.model = self;

  return self;
};