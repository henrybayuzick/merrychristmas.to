
// Sampler/Pad
var kick = {
	data: "[data-kick]",
	name: "Kick",
	path: "kick.mp3"
};

var snare = {
	data: "[data-snare]",
	name: "Snare",
	path: "snare.mp3"
};

var hat = {
      data: "[data-hat]",
      name: "Hi-Hat",
      path: "hat.mp3"
};

samples = [kick, snare, hat];

var channels = [];

for (i=0; i < numberOfSamples; i++) {
      var index = i;
      (function(index) {
      	var path = audioDirectory + samples[index].path;
      	var data = samples[index].data;
      	var name = samples[index].name;

            channels[index] = new Tone.Sampler(path, function() {
                  $(data).html(name+'<br/>'+index);
            });

            channels[index].toMaster();

      })(i);
};

var snareScore = []
function playSnare(keyPress) {
		if (keyPress == 'down') {
			channels[1].triggerAttack();
			$('[data-snare]').addClass('btn-enabled');

                  if (isRecording == true) {
                        if (snareScore.indexOf(Tone.Transport.getTransportTime()) == -1) {
                              snareScore.push(Tone.Transport.getTransportTime());
                        }
                        console.log(snareScore);
                  }	
		}
		else if (keyPress == 'up')
			$('[data-snare]').removeClass('btn-enabled');
		else {
			channels[1].triggerAttack();
                  if (isRecording == true) {
                        if (snareScore.indexOf(Tone.Transport.getTransportTime()) == -1) {
                              snareScore.push(Tone.Transport.getTransportTime());
                        }
                        console.log(snareScore);
                  }     
		}
};

var kickScore = []
function playKick(keyPress) {
            if (keyPress == 'down') {
                  channels[0].triggerAttack();
                  $('[data-kick]').addClass('btn-enabled'); 
                  if (isRecording == true) {
                        if (kickScore.indexOf(Tone.Transport.getTransportTime()) == -1) {
                              kickScore.push(Tone.Transport.getTransportTime());
                        }
                        console.log(kickScore);
                  }     
            }
            else if (keyPress == 'up')
                  $('[data-kick]').removeClass('btn-enabled');
            else {
                  channels[0].triggerAttack();
                  if (isRecording == true) {
                        if (kickScore.indexOf(Tone.Transport.getTransportTime()) == -1) {
                              kickScore.push(Tone.Transport.getTransportTime());
                        }
                        console.log(kickScore);
                  }
            }
};

var hatScore = []
function playHat(keyPress) {
            if (keyPress == 'down') {
                  channels[2].triggerAttack();
                  $('[data-hat]').addClass('btn-enabled');
                  if (isRecording == true) {
                        if (hatScore.indexOf(Tone.Transport.getTransportTime()) == -1) {
                              hatScore.push(Tone.Transport.getTransportTime());
                        }
                        console.log(hatScore);
                  }    
            }
            else if (keyPress == 'up')
                  $('[data-hat]').removeClass('btn-enabled');
            else {
                  channels[2].triggerAttack();
                  if (isRecording == true) {
                        if (hatScore.indexOf(Tone.Transport.getTransportTime()) == -1) {
                              hatScore.push(Tone.Transport.getTransportTime());
                        }
                        console.log(hatScore);
                  }
            }
};

// Key presses down
$(window).keydown(function(e) {
	var key = e.which;
	switch (key) {
       	case 49:
       		playKick('down');
       		break;
       	case 50:
       		playSnare('down');
       		break;
       	case 51:
       		playHat('down');
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
       		playKick('up');
       		break;
       	case 50:
       		playSnare('up');
       		break;
       	case 51:
       		playHat('up');
       		break;
       	case 52:
       		rim();
       		break;
       	case 53:
       		beatOne();
       		break;
   }
});


function resetScores() {
      kickScore = [];
      snareScore = [];
      hatScore = [];
}

var recordingInterval = 0;

function record() {
      if (!(isRecording == true)) {
            Tone.Transport.setTransportTime(0);

            if (metronomeState == "off") toggleMetronome();

            var countdown = 4;
            countdownInterval = Tone.Transport.setInterval(function() {
                  if (countdown > 0) {
                        $('[data-record-label]').html(countdown);
                        countdown = countdown-1;
                  }

                  if (countdown == 0) {
                        Tone.Transport.clearInterval(countdownInterval);
                        recording();
                  }
            },"0:1:0");
      }
}

function recording() {
      resetProgressBar();
      resetScores();

      recordingInterval = Tone.Transport.setInterval(function() {
            if (currentProgress == 0) {
                  isRecording = true;
                  Tone.Transport.setTransportTime(0);

                  $('[data-record-label]').html("Rec");
                  $('[data-record]').find('.icon').addClass('recording');
                  $('[data-current-progress]').addClass('recording');
                  $('[data-stop]').removeClass('disabled');
                  $('[data-tempo-selector]').prop('disabled', true);
            }
            updateProgressBar(16)
      },"0:0:1");
}

function stopRecording() {
      if (isRecording == true) {
            isRecording = false;
            $('[data-record]').find('.icon').removeClass('recording');
            $('[data-stop]').addClass('disabled');
            $('[data-current-progress]').removeClass('recording');

            Tone.Transport.clearInterval(recordingInterval);
            resetProgressBar()
            toggleMetronome();
            $('[data-tempo-selector]').prop('disabled', false);
            $('[data-play]').removeClass('disabled');

            

      } else {
          Tone.Note.unroute();  
      }
}

function play() {
            Tone.Transport.setTransportTime(0);
            var score = {
                  "kick" : kickScore,
                  "snare" : snareScore,
                  "hat" : hatScore
            }

            finalScore = Tone.Note.parseScore(score);

            Tone.Note.route("kick", function(time) {
                  channels[0].triggerAttack(0, time);
            });

            Tone.Note.route("snare", function(time) {
                  channels[1].triggerAttack(0, time);
            });

             Tone.Note.route("hat", function(time) {
                  channels[2].triggerAttack(0, time);
            });
}

function updateProgressBar(time) {
      var totalLength = (loopLength()*time)-1;
      var progressIncrement = 100/totalLength;

      console.log("Time: " + Tone.Transport.getTransportTime());
      console.log("Width: " + curentWidth);
      console.log("Progress: " + currentProgress + "/" + totalLength);

      if (currentProgress < totalLength) {
            curentWidth += progressIncrement;
            $('[data-current-progress]').css({"width": curentWidth + "%"  });
      }

      else {
            curentWidth = 0;
            currentProgress = 0;
            $('[data-current-progress]').css({"width": curentWidth + "%"  });

            if (isRecording == true) {
                 stop();
            }
      }

      currentProgress++;
}

function resetProgressBar() {
      currentProgress = 0;
      curentWidth = 0;
      $('[data-current-progress]').css({"width": curentWidth + "%"  });
}