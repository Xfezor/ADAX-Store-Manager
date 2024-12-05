<?php
    require '../Dao/rolDao.php';
    require '../Dto/rolDto.php';
    require '../utilidades/cpnexion.php';

    if (isset ($_POST['registrarRol'])){
        $rDao = new rolDao();
        $rDto = new rolDto();
        $rDto -> setrol_id_Rol ($_POST ['id_Rol']);
        $rDto -> setnombreROL ($POST ['nombreRol']);
        $rDao -> setdescripcion ($fDto) ['descripcion'];

        $mensaje = $rDto->registrarRol($fDto);
        echo $mensaje;
        if ($mensaje == 'Registrado exitosamente'){
        exit;
        }
    }
    else if (isset($_POST['registroRolCrud']) ){
        $rDao = new rolDao();
        $rDto = new rolDto();
        $rDto -> setrol_id_Rol ($_POST ['id_Rol']);
        $rDto -> setnombreROL ($POST ['nombreRol']);
        $rDao -> setdescripcion ($fDto) ['descripcion'];

        $mensaje = $rDto->registrarRol($fDto);
        echo $mensaje;
        if ($mensaje == 'Registrado exitosamente'){
        exit;
        }
    } 
    else if ($GET['id_Rol'] != null) {
        $rDao = new rolDao();
        $mensaje = $rDao->eliminarRol($GET['id_Rol']);
        exit();
    }
    else if (isset($GET['modificarRol'])) {
        $rDao = new rolDao();
        $rDto = new rolDto();
        $rDto -> setrol_id_Rol ($_POST ['id_Rol']);
        $rDto -> setnombreROL ($_POST ['nombreRol']);
        $rDto -> setdescripcion ($_POST ['descripcion']);
        $mensaje = $rDao->modificarRol($rDto);
    } 