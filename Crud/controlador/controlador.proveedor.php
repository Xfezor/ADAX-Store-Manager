<?php
    require '../Dao/proveedorDao.php';
    require '../Dto/proveedorDto.php';
    require '../utilidades/conexion.php';

if (isset($_POST['registroproveedor'])){
    $prDao = new  proveedorDao();
    $prDto = new  proveedorDto();
    $prDto->setNombre($_POST['nombre']);
    $prDto->setTelefono($_POST['telefono']);
    $prDto->setEmail($_POST['email']);
    $prDto->setId_tienda($_POST['id_tienda']);
   
    
    $mensaje = $prDao->registrarProveedor($prDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to login page or success page
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }

}
else if (isset($_POST['registrocrud'])){
    $prDao = new proveedorDao();
    $prDto = new proveedorDto();
    $prDto->setIdproveedor($_POST['idproveedor']);
    $prDto->setNombre($_POST['nombre']);
    $prDto->setTelefono($_POST['telefono']);
    $prDto->setEmail($_POST['email']);
    $prDto->setId_tienda($_POST['id_tienda']);


    $mensaje = $prDao->registrarProveedorCrud($prDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/tienda/listartienda.php?mensaje=registro exitoso");
        exit;
    }
}
else if (isset($_GET['idproveedor']) && !empty($_GET['idproveedor'])){
    var_dump($_GET['idproveedor']);
    $prDao = new proveedorDao();
    $idproveedor = $_GET['idproveedor'];
    $mensaje = $prDao->eliminarProveedor($_GET['idproveedor']);
    var_dump($idproveedor);
    header("Location:../tablas/proveedor/listarproveedor.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $prDao = new proveedorDao();
    $prDto = new proveedorDto();
    $prDto->setIdproveedor($_POST['idproveedor']);
    $prDto->setNombre($_POST['nombre']);
    $prDto->setTelefono($_POST['telefono']);
    $prDto->setEmail($_POST['email']);
    $prDto->setId_tienda($_POST['id_tienda']);

    $mensaje =$prDao->modificarProveedor($prDto);
    header("Location:../tablas/proveedor/listarproveedor.php?mensaje=".$mensaje);
}