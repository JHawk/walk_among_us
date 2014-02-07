var meshes = meshes || {};

meshes.Tile = function () {
  var self = this;

  var _$ = meshes.Tile;
  self = _.extend(this, new style.Colors);

  this.create = function (x, y, color) {
    var material = new THREE.MeshLambertMaterial( { color: color } );
    var geometry = new THREE.CubeGeometry(_$.size, _$.size, 1);
    var cube = new THREE.Mesh( geometry, material );
    cube.position.setX(_$.size * x);
    cube.position.setY(_$.size * y);
    cube.position.setZ(-0.5);
    cube.castShadow = true;

    cube.receiveShadow = true;
    return cube;
  };
};

meshes.Tile.size = 20;