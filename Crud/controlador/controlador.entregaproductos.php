<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
};

require '../Dao/entregaproductosDao.php';
require '../Dto/entregaproductosDto.php';
require '../utilidades/conexion.php';

header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies


$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['registro'])) {
    $id_proveedor = $data['proveedor_idproveedor'];
    $id_producto = $data['producto_id_Producto'];
    $fechaEntrega = $data['fecha_Entrega'];
    $cantidad = $data['cantidad'];
}

if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($registrarEntregaProducto)) {
    $epDao = new entregaproductosDao();
    $epDto = new entregaproductosDto();
    $epDto->setproveedor_idproveedor($id_proveedor);
    $epDto->setproducto_id_Producto($id_producto);
    $epDto->setfecha_Entrega($fechaEntrega);
    $epDto->setcantidad($cantidad);

    $mensaje = $epDao->registrarEntregaProductos($epDto);
    echo $mensaje;
    if ($mensaje == 'Registrado exitosamente') {
        header("Location:../tablas/EntregaProductos/listarEntregaProductos.php?mensaje=" . $mensaje);
        exit;
    }
} else if (isset($listar) || isset($GET['si'])) {
    $epDao = new entregaproductosDao;
    $epDto = new entregaproductosDto;
    $listarEntregaProductos = $epDao->listarTodos();
    $response = [];
    foreach ($listarEntregaProductos as $entregaProductos) {
        $response[] = [
            $entregaProductos ['proveedor_idproveedor'],
            $entregaProductos ['producto_id_Producto'],
            $entregaProductos ['fecha_Entrega'],
            $entregaProductos ['cantidad']
        ];
    }
    echo json_encode($response);
    exit();

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
