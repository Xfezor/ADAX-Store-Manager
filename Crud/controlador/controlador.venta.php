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
    $vDto->setCliente_id_Cliente($_POST['cliente_id_Cliente']);
    $vDto->setTienda_idtienda($_POST['tienda_idtienda']);
    $vDto->setMetododepago_ID_Met_pago($_POST['metododepago_ID_Met_pago']);
    $vDto->setUsuarios_documento($_POST['usuarios_documento']);
    $vDto->setUsuarios_tienda_idtienda($_POST['usuarios_tienda_idtienda']);

    
    $mensaje = $vDao->registrarVenta($vDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to login page or success page
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }

}
else if (isset($_POST['registrocrud'])){$
    $vDao = new ventaDao();
    $vDto = new ventaDto();
    $vDto->setId_Venta($_POST['id_Venta']);
    $vDto->setFechaVenta($_POST['FechaVenta']);
    $vDto->setHoraVenta($_POST['HoraVenta']);
    $vDto->setEstadoVenta($_POST['EstadoVenta']);
    $vDto->setCliente_id_Cliente($_POST['cliente_id_Cliente']);
    $vDto->setTienda_idtienda($_POST['tienda_idtienda']);
    $vDto->setMetododepago_ID_Met_pago($_POST['metododepago_ID_Met_pago']);
    $vDto->setUsuarios_documento($_POST['usuarios_documento']);
    $vDto->setUsuarios_tienda_idtienda($_POST['usuarios_tienda_idtienda']);

    $mensaje = $vDao->registrarVentaCrud($vDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/venta/listarventa.php?mensaje=registro exitoso");
        exit;
    }
}
if (isset($_GET['id_Vent'])) {
    $uDao = new UsuarioDao();
    $mensaje = $uDao->eliminarUsuario($_GET['id_Vent']);
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
    $vDto->setCliente_id_Cliente($_POST['cliente_id_Cliente']);
    $vDto->setTienda_idtienda($_POST['tienda_idtienda']);
    $vDto->setMetododepago_ID_Met_pago($_POST['metododepago_ID_Met_pago']);
    $vDto->setUsuarios_documento($_POST['usuarios_documento']);
    $vDto->setUsuarios_tienda_idtienda($_POST['usuarios_tienda_idtienda']);

    $mensaje =$vDao->modificarVenta($vDto);
    header("Location:../tablas/venta/listarventa.php?mensaje=".$mensaje);
}