<?php
    require '../Dao/rolDao.php';
    require '../Dto/rolDto.php';
    require '../utilidades/cpnexion.php';

if (isset($_POST['modificarRolesCrud'])) {
    $fDao = new rolDao();
    $fDto = new rolDto();
    $fDto -> setrol_id_Rol ($_POST ['idRol']);
    $fDto -> setnombreROL ($POST ['nombreRol']);
    $fDto -> setdescripcion ($POST ['descripcion']);

    $mensaje = $fDao -> modificarRol ($fDto);
    echo $mensaje;
    if ($mensaje == 'Modificación exitosa'){
        header ('Location: ../PAGINA/rol.php?modificacion=exitosa');
        exit;
    }
}