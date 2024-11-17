<?php
session_start();

// Si la sesión está activa, redirigir al index
if (isset($_SESSION['nombre1'])) {
    header('Location: ../../PAGINA/inicio.php');
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

if ($_GET["tipo"] === "empleado") {
    $sentencia = $cnn->prepare("SELECT * FROM usuarios WHERE correo = ? and (select desencriptarClaveCorreo('$email')) = ?;");
    $sentencia->execute([$email, $contra]);
    $valor = $sentencia->fetch(PDO::FETCH_OBJ);
    if ($valor === FALSE) {
        header('Location:../../PAGINA/iniciar_sesion.php?error=1');
        exit();
    } elseif ($sentencia->rowcount() == 1) {
        $sentencia = $cnn->prepare("SELECT nombreTienda,idtienda FROM tienda WHERE codigo_invitacion = $valor->codigo_invitacion;");
        $sentencia->execute();
        $valor2 = $sentencia->fetch(PDO::FETCH_OBJ);
        $_SESSION['nombre1'] = $valor->nombre1;
        $_SESSION['codigo_invitacion'] = $valor->codigo_invitacion;
        $_SESSION['nombreTienda'] = $valor2->nombreTienda;
        $_SESSION['idtienda'] = $valor2->idtienda;
        if ($valor->rol_id_Rol === 1) {
            $_SESSION['rol_id_Rol'] = $valor->rol_id_Rol;
        }
        header('Location:../../PAGINA/inicio.php');
        exit(); 
    }
} elseif ($_GET["tipo"] === "tienda") {
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