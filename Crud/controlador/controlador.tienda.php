<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Manejar la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Si es una solicitud OPTIONS, simplemente devuelve un 200 OK
    http_response_code(200);
    exit();
}

require '../Dao/tiendaDao.php';
require '../Dto/tiendaDto.php';
require '../utilidades/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['eliminar'])) {
    $tDao = new tiendaDao();
    $mensaje = $tDao->eliminarTienda($data['eliminar']);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['obtenerIdTienda'])) {
            $obtenerIdTienda = $_GET['obtenerIdTienda'];
            $codigo_invitacion = $_GET['codigo_invitacion'];
        }
        break;
}
if (isset($data['registroTienda'])) {
    $nombreTienda = $data['nombreTienda'];
    $telefono = $data['telefono'];
    $email = $data['email'];
    $contrasena = $data['contrasena'];
    $direccion = $data['direccion'];

    $tDao = new tiendaDao();
    $tDto = new tiendaDto();
    $tDto->setNombreTienda($nombreTienda);
    $tDto->setDireccion($direccion);
    $tDto->setTelefono($telefono);
    $tDto->setCorreo($email);
    $tDto->setContrasena($contrasena);

    $mensaje = $tDao->registrarTienda($tDto);

    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true, 'mensaje' => $mensaje]);
        exit();
    } else {
        echo json_encode(['success' => false, 'mensaje' => $mensaje]);
        exit();
    }
} else if (isset($data['listar'])) {
    $tDao = new tiendaDao();
    $lista  = $tDao->listarTodos();
    $response = [];
    foreach ($lista as $tienda) {
        $response[] = [
            'idtienda' => $tienda['idtienda'],
            'nombreTienda' => $tienda['nombreTienda'],
            'direccion' => $tienda['direccion'],
            'telefono' => $tienda['telefono'],
            'correo' => $tienda['correo'],
            'contrasena' => preg_replace('/[^\x20-\x7E]/', '', $tienda['contrasena']),
            'codigo_invitacion' => $tienda['codigo_invitacion']
        ];
    }
    echo json_encode($response);
    exit();

} else if (isset($_POST['registrocrud'])) {
    $tDao = new tiendaDao();
    $tDto = new tiendaDto();
    $tDto->setIdtienda($_POST['idtienda']);
    $tDto->setNombreTienda($_POST['nombreTienda']);
    $tDto->setDireccion($_POST['direccion']);
    $tDto->setTelefono($_POST['telefono']);
    $tDto->setCorreo($_POST['correo']);
    $tDto->setContrasena($_POST['contrasena']);
    $tDto->setCodigo_invitacion($_POST['codigo_invitacion']);

    $mensaje = $tDao->registrarTiendaCrud($tDto);

    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true, 'mensaje' => $mensaje]);
        header("Location:../tablas/tienda/listartienda.php?mensaje=registro exitoso");
        exit();
    } else {
        echo json_encode(['success' => false, 'mensaje' => $mensaje]);
        exit();
    }
} else if (isset($_GET['idtienda' != null])) {
    $tDao = new tiendaDao();
    $mensaje = $tDao->eliminarTienda($_GET['idtienda']);
    header("Location:../tablas/tienda/listartienda.php?mensaje=" . $mensaje);
    exit();
} else if (isset($_POST['modificar'])) {
    $tDao = new tiendaDao();
    $tDto = new tiendaDto();
    $tDto->setIdtienda($_POST['idtienda']);
    $tDto->setNombreTienda($_POST['nombreTienda']);
    $tDto->setDireccion($_POST['direccion']);
    $tDto->setTelefono($_POST['telefono']);
    $tDto->setCorreo($_POST['correo']);
    $tDto->setContrasena($_POST['contrasena']);
    $tDto->setCodigo_invitacion($_POST['codigo_invitacion']);

    $mensaje = $tDao->modificarTienda($tDto);
    header("Location:../tablas/tienda/listartienda.php?mensaje=" . $mensaje);
    //buscar el id tienda con el codigo de inviatción
} else if (isset($obtenerIdTienda)) {
    $codigo_invitacion = $_GET['codigo_invitacion'];
    if (empty($codigo_invitacion)) {
        echo json_encode(['error' => 'Codigo de invitación no encontrado']);
        exit();
    }
    $tDao = new tiendaDao();
    $Idtienda = $tDao->obtenerIdTienda($codigo_invitacion);
    echo json_encode($Idtienda);

    $mensaje = $tDao->obtenerIdTienda($codigo_invitacion);
} else {
    echo json_encode(['error' => 'Codigo de invitación no encontrado']);
}

echo json_encode(['success' => false, 'error' => 'Petición no válida']);
