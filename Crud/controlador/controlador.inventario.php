<?php
    require '../Dao/inventarioDao.php';
    require '../Dto/inventarioDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registroInventario'])){
    $iDao = new inventarioDao();
    $iDto = new inventarioDto();
    $iDto->setid_inventario($_POST['id_inventario']);
    $iDto->setCantidadInventario($_POST['CantidadInventario']);
    $iDto->setfechaModificacion($_POST['fechaModificacion']);
    $iDto->setestado_revision($_POST['estado_revision']);
    $iDto->settienda_idtienda($_POST['tienda_idtienda']);

    $mensaje = $iDao->registrarInventario($iDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }


}
else if (isset($_POST['registrocrud'])){
    $iDao = new InventarioDao();
    $iDto = new InventarioDto();
    $iDto->setid_inventario($_POST['id_inventario']);
    $iDto->setCantidadInventario($_POST['CantidadInventario']);
    $iDto->setfechaModificacion($_POST['fechaModificacion']);
    $iDto->setestado_revision($_POST['estado_revision']);
    $iDto->settienda_idtienda($_POST['tienda_idtienda']);

    $mensaje = $iDao->registrarInventario($iDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/Inventario/listarInventario.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['id_inventario']!=null){
    $iDao = new InventarioDao();
    $mensaje = $iDao->eliminarInventario($_GET['id_inventario']);
    header("Location:../tablas/Inventario/listarInventario.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $iDao = new InventarioDao();
    $iDto = new InventarioDto();
    $iDto->setid_inventario($_POST['id_inventario']);
    $iDto->setCantidadInventario($_POST['CantidadInventario']);
    $iDto->setfechaModificacion($_POST['fechaModificacion']);
    $iDto->setestado_revision($_POST['estado_revision']);
    $iDto->settienda_idtienda($_POST['tienda_idtienda']);

    $mensaje =$iDao->modificarInventario($iDto);
    header("Location:../tablas/Inventario/listarInventario.php?mensaje=".$mensaje);
}