var controls = controls || {};

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

  this.selectElement = function (event) {
    event.preventDefault();

    self.onTarget(event, function (target) {
      var model = target.model;
      model.isSelected = !model.isSelected;
      target.material.color.setHex(self.modelColor(model));
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
      // case 2: /*Right*/ self.moveState.back = 1; break;
    }
  };

  this.mouseup = function( event ) {

    event.preventDefault();
    event.stopPropagation();

    switch ( event.button ) {
      // case 0: /*Left*/ self.moveState.forward = 0; break;
      // case 2: /*Right*/ self.moveState.back = 0; break;
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
            var currentModel = currentHighlight.model;
            currentModel.isHighlighted = false;
            currentHighlight.material.color.setHex(self.modelColor(currentModel));
          }
          currentHighlight = target;
          var targetModel = target.model;
          targetModel.isHighlighted = true;
          target.material.color.setHex(colors.highlight(self.modelColor(targetModel)));
        }
      },
      function () {
        if (currentHighlight) {
          var currentModel = currentHighlight.model;
          currentModel.isHighlighted = false;
          
          currentHighlight.material.color.setHex(self.modelColor(currentModel));
        }        
      });
  };

  this.modelColor = function (model) {
    return model.isSelected ? colors.selectionColor : model.color;
  };

  this.mousemove = function( event ) {
    // if ( self.mouseStatus > 0 ) {
      self.highlightElement(event);
    // }
  };

  this.domElement.addEventListener( 'mousemove', self.mousemove, false );
  this.domElement.addEventListener( 'mousedown', self.mousedown, false );
  this.domElement.addEventListener( 'mouseup',   self.mouseup, false );
};
