var models = models || {};

models.Minion = function (x,y) {
  var self = this;
  self.name = "Minion";
  self = _.extend(this, new style.Colors());
  self = _.extend(this, new helpers.Utils());

  var color = self.minionColor();
  var mesh = new meshes.Minion().create(x,y,color);
  
  self = _.extend(this, new models.BaseModel(color, mesh));

  self.tickSpeedMs = 10;
  self.attackSpeedMs = 1000;
  self.speed = 1;
  self.damage = 1;

  self.meleeRange = 10.0;

  var _target;

  self.advance = function () {
    var x = mesh.position.x;
    var y = mesh.position.y;

    var step = self.step([x,y], _target.position(), self.speed);

    var nextX = x + step[0];
    var nextY = y + step[1];

    mesh.position.setX(nextX);
    mesh.position.setY(nextY);
  };

  var inRange = function() {
    var x = mesh.position.x;
    var y = mesh.position.y;

    var destination = _target.position();
    var _dx = Math.abs(x - destination[0]);
    var _dy = Math.abs(y - destination[1]);
    return self.magnitude([_dx, _dy]) < self.meleeRange;
  };

  var attack = _.throttle(function () {
    _target.takeHit(self.damage);
  }, self.attackSpeedMs);

  // meshes.Utils.collision(mesh, [_target.mesh])
  var move = function () {
    if (_target && inRange())
    {



      var targetables = models.Board.board.targetableWalls();

      attack();


    }
    else
    {
      self.advance();
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
  
  self.update = _.throttle(update, self.tickSpeedMs);

  models.Minion.alive.push(self);
};

models.Minion.alive = [];