<?php
require '../Dao/productoDao.php';
require '../Dto/productoDto.php';
session_start();

if (!isset($_SESSION['nombre1'])) {
  header('Location:iniciar_sesion.php?error=2');
  echo "no esta iniciando la sesion";
} elseif (isset($_SESSION['nombre1'])) {
  require '../Dao/usuariosDao.php';
  require '../Dto/usuariosDto.php';
  require '../Dao/tiendaDao.php';
  require '../Dto/tiendaDto.php';
  if (isset($_SESSION["rol_id_Rol"])) {
    $rol_id_Rol = $_SESSION["rol_id_Rol"];
  }
  $nombreTienda = $_SESSION["nombreTienda"];
  $codigo_invitacion = $_SESSION["codigo_invitacion"];
} else {
  echo 'ocurrio un error';
}
echo "hola";
var_dump($_POST);
if (isset($_POST['registrarProducto'])) {
    $pDao = new productoDao();
    $pDto = new productoDto();
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
        // Registration successful, redirect to login page or success page
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit();
    }
} else if (isset($_POST['registrarProductoUnico'])) {
    echo "hola";
    $pDao = new productoDao();
    $pDto = new productoDto();
    $pDto->setNombre($_POST['Nombre']);
    $pDto->setPrecio_unit($_POST['Precio_unit']);
    $pDto->setDescripción('');
    $pDto->setMarca('');
    $pDto->setCategoría('');
    $pDto->setPresentacion('');
    $pDto->setFecha_vencimiento('');
    $pDto->setStock($_POST['Stock']);
    $pDto->setStock_Min('');
    $mensaje = $pDao->registrarProductoUnico($pDto, $_SESSION['codigo_invitacion']);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        // Registration successful, redirect to login page or success page
        header("Location:../../PAGINA/gestionar_productos.php?registro=exitoso");
        exit();
    }
} else if (isset($_POST['registrarProducto'])) {
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
        exit();
    }
} else if (isset($_GET['id_Producto'])) {
    if ($_GET['id_Producto'] != null) {
        $pDao = new productoDao();
        $mensaje = $pDao->eliminarProducto($_GET['id_Producto']);
        header("Location:../tablas/producto/listarproducto.php?mensaje=" . $mensaje);
        exit();
    }
} else if (isset($_POST['modificarProducto'])) {
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

    $mensaje = $pDao->modificarProducto($pDto);
    header("Location:../tablas/producto/listarproducto.php?mensaje=" . $mensaje);
}