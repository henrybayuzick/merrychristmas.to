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

// Samples
var audioDirectory            = "audio/";

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

// Metronome
var metronomeState = "off";

var metronome = new Tone.MultiSampler({
  "high" : audioDirectory + "logic1.wav",
  "low" : audioDirectory + "logic2.wav"
});

metronome.toMaster();
metronome.setVolume(-200);

function createMetronomoScore() {
  var high = [];
  var low = [];

  for (var i = 0; i <= bars - 1; i++) {
    high.push(i + ":0:0");
    Tone.Transport.setTimeline(function(time){
      metronome.triggerAttack("high", time);
    }, i + ":0:0");

    for (var k = 1; k <= 3; k ++) {
      low.push( i + ":" + k + ":0");
      Tone.Transport.setTimeline(function(time){
        metronome.triggerAttack("low", time);
      }, i + ":" + k + ":0");
    }
  }

  var metronomeScore = {
    "high" : high,
    "low" : low
  };

  return metronomeScore;
}

var metronomeScore = Tone.Note.parseScore(createMetronomoScore());

function toggleMetronome() {
  if (metronomeState == "off") {
      metronome.setVolume(0);
      metronomeState = "on";
      $('[data-click]').addClass('btn-enabled');
  }
  else {
    metronome.setVolume(-200);
    metronomeState = "off";
    $('[data-click]').removeClass('btn-enabled');
  }
}

// Beats
var beatOnePlayer = new Tone.Player();
var beatOne = {
  "selector" : '[data-beat-one]',
  "name" : "Rap beat",
  "url_100" : audioDirectory + "beat_nutcracker_100.mp3",
  "url_120" : audioDirectory + "beat_nutcracker_120.mp3",
  "volume" : -200,
  "player" : beatOnePlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : ["2:0:0","3:0:0", "5:0:0"]
}

var beatTwoPlayer = new Tone.Player();
var beatTwo = {
  "selector" : '[data-beat-two]',
  "name" : "Rock beat",
  "url_100" : audioDirectory + "beat_jingle_100.mp3",
  "url_120" : audioDirectory + "beat_jingle_120.mp3",
  "volume" : -200,
  "player" : beatTwoPlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

// Leads
var leadOnePlayer = new Tone.Player();
var leadOne = {
  "selector" : '[data-lead-one]',
  "name" : "Rap lead",
  "url_100" : audioDirectory + "lead_nutcracker_100.mp3",
  "url_120" : audioDirectory + "lead_nutcracker_120.mp3",
  "volume" : -200,
  "player" : leadOnePlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

var leadTwoPlayer = new Tone.Player();
var leadTwo = {
  "selector" : '[data-lead-two]',
  "name" : "Rock lead",
  "url_100" : audioDirectory + "lead_jingle_100.mp3",
  "url_120" : audioDirectory + "lead_jingle_120.mp3",
  "volume" : -200,
  "player" : leadTwoPlayer,
  "toggled" : false,
  "on_score" : [],
  "off_score" : []
}

// Players
var numberOfBeats = 2;
var numberOfLeads = 2;
var numberOfPlayers = numberOfBeats + numberOfLeads;

players = [
  { "playerDetails" : beatOne, "player": beatOnePlayer },
  { "playerDetails" : beatTwo, "player": beatTwoPlayer },
  { "playerDetails" : leadOne, "player": leadOnePlayer },
  { "playerDetails" : leadTwo, "player": leadTwoPlayer },
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
    object.player.setVolume(-10);
    object.volume = -10;
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

function setPlayers (object, player) {
  object.player = player;
  Tone.Transport.setTimeline(function(time){ player.start(time); }, "0:0:0");
  Tone.Transport.setTimeline(function(time){ player.stop(time); }, bars-2 + ":3:0"); // Make sure it is stopped right before you start it again
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

function changeTempo(tempo){
  disposePlayers(); // Dispose of old players
  var playerName;
  for (var i = 0; i < numberOfPlayers; i++) {
    switch (tempo) {
      case 100:
        players[i].player = new Tone.Player(players[i].playerDetails.url_100); // Creates new player object for each beat and lead
        break;
      case 120:
        players[i].player = new Tone.Player(players[i].playerDetails.url_120); // Creates new player object for each beat and lead
        break;
    }
    setPlayers(players[i].playerDetails, players[i].player); // Sets timeline, connects to master, sets volume
  }
}

function stopEverything() {
  Tone.Transport.stop();
  stopAllPlayers();
}

var numberOfSamples = 3;

// Sampler/Pad
var kick = {
  "selector" : "[data-kick]",
  "name" : "kick",
  "path" : audioDirectory + "kick.wav",
  "score" : []
};

var snare = {
  "selector" : "[data-snare]",
  "name" : "snare",
  "path" : audioDirectory + "snare.mp3",
  "score" : []
};

var hat = {
  "selector" : "[data-hat]",
  "name" : "hi-hat",
  "path" : audioDirectory + "hat.mp3",
  "score" : []
};

var sampler = new Tone.MultiSampler({
   "kick" : kick.path,
   "snare" : snare.path,
   "hi-hat" : hat.path
});
sampler.toMaster();

var samples = [kick, snare, hat]

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
  }
}

// Key presses down
$(window).keydown(function(e) {
  var key = e.which;
  switch (key) {
    case 49:
      playSample('down', kick);
      break;
    case 50:
      playSample('down', snare);
      break;
    case 51:
      playSample('down', hat);
      break;
    case 52:
      rim();
      break;
    case 53:
      beatOne();
      break;
  }
});

// Key presses up
$(window).keyup(function(e) {
  var key = e.which;
  switch (key) {
    case 49:
      playSample('up', kick);
      break;
    case 50:
      playSample('up', snare);
      break;
    case 51:
      playSample('up', hat);
      break;
    case 52:
      rim();
      break;
    case 53:
      beatOne();
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

      $('[data-record-label]').text("Recording");
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

  prepareScore();
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
  // Put all the players back on the timeline
  Tone.Transport.setTimeline(function(time){ object.player.start(time); }, "0:0:0");
  Tone.Transport.setTimeline(function(time){ object.player.stop(time); }, bars-2 + ":3:0"); // Make sure it is stopped right before you start it again

  // Set timeline events for their volume

  // Set on events
  for (var i = 0; i < object.playerDetails.on_score.length; i++) {
    Tone.Transport.setTimeline(function() {
      console.log(object.playerDetails.name + 'volume up');
      object.playerDetails.volume=-10;
      object.player.setVolume(-10);
    }, object.playerDetails.on_score[i]);
  }

  // Set off events
  for (var i = 0; i < object.playerDetails.off_score.length; i++) {
    Tone.Transport.setTimeline(function() {
      console.log(object.playerDetails.name + 'volume down');
      object.playerDetails.volume=-200;
      object.player.setVolume(-200);
    }, object.playerDetails.off_score[i]);
  } 
}

function prepareScore() {
  Tone.Transport.clearTimelines(); // Clear timeline

  for (var i = 0; i < numberOfPlayers; i++) {
    setPlayerTimelines(players[i]);
  }

  var score = {
    "kick" : kick.score,
    "snare" : snare.score,
    "hat" : hat.score
  };

  finalScore = Tone.Note.parseScore(score);

  Tone.Note.route("kick", function(time) {
    sampler.triggerAttack("kick");
  });

  Tone.Note.route("snare", function(time) {
    sampler.triggerAttack("snare");
  });

  Tone.Note.route("hat", function(time) {
    sampler.triggerAttack("hi-hat");
  });
}

function play() {
  
  Tone.Transport.setTransportTime("0:0:0");

  Tone.Transport.start();

  
}