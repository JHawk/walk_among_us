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
  self.attackSpeedMs = 500;
  self.speed = 1;
  self.damage = 1;

  self.meleeRange = 20.0;

  var _target, _path, _destination;

  self.advance = function () {

    var x = mesh.position.x;
    var y = mesh.position.y;

    var step = self.step([x,y], _destination, self.speed);

    var nextX = x + step[0];
    var nextY = y + step[1];

    mesh.position.setX(nextX);
    mesh.position.setY(nextY);
  };

  this.isClose = function(from, to, tolerance) {
    var _dx = Math.abs(from[0] - to[0]);
    var _dy = Math.abs(from[1] - to[1]);

    return self.magnitude([_dx, _dy]) < tolerance;
  };

  var attack = _.throttle(function () {
    _target.takeHit(self.damage);
  }, self.attackSpeedMs);

  self.fromBoard = function (p) {
    return [p[0] * meshes.Wall.size, p[1] * meshes.Wall.size];
  };

  // meshes.Utils.collision(mesh, [_target.mesh])
  var move = function () {
    if (_target && self.isClose(self.position(), _target.position, self.meleeRange))
    {
      attack();
    }
    else
    {
      if (_destination == undefined || self.isClose(self.position(), _destination, 20)) 
      {
        _destination = self.fromBoard(_path.shift());
        console.log("path : " + _path);
        console.log("current destination : " + _destination);
      }
      self.advance();
    }
  };

  this.boardPosition = function () {
    return _.map(self.position(), function (i) {
      return Math.round(i / meshes.Wall.size);
    });
  };

  var update = function () {
    if (_target && _target.isSelected && _path.length > 0) 
    {
      move();
    }
    else 
    {
      var walls = models.Board.board.targetableWalls;
      if (walls.length > 0)
      {
        _target = _.sample(walls);
        _path = models.Board.board.findPath(self.boardPosition(), _target.boardPosition);
        _path.shift();
        console.log("New Path : " + _path);
      }
    }
  };

  mesh.model = self;
  
  self.update = _.throttle(update, self.tickSpeedMs);

  models.Minion.alive.push(self);
};

models.Minion.alive = [];