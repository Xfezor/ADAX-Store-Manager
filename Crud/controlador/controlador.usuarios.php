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
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }


}
else if (isset($_POST['registrocrud'])){
    $uDao = new UsuarioDao();
    $uDto = new usuarioDto();
    $uDto->setDocumento($_POST['document']);
    $uDto->setTipo_doc($_POST['tipodoc']);
    $uDto->setContrasena($_POST['contrasena']);
    $uDto->setNombre1($_POST['nombre1']);
    $uDto->setNombre2($_POST['nombre2']);
    $uDto->setApellido1($_POST['apellido1']);
    $uDto->setApellido2($_POST['apellido2']);
    $uDto->setCorreo($_POST['correo']);
    $uDto->setRol_id_Rol($_POST['idrol']);
    $uDto->setCodigoInvitacion($_POST['codigoinvitacion']);

    $mensaje = $uDao->registrarUsuario($uDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/usuario/listarusuarios.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['docu']!=null){
    $uDao = new UsuarioDao();
    $mensaje = $uDao->eliminarUsuario($_GET['docu']);
    header("Location:../tablas/usuario/listarusuarios.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $uDao = new UsuarioDao();
    $uDto = new UsuarioDto();
    $uDto->setDocumento($_POST['document']);
    $uDto->setTipo_doc($_POST['tipodoc']);
    $uDto->setContrasena($_POST['contrasena']);
    $uDto->setNombre1($_POST['nombre1']);
    $uDto->setNombre2($_POST['nombre2']);
    $uDto->setApellido1($_POST['apellido1']);
    $uDto->setApellido2($_POST['apellido2']);
    $uDto->setCorreo($_POST['correo']);
    $uDto->setRol_id_Rol($_POST['idrol']);
    $uDto->setCodigoInvitacion($_POST['codigoinvitacion']);

    $mensaje =$uDao->modificarUsuario($uDto);
    header("Location:../tablas/usuario/listarusuarios.php?mensaje=".$mensaje);
}