var components = components || {};

components.Lights = function (width, height) {

  var colors = new style.Colors;
  var shadowDistance = 1024;
    
  this.directional = function () {
    var pointColor = colors.directionalLight;
    var directionalLight = new THREE.DirectionalLight(pointColor);
    directionalLight.position.set(-40, 60, 30);
    directionalLight.castShadow = true;
    directionalLight.shadowCameraNear = components.Camera.near;
    directionalLight.shadowCameraFar = components.Camera.far;
    directionalLight.shadowCameraLeft = -shadowDistance;
    directionalLight.shadowCameraRight = shadowDistance;
    directionalLight.shadowCameraTop = shadowDistance;
    directionalLight.shadowCameraBottom = -shadowDistance;
    directionalLight.distance = 0;
    directionalLight.intensity = 1.0;
    directionalLight.shadowMapHeight = 1024;
    directionalLight.shadowMapWidth = 1024;
    return directionalLight;
  };

  this.ambient = function () {
    return new THREE.AmbientLight(colors.ambientLight);
  };
};