var components = components || {};

components.Renderer = function (width, height) {
    this.create = function () {
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;

        renderer.shadowCameraNear = 3;
        renderer.shadowCameraFar = components.CameraControl.far;
        renderer.shadowCameraFov = 50;

        renderer.shadowMapBias = 0.0039;
        renderer.shadowMapDarkness = 0.5;
        renderer.shadowMapWidth = 1024;
        renderer.shadowMapHeight = 1024;
        document.body.appendChild( renderer.domElement );
        return renderer;
    };
};