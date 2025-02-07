<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
};

require '../Dao/inventarioDao.php';
require '../Dto/inventarioDto.php';
require '../utilidades/conexion.php';

header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies


$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['registro'])) {
    $id_inventario = $data['id_inventario'];
    $CantidadInventario = $data['cantidadInventario'];
    $fechaModificacion = $data['fechaModificacion'];
    $estado_revision = $data['estado_revisión'];
    $tienda_idtienda = $data['tienda_idtienda'];
    $registro = $data['registro'];
}
if (isset($data['registroCrud'])) {
    $id_inventario = $data['id_inventario'];
    $CantidadInventario = $data['CantidadInventario'];
    $fechaModificacion = $data['fechaModificacion'];
    $estado_revision = $data['estado_revision'];
    $tienda_idtienda = $data['tienda_idtienda'];
    $registroCrud = $data['registroCrud'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}
if (isset($data['eliminar'])) {
    $idInventario = $data['eliminar'];
}
if (isset($data['actualizar'])) {
    $id_inventario = $data['id_Inventario'];
    $CantidadInventario = $data['cantidadInventario'];
    $fechaModificacion = $data['fechaModificacion'];
    $estado_revision = $data['estado_revisión'];
    $tienda_idtienda = $data['tienda_idtienda'];
    $actualizar = $data['actualizar'];
}

if (isset($registro)) {
    $iDao = new InventarioDao();
    $iDto = new InventarioDto();
    $iDto->setId_Inventario($id_Inventario);
    $iDto->setCantidadInventario($cantidad_Inventario);
    $iDto->setFechaModificacion($fecha_Modficación);
    $iDto->setEstado_revision($estado_Revisión);
    $iDto->setTienda_idtienda($id_tienda);

    $mensaje = $iDao->registrarInventario($iDto);
    echo $mensaje;
    if ($mensaje == 'Registrado exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }
} else if (isset($listar)) {
    $iDao = new InventarioDao;
    $iDto = new InventarioDto;
    $listarInventario = $iDao->listarTodos();
    $response = [];
    foreach ($listarInventario as $inventario) {
        $response[] = [
            $inventario ['id_Inventario'],
            $inventario ['cantidadInventario'],
            $inventario ['fechaModificacion'],
            $inventario ['estado_revision'],
            $inventario ['tienda_idtienda']
        ];
    }
    echo json_encode($response);
    exit();

} else if (isset($registrocrud)){
    $iDao = new InventarioDao();
    $iDto = new InventarioDto();
    $iDto->setId_inventario($id_inventario);
    $iDto->setCantidadInventario($CantidadInventario);
    $iDto->setFechaModificacion( $fechaModificacion);
    $iDto->setEstado_revision( $estado_revision);
    $iDto->setTienda_idtienda( $tienda_idtienda);

    $mensaje = $iDao->registrarInventario($iDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }
}
else if ($idInventario){
    $iDao = new InventarioDao();
    $mensaje = $iDao->eliminarInventario($idInventario);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
}
else if (isset($actualizar)) {
    $iDao = new InventarioDao();
    $iDto = new InventarioDto();
    $iDto->setid_inventario($id_inventario);
    $iDto->setCantidadInventario($CantidadInventario);
    $iDto->setfechaModificacion($fechaModificacion);
    $iDto->setestado_revision($estado_revision);
    $iDto->settienda_idtienda($tienda_idtienda);

    $mensaje = $iDao->modificarInventario($iDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
}