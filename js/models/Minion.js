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

  self.target = undefined;

    // meshes.Utils.collision(mesh, [self.target.mesh])

  self.currentPath = undefined;
  self.setPath = function () {
    var from = self.boardPosition();
    var to = self.target.boardPosition;
    try {
      var _path = models.Board.board.findPath(from, to);
      _path.push(to);
      self.currentPath = _path.slice(1);
    } catch(e) {
      console.log("broken path");
    }
  };

  self.currentDestination =  undefined;
  self.destination = function () {
    if (!self.currentPath || self.currentPath.length < 1) {
      self.setPath();
    }

    if (!self.currentDestination || self.isClose(self.position(), self.currentDestination, 0.5)) {
      self.currentDestination = self.fromBoard(self.currentPath.shift());
    }

    return self.currentDestination;
  };

  self.advance = function () {
    var x = mesh.position.x;
    var y = mesh.position.y;

    var step = self.step([x,y], self.destination(), self.speed);

    var nextX = x + step[0];
    var nextY = y + step[1];

    mesh.position.setX(nextX);
    mesh.position.setY(nextY);
  };

  self.attack = _.throttle(function () {
    self.target.takeHit(self.damage);
  }, self.attackSpeedMs);

  self.fromBoard = function (p) {
    var half = (meshes.Wall.size / 2);
    return [p[0] * meshes.Wall.size + half, p[1] * meshes.Wall.size + half];
  };

  self.takeAction = function () {
    if (!self.target) return;

    if (self.isClose(self.position(), self.target.position(), self.meleeRange))
      self.attack();
    else
      self.advance();
  };

  this.acquireTarget = function () {
    var walls = models.Board.board.targetableWalls;
    if (walls.length > 0)
    {
      self.currentPath = undefined;
      self.currentDestination = undefined;
      self.target = _.sample(walls);
    }
  }

  this.boardPosition = function () {
    return _.map(self.position(), function (i) {
      return Math.round(i / meshes.Wall.size);
    });
  };

  var update = function () {
    if (self.target && self.target.isSelected)
      self.takeAction();
    else
      self.acquireTarget();
  };

  mesh.model = self;
  
  self.update = _.throttle(update, self.tickSpeedMs);

  models.Minion.alive.push(self);
};

models.Minion.alive = [];