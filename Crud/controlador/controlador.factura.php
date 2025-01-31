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

    // Deshabilitar el caché
    header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
    header("Pragma: no-cache"); // HTTP 1.0
    header("Expires: 0"); // Proxies

    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['regristroFactura'])) {
        $venta_id_Venta = $data['venta_id_Venta'];
        $producto_id_Producto = $data['producto_id_Producto'];
        $Cantidad = $data['Cantidad'];
        $Precio = $data['Precio'];
        $Estado = $data['Estado'];
        $regristroFactura = $data['regristroFactura'];

    }
    if (isset($data['registroCrud'])) {
        $venta_id_Venta = $data['venta_id_Venta'];
        $producto_id_Producto = $data['producto_id_Producto'];
        $Cantidad = $data['Cantidad'];
        $Precio = $data['Precio'];
        $Estado = $data['Estado'];
        $registroCrud = $data['registroCrud'];
    }
    if (isset($data['listar'])) {
        $listar = $data['listar'];
    }
    if (isset($data['eliminar'])) {
        $id = $data['eliminar'];
    }
    if (isset($data['actualizar'])){
        $venta_id_Venta = $data['venta_id_Venta'];
        $producto_id_Producto = $data['producto_id_Producto'];
        $Cantidad = $data['Cantidad'];
        $Precio= $data['Precio'];
        $Estado = $data['Estado'];
        $actualizar = $data['actualizar'];
    }      

if (isset($regristroFactura) || isset($_GET['no'])){
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $fDto->setVenta_id_Venta($venta_id_Venta);
    $fDto->setProducto_id_Producto($producto_id_Producto);
    $fDto->setCantidad($Cantidad);
    $fDto->setPrecio($Precio);
    $fDto->setEstado($Estado);
    
    $mensaje = $fDao->registrarFactura($fDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }

} else if (isset($listar) ||isset($_GET['si'])) {
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
}else if (isset($registroCrud)){
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $fDto->setVenta_id_Venta($venta_id_Venta);
    $fDto->setProducto_id_Producto($producto_id_Producto);
    $fDto->setCantidad($Cantidad);
    $fDto->setPrecio($Precio);
    $fDto->setEstado($Estado);
    
    $mensaje = $fDao->registrarFactura($fDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }
}else if (isset($id)){
    $fDao = new facturaDao();
    $mensaje = $fDao->eliminarFactura($id);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
}
else if (isset($actualizar)){
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    
    $fDto->setVenta_id_Venta($venta_id_Venta);
    $fDto->setProducto_id_Producto($producto_id_Producto);
    $fDto->setCantidad($Cantidad);
    $fDto->setPrecio($Precio);
    $fDto->setEstado($Estado);
    
    $mensaje = $fDao->modificarFactura($fDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
}
