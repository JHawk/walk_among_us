var model = model || {};

model.Minion = function (color, mesh) {
  var self = this;

  self.tickSpeed = 1000;
  self.isSelected = false;
  self.isHighlighted = false;
  self.isTargetable = true;
  self.color = color;

  var move = function () {
    // mesh.position.setX(size * x);
    // mesh.position.setY(size * y);
    // mesh.position.setZ(size / 2);
    console.log("move");
  };

  var update = function () {
    move();
  };

  self.update = _.throttle(update, self.tickSpeed);
};