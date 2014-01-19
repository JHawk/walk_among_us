MouseControls = function (camera, objects) {
  var self = this;

  this.domElement = document;

  var colors = new Colors();

  this.camera = camera;

  var projector = new THREE.Projector();

  this.selectElement = function (event) {
    event.preventDefault();

    var vector = new THREE.Vector3(
        ( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5
    );

    projector.unprojectVector( vector, camera );

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {
        intersects[0].object.material.color.setHex( colors.selectionColor );
    }
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

  this.mousemove = function( event ) {
    if ( self.mouseStatus > 0 ) {
      // mouse move events
    }
  };

  this.domElement.addEventListener( 'mousemove', self.mousemove, false );
  this.domElement.addEventListener( 'mousedown', self.mousedown, false );
  this.domElement.addEventListener( 'mouseup',   self.mouseup, false );
};
