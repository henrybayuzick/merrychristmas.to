<!DOCTYPE html>
<html>
	<head>
		<title>The Merry Maker - Let's Get Merry</title>

		<script src="//use.typekit.net/dlk2duf.js"></script>
        <script>try{Typekit.load();}catch(e){}</script>

        <link rel="stylesheet" href="/css/main.css">

        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />

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
	            	<a class="svg-button share-email" target="_blank" href="mailto:%20?subject=Make Your Christmas Merry!&body=I used The Merry Maker to make you a Christmas card! Check it out here: <?php echo getUrl(); ?>"></a>
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
	        <img src="/images/rsq.svg">
	        <img src="/images/gaming.svg">

	        <img src="/images/greetings/be-careful.svg">
	        <img src="/images/greetings/heres-to.svg">
	        <img src="/images/greetings/merry-christmas.svg">
	        <img src="/images/greetings/or-whatever.svg">

	        <img src="/images/card/close.svg">
	        <img src="/images/card/make-your-own-hover.svg">
	        <img src="/images/card/make-your-own.svg">
	        <img src="/images/card/share-email-hover.svg">
	        <img src="/images/card/share-email.svg">
	        <img src="/images/card/share-fb-hover.svg">
	        <img src="/images/card/share-fb.svg">
	        <img src="/images/card/share-twitter-hover.svg">
	        <img src="/images/card/share-twitter.svg">

			<img src="http://media.giphy.com/media/xOhyfTrZZzfyM/giphy.gif">
			<img src="http://media.giphy.com/media/OeoPXQPSzteiA/giphy.gif">
			<img src="http://media.giphy.com/media/LJrMjb87w16q4/giphy.gif">
			<img src="http://media.giphy.com/media/fKfz1mB6FexMY/giphy.gif">
			<img src="http://media.giphy.com/media/10swQPVv0kvqp2/giphy.gif">
			<img src="http://media.giphy.com/media/RRu9WYixQ7NEA/giphy.gif">
			<img src="http://media.giphy.com/media/riIBhPjFxCbZe/giphy.gif">
			<img src="http://media.giphy.com/media/5xtDaryAMLjvAyN4eiY/giphy.gif">
			<img src="http://media.giphy.com/media/WhH6GrITyXVpC/giphy.gif">
    	</div>

		<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    	<script src="/js/vendor/Tone.min.js"></script>
    	<script src="/js/vendor/waitForImages.js"></script>
    	<script src="/js/main.js"></script>
    	<script src="/js/card.js"></script>
	</body>
</html>