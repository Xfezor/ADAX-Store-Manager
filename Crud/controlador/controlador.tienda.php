<?php
    require '../Dao/tiendaDao.php';
    require '../Dto/tiendaDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registroTienda'])){
    $tDao = new tiendaDao();
    $tDto = new tiendaDto();
    $tDto->setNombreTienda($_POST['nombreTienda']);
    $tDto->setDireccion($_POST['direccion']);
    $tDto->setTelefono($_POST['telefono']);
    $tDto->setCorreo($_POST['correo']);
    $tDto->setDocumento($_POST['documento']);
    $tDto->setTipoDocumento($_POST['tipodoc']);
    $tDto->setContrasena($_POST['contrasena']);
    
    $mensaje = $tDao->registrarTienda($tDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to login page or success page
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }

}
else if (isset($_POST['registrocrud'])){
    $tDao = new tiendaDao();
    $tDto = new tiendaDto();
    $tDto->setIdtienda($_POST['idtienda']);
    $tDto->setNombreTienda($_POST['nombreTienda']);
    $tDto->setDireccion($_POST['direccion']);
    $tDto->setTelefono($_POST['telefono']);
    $tDto->setCorreo($_POST['correo']);
    $tDto->setDocumento($_POST['documento']);
    $tDto->setTipoDocumento($_POST['tipodoc']);
    $tDto->setContrasena($_POST['contrasena']);
    $tDto->setCodigo_invitacion($_POST['codigo_invitacion']);

    $mensaje = $tDao->registrarTiendaCrud($tDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/tienda/listartienda.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['idtiend']!=null){
    $tDao = new tiendaDao();
    $mensaje = $tDao->eliminarUsuario($_GET['idtiend']);
    header("Location:../tablas/tienda/listartienda.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $tDao = new tiendaDao();
    $tDto = new tiendaDto();
    $tDto->setIdtienda($_POST['idtienda']);
    $tDto->setNombreTienda($_POST['nombreTienda']);
    $tDto->setDireccion($_POST['direccion']);
    $tDto->setTelefono($_POST['telefono']);
    $tDto->setCorreo($_POST['correo']);
    $tDto->setDocumento($_POST['documento']);
    $tDto->setTipoDocumento($_POST['tipodoc']);
    $tDto->setContrasena($_POST['contrasena']);
    $tDto->setCodigo_invitacion($_POST['codigo_invitacion']);

    $mensaje =$tDao->modificarUsuario($tDto);
    header("Location:../tablas/tienda/listartienda.php?mensaje=".$mensaje);
}