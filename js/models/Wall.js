var model = model || {};

model.Wall = function (color, mesh) {
  var self = this;
  self = _.extend(this, new models.BaseModel());
  
  self.mesh = mesh;

  self.isSelected = false;
  self.isHighlighted = false;
  self.isTargetable = true;
  self.color = color;

  self.onSelect(function () {console.log("selected Wall 1");})
  self.onSelect(function () {console.log("selected Wall 2");}) 


  self.onDeselect(function () {console.log("NO WAY");})
};