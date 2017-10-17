import document from "document";
import * as messaging from "messaging";

let txtInsult = document.getElementById("txtInsult");
let hourglass = document.getElementById("hourglass");
let btnBR = document.getElementById("btn-br");

btnBR.onactivate = function(evt) {
  fetchInsult();
}


// Request insult to be generated
function fetchInsult() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    
    txtInsult.innerText = "";
    hourglass.style.display = "inline";
    btnBR.style.display = "none";
    
    // Send a command to the companion
    messaging.peerSocket.send({
      command: 'insult'
    });
  }
}

// Display the insult received from the companion
function processInsult(data) {
  hourglass.style.display = "none";
  txtInsult.innerText = data;
   btnBR.style.display = "inline";
}


messaging.peerSocket.onopen = function() {
  // Fetch insult when the connection opens
  fetchInsult();
}


// Listen for messages from the companion
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data) {
    processInsult(evt.data);
  }
}


