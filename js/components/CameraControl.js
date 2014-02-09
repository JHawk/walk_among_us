var components = components || {};

components.CameraControl = function (width, height, center) {
    var self = this;
    self = _.extend(this, new helpers.Utils);
    
    var isOverhead = true;

    var perspectiveVector = new THREE.Vector3(90, 90, 120);
    var overheadVector = new THREE.Vector3(center[0], center[1], 300);

    var resetRotation = function () {
        self.camera.setRotationFromQuaternion(self.initQuaternion);
    };

    var perspective = function () {
        self.camera.position = perspectiveVector;

        resetRotation();

        self.camera.rotateX(self.radians(45));
        self.camera.rotateY(self.radians(-35));
        self.camera.rotateZ(self.radians(-30));
    };

    var centerOverhead = function () {
        resetRotation();

        self.camera.position = overheadVector;
    };

    this.toggle = function () {
        isOverhead = !isOverhead;
        if (isOverhead)
        {
            centerOverhead();
        }
        else
        {
            perspective();
        }
    };

    this.create = function () {
        var camera = new THREE.PerspectiveCamera( 75, width / height, self.near, self.far );
        // var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 10000 );
      
        return camera;
    };

    self.camera = this.create();
    self.initQuaternion = this.camera.quaternion.clone();
    centerOverhead(); 
};

components.CameraControl.near = 0.1;
components.CameraControl.far = 1000;