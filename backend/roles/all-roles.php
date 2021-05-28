<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';

$allRoles = mysqli_query($db_conn, "SELECT * FROM `roles`");
if (mysqli_num_rows($allRoles) > 0) {
    $all_Roles = mysqli_fetch_all($allRoles, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "roles" => $all_Roles]);
} else {
    echo json_encode(["success" => 0]);
}