// Global
startScreen = true;


var instructionsToggled = false;
$('[data-instructions]').click(function(){
  if (instructionsToggled == true) {
    $('[data-intro-text]').text('This year, we’re putting the magic of Christmas back in your hands with The Merry Maker! Just choose the music, sound effects, visuals and holiday message you like, and then enter that special someone. Once they see yours, they can do it too! It’s a ho ho ho lot of fun!');
    instructionsToggled = false;
    $('[data-instructions]').removeClass('btn-enabled');
  }
  else {
    $('[data-intro-text]').text("Start by choosing a beat and a lead then spice it up with sound effects and samples. Once you're ready, be sure to hit record, otherwise you're just pushing buttons. The Beats and Leads can be toggled on and off for more unique musical combinations. Once you've recorded something you like, choose a background and greeting  from our premade selection. All that's left is to share it!");
    instructionsToggled = true;
    $('[data-instructions]').addClass('btn-enabled');
  }
});

// Start button
$('[data-get-started]').click(function(){
	$('[data-start-screen]').addClass('hidden');
	$('[data-builder]').removeClass('hidden');
	Tone.Transport.setTransportTime("0:0:0");
	Tone.Transport.start();
  $('[data-toolbar]').css({'z-index' : '9'})
	startScreen =false;
});

function submitData() {
  var finalScore = {
    "cardData" : allData,
  }

  $.ajax({
    type: 'post',
    url: "/build.php",
    data: finalScore,
    success: function(data) {
      window.location.href = "/you/" + data + "/";
    }
  });
}

// Beats
$('[data-beat-one]').click(function() { togglePlayer(beatOne, "beats"); });
$('[data-beat-two]').click(function() { togglePlayer(beatTwo, "beats"); });
$('[data-beat-three]').click(function() { togglePlayer(beatThree, "beats"); });
$('[data-beat-four]').click(function() { togglePlayer(beatFour, "beats"); });

// Leads
$('[data-lead-one]').click(function() { togglePlayer(leadOne, "leads"); });
$('[data-lead-two]').click(function() { togglePlayer(leadTwo, "leads"); });
$('[data-lead-three]').click(function() { togglePlayer(leadThree, "leads"); });
$('[data-lead-four]').click(function() { togglePlayer(leadFour, "leads"); });

// Pad
$('[data-sample-one]').click(function()  { playSample('none', sampleOne); });
$('[data-sample-two]').click(function()  { playSample('none', sampleTwo); });
$('[data-sample-three]').click(function()  { playSample('none', sampleThree); });
$('[data-sample-four]').click(function()  { playSample('none', sampleFour); });
$('[data-sample-five]').click(function()  { playSample('none', sampleFive); });
$('[data-sample-six]').click(function()  { playSample('none', sampleSix); });
$('[data-sample-seven]').click(function()  { playSample('none', sampleSeven); });
$('[data-sample-eight]').click(function()  { playSample('none', sampleEight); });
$('[data-sample-nine]').click(function()  { playSample('none', sampleNine); });
$('[data-sample-ten]').click(function()  { playSample('none', sampleTen); });
$('[data-sample-eleven]').click(function()  { playSample('none', sampleEleven); });
$('[data-sample-twelve]').click(function()  { playSample('none', sampleTwelve); });

// Toolbar
$('[data-record]').click(function() { record(); });               // Record
$('[data-stop]').click(function() { stopRecording(); });          // Stop
$('[data-play]').click(function() { play(); });                   // Stop
$('[data-click]').click(function() { toggleMetronome(); });       // Toggle metronome
$('[data-done]').click(function() { submitData(); });

// Preview modal
$('[data-restart]').click(function() { restart(); });
$('[data-preview-next]').click(function() { submitPreview(); });

var tempoPosition = 1;
var tempos = [100,120,140,160];
changeTempo(+currentBPM);

$('[data-up-tempo]').click(function() {
  if ((audioLoaded == 8) && (isRecording != true) && (tempoPosition < (tempos.length)-1)) {
    stopEverything();

    tempoPosition++;

    currentBPM = tempos[tempoPosition];
    Tone.Transport.setBpm(currentBPM);
    Tone.Transport.setTransportTime("0:0:0");   // Set transport time back to 0:0:0

    $('[data-current-tempo]').text(currentBPM);
    changeTempo(currentBPM);
  }
});

$('[data-down-tempo]').click(function() {
  if ((audioLoaded == 8) && (isRecording != true) && (tempoPosition != 0)) {
    stopEverything();

    tempoPosition--;

    currentBPM = tempos[tempoPosition];
    Tone.Transport.setBpm(currentBPM);
    Tone.Transport.setTransportTime("0:0:0");   // Set transport time back to 0:0:0

    $('[data-current-tempo]').text(currentBPM);
    changeTempo(currentBPM);
  }
});

// BPM Selector
$('[data-bpm]').change(function () {
  stopEverything();

   // Update current BPM to selected value
  $('[data-bpm] option:selected').each(function() { currentBPM = $(this).text(); });
  Tone.Transport.setBpm(currentBPM);
  Tone.Transport.setTransportTime("0:0:0");   // Set transport time back to 0:0:0

  switch (+currentBPM) {
    case 100:
      changeTempo(100);
      break;
    case 120:
      changeTempo(120);
      break; 
    case 140:
      changeTempo(140);
      break; 
    case 160:
      changeTempo(160);
      break; 
  }
}).change();

$('[data-next-bg]').click(function(){
  if (currentBackground < (backgrounds.length)-1) {
    currentBackground++;
    changeBackground();
  } else {
    currentBackground = 0;
    changeBackground();
  }
});

$('[data-prev-bg]').click(function(){
  if (currentBackground != 0) {
    currentBackground--;
    changeBackground();
  } else {
    currentBackground = (backgrounds.length)-1;
    changeBackground();
  }
});

$('[data-next-greeting]').click(function(){
  if (currentGreeting < (greetings.length)-1) {
    currentGreeting++;
    changeGreeting();
  } else {
    currentGreeting = 0;
    changeGreeting();
  }
});

$('[data-prev-greeting]').click(function(){
  if (currentGreeting!= 0) {
    currentGreeting--;
    changeGreeting();
  } else {
    currentGreeting = (greetings.length)-1;
    changeGreeting();
  }
});