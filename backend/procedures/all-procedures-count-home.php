<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';

// $allProcedures = mysqli_query($db_conn, "SELECT * FROM `procedures`");
$allProcedures = mysqli_query($db_conn, "SELECT t.name, t.id, COUNT(*) as count FROM procedures p, procedure_types t WHERE  t.id = p.procedure_type_id GROUP BY t.id");
if (mysqli_num_rows($allProcedures) > 0) {
    $allProcedures = mysqli_fetch_all($allProcedures, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "procedures" => $allProcedures]);
} else {
    echo json_encode(["success" => 0]);
}