var meshes = meshes || {};

meshes.Minion = function () {
  var self = this;
  self = _.extend(this, new style.Colors);
  var size = 20;

  this.create = function (x, y, color) {
    var material = new THREE.MeshLambertMaterial( { color: color } );
    var geometry = new THREE.SphereGeometry(size, size, size + size / 2);
    
    var mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.setX(size * x);
    mesh.position.setY(size * y);
    mesh.position.setZ(size / 2);
    mesh.castShadow = true;
    return mesh;
  };
};