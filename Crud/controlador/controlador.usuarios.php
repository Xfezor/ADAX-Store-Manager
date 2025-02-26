<?php
// Iniciar sesión solo si no está activa
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Configurar cabeceras para CORS y tipo de contenido
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
ob_clean();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require '../Dao/usuariosDao.php';
require '../Dto/usuariosDto.php';
require '../utilidades/conexion.php';
require '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"), true);
$correo = isset($data['correo']) ? trim($data['correo']) : '';

if (empty($correo)) {
    echo json_encode(['status' => 'error', 'message' => 'El correo es inválido o está vacío']);
    exit();
}

// Validar si el usuario existe
$uDao = new UsuarioDao();
$usuario = $uDao->buscarUsuarioPorCorreo($correo);

if (!$usuario) {
    echo json_encode(['status' => 'error', 'message' => 'El correo no está registrado']);
    exit();
}

// Si la solicitud es solo para verificar que el correo existe
if (isset($data['verificarCorreo'])) {
    echo json_encode(['status' => 'success', 'message' => 'Email correcto, se ha enviado el código de verificación a su correo']);
    exit();
}

// Si la solicitud es para verificar el código
if (isset($data['verificarCodigo']) && $data['verificarCodigo'] === true) {
    if (!isset($data['codigo']) || empty(trim($data['codigo']))) {
        echo json_encode(['status' => 'error', 'message' => 'Debe ingresar un código.']);
        exit();
    }
    verificarCodigo($correo, trim($data['codigo']));
    exit();
}

// Si la solicitud es para enviar el código
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    enviarCodigoVerificacion($correo);
    exit();
}

/**
 * Enviar código de verificación al correo
 */
function enviarCodigoVerificacion($correo) {
    if (empty($correo)) {
        echo json_encode(['status' => 'error', 'message' => 'El correo es inválido o está vacío']);
        exit();
    }

    $uDao = new UsuarioDao();
    $usuario = $uDao->buscarUsuarioPorCorreo($correo);

    if (!$usuario) {
        echo json_encode(['status' => 'error', 'message' => 'El correo no está registrado']);
        exit();
    }

    // Generar código aleatorio de 6 dígitos
    $codigo = rand(100000, 999999);
    $_SESSION['codigo_verificacion'] = $codigo;
    $_SESSION['correo_verificacion'] = $correo;

    // Cerrar sesión para guardar los datos
    session_write_close();

    // Enviar correo con el código
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = "smtp.gmail.com";
        $mail->SMTPAuth   = true;
        $mail->Username   = "adaxsoporte@gmail.com";
        $mail->Password   = "mqahbrxozsnxbgqy"; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom("adaxsoporte@gmail.com", "ADMINISTRADOR");
        $mail->addAddress($correo);

        $mail->isHTML(true);
        $mail->Subject = "Tu código de verificación";
        $mail->Body    = "<h2>Tu código de verificación para la recuperación de tu contraseña es: <strong>$codigo</strong></h2>";

        if ($mail->send()) {
            echo json_encode(['status' => 'success', 'message' => 'Correo enviado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al enviar el correo']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al enviar el correo: ' . $mail->ErrorInfo]);
    }
}

/**
 * Verificar si el código ingresado es correcto
 */
function verificarCodigo($correo, $codigoIngresado) {
    // Iniciar sesión si no está activa
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['codigo_verificacion']) || !isset($_SESSION['correo_verificacion'])) {
        echo json_encode(['status' => 'error', 'message' => 'No se encontró un código generado.']);
        exit();
    }

    if ($correo !== $_SESSION['correo_verificacion']) {
        echo json_encode(['status' => 'error', 'message' => 'El correo no coincide con el código generado.']);
        exit();
    }

    if ($codigoIngresado == $_SESSION['codigo_verificacion']) {
        // Eliminar el código después de usarlo
        unset($_SESSION['codigo_verificacion']);
        unset($_SESSION['correo_verificacion']);
        echo json_encode(['status' => 'success', 'message' => 'Código verificado correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Código incorrecto']);
    }
}



if (isset($data['registro'])) {
    $documento = $data['documento'];
    $tipodoc = $data['tipoDoc'];
    $contrasena = $data['contrasena'];
    $nombre1 = $data['nombre'];
    $nombre2 = $data['nombre2'];
    $apellido1 = $data['apellido'];
    $apellido2 = $data['apellido2'];
    $email = $data['email'];
    $codigo_invitacion = $data['codigo_invitacion'];
    $registro = $data['registro'];
}
if (isset($data['registroCrud'])) {
    $documento = $data['documento'];
    $tipodoc = $data['tipoDoc'];
    $contrasena = $data['contrasena'];
    $nombre1 = $data['nombre'];
    $nombre2 = $data['nombre2'];
    $apellido1 = $data['apellido'];
    $apellido2 = $data['apellido2'];
    $email = $data['email'];
    $codigo_invitacion = $data['codigo_invitacion'];
    $idRol = $data['idRol'];
    $registroCrud = $data['registroCrud'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}
if (isset($data['eliminar'])) {
    $id = $data['eliminar'];
}
if (isset($data['actualizar'])){
    $documento = $data['documento'];
    $tipodoc = $data['tipoDoc'];
    $contrasena = $data['contrasena'];
    $nombre1 = $data['nombre'];
    $nombre2 = $data['nombre2'];
    $apellido1 = $data['apellido'];
    $apellido2 = $data['apellido2'];
    $email = $data['email'];
    $codigo_invitacion = $data['codigo_invitacion'];
    $idRol = $data['idRol'];
    $actualizar = $data['actualizar'];
}

if (isset($registro) || isset($_GET['no'])) {
    $uDao = new UsuarioDao();
    $uDto = new usuarioDto();
    $uDto->setDocumento($documento);
    $uDto->setTipo_doc($tipodoc);
    $uDto->setContrasena($contrasena);
    $uDto->setNombre1($nombre1);
    $uDto->setNombre2($nombre2);
    $uDto->setApellido1($apellido1);
    $uDto->setApellido2($apellido2);
    $uDto->setCorreo($email);
    $uDto->setRol_id_Rol('2');
    $uDto->setCodigoInvitacion($codigo_invitacion);

    $mensaje = $uDao->registrarUsuario($uDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }


} else if (isset($listar) || isset($_GET['si'])) {
    $uDao = new UsuarioDao();
    $uDto = new usuarioDto();
    $lista = $uDao->listarTodos();
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $usuario) {
        // Asegúrate de que cada usuario sea un array o un objeto
        $response[] = [
            $usuario['documento'],
            $usuario['tipo_doc'],
            preg_replace('/[^\x20-\x7E]/', '', $usuario['contrasena']),
            $usuario['nombre1'],
            $usuario['nombre2'],
            $usuario['apellido1'],
            $usuario['apellido2'],
            $usuario['correo'],
            $usuario['rol_id_Rol'],
            $usuario['codigo_invitacion'],
            $usuario['tienda_idtienda'] // Asegúrate de que este método exista
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($registroCrud)) {
    $uDao = new UsuarioDao();
    $uDto = new usuarioDto();
    $uDto->setDocumento($documento);
    $uDto->setTipo_doc($tipodoc);
    $uDto->setContrasena($contrasena);
    $uDto->setNombre1($nombre1);
    $uDto->setNombre2($nombre2);
    $uDto->setApellido1($apellido1);
    $uDto->setApellido2($apellido2);
    $uDto->setCorreo($email);
    $uDto->setRol_id_Rol($idRol);
    $uDto->setCodigoInvitacion($codigo_invitacion);

    $mensaje = $uDao->registrarUsuario($uDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }
} else if (isset($id)) {
    $uDao = new UsuarioDao();
    $mensaje = $uDao->eliminarUsuario($id);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
} else if (isset($actualizar)) {
    $uDao = new UsuarioDao();
    $uDto = new UsuarioDto();
    $uDto->setDocumento($documento);
    $uDto->setTipo_doc($tipodoc);
    $uDto->setContrasena($contrasena);
    $uDto->setNombre1($nombre1);
    $uDto->setNombre2($nombre2);
    $uDto->setApellido1($apellido1);
    $uDto->setApellido2($apellido2);
    $uDto->setCorreo($email);
    $uDto->setRol_id_Rol($idRol);
    $uDto->setCodigoInvitacion($codigo_invitacion);

    $mensaje = $uDao->modificarUsuario($uDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);

}