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

    var minion = board.createMinion();
    scene.add(minion);
    
    scene.add(lights.ambient());
    scene.add(lights.directional());

    var camera = new components.Camera(width, height).create();
    var renderer = new components.Renderer(camera, width, height).create();

    var keyControls = new controls.Keys(camera);
    new controls.Mouse(camera, scene);
    
    function render() {
      requestAnimationFrame(render);
      keyControls.update();
      renderer.render(scene, camera);
    }

    render();
  };
}