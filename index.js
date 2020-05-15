const express = require('express');
var cors = require('cors');
var axios = require('axios');
const app = express();
const port = 4000;
app.set('view engine', 'html');
app.use(cors());
app.post('/', function(req, res){
  var weather = [];
  var wearesult= [];
  var lat = [];
  var lon = [];
  lat.push(req.query.lat1);
  lat.push(req.query.lat2);
  lon.push(req.query.lon1);
  lon.push(req.query.lon2);
  axios('https://route.ls.hereapi.com/routing/7.2/calculateroute.json?' + 
  'apiKey=' + 'Pep6V5jtOUK2NtpSD6rxCnDmJNxIiabTM1DLAxNBrE8' + '&'  + 
  'waypoint0=geo!' + lat[0] + ',' + lon[0] + '&' + 
  'waypoint1=geo!' + lat[1] + ',' + lon[1] + '&mode=fastest;pedestrian;traffic:disabled')
  .then((response)=>{
  var way = response.data.response.route[0].leg[0].maneuver;
  console.log(response.data.response.route[0].leg[0].maneuver);
  var st=0;
  way.forEach(element => {
    axios('https://api.openweathermap.org/data/2.5/weather?lat=' + element.position.latitude + '&lon=' + element.position.longitude + '&units=metric&appid=' + 'weatherapikey')
    .then((response)=>{
      weather.push({lat: element.position.latitude, lon: element.position.longitude, temp: response.data.main.temp});
      console.log("lat:", element.position.latitude, "lon:", element.position.longitude, "temp:", response.data.main.temp);
      console.log("________________________________________________________");
      st++;
      var long = way.length;
      console.log(long-a);
      if(long-st == 0)
      {
        var dis = way.length/5;  // 1 del od 5
        var cout = 0;
        for(var k=0; k<5; k++)
        {
              var max = weather[cout].temp;
              var maxobj = cout;
              
              console.log("________________________________________________________");
              for(var j = 0; j<dis-1; j++)
              {
               
                console.log(weather[cout].temp)
                
                if(max < weather[cout].temp)
                {
                  max = weather[cout].temp;
                  maxobj = cout;
                }
                cout++;
              }
              wearesult [k] = weather[maxobj];
              console.log("________________________________________________________");
           console.log(max);
       }
      console.log(wearesult);
      res.send({ wearesult});
      }
    })
    .catch((error)=>{
  console.log(error)
  res.send({data: "Error"});
})
  })
})
.catch((error)=>{
  console.log(error)
  res.send({data: "Error"});
})
});
app.get('/', (req, res) => res.send('Node for timen-maps!'))
app.listen(port, () => console.log(`Node maps server on port ${port}!`))



