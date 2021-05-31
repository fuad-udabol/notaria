<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require '../db_connection.php';

$data = json_decode(file_get_contents("php://input"));
$startDate = mysqli_real_escape_string($db_conn, trim($data->startDate));
$endDate = mysqli_real_escape_string($db_conn, trim($data->endDate));
if (isset($data->user_id)) {
    $userid = mysqli_real_escape_string($db_conn, trim($data->user_id));
    $allProcedures = mysqli_query($db_conn, "SELECT t.name, t.id, COUNT(*) as count, sum(t.price) as price FROM procedures p, procedure_types t WHERE  t.id = p.procedure_type_id AND p.autor_id = $userid AND p.procedure_date <= $endDate AND p.procedure_date >= $startDate GROUP BY t.id");
} else {
    $allProcedures = mysqli_query($db_conn, "SELECT t.name, t.id, COUNT(*) as count, sum(t.price) as price FROM procedures p, procedure_types t WHERE  t.id = p.procedure_type_id AND p.procedure_date <= $endDate AND p.procedure_date >= $startDate GROUP BY t.id");
}
if (mysqli_num_rows($allProcedures) > 0) {
    $allProcedures = mysqli_fetch_all($allProcedures, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "procedures" => $allProcedures]);
} else {
    echo json_encode(["success" => 3]);
}