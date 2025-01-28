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
    $registro = $data['registro'];
}
    if (isset($data ['registroCrud'])) {
    $id_Rol = $data['id_Rol'];
    $nombreRol = $data['nombreRol'];    
    $descripcion = $data['descripcion'];
    $registroCrud = $data['registroCrud'];
}

if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset( $data['eliminar'])) {
    $idRol = $data['eliminar'];
}

if (isset($data['actualizar'])) {
    $id_Rol = $data['id_Rol'];
    $nombreRol = $data['nombreRol'];
    $descripcion = $data['descripcion'];
    $actualizar = $data['actualizar'];
}


if (isset($registro) || isset($_GET['no'])) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setid_Rol($id_Rol);
    $rDto->setnombreROL($nombreRol);
    $rDTo->setdescripcion($descripcion);

    $mensaje = $rDao->registrarRol($rDto);
    if ($mensaje == "Rol Registrado con exito") {
        echo json_encode(['success' => true]);
        exit;
    }
} else if (isset($listar) || isset($GET['si'])) {
    $rDao = new rolDao;
    $rDto = new rolDto;
    $listaRoles = $rDao->listarTodos();
    $response = [];
    foreach ($listaRoles as $rol) {
        $response[] = [
            $rol ['id_Rol'],
            $rol ['nombreRol'],
            $rol ['descripcion']
        ];
    }
    echo json_encode($response);
    exit();

}  else if (isset($registroCrud)) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setId_Rol($id_Rol);
    $rDto->setnombreROL($nombreRol);
    $rDto->setdescripcion($descripcion);

    $mensaje = $rDao->registroRolCrud($rDto);
    if ($mensaje === 'Rol registrado con exito') {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'mensaje' => $mensaje]);
    }
    exit();
} else if (isset($idRol)) {
    $rDao = new rolDao();
    $mensaje = $rDao->eliminarRol($idRol);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
} else if (isset($actualizar)) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setId_Rol($id_Rol);
    $rDto->setnombreRol($nombreRol);
    $rDto->setdescripcion($descripcion);

    $mensaje = $rDao->modificarRol(rolDto: $rDto);
    echo json_encode( ['respuesta' => true, 'mensaje' => $mensaje]);
}