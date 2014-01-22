var model = model || {};

model.Minion = function (color, mesh) {
  var self = this;

  self = _.extend(this, new helpers.Utils);
  self = _.extend(this, new models.BaseModel());

  self.mesh = mesh;
  self.tickSpeed = 10;
  self.speed = 1;

  self.isSelected = false;
  self.isHighlighted = false;
  self.isTargetable = true;
  self.color = color;

  self.destination;

  self.boundary = 20.0;

  var _targets = [];

  this.updateTargets = function (targets) {
    _targets = targets;
  };

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
    else 
    {
      if (_targets.length > 0)
      {
        var newTarget = _.sample(_targets);
        self.destination = [newTarget.position.x, newTarget.position.y];
      }
    }
  };

  self.update = _.throttle(update, self.tickSpeed);
};