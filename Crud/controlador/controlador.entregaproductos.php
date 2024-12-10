<?php
require '../Dao/entregaproductosDao.php';
require '../Dto/entregaproductosDto.php';
require '../utilidades/conexion.php';

if (isset($_POST['registro'])) {
    if (isset($_POST['proveedor_idproveedor'], $_POST['producto_id_Producto'], $_POST['fecha_Entrega'], $_POST['cantidad'])) {
        $epDao = new entregaproductosDao();
        $epDto = new entregaproductosDto();
        
        
        $epDto->setproveedor_idproveedor($_POST['proveedor_idproveedor']);
        $epDto->setproducto_id_Producto($_POST['producto_id_Producto']);
        $epDto->setfecha_Entrega($_POST['fecha_Entrega']);
        $epDto->setcantidad($_POST['cantidad']);
        
      
        $mensaje = $epDao->registrarEntregaproductos($epDto);
        echo $mensaje;

        
        if ($mensaje === 'Registrado Exitosamente') {
            header("Location:../../PAGINA/registro.php?registro=exitoso");
            exit;
        }
    } else {
        echo "Faltan datos obligatorios para registrar.";
    }
} elseif (isset($_POST['registrocrud'])) {
    if (isset($_POST['proveedor_idproveedor'], $_POST['producto_id_Producto'], $_POST['fecha_Entrega'], $_POST['cantidad'])) {
        $epDao = new entregaproductosDao();
        $epDto = new entregaproductosDto();
        
        $epDto->setproveedor_idproveedor($_POST['proveedor_idproveedor']);
        $epDto->setproducto_id_Producto($_POST['producto_id_Producto']);
        $epDto->setfecha_Entrega($_POST['fecha_Entrega']);
        $epDto->setcantidad($_POST['cantidad']);
        
        $mensaje = $epDao->registrarEntregaproductos($epDto);
        echo $mensaje;

        if ($mensaje === 'Registrado Exitosamente') {
            header("Location:../tablas/entregaproductos/listarentregaproductos.php?mensaje=registro_exitoso");
            exit;
        }
    } else {
        echo "Faltan datos obligatorios para el registro CRUD.";
    }
} elseif (isset($_GET['proveedor_idproveedor'])) {
    $proveedorId = $_GET['proveedor_idproveedor'];

    if (!empty($proveedorId)) {
        $epDao = new entregaproductosDao();
        $mensaje = $epDao->eliminarEntregaproductos($proveedorId);
        header("Location:../tablas/entregaproductos/listarentregaproductos.php?mensaje=" . urlencode($mensaje));
        exit;
    } else {
        echo "El ID del proveedor no es válido.";
    }
} elseif (isset($_POST['modificar'])) {
    if (isset($_POST['proveedor_idproveedor'], $_POST['producto_id_Producto'], $_POST['fecha_Entrega'], $_POST['cantidad'])) {
        $epDao = new entregaproductosDao();
        $epDto = new entregaproductosDto();
        
        $epDto->setproveedor_idproveedor($_POST['proveedor_idproveedor']);
        $epDto->setproducto_id_Producto($_POST['producto_id_Producto']);
        $epDto->setfecha_Entrega($_POST['fecha_Entrega']);
        $epDto->setcantidad($_POST['cantidad']);
        
        $mensaje = $epDao->modificarEntregaProductos($epDto);
        header("Location:../tablas/entregaproductos/listarentregaproductos.php?mensaje=" . urlencode($mensaje));
        exit;
    } else {
        echo "Faltan datos obligatorios para la modificación.";
    }
} else {
    echo "Solicitud no válida.";
}
