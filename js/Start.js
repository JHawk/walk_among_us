function Start() {
  var self = this;

  new SetupStats();
  var colors = new Colors();

  var scene = new THREE.Scene();
  var width = window.innerWidth, height = window.innerHeight;

  var cameraNear = 0.1;
  var cameraFar = 1000;
  var camera = new THREE.PerspectiveCamera( 75, width / height, cameraNear, cameraFar );
  // var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 10000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;

  renderer.shadowCameraNear = 3;
  renderer.shadowCameraFar = camera.far;
  renderer.shadowCameraFov = 50;

  renderer.shadowMapBias = 0.0039;
  renderer.shadowMapDarkness = 0.5;
  renderer.shadowMapWidth = 1024;
  renderer.shadowMapHeight = 1024;
  document.body.appendChild( renderer.domElement );

  var grayMaterial = new THREE.MeshLambertMaterial( { color: colors.floor } );

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), grayMaterial);
  plane.overdraw = true;
  plane.receiveShadow = true;
  scene.add(plane);


  var gridWidth = 20, gridHeight = 20;

  var blocks = new BlocksGeometry().generate(gridWidth,gridHeight);
  _.each(blocks, function (mesh) { scene.add(mesh); })

  var ambientLight = new THREE.AmbientLight(colors.ambientLight);
  scene.add(ambientLight);

  var shadowDistance = 1024;
  var pointColor = colors.directionalLight;
  var directionalLight = new THREE.DirectionalLight(pointColor);
  directionalLight.position.set(-40, 60, 30);
  directionalLight.castShadow = true;
  directionalLight.shadowCameraNear = cameraNear;
  directionalLight.shadowCameraFar = cameraFar;
  directionalLight.shadowCameraLeft = -shadowDistance;
  directionalLight.shadowCameraRight = shadowDistance;
  directionalLight.shadowCameraTop = shadowDistance;
  directionalLight.shadowCameraBottom = -shadowDistance;

  directionalLight.distance = 0;
  directionalLight.intensity = 1.0;
  directionalLight.shadowMapHeight = 1024;
  directionalLight.shadowMapWidth = 1024;

  scene.add(directionalLight);

  this.radians = function (degrees) {
    return degrees * (Math.PI/180)
  }

  this.degrees = function (radians) {
    return radians * (180/Math.PI)
  }

  camera.position.x = -60;
  camera.position.y = -60;
  camera.position.z = 60;

  camera.rotateX(self.radians(45));
  camera.rotateY(self.radians(-35));
  camera.rotateZ(self.radians(-30));

  var controls;
  controls = new THREE.Controls( camera, blocks );

  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

  render();
}