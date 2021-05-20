<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';

// $allProcedures = mysqli_query($db_conn, "SELECT * FROM `procedures`");
$allProcedures = mysqli_query($db_conn, "SELECT * FROM procedure_types");
if (mysqli_num_rows($allProcedures) > 0) {
    $allProcedures = mysqli_fetch_all($allProcedures, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "procedure_types" => $allProcedures]);
} else {
    echo json_encode(["success" => 0]);
}