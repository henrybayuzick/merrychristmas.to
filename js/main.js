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
}, function(){
      console.log('metronome loaded'); // DEBUG
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

      console.log(high); // DEBUG
      console.log(low); // DEBUG

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
var beatTwo = {
  "name" : "Rock beat",
  "url_100" : audioDirectory + "beat_jingle_100.mp3",
  "url_120" : audioDirectory + "beat_jingle_120.mp3",
  "volume" : -200,
}

var beatTwoPlayer = new Tone.Player();

function setBeatTwoPlayer () {
  Tone.Transport.setTimeline(function(time){ beatTwoPlayer.start(time); }, "0:0:0");
  Tone.Transport.setTimeline(function(time){ beatTwoPlayer.stop(time); }, bars-2 + ":3:0"); // Make sure it is stopped right before you start it again
  beatTwoPlayer.toMaster();
  beatTwoPlayer.setVolume(beatTwo.volume);
}

var beatTwoToggled = false;
function toggleBeatTwo() {
  if (beatTwoToggled != true) {
    beatTwoPlayer.setVolume(-10);
    beatTwo.volume = -10;
    $('[data-beat-two]').addClass('btn-enabled');
    beatTwoToggled = true;
  }
  else {
    beatTwoPlayer.setVolume(-200);
    beatTwo.volume = -200;
    $('[data-beat-two]').removeClass('btn-enabled');
    beatTwoToggled = false;
  }
}

// BPM Selector
$('[data-bpm]').change(function () {
  // Stop everything that is playing
  Tone.Transport.stop();
  beatTwoPlayer.stop();

   // Update current BPM to selected value
  $('[data-bpm] option:selected').each(function() { currentBPM = $(this).text(); });
  Tone.Transport.setBpm(currentBPM);

  // Set transport time back to 0:0:0
  Tone.Transport.setTransportTime("0:0:0");

    if (currentBPM == 100) {
      // Dispose of old players
      beatTwoPlayer.dispose();

      // Load all files at 100 BPM
      beatTwoPlayer = new Tone.Player(beatTwo.url_100, function() { console.log('Beat 2 100 Loaded'); });

      // Run default tasks for each player
      setBeatTwoPlayer(); // Sets timeline, connects to master, sets volume

      setTimeout(function() {
         Tone.Transport.start();
      }, 500);


    } else if (currentBPM == 120) {
      // Dispose of old players
      beatTwoPlayer.dispose();

      // Load all files at 120 BPM
      beatTwoPlayer = new Tone.Player(beatTwo.url_120, function() { console.log('Beat 2 120 Loaded'); });

      // Run default tasks for each player
      setBeatTwoPlayer(); // Sets timeline, connects to master, sets volume

      setTimeout(function() {
        if (startScreen != true) {
         Tone.Transport.start();
        }
      }, 500);
    }
    
}).change();

$('[data-update-bpm]').click(function(){ Tone.Transport.start(); })   // Start transport again


/* GUI */

// Toolbar
$('[data-record]').click(function() { record(); });               // Record
$('[data-stop]').click(function() { stopRecording(); });                   // Stop
$('[data-play]').click(function() { play(); });                   // Stop
$('[data-click]').click(function() { toggleMetronome(); });       // Toggle metronome

// Beats
$('[data-beat-one]').click(function() { toggleBeatOne(); });
$('[data-beat-two]').click(function() { toggleBeatTwo(); });

// Leads
$('[data-lead-one]').click(function() { toggleLeadOne(); });
$('[data-lead-two]').click(function() { toggleLeadTwo(); });

// Pad
$('[data-kick]').click(function()  { playKick(); });              // Play Kick
$('[data-snare]').click(function()  { playSnare(); });            // Play Snare
$('[data-hat]').click(function()  { playHat(); });            // Play Snare