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
      var collisionResults = ray.intersectObjects( _targets );
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
        _target.model.takeHit();
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
        self.destination = [_target.position.x, _target.position.y];
      }
    }
  };

  self.update = _.throttle(update, self.tickSpeed);
};