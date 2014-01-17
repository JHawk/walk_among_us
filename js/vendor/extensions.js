var camera,
    scene,
    renderer;
 
function initialize() {
  var
    grass,
    meshCanvas,
    plane,
    i, j, uvs;
 
  camera = new THREE.Camera( 3, window.innerWidth / window.innerHeight, -2000, 10000 );
  camera.projectionMatrix = THREE.Matrix4.makeOrtho( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 2000, 10000 );
  camera.position.x = 100;
  camera.position.y = 70.711; // 30 degree angle from the xz plane
  camera.position.z = 100;
 
  scene = new THREE.Scene();
 
  grass  = THREE.ImageUtils.loadTexture( "textures/grass.gif" );
  grass.wrapT = grass.wrapS = THREE.RepeatWrapping;
 
  plane = new THREE.PlaneGeometry(8, 8, 8, 8);
 
  for ( i = 0; i < plane.faceVertexUvs[ 0 ].length; i ++ ) {
 
    uvs = plane.faceVertexUvs[ 0 ][ i ];
 
    for ( j = 0; j < uvs.length; j ++ ) {
 
      uvs[ j ].u *= 8;
      uvs[ j ].v *= 8;
 
    }
  }
 
  meshCanvas = new THREE.Mesh( plane, new THREE.MeshBasicMaterial( { map: grass, wireframe: false } ));
  meshCanvas.rotation.x = -90 * Math.PI / 180;
  meshCanvas.scale.x = meshCanvas.scale.y = meshCanvas.scale.z = 100;
 
  scene.addChild( meshCanvas );
 
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
 
  document.body.appendChild(renderer.domElement);
}