var model = model || {};

model.Wall = function (color, mesh) {
  var self = this;
  self = _.extend(this, new models.BaseModel());
  
  self.mesh = mesh;

  self.isSelected = false;
  self.isHighlighted = false;
  self.isTargetable = true;
  self.color = color;
};