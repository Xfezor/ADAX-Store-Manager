<?php

require_once '../vendor/autoload.php';
use Firebase\JWT\JWT;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('JWT_SECRET', 'TuHZMVZsVTNmMdNqHzesZqK9ULWSkEVQFJGwW7emBa2lsWlRvS');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require '../utilidades/conexion.php';
$cnn = Conexion::getConexion();

$data = json_decode(file_get_contents('php://input'), true);
$tipo = $data['tipo'] ?? $_POST['tipo'] ?? $_GET['tipo'] ?? null;
$email = $data['email'] ?? $_POST['email'] ?? $_GET['email'] ?? null;
$contra = $data['contrasena'] ?? $_POST['contrasena'] ?? $_GET['contrasena'] ?? null;

$email = trim(mb_convert_encoding($email, 'UTF-8', 'auto'));
$contra = trim(mb_convert_encoding($contra, 'UTF-8', 'auto'));

if ($tipo === "empleado") {
    $sql = "SELECT * FROM usuarios WHERE correo = ? 
        AND CONVERT(AES_DECRYPT(contrasena, 'adaxdecripter2024') USING utf8mb4) = ?";
    $sentencia = $cnn->prepare($sql);
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);

    if ($valor === FALSE) {
        echo json_encode(['success' => false]);
        exit();
    } elseif ($sentencia->rowCount() == 1) {
        $sentencia2 = $cnn->prepare("SELECT nombreTienda, idtienda FROM tienda WHERE codigo_invitacion = ?");
        $sentencia2->execute([$valor->codigo_invitacion]);
        $valor2 = $sentencia2->fetch(PDO::FETCH_OBJ);

        $payload = [
            'iat' => time(),
            'exp' => time() + 60 * 60,
            'data' => [
                'documento' => $valor->documento,
                'codigo_invitacion' => $valor->codigo_invitacion,
                'nombreTienda' => $valor2->nombreTienda ?? '',
                'rol' => $valor->rol_id_Rol,
                'id_Tienda' => $valor->tienda_idtienda,
            ]
        ];

        $token = JWT::encode($payload, JWT_SECRET, 'HS256');
        echo json_encode(['success' => true, 'token' => $token]);
        exit();
    } else {
        echo json_encode(['success' => false]);
        exit();
    }
} elseif ($tipo === "tienda") {
    $sql = "SELECT * FROM tienda WHERE correo = ? 
        AND CONVERT(AES_DECRYPT(contrasena, 'adaxdecripter2024') USING utf8mb4) = ?";
    $sentencia = $cnn->prepare($sql);
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);

    if ($valor === FALSE) {
        echo json_encode(['success' => false]);
        exit();
    } elseif ($sentencia->rowCount() == 1) {
        $payload = [
            'iat' => time(),
            'exp' => time() + 60 * 60,
            'data' => [
                'documento' => 1,
                'codigo_invitacion' => $valor->codigo_invitacion,
                'nombreTienda' => $valor->nombreTienda,
                'rol' => 3,
                'id_Tienda' => $valor->idtienda,
            ]
        ];

        $token = JWT::encode($payload, JWT_SECRET, 'HS256');
        echo json_encode(['success' => true, 'token' => $token]);
        exit();
    } else {
        echo json_encode(['success' => false]);
        exit();
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Tipo de usuario no válido']);
    exit();
}
