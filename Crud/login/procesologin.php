<?php
session_start();

// Si la sesión está activa, redirigir al index
if (isset($_SESSION['nombre1'])) {
    header('Location: ../../PAGINA/inicio.php');
    exit();
}

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

if ($_GET["tipo"] === "empleado") {

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
        $cod = $valor->codigo_invitacion;
        $nombreTienda = $valor2->nombreTienda;
        $rol = $valor->rol_id_Rol;
        echo json_encode(['success' => true, 'codigo_invitacion' => $cod, 'nombreTienda' => $nombreTienda, 'rol' => $rol]);
        exit();
    } else {
        echo json_encode(['success' => false]);
        exit();
    }
} elseif ($_GET["tipo"] === "tienda") {
    $sentencia = $cnn->prepare("SELECT * FROM tienda WHERE correo = ? and (select desencriptarClaveCorreoTienda('$email')) = ?;");
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);
    if ($valor === FALSE) {
        echo json_encode(['success' => false]);
        exit();
    } elseif ($sentencia->rowcount() == 1) {
        $_SESSION['nombre1'] = $valor->correo;
        $_SESSION['codigo_invitacion'] = $valor->codigo_invitacion;
        $_SESSION['nombreTienda'] = $valor->nombreTienda;
        echo json_encode(['success' => true]);
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
        header('Location:../../PAGINA/iniciar_sesion.php?error=1');
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
        header('Location:../../PAGINA/inicio.php');
        exit();
    }
} elseif ($_POST["tipo"] === "tienda") {
    $sentencia = $cnn->prepare("SELECT * FROM tienda WHERE correo = ? and (select desencriptarClaveCorreoTienda('$email')) = ?;");
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
?>