<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Si es una solicitud OPTIONS, simplemente devuelve un 200 OK
    http_response_code(200);
    exit();
}

require '../Dao/facturaDao.php';
require '../Dto/facturaDto.php';
require '../utilidades/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['regristroFactura'])) {
    $venta_id_Venta = $data['venta_id_Venta'];
    $producto_id_Producto = $data['producto_id_Producto'];
    $Cantidad = $data['Cantidad'];
    $Precio = $data['Precio'];
    $contrasena = $data['Estado'];

}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}
if (isset($data['listarTienda'])) {
    $listarTienda = $data['listarTienda'];
    $codigo_invitacion = $data['codigo_invitacion'];
}

if (isset($registrarFacturas)) {
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $fDto->setventa_id_Venta($venta_id_Venta);
    $fDto->setproducto_id_Producto($producto_id_Producto);
    $fDto->setCantidad($Cantidad);
    $fDto->setPrecio($Precio);
    $fDto->setEstado($Estado);

    $mensaje = $fDao->registrarFactura($fDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }

} else if (isset($listar)) {
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $lista = $fDao->listarTodos();
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $factura) {

        $response[] = [
            $factura['venta_id_Venta'],
            $factura['producto_id_Producto'],
            $factura['Cantidad'],
            $factura['Precio'],
            $factura['Estado'],

        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($listarTienda)) {
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $lista = $fDao->listarTodosTienda($codigo_invitacion);
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $factura) {

        $response[] = [
            $factura['venta_id_Venta'],
            $factura['producto_id_Producto'],
            $factura['Cantidad'],
            $factura['Precio'],
            $factura['Estado'],

        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($_POST['registrarfacturaCrud'])) {
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
} else if ($_GET['venta_id_Venta'] != null) {
    $fDao = new facturaDao();
    $mensaje = $fDao->eliminarFactura($_GET['venta_id_Venta']);
    header("Location:../tablas/factura/listarfactura.php?mensaje=" . $mensaje);
    exit();
} else if (isset($_POST['modificarfactura'])) {
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $fDto->setventa_id_Venta($_POST['venta_id_Venta']);
    $fDto->setproducto_id_Producto($_POST['producto_id_Producto']);
    $fDto->setCantidad($_POST['Cantidad']);
    $fDto->setPrecio($_POST['Precio']);
    $fDto->setEstado($_POST['Estado']);

    $mensaje = $fDao->modificarFactura($fDto);
    header("Location:../tablas/factura/listarfactura.php?mensaje=" . $mensaje);
}