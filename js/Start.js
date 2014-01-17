function start() {
  var self = this;

  new SetupStats();

  var scene = new THREE.Scene();
  var width = window.innerWidth, height = window.innerHeight;

  var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  var greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  var whiteMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var blueMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

  var gridWidth = 20, gridHeight = 20;

  _(gridWidth).times(function(x) {
    _(gridHeight).times(function(y) {
      var cube;

      var geometry = new THREE.CubeGeometry(1,1,2);

      if (x >= gridWidth / 2 && y >= gridHeight / 2) // 1
        {
          cube = new THREE.Mesh( geometry, greenMaterial );
        }
        else if (x >= gridWidth / 2) // 2
        {
          cube = new THREE.Mesh( geometry, redMaterial );
        }
        else if (y >= gridHeight / 2) // 4
        {
          cube = new THREE.Mesh( geometry, blueMaterial );
        }
        else // 3
        {
          cube = new THREE.Mesh( geometry, whiteMaterial);
        }
      scene.add( cube );
      cube.name = "cube-x:" + x + "-y:" + y;
      cube.position.setX(x);
      cube.position.setY(y);
    });
  });
  
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