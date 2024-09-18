<?php
    require '../Dao/productoDao.php';
    require '../Dto/productoDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registroProducto'])){
    $tDao = new productoDao();
    $tDto = new productoDto();
    $tDto->getId_Producto($_POST['id_Producto']);
    $tDto->getNombre($_POST['Nombre']);
    $tDto->getPrecio_unit($_POST['Precio_unit']);
    $tDto->getDescripción($_POST['Descripción']);
    $tDto->getMarca($_POST['Marca']);
    $tDto->getCategoría($_POST['Categoría']);
    $tDto->getPresentacion($_POST['Presentacion']);
    $tDto->getFecha_vencimiento($_POST['Fecha_vencimiento']);
    $tDto->getStock($_POST['Stock']);
    $tDto->getStock_Min($_POST['Stock_Min']);
    $tDto->getinventario_id_Inventario($_POST['inventario_id_Inventario']);
    $mensaje = $tDao->registrarProducto($tDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to login page or success page
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }

}
else if (isset($_POST['registrocrud'])){
    $tDao = new productoDao();
    $tDto = new productoDto();
    $tDto->getId_Producto($_POST['id_Producto']);
    $tDto->getNombre($_POST['Nombre']);
    $tDto->getPrecio_unit($_POST['Precio_unit']);
    $tDto->getDescripción($_POST['Descripción']);
    $tDto->getMarca($_POST['Marca']);
    $tDto->getCategoría($_POST['Categoría']);
    $tDto->getPresentacion($_POST['Presentacion']);
    $tDto->getFecha_vencimiento($_POST['Fecha_vencimiento']);
    $tDto->getStock($_POST['Stock']);
    $tDto->getStock_Min($_POST['Stock_Min']);
    $tDto->getinventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje = $tDao->registrarProductoCrud($tDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/tienda/listartienda.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['id_Producto']!=null){
    $tDao = new productoDao();
    $mensaje = $tDao->eliminarUsuario($_GET['id_Producto']);
    header("Location:../tablas/tienda/listartienda.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $tDao = new productoDao();
    $tDto = new productoDto();
    $tDto->getId_Producto($_POST['id_Producto']);
    $tDto->getNombre($_POST['Nombre']);
    $tDto->getPrecio_unit($_POST['Precio_unit']);
    $tDto->getDescripción($_POST['Descripción']);
    $tDto->getMarca($_POST['Marca']);
    $tDto->getCategoría($_POST['Categoría']);
    $tDto->getPresentacion($_POST['Presentacion']);
    $tDto->getFecha_vencimiento($_POST['Fecha_vencimiento']);
    $tDto->getStock($_POST['Stock']);
    $tDto->getStock_Min($_POST['Stock_Min']);
    $tDto->getinventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje =$tDao->modificarUsuario($tDto);
    header("Location:../tablas/tienda/listartienda.php?mensaje=".$mensaje);
}