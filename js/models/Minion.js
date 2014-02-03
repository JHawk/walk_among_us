var models = models || {};

models.Minion = function (x,y) {
  var self = this;
  self.name = "Minion";

  var _$ = models.Minion;

  self = _.extend(this, new style.Colors());
  self = _.extend(this, new helpers.Utils());

  var color = self.minionColor();
  var mesh = new meshes.Minion().create(x,y,color);
  
  self = _.extend(this, new models.BaseModel(color, mesh));

  self.hitPoints = 10;

  self.tickSpeedMs = 10;
  self.attackSpeedMs = 500;

  // 1 to 1000
  self.speed = 2;
  self.damage = 1;
  self.delay = 200;

  self.meleeRange = 30.0;

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

  self.needsPath = function () {
    return !self.currentPath || self.currentPath.length < 1;
  };

  self.currentDestination =  undefined;
  self.destination = function () {
    if (self.needsPath()) {
      self.setPath();
    }

    if (!self.currentDestination || self.isClose(self.position(), self.currentDestination, 10)) {
      var d = self.fromBoard(self.currentPath.shift());
      self.currentDestination = new THREE.Vector3(d[0], d[1], 15)
    }

    return self.currentDestination;
  };

  self.tween = undefined;
  self.advance = function () {
    if (!self.tween)
    {
      var position = {x: self.mesh.position.x, y: self.mesh.position.y}; 
      var destination = self.destination().clone();
      self.tween = new TWEEN.Tween(position)
        .to(destination, 1000 / self.speed)
        // .delay(self.delay)
        // .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function(obj, value){
          self.mesh.position.set(position.x, position.y, 15);
        })
        .onComplete(function() {
          // TODO: make tweens unique so they can be removed in the Tween.js lib 
          // TWEEN.remove(self.tween);
          self.currentDestination = undefined;
          self.tween = undefined;
        })
        .start();
    }
  };

  this.motivate = function() {
    self.speed++;
  };

  this.specialAttack = function () {
    self.takeHit(1);
    self.motivate();
  };

  self.attack = _.throttle(function () {
    self.target.takeHit(self.damage);
  }, self.attackSpeedMs);

  self.fromBoard = function (p) {
    var half = (meshes.Wall.size / 2);
    return [p[0] * meshes.Wall.size, p[1] * meshes.Wall.size];
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

  self.onRemoved(function () {
    _$.alive = _.reject(_$.alive, function (m) { return m == self});    
  });

  models.Minion.alive.push(self);
};

models.Minion.alive = [];