<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
};

require '../Dao/proveedorDao.php';
require '../Dto/proveedorDto.php';
require '../utilidades/conexion.php';

header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['registro'])) {
    $idproveedor = $data['idproveedor'];
    $nombre = $data['nombre'];
    $telefono = $data['telefono'];
    $email = $data['email'];
    $id_tienda = $data['id_tienda'];
    $registro = $data['registro'];
}

if (isset($data['registroCrud'])) {
    $idproveedor = $data['idproveedor'];
    $nombre = $data['nombre'];
    $telefono = $data['telefono'];
    $email = $data['email'];
    $id_tienda = $data['id_tienda'];
    $registroCrud = $data['registroCrud'];
}

if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($data['eliminar'])) {
    $idproveedor = $data['eliminar'];
}

if (isset($data['actualizar'])) {
    $idproveedor = $data['idproveedor'];
    $nombre = $data['nombre'];
    $telefono = $data['telefono'];
    $email = $data['email'];
    $id_tienda = $data['id_tienda'];
    $actualizar = $data['actualizar'];
}

if (isset($registro) || isset($_GET['no'])) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $pDto->setidproveedor($idproveedor);
    $pDto->setnombre($nombre);
    $pDto->settelefono($telefono);
    $pDto->setemail($email);
    $pDto->setid_tienda($id_tienda);

    $mensaje = $pDao->registrarProveedor($pDto);
    if ($mensaje == "Proveedor registrado exitosamente") {
        echo json_encode(['success' => true]);
        exit;
    }
} else if (isset($listar) || isset($_GET['si'])) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $listaProveedores = $pDao->listarTodos();
    $response = [];
    foreach ($listaProveedores as $proveedor) {
        $response[] = [
            $proveedor['idproveedor'],
            $proveedor['nombre'],
            $proveedor['telefono'],
            $proveedor['email'],
            $proveedor['id_tienda']
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($registroCrud)) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $pDto->setidproveedor($idproveedor);
    $pDto->setnombre($nombre);
    $pDto->settelefono($telefono);
    $pDto->setemail($email);
    $pDto->setid_tienda($id_tienda);

    $mensaje = $pDao->registroProveedorCrud($pDto);
    if ($mensaje === 'Proveedor registrado exitosamente en CRUD') {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'mensaje' => $mensaje]);
    }
    exit();
} else if (isset($idproveedor)) {
    $pDao = new proveedorDao();
    $mensaje = $pDao->eliminarProveedor($idproveedor);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
} else if (isset($actualizar)) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $pDto->setidproveedor($idproveedor);
    $pDto->setnombre($nombre);
    $pDto->settelefono($telefono);
    $pDto->setemail($email);
    $pDto->setid_tienda($id_tienda);

    $mensaje = $pDao->modificarProveedor($pDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
}
?>
