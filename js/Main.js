var models = models || {};

Main = function () {
  var self = this;
  var width = window.innerWidth, height = window.innerHeight;

  this.start = function () {

    var minionDisplay = new panels.MinionDisplay();
    var SpellsDisplay = new panels.SpellsDisplay();
    new SetupStats();
    
    var lights = new components.Lights();
    var scene = new THREE.Scene();

    models.scene = scene;

    scene.add(new meshes.Floor().create());

    var gridWidth = 25, gridHeight = 25;

    var board = new models.Board(gridWidth, gridHeight);
    
    models.board = board;

    board.createWalls();
    board.createExplorers();
    
    scene.add(lights.ambient());
    scene.add(lights.directional1());
    scene.add(lights.directional2());

    var cameraControl = new components.CameraControl(width, height, board.centerPosition);
    var renderer = new components.Renderer(width, height).create();

    var keyControls = new controls.Keys(cameraControl);
    new controls.Mouse(cameraControl.camera, scene);
    
    function render() {
      requestAnimationFrame(render);
      keyControls.update();
      renderer.render(scene, cameraControl.camera);
      board.update();
      TWEEN.update();
    }

    render();
  };
}