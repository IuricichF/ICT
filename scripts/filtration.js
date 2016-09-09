var limitF=0;

initFiltration()

function initFiltration(){

  var container2;
  var scene2, renderer2;
  var orbit;

  var filtrElements = {};
  filtrElements[0]=[];
  filtrElements[1]=[];
  filtrElements[2]=[];


  WINDOW_WIDTH = 400
  WINDOW_HEIGHT = 400

  init();
  animate2();

  function init() {

    container2 = document.getElementById('filtrContainer');
    //document.body.( container );

    camera = new THREE.PerspectiveCamera( 45, WINDOW_WIDTH / WINDOW_HEIGHT, 0.1, 100 );
    cameraTarget = new THREE.Vector3( 0, 0, 0 );

    scene2 = new THREE.Scene();
    scene2.fog = new THREE.Fog( 0x72645b, 2, 15 );

    var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x0055ff } );
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0055ff, linewidth: 8 });

    var geometry = new THREE.SphereGeometry( 0.05, 32, 32 );

    //THIS IS THE ORIGINAL FILTRATION
    //---------------------------------------------------------
    //vertex [0]
    var sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,-1,0)
    filtrElements[0].push(sp1);

    //vertex [1]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(0.1,-1,0)
    filtrElements[0].push(sp1);

    //vertex [2]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(1,-1,0)
    filtrElements[0].push(sp1);

    //vertex [3]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,0,0)
    filtrElements[1].push(sp1);

    //edge [0,3]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
    	new THREE.Vector3( -1, -1, 0 ),
    	new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[1].push(line);

    //vertex [4]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-0.1,0,0)
    filtrElements[1].push(sp1);

    //edge [3,4]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
    	new THREE.Vector3( -1, 0, 0 ),
    	new THREE.Vector3( -0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[1].push(line);

    //vertex [5]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(0.1,0,0)
    filtrElements[1].push(sp1);

    //edge [1,5]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, -1, 0 ),
      new THREE.Vector3( 0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[1].push(line);

    //vertex [6]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(1,0,0)
    filtrElements[1].push(sp1);

    //edge [2,6]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 1, -1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[1].push(line);

    //edge [5,6]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, 0, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[1].push(line);

    //vertex [7]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,1,0)
    filtrElements[2].push(sp1);

    //edge [3,7]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[2].push(line);

    //vertex [8]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-0.1,1,0)
    filtrElements[2].push(sp1);

    //edge [4,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[2].push(line);

    //edge [3,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[2].push(line);

    //edge [7,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 1, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[2].push(line);


    //edge [3,7,8]
    var triGeom = new THREE.Geometry();
    triGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0  )
    );
    triGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    triGeom.computeFaceNormals();

    var mesh= new THREE.Mesh( triGeom, lineMaterial );
    filtrElements[2].push(mesh);

    //vertex [9]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(0.1,1,0)
    filtrElements[2].push(sp1);

    //edge [5,9]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, 1, 0 ),
      new THREE.Vector3( 0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[2].push(line);

    //vertex [10]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(1,1,0)
    filtrElements[2].push(sp1);

    //edge [6,10]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 1, 1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrElements[2].push(line);





    //orbit = new THREE.OrbitControls(camera);

    camera.position.set( 0, 3, 3);
    camera.lookAt( cameraTarget );

    scene2.rotation.x = Math.PI*3/2;

    addShadowedLight( 1, -1, 2, 0xffffff, 1 );
    addShadowedLight( -1, 1, 2, 0xffaa00, 1 );
    addShadowedLight( -0.5, 1, 2, 0xffffff, 1.35 );
    addShadowedLight( 0.5, 1, 2, 0xffffff, 1.35 );


   // var glx = new THREE.Geometry();
   // glx.vertices.push(new THREE.Vector3(0, 0, 0));
   // glx.vertices.push(new THREE.Vector3(10, 0, 0));
   //
   // var gly = new THREE.Geometry();
   // gly.vertices.push(new THREE.Vector3(0, 0, 0));
   // gly.vertices.push(new THREE.Vector3(0, 10, 0));
   //
   // var glz = new THREE.Geometry();
   // glz.vertices.push(new THREE.Vector3(0, 0, 0));
   // glz.vertices.push(new THREE.Vector3(0, 0, 10));
   //
   // var linex = new THREE.Line(glx, new THREE.LineBasicMaterial({color: 0xff0000}));
   // var liney = new THREE.Line(gly, new THREE.LineBasicMaterial({color: 0x00ff00}));
   // var linez = new THREE.Line(glz, new THREE.LineBasicMaterial({color: 0x0000ff}));
   // scene.add(linex);
   // scene.add(liney);
   // scene.add(linez);

    // Lights
    scene2.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );


    // renderer
    renderer2 = new THREE.WebGLRenderer( { antialias: true } );
    renderer2.setClearColor( 0xffffff );
    renderer2.setPixelRatio( window.devicePixelRatio );
    renderer2.setSize( WINDOW_WIDTH, WINDOW_HEIGHT );

    renderer2.gammaInput = true;
    renderer2.gammaOutput = true;

    renderer2.shadowMap.enabled = true;
    renderer2.shadowMap.renderReverseSided = false;

    container2.appendChild( renderer2.domElement );

    // resize
    window.addEventListener( 'resize', onWindowResize, false );

  }

  function addShadowedLight( x, y, z, color, intensity ) {

    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene2.add( directionalLight );

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

    renderer2.setSize( WINDOW_WIDTH, WINDOW_HEIGHT );

  }

  function animate2() {

    requestAnimationFrame( animate2 );

    render2();
  }

  function render2() {

    drawFiltration();

    //orbit.update();
    //camera.lookAt( cameraTarget );
    renderer2.render( scene2, camera );

  }

  function drawFiltration(){

    for(var key in filtrElements){

      if(parseInt(key) < limitF){
        for(var i=0; i<filtrElements[key].length; i++){
          scene2.add(filtrElements[key][i])
        }
      }
      else{
        for(var i=0; i<filtrElements[key].length; i++){
          scene2.remove(filtrElements[key][i])
        }
      }

    }

  }

}


function outputUpdate(filtr) {
	limitF = filtr;

  document.querySelector('.functionValues').innerHTML = 'Function value for the filtering function: '+limitF;
}
