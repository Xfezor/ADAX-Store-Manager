<?php
session_start();

// Si la sesión está activa, redirigir al index
if (isset($_SESSION['nombre1'])) {
    header('Location: ../tablas/tablas.php');
    exit();
}

// Deshabilitar el caché
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies

require '../utilidades/conexion.php';
$cnn = Conexion::getConexion();
$email = $_POST['email'];
$contra = $_POST['contrasena']; 

if ($_POST["tipo"] === "usuario") {
    $sentencia = $cnn->prepare("SELECT * FROM usuarios WHERE correo = ? and (select desencriptarClaveCorreo('$email')) = ?;");
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);
    if ($valor === FALSE) {
        header('Location:../tablas/login.php?error=1');
        exit(); 
    } elseif ($sentencia->rowcount() == 1) {
        $_SESSION['nombre1'] = $valor->nombre1;
        header('Location:../tablas/tablas.php');
        exit(); 
    }
} elseif ($_POST["tipo"] === "tienda") {
    $sentencia = $cnn->prepare("SELECT * FROM tienda WHERE correo = ? and (select desencriptarClaveCorreoTienda('$email')) = ?;");
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);
    if ($valor === FALSE) {
        header('Location:../tablas/login.php?error=1');
        exit(); 
    } elseif ($sentencia->rowcount() == 1) {
        $_SESSION['nombre1'] = $valor->correo;
        header('Location:../tablas/tablas.php');
        exit(); 
    }
}
?>