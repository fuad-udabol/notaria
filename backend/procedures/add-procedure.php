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
    isset($data->procedure_number)
    && isset($data->procedure_date)
    && isset($data->user_id)
    && isset($data->procedure_type_id)
) {
    $procedurenumber = mysqli_real_escape_string($db_conn, trim($data->procedure_number));
    $proceduredate = mysqli_real_escape_string($db_conn, trim($data->procedure_date));
    $procedureuserid = mysqli_real_escape_string($db_conn, trim($data->user_id));
    $proceduretypeid = mysqli_real_escape_string($db_conn, trim($data->procedure_type_id));
    $insertProcedure = mysqli_query($db_conn, "INSERT INTO `procedures`(`procedure_number`,`procedure_date`,`user_id`,`procedure_type_id`) VALUES('$procedurenumber','$proceduredate','$procedureuserid','$proceduretypeid')");
    if ($insertProcedure) {
        $last_id = mysqli_insert_id($db_conn);
        echo json_encode(["success" => 1, "msg" => "Procedure Inserted.", "id" => $last_id, "date"=>$proceduredate]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Procedure Not Inserted!"]);
    }
    
} else {
    echo json_encode(["success" => 0, "msg" => "Por favor ingrese los campos requeridos!"]);
}