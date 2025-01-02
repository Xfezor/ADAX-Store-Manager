<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
};

require '../Dao/rolDao.php';
require '../Dto/rolDto.php';
require '../utilidades/conexion.php';

header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies


$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['registro'])) {
    $id_Rol = $data['id_Rol'];
    $nombreRol = $data['nombreRol'];
    $descripcion = $data['descripcion'];
}

if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($registrarRol)) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setid_Rol($id_Rol);
    $rDto->setnombreROL($nombreRol);
    $rDTo->setdescripcion($descripcion);

    $mensaje = $rDao->registrarRol($rDto);
    echo $mensaje;
    if ($mensaje == 'Registrado exitosamente') {
        header("Location:../tablas/roles/listaroles.php?mensaje=" . $mensaje);
        exit;
    }
} else if (isset($listar) || isset($GET['si'])) {
    $rDao = new rolDao;
    $rDto = new rolDto;
    $lista = $rDao->listarTodos();
    $response = [];
    foreach ($lista as $rol) {
        $response[] = [
            $rol ['id_Rol'],
            $rol ['nombreRol'],
            $rol ['descripcion']
        ];
    }
    echo json_encode($response);
    exit();

} else if (isset($_POST['registroRolCrud'])) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setId_Rol($_POST['id_Rol']);
    $rDto->setnombreROL($_POST['nombreRol']);
    $rDto->setdescripcion($_POST['descripcion']);

    $mensaje = $rDao->registroRolCrud($rDto);
    echo $mensaje;
    if ($mensaje === 'Rol registrado con exito') {
        header("Location:../tablas/roles/listaroles.php?mensaje=".$mensaje);
        exit;
    }
} else if ($_GET['id_Rol'] != null) {
    $rDao = new rolDao();
    $mensaje = $rDao->eliminarRol($_GET['id_Rol']);
    header("Location:../tablas/roles/listaroles.php?mensaje=" . $mensaje);
    exit;
} else if (isset($_POST['modificar'])) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setId_Rol($_POST['id_Rol']);
    $rDto->setnombreRol($_POST['nombreRol']);
    $rDto->setdescripcion($_POST['descripcion']);

    $mensaje = $rDao->modificarRol($rDto);
    header("Location:../tablas/roles/listaroles.php?mensaje=" . $mensaje);
}