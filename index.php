<!DOCTYPE html>
<html>
	<head>
		<title>Merry Christmas</title>

		<script src="//use.typekit.net/dlk2duf.js"></script>
        <script>try{Typekit.load();}catch(e){}</script>

        <link rel="stylesheet" href="../css/main.css">
	</head>
	<body>
		<div data-card-id data-value="<?php if($_GET['id']) { echo $_GET['id']; } else { echo -1; } ?>"></div>

		<header>
	        <div class="ornaments"></div>
	    </header>

		<div data-loading class="screen loading">
	        <div class="screen-content wrapper">
	            <img src="../images/loader.gif">
	            <div data-loading-text>Loading</div>
	        </div>
    	</div>

    	<section data-card-bg class="card-bg screen">
	        <div class="screen-content wrapper">
	            <div class="greetings">
	                <img data-greeting src="" height="350">
	            </div>
	            <div class="mt3 mb3">
	            	<a href="#" data-share-twitter class="svg-button share-twitter"></a>
	            	<a href="#" data-share-fb class="svg-button share-fb"></a>
	            </div>
	           	<div>
                	<a href="/" data-make-your-own class="svg-button make-your-own"></a>
            	</div>
	        </div>
	        <div class="bg-overlay"></div>
    	</section>

    	<div class="preload hidden">
	        <img src="../images/ornaments.svg">
	        <img src="../images/themerrymaker.svg">
	        <img src="../images/start/start.svg">
	        <img src="../images/start/start-hover.svg">
	        <img src="../images/start/how-to.svg">
	        <img src="../images/start/how-to-hover.svg">
	        <img src="../images/soundboard/choose-a-beat.svg">
	        <img src="../images/soundboard/choose-a-lead.svg">
	        <img src="../images/soundboard/wrap-beat-hover.svg">
	        <img src="../images/soundboard/slay-music-hover.svg">
	        <img src="../images/soundboard/indie-clause-hover.svg">
	        <img src="../images/soundboard/drumkitmas-hover.svg">
	        <img src="../images/soundboard/elves-2-men-hover.svg">
	        <img src="../images/soundboard/smells-like-hover.svg">
	        <img src="../images/soundboard/mr-tannen-hover.svg">
	        <img src="../images/soundboard/all-i-want-hover.svg">
	        <img src="../images/soundboard/bah-humbug-hover.svg">
	        <img src="../images/soundboard/put-that-cookie-hover.svg">
	        <img src="../images/soundboard/merry-xmas-you-hover.svg">
	        <img src="../images/soundboard/joy-to-the-hover.svg">
	        <img src="../images/soundboard/sleigh-bells-hover.svg">
	        <img src="../images/soundboard/fa-la-la-hover.svg">
	        <img src="../images/soundboard/fog-horn-hover.svg">
	        <img src="../images/soundboard/gun-shot-hover.svg">
	        <img src="../images/soundboard/ho-ho-ho-hover.svg">
	        <img src="../images/soundboard/merry-christmas-hover.svg">
	        <img src="../images/soundboard/youll-shoot-hover.svg">
	        <img src="../images/soundboard/santa-omg-hover.svg">
	        <img src="../images/soundboard/next-hover.svg">
	        <img src="../images/change-bg/next-bg-hover.svg">
	        <img src="../images/change-bg/prev-bg-hover.svg">
	        <img src="../images/change-bg/done-hover.svg">
    	</div>

		<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    	<script src="/js/vendor/Tone.min.js"></script>
    	<script src="/js/main.js"></script>
    	<script src="/js/card.js"></script>
	</body>
</html>