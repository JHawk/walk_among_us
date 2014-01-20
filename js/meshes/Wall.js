var meshes = meshes || {};

meshes.Wall = function () {
  var self = this;
  self = _.extend(this, new style.Colors);

  this.create = function (x, y, color) {
    var material = new THREE.MeshLambertMaterial( { color: color } );
    var geometry = new THREE.CubeGeometry(self.size, self.size, self.size);
    var cube = new THREE.Mesh( geometry, material );
    cube.name = "wall-x:" + x + "-y:" + y;
    cube.position.setX(self.size * x);
    cube.position.setY(self.size * y);
    cube.position.setZ(self.size / 2);
    cube.castShadow = true;
    return cube;
  };
};

meshes.Wall.size = 20;