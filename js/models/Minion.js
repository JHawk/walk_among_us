var model = model || {};

model.Minion = function (color, mesh) {
  var self = this;
  self = _.extend(this, new helpers.Utils);

  self.tickSpeed = 10;
  self.speed = 1;

  self.isSelected = false;
  self.isHighlighted = false;
  self.isTargetable = true;
  self.color = color;
  self.destination = [0,0];

  self.boundary = 10.0;

  var move = function () {
    var x = mesh.position.x;
    var y = mesh.position.y;

    var _dx = Math.abs(x - self.destination[0]);
    var _dy = Math.abs(y - self.destination[1]);

    if (self.magnitude([_dx, _dy]) < self.boundary)
    {
      self.destination = null;
    }
    else
    {

      var step = self.step(self.destination, [x,y], self.speed);

      var nextX = x + step[0];
      var nextY = y + step[1];

      mesh.position.setX(nextX);
      mesh.position.setY(nextY);
    }
  };

  var update = function () {
    if (self.destination) 
    {
      move();
    }
  };

  self.update = _.throttle(update, self.tickSpeed);
};