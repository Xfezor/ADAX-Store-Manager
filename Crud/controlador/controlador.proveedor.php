<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, PUT, OPTIONS"); // Métodos permitidos
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

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['listar'])) {
            $listar = $_GET['listar'];
        } else if (isset($_GET['listarPorTienda'])) {
            $listarPorTienda = $_GET['listarPorTienda'];
            $codigo_invitacion = $_GET['codigo_invitacion'];
        } else if (isset($_GET['listarProductos'])){
            $listarProductos = $_GET['listarProductos'];
            $idproveedor = $_GET['idproveedor'];
        } else if (isset($_GET['listarNombreID'])) {
            $listarNombreID = $_GET['listarNombreID'];
            $codigo_invitacion = $_GET['codigo_invitacion'];
        }
        break;
    case 'POST':
        if (isset($data['registro'])) {
            $idproveedor = $data['idproveedor'];
            $nombre = $data['nombre'];
            $telefono = $data['telefono'];
            $email = $data['email'];
            $id_tienda = $data['id_tienda'];
            $registro = $data['registro'];
        } else if (isset($data['registroCrud'])) {
            $idproveedor = $data['idproveedor'];
            $nombre = $data['nombre'];
            $telefono = $data['telefono'];
            $email = $data['email'];
            $id_tienda = $data['id_tienda'];
            $registroCrud = $data['registroCrud'];
        }
        else if (isset($data['agregarProveedor'])){
            $nombre = $data['nombre'];
            $telefono = $data['telefono'];
            $email = $data['email'];
            $codigo_invitacion = $data['codigo_invitacion'];
            $agregarProveedor = $data['agregarProveedor'];
        }
        break;
    case 'PUT':
        if (isset($data['actualizar'])) {
            $idProveedor = $data['idproveedor'];
            $nombre = $data['nombre'];
            $telefono = $data['telefono'];
            $email = $data['email'];
            $id_tienda = $data['id_tienda'];
            $actualizar = $data['actualizar'];
        }
        break;
    case 'DELETE':
        if (isset($_GET['eliminar'])) {
            $idproveedor = $_GET['eliminar'];
        }
        break;
    default:
        break;
}


if (isset($registro)) {
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
}
else if (isset($agregarProveedor)) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $pDto->setNombre($nombre);
    $pDto->setTelefono($telefono);
    $pDto->setEmail($email);

    $mensaje = $pDao->añadirProveedorTienda($pDto, $codigo_invitacion);
    echo json_encode(['success' => true, 'mensaje' => $mensaje]);
    exit();
}
 else if (isset($listar)) {
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
}
 else if (isset($listarPorTienda)) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $listaProveedores = $pDao->listarTodosPorTienda($codigo_invitacion);
    $response = [];
    foreach ($listaProveedores as $proveedor) {
        $response[] = [
            $proveedor['nombre'],
            $proveedor['telefono'],
            $proveedor['email'],
            $proveedor['idproveedor']
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($listarNombreID)) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $listaProveedores = $pDao->listarNombreID($codigo_invitacion);
    $response = [];
    foreach ($listaProveedores as $proveedor) {
        $response[] = [
            $proveedor['nombre'],
            $proveedor['idproveedor']
        ];
    }
    echo json_encode($response);
    exit();
}
 else if (isset($listarProductos)) {
    $pDao = new proveedorDao();
    $pDto = new proveedorDto();
    $listaProveedores = $pDao->listarProductos($idproveedor);
    $response = [];
    foreach ($listaProveedores as $proveedor) {
        $response[] = [
            $proveedor['Nombre'],
            $proveedor['Marca']
        ];
    }
    echo json_encode($response);
    exit();
}
 else if (isset($registroCrud)) {
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
    $pDto->setidproveedor($idProveedor);
    $pDto->setnombre($nombre);
    $pDto->settelefono($telefono);
    $pDto->setemail($email);
    $pDto->setid_tienda($id_tienda);

    $mensaje = $pDao->modificarProveedor($pDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
}

