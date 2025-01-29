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
    


    require '../Dao/movimientoDao.php';
    require '../Dto/movimientoDto.php';
    require '../utilidades/conexion.php';

    // Deshabilitar el caché
    header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
    header("Pragma: no-cache"); // HTTP 1.0
    header("Expires: 0"); // Proxies

    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['regristro'])) {
        $id_Movimiento = $data['id_Movimiento'];
        $cantidad_despues = $data['cantidad_despues'];
        $fecha_movimiento = $data['fecha_movimiento'];
        $fecha_modificacion = $data['fecha_modificacion'];
        $estado_despues = $data['estado_despues'];
        $inventario_id_Inventario = $data['inventario_id_Inventario'];
    }
    if (isset($data['listar'])) {
        $listar = $data['listar'];
    }
    


if (isset($_POST['registro'])){
    $mDao = new MovimientoDao();
    $mDto = new MovimientoDto();
    $mDto->setId_Movimiento($id_Movimiento);
    $mDto->setCantidad_despues($cantidad_despues);
    $mDto->setFecha_movimiento($fecha_movimiento);
    $mDto->setFecha_modificacion($fecha_modificacion);
    $mDto->setEstado_despues($estado_despues);
    $mDto->setInventario_id_Inventario($inventario_id_Inventario);

    $mensaje = $mDao->registrarMovimiento($mDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
        
    }
} else if (isset($listar) ||isset($_GET['si'])) {
    $mDao = new MovimientoDao();
    $mDto = new MovimientoDto();
    $lista = $mDao->listarTodos();
    $response = []; 
    foreach ($lista as $movimiento) {
        // Asegúrate de que cada  sea un array o un objeto
        $response[] = [
            $movimiento['id_Movimiento'],
            $movimiento['cantidad_despues'],
            $movimiento['fecha_movimiento'],
            $movimiento['fecha_modificacion'],
            $movimiento['estado_despues'],
            $movimiento['inventario_id_Inventario'],
    ];
    }
    echo json_encode($response);
    exit();
}else if (isset($_POST['registrocrud'])){
    $mDao = new MovimientoDao();
    $mDto = new MovimientoDto();
    $mDto->setId_Movimiento($_POST['id_Movimiento']);
    $mDto->setCantidad_despues($_POST['cantidad_despues']);
    $mDto->setFecha_movimiento($_POST['fecha_movimiento']);
    $mDto->setFecha_modificacion($_POST['fecha_modificacion']);
    $mDto->setEstado_despues($_POST['estado_despues']);
    $mDto->setInventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje = $mDao->registrarMovimiento($mDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/movimiento/listarmovimiento.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['id_Movimiento']!=null){
    
    $mDao = new MovimientoDao();
    $mensaje = $mDao->eliminarMovimiento($_GET['id_Movimiento']);
    header("Location:../tablas/movimiento/listarmovimiento.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $mDao = new MovimientoDao();
    $mDto = new MovimientoDto();
    $mDto->setId_Movimiento($_POST['id_Movimiento']);
    $mDto->setCantidad_despues($_POST['cantidad_despues']);
    $mDto->setFecha_movimiento($_POST['fecha_movimiento']);
    $mDto->setFecha_modificacion($_POST['fecha_modificacion']);
    $mDto->setEstado_despues($_POST['estado_despues']);
    $mDto->setInventario_id_Inventario($_POST['inventario_id_Inventario']);

    $mensaje =$mDao->modificarMovimiento($mDto);
    header("Location:../tablas/movimiento/listarmovimiento.php?mensaje=".$mensaje);
}