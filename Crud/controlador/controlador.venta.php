<?php
    require '../Dao/ventaDao.php';
    require '../Dto/ventaDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registroVenta'])){
    $vDao = new ventaDao();
    $vDto = new ventaDto();
    $vDto->setFechaVenta($_POST['FechaVenta']);
    $vDto->setHoraVenta($_POST['HoraVenta']);
    $vDto->setEstadoVenta($_POST['EstadoVenta']);
    $vDto->setCliente_id_Cliente($_POST['cliente_id_Cliente']);  // Solo cliente_id_Cliente
    $vDto->setTienda_idtienda($_POST['tienda_idtienda']);  // Solo tienda_idtienda
    $vDto->setMetododepago_ID_Met_pago($_POST['metododepago_ID_Met_pago']);
   
    $mensaje = $vDao->registrarVenta($vDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to success page
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }
}
else if (isset($_POST['registrocrud'])){
    $vDao = new ventaDao();
    $vDto = new ventaDto();
    $vDto->setId_Venta($_POST['id_Venta']);
    $vDto->setFechaVenta($_POST['FechaVenta']);
    $vDto->setHoraVenta($_POST['HoraVenta']);
    $vDto->setEstadoVenta($_POST['EstadoVenta']);
    $vDto->setCliente_id_Cliente($_POST['cliente_id_Cliente']);  // Solo cliente_id_Cliente
    $vDto->setTienda_idtienda($_POST['tienda_idtienda']);  // Solo tienda_idtienda
    $vDto->setMetododepago_ID_Met_pago($_POST['metododepago_ID_Met_pago']);
    
    $mensaje = $vDao->registrarVentaCrud($vDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/venta/listarventa.php?mensaje=registro exitoso");
        exit;
    }
}

if (isset($_GET['id_Vent'])) {
    $vDao = new ventaDao();
    $mensaje = $vDao->eliminarVenta($_GET['id_Vent']);  // Corregido para usar eliminarVenta
    header("Location:../tablas/venta/listarventa.php?mensaje=".$mensaje);
    exit;
}
else if (isset($_POST['modificar'])){
    $vDao = new ventaDao();
    $vDto = new ventaDto();
    $vDto->setId_Venta($_POST['id_Venta']);
    $vDto->setFechaVenta($_POST['FechaVenta']);
    $vDto->setHoraVenta($_POST['HoraVenta']);
    $vDto->setEstadoVenta($_POST['EstadoVenta']);
    $vDto->setCliente_id_Cliente($_POST['cliente_id_Cliente']);  // Solo cliente_id_Cliente
    $vDto->setTienda_idtienda($_POST['tienda_idtienda']);  // Solo tienda_idtienda
    $vDto->setMetododepago_ID_Met_pago($_POST['metododepago_ID_Met_pago']);
  
    $mensaje = $vDao->modificarVenta($vDto);
    header("Location:../tablas/venta/listarventa.php?mensaje=".$mensaje);
}
