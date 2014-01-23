var meshes = meshes || {};

meshes.Utils = {};

meshes.Utils.collision = function (mesh, meshes) {
  var origin = mesh.position.clone();
  for (var vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++)
  {   
    var localVertex = mesh.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4( mesh.matrix );
    var directionVector = globalVertex.sub( mesh.position );
    
    var ray = new THREE.Raycaster( origin, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( meshes );
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length())
    {
      return true;
    }
  }
}