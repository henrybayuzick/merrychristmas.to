startScreen = false;

// If playback page
card = {
  "cardID" : $('[data-card-id]').data('value'),
}

var allScores = {}
function fetchData() {
  $.ajax({
    type: 'POST',
    url: "/show.php",
    data: card,
    success: function(data) {
      allCardData = JSON.parse(data)
      createCard();
    }
  });
}

fetchData();

function createCard() {
  console.log('Creating card at ' + allCardData.bpm + " BPM");

  // Make sure timeline is clear and everything is stopped
  Tone.Transport.clearTimelines();
  stopEverything();

  // Set BPM from data and make sure transport is at 0:0:0
  currentBPM = allCardData.bpm;
  Tone.Transport.setBpm(currentBPM);
  Tone.Transport.setTransportTime("0:0:0");

  // Set all player scores from data
  for (var i = 0; i < numberOfPlayers; i++) {
    if (allCardData.players) {
      if (allCardData.players[i]) {
        players[i].playerDetails.on_score = allCardData.players[i].on_score;
        players[i].playerDetails.off_score = allCardData.players[i].off_score;

        setPlayerTimelines(players[i]);
      }
    }
  }

  // Parse multisampler notes from data
  Tone.Note.parseScore(allCardData.multiSampler);

  // Route notes
  Tone.Note.route("kick", function(time) {
    sampler.triggerAttack("kick");
  });

  Tone.Note.route("snare", function(time) {
    sampler.triggerAttack("snare");
  });

  Tone.Note.route("hat", function(time) {
    sampler.triggerAttack("hi-hat");
  });

  // Set all the players at current BPM
  changeTempo(+currentBPM);
}