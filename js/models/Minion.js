var model = model || {};

model.Minion = function (color, mesh) {
  var self = this;

  self = _.extend(this, new helpers.Utils);
  self = _.extend(this, new models.BaseModel(color, mesh));

  self.tickSpeed = 10;
  self.speed = 1;

  self.destination;

  self.meleeRange = 20.0;

  var _targets = [];
  var _target;

  this.updateTargets = function (targets) {
    _targets = targets;
  };

  var collision = function () {
    var origin = mesh.position.clone();
    for (var vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++)
    {   
      var localVertex = mesh.geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4( mesh.matrix );
      var directionVector = globalVertex.sub( mesh.position );
      
      var ray = new THREE.Raycaster( origin, directionVector.clone().normalize() );
      var meshes = _.map(_targets, function (t) { return t.mesh; });
      var collisionResults = ray.intersectObjects( meshes );
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length())
      {
        return true;
      }
    }
  }

  var advance = function () {
    var x = mesh.position.x;
    var y = mesh.position.y;

    var step = self.step(self.destination, [x,y], self.speed);

    var nextX = x + step[0];
    var nextY = y + step[1];

    mesh.position.setX(nextX);
    mesh.position.setY(nextY);
  };

  var move = function () {
    if (collision())
    {
      if (_target) 
      {
        _target.takeHit();
      }
      self.destination = null;
    }
    else
      advance();
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
        _target = _.sample(_targets);
        self.destination = [_target.mesh.position.x, _target.mesh.position.y];
      }
    }
  };

  self.update = _.throttle(update, self.tickSpeed);
};