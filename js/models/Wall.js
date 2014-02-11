var models = models || {};

models.Wall = function (x,y) {
  var self = this;
  self.hitPoints = 10;
  self.name = "Wall";

  self = _.extend(this, new style.Colors());
  
  self.color = self.blockColor();

  self.mesh = new meshes.Wall().create(x, y, self.color);

  self = _.extend(this, new models.Explorable(self));

  return self;
};