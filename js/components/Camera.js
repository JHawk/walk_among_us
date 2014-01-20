var components = components || {};

components.Camera = function (width, height) {
    var self = this;
    self = _.extend(this, new helpers.Utils);
    
    this.create = function () {
        var camera = new THREE.PerspectiveCamera( 75, width / height, self.near, self.far );
        // var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 10000 );
        
        camera.position.x = -60;
        camera.position.y = -60;
        camera.position.z = 60;

        camera.rotateX(self.radians(45));
        camera.rotateY(self.radians(-35));
        camera.rotateZ(self.radians(-30));

        return camera;
    };
};

components.Camera.near = 0.1;
components.Camera.far = 1000;