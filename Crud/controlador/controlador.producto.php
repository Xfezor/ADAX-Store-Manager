<?php
    require '../Dao/productoDao.php';
    require '../Dto/productoDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registrarProducto'])){
    $pDao = new productoDao();
    $pDto = new productoDto();
    $pDto->setNombre( $_POST['Nombre']);
    $pDto->setPrecio_unit($_POST['Precio_unit']);
    $pDto->setDescripción($_POST['Descripción']);
    $pDto->setMarca($_POST['Marca']);
    $pDto->setCategoría($_POST['Categoría']);
    $pDto->setPresentacion($_POST['Presentacion']);
    $pDto->setFecha_vencimiento($_POST['Fecha_vencimiento']);
    $pDto->setStock($_POST['Stock']);
    $pDto->setStock_Min($_POST['Stock_Min']);
    $pDto->setinventario_id_Inventario($_POST['inventario_id_Inventario']);
    $mensaje = $pDao->registrarProducto($pDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to login page or success page
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }

}
else if (isset($_POST['registrarProducto'])){
    $pDao = new productoDao();
    $pDto = new productoDto();
    $pDto->setId_Producto($_POST['id_Producto']);
    $pDto->setNombre($_POST['Nombre']);
    $pDto->setPrecio_unit($_POST['Precio_unit']);
    $pDto->setDescripción($_POST['Descripción']);
    $pDto->setMarca($_POST['Marca']);
    $pDto->setCategoría($_POST['Categoría']);
    $pDto->setPresentacion($_POST['Presentacion']);
    $pDto->setFecha_vencimiento($_POST['Fecha_vencimiento']);
    $pDto->setStock($_POST['Stock']);
    $pDto->setStock_Min($_POST['Stock_Min']);
    $pDto->setinventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje = $pDao->registrarProducto($pDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/producto/listarproducto.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['id_Producto']!=null){
    $pDao = new productoDao();
    $mensaje = $pDao->eliminarProducto($_GET['id_Producto']);
    header("Location:../tablas/producto/listarproducto.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificarProducto'])){
    $pDao = new productoDao();
    $pDto = new productoDto();
    $pDto->setId_Producto($_POST['id_Producto']);
    $pDto->setNombre($_POST['Nombre']);
    $pDto->setPrecio_unit($_POST['Precio_unit']);
    $pDto->setDescripción($_POST['Descripción']);
    $pDto->setMarca($_POST['Marca']);
    $pDto->setCategoría($_POST['Categoría']);
    $pDto->setPresentacion($_POST['Presentacion']);
    $pDto->setFecha_vencimiento($_POST['Fecha_vencimiento']);
    $pDto->setStock($_POST['Stock']);
    $pDto->setStock_Min($_POST['Stock_Min']);
    $pDto->setinventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje =$pDao->modificarProducto($pDto);
    header("Location:../tablas/producto/listarproducto.php?mensaje=".$mensaje);
}