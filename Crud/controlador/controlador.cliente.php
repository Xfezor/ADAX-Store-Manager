<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require '../Dao/clienteDao.php';
require '../Dto/clienteDto.php';
require '../utilidades/conexion.php';

// Deshabilitar el caché
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies

$data = json_decode(file_get_contents('php://input'), true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['listar'])) {
            $listar = $_GET['listar'];
        }
        if (isset($_GET['listarClientesTienda'])) {
            $listarClientesTienda = $_GET['listarClientesTienda'];
            $codigoInvitacion = $_GET['codigo_invitacion'];
        }
        break;
    case 'POST':
        if (isset($data['registroCliente'])) {
            $id_Cliente = $data['id_Cliente'];
            $Documento = $data['Documento'];
            $Nombre1_Cliente = $data['Nombre1_Cliente'];
            $Nombre2_Cliente = $data['Nombre2_Cliente'];
            $Apellido1_Cliente = $data['Apellido1_Cliente'];
            $Apellido2_Cliente = $data['Apellido2_Cliente'];
            $Tipo_documento = $data['Tipo_documento'];
        }
        if (isset($data['registroCrud'])) {
            $id_Cliente = $data['id_Cliente'];
            $Documento = $data['Documento'];
            $Nombre1_Cliente = $data['Nombre1_Cliente'];
            $Nombre2_Cliente = $data['Nombre2_Cliente'];
            $Apellido1_Cliente = $data['Apellido1_Cliente'];
            $Apellido2_Cliente = $data['Apellido2_Cliente'];
            $Tipo_documento = $data['Tipo_documento'];
            $registroCrud = $data['registroCrud'];
        }
        break;
    case 'PUT':
        if (isset($data['actualizar'])) {
            $Documento = $data['Documento'];
            $Nombre1_Cliente = $data['Nombre1_Cliente'];
            $Nombre2_Cliente = $data['Nombre2_Cliente'];
            $Apellido1_Cliente = $data['Apellido1_Cliente'];
            $Apellido2_Cliente = $data['Apellido2_Cliente'];
            $Tipo_documento = $data['Tipo_documento'];
            $actualizar = $data['actualizar'];
        }
        break;
    case 'DELETE':
        if (isset($data['eliminar'])) {
            $id = $data['eliminar'];
        }
        break;
    default:
        break;
}


if (isset($registroCliente)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setId_Cliente($id_Cliente);
    $cDto->setDocumento($Documento);
    $cDto->setNombre1_Cliente($Nombre1_Cliente);
    $cDto->setNombre2_Cliente($Nombre2_Cliente);
    $cDto->setApellido1_Cliente($Apellido1_Cliente);
    $cDto->setApellido2_Cliente($Apellido2_Cliente);
    $cDto->setTipo_documento($Tipo_documento);


    $mensaje = $cDao->registrarCliente($cDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }
} else if (isset($listar)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $lista = $cDao->listarTodos();
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $cliente) {

        $response[] = [
            $cliente['Documento'],
            $cliente['Nombre1_Cliente'],
            $cliente['Nombre2_Cliente'],
            $cliente['Apellido1_Cliente'],
            $cliente['Apellido2_Cliente'],
            $cliente['Tipo_documento'],

        ];
    }
    echo json_encode($response);
    exit();
}
else if (isset($listarClientesTienda)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $lista = $cDao->listarClientesTienda($codigoInvitacion);
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $cliente) {
        $response[] = [
            $cliente['Documento'],
            $cliente['Tipo_documento'],
            $cliente['NombreCliente'],
            $cliente['ApellidoCliente'],
            $cliente['correo'],
        ];
    }
    echo json_encode($response);
    exit();
}else if (isset($registroCrud)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setId_Cliente($id_Cliente);
    $cDto->setDocumento($Documento);
    $cDto->setNombre1_Cliente($Nombre1_Cliente);
    $cDto->setNombre2_Cliente($Nombre2_Cliente);
    $cDto->setApellido1_Cliente($Apellido1_Cliente);
    $cDto->setApellido2_Cliente($Apellido2_Cliente);
    $cDto->setTipo_documento($Tipo_documento);

    $mensaje = $cDao->registrarCliente($cDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(value: ['success' => true]);
        exit();
    }
} else if (isset($id)) {
    $cDao = new clienteDao();
    $mensaje = $cDao->eliminarCliente($id);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
} else if (isset($actualizar)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();

    $cDto->setId_Cliente($id_Cliente);
    $cDto->setDocumento($Documento);
    $cDto->setNombre1_Cliente($Nombre1_Cliente);
    $cDto->setNombre2_Cliente($Nombre2_Cliente);
    $cDto->setApellido1_Cliente($Apellido1_Cliente);
    $cDto->setApellido2_Cliente($Apellido2_Cliente);
    $cDto->setTipo_documento($Tipo_documento);


    $mensaje = $cDao->modificarCliente($cDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
}
