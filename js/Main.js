var models = models || {};

Main = function () {
  var self = this;
  var width = window.innerWidth, height = window.innerHeight;

  // self.start = function () {
  //   var button = "<div id='startButton' class='display'>play the game and such.</div>";
  //   $('body').append(button);
  //   var startButton = $('#startButton');

  //   $('body').click(function () {
  //     var el = document.documentElement;
  //     var rfs = el.requestFullScreen
  //             || el.webkitRequestFullScreen
  //             || el.mozRequestFullScreen;
      
  //     rfs.call(el);

  //     startButton.hide();
  //     self.play();
  //   });

  //   self.centerEl = function () {
  //     startButton.css("top", Math.max(0, (($(window).height() - startButton.outerHeight()) / 2) + 
  //                                                 $(window).scrollTop()) + "px");
  //     startButton.css("left", Math.max(0, (($(window).width() - startButton.outerWidth()) / 2) + 
  //                                                 $(window).scrollLeft()) + "px");
  //   };

  //   self.centerEl();
  // };

  self.play = function () {

    var minionDisplay = new panels.MinionDisplay();
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
    board.createFocus();
    
    scene.add(lights.ambient());
    scene.add(lights.directional1());
    scene.add(lights.directional2());

    var cameraControl = new components.CameraControl(width, height, board.centerPosition);
    var renderer = new components.Renderer(width, height).create();

    var keyControls = new controls.Keys(cameraControl);
    var mouseControls = new controls.Mouse(cameraControl.camera, scene);

    new controls.Spells(mouseControls);
    new panels.SpellsDisplay();
    var playerDisplay = new panels.PlayerDisplay();
    
    function render() {
      requestAnimationFrame(render);
      keyControls.update();
      renderer.render(scene, cameraControl.camera);
      board.update();
      playerDisplay.update();
      TWEEN.update();
    }

    render();
  };
}