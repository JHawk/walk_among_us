var models = models || {};

models.Minion = function (that) {
  var external = this;
  var internal = {};

  var _$ = models.Minion;
  external = _.extend(this, new helpers.Utils());
  external = _.extend(this, new models.BaseModel(that.color, that.mesh));

  that.target = undefined;

  external.deadBody = _.once(function () 
  {
    var material = new THREE.MeshLambertMaterial( { color: color } );
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

  external.needsPath = function () {
    return !external.currentPath || external.currentPath.length < 1;
  };

  external.currentDestination =  undefined;
  external.destination = function () {
    if (external.needsPath()) {
      external.setPath();
    }

    if (!external.currentDestination || external.isClose(external.position(), external.currentDestination, 10)) {
      var d = external.fromBoard(external.currentPath.shift());
      external.currentDestination = new THREE.Vector3(d[0], d[1], 15)
    }

    return external.currentDestination;
  };

  internal.tweenPosition = undefined;

  external.tween = undefined;
  external.advance = function () {
    if (!external.tween)
    {
      internal.tweenPosition = {x: that.mesh.position.x, y: that.mesh.position.y}; 
      var destination = external.destination().clone();
      external.tween = new TWEEN.Tween(internal.tweenPosition)
        .to(destination, 1000 / this.speed)
        // .delay(self.delay)
        // .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function(obj, value){
          // internal.tweenPosition is NaNs
          that.mesh.position.set(internal.tweenPosition.x, internal.tweenPosition.y, 15);
        })
        .onComplete(function() {
          // TODO: make tweens unique so they can be removed in the Tween.js lib 
          // TWEEN.remove(self.tween);
          external.currentDestination = undefined;
          external.tween = undefined;
          internal.tweenPosition = undefined;
        })
        .start();
    }
  };

  external.onDamaged(external.degradeColors);

  external.attack = _.throttle(function () {
    that.target.takeHit(this.damage);
  }, this.attackSpeedMs);

  external.fromBoard = function (p) {
    var half = (meshes.Wall.size / 2);
    return [p[0] * meshes.Wall.size, p[1] * meshes.Wall.size];
  };

  external.takeAction = function () {
    if (!that.target) return;

    if (external.isClose(external.position(), that.target.position(), external.meleeRange))
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

  models.Minion.alive.push(this);

  return external;
};

models.Minion.alive = [];