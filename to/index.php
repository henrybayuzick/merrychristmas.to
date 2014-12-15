<!DOCTYPE html>
<html>
	<head>
		<title>Merry Christmas</title>

		<script src="//use.typekit.net/dlk2duf.js"></script>
        <script>try{Typekit.load();}catch(e){}</script>

        <link rel="stylesheet" href="../css/main.css">
	</head>
	<body>
		<div data-card-id data-value="<?php echo $_GET['id'];?>"></div>

		<header>
	        <div class="ornaments"></div>
	    </header>

		<div data-loading class="screen loading">
	        <div class="screen-content wrapper">
	            <img src="../images/loader.gif">
	            <div data-loading-text>Images</div>
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

		<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    	<script src="/js/vendor/Tone.min.js"></script>
    	<script src="/js/main.js"></script>
    	<script src="/js/card.js"></script>
	</body>
</html>