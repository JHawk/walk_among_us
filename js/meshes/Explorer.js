var meshes = meshes || {};

meshes.Explorer = function () {
  var self = this;
  self = _.extend(this, new helpers.Utils);
  var size = 8;
  var height = 30;

  this.create = function (x, y, color) {
    var material = new THREE.MeshLambertMaterial( { color: color } );
    var geometry = new THREE.CylinderGeometry(5, size, height);
    
    var mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.setX(meshes.Wall.size * x);
    mesh.position.setY(meshes.Wall.size * y);
    mesh.position.setZ(height / 2);

    mesh.rotation.x = self.radians(90);

    mesh.castShadow = true;
    return mesh;
  };
};