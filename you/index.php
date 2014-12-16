<!DOCTYPE html>
<html>
	<head>
		<title>The Merry Maker - Let’s Get Merry</title>

		<script src="//use.typekit.net/dlk2duf.js"></script>
        <script>try{Typekit.load();}catch(e){}</script>

        <link rel="stylesheet" href="/css/main.css">
	</head>
	<body>
		<div data-card-id data-value="<?php if($_GET['you']) { echo $_GET['you']; } else { echo -1; } ?>"></div>
		<?php function getUrl() {
		  $url  = @( $_SERVER["HTTPS"] != 'on' ) ? 'http://'.$_SERVER["SERVER_NAME"] :  'https://'.$_SERVER["SERVER_NAME"];
		  //$url .= ( $_SERVER["SERVER_PORT"] !== 80 ) ? ":".$_SERVER["SERVER_PORT"] : "";
		  $url .= $_SERVER["REQUEST_URI"];
		  return $url;
		}
		?>

		<header>
	        <div class="ornaments"></div>
	    </header>

		<div data-loading class="screen loading">
	        <div class="screen-content wrapper">
	            <img src="/images/loader.gif">
	            <div data-loading-text>Please wait</div>
	        </div>
    	</div>

    	<div data-overlay class="overlay hidden"></div>
	    <div data-rationale-modal class="modal hidden">
	    	<a data-close-modal class="svg-button close"></a>
	    	<p class="pb2">
	        	<a href="http://rsq.com/" target="_blank" class="display-inline-block vertical-middle rsq mr1"></a>
	        	<a href="http://redsquaregaming.com/" target="_blank" class="display-inline-block vertical-middle gaming ml1"></a>
	        </p>
	        <p>This Holiday Season saw the first collaboration between Red Square Gaming and RSQ on a single project: the agency Christmas card. After weeks of concepting, designing and HR mediation, we realized that the true meaning of Christmas is compromise. And unto us that day The Merry Maker was born. </p>
	        <p>Built with <a href="https://github.com/TONEnoTONE/Tone.js/" target="_blank">Tone.js</a>. Music by <a href="https://soundcloud.com/herkondabeat" target="_blank">Zach Gill</a>.</p>
	    </div>

    	<section data-card-bg class="card-bg screen">
	        <div class="screen-content wrapper">
	            <div data-greeting class="greetings"></div>
	            <div class="mt3 mb3">
	            	<a href="https://twitter.com/intent/tweet?url=<?php echo getUrl(); ?>&text=Merry Christmas!&hashtags=themerrymaker" target="_blank" data-share-twitter class="svg-button share-twitter"></a>
	            	<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo getUrl(); ?>" target="_blank" data-share-fb class="svg-button share-fb"></a>
	            	<a class="svg-button share-email" target="_blank" href="mailto:%20?subject=Merry Christmas!&body=<?php echo getUrl(); ?>"></a>
	            </div>
	           	<div>
                	<a href="/" data-make-your-own class="svg-button make-your-own"></a>
            	</div>
	        </div>
	        <div class="bg-overlay"></div>
    	</section>

    	<section class="credit">
    		<a href="http://www.redsquareagency.com" target="_blank">A Red Square Agency Project</a>
    	</section>

    	<section class="other">
    		<a data-mute class="pr1">Mute</a>
    		<a data-rationale>Info</a>
    	</section>

    	<div class="preload hidden">
	        <img src="/images/ornaments.svg">
	        <img src="/images/themerrymaker.svg">
	        <img src="/images/start/start.svg">
	        <img src="/images/start/start-hover.svg">
	        <img src="/images/start/how-to.svg">
	        <img src="/images/start/how-to-hover.svg">
	        <img src="/images/soundboard/choose-a-beat.svg">
	        <img src="/images/soundboard/choose-a-lead.svg">
	        <img src="/images/soundboard/wrap-beat-hover.svg">
	        <img src="/images/soundboard/slay-music-hover.svg">
	        <img src="/images/soundboard/indie-clause-hover.svg">
	        <img src="/images/soundboard/drumkitmas-hover.svg">
	        <img src="/images/soundboard/elves-2-men-hover.svg">
	        <img src="/images/soundboard/smells-like-hover.svg">
	        <img src="/images/soundboard/mr-tannen-hover.svg">
	        <img src="/images/soundboard/all-i-want-hover.svg">
	        <img src="/images/soundboard/bah-humbug-hover.svg">
	        <img src="/images/soundboard/put-that-cookie-hover.svg">
	        <img src="/images/soundboard/merry-xmas-you-hover.svg">
	        <img src="/images/soundboard/joy-to-the-hover.svg">
	        <img src="/images/soundboard/sleigh-bells-hover.svg">
	        <img src="/images/soundboard/fa-la-la-hover.svg">
	        <img src="/images/soundboard/fog-horn-hover.svg">
	        <img src="/images/soundboard/gun-shot-hover.svg">
	        <img src="/images/soundboard/ho-ho-ho-hover.svg">
	        <img src="/images/soundboard/merry-christmas-hover.svg">
	        <img src="/images/soundboard/youll-shoot-hover.svg">
	        <img src="/images/soundboard/santa-omg-hover.svg">
	        <img src="/images/soundboard/next-hover.svg">
	        <img src="/images/change-bg/next-bg-hover.svg">
	        <img src="/images/change-bg/prev-bg-hover.svg">
	        <img src="/images/change-bg/done-hover.svg">
    	</div>

		<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    	<script src="/js/vendor/Tone.min.js"></script>
    	<script src="/js/vendor/waitForImages.js"></script>
    	<script src="/js/main.js"></script>
    	<script src="/js/card.js"></script>
	</body>
</html>