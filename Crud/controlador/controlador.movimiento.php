<?php
    require '../Dao/movimientoDao.php';
    require '../Dto/movimientoDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registro'])){
    $mDao = new MovimientoDao();
    $mDto = new MovimientoDto();
    $mDto->setId_Movimiento($_POST['id_Movimiento']);
    $mDto->setCantidad_despues($_POST['cantidad_despues']);
    $mDto->setFecha_movimiento($_POST['fecha_movimiento']);
    $mDto->setFecha_modificacion($_POST['fecha_modificacion']);
    $mDto->setEstado_despues($_POST['estado_despues']);
    $mDto->setInventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje = $mDao->registrarMovimiento($mDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }


}
else if (isset($_POST['registrocrud'])){
    $mDao = new MovimientoDao();
    $mDto = new MovimientoDto();
    $mDto->setId_Movimiento($_POST['id_Movimiento']);
    $mDto->setCantidad_despues($_POST['cantidad_despues']);
    $mDto->setFecha_movimiento($_POST['fecha_movimiento']);
    $mDto->setFecha_modificacion($_POST['fecha_modificacion']);
    $mDto->setEstado_despues($_POST['estado_despues']);
    $mDto->setInventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje = $mDao->registrarMovimiento($mDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/movimiento/listarmovimiento.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['id_Movimient']!=null){
    $mDao = new MovimientoDao();
    $mensaje = $mDao->eliminarMovimiento($_GET['id_Movimient']);
    header("Location:../tablas/movimiento/listarmovimiento.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $mDao = new MovimientoDao();
    $mDto = new MovimientoDto();
    $mDto->setId_Movimiento($_POST['id_Movimiento']);
    $mDto->setCantidad_despues($_POST['cantidad_despues']);
    $mDto->setFecha_movimiento($_POST['fecha_movimiento']);
    $mDto->setFecha_modificacion($_POST['fecha_modificacion']);
    $mDto->setEstado_despues($_POST['estado_despues']);
    $mDto->setInventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje =$mDao->modificarMovimiento($mDto);
    header("Location:../tablas/movimiento/listarmovimiento.php?mensaje=".$mensaje);
}