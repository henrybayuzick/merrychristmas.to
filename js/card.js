function createCard() {
  console.log('Creating card at' + allCardData.bpm);

  // Make sure timeline is clear and everything is stopped
  Tone.Transport.clearTimelines();
  stopEverything();

  // Set BPM from data and make sure transport is at beginning
  currentBPM = allCardData.bpm;
  Tone.Transport.setBpm(currentBPM);
  Tone.Transport.setTransportTime("0:0:0");   // Set transport time back to 0:0:0

  // Set all player scores from data
  // TODO: check if score exists, if it doesn't, don't do it
  for (var i = 0; i < numberOfPlayers; i++) {
    if (allCardData.players[i].on_score) {
      players[i].playerDetails.on_score = allCardData.players[i].on_score;
    }
    if (allCardData.players[i].off_score) {
      players[i].playerDetails.off_score = allCardData.players[i].off_score;
    }
  }

  // Set up all the player timelines
  for (var i = 0; i < numberOfPlayers; i++) {
    setPlayerTimelines(players[i]);
  }

  // Parse notes from data
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