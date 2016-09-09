Plotly.d3.json('model/pairs.json', function(jsonData) {
  var ppairs = jsonData.pairs;

  barChartH0 = ppairs[0].h0;
  barChartH1 = ppairs[1].h1;

  var myPlot = document.getElementById('plotDiv');
  hoverInfo = document.getElementById('hoverinfo');

  var resize = (Math.pow(2,numResize))

  //------------------------HOMOLOGY H0
  hx=[];
  hy=[];

  for(var i = 0; i < barChartH0.length; i=i+8){
    hx[i]=barChartH0[i];
    hy[i]=barChartH0[i+1];

    name = ""+hx[i]+" "+hy[i]
    var geometry = new THREE.SphereGeometry( 0.005, 32, 32 );
    var material1 = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );


    var sp1 = new THREE.Mesh( geometry, material1 );
    sp1.position.set(barChartH0[i+2]/resize,barChartH0[i+3]/resize,barChartH0[i+4]/resize);
    var sp2 = new THREE.Mesh( geometry, material2 );
    sp2.position.set(barChartH0[i+5]/resize,barChartH0[i+6]/resize,barChartH0[i+7]/resize);


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
    var geometry = new THREE.SphereGeometry( 0.005, 32, 32 );
    var material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var material2 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var sp1 = new THREE.Mesh( geometry, material1 );
    sp1.position.set(barChartH1[i+2]/resize,barChartH1[i+3]/resize,barChartH1[i+4]/resize);
    var sp2 = new THREE.Mesh( geometry, material2 );
    sp2.position.set(barChartH1[i+5]/resize,barChartH1[i+6]/resize,barChartH1[i+7]/resize);

    pointToDraw[name] = [sp1,sp2];
    pointSelected[name] = [sp1,sp2];
    //pointToDraw[h1y[i]] = sp2;
  }

  var h1 = {
    x: h1x,
    y: h1y,
    mode: 'markers',
    type: 'scatter',
    name: "H1",
    marker:{
      color: 'rgb(255, 0, 0)'
    }
  };

  var data = [h0,h1];

  var layout = {
  autosize: false,
  width: 400,
  height: 400,
  paper_bgcolor:'rgba(0,0,0,0)'};

  Plotly.newPlot('plotDiv', data, layout);

  myPlot.on('plotly_hover', function(data){

    data.points.map(function(d){
      cleanView();
      var name = d.x+" "+d.y
      drawPoint(name);
    });
  }).on('plotly_unhover', function(data){
    //hoverInfo.innerHTML = '';
    cleanView();
    resetView();

  }).on('plotly_selected', function(dataIn) {
    cleanView();
    pointSelected = {};

    if(dataIn == undefined){
      pointSelected = pointToDraw;
    }
    else{
      dataIn.points.forEach(function(d) {
        if(d.x != false){
          var name = d.x+" "+d.y;
          pointSelected[name] = [pointToDraw[name][0],pointToDraw[name][1]];
          drawPoint(name);
        }
      });
    }
});


});
