<?php
require '../Dao/productoDao.php';
require '../Dto/productoDto.php';
require '../utilidades/conexion.php';
session_start();

// Validar si la sesión está activa
if (!isset($_SESSION['nombre1'])) {
    header('Location:iniciar_sesion.php?error=2');
    exit();
}

// Obtener información de la sesión
$rol_id_Rol = $_SESSION["rol_id_Rol"] ?? null;
$nombreTienda = $_SESSION["nombreTienda"] ?? null;
$codigo_invitacion = $_SESSION["codigo_invitacion"] ?? null;

// Procesar acciones según el formulario enviado
if (isset($_POST['registrarProducto'])) {
    // Registrar un producto
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

    header("Location:../../PAGINA/registro.php?registro=" . urlencode($mensaje));
    exit();

} elseif (isset($_POST['registrarProductoUnico'])) {
    // Registrar un producto único
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

    $mensaje = $pDao->registrarProductoUnico($pDto, $codigo_invitacion);

    header("Location:../../PAGINA/gestionar_productos.php?registro=" . urlencode($mensaje));
    exit();

} elseif (isset($_POST['modificarProducto'])) {
    // Modificar un producto
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
    exit();

} elseif (isset($_GET['id_Producto'])) {
    // Eliminar un producto
    $pDao = new productoDao();
    $mensaje = $pDao->eliminarProducto($_GET['id_Producto']);

    header("Location:../tablas/producto/listarproducto.php?mensaje=" . urlencode($mensaje));
    exit();
}

// Si ninguna acción coincide, redirigir con error
header("Location:../tablas/producto/listarproducto.php?mensaje=" . urlencode('Acción no válida'));
exit();
