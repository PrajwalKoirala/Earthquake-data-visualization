var zoom=2;
var clat=0;
var clon=0;
var x, cx , cy, y;
var x,y;
var earthquake;
function preload(){
  mapimg=loadImage("https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,0,1,0,0/1024x512@2x?access_token=pk.eyJ1Ijoia29pcmFsYXByYWp3YWwwNyIsImEiOiJjam1nY3V6N2s3NGkwM3BvZ3cxZzNnNHB3In0.YXVQNr7tAYVu6ieRLtMBaA");
  earthquake=loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
}
function setup(){
  createCanvas(mapimg.width,mapimg.height);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  var p=mercx(179.3446)-mercx(0);
  var q=mercy(-18.4567)-mercy(0);
  fill(255,0,255);
  //ellipse(p,q,100);
  for(i=0;i<earthquake.length;i++){
    data=earthquake[i].split(/,/);
    var lon=data[2];
    var lat=data[1];
    x= mercx(lon)-mercx(0);
    y= mercy(lat)-mercy(0);
    var mag= data[4];
    var rad= sqrt(pow(10,mag));
    var d= map(rad,0,100000,0,200);
    stroke(255,0,255);
    fill(255,0,255);
    ellipse(x,y,d);
    if(mag>7){
      fill(255,0,0);
      text(data[13],x-100,y-50);
    }
  }

}

function mercx(lon){
  lon=lon* PI/180;
  return a=256/(PI) * pow(2,zoom) *(lon + PI);
}

function mercy(lat){
  lat=lat* PI/180;
  return a=512/(2 * PI) * pow(2,zoom) *(PI - log(tan(PI/4 + lat/2)));
}
