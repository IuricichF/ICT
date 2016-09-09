document.getElementById("firstGraph").innerHTML = "<div class='container'><div class='column-left'><div id='plotDiv1' ></div></div><div class='column-right'><div id='plotDiv2' ></div></div></div><div id='page'></div>"



var layout = {
autosize: false,
width: 500,
height: 500,
xaxis: {range: [0, 5]},
yaxis: {range: [0, 5]},
showlegend: false,
hovermode: 'closest',
paper_bgcolor:'rgba(0,0,0,0)'};

//------------------------HOMOLOGY H0
hx=[1,1,1];
hy=[2,4,4];

var h0 = {
  x: hx,
  y: hy,
  mode: 'markers',
  type: 'scatter',
  marker:{
    color: 'rgb(0, 0, 255)'
  }
};
var data = [h0]

var myPlot = document.getElementById('plotDiv1');
Plotly.newPlot('plotDiv1', data, layout);

hx=[3];
hy=[4];

var h1 = {
  x: hx,
  y: hy,
  mode: 'markers',
  type: 'scatter',
  marker:{
    color: 'rgb(0, 0, 255)'
  }
};

var data = [h1];
var myPlot2 = document.getElementById('plotDiv2');
Plotly.newPlot('plotDiv2', data, layout);


myPlot.on('plotly_beforehover',function(){
    return false;
});

myPlot2.on('plotly_beforehover',function(){
    return false;
});

function selectPoint(value)
{
  if(value==0){
    Plotly.Fx.hover('plotDiv1',[{pointNumber:value}]);
  }
  else if(value==1){
    Plotly.Fx.hover('plotDiv1',[{pointNumber:value}]);
  }
  else if(value==2){
    Plotly.Fx.hover('plotDiv2',[{pointNumber:0}]);
  }
  else {
    Plotly.Fx.hover('plotDiv1',[{pointNumber:3}]);
    Plotly.Fx.hover('plotDiv2',[{pointNumber:3}]);
  }

}
