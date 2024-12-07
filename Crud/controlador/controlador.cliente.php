<?php
require '../Dao/clienteDao.php';
require '../Dto/clienteDto.php';
require '../utilidades/conexion.php';

if (isset($_POST['registrarCliente'])){
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setid_Cliente($_POST['id_Cliente']);
    $cDto->setDocumento($_POST['Documento']);
    $cDto->setNombre1_Cliente($_POST['Nombre1_Cliente']);
    $cDto->setNombre2_Cliente($_POST['Nombre2_Cliente']);
    $cDto->setApellido1_Cliente($_POST['Apellido1_Cliente']);
    $cDto->setApellido2_Cliente($_POST['Apellido2_Cliente']);
    $cDto->setTipo_documento($_POST['Tipo_documento']);
   

    $mensaje = $cDao->registrarCliente($cDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }

}
else if (isset($_POST['registroclientecrud'])){
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setid_Cliente($_POST['id_Cliente']);
    $cDto->setDocumento($_POST['Documento']);
    $cDto->setNombre1_Cliente($_POST['Nombre1_Cliente']);
    $cDto->setNombre2_Cliente($_POST['Nombre2_Cliente']);
    $cDto->setApellido1_Cliente($_POST['Apellido1_Cliente']);
    $cDto->setApellido2_Cliente($_POST['Apellido2_Cliente']);
    $cDto->setTipo_documento($_POST['Tipo_documento']);
    

    
    $mensaje = $cDao->registrarCliente($cDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/cliente/listarcliente.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['venta_id_Venta']!=null){
    $cDao = new clienteDao();
    $mensaje = $cDao->eliminarCliente($_GET['id_Cliente']);
    header("Location:../tablas/cliente/listarcliente.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificarcliente'])){
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setventa_id_Venta($_POST['id_Cliente']);
    $cDto->setDocumento($_POST['Documento']);
    $cDto->setNombre1_Cliente($_POST['Nombre1_Cliente']);
    $cDto->setNombre2_Cliente($_POST['Nombre2_Cliente']);
    $cDto->setApellido1_Cliente($_POST['Apellido1_Cliente']);
    $cDto->setApellido2_Cliente($_POST['Apellido2_Cliente']);
    $cDto->setTipo_documento($_POST['Tipo_documento']);
    
    $mensaje =$cDao->modificarFactura($cDto);
    header("Location:../tablas/cliente/listarcliente.php?mensaje=".$mensaje);
}