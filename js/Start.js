function start() {
  var self = this;

  new SetupStats();

  var scene = new THREE.Scene();
  var width = window.innerWidth, height = window.innerHeight;

  var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  var gridWidth = 20, gridHeight = 20;


  var grayMaterial = new THREE.MeshLambertMaterial( { color: 0xB0A6A4 } );

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), grayMaterial);
  plane.overdraw = true;
  scene.add(plane);

  var blocks = new BlocksGeometry().generate(20,20);
  _.each(blocks, function (mesh) { scene.add(mesh); })

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  
  this.radians = function (degrees) {
    return degrees * (Math.PI/180)
  }

  this.degrees = function (radians) {
    return radians * (180/Math.PI)
  }

  camera.position.x = -3;
  camera.position.y = -3;
  camera.position.z = 7;

  camera.rotateX(self.radians(45));
  camera.rotateY(self.radians(-35));
  camera.rotateZ(self.radians(-30));

  var controls;
  controls = new THREE.Controls( camera );

  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

  render();
}