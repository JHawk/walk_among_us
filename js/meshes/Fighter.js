var meshes = meshes || {};

meshes.Fighter = function () {
  var self = this;

  var _$ = meshes.Fighter;
  self = _.extend(this, new style.Colors);

  this.create = function (x, y, color) {
    var material = new THREE.MeshLambertMaterial( { color: color } );
    var geometry = new THREE.CubeGeometry(_$.size, _$.size, _$.size);
    var cube = new THREE.Mesh( geometry, material );
    cube.position.setX(meshes.Wall.size * x);
    cube.position.setY(meshes.Wall.size * y);
    cube.position.setZ(meshes.Wall.size / 2);
    cube.castShadow = true;
    return cube;
  };
};

meshes.Fighter.size = 14;