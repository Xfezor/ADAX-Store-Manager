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

header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies

$data = json_decode(file_get_contents('php://input'), true);

// Manejo de datos de proveedor
if (isset($data['registro'])) {
    $idproveedor = $data['idproveedor'];
    $nombre = $data['nombre'];
    $telefono = $data['telefono'];
    $email = $data['email'];
    $id_tienda = $data['id_tienda'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($registro)) {
    $pvDao = new proveedorDao();
    $pvDto = new proveedorDto();
    $pvDto->setIdproveedor($idproveedor);
    $pvDto->setNombre($nombre);
    $pvDto->setTelefono($telefono);
    $pvDto->setEmail($email);
    $pvDto->setId_tienda($id_tienda);

    $mensaje = $pvDao->registrarProveedor($pvDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }
} else if (isset($listar) || isset($_GET['si'])) {
    $pvDao = new proveedorDao();
    $pvDto = new proveedorDto();
    $lista = $pvDao->listarTodos();
    $response = [];
    foreach ($lista as $proveedor) {
        $response[] = [
            $proveedor['idproveedor'],
            $proveedor['nombre'],
            $proveedor['telefono'],
            $proveedor['email'],
            $proveedor['id_tienda'],
        ];
    }
    echo json_encode($response);
    exit();
} 
  else if (isset($_POST['registroCrud'])) {
    $pvDao = new proveedorDao();
    $pvDto = new proveedorDto();
    $pvDto->setIdproveedor($_POST['idproveedor']);
    $pvDto->setNombre($_POST['nombre']);
    $pvDto->setTelefono($_POST['telefono']);
    $pvDto->setEmail($_POST['email']);
    $pvDto->setId_tienda($_POST['id_tienda']);

    $mensaje = $pvDao->registrarProveedor($pvDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/proveedor/listarproveedor.php?mensaje=registro exitoso");
        exit;
    }
} else if ($_GET['idproveedor'] != null) {
    $pvDao = new proveedorDao();
    $mensaje = $pvDao->eliminarProveedor($_GET['idproveedor']);
    header("Location:../tablas/proveedor/listarproveedor.php?mensaje=" . $mensaje);
    exit();
} else if (isset($_POST['modificar'])) {
    $pvDao = new proveedorDao();
    $pvDto = new proveedorDto();
    $pvDto->setIdproveedor($_POST['idproveedor']);
    $pvDto->setNombre($_POST['nombre']);
    $pvDto->setTelefono($_POST['telefono']);
    $pvDto->setEmail($_POST['email']);
    $pvDto->setId_tienda($_POST['id_tienda']);

    $mensaje = $pDao->modificarProveedor($pvDto);
    header("Location:../tablas/proveedor/listarproveedor.php?mensaje=" . $mensaje);
}