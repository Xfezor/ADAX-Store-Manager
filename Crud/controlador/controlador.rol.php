<?php
require '../Dao/rolDao.php';
require '../Dto/rolDto.php';
require '../utilidades/conexion.php';

if (isset($_POST['registrarRol'])) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setid_Rol($_POST['id_Rol']);
    $rDto->setnombreROL($POST['nombreRol']);
    $rDTo->setdescripcion($rDto)['descripcion'];

    $mensaje = $rDao->registrarRol($rDto);
    echo $mensaje;
    if ($mensaje == 'Registrado exitosamente') {
        header("Location:../tablas/roles/listaroles.php?mensaje=" . $mensaje);
        exit;
    }
} else if (isset($_POST['registroRolCrud'])) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setId_Rol($_POST['id_Rol']);
    $rDto->setnombreROL($_POST['nombreRol']);
    $rDto->setdescripcion($_POST['descripcion']);

    $mensaje = $rDao->registroRolCrud($rDto);
    echo $mensaje;
    if ($mensaje === 'Rol registrado con exito') {
        header("Location:../tablas/roles/listaroles.php?mensaje=".$mensaje);
        exit;
    }
} else if ($_GET['id_Rol'] != null) {
    $rDao = new rolDao();
    $mensaje = $rDao->eliminarRol($_GET['id_Rol']);
    header("Location:../tablas/roles/listaroles.php?mensaje=" . $mensaje);
    exit;
} else if (isset($_POST['modificar'])) {
    $rDao = new rolDao();
    $rDto = new rolDto();
    $rDto->setId_Rol($_POST['id_Rol']);
    $rDto->setnombreRol($_POST['nombreRol']);
    $rDto->setdescripcion($_POST['descripcion']);

    $mensaje = $rDao->modificarRol($rDto);
    header("Location:../tablas/roles/listaroles.php?mensaje=" . $mensaje);
}