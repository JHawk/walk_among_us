var models = models || {};

Main = function () {
  var self = this;
  var width = window.innerWidth, height = window.innerHeight;

  this.start = function () {
    new SetupStats();
    var lights = new components.Lights();
    var scene = new THREE.Scene();

    scene.add(new meshes.Floor().create());

    var gridWidth = 20, gridHeight = 20;

    var board = new models.Board(gridWidth, gridHeight);
    
    _.each(board.createWalls(), function (mesh) { 
      scene.add(mesh); 
    });

    _.each(board.createMinions(), function (mesh) { 
      scene.add(mesh); 
    });
    
    scene.add(lights.ambient());
    scene.add(lights.directional1());
    scene.add(lights.directional2());

    models.scene = scene;

    var cameraControl = new components.CameraControl(width, height, board.centerPosition);
    var renderer = new components.Renderer(width, height).create();

    var keyControls = new controls.Keys(cameraControl);
    new controls.Mouse(cameraControl.camera, scene);
    
    function render() {
      requestAnimationFrame(render);
      keyControls.update();
      renderer.render(scene, cameraControl.camera);
      board.update();
    }

    render();
  };
}