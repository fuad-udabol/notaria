<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';

// $allProcedures = mysqli_query($db_conn, "SELECT * FROM `procedures`");
$allProcedures = mysqli_query($db_conn, "SELECT p.id, t.name, u.user_name, u.user_last_name, p.procedure_number, p.procedure_date, t.price FROM procedures p, users u, procedure_types t WHERE p.user_id = u.id AND t.id = p.procedure_type_id");
if (mysqli_num_rows($allProcedures) > 0) {
    $allProcedures = mysqli_fetch_all($allProcedures, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "procedures" => $allProcedures]);
} else {
    echo json_encode(["success" => 0]);
}