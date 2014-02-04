var models = models || {};

models.Minion = function (that) {
  var external = this;
  var internal = {};
  var initColor = that.color;

  var _$ = models.Minion;

  external = _.extend(this, new helpers.Utils());
  external = _.extend(this, new models.BaseModel(that.color, that.mesh));
  external.characterName = Faker.Name.findName();

  that.target = undefined;

  external.deadBody = _.once(function () 
  {
    var material = new THREE.MeshLambertMaterial( { color: initColor } );
    var geometry = new THREE.CubeGeometry(5,5,5);
    var cube = new THREE.Mesh( geometry, material );
    var p = that.mesh.position;
    cube.position.setX(p.x);
    cube.position.setY(p.y);
    cube.position.setZ(p.z);
    cube.castShadow = false;
    models.scene.add(cube);
  });

    // meshes.Utils.collision(mesh, [self.target.mesh])
  external.currentPath = undefined;
  external.setPath = function () {
    var from = external.boardPosition();
    var to = that.target.boardPosition;
    try {
      var _path = models.Board.board.findPath(from, to);
      _path.push(to);
      external.currentPath = _path.slice(1);
    } catch(e) {
      console.log("broken path");
    }
  };

  external.trackedProperties = ["name", "speed", "damage", "currentAction", "hitPoints"];

  external.needsPath = function () {
    return !external.currentPath || external.currentPath.length < 1;
  };

  external.currentDestination =  undefined;
  external.destination = function () {
    if (external.needsPath()) {
      external.setPath();
    }

    if (!external.currentDestination || external.isClose(external.position(), external.currentDestination, 10)) {
      var newDestination = external.currentPath.shift();
      var d = external.fromBoard(newDestination);
      external.currentDestination = new THREE.Vector3(d[0], d[1], 15)
    }

    return external.currentDestination;
  };

  internal.tween = undefined;
  external.advance = function () {
    if (!internal.tween)
    {
      var position = {x: that.mesh.position.x, y: that.mesh.position.y}; 
      var destination = external.destination().clone();
      internal.tween = new TWEEN.Tween(position)
        .to(destination, 1000 / that.speed)
        // .delay(self.delay)
        // .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function(obj, value){
          // internal.tweenPosition is NaNs
          that.mesh.position.set(position.x, position.y, 15);
        })
        .onComplete(function() {
          // TODO: make tweens unique so they can be removed in the Tween.js lib 
          // TWEEN.remove(self.tween);
          external.currentDestination = undefined;
          internal.tween = undefined;
        })
        .start();
    }
  };

  external.stop = function () {
    if (internal.tween) internal.tween.stop();
    external.currentDestination = undefined;
    external.currentPath = undefined;
    internal.tween = undefined;
  };

  external.onDamaged(external.degradeColors);

  external.attack = _.throttle(function () {
    external.stop();
    that.target.takeHit(that.damage);
  }, that.attackSpeedMs);

  external.fromBoard = function (p) {
    var half = (meshes.Wall.size / 2);
    return [p[0] * meshes.Wall.size, p[1] * meshes.Wall.size];
  };

  external.takeAction = function () {
    if (!that.target) return;

    if (external.isClose(external.position(), that.target.position(), that.meleeRange))
      external.attack();
    else
      external.advance();
  };

  this.boardPosition = function () {
    return _.map(external.position(), function (i) {
      return Math.round(i / meshes.Wall.size);
    });
  };

  var acquireTarget = function () {
    external.currentPath = undefined;
    external.currentDestination = undefined;
    that.acquireTarget();  
  };

  var update = function () {
    if (that.target && that.target.isSelected)
      external.takeAction();
    else
      acquireTarget();
  };

  that.mesh.model = that;
  
  external.update = _.throttle(update, this.tickSpeedMs);

  external.onRemoved(function () {
    _$.alive = _.reject(_$.alive, function (m) { return m == this});    
  });

  external.onSelected(function () { 
    _$.selected(that);
  });

  external.onDeselected(function () { 
    _$.deselected(that);
  });

  models.Minion.alive.push(this);

  return external;
};

/* DRY this up */
models.Minion.selectedEvents = []
models.Minion.selected = function (minion) {
  _.each(models.Minion.selectedEvents, function(e) {
    e(minion);
  })
};
models.Minion.onSelected = function (e) {
  models.Minion.selectedEvents.push(e);
};

models.Minion.deselectedEvents = []
models.Minion.deselected = function (minion) {
  _.each(models.Minion.deselectedEvents, function(e) {
    e(minion);
  })
};
models.Minion.onDeselected = function (e) {
  models.Minion.deselectedEvents.push(e);
};
/* DRY this up */

models.Minion.alive = [];