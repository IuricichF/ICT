var container;
var camera, cameraTarget, scene, renderer, place;
var orbit;
var numResize;

var pointToDraw = {};
var pointSelected = {};
init();


function init() {

  container = document.getElementById('threeContainer');
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
  cameraTarget = new THREE.Vector3( 0, 0, 0 );

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x72645b, 2, 15 );


  // PLY file
  var loader = new THREE.PLYLoader();
  loader.load( './model/mesh.ply', function ( geometry ) {

    geometry.computeFaceNormals();

    var material = new THREE.MeshStandardMaterial( { color: 0x0055ff } );
    var mesh = new THREE.Mesh( geometry, material );

    var box = new THREE.Box3().setFromObject( mesh );
    numResize=0;
    while(box.size().x > 1){
      mesh.scale.multiplyScalar( 0.5 );
      box = new THREE.Box3().setFromObject( mesh );
      numResize=numResize+1;
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(0,0,0);


    var box = new THREE.Box3().setFromObject( mesh );
    //console.log( box.min, box.max, box.size() );
    scene.add( mesh );


    //the plane
    plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 40, 40 ),
      new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x101010 } )
    );
    plane.receiveShadow = true;
    plane.position.z = box.min.z-0.05;
    //scene.add( plane );

    //the camera
    orbit = new THREE.OrbitControls(camera);

    camera.position.set( box.min.x-0.8, 0.3, box.max.z+0.8);
    camera.lookAt( cameraTarget );

    //plane.rotation.x = Math.PI*3/2;

    //addShadowedLight( 1, -1, 2, 0xffffff, 1 );
    addShadowedLight( -1, 1, 2, 0xffaa00, 1 );
    //addShadowedLight( -0.5, 1, 2, 0xffffff, 1.35 );
    //addShadowedLight( 0.5, 1, 2, 0xffffff, 1.35 );

    animate();
  } );


  //  var glx = new THREE.Geometry();
  //  glx.vertices.push(new THREE.Vector3(0, 0, 0));
  //  glx.vertices.push(new THREE.Vector3(10, 0, 0));
   //
  //  var gly = new THREE.Geometry();
  //  gly.vertices.push(new THREE.Vector3(0, 0, 0));
  //  gly.vertices.push(new THREE.Vector3(0, 10, 0));
   //
  //  var glz = new THREE.Geometry();
  //  glz.vertices.push(new THREE.Vector3(0, 0, 0));
  //  glz.vertices.push(new THREE.Vector3(0, 0, 10));
   //
  //  var linex = new THREE.Line(glx, new THREE.LineBasicMaterial({color: 0xff0000}));
  //  var liney = new THREE.Line(gly, new THREE.LineBasicMaterial({color: 0x00ff00}));
  //  var linez = new THREE.Line(glz, new THREE.LineBasicMaterial({color: 0x0000ff}));
  //  scene.add(linex);
  //  scene.add(liney);
  //  scene.add(linez);

  // Lights
  scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );



  // renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( scene.fog.color );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.renderReverseSided = false;

  container.appendChild( renderer.domElement );


  // resize

  window.addEventListener( 'resize', onWindowResize, false );

}

function addShadowedLight( x, y, z, color, intensity ) {

  var directionalLight = new THREE.DirectionalLight( color, intensity );
  directionalLight.position.set( x, y, z );
  scene.add( directionalLight );

  directionalLight.castShadow = true;

  var d = 1;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;

  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  directionalLight.shadow.bias = -0.005;

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  render();


}

function render() {


  orbit.update();
  //camera.lookAt( cameraTarget );
  renderer.render( scene, camera );

}


function drawPoint(name){
  if(name in pointToDraw){
    scene.add(pointToDraw[name][0]);
    scene.add(pointToDraw[name][1]);
  }
}

function resetView(){

  for(var key in pointSelected){
    scene.add(pointSelected[key][0]);
    scene.add(pointSelected[key][1]);
  }
}

function cleanView(){
  for(var key in pointToDraw){
    scene.remove(pointToDraw[key][0]);
    scene.remove(pointToDraw[key][1]);
  }
}
