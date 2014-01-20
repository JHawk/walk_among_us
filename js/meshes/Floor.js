var meshes = meshes || {};

meshes.Floor = function () {
  var self = this;
  self = _.extend(this, new style.Colors);
  
  this.create = function () {
    var material = new THREE.MeshLambertMaterial( { color: self.floor } );
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), material);
    plane.overdraw = true;
    plane.receiveShadow = true;
    plane.model = new model.Floor();
    plane.name = "Floor";
    return plane;
  };
};