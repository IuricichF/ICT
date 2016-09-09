document.getElementById("firstGraph").innerHTML = "<div class='container'><div class='column-left'><div id='plotDiv' ></div></div><div class='column-right'><div id='threeContainer'></div></div></div><div id='page'></div>"

drawPersistenceDiagram()

function drawPersistenceDiagram(){

  var container2;
  var scene2, renderer2;
  var orbit;

  var barChartH0 = [];
  var barChartH1 = [];

  var pointToDraw = [];
  var pointSelected= [];

  var filtrInjective2 = [];

  var cube1,cube2,cube3;

  WINDOW_WIDTH2 = 400
  WINDOW_HEIGHT2 = 400

  var camera2 = new THREE.PerspectiveCamera( 50, WINDOW_WIDTH2 / WINDOW_HEIGHT2, 0.1, 100 );

  init2();
  animate2();

  function init2() {

    container2 = document.getElementById('threeContainer');
    //document.body.( container2 );

    cameraTarget = new THREE.Vector3( 0, 0, 0 );

    scene2 = new THREE.Scene();
    scene2.fog = new THREE.Fog( 0x72645b, 2, 15 );

    var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x0055ff } );
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0055ff, linewidth: 8 });

    var geometry = new THREE.SphereGeometry( 0.05, 32, 32 );


    //THIS IS THE INJECTIVE FILTRATION
    //---------------------------------------------------------
    //vertex [0]
    var sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,-1,0)
    filtrInjective2.push(sp1);

    //vertex [1]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(0.1,-1,0)
    filtrInjective2.push(sp1);

    //vertex [2]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(1,-1,0)
    filtrInjective2.push(sp1);

    //vertex [3]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,0,0)
    filtrInjective2.push(sp1);

    //vertex [4]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-0.1,0,0)
    filtrInjective2.push(sp1);

    //vertex [5]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( 0.1,0,0)
    filtrInjective2.push(sp1);

    //vertex [6]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( 1,0,0)
    filtrInjective2.push(sp1);

    //edge [0,3]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
    	new THREE.Vector3( -1, -1, 0 ),
    	new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);


    //edge [1,5]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, -1, 0 ),
      new THREE.Vector3( 0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //edge [2,6]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 1, -1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //edge [3,4]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
    	new THREE.Vector3( -1, 0, 0 ),
    	new THREE.Vector3( -0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);


    //edge [5,6]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, 0, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //vertex [7]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set(-1,1,0)
    filtrInjective2.push(sp1);

    //vertex [8]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( -0.1,1,0)
    filtrInjective2.push(sp1);

    //vertex [9]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( 0.1,1,0)
    filtrInjective2.push(sp1);

    //vertex [10]
    sp1 = new THREE.Mesh( geometry, sphereMaterial );
    sp1.position.set( 1,1,0)
    filtrInjective2.push(sp1);

    //edge [3,7]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //edge [3,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //edge [4,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //edge [5,9]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 0.1, 1, 0 ),
      new THREE.Vector3( 0.1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //edge [6,10]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( 1, 1, 0 ),
      new THREE.Vector3( 1, 0, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //edge [7,8]
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 1, 0 )
    );
    var line = new THREE.Line( lineGeom, lineMaterial );
    filtrInjective2.push(line);

    //edge [3,7,8]
    var triGeom = new THREE.Geometry();
    triGeom.vertices.push(
      new THREE.Vector3( -0.1, 1, 0 ),
      new THREE.Vector3( -1, 1, 0 ),
      new THREE.Vector3( -1, 0, 0  )
    );
    triGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    triGeom.computeFaceNormals();


    barChartH0 = [2,12,1,-1,0,0.55,0,0,
                  4,8,-1,0,0,-1,-0.55,0,
                  5,11,-0.1,0,0,-0.55,0,0,
                  6,9,0.1,0,0,0.1,-0.5,0,
                  7,10,1,0,0,1,-0.5,0,
                  13,17,-1,1,0,-1,0.5,0,
                  14,18,-0.1,1,0,-0.55,0.5,0,
                  15,20,0.1,1,0,0.1,0.5,0,
                  16,21,1,1,0,1,0.5,0];

    barChartH1 =[22,23,-0.55,1,0,-0.7,0.66,0];

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

    //------------------------HOMOLOGY H1
    h1x=[];
    h1y=[];

    for(var i = 0; i < barChartH1.length; i=i+8){
      h1x[i]=barChartH1[i];
      h1y[i]=barChartH1[i+1];

      name = ""+h1x[i]+" "+h1y[i]
      var geometry = new THREE.SphereGeometry( 0.08, 32, 32 );
      var material1 = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
      var material2 = new THREE.MeshStandardMaterial( {color: 0xff0000} );
      var sp1 = new THREE.Mesh( geometry, material1 );
      sp1.position.set(barChartH1[i+2],barChartH1[i+3],barChartH1[i+4]);
      var sp2 = new THREE.Mesh( geometry, material2 );
      sp2.position.set(barChartH1[i+5],barChartH1[i+6],barChartH1[i+7]);

      var geometry = new THREE.BoxGeometry( 0.1,0.1,0.1 );
      cube3 = new THREE.Mesh( geometry, material1 );
      cube3.position.set(-0.1,0.5,0)

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
    xaxis: {range: [0, 25]},
    yaxis: {range: [0, 25]},
    showlegend: false,
    hovermode: 'closest',
    paper_bgcolor:'rgba(0,0,0,0)'};

    var myPlot = document.getElementById('plotDiv');

    Plotly.newPlot('plotDiv', data, layout);

    myPlot.on('plotly_hover', function(data){

      scene2.remove(cube1);
      scene2.remove(cube2);
      scene2.remove(cube3);

      data.points.map(function(d){
        cleanView();
        var name = d.x+" "+d.y
        drawPoint(name,d.y);
      });
    }).on('plotly_unhover', function(data){
      //hoverInfo.innerHTML = '';
      cleanView();
      resetView();

      scene2.add(cube1);
      scene2.add(cube2);
      scene2.add(cube3);

    }).on('plotly_selected', function(dataIn) {
      cleanView();
      pointSelected = {};

      scene2.remove(cube1);
      scene2.remove(cube2);
      scene2.remove(cube3);

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
    filtrInjective2.push(mesh);

    //orbit = new THREE.OrbitControls(camera);

    camera2.position.set( 0, 3, 3);
    camera2.lookAt( cameraTarget );

    scene2.rotation.x = Math.PI*3/2;

    addShadowedLight2( 1, -1, 2, 0xffffff, 1 );
    addShadowedLight2( -1, 1, 2, 0xffaa00, 1 );
    addShadowedLight2( -0.5, 1, 2, 0xffffff, 1.35 );
    addShadowedLight2( 0.5, 1, 2, 0xffffff, 1.35 );


    // Lights
    scene2.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );


    // renderer2
    renderer2 = new THREE.WebGLRenderer( { antialias: true } );
    renderer2.setClearColor( 0xffffff );
    renderer2.setPixelRatio( window.devicePixelRatio );
    renderer2.setSize( WINDOW_WIDTH2, WINDOW_HEIGHT2 );

    renderer2.gammaInput = true;
    renderer2.gammaOutput = true;

    renderer2.shadowMap.enabled = true;
    renderer2.shadowMap.renderReverseSided = false;

    container2.appendChild( renderer2.domElement );

    // resize
    window.addEventListener( 'resize', onWindowResize, false );

  }

  function addShadowedLight2( x, y, z, color, intensity ) {

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

    camera2.aspect = WINDOW_WIDTH2 / WINDOW_HEIGHT2;
    camera2.updateProjectionMatrix();

    renderer2.setSize( WINDOW_WIDTH2, WINDOW_HEIGHT2 );

  }

  function animate2() {

    requestAnimationFrame( animate2 );

    render2();
  }

  function render2() {


    //orbit.update();
    //camera.lookAt( cameraTarget );
    renderer2.render( scene2, camera2 );

  }

  function drawFiltration(val){

    for(var i=0; i<filtrInjective2.length; i++)
      if(val > i)
        scene2.add(filtrInjective2[i])
      else
        scene2.remove(filtrInjective2[i])
  }

  function drawPoint(name,y){

    if(name in pointToDraw){
      scene2.add(pointToDraw[name][0]);
      scene2.add(pointToDraw[name][1]);
    }

    drawFiltration(y);
  }

  function resetView(){
    for(var key in pointSelected){
      scene2.add(pointSelected[key][0]);
      scene2.add(pointSelected[key][1]);
    }
    // drawFiltration(23);
  }

  function cleanView(){

    for(var key in pointToDraw){
      scene2.remove(pointToDraw[key][0]);
      scene2.remove(pointToDraw[key][1]);
    }
    drawFiltration(23);
  }

}
