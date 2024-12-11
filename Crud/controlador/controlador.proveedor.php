<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

// Manejar la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Si es una solicitud OPTIONS, simplemente devuelve un 200 OK
    http_response_code(200);
    exit();
}

require '../Dao/proveedorDao.php';
require '../Dto/proveedorDto.php';
require '../utilidades/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

// Manejo de datos de proveedor
if (isset($data['registroProveedor'])) {
    $nombre = $data['nombre'];
    $telefono = $data['telefono'];
    $email = $data['email'];
    $id_tienda = $data['id_tienda'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($registroProveedor)) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $pDto->setNombre($nombre);
    $pDto->setTelefono($telefono);
    $pDto->setEmail($email);
    $pDto->setId_tienda($id_tienda);

    $mensaje = $pDao->registrarProveedor($pDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }
} else if (isset($listar) || isset($_GET['si'])) {
    $pDao = new proveedorDao();
    $lista = $pDao->listarTodos();
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $proveedor) {
        $response[] = [
            $proveedor['idproveedor'],
            $proveedor['nombre'],
            $proveedor['telefono'],
            preg_replace('/[^\x20-\x7E]/', '', $proveedor['email']),
            $proveedor['id_tienda'],
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($_POST['registroCrud'])) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $pDto->setIdproveedor($_POST['idproveedor']);
    $pDto->setNombre($_POST['nombre']);
    $pDto->setTelefono($_POST['telefono']);
    $pDto->setEmail($_POST['email']);
    $pDto->setId_tienda($_POST['id_tienda']);

    $mensaje = $pDao->registrarProveedorCrud($pDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/proveedor/listarproveedor.php?mensaje=registro exitoso");
        exit;
    }
} else if ($_GET['idproveedor'] != null) {
    $pDao = new proveedorDao();
    $mensaje = $pDao->eliminarProveedor($_GET['idproveedor']);
    header("Location:../tablas/proveedor/listarproveedor.php?mensaje=" . $mensaje);
    exit();
} else if (isset($_POST['modificar'])) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $pDto->setIdproveedor($_POST['idproveedor']);
    $pDto->setNombre($_POST['nombre']);
    $pDto->setTelefono($_POST['telefono']);
    $pDto->setEmail($_POST['email']);
    $pDto->setId_tienda($_POST['id_tienda']);

    $mensaje = $pDao->modificarProveedor($pDto);
    header("Location:../tablas/proveedor/listarproveedor.php?mensaje=" . $mensaje);
}