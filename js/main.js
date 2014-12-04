// Start debug
console.log("Transport: "+Tone.Transport.state);

// Transport time in console
Tone.Transport.setInterval(function(){
  console.log("Transport time: "+Tone.Transport.getTransportTime());
},"1:0:0")

Tone.Transport.setInterval(function(){
  console.log("Transport time: "+Tone.Transport.getTransportTime());
},"0:1:0")
// End debug

// Samples
var audioDirectory            = "audio/";
var numberOfSamples           = 3;

// Settings
var defaultBPM                = 120;
var currentBPM                = defaultBPM;
var bars = 16;

Tone.Transport.setBpm(currentBPM);
Tone.Transport.setLoopStart(0);
Tone.Transport.setLoopEnd(bars-1 + ":0:0"); // Subtract 1 to count 0:0:0 as one bar
Tone.Transport.loop = true;

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
  "toggled" : false
}

var beatTwoPlayer = new Tone.Player();
var beatTwo = {
  "selector" : '[data-beat-two]',
  "name" : "Rock beat",
  "url_100" : audioDirectory + "beat_jingle_100.mp3",
  "url_120" : audioDirectory + "beat_jingle_120.mp3",
  "volume" : -200,
  "player" : beatTwoPlayer,
  "toggled" : false
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
  "toggled" : false
}

var leadTwoPlayer = new Tone.Player();
var leadTwo = {
  "selector" : '[data-lead-two]',
  "name" : "Rock lead",
  "url_100" : audioDirectory + "lead_jingle_100.mp3",
  "url_120" : audioDirectory + "lead_jingle_120.mp3",
  "volume" : -200,
  "player" : leadTwoPlayer,
  "toggled" : false
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

function toggleOffBeats() {
    for (var i = 0; i < numberOfBeats; i++) {
      $(players[i].playerDetails.selector).removeClass('btn-enabled');
      players[i].playerDetails.toggled = false;
      players[i].player.setVolume(-200);
      players[i].playerDetails.volume = -200;
    }
}

function toggleOffLeads() {
    for (var i = numberOfBeats; i < numberOfPlayers; i++) {
      $(players[i].playerDetails.selector).removeClass('btn-enabled');
      players[i].playerDetails.toggled = false;
      players[i].player.setVolume(-200);
      players[i].playerDetails.volume = -200;
    }
}

function togglePlayer(object, toggle) {
  if (object.toggled != true) {
    if (toggle == "beats") {
      toggleOffBeats();
    } else if (toggle == "leads") {
      toggleOffLeads();
    }
    object.player.setVolume(-10);
    object.volume = -10;
    $(object.selector).addClass('btn-enabled');
    object.toggled = true;
  }
  else {
    object.player.setVolume(-200);
    object.volume = -200;
    $(object.selector).removeClass('btn-enabled');
    object.toggled = false;
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