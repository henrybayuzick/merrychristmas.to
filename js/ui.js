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

// Beats
$('[data-beat-one]').click(function() { togglePlayer(beatOne, "beats"); });
$('[data-beat-two]').click(function() { togglePlayer(beatTwo, "beats"); });

// Leads
$('[data-lead-one]').click(function() { togglePlayer(leadOne, "leads"); });
$('[data-lead-two]').click(function() { togglePlayer(leadTwo, "leads"); });

// Pad
$('[data-kick]').click(function()  { playKick(); });              // Play Kick
$('[data-snare]').click(function()  { playSnare(); });            // Play Snare
$('[data-hat]').click(function()  { playHat(); });                // Play Snare

// Toolbar
$('[data-record]').click(function() { record(); });               // Record
$('[data-stop]').click(function() { stopRecording(); });          // Stop
$('[data-play]').click(function() { play(); });                   // Stop
$('[data-click]').click(function() { toggleMetronome(); });       // Toggle metronome

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
  }

  setTimeout(function() { if (startScreen != true) { Tone.Transport.start(); }}, 500);

}).change();