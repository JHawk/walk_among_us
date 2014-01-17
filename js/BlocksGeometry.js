BlocksGeometry = function () {

  var brownMaterial = new THREE.MeshLambertMaterial( { color: 0xB3432B } );

  this.generate = function ( width, height ) {
    var _width = _(width).range();
    var _height = _(height).range();

    var blocks = _width.map(function(x) {
      return _height.map(function(y) {
        var cube;

        var geometry = new THREE.CubeGeometry(1,1,1);

        cube = new THREE.Mesh( geometry, brownMaterial );
        
        cube.name = "cube-x:" + x + "-y:" + y;
        cube.position.setX(x);
        cube.position.setY(y);
        cube.position.setZ(1);

        return cube;
      });
    });

    return _.flatten(blocks);
  };
}
