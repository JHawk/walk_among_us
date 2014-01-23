var components = components || {};

components.Lights = function (width, height) {

  var colors = new style.Colors;
  var shadowDistance = 1024;
    
  this.directional = function () {
    var light = new THREE.DirectionalLight(colors.directionalLight);
    light.position.set(-40, 60, 30);
    light.castShadow = true;
    light.shadowCameraNear = components.CameraControl.near;
    light.shadowCameraFar = components.CameraControl.far;
    light.shadowCameraLeft = -shadowDistance;
    light.shadowCameraRight = shadowDistance;
    light.shadowCameraTop = shadowDistance;
    light.shadowCameraBottom = -shadowDistance;
    light.distance = 0;
    light.intensity = 1.0;
    light.shadowMapHeight = 1024;
    light.shadowMapWidth = 1024;
    return light;
  };

  this.ambient = function () {
    return new THREE.AmbientLight(colors.ambientLight);
  };
};