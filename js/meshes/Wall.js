var meshes = meshes || {};

meshes.Wall = function () {
  var self = this;

  var _$ = meshes.Wall;
  self = _.extend(this, new style.Colors);

  this.create = function (x, y, color) {
    var material = new THREE.MeshLambertMaterial( { color: color } );
    var geometry = new THREE.CubeGeometry(_$.size, _$.size, _$.size);
    var cube = new THREE.Mesh( geometry, material );
    cube.position.setX(_$.size * x);
    cube.position.setY(_$.size * y);
    cube.position.setZ(_$.size / 2);
    cube.castShadow = true;
    return cube;
  };
};

meshes.Wall.size = 20;