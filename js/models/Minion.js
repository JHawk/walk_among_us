var model = model || {};

model.Minion = function (color) {
  var self = this;

  self.isSelected = false;
  self.isHighlighted = false;
  self.isTargetable = true;
  self.color = color;
};