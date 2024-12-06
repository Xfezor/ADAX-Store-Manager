<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas

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
$nombreTienda = $data['nombreTienda'];
$telefono = $data['telefono'];
$email = $data['email'];
$contrasena = $data['contrasena'];
$direccion = $data['direccion'];
$registroTienda = $data['registroTienda'];


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