<?php
header("Content-Type: text/html");
$json_object_get = $_POST['cardID'];

//echo $json_object_get;

$dbHost = 'localhost';
$dbName = 'christmas';
$dbUser = 'root';
$dbPass = 'root';

$mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

if ($mysqli->connect_errno) {
	echo "Connection failed";
}

$jsonString = json_encode($json_object);

$stmt = "SELECT * FROM cards WHERE card_id = $json_object_get";
$results = $mysqli->query($stmt);

$row=$results->fetch_array();
echo $row['score'];

// $stmt->bind_param('s', $json_object);
// if($stmt->execute()){
// 	echo "Success";
// }
// else {
// 	echo "Fail";
// }

// $stmt->close();