<html>
	<head>
	</head>
	<body>
	<div data-crapola data-value="<?php echo $_GET['id'];?>"></div>
	<div>Hey</div>
	<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="../js/vendor/Tone.min.js"></script>
    <script type="text/javascript"  src "/js/show.js"></script>
    <script>
	var card_id = {
 		"cardID" : $('[data-crapola]').data('value'),
	}

	var obj = {}
	function fetchData() {
	  $.ajax({
	    type: 'POST',
	    url: "/show.php",
	    data: card_id,
	    success: function(data) {
	      alert(data);
	      obj = JSON.parse(data)
	    }
	  });
	}

	fetchData();

    </script>
	</body>
</html>