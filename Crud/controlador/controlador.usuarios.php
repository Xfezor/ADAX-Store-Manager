<?php
    require '../Dao/usuariosDao.php';
    require '../Dto/usuariosDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registro'])){
    $uDao = new UsuarioDao();
    $uDto = new usuarioDto();
    $uDto->setDocumento($_POST['documento']);
    $uDto->setTipo_doc($_POST['tipodoc']);
    $uDto->setContrasena($_POST['contrasena']);
    $uDto->setNombre1($_POST['nombre1']);
    $uDto->setNombre2($_POST['nombre2']);
    $uDto->setApellido1($_POST['apellido1']);
    $uDto->setApellido2($_POST['apellido2']);
    $uDto->setCorreo($_POST['correo']);
    $uDto->setRol_id_Rol('2');
    $uDto->setCodigoInvitacion($_POST['codigoinv']);

    $mensaje = $uDao->registrarUsuario($uDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to login page or success page
        header("Location:../../HTML/registro.php?registro=exitoso");
        exit;
    }
    // } else if ($mensaje === null) {
    //     // Registration failed, display error message
    //     header("Location:../../HTML/registro.php?mensaje=sigo vacia");
    //     exit;
    // }
}