<?php

header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');
// Manejar la solicitud OPTIONS
/*if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Si es una solicitud OPTIONS, simplemente devuelve un 200 OK
    http_response_code(200);
    exit();
}*/

require '../Dao/productoDao.php';
require '../Dto/productoDto.php';

$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['regristroProducto'])) {
    // $nombreTienda = $data['nombreTienda'];
    // $telefono = $data['telefono'];
    // $email = $data['email'];
    // $contrasena = $data['contrasena'];
    // $direccion = $data['direccion'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
} else if (isset($data['listarProductosApp'])) {
    $listarProductosApp = $data['listarProductosApp'];
    $codigo_invitacion = $data['codigo_invitacion'];
} else if (isset($data['listarProductosAppPrecio'])) {
    $listarProductosAppPrecio = $data['listarProductosAppPrecio'];
    $codigo_invitacion = $data['codigo_invitacion'];
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
            $producto['inventario_id_Inventario'],
        ];
    }
    echo json_encode($response);
    exit();
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
} else if (isset($listarProductosApp)) {
    $pDao = new ProductoDao();
    $lista = $pDao->listarProductosApp($codigo_invitacion);
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $producto) {
        // Asegúrate de que cada producto sea un array o un objeto
        $response[] = [
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
            $producto['Nombre'],
            $producto['Marca'],
            $producto['Precio_unit'],
        ];
    }
    echo json_encode($response);
    exit();
}