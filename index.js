'use strict';
var ids = [];
var count = 0;
var shouldActivate = false;

let knotCredentials = {
  knot02: {
    uuid: 'f10eb36f-ddb9-463f-aa2e-0c2cf4830000',
    token: 'da55ab6af6803ab3673f8730caacfb98a425593d'
  },
  knot04: {
    uuid: 'd3531e89-fb74-43cd-88a4-5eae81460000',
    token: '28d1cf43fe2299381cbeee6f734fef5596e61db7'
  },
  knot07: {
    uuid: '7b589c31-8999-48c2-b85a-a1f09ae80000',
    token: '7e3cb79bc7ba3e7953fdb222c9490f2aaa667188'
  }
}



// r.json()['status']


const KNoTCloud = require('knot-cloud');
const cloud = new KNoTCloud(
  'knot-test.cesar.org.br',
  80,
  knotCredentials.knot04.uuid,
  knotCredentials.knot04.token
);

function listenDeviceStatus(id) {
  setInterval(async () => {
    let device = await cloud.getDevice(id);
    let deviceData = await cloud.getData(id);
    console.log(device);
    console.log(deviceData);
    if (deviceData.length > 0) {
      var didFound1 = false;
      var didFound2 = false;
      deviceData.forEach((data) => {
        if (data.data.sensor_id == 1) {
          // claramente gambiarra
          if (didFound1) return;
          shouldActivate = data.data.value;
          console.log("status", data.data.value);
          didFound1 = true;
        }
        else if (data.data.sensor_id == 2) {
          if (didFound2) return;
          if (data.data.value == true) {
            console.log("\n\n\n\n\n");
            console.log("alert!!!");
            console.log("\n\n\n\n\n");
          }
          didFound2 = true;
        }
      });
    }

    
  }, 500); // listen the server at every 100 milliseconds
}

async function main() {
  await cloud.connect();
  let devices = await cloud.getDevices();
  console.log(devices);
  devices.forEach( (device) => {
    console.log(device.name);
    let id = device.id;
    // if (id === "0C1945EA41F71118"){
      listenDeviceStatus(id);
    // }
  });

  // use the ids here
  // await cloud.close();
}
main();

//---------------------------------
// Express zone
var express = require('express');
var app = express();

// TODO: make a control for the registered devices

app.get('/status', function(req, res) {
  console.log("status requested")
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({status: shouldActivate}));
});

app.get('/', function(req, res){
    if (!shouldActivate){
        res.sendFile(__dirname+'/home.html');
    }
    else{
      res.sendFile(__dirname+'/home_alert.html');
    }
});

app.get('/dispensar', function(req, res){
    console.log("dispensar");
    shouldActivate = false;
    res.sendFile(__dirname+'/home.html');
});
    
// app.set('port', process.env.PORT || 3000);
app.listen(process.env.PORT);