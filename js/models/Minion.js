var models = models || {};

models.Minion = function (x,y) {
  var self = this;
  self.name = "Minion";
  self = _.extend(this, new style.Colors);
  self = _.extend(this, new helpers.Utils);

  var color = self.minionColor();
  var mesh = new meshes.Minion().create(x,y,color);
  
  self = _.extend(this, new models.BaseModel(color, mesh));

  self.tickSpeed = 10;
  self.speed = 1;

  self.meleeRange = 20.0;

  var _target;

  var advance = function () {
    var x = mesh.position.x;
    var y = mesh.position.y;

    var step = self.step(_target.position(), [x,y], self.speed);

    var nextX = x + step[0];
    var nextY = y + step[1];

    mesh.position.setX(nextX);
    mesh.position.setY(nextY);
  };

  var move = function () {
    if (_target && meshes.Utils.collision(mesh, [_target.mesh]))
    {
      _target.takeHit();
    }
    else
    {
      advance();
    }
  };

  var update = function () {
    if (_target && _target.isSelected) 
    {
      move();
    }
    else 
    {
      if (models.Wall.selected.length > 0)
      {
        _target = _.sample(models.Wall.selected);
      }
    }
  };

  mesh.model = self;
  
  self.update = _.throttle(update, self.tickSpeed);

  models.Minion.alive.push(self);
};

models.Minion.alive = [];