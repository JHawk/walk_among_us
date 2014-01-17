function start() {

  var scene = new THREE.Scene();
  var width = window.innerWidth, height = window.innerHeight;

  // var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  // scene.add( camera );

  var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  var greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  var whiteMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  var blueMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

  var gridWidth = 10, gridHeight = 10;

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
  
  var self = this;

  var degree = 0.0174532925;
  var degree_45 = 45 * degree;

  camera.position.z = 5;
  // camera.rotateY(-degree_45);
  // camera.rotateX(degree_45);
  // camera.rotateZ(-degree_45);


  // camera.rotate.y = -45 * Math.PI / 180
  // camera.rotate.x = 45 * Math.PI / 180
  // camera.rotate.z = -45 * Math.PI / 180

  new SetupStats();

  var controls;
  controls = new THREE.Controls( camera );

  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

  render();
}