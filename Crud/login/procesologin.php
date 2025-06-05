<?php

require_once '../vendor/autoload.php';
use Firebase\JWT\JWT;

define('JWT_SECRET', 'TuHZMVZsVTNmMdNqHzesZqK9ULWSkEVQFJGwW7emBa2lsWlRvS');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Deshabilitar el caché
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();

}

require '../utilidades/conexion.php';
$cnn = Conexion::getConexion();
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? null;
$contra = $data['contrasena'] ?? null;

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $email = $_POST['email'] ?? null;
        $contra = $_POST['contrasena'] ?? null;
        break;
    case 'GET':
        $tipo = $_GET['tipo'] ?? null;
        $email = $_GET['email'] ?? null;
        $contra = $_GET['contrasena'] ?? null;
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
        exit();
}

$email = mb_convert_encoding($email, 'UTF-8', 'auto');
$contra = mb_convert_encoding($contra, 'UTF-8', 'auto');


if ($tipo === "empleado") {

    $sentencia = $cnn->prepare("SELECT * FROM usuarios WHERE correo = ? and (select desencriptarClaveCorreo('$email')) = ?;");
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);
    if ($valor === FALSE) {
        echo json_encode(['success' => false]);
        exit();
    } elseif ($sentencia->rowcount() == 1) {
        $sentencia = $cnn->prepare("SELECT nombreTienda,idtienda FROM tienda WHERE codigo_invitacion = $valor->codigo_invitacion;");
        $sentencia->execute();
        $valor2 = $sentencia->fetch(PDO::FETCH_OBJ);
        $payload = [
            'iat' => time(),
            'exp' => time() + 60 * 60, // Token válido por 1 hora
            'data' => [
                'documento' => $valor->documento,
                'codigo_invitacion' => $valor->codigo_invitacion,
                'nombreTienda' => $valor2->nombreTienda,
                'rol' => $valor->rol_id_Rol,
                'id_Tienda' => $valor->tienda_idtienda,
            ]
        ];

        $token = JWT::encode($payload, JWT_SECRET, 'HS256');
        
        echo json_encode([
            'success' => true, 
            'token' => $token,
        ]);
        exit();
    } else {
        echo json_encode(['success' => false]);
        exit();
    }
} elseif ($tipo === "tienda") {
    $sentencia = $cnn->prepare("SELECT * FROM tienda WHERE correo = ? and (select desencriptarClaveCorreoTienda('$email')) COLLATE utf8mb4_general_ci = ? COLLATE utf8mb4_general_ci;");
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);
    if ($valor === FALSE) {
        echo json_encode(['success' => false]);
        exit();
    } elseif ($sentencia->rowcount() == 1) {
        $cod = $valor->codigo_invitacion;
        $nombreTienda = $valor->nombreTienda;
        $rol = 3;
        $payload = [
            'iat' => time(),
            'exp' => time() + 60 * 60, // Token válido por 1 hora
            'data' => [
                'documento' => 1,
                'codigo_invitacion' => $valor->codigo_invitacion,
                'nombreTienda' => $valor->nombreTienda,
                'rol' => 3,
                'id_Tienda' => $valor->idtienda,
            ]
        ];

        $token = JWT::encode($payload, JWT_SECRET, 'HS256');
        
        echo json_encode([
            'success' => true, 
            'token' => $token,
        ]);
        exit();
    } else {
        echo json_encode(['success' => false]);
        exit();
    }
}

if ($_POST["tipo"] === "empleado") {
    $sentencia = $cnn->prepare("SELECT * FROM usuarios WHERE correo = ? and (select desencriptarClaveCorreo('$email')) = ?;");
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);
    if ($valor === FALSE) {
        echo json_encode(['success' => false]);
        exit();
    } elseif ($sentencia->rowcount() == 1) {
        $sentencia = $cnn->prepare("SELECT nombreTienda FROM tienda WHERE codigo_invitacion = $valor->codigo_invitacion;");
        $sentencia->execute();
        $valor2 = $sentencia->fetch(PDO::FETCH_OBJ);
        $_SESSION['nombre1'] = $valor->nombre1;
        $_SESSION['codigo_invitacion'] = $valor->codigo_invitacion;
        $_SESSION['nombreTienda'] = $valor2->nombreTienda;
        if ($valor->rol_id_Rol === 1) {
            $_SESSION['rol_id_Rol'] = $valor->rol_id_Rol;
        }
        echo json_encode(['success' => true]);
        exit();
    }
} elseif ($_POST["tipo"] === "tienda") {
    $sentencia = $cnn->prepare("SELECT * FROM tienda WHERE correo = ? and (select desencriptarClaveCorreoTienda('$email')) COLLATE utf8mb4_general_ci = ? COLLATE utf8mb4_general_ci;");
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);
    if ($valor === FALSE) {
        header('Location:../../PAGINA/iniciar_sesion.php?error=1');
        exit();
    } elseif ($sentencia->rowcount() == 1) {
        $_SESSION['nombre1'] = $valor->correo;
        $_SESSION['codigo_invitacion'] = $valor->codigo_invitacion;
        $_SESSION['nombreTienda'] = $valor->nombreTienda;
        header('Location:../../PAGINA/inicio.php');
        exit();
    }
}
