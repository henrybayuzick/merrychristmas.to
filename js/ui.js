// Global
startScreen = true;

$('[data-get-started]').click(function(){
	$('[data-start-screen]').addClass('hidden');
	$('[data-builder]').removeClass('hidden');
	Tone.Transport.setTransportTime("0:0:0");
	Tone.Transport.start();
	startScreen =false;
});