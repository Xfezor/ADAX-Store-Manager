<?php
    require '../Dao/entregaproductosDao.php';
    require '../Dto/entregaproductosDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registro'])){
    $epDao = new entregaproductosDao();
    $epDto = new entregaproductosDto();
    $epDto->setproveedor_idproveedor($_POST['proveedor_idproveedor']);
    $epDto->setproducto_id_Producto($_POST['producto_id_Producto']);
    $epDto->setfecha_Entrega($_POST['fecha_Entrega']);
    $epDto->setcantidad($_POST['cantidad']);
    

    $mensaje = $epDto->registrarEntregaProductos($epDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }


}
else if (isset($_POST['registrocrud'])){
    $epDao = new entregaproductosDao();
    $epDao = new entregaproductosDto();
    $epDao->setproveedor_idproveedor($_POST['proveedor_idproveedor']);
    $epDao->setproducto_id_Producto($_POST['producto_id_Producto']);
    $epDao->setfecha_Entrega($_POST['fecha_Entrega']);
    $epDao->setcantidad($_POST['cantidad']);
   

    $mensaje = $epDao->registrarEntregaProductos($epDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/EntregaProductos/listarEntregaProductos.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['proveedor_idproveedor']!=null){
    $epDao = new entregaproductosDao();
    $mensaje = $epDao->eliminarEntregaProductos($_GET['proveedor_idproveedor']);
    header("Location:../tablas/EntregaProductos/listarEntregaProductos.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $epDao = new entregaproductosDao();
    $epDao = new entregaproductosDto();
    $epDao->setproveedor_idproveedor($_POST['proveedor_idproveedor']);
    $epDao->setproducto_id_Producto($_POST['producto_id_Producto']);
    $epDao->setfecha_Entrega($_POST['fecha_Entrega']);
    $epDao->setcantidad($_POST['cantidad']);
   
    $mensaje =$epDao->modificarEntregaProductos($epDto);
    header("Location:../tablas/EntregaProductos/listarEntregaProductos.php?mensaje=".$mensaje);
}