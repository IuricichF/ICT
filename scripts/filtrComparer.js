var container;
var scene, renderer;
var orbit;

var camera;

var filtrElements = {};
var filtrInjective = [];

limitFp=0;

WINDOW_WIDTH = 1000
WINDOW_HEIGHT = 400

init();
animate();

function init() {

  container = document.getElementById('filtrContainer');
  //document.body.( container );

  camera = new THREE.PerspectiveCamera( 50, WINDOW_WIDTH / WINDOW_HEIGHT, 0.1, 100 );
  cameraTarget = new THREE.Vector3( 0, 0, 0 );

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

  var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x0055ff } );
  var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0055ff, linewidth: 8 });

  var geometry = new THREE.SphereGeometry( 0.05, 32, 32 );

  filtrElements[3]=[];
  filtrElements[12]=[];
  filtrElements[23]=[];


  //THIS IS THE ORIGINAL FILTRATION
  //---------------------------------------------------------
  //vertex [0]
  var sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-3,-1,0)
  filtrElements[3].push(sp1);

  //vertex [1]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-1.9,-1,0)
  filtrElements[3].push(sp1);

  //vertex [2]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-1,-1,0)
  filtrElements[3].push(sp1);

  //vertex [3]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-3,0,0)
  filtrElements[12].push(sp1);

  //edge [0,3]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
  	new THREE.Vector3( -3, -1, 0 ),
  	new THREE.Vector3( -3, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[12].push(line);

  //vertex [4]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-2.1,0,0)
  filtrElements[12].push(sp1);

  //edge [3,4]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
  	new THREE.Vector3( -3, 0, 0 ),
  	new THREE.Vector3( -2.1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[12].push(line);

  //vertex [5]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-1.9,0,0)
  filtrElements[12].push(sp1);

  //edge [1,5]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -1.9, -1, 0 ),
    new THREE.Vector3( -1.9, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[12].push(line);

  //vertex [6]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-1,0,0)
  filtrElements[12].push(sp1);

  //edge [2,6]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -1, -1, 0 ),
    new THREE.Vector3( -1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[12].push(line);

  //edge [5,6]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -1.9, 0, 0 ),
    new THREE.Vector3( -1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[12].push(line);

  //vertex [7]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-3,1,0)
  filtrElements[23].push(sp1);

  //edge [3,7]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -3, 1, 0 ),
    new THREE.Vector3( -3, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[23].push(line);

  //vertex [8]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-2.1,1,0)
  filtrElements[23].push(sp1);

  //edge [4,8]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -2.1, 1, 0 ),
    new THREE.Vector3( -2.1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[23].push(line);

  //edge [3,8]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -2.1, 1, 0 ),
    new THREE.Vector3( -3, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[23].push(line);

  //edge [7,8]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -2.1, 1, 0 ),
    new THREE.Vector3( -3, 1, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[23].push(line);


  //edge [3,7,8]
  var triGeom = new THREE.Geometry();
  triGeom.vertices.push(
    new THREE.Vector3( -2.1, 1, 0 ),
    new THREE.Vector3( -3, 1, 0 ),
    new THREE.Vector3( -3, 0, 0  )
  );
  triGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
  triGeom.computeFaceNormals();

  var mesh= new THREE.Mesh( triGeom, lineMaterial );
  filtrElements[23].push(mesh);

  //vertex [9]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-1.9,1,0)
  filtrElements[23].push(sp1);

  //edge [5,9]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -1.9, 1, 0 ),
    new THREE.Vector3( -1.9, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[23].push(line);

  //vertex [10]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(-1,1,0)
  filtrElements[23].push(sp1);

  //edge [6,10]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( -1, 1, 0 ),
    new THREE.Vector3( -1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrElements[23].push(line);



  //THIS IS THE INJECTIVE FILTRATION
  //---------------------------------------------------------
  //vertex [0]
  var sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(1,-1,0)
  filtrInjective.push(sp1);

  //vertex [1]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(2.1,-1,0)
  filtrInjective.push(sp1);

  //vertex [12]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(3,-1,0)
  filtrInjective.push(sp1);

  //vertex [23]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(1,0,0)
  filtrInjective.push(sp1);

  //vertex [4]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(1.9,0,0)
  filtrInjective.push(sp1);

  //vertex [5]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set( 2.1,0,0)
  filtrInjective.push(sp1);

  //vertex [6]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set( 3,0,0)
  filtrInjective.push(sp1);

  //edge [0,3]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
  	new THREE.Vector3( 1, -1, 0 ),
  	new THREE.Vector3( 1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);


  //edge [1,5]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 2.1, -1, 0 ),
    new THREE.Vector3( 2.1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //edge [2,6]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 3, -1, 0 ),
    new THREE.Vector3( 3, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //edge [3,4]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
  	new THREE.Vector3( 1, 0, 0 ),
  	new THREE.Vector3( 1.9, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);


  //edge [5,6]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 2.1, 0, 0 ),
    new THREE.Vector3( 3, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //vertex [7]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set(1,1,0)
  filtrInjective.push(sp1);

  //vertex [8]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set( 1.9,1,0)
  filtrInjective.push(sp1);

  //vertex [9]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set( 2.1,1,0)
  filtrInjective.push(sp1);

  //vertex [10]
  sp1 = new THREE.Mesh( geometry, sphereMaterial );
  sp1.position.set( 3,1,0)
  filtrInjective.push(sp1);

  //edge [3,7]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 1, 1, 0 ),
    new THREE.Vector3( 1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //edge [3,8]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 1.9, 1, 0 ),
    new THREE.Vector3( 1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //edge [4,8]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 1.9, 1, 0 ),
    new THREE.Vector3( 1.9, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //edge [5,9]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 2.1, 1, 0 ),
    new THREE.Vector3( 2.1, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //edge [6,10]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 3, 1, 0 ),
    new THREE.Vector3( 3, 0, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //edge [7,8]
  var lineGeom = new THREE.Geometry();
  lineGeom.vertices.push(
    new THREE.Vector3( 1.9, 1, 0 ),
    new THREE.Vector3( 1, 1, 0 )
  );
  var line = new THREE.Line( lineGeom, lineMaterial );
  filtrInjective.push(line);

  //edge [3,7,8]
  var triGeom = new THREE.Geometry();
  triGeom.vertices.push(
    new THREE.Vector3( 1.9, 1, 0 ),
    new THREE.Vector3( 1, 1, 0 ),
    new THREE.Vector3( 1, 0, 0  )
  );
  triGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
  triGeom.computeFaceNormals();

  var mesh= new THREE.Mesh( triGeom, lineMaterial );
  filtrInjective.push(mesh);

  //orbit = new THREE.OrbitControls(camera);

  camera.position.set( 0, 3, 3);
  camera.lookAt( cameraTarget );

  scene.rotation.x = Math.PI*3/2;

  addShadowedLight( 1, -1, 2, 0xffffff, 1 );
  addShadowedLight( -1, 1, 2, 0xffaa00, 1 );
  addShadowedLight( -0.5, 1, 2, 0xffffff, 1.35 );
  addShadowedLight( 0.5, 1, 2, 0xffffff, 1.35 );

  var dir = new THREE.Vector3( 0, 1, 0 );
  var origin = new THREE.Vector3( 0, -1, 0 );
  var length = 3;
  var hex = 0xff0000;
  var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
  scene.add( arrowHelper );

  // Lights
  scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );


  // renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( WINDOW_WIDTH, WINDOW_HEIGHT );

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

  camera.aspect = WINDOW_WIDTH / WINDOW_HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize( WINDOW_WIDTH, WINDOW_HEIGHT );

}

function animate() {

  requestAnimationFrame( animate );

  render();
}

function render() {

  drawFiltrationLevel();

  //orbit.update();
  //camera.lookAt( cameraTarget );
  renderer.render( scene, camera );

}

function drawFiltrationLevel(){

  for(var key in filtrElements){
      for(var i=0; i < filtrElements[key].length; i++){
        if( parseInt(key) <= limitFp)
          scene.add(filtrElements[key][i])
        else
          scene.remove(filtrElements[key][i])
      }
  }

  for(var i=0; i<filtrInjective.length; i++){
    if( i+1 <= limitFp)
      scene.add(filtrInjective[i])
    else
      scene.remove(filtrInjective[i])
  }

}

function outputUpdate(filtr) {
  if(filtr < 3)
    limitF = 0;
  if(filtr >= 3 && filtr < 12)
	 limitF = 1;
  if(filtr >= 12 && filtr < 23)
   limitF = 2;
  if(filtr >= 23)
   limitF = 3;

  limitFp = filtr;

  document.querySelector('.functionValues').innerHTML = 'Original function value= '+limitF+'<br />Injective function value= '+limitFp;
}
