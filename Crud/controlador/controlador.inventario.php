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
    $id_Inventario = $data['id_Inventario'];
    $cantidad_Inventario = $data['cantidadInventario'];
    $fecha_Modficación  = $data['fechaModificacion'];
    $estado_Revisión = $data['estado_revisión'];
    $id_tienda = $data['tienda_idtienda'];
}

if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($registrarInventario)) {
    $iDao = new InventarioDao();
    $iDto = new InventarioDto();
    $iDto->setId_Inventario($id_Inventario);
    $iDto->setCantidadInventario($cantidad_Inventario);
    $iDto->setfechaModificacion($fecha_Modficación);
    $iDto->setestado_revision($estado_Revisión);
    $iDto->settienda_idtienda($id_tienda);

    $mensaje = $iDao->registrarInventario($iDto);
    echo $mensaje;
    if ($mensaje == 'Registrado exitosamente') {
        header("Location:../tablas/inventario/listarinventario.php?mensaje=" . $mensaje);
        exit;
    }
} else if (isset($listar) || isset($GET['si'])) {
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

} else if (isset($_POST['registrocrud'])){
    $iDao = new InventarioDao();
    $iDto = new InventarioDto();
    $iDto->setid_inventario($_POST['id_inventario']);
    $iDto->setCantidadInventario($_POST['CantidadInventario']);
    $iDto->setfechaModificacion($_POST['fechaModificacion']);
    $iDto->setestado_revision($_POST['estado_revision']);
    $iDto->settienda_idtienda($_POST['tienda_idtienda']);

    $mensaje = $iDao->registrarInventario($iDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/Inventario/listarInventario.php?mensaje=registro exitoso");
        exit;
    }
}
else if ($_GET['id_Inventario']!=null){
    $iDao = new InventarioDao();
    $mensaje = $iDao->eliminarInventario($_GET['id_Inventario']);
    header("Location:../tablas/Inventario/listarInventario.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificar'])){
    $iDao = new InventarioDao();
    $iDto = new InventarioDto();
    $iDto->setid_inventario($_POST['id_Inventario']);
    $iDto->setCantidadInventario($_POST['CantidadInventario']);
    $iDto->setfechaModificacion($_POST['fechaModificacion']);
    $iDto->setestado_revision($_POST['estado_revision']);
    $iDto->settienda_idtienda($_POST['tienda_idtienda']);

    $mensaje =$iDao->modificarInventario($iDto);
    header("Location:../tablas/Inventario/listarInventario.php?mensaje=".$mensaje);
}