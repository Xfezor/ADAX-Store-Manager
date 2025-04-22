<?php
header("Access-Control-Allow-Origin: * "); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE"); // Métodos permitidos
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
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['listar'])) {
            $listar = $_GET['listar'];
        } else if (isset($_GET['listarTienda'])) {
            $listarTienda = $_GET['listarTienda'];
            $codigo_invitacion = $_GET['codigo_invitacion'];
        } else if (isset($_GET['verAnalisisCodigoInv'])) {
            $verAnalisisCodigoInv = $_GET['verAnalisisCodigoInv'];
        } else if (isset($_GET['listarProductos'])) {
            $listarProductos = $_GET['listarProductos'];
            $codigo_invitacion = $_GET['codigo_invitacion'];
            $venta_id_Venta = $_GET['venta_id_Venta'];
        }
        break;
    case 'POST':
        if (isset($data['registro'])) {
            $registrarFactura = $data['registro'];
            $venta_id_Venta = $data['venta_id_Venta'];
            $producto_id_Producto = $data['producto_id_Producto'];
            $Cantidad = $data['Cantidad'];
            $Precio = $data['Precio'];
            $Estado = $data['Estado'];
        }
    case 'PUT':
        if (isset($data['actualizar'])) {
            $venta_id_Venta = $data['venta_id_Venta'];
            $producto_id_Producto = $data['producto_id_Producto'];
            $Cantidad = $data['Cantidad'];
            $Precio = $data['Precio'];
            $Estado = $data['Estado'];
            $actualizar = $data['actualizar'];
        }
        else if (isset($data['ActualizarEstadoPagado'])) {
            $ActualizarEstadoPagado = $data['ActualizarEstadoPagado'];
            $venta_id_Venta = $data['venta_id_Venta'];
        }
        break;
    case 'DELETE':
        if (isset($_GET['eliminar'])) {
            $id = $_GET['eliminar'];
        }
        break;
    default:
        break;
}

if (isset($registrarFactura)) {
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $fDto->setVenta_id_Venta($venta_id_Venta);
    $fDto->setProducto_id_Producto($producto_id_Producto);
    $fDto->setCantidad($Cantidad);
    $fDto->setPrecio($Precio);
    $fDto->setEstado($Estado);

    $mensaje = $fDao->registrarFactura($fDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['access' => true, 'mensaje' => $mensaje, $mensaje => 'id_Venta']);
        exit();
    }
} else if (isset($listar) || isset($_GET['si'])) {
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
            $factura['Nombre'],
            $factura['Marca'],
            $factura['Cantidad'],
            $factura['Precio'],
            $factura['Estado'],
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($listarProductos)) {
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $lista = $fDao->listarProductos($codigo_invitacion, $venta_id_Venta);
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $factura) {
        $response[] = [
            $factura['Nombre'],
            $factura['cantidad'],
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($registroCrud)) {
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
} else if (isset($id)) {
    $fDao = new facturaDao();
    $mensaje = $fDao->eliminarFactura($id);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
} else if (isset($actualizar)) {
    $fDao = new facturaDao();
    $fDto = new facturaDto();

    $fDto->setVenta_id_Venta($venta_id_Venta);
    $fDto->setProducto_id_Producto($producto_id_Producto);
    $fDto->setCantidad($Cantidad);
    $fDto->setPrecio($Precio);
    $fDto->setEstado($Estado);

    $mensaje = $fDao->modificarFactura($fDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
} else if (isset($verAnalisisCodigoInv)) {
    $fDao = new facturaDao();
    $fDto = new facturaDto();
    $lista = $fDao->verAnalsisCodigoInv($verAnalisisCodigoInv);
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $factura) {

        $response[] = [
            $factura['producto_id_Producto'],
            $factura['Nombre'],
            $factura['cantidadVendida'],
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($ActualizarEstadoPagado)) {
    $fDao = new facturaDao();

    $venta_id_Venta = (int)$venta_id_Venta;

    $mensaje = $fDao->cambiarEstadoFacturaPagado($venta_id_Venta);
    echo json_encode(['success' => true, 'mensaje' => $mensaje]);
}