startScreen = false;
cardScreen = true;

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

  // Set background
  currentBackground = allCardData.background;
  changeBackground();

  // Set greeting
  currentGreeting = allCardData.greeting;
  changeGreeting();

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

var muted = false;
$('[data-mute]').click(function(){
  if (muted == false) {
    Tone.Master.mute(1)
    muted = true;
    $(this).text('Unmute');
  }
  else {
    Tone.Master.mute(0)
    muted = false;
    $(this).text('Mute');
  }
});

$(document).mouseup(function (e) {
    var container = $('[data-rationale-modal]');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('[data-rationale-modal]').addClass('hidden');
        $('[data-overlay]').addClass('hidden');
    }
});

$('[data-close-modal]').click(function() {
  $('[data-rationale-modal]').addClass('hidden');
  $('[data-overlay]').addClass('hidden');
});

$('[data-rationale]').click(function(){
  $('[data-rationale-modal]').removeClass('hidden');
  $('[data-overlay]').removeClass('hidden');
});