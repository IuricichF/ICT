var tHoles =-1;

drawHoles();

function drawHoles(){

  var container;
  var camera, cameraTarget, scene, renderer, place;
  var orbit;

  var simpl0 = [];
  var simpl1 = [];
  var simpl2 =[];



  WINDOW_WIDTH = 400
  WINDOW_HEIGHT = 400

  init();
  animate();

  function init() {

    container = document.getElementById('simplComplHoles');
    //document.body.( container );

    camera = new THREE.PerspectiveCamera( 45, WINDOW_WIDTH / WINDOW_HEIGHT, 0.1, 100 );
    cameraTarget = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

    var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x0000ff } );
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 8 });

    var geometry = new THREE.SphereGeometry( 0.05, 32, 32 );

    //vertex [0]
    var sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,-1,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //vertex [1]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(0.1,-1,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //vertex [2]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(1,-1,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //vertex [3]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,0,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //edge [0,3]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
    	new THREE.Vector3( -1, -1, 0 ),
    	new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //vertex [4]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-0.1,0,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //edge [3,4]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
    	new THREE.Vector3( -1, 0, 0 ),
    	new THREE.Vector3( -0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //vertex [5]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(0.1,0,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //edge [1,5]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, -1, 0 ),
      new THREE.Vector3( 0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //vertex [6]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(1,0,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //edge [2,6]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 1, -1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //edge [5,6]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, 0, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //vertex [7]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,1,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //edge [3,7]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //vertex [8]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-0.1,1,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //edge [4,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //edge [3,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //edge [7,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 1, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);


    //edge [3,7,8]
    var triGeom = new THREE.Geometry();
    triGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0  )
    );
    triGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    triGeom.computeFaceNormals();
    var triMaterial = new THREE.MeshStandardMaterial( { color: 0x0000ff } );

    var mesh= new THREE.Mesh( triGeom, triMaterial );
    //scene.add(mesh);
    simpl2.push(mesh);

    //vertex [9]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(0.1,1,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //edge [5,9]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, 1, 0 ),
      new THREE.Vector3( 0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);

    //vertex [10]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(1,1,0)
    //scene.add(sp1);
    simpl0.push(sp1);

    //edge [6,10]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 1, 1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    //scene.add( line );
    simpl1.push(line);





    //orbit = new THREE.OrbitControls(camera);

    camera.position.set( 0, 3, 3);
    camera.lookAt( cameraTarget );

    scene.rotation.x = Math.PI*3/2;

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
    drawSimplices();
    renderer.render( scene, camera );

  }

  function drawSimplices(){

    if(tHoles == -1){
      for(var i=0; i<simpl0.length; i++){
        scene.add(simpl0[i])
      }
      for(var i=0; i<simpl1.length; i++){
        scene.add(simpl1[i])
      }
      for(var i=0; i<simpl2.length; i++){
        scene.add(simpl2[i])
      }
    }
    else{
      clearScene();
      if(tHoles==0){
        scene.add(simpl0[0])
        scene.add(simpl0[1])
      }
      else{
        scene.add(simpl1[7])
        scene.add(simpl1[1])
        scene.add(simpl1[6])
      }
    }
  }

  function clearScene(){
    for(var i=0; i<simpl0.length; i++){
      scene.remove(simpl0[i])
    }
    for(var i=0; i<simpl1.length; i++){
      scene.remove(simpl1[i])
    }
    for(var i=0; i<simpl2.length; i++){
      scene.remove(simpl2[i])
    }
  }
}

function overFunction2(input) {
  tHoles=input;
}
