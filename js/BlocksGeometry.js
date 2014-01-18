BlocksGeometry = function () {

  var brownMaterial = new THREE.MeshLambertMaterial( { color: 0xB3432B } );
  var blockSize = 20;

  this.generate = function ( width, height ) {
    var _width = _(width).range();
    var _height = _(height).range();

    var blocks = _width.map(function(x) {
      return _height.map(function(y) {
        var cube;

        var geometry = new THREE.CubeGeometry(blockSize,blockSize,blockSize);

        cube = new THREE.Mesh( geometry, brownMaterial );
        
        cube.name = "cube-x:" + x + "-y:" + y;
        cube.position.setX(blockSize * x);
        cube.position.setY(blockSize * y);
        cube.position.setZ(blockSize / 2);
        cube.castShadow = true;

        return cube;
      });
    });

    return _.flatten(blocks);
  };
}
