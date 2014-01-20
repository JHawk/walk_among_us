var meshes = meshes || {};

meshes.Wall = function () {
  var self = this;
  self = _.extend(this, new style.Colors);
  var size = 20;

  this.create = function (x, y, color) {
    var material = new THREE.MeshLambertMaterial( { color: color } );
    var geometry = new THREE.CubeGeometry(size, size, size);
    var cube = new THREE.Mesh( geometry, material );
    cube.position.setX(size * x);
    cube.position.setY(size * y);
    cube.position.setZ(size / 2);
    cube.castShadow = true;
    return cube;
  };
};