var models = models || {};

models.Focus = function (x,y) {
  var self = this;
  self.hitPoints = 30;
  self.name = "Focus";

  var _$ = models.Focus;

  var color = new style.Colors().focusColor;

  var mesh = new meshes.Focus().create(x,y,color);

  self = _.extend(this, new models.BaseModel(color, mesh));

  self.onRemoved(function () {
    console.log("game over!");  

    _$.alive = _.reject(_$.alive, function (m) { return m == self});  
  });

  self.onDamaged(self.degradeColors);

  mesh.model = self;

  models.Focus.alive.push(self);

  return self;
};

models.Focus.alive = [];