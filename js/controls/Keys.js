var controls = controls || {};

controls.Keys = function ( cameraControl ) {
  var self = this;
  
  this.cameraControl = cameraControl;
  this.camera = cameraControl.camera;
  this.domElement = document;
  this.movementSpeed = 1.0;
  this.rotationSpeed = 0.01;
  this.tmpQuaternion = new THREE.Quaternion();

  this.moveState = { 
    up: 0, 
    down: 0, 
    left: 0, 
    right: 0, 
    forward: 0, 
    back: 0, 

    turnUp: 0, 
    turnDown: 0, 
    turnLeft: 0, 
    turnRight: 0, 
    rollForward: 0, 
    rollBack: 0 
  };
  
  this.moveVector = new THREE.Vector3( 0, 0, 0 );
  this.rotationVector = new THREE.Vector3( 0, 0, 0 );

  this.keydown = function( event ) {
    var keyHandled = true;
    if ( event.keyCode == 84 /*T*/ ) {
      self.cameraControl.toggle();
    } else if ( controls.Spells.spells.hasKey(event.keyCode) ) {
      controls.Spells.spells.action(event.keyCode)();
    } else if ( event.altKey ) {
      switch ( event.keyCode ) {
        case 87: /*W*/ self.moveState.rollForward = 1; break;
        case 83: /*S*/ self.moveState.rollBack = 1; break;
        case 65: /*A*/ self.moveState.turnLeft = 1; break;
        case 68: /*D*/ self.moveState.turnRight = 1; break;
        case 69: /*E*/ self.moveState.turnUp = 1; break;
        case 81: /*Q*/ self.moveState.turnDown = 1; break;
        default: keyHandled = false;
      }

      if (keyHandled)
      {
        event.preventDefault(); 
        self.updateRotationVector();
      }
    } else {
      switch ( event.keyCode ) {
        case 87: /*W*/ self.moveState.up = 1; break;
        case 83: /*S*/ self.moveState.down = 1; break;
        case 65: /*A*/ self.moveState.left = 1; break;
        case 68: /*D*/ self.moveState.right = 1; break;
        case 69: /*E*/ self.moveState.forward = 1; break;
        case 81: /*Q*/ self.moveState.back = 1; break;
        default: keyHandled = false; 
      }

      if (keyHandled)
      {
        event.preventDefault(); 
        self.updateMovementVector();
      }     
    }
  };

  this.keyup = function( event ) {
    var keyHandled = true;

    switch( event.keyCode ) {
      case 87: /*W*/ self.moveState.up = 0; self.moveState.turnUp = 0; break;
      case 83: /*S*/ self.moveState.down = 0; self.moveState.turnDown = 0; break;
      case 65: /*A*/ self.moveState.left = 0; self.moveState.turnLeft = 0; break;
      case 68: /*D*/ self.moveState.right = 0; self.moveState.turnRight = 0; break;
      case 69: /*E*/ self.moveState.forward = 0; self.moveState.rollForward = 0; break;
      case 81: /*Q*/ self.moveState.back = 0; self.moveState.rollBack = 0; break;
      default: keyHandled = false;
    }

    if (keyHandled)
    {
      event.preventDefault(); 
      
      self.updateMovementVector();
      self.updateRotationVector();
    }     
  };

  this.updateMovementVector = function() {
    self.moveVector.x = ( -self.moveState.left    + self.moveState.right );
    self.moveVector.y = ( -self.moveState.down    + self.moveState.up );
    self.moveVector.z = ( -self.moveState.forward + self.moveState.back );
  };

  this.updateRotationVector = function() {
    self.rotationVector.x = ( -self.moveState.turnDown + self.moveState.turnUp );
    self.rotationVector.y = ( -self.moveState.turnRight  + self.moveState.turnLeft );
    self.rotationVector.z = ( -self.moveState.rollBack + self.moveState.rollForward );
  };

  this.update = function() {
    var moveMult = self.movementSpeed;
    var rotMult = self.rotationSpeed;

    self.camera.translateX( self.moveVector.x * moveMult );
    self.camera.translateY( self.moveVector.y * moveMult );
    self.camera.translateZ( self.moveVector.z * moveMult );

    self.tmpQuaternion.set( self.rotationVector.x * rotMult, self.rotationVector.y * rotMult, self.rotationVector.z * rotMult, 1 ).normalize();
    self.camera.quaternion.multiply( self.tmpQuaternion );

    self.camera.rotation.setFromQuaternion( self.camera.quaternion, self.camera.rotation.order );
  };

  this.domElement.addEventListener( 'keydown', self.keydown, false );
  this.domElement.addEventListener( 'keyup',   self.keyup, false );

  this.updateMovementVector();
  this.updateRotationVector();
}
