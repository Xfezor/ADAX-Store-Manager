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

require '../Dao/tiendaDao.php';
require '../Dto/tiendaDto.php';
require '../utilidades/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['regristroTienda'])) {
    $nombreTienda = $data['nombreTienda'];
    $telefono = $data['telefono'];
    $email = $data['email'];
    $contrasena = $data['contrasena'];
    $direccion = $data['direccion'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}


if (isset($registroTienda)) {
    $tDao = new tiendaDao();
    $tDto = new tiendaDto();
    $tDto->setNombreTienda($nombreTienda);
    $tDto->setDireccion($telefono);
    $tDto->setTelefono($telefono);
    $tDto->setCorreo($email);
    $tDto->setContrasena($contrasena);

    $mensaje = $tDao->registrarTienda($tDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }
} else if (isset($listar) ||isset($_GET['si'])) {
    $tDao = new TiendaDao();
    $tDto = new tiendaDto();
    $lista = $tDao->listarTodos();
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $tienda) {
        // Asegúrate de que cada tienda sea un array o un objeto
        $response[] = [
            $tienda['idtienda'],
            $tienda['nombreTienda'],
            $tienda['direccion'],
            $tienda['telefono'],
            $tienda['correo'],
            preg_replace('/[^\x20-\x7E]/', '', $tienda['contrasena']),
            $tienda['codigo_invitacion'],
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
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/tienda/listartienda.php?mensaje=registro exitoso");
        exit;
    }
} else if ($_GET['idtienda'] != null) {
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
}