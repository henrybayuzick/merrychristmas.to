// Beats
var beatOne = new Tone.Player(audioDirectory + "beat_nutcracker_120.mp3", function(){
      // Loaded
      console.log('beat 1 loaded');
      beatOne.toMaster();
      beatOne.loop = true;
});
beatOne.sync();

beatOne.setVolume(-200);

var beatOneToggled = false;
function toggleBeatOne() {
  if (beatOneToggled != true) {
    beatOne.setVolume(0);
    $('[data-beat-one]').addClass('btn-enabled');
    beatOneToggled = true;
  }
  else {
    beatOne.setVolume(-200);
    $('[data-beat-one]').removeClass('btn-enabled');
    beatOneToggled = false;
  }
}

var beatTwo = new Tone.Player(audioDirectory + "beat_jingle_120.mp3", function(){
      // Loaded
      console.log('beat2 loaded');
      beatTwo.toMaster();
      //beatTwo.loop = true;
});
beatTwo.sync();
beatTwo.onended(function() {
  console.log("Beat Two: "+Tone.Transport.getTransportTime());
})

//beatTwo.setVolume(-200);

var beatTwoToggled = false;
function toggleBeatTwo() {
  if (beatTwoToggled != true) {
    beatTwo.setVolume(-10);
    $('[data-beat-two]').addClass('btn-enabled');
    beatTwoToggled = true;
  }
  else {
    beatTwo.setVolume(-200);
    $('[data-beat-two]').removeClass('btn-enabled');
    beatTwoToggled = false;
  }
}

// Leads
var leadOne = {
  "name" : "Nutcracker Rap",
  "path_100" : audioDirectory + "lead_jingle_100.mp3",
  "path_120" : audioDirectory + "lead_nutcracker_120.mp3",
  "volume" : -200
};

var leadOnePlayer = new Tone.Player();

var leadOneToggled = false;
function toggleLeadOne() {
  if (leadOneToggled != true) {
    leadOnePlayer.setVolume(0);
    leadOne.volume=0;
    $('[data-lead-one]').addClass('btn-enabled');
    leadOneToggled = true;
  }
  else {
    leadOnePlayer.setVolume(-200);
    leadOne.volume=-200;
    $('[data-lead-one]').removeClass('btn-enabled');
    leadOneToggled = false;
  }
}

function setLeadOne () {
  $('[data-lead-one]').text(leadOne.name);
  leadOnePlayer.toMaster();
  leadOnePlayer.loop = true;
  leadOnePlayer.retrigger = true;
  leadOnePlayer.sync();
  leadOnePlayer.setVolume(leadOne.volume);
}

function leadOne100 () {
  leadOnePlayer.dispose()
  leadOnePlayer = new Tone.Player();
  leadOnePlayer.load(leadOne.path_100, function() {
    setLeadOne();
    Tone.Transport.start();
  });
}

var leadTwo = new Tone.Player(audioDirectory + "lead_jingle_120.mp3", function(){
      // Loaded
      console.log('lead2 loaded');
      leadTwo.toMaster();
      leadTwo.loop = true;
    });
leadTwo.sync();

leadTwo.setVolume(-200);

var leadTwoToggled = false;
function toggleLeadTwo() {
  if (leadTwoToggled != true) {
    leadTwo.setVolume(-10);
    $('[data-lead-two]').addClass('btn-enabled');
    leadTwoToggled = true;
  }
  else {
    leadTwo.setVolume(-200);
    $('[data-lead-two]').removeClass('btn-enabled');
    leadTwoToggled = false;
  }
}

//Tone.Transport.setLoopStart(0);
//Tone.Transport.setLoopEnd(loopLength() + ":0:0");
//Tone.Transport.loop = true;
Tone.Transport.setBpm(defaultBPM);

// Debug
console.log("Transport: "+Tone.Transport.state);
console.log("Beat two: "+beatTwo.state);