var controls = controls || {};

function RightMouseDown () {return false;}
document.oncontextmenu=RightMouseDown;

controls.Mouse = function (camera, scene) {
  var self = this;

  this.domElement = document;

  var colors = new style.Colors;

  this.camera = camera;

  var projector = new THREE.Projector();
  this.mouseStatus = 0;

  this.raycasterMouse = function (event) {
    var vector = new THREE.Vector3(
        ( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5
    );

    projector.unprojectVector( vector, camera );

    return new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  };

  this.targetObjects = function (event) {
    var objects = self.raycasterMouse(event).intersectObjects(scene.children);
    return _.filter(objects, function (obj) { 
      return obj.object && obj.object.model && obj.object.model.isTargetable; 
    });
  };

  this.onTarget = function(event, action, noTargets) {
    var intersects = self.targetObjects(event);

    if ( intersects.length > 0 ) {
      var firstIntersection = intersects[0].object;
      action(firstIntersection);
    } 
    else if (noTargets)
    {
      noTargets();
    }
  };

  this.currentTarget = function(action, noTargets) {
    if (!self.lastMouseMoveEvent) {
      noTargets();
    }
    self.onTarget(self.lastMouseMoveEvent, action, noTargets);
  };

  this.selectElement = function (event) {
    event.preventDefault();

    self.onTarget(event, function (target) {
      target.model.toggleSelection();
    });
  };

  this.specialAttack = function (event) {
    event.preventDefault();

    self.onTarget(event, function (target) {
      target.model.specialAttack();
    });
  };

  this.mousedown = function( event ) {
    if ( self.domElement !== document ) {
      self.domElement.focus();
    }

    event.preventDefault();
    event.stopPropagation();

    switch ( event.button ) {
      case 0: /*Left*/ self.selectElement(event); break;
      case 2: /*Right*/ self.specialAttack(event); break;
    }
  };

  this.mouseup = function( event ) {

    event.preventDefault();
    event.stopPropagation();

    switch ( event.button ) {
      // case 0: /*Left*/ function; break;
      // case 2: /*Right*/ function; break;
    }
  };

  var currentHighlight;

  this.highlightElement = function(event) {
    self.onTarget(
      event, 
      function (target) {
        if (target !== currentHighlight && !target.model.isHighlighted)
        {
          if (currentHighlight) {
            currentHighlight.model.unHighlight();
          }
          currentHighlight = target;
          target.model.highlight();
        }
      },
      function () {
        if (currentHighlight) {
          currentHighlight.model.unHighlight();
        }        
      });
  };

  this.lastMouseMoveEvent = undefined;

  this.mousemove = function( event ) {
    self.lastMouseMoveEvent = event;
    self.highlightElement(event);
  };

  this.domElement.addEventListener( 'mousemove', self.mousemove, false );
  this.domElement.addEventListener( 'mousedown', self.mousedown, false );
  this.domElement.addEventListener( 'mouseup',   self.mouseup, false );
};
