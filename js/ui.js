// Global
startScreen = true;

// Start button
$('[data-get-started]').click(function(){
	$('[data-start-screen]').addClass('hidden');
	$('[data-builder]').removeClass('hidden');
	Tone.Transport.setTransportTime("0:0:0");
	Tone.Transport.start();
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
      alert(data);
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
$('[data-sample-one]').click(function()  { playSample('none', sampleOne); });                     // Play Airhorn
$('[data-sample-two]').click(function()  { playSample('none', sampleTwo); });                     // Play Snare
$('[data-sample-three]').click(function()  { playSample('none', sampleThree); });                // Play Snare

// Toolbar
$('[data-record]').click(function() { record(); });               // Record
$('[data-stop]').click(function() { stopRecording(); });          // Stop
$('[data-play]').click(function() { play(); });                   // Stop
$('[data-click]').click(function() { toggleMetronome(); });       // Toggle metronome
$('[data-submit-data]').click(function() { submitData(); });

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