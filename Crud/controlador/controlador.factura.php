<?php
    require '../Dao/facturaDao.php';
    require '../Dto/facturaDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registrarFacturasCrud'])){
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $fDto->setproducto_id_Producto($_POST['producto_id_Producto']);
    $fDto->setCantidad($_POST['Cantidad']);
    $fDto->setPrecio($_POST['Precio']);
    $fDto->setEstado($_POST['Estado']);
    
    $mensaje = $fDao->registrarFactura($fDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to login page or success page
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }

}
else if (isset($_POST['registrarfacturaCrud'])){
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $fDto->setventa_id_Venta($_POST['venta_id_Venta']);
    $fDto->setproducto_id_Producto($_POST['producto_id_Producto']);
    $fDto->setCantidad($_POST['Cantidad']);
    $fDto->setPrecio($_POST['Precio']);
    $fDto->setEstado($_POST['Estado']);
    
    $mensaje = $fDao->registrarFactura($fDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/factura/listarfactura.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['venta_id_Venta']!=null){
    $fDao = new facturaDao();
    $mensaje = $fDao->eliminarFactura($_GET['venta_id_Venta']);
    header("Location:../tablas/factura/listarfactura.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificarfactura'])){
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $fDto->setventa_id_Venta($_POST['venta_id_Venta']);
    $fDto->setproducto_id_Producto($_POST['producto_id_Producto']);
    $fDto->setCantidad($_POST['Cantidad']);
    $fDto->setPrecio($_POST['Precio']);
    $fDto->setEstado($_POST['Estado']);
    
    $mensaje =$fDao->modificarFactura($fDto);
    header("Location:../tablas/factura/listarfactura.php?mensaje=".$mensaje);
}