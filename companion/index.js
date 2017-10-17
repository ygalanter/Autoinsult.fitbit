import * as messaging from "messaging";
import { settingsStorage } from "settings";

var ENDPOINT = 'http://autoinsult.datahamster.com/scripts/webinsult.server.php?xajax=generate_insult';
var INSULT_TYPE;

function generateInsult(insultType) {
  fetch(ENDPOINT + '&xajaxargs[]=' + insultType)
   .then(function (response) {
      response.text()
        .then(function(data) {
          data = data.substring(data.indexOf('[CDATA[') + 7);
          data = data.substring(0, data.indexOf(']]'));
          returnInsult(data);
      })
  })
  .catch(function (err) {
    console.log("Error: " + err);
    returnInsult("Error: try again");
  });
}


// Send insult to the device
function returnInsult(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a data to the device
    messaging.peerSocket.send(data);
  } else {
    console.log("Error: Connection is not open");
  }
}


// Listen for messages from the device
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data.command == "insult") {
    // The device requested insult
    generateInsult(INSULT_TYPE);
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}


// A user changes settings
settingsStorage.onchange = evt => {
  if (evt && evt.key == "insulttype") {
    INSULT_TYPE =  JSON.parse(evt.newValue).selected[0]
  }
};

//loading initial settings
try {
  INSULT_TYPE = JSON.parse(settingsStorage.getItem("insulttype")).selected[0];
} catch (e) {
  INSULT_TYPE = 0;
}