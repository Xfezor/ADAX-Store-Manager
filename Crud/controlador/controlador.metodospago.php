<?php
require '../Dao/metodopagoDao.php';
require '../Dto/metodopagoDto.php';
require '../utilidades/conexion.php';
if (isset($_GET['mensaje'])) {
    echo htmlspecialchars($_GET['mensaje']);
}

if (isset($_POST['registroMetodoPago'])) {
    $mpDao = new metodopagoDao();
    $mpDto = new metodopagoDto();
    $mpDto->setId_metodopago($_POST['ID_Met_pago']);
    $mpDto->setNombre_Metodo($_POST['Nombre']);

    $mensaje = $tDao->registrarTienda($tDto);
    echo $mensaje;
    if ($mensaje === 'Metodo de Pago registrado Exitosamente') {
        header("Location:../tablas/metodos_Pago/listarmetodospago.php?mensaje=".$mensaje);
        exit;
    }

}
else if (isset($_POST['registrarMetodoPagoCrud'])) {
    $mpDao = new metodopagoDao();
    $mpDto = new metodopagoDto();
    $mpDto->setNombre_Metodo($_POST['Nombre']);

    $mensaje = $mpDao->registrarMetodoPagoCrud($mpDto);
    echo $mensaje;
    if ($mensaje === 'Metodo de Pago registrado Exitosamente') {
        header("Location:../tablas/metodos_Pago/listarmetodospago.php?mensaje=".$mensaje);
        exit;
    }
}
else if ($_GET['ID_Met_pago']) {
    $mpDao = new metodopagoDao();
    $mensaje = $mpDao->eliminarMetodosPago($_GET['ID_Met_pago']);
    header("Location:../tablas/metodos_Pago/listarmetodospago.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificarMetodosPago'])) {
    $mpDao = new metodopagoDao();
    $mpDto = new metodopagoDto();
    $mpDto->setId_metodopago($_POST['ID_Met_pago']);
    $mpDto->setNombre_Metodo($_POST['Nombre']);
    $mensaje = $mpDao->modificarMetodosPago($mpDto);
    header("Location:../tablas/metodos_Pago/listarmetodospago.php?mensaje=".$mensaje);
}