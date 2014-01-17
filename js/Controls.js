THREE.Controls = function ( camera, domElement ) {
  var self = this;

  this.camera = camera;

  this.domElement = ( domElement !== undefined ) ? domElement : document;
  if ( domElement ) this.domElement.setAttribute( 'tabindex', -1 );

  this.movementSpeed = 1.0;
  this.rollSpeed = 0.005;
  this.tmpQuaternion = new THREE.Quaternion();
  this.mouseStatus = 0;

  this.moveState = { 
    up: 0, 
    down: 0, 
    left: 0, 
    right: 0, 
    forward: 0, 
    back: 0 
  };

  this.moveVector = new THREE.Vector3( 0, 0, 0 );
  this.rotationVector = new THREE.Vector3( 0, 0, 0 );

  this.keydown = function( event ) {
    if ( event.altKey ) {
      return;
    }

    // event.preventDefault();

    switch ( event.keyCode ) {
      case 87: /*W*/ self.moveState.forward = 1; break;
      case 83: /*S*/ self.moveState.back = 1; break;
      case 65: /*A*/ self.moveState.left = 1; break;
      case 68: /*D*/ self.moveState.right = 1; break;

      case 82: /*R*/ self.moveState.up = 1; break;
      case 70: /*F*/ self.moveState.down = 1; break;

      case 38: /*up*/ self.moveState.forward = 1; break;
      case 40: /*down*/ self.moveState.back = 1; break;
      case 37: /*left*/ self.moveState.left = 1; break;
      case 39: /*right*/ self.moveState.right = 1; break;
    }

    self.updateMovementVector();
  };

  this.keyup = function( event ) {

    switch( event.keyCode ) {
      case 87: /*W*/ self.moveState.forward = 0; break;
      case 83: /*S*/ self.moveState.back = 0; break;
      case 65: /*A*/ self.moveState.left = 0; break;
      case 68: /*D*/ self.moveState.right = 0; break;
     
      case 82: /*R*/ self.moveState.up = 0; break;
      case 70: /*F*/ self.moveState.down = 0; break;

      case 38: /*up*/ self.moveState.forward = 0; break;
      case 40: /*down*/ self.moveState.back = 0; break;
      case 37: /*left*/ self.moveState.left = 0; break;
      case 39: /*right*/ self.moveState.right = 0; break;
    }

    self.updateMovementVector();
  };

  this.mousedown = function( event ) {
    if ( self.domElement !== document ) {
      self.domElement.focus();
    }

    event.preventDefault();
    event.stopPropagation();

    switch ( event.button ) {
      case 0: /*Left*/ self.moveState.forward = 1; break;
      case 2: /*Right*/ self.moveState.back = 1; break;
    }

    self.updateMovementVector();
  };

  this.mouseup = function( event ) {

    event.preventDefault();
    event.stopPropagation();

    switch ( event.button ) {

      case 0: /*Left*/ self.moveState.forward = 0; break;
      case 2: /*Right*/ self.moveState.back = 0; break;
    }

    self.updateMovementVector();
  };

  this.mousemove = function( event ) {
    if ( self.mouseStatus > 0 ) {
      // mouse move events
    }
  };

  this.update = function() {

    var moveMult = self.movementSpeed;
    var rotMult = self.rollSpeed;

    self.camera.translateX( self.moveVector.x * moveMult );
    self.camera.translateY( self.moveVector.y * moveMult );
    self.camera.translateZ( self.moveVector.z * moveMult );

    self.tmpQuaternion.set( self.rotationVector.x * rotMult, self.rotationVector.y * rotMult, self.rotationVector.z * rotMult, 1 ).normalize();
    self.camera.quaternion.multiply( self.tmpQuaternion );

    self.camera.rotation.setFromQuaternion( self.camera.quaternion, self.camera.rotation.order );
  };

  this.updateMovementVector = function() {
    self.moveVector.x = ( -self.moveState.left    + self.moveState.right );
    self.moveVector.y = ( -self.moveState.down    + self.moveState.up );
    self.moveVector.z = ( -self.moveState.forward + self.moveState.back );

    console.log( 'move:', [ self.moveVector.x, self.moveVector.y, self.moveVector.z ] );
  };

  this.updateRotationVector = function() {

    // this.rotationVector.x = ( -this.moveState.pitchDown + this.moveState.pitchUp );
    // this.rotationVector.y = ( -this.moveState.yawRight  + this.moveState.yawLeft );
    // this.rotationVector.z = ( -this.moveState.rollRight + this.moveState.rollLeft );

    console.log( 'rotate:', [ self.rotationVector.x, self.rotationVector.y, self.rotationVector.z ] );
    
  };

  this.getContainerDimensions = function() {
    if ( self.domElement != document ) {

      return {
        size  : [ self.domElement.offsetWidth, self.domElement.offsetHeight ],
        offset  : [ self.domElement.offsetLeft,  self.domElement.offsetTop ]
      };

    } else {

      return {
        size  : [ window.innerWidth, window.innerHeight ],
        offset  : [ 0, 0 ]
      };
    }
  };

  this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

  this.domElement.addEventListener( 'mousemove', self.mousemove, false );
  this.domElement.addEventListener( 'mousedown', self.mousedown, false );
  this.domElement.addEventListener( 'mouseup',   self.mouseup, false );

  this.domElement.addEventListener( 'keydown', self.keydown, false );
  this.domElement.addEventListener( 'keyup',   self.keyup, false );

  this.updateMovementVector();
  this.updateRotationVector();
};
