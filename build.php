<?php
$json_object = $_POST['cardData'];

$dbHost = 'localhost';
$dbName = 'christmas';
$dbUser = 'root';
$dbPass = 'root';

$mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

if ($mysqli->connect_errno) {
	echo "Connection failed";
}

$jsonString = json_encode($json_object);

$stmt = "INSERT INTO cards (score) VALUES('$jsonString')";

$mysqli->query($stmt);

echo $mysqli->insert_id;

//echo json_encode(var_dump($json_object));

// $stmt->bind_param('s', $json_object);
// if($stmt->execute()){
// 	echo "Success";
// }
// else {
// 	echo "Fail";
// }

// $stmt->close();