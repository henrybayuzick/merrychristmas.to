// Start debug
console.log("Transport: "+Tone.Transport.state);

// Transport time in console
Tone.Transport.setInterval(function(){
  console.log("Transport time: "+Tone.Transport.getTransportTime());
},"1:0:0")

Tone.Transport.setInterval(function(){
  console.log("Transport time: "+Tone.Transport.getTransportTime());
},"0:0:1")
// End debug

// If not a card, redirect to create page
if ($('[data-card-id]').data('value') == -1) {
  window.location.href = "/create"
}

// Greetings
var currentGreeting = 0;
var greetings = [
  "/images/greetings/merry-christmas.svg",
  "/images/greetings/be-careful.svg",
  "/images/greetings/or-whatever.svg",
  "/images/greetings/heres-to.svg"
]

function changeGreeting() {
  if (cardPreview == true) {
    allData.greeting = currentGreeting;
  }
  $('[data-greeting]').attr("src", greetings[currentGreeting]);
};

changeGreeting();

// Backgrounds
var currentBackground = 0;
var backgrounds = [
  "http://media.giphy.com/media/xOhyfTrZZzfyM/giphy.gif",
  "http://media.giphy.com/media/OeoPXQPSzteiA/giphy.gif",
  "http://media.giphy.com/media/LJrMjb87w16q4/giphy.gif",
  "http://media.giphy.com/media/fKfz1mB6FexMY/giphy.gif",
  "http://media.giphy.com/media/10swQPVv0kvqp2/giphy.gif"
]

function changeBackground() {
  if (cardPreview == true) {
    allData.background = currentBackground;
  }
  $('[data-card-bg]').css({'background' : 'url('+backgrounds[currentBackground]+')', 'background-size':'cover'});
};

changeBackground();

// Samples
var audioDirectory            = "/audio/";

// Settings
var defaultBPM                = 120;
var currentBPM                = defaultBPM;
var bars                      = 16;

Tone.Transport.setBpm(currentBPM);
Tone.Transport.setLoopStart(0);
Tone.Transport.setLoopEnd(bars-1 + ":0:0");
Tone.Transport.loop = true;

// Recording
var isRecording               = false;

// Progress Bar
var currentProgress           = 0;
var curentWidth               = 0;

var cardPreview = false;

// // Metronome
// var metronomeState = "off";

// var metronome = new Tone.MultiSampler({
//   "high" : audioDirectory + "metronome/logic1.wav",
//   "low" : audioDirectory + "metronome/logic2.wav"
// });

// metronome.toMaster();
// metronome.setVolume(-200);

// function createMetronomoScore() {
//   var high = [];
//   var low = [];

//   for (var i = 0; i <= bars - 1; i++) {
//     high.push(i + ":0:0");
//     Tone.Transport.setTimeline(function(time){
//       metronome.triggerAttack("high", time);
//     }, i + ":0:0");

//     for (var k = 1; k <= 3; k ++) {
//       low.push( i + ":" + k + ":0");
//       Tone.Transport.setTimeline(function(time){
//         metronome.triggerAttack("low", time);
//       }, i + ":" + k + ":0");
//     }
//   }

//   var metronomeScore = {
//     "high" : high,
//     "low" : low
//   };

//   return metronomeScore;
// }

// var metronomeScore = Tone.Note.parseScore(createMetronomoScore());

// function toggleMetronome() {
//   if (metronomeState == "off") {
//       metronome.setVolume(0);
//       metronomeState = "on";
//       $('[data-click]').addClass('btn-enabled');
//   }
//   else {
//     metronome.setVolume(-200);
//     metronomeState = "off";
//     $('[data-click]').removeClass('btn-enabled');
//   }
// }

// Beats
var beatOnePlayer = new Tone.Player();
var beatOne = {
  "selector" : '[data-beat-one]',
  "name" : "The Nutcracker",
  "url_100" : audioDirectory + "beats/100/the-nutcracker.mp3",
  "url_120" : audioDirectory + "beats/120/the-nutcracker.mp3",
  "url_140" : audioDirectory + "beats/140/the-nutcracker.mp3",
  "url_160" : audioDirectory + "beats/160/the-nutcracker.mp3",
  "volume" : -200,
  "player" : beatOnePlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

var beatTwoPlayer = new Tone.Player();
var beatTwo = {
  "selector" : '[data-beat-two]',
  "name" : "Jingle Bells",
  "url_100" : audioDirectory + "beats/100/jingle-bells.mp3",
  "url_120" : audioDirectory + "beats/120/jingle-bells.mp3",
  "url_140" : audioDirectory + "beats/140/jingle-bells.mp3",
  "url_160" : audioDirectory + "beats/160/jingle-bells.mp3",
  "volume" : -200,
  "player" : beatTwoPlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

var beatThreePlayer = new Tone.Player();
var beatThree = {
  "selector" : '[data-beat-three]',
  "name" : "Jingle Bell Rock",
  "url_100" : audioDirectory + "beats/100/jingle-bell-rock.mp3",
  "url_120" : audioDirectory + "beats/120/jingle-bell-rock.mp3",
  "url_140" : audioDirectory + "beats/140/jingle-bell-rock.mp3",
  "url_160" : audioDirectory + "beats/160/jingle-bell-rock.mp3",
  "volume" : -200,
  "player" : beatThreePlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

var beatFourPlayer = new Tone.Player();
var beatFour = {
  "selector" : '[data-beat-four]',
  "name" : "Sleigh Ride",
  "url_100" : audioDirectory + "beats/100/sleigh-ride.mp3",
  "url_120" : audioDirectory + "beats/120/sleigh-ride.mp3",
  "url_140" : audioDirectory + "beats/140/sleigh-ride.mp3",
  "url_160" : audioDirectory + "beats/160/sleigh-ride.mp3",
  "volume" : -200,
  "player" : beatFourPlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

// Leads
var leadOnePlayer = new Tone.Player();
var leadOne = {
  "selector" : '[data-lead-one]',
  "name" : "The Nutcracker",
  "url_100" : audioDirectory + "leads/100/the-nutcracker.mp3",
  "url_120" : audioDirectory + "leads/120/the-nutcracker.mp3",
  "url_140" : audioDirectory + "leads/140/the-nutcracker.mp3",
  "url_160" : audioDirectory + "leads/160/the-nutcracker.mp3",
  "volume" : -200,
  "player" : leadOnePlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

var leadTwoPlayer = new Tone.Player();
var leadTwo = {
  "selector" : '[data-lead-two]',
  "name" : "Jingle Bells",
  "url_100" : audioDirectory + "leads/100/jingle-bells.mp3",
  "url_120" : audioDirectory + "leads/120/jingle-bells.mp3",
  "url_140" : audioDirectory + "leads/140/jingle-bells.mp3",
  "url_160" : audioDirectory + "leads/160/jingle-bells.mp3",
  "volume" : -200,
  "player" : leadTwoPlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

var leadThreePlayer = new Tone.Player();
var leadThree = {
  "selector" : '[data-lead-three]',
  "name" : "Jingle Bell Rock",
  "url_100" : audioDirectory + "leads/100/jingle-bell-rock.mp3",
  "url_120" : audioDirectory + "leads/120/jingle-bell-rock.mp3",
  "url_140" : audioDirectory + "leads/140/jingle-bell-rock.mp3",
  "url_160" : audioDirectory + "leads/160/jingle-bell-rock.mp3",
  "volume" : -200,
  "player" : leadThreePlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

var leadFourPlayer = new Tone.Player();
var leadFour = {
  "selector" : '[data-lead-four]',
  "name" : "Sleigh Ride",
  "url_100" : audioDirectory + "leads/100/sleigh-ride.mp3",
  "url_120" : audioDirectory + "leads/120/sleigh-ride.mp3",
  "url_140" : audioDirectory + "leads/140/sleigh-ride.mp3",
  "url_160" : audioDirectory + "leads/160/sleigh-ride.mp3",
  "volume" : -200,
  "player" : leadFourPlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

// Players
var numberOfBeats = 4;
var numberOfLeads = 4;
var numberOfPlayers = numberOfBeats + numberOfLeads;

players = [
  { "playerDetails" : beatOne, "player": beatOnePlayer },
  { "playerDetails" : beatTwo, "player": beatTwoPlayer },
  { "playerDetails" : beatThree, "player": beatThreePlayer },
  { "playerDetails" : beatFour, "player": beatFourPlayer },

  { "playerDetails" : leadOne, "player": leadOnePlayer },
  { "playerDetails" : leadTwo, "player": leadTwoPlayer },
  { "playerDetails" : leadThree, "player": leadThreePlayer },
  { "playerDetails" : leadFour, "player": leadFourPlayer }
]

function toggleOffBeats(object) {
  for (var i = 0; i < numberOfBeats; i++) {
    if (players[i].playerDetails != object) { 
      $(players[i].playerDetails.selector).removeClass('btn-enabled');
      players[i].playerDetails.toggled = false;
      players[i].player.setVolume(-200);
      players[i].playerDetails.volume = -200;

      if (isRecording == true) {
        players[i].playerDetails.off_score.push(Tone.Transport.getTransportTime());
        console.log(players[i].playerDetails.off_score);
      }
    }
  }
}

function toggleOffLeads(object) {
  for (var i = numberOfBeats; i < numberOfPlayers; i++) {
    if (players[i].playerDetails != object) { 
      $(players[i].playerDetails.selector).removeClass('btn-enabled');
      players[i].playerDetails.toggled = false;
      players[i].player.setVolume(-200);
      players[i].playerDetails.volume = -200;

      if (isRecording == true) {
        players[i].playerDetails.off_score.push(Tone.Transport.getTransportTime());
        console.log(players[i].playerDetails.off_score);
      }
    }
  }
}

function togglePlayer(object, toggle) {
  if (object.toggled != true) {
    if (toggle == "beats") {
      toggleOffBeats(object);
    } else if (toggle == "leads") {
      toggleOffLeads(object);
    }
    object.player.setVolume(0);
    object.volume = 0;
    $(object.selector).addClass('btn-enabled');
    object.toggled = true;

    if (isRecording == true) {
      object.on_score.push(Tone.Transport.getTransportTime());
      console.log(object.on_score);
    }
  }
  else {
    object.player.setVolume(-200);
    object.volume = -200;
    $(object.selector).removeClass('btn-enabled');
    object.toggled = false;

    if (isRecording == true) {
      object.off_score.push(Tone.Transport.getTransportTime());
      console.log(object.off_score);
    }
  }
}

var startIntervals = [];
var stopIntervals = [];
function setPlayers (object, player) {
  object.player = player;
  startInterval = Tone.Transport.setTimeline(function(){ player.start(); }, "0:0:0");
  stopInterval = Tone.Transport.setTimeline(function(){ player.stop(); }, bars-2 + ":3:0"); // Make sure it is stopped right before you start it again
  startIntervals.push(startInterval);
  stopIntervals.push(stopInterval);
  player.toMaster();
  player.setVolume(object.volume);
}

function disposePlayers() {
  for (var i = 0; i < numberOfPlayers; i++) {
    players[i].player.dispose();
  }
}

function stopAllPlayers() {
  for (var i = 0; i < numberOfPlayers; i++) {
    players[i].player.stop();
  }
}

var audioLoaded = 0;
function updateLoadingBar() {
  console.log('updating loading board');
  if (cardPreview == true) {
    audioLoaded++;
    $('[data-preview-loading-text]').text("Creating preview.");
    if (audioLoaded == 8) {
      $('[data-preview-loader]').addClass('hidden');
      $('[data-preview-content]').removeClass('hidden');
      if (startScreen != true) {
        Tone.Transport.start();
      }
    }
  }
  else {
    audioLoaded++;
    $('[data-loading-text]').text("Audio " + audioLoaded + "/8");
    if (audioLoaded == 8) {
      $('[data-loading]').addClass('hidden');

      if (startScreen != true) {
        Tone.Transport.start();
      } else {
        $('[data-start-screen]').removeClass('hidden');
      }
    }
  }
}

function changeTempo(tempo){
  disposePlayers(); // Dispose of old players
  var playerName;
  audioLoaded = 0;
  if (cardPreview != true) {
    $('[data-loading]').removeClass('hidden');
  }
  for (var i = 0; i < numberOfPlayers; i++) {
    switch (tempo) {
      case 100:
        players[i].player = new Tone.Player(players[i].playerDetails.url_100, function() {
          updateLoadingBar()
        });
        break;
      case 120:
        players[i].player = new Tone.Player(players[i].playerDetails.url_120, function() {
          updateLoadingBar();
        });
        break;
      case 140:
        players[i].player = new Tone.Player(players[i].playerDetails.url_140, function() {
          updateLoadingBar()
        });
        break;
      case 160:
        players[i].player = new Tone.Player(players[i].playerDetails.url_160, function() {
          updateLoadingBar()
        });
        break;
    }
    setPlayers(players[i].playerDetails, players[i].player); // Sets timeline, connects to master, sets volume
  }
}

function stopEverything() {
  Tone.Transport.stop();
  stopAllPlayers();
}

var numberOfSamples = 12;

// Sampler/Pad
var sampleOne = {
  "selector" : "[data-sample-one]",
  "name" : "sample-one",
  "path" : audioDirectory + "samples/sample1.mp3",
  "score" : []
};

var sampleTwo = {
  "selector" : "[data-sample-two]",
  "name" : "sample-two",
  "path" : audioDirectory + "samples/sample2.mp3",
  "score" : []
};

var sampleThree = {
  "selector" : "[data-sample-three]",
  "name" : "sample-three",
  "path" : audioDirectory + "samples/sample3.mp3",
  "score" : []
};

var sampleFour = {
  "selector" : "[data-sample-four]",
  "name" : "sample-four",
  "path" : audioDirectory + "samples/sample4.mp3",
  "score" : []
};

var sampleFive = {
  "selector" : "[data-sample-five]",
  "name" : "sample-five",
  "path" : audioDirectory + "samples/sample5.mp3",
  "score" : []
};

var sampleSix = {
  "selector" : "[data-sample-six]",
  "name" : "sample-six",
  "path" : audioDirectory + "samples/sample6.mp3",
  "score" : []
};

var sampleSeven = {
  "selector" : "[data-sample-seven]",
  "name" : "sample-seven",
  "path" : audioDirectory + "samples/sample7.mp3",
  "score" : []
};

var sampleEight = {
  "selector" : "[data-sample-eight]",
  "name" : "sample-eight",
  "path" : audioDirectory + "samples/sample8.mp3",
  "score" : []
};

var sampleNine = {
  "selector" : "[data-sample-nine]",
  "name" : "sample-nine",
  "path" : audioDirectory + "samples/sample9.mp3",
  "score" : []
};

var sampleTen = {
  "selector" : "[data-sample-ten]",
  "name" : "sample-ten",
  "path" : audioDirectory + "samples/sample10.mp3",
  "score" : []
};

var sampleEleven = {
  "selector" : "[data-sample-Eleven]",
  "name" : "sample-eleven",
  "path" : audioDirectory + "samples/sample11.mp3",
  "score" : []
};

var sampleTwelve = {
  "selector" : "[data-sample-twelve]",
  "name" : "sample-twelve",
  "path" : audioDirectory + "samples/sample12.mp3",
  "score" : []
};

var sampler = new Tone.MultiSampler({
   "sample-one" : sampleOne.path,
   "sample-two" : sampleTwo.path,
   "sample-three" : sampleThree.path,
   "sample-four" : sampleFour.path,
   "sample-five" : sampleFive.path,
   "sample-six" : sampleSix.path,
   "sample-seven" : sampleSeven.path,
   "sample-eight" : sampleEight.path,
   "sample-nine" : sampleNine.path,
   "sample-ten" : sampleTen.path,
   "sample-eleven" : sampleEleven.path,
   "sample-twelve" : sampleTwelve.path
});

sampler.toMaster();

var samples = [sampleOne, sampleTwo, sampleThree, sampleFour, sampleFive, sampleSix, sampleSeven, sampleEight, sampleNine, sampleTen, sampleEleven, sampleTwelve]

function resetScores() {
  for (var i = 0; i < numberOfSamples; i++) {
    samples[i].score = [];
  }
  for (var i = 0; i < numberOfPlayers; i++) {
    players[i].playerDetails.on_score = [];
    players[i].playerDetails.off_score = [];
  }
}

function playSample(keyPress, object) {
  if (keyPress == 'down') {
   sampler.triggerAttack(object.name);
   $(object.selector).addClass('btn-enabled');

    if (isRecording == true) {
      object.score.push(Tone.Transport.getTransportTime());
      console.log(object.score);
    }
  } else if (keyPress == 'up') {
    $(object.selector).removeClass('btn-enabled'); 
  } else if (keyPress == 'none') {
    sampler.triggerAttack(object.name);

    if (isRecording == true) {
      object.score.push(Tone.Transport.getTransportTime());
      console.log(object.score);
    }
  }
}

// Key presses down
$(window).keydown(function(e) {
  var key = e.which;
  switch (key) {
    case 49:
      playSample('down', sampleOne);
      break;
    case 50:
      playSample('down', sampleTwo);
      break;
    case 51:
      playSample('down', sampleThree);
      break;
    case 52:
      playSample('down', sampleFour);
      break;
    case 53:
      playSample('down', sampleFive);
      break;
    case 54:
      playSample('down', sampleSix);
      break;
    case 55:
      playSample('down', sampleSeven);
      break;
    case 56:
      playSample('down', sampleEight);
      break;
    case 57:
      playSample('down', sampleNine);
      break;
    case 48:
      playSample('down', sampleTen);
      break;
    case 189:
      playSample('down', sampleEleven);
      break;
    case 187:
      playSample('down', sampleTwelve);
      break;
  }
});

// Key presses up
$(window).keyup(function(e) {
  var key = e.which;
  switch (key) {
    case 49:
      playSample('up', sampleOne);
      break;
    case 50:
      playSample('up', sampleTwo);
      break;
    case 51:
      playSample('up', sampleThree);
      break;
    case 52:
      playSample('up', sampleFour);
      break;
    case 53:
      playSample('up', sampleFive);
      break;
    case 54:
      playSample('up', sampleSix);
      break;
    case 55:
      playSample('up', sampleSeven);
      break;
    case 56:
      playSample('up', sampleEight);
      break;
    case 57:
      playSample('up', sampleNine);
      break;
    case 48:
      playSample('up', sampleTen);
      break;
    case 189:
      playSample('up', sampleEleven);
      break;
    case 187:
      playSample('up', sampleTwelve);
      break;
  }
});

function makePlayerScores() {
  for (var i = 0; i < numberOfPlayers; i++) {
    if (players[i].playerDetails.toggled == true) {
      players[i].playerDetails.on_score.push(Tone.Transport.getTransportTime());
      console.log(players[i].playerDetails.on_score);
    }
  }
}

function record() {
  if (isRecording != true) {
    stopEverything();
    Tone.Transport.setTransportTime("0:0:0");

    setTimeout(function() { if (startScreen != true) { recording(); }}, 500);
  }
  else {
    stopRecording();
  }
}

var recordingInterval = 0;
function recording() {
  resetProgressBar();
  resetScores();
  makePlayerScores()

  Tone.Transport.start();

  recordingInterval = Tone.Transport.setInterval(function() {
    if (currentProgress == 0) {
      isRecording = true;

      $('[data-record-label]').text("Stop");
    }

    updateProgressBar((bars-1)*16);

  },"0:0:1");
}

function stopRecording() {
  isRecording = false;
  stopEverything();
  resetProgressBar()

  Tone.Transport.clearInterval(recordingInterval);

  $('[data-current-progress]').removeClass('recording');
  $('[data-record-label]').text("Rec");

  previewPopup();

  //prepareScore();
}

function closePreview() {
  $('[data-overlay]').addClass('hidden');
  $('[data-preview]').addClass('hidden');
  //cardPreview = false;
}

function resetToggles() {
  for (var i = 0; i < numberOfPlayers; i++) {
    players[i].playerDetails.toggled = "false";
    $(players[i].playerDetails.selector).removeClass('btn-enabled');
  }
}

function resetVolume() {
  for (var i = 0; i < numberOfPlayers; i++) {
    players[i].playerDetails.volume = -200;
    players[i].player.setVolume(-200);
  }
}

function restart() {
  closePreview();

  // Reset all score
  resetScores();

  // Reset toggles
  resetToggles();

  // Reset volume
  resetVolume();

  // Make sure timeline is clear and everything is stopped
  Tone.Transport.clearTimelines();
  stopEverything();

  // Set BPM from data and make sure transport is at 0:0:0
  Tone.Transport.setBpm(currentBPM);
  Tone.Transport.setTransportTime("0:0:0");

  // Set all the players at current BPM
  changeTempo(+currentBPM);
}

function submitPreview() {
  //stopEverything();

  closePreview();
  prepareScore();

  $('[data-builder]').addClass('hidden');
  $('[data-card-bg]').removeClass('hidden');
}

function previewPopup() {
  $('[data-overlay]').removeClass('hidden');
  $('[data-preview]').removeClass('hidden');
  cardPreview = true;

  previewCard();
}

function updateProgressBar(time) {
  var totalLength = time;
  var progressIncrement = 100/time;

  // DEBUG
  console.log("Time: " + Tone.Transport.getTransportTime());
  console.log("Width: " + curentWidth);
  console.log("Progress: " + currentProgress + "/" + totalLength);

  if (currentProgress < totalLength-1) {
    curentWidth += progressIncrement;
    $('[data-current-progress]').css({"width": curentWidth + "%"  });
  }

  else {
    curentWidth = 0;
    currentProgress = 0;
    $('[data-current-progress]').css({"width": curentWidth + "%"  });

    if (isRecording == true) {
     stopRecording();
    }
  }

  currentProgress++;

}

function resetProgressBar() {
  currentProgress = 0;
  curentWidth = 0;
  $('[data-current-progress]').css({"width": curentWidth + "%"  });
}

function setPlayerTimelines (object) {
  //Tone.Transport.clearTimelines();

  // Put all the players back on the timeline
  Tone.Transport.setTimeline(function(){ object.player.start(); }, "0:0:0");
  Tone.Transport.setTimeline(function(){
      object.player.stop(); console.log(object.playerDetails.name + 'volume down');
        object.playerDetails.volume=-200;
        object.player.setVolume(-200);
  }, bars-2 + ":3:3"); // Make sure it is stopped right before you start it again and volume is down (it will be enabled again if needed by the events below)

  // Set timeline events for their volume

  // Set on events
  if (object.playerDetails.on_score) {
    for (var i = 0; i < object.playerDetails.on_score.length; i++) {
      Tone.Transport.setTimeline(function() {
        console.log(object.playerDetails.name + 'volume up');
        object.playerDetails.volume=0;
        object.player.setVolume(0);
      }, object.playerDetails.on_score[i]);
    }
  }

  // Set off events
  if (object.playerDetails.off_score) {
    for (var i = 0; i < object.playerDetails.off_score.length; i++) {
      Tone.Transport.setTimeline(function() {
        console.log(object.playerDetails.name + 'volume down');
        object.playerDetails.volume=-200;
        object.player.setVolume(-200);
      }, object.playerDetails.off_score[i]);
    }
  }
}

function previewCard() {
  console.log('Previewing card at ' + currentBPM + " BPM");

  //Make sure timeline is clear and everything is stopped
  //stopEverything();
  Tone.Transport.clearTimelines();
  

  // Set BPM from data and make sure transport is at 0:0:0
  Tone.Transport.setBpm(currentBPM);
  Tone.Transport.setTransportTime("0:0:0");

  // Set all player scores from data
  for (var i = 0; i < numberOfPlayers; i++) {
    setPlayerTimelines(players[i]);
  }

  samplerScore = {
    "sample-one" : sampleOne.score,
    "sample-two" : sampleTwo.score,
    "sample-three" : sampleThree.score,
    "sample-four" : sampleFour.score,
    "sample-five" : sampleFive.score,
    "sample-six" : sampleSix.score,
    "sample-seven" : sampleSeven.score,
    "sample-eight" : sampleEight.score,
    "sample-nine" : sampleNine.score,
    "sample-ten" : sampleTen.score,
    "sample-eleven" : sampleEleven.score,
    "sample-twelve" : sampleTwelve.score
  }

  // Parse multisampler notes from data
  Tone.Note.parseScore(samplerScore);

  // Route notes
  Tone.Note.route("sample-one", function(time) {
    sampler.triggerAttack("sample-one");
  });

  Tone.Note.route("sample-two", function(time) {
    sampler.triggerAttack("sample-two");
  });

  Tone.Note.route("sample-three", function(time) {
    sampler.triggerAttack("sample-three");
  });

  Tone.Note.route("sample-four", function(time) {
    sampler.triggerAttack("sample-four");
  });

  Tone.Note.route("sample-five", function(time) {
    sampler.triggerAttack("sample-five");
  });

  Tone.Note.route("sample-six", function(time) {
    sampler.triggerAttack("sample-six");
  });

  Tone.Note.route("sample-seven", function(time) {
    sampler.triggerAttack("sample-seven");
  });

  Tone.Note.route("sample-eight", function(time) {
    sampler.triggerAttack("sample-eight");
  });

  Tone.Note.route("sample-nine", function(time) {
    sampler.triggerAttack("sample-nine");
  });

  Tone.Note.route("sample-ten", function(time) {
    sampler.triggerAttack("sample-ten");
  });

  Tone.Note.route("sample-eleven", function(time) {
    sampler.triggerAttack("sample-eleven");
  });

  Tone.Note.route("sample-twelve", function(time) {
    sampler.triggerAttack("sample-twelve");
  });

  // Set all the players at current BPM
  changeTempo(+currentBPM);
}

var allData = {};

function prepareScore() {
  //Tone.Transport.clearTimelines(); // Clear timeline

  // for (var i = 0; i < numberOfPlayers; i++) {
  //   setPlayerTimelines(players[i]);
  // }

  allData = {
    "players" : [
      { "on_score" : players[0].playerDetails.on_score, "off_score" : players[0].playerDetails.off_score },
      { "on_score" : players[1].playerDetails.on_score, "off_score" : players[1].playerDetails.off_score },
      { "on_score" : players[2].playerDetails.on_score, "off_score" : players[2].playerDetails.off_score },
      { "on_score" : players[3].playerDetails.on_score, "off_score" : players[3].playerDetails.off_score },
      { "on_score" : players[4].playerDetails.on_score, "off_score" : players[4].playerDetails.off_score },
      { "on_score" : players[5].playerDetails.on_score, "off_score" : players[5].playerDetails.off_score },
      { "on_score" : players[6].playerDetails.on_score, "off_score" : players[6].playerDetails.off_score },
      { "on_score" : players[7].playerDetails.on_score, "off_score" : players[7].playerDetails.off_score }
    ],
    "multiSampler" : samplerScore = {
      "sample-one" : sampleOne.score,
      "sample-two" : sampleTwo.score,
      "sample-three" : sampleThree.score,
      "sample-four" : sampleFour.score,
      "sample-five" : sampleFive.score,
      "sample-six" : sampleSix.score,
      "sample-seven" : sampleSeven.score,
      "sample-eight" : sampleEight.score,
      "sample-nine" : sampleNine.score,
      "sample-ten" : sampleTen.score,
      "sample-eleven" : sampleEleven.score,
      "sample-twelve" : sampleTwelve.score
    },
    "bpm" : currentBPM,
    "background": 0,
    "greeting" : 0
  };
}

function play() {
  Tone.Transport.setTransportTime("0:0:0");
  Tone.Transport.start();  
}