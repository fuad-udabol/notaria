<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->user_email)
    && isset($data->password)
) {
    $useremail = mysqli_real_escape_string($db_conn, trim($data->user_email));
    $userpassword = mysqli_real_escape_string($db_conn, trim($data->password));
    $allUsers = mysqli_query($db_conn, "SELECT * FROM `users` WHERE `user_email` = '$useremail' AND `password`='$userpassword'");

    if (mysqli_num_rows($allUsers) > 0) {
        $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
        echo json_encode(["success" => 1, "user" => $all_users]);
    } else {
        echo json_encode(["success" => 0]);
    }
}