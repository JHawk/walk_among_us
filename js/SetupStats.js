SetupStats = function () {
  var stats = new Stats();
  stats.setMode(1); // 0: fps, 1: ms

  // Align top-left

  var displayEl = $('.display');

  var top = (displayEl.length > 0) ? (displayEl.height() + 'px') : '0px';
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = top;

  document.body.appendChild( stats.domElement );

  setInterval( function () {

      stats.begin();

      // your code goes here

      stats.end();

  }, 1000 / 60 );
};