<?php

header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');
// Manejar la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Si es una solicitud OPTIONS, simplemente devuelve un 200 OK
    http_response_code(200);
    exit();
}

require '../Dao/productoDao.php';
require '../Dto/productoDto.php';

$data = json_decode(file_get_contents('php://input'), true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id_Producto'])) {
            $id_Producto = $_GET['id_Producto'];
        } else if (isset($_GET['listarProductosApp'])) {
            $listarProductosApp = $_GET['listarProductosApp'];
            $codigo_invitacion = $_GET['codigo_invitacion'];
        } else if (isset($_GET['consultaDatosProducto'])) {
            $consultaDatosProducto = $_GET['consultaDatosProducto'];
            $id_Producto = $_GET['consultaDatosProducto'];
        } else if (isset($_GET['listarProductosAppPrecio'])) {
            $listarProductosAppPrecio = $_GET['listarProductosAppPrecio'];
            $codigo_invitacion = $_GET['codigo_invitacion'];
        } else if (isset($_GET['listar'])) {
            $listar = $_GET['listar'];
        }
        break;
    case 'POST':
        if (isset($data['registrarProducto'])) {
            $registrarProducto = $data['registrarProducto'];
        } else if (isset($data['registrarProductoUnico'])) {
            $registrarProductoUnico = $data['registrarProductoUnico'];
            $nombre = $data['nombre'];
            $precio = $data['precio'];
            $cantidad = $data['cantidad'];
            $codigo_invitacion = $data['codigo_invitacion'];
        }
        break;
    case 'PUT':
        if (isset($data['modificarProducto'])) {
            $modificarProducto = $data['modificarProducto'];
            $id_Producto = $data['modificarProducto'];
            $Nombre = $data['nombre'];
            $Stock = $data['stock'];
            $Precio_unit = $data['precio'];
            $Stock_Min = $data['stock_min'];
            $Marca = $data['marca'];
            $Presentacion = $data['presentacion'];
            $Descripcion = $data['descripcion'];
            $Categoria = $data['categoria'];
            $Fecha_vencimiento = $data['fechaVencimiento'];
            $Estado = $data['estado'];
            $idProveedor = $data['idProveedor'];
        }
        break;
    case 'DELETE':
        if (isset($_GET['id_Producto'])) {
            $id_Producto = $_GET['id_Producto'];
        }
        break;
    default:
        break;
}

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
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit();
    }
} else if (isset($listar)) {
    $pDao = new ProductoDao();
    $pDto = new productoDao();
    $lista = $pDao->listarTodos();
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $producto) {
        // Asegúrate de que cada producto sea un array o un objeto
        $response[] = [
            $producto['id_Producto'],
            $producto['Nombre'],
            $producto['Precio_unit'],
            $producto['Descripcion'],
            $producto['Marca'],
            $producto['Categoria'],
            $producto['Presentacion'],
            $producto['Fecha_vencimiento'],
            $producto['Stock'],
            $producto['Stock_Min'],
            $producto['estado'],
            $producto['inventario_id_Inventario'],
            $producto['idProveedor'],
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($registrarProductoUnico)) {
    $pDao = new productoDao();
    $pDto = new productoDto();
    $pDto->setNombre($nombre);
    $pDto->setPrecio_unit($precio);
    $pDto->setDescripción('');
    $pDto->setMarca('');
    $pDto->setCategoría('');
    $pDto->setPresentacion('');
    $pDto->setFecha_vencimiento('');
    $pDto->setStock($cantidad);
    $pDto->setStock_Min('');
    $mensaje = $pDao->registrarProductoUnico($pDto, $codigo_invitacion);
    if ($mensaje === 'Registrado Exitosamente') {
        $response = ['registro' => true];
        echo json_encode($response);
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
        if ($mensaje === 'Producto eliminado') {
            $response = ['Operacion' => true];
            echo json_encode($response);
            exit();
        }
        $response = ['Operacion' => false];
        echo json_encode($response);
        exit();
    }
} else if (isset($_POST['modificarProducto2'])) {
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
    $pDto->setEstado($_POST['Estado']);
    $pDto->setinventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje = $pDao->modificarProducto($pDto);
    header("Location:../tablas/producto/listarproducto.php?mensaje=" . $mensaje);
} else if (isset($modificarProducto)) {
    $pDao = new productoDao();
    $pDto = new productoDto();
    $pDto->setId_Producto($id_Producto);
    $pDto->setNombre($Nombre);
    $pDto->setPrecio_unit($Precio_unit);
    $pDto->setDescripción($Descripcion);
    $pDto->setMarca($Marca);
    $pDto->setCategoría($Categoria);
    $pDto->setPresentacion($Presentacion);
    $pDto->setFecha_vencimiento($Fecha_vencimiento);
    $pDto->setStock($Stock);
    $pDto->setStock_Min($Stock_Min);
    $pDto->setEstado($Estado);
    $pDto->setIdProveedor($idProveedor);
    $mensaje = $pDao->modificarProducto2($pDto);

    echo json_encode(['mensaje' => $mensaje]);
    exit();
} else if (isset($listarProductosApp)) {
    $pDao = new ProductoDao();
    $lista = $pDao->listarProductosApp($codigo_invitacion);
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $producto) {
        // Asegúrate de que cada producto sea un array o un objeto
        $response[] = [
            $producto['id_Producto'],
            $producto['Nombre'],
            $producto['Marca'],
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($listarProductosAppPrecio)) {
    $pDao = new ProductoDao();
    $lista = $pDao->listarProductosAppPrecio($codigo_invitacion);
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $producto) {
        // Asegúrate de que cada producto sea un array o un objeto
        $response[] = [
            $producto['id_Producto'],
            $producto['Nombre'],
            $producto['Marca'],
            $producto['Precio_unit'],
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($consultaDatosProducto)) {
    $pDao = new ProductoDao();
    $lista = $pDao->consultaDatosProducto($id_Producto);
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $producto) {
        // Asegúrate de que cada producto sea un array o un objeto
        $response[] = [
            $producto['Nombre'],
            $producto['Marca'],
            $producto['Precio_unit'],
            $producto['Descripcion'],
            $producto['Marca'],
            $producto['Categoria'],
            $producto['Presentacion'],
            $producto['Fecha_vencimiento'],
            $producto['Stock'],
            $producto['Stock_Min'],
            $producto['Estado'],
            $producto['nombre'],
            isset($producto['idProveedor']) && !empty($producto['idProveedor']) ? $producto['idProveedor'] : null, // Manejo de NULL
        ];
        echo json_encode($response);
        exit();
    }
}
