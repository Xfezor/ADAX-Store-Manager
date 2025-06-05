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
            $Documento = $data['Documento'];
            $Tipo_documento = $data['Tipo_documento'];
            $NombreCliente = $data['NombreCliente'];
            $ApellidoCliente = $data['ApellidoCliente'];
            $Correo = $data['Correo'];
            $registroCliente = $data['registroCliente'];
        }
        if (isset($data['registroCrud'])) {
            $Documento = $data['Documento'];
            $Tipo_documento = $data['Tipo_documento'];
            $NombreCliente = $data['NombreCliente'];
            $ApellidoCliente = $data['ApellidoCliente'];
            $Correo = $data['Correo'];
            $registroCrud = $data['registroCrud'];
        }
        break;
    case 'PUT':
        if (isset($data['actualizar'])) {
            $Documento = $data['Documento'];
            $Tipo_documento = $data['Tipo_documento'];
            $NombreCliente = $data['NombreCliente'];
            $ApellidoCliente = $data['ApellidoCliente'];
            $Correo = $data['Correo'];
            $actualizar = $data['actualizar'];
        }
        if (isset($data['actualizarCrud'])) {
            $Documento = $data['Documento'];
            $Tipo_documento = $data['Tipo_documento'];
            $NombreCliente = $data['NombreCliente'];
            $ApellidoCliente = $data['ApellidoCliente'];
            $Correo = $data['Correo'];
            $actualizarCrud = $data['actualizarCrud'];
        }
        break;
    case 'DELETE':
        if (isset($data['eliminar'])) {
            $Doc = $data['eliminar'];
        }
        break;
    default:
        break;
}

if (isset($registroCliente)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setDocumento($Documento);
    $cDto->setNombreCliente($NombreCliente);
    $cDto->setApellidoCliente($ApellidoCliente);
    $cDto->setCorreo($Correo);
    $cDto->setTipo_documento($Tipo_documento);


    $mensaje = $cDao->registrarcliente($cDto);
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
            $cliente['Tipo_documento'],
            $cliente['NombreCliente'],
            $cliente['ApellidoCliente'],
            $cliente['correo'],
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($listarClientesTienda)) {
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
} else if (isset($registroCrud)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();

    $cDto->setDocumento($Documento);
    $cDto->setTipo_documento($Tipo_documento);
    $cDto->setNombreCliente($NombreCliente);
    $cDto->setApellidoCliente($ApellidoCliente);
    $cDto->setCorreo($Correo);

    $mensaje = $cDao->registrarClienteCrud($cDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true, 'mensaje' => $mensaje]);
        exit();
    } else {
        echo json_encode(['success' => false, 'mensaje' => 'Error al registrar el cliente']);
        exit();
    }
} else if (isset($Doc)) {
    $cDao = new clienteDao();
    $mensaje = $cDao->eliminarCliente($Doc);
    echo json_encode(['success' => true, 'mensaje' => $mensaje]);
    exit();
} else if (isset($actualizar)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();

    $cDto->setDocumento($Documento);
    $cDto->setTipo_documento($Tipo_documento);
    $cDto->setNombreCliente($NombreCliente);
    $cDto->setApellidoCliente($ApellidoCliente);
    $cDto->setCorreo($Correo);

    $mensaje = $cDao->modificarCliente($cDto);
    echo json_encode(['success' => true, 'mensaje' => $mensaje]);
} else if (isset($actualizarCrud)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();

    $cDto->setDocumento($Documento);
    $cDto->setTipo_documento($Tipo_documento);
    $cDto->setNombreCliente($NombreCliente);
    $cDto->setApellidoCliente($ApellidoCliente);
    $cDto->setCorreo($Correo);

    $mensaje = $cDao->modificarCliente($cDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
}
