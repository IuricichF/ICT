
document.getElementById("secondGraph").innerHTML = "<div class='container'><div class='column-left'><div id='plotDiv2' ></div></div><div class='column-right'><div id='threeContainer2'></div></div></div><div id='page'></div>"

drawPersistenceDiagramClean()


function drawPersistenceDiagramClean(){

  var container;
  var scene, renderer;
  var orbit;

  var barChartH0 = [];
  var barChartH1 = [];

  var pointToDraw = [];
  var pointSelected= [];

  var filtrInjective = [];

  var cube1,cube2,cube3;

  WINDOW_WIDTH2 = 400
  WINDOW_HEIGHT2 = 400

  var camera = new THREE.PerspectiveCamera( 50, WINDOW_WIDTH2 / WINDOW_HEIGHT2, 0.1, 100 );

  init();
  animate();

  function init() {

    container = document.getElementById('threeContainer2');
    //document.body.( container );

    cameraTarget = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

    var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x0055ff } );
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0055ff, linewidth: 8 });

    var geometry = new THREE.SphereGeometry( 0.05, 32, 32 );


    //THIS IS THE INJECTIVE FILTRATION
    //---------------------------------------------------------
    //vertex [0]
    var sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,-1,0)
    filtrInjective.push(sp1);

    //vertex [1]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(0.1,-1,0)
    filtrInjective.push(sp1);

    //vertex [2]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(1,-1,0)
    filtrInjective.push(sp1);

    //vertex [3]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,0,0)
    filtrInjective.push(sp1);

    //vertex [4]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-0.1,0,0)
    filtrInjective.push(sp1);

    //vertex [5]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( 0.1,0,0)
    filtrInjective.push(sp1);

    //vertex [6]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( 1,0,0)
    filtrInjective.push(sp1);

    //edge [0,3]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
    	new THREE.Vector3( -1, -1, 0 ),
    	new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);


    //edge [1,5]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, -1, 0 ),
      new THREE.Vector3( 0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //edge [2,6]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 1, -1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //edge [3,4]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
    	new THREE.Vector3( -1, 0, 0 ),
    	new THREE.Vector3( -0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);


    //edge [5,6]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, 0, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //vertex [7]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,1,0)
    filtrInjective.push(sp1);

    //vertex [8]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( -0.1,1,0)
    filtrInjective.push(sp1);

    //vertex [9]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( 0.1,1,0)
    filtrInjective.push(sp1);

    //vertex [10]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( 1,1,0)
    filtrInjective.push(sp1);

    //edge [3,7]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //edge [3,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //edge [4,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //edge [5,9]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, 1, 0 ),
      new THREE.Vector3( 0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //edge [6,10]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 1, 1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //edge [7,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 1, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective.push(line);

    //edge [3,7,8]
    var triGeom = new THREE.Geometry();
    triGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0  )
    );
    triGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    triGeom.computeFaceNormals();


    barChartH0 = [1,2,1,-1,0,0.55,0,0];

    barChartH1 =[];

    //------------------------HOMOLOGY H0
    hx=[];
    hy=[];

    for(var i = 0; i < barChartH0.length; i=i+8){
      console.log()
      hx[i]=barChartH0[i];
      hy[i]=barChartH0[i+1];

      name = ""+hx[i]+" "+hy[i]
      var geometry = new THREE.SphereGeometry( 0.08, 32, 32 );
      var material1 = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
      var material2 = new THREE.MeshStandardMaterial( {color: 0xff0000} );
      var material3 = new THREE.MeshStandardMaterial( {color: 0x0000ff} );

      var sp1 = new THREE.Mesh( geometry, material1 );
      sp1.position.set(barChartH0[i+2],barChartH0[i+3],barChartH0[i+4]);
      var sp2 = new THREE.Mesh( geometry, material2 );
      sp2.position.set(barChartH0[i+5],barChartH0[i+6],barChartH0[i+7]);

      var geometry = new THREE.BoxGeometry( 0.1,0.1,0.1 );
      cube1 = new THREE.Mesh( geometry, material3 );
      cube1.position.set(-1,-1,0)

      var geometry = new THREE.BoxGeometry( 0.1,0.1,0.1 );
      cube2 = new THREE.Mesh( geometry, material3 );
      cube2.position.set(0.1,-1,0)

      pointToDraw[name] = [sp1,sp2];
      pointSelected[name] = [sp1,sp2];
    }

    var h0 = {
      x: hx,
      y: hy,
      mode: 'markers',
      type: 'scatter',
      name: "H0",
      marker:{
        color: 'rgb(0, 0, 255)'
      }
    };

    var material1 = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    var geometry = new THREE.BoxGeometry( 0.1,0.1,0.1 );
    cube3 = new THREE.Mesh( geometry, material1 );
    cube3.position.set(-0.1,0.5,0);
    //------------------------HOMOLOGY H1
    h1x=[];
    h1y=[];

    for(var i = 0; i < barChartH1.length; i=i+8){
      h1x[i]=barChartH1[i];
      h1y[i]=barChartH1[i+1];

      name = ""+h1x[i]+" "+h1y[i]
      var geometry = new THREE.SphereGeometry( 0.08, 32, 32 );

      var material2 = new THREE.MeshStandardMaterial( {color: 0xff0000} );
      var sp1 = new THREE.Mesh( geometry, material1 );
      sp1.position.set(barChartH1[i+2],barChartH1[i+3],barChartH1[i+4]);
      var sp2 = new THREE.Mesh( geometry, material2 );
      sp2.position.set(barChartH1[i+5],barChartH1[i+6],barChartH1[i+7]);



      pointToDraw[name] = [sp1,sp2];
      pointSelected[name] = [sp1,sp2];
    }

    var h1 = {
      x: h1x,
      y: h1y,
      mode: 'markers',
      type: 'scatter',
      name: "H1",
      marker:{
        color: 'rgb(0, 0, 255)'
      }
    };

    var data = [h0,h1];

    var layout = {
    autosize: false,
    width: 500,
    height: 500,
    xaxis: {range: [0, 3]},
    yaxis: {range: [0, 3]},
    showlegend: false,
    hovermode: 'closest',
    paper_bgcolor:'rgba(0,0,0,0)'};

    var myPlot2 = document.getElementById('plotDiv2');

    Plotly.newPlot('plotDiv2', data, layout);

    myPlot2.on('plotly_hover', function(data){

      scene.remove(cube1);
      scene.remove(cube2);
      scene.remove(cube3);

      data.points.map(function(d){
        cleanView();
        var name = d.x+" "+d.y
        drawPoint(name,d.y);
      });
    }).on('plotly_unhover', function(data){
      //hoverInfo.innerHTML = '';
      cleanView();
      resetView();

      scene.add(cube1);
      scene.add(cube2);
      scene.add(cube3);

    }).on('plotly_selected', function(dataIn) {
      cleanView();
      pointSelected = {};

      scene.remove(cube1);
      scene.remove(cube2);
      scene.remove(cube3);

      if(dataIn == undefined){
        pointSelected = pointToDraw;
      }
      else{
        var max=0;
        dataIn.points.forEach(function(d) {
          if(d.x != false){
            var name = d.x+" "+d.y;
            pointSelected[name] = [pointToDraw[name][0],pointToDraw[name][1]];
            if(d.y>max)
              max=d.y
            drawPoint(name,max);
          }
        });
      }
  });



    var mesh= new THREE.Mesh( triGeom, lineMaterial );
    filtrInjective.push(mesh);

    //orbit = new THREE.OrbitControls(camera);

    camera.position.set( 0, 3, 3);
    camera.lookAt( cameraTarget );

    scene.rotation.x = Math.PI*3/2;

    addShadowedLight2( 1, -1, 2, 0xffffff, 1 );
    addShadowedLight2( -1, 1, 2, 0xffaa00, 1 );
    addShadowedLight2( -0.5, 1, 2, 0xffffff, 1.35 );
    addShadowedLight2( 0.5, 1, 2, 0xffffff, 1.35 );


    // Lights
    scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );


    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WINDOW_WIDTH2, WINDOW_HEIGHT2 );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;

    container.appendChild( renderer.domElement );

    // resize
    window.addEventListener( 'resize', onWindowResize, false );

  }

  function addShadowedLight2( x, y, z, color, intensity ) {

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

    camera.aspect = WINDOW_WIDTH2 / WINDOW_HEIGHT2;
    camera.updateProjectionMatrix();

    renderer.setSize( WINDOW_WIDTH2, WINDOW_HEIGHT2 );

  }

  function animate() {

    requestAnimationFrame( animate );

    render();
  }

  function render() {


    //orbit.update();
    //camera.lookAt( cameraTarget );
    renderer.render( scene, camera );

  }

  function drawFiltration(val){

    for(var i=0; i<filtrInjective.length; i++)
      if(val > i)
        scene.add(filtrInjective[i])
      else
        scene.remove(filtrInjective[i])
  }

  function drawPoint(name,y){

    if(name in pointToDraw){
      scene.add(pointToDraw[name][0]);
      scene.add(pointToDraw[name][1]);
    }

    drawFiltration(12);
  }

  function resetView(){
    for(var key in pointSelected){
      scene.add(pointSelected[key][0]);
      scene.add(pointSelected[key][1]);
    }
    // drawFiltration(23);
  }

  function cleanView(){

    for(var key in pointToDraw){
      scene.remove(pointToDraw[key][0]);
      scene.remove(pointToDraw[key][1]);
    }
    drawFiltration(23);
  }

}
