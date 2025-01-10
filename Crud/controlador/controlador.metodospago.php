<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
};

require '../Dao/metodopagoDao.php';
require '../Dto/metodopagoDto.php';
require '../utilidades/conexion.php';

header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies


$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['registro'])) {
    $id_metododepago = $data['ID_Met_pago'];
    $nombreMetodo = $data['Nombre'];
}

if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($registrarRol)) {
    $mpDao = new metodopagoDao();
    $mpDto = new metodopagoDto();
    $mpDto->setId_metodopago($id_metododepago);
    $mpDto->setNombre_Metodo($Nombre);

    $mensaje = $mpDao->registrarMetodoPago($mpDto);
    echo $mensaje;
    if ($mensaje == 'Registrado exitosamente') {
        header("Location:../tablas/metodos_Pago/listarmetdospago.php?mensaje=" . $mensaje);
        exit;
    }
} else if (isset($listar) || isset($GET['si'])) {
    $mpDao = new metodopagoDao;
    $mpDto = new metodopagoDto;
    $listarMetodos = $mpDao->listarTodos();
    $response = [];
    foreach ($listarMetodos as $metodosdepago) {
        $response[] = [
            $metodosdepago ['ID_Met_pago'],
            $metodosdepago ['Nombre'],
        ];
    }
    echo json_encode($response);
    exit();

}else if (isset($_POST['registrarMetodoPagoCrud'])) {
    $mpDao = new metodopagoDao();
    $mpDto = new metodopagoDto();
    $mpDto->setNombre_Metodo($_POST['Nombre']);

    $mensaje = $mpDao->registrarMetodoPagoCrud($mpDto);
    echo $mensaje;
    if ($mensaje === 'Metodo de Pago registrado Exitosamente') {
        header("Location:../tablas/metodos_Pago/listarmetodospago.php?mensaje=".$mensaje);
        exit;
    }
}
else if ($_GET['ID_Met_pago']) {
    $mpDao = new metodopagoDao();
    $mensaje = $mpDao->eliminarMetodosPago($_GET['ID_Met_pago']);
    header("Location:../tablas/metodos_Pago/listarmetodospago.php?mensaje=".$mensaje);
    exit();
}
else if (isset($_POST['modificarMetodosPago'])) {
    $mpDao = new metodopagoDao();
    $mpDto = new metodopagoDto();
    $mpDto->setId_metodopago($_POST['ID_Met_pago']);
    $mpDto->setNombre_Metodo($_POST['Nombre']);
    $mensaje = $mpDao->modificarMetodosPago($mpDto);
    header("Location:../tablas/metodos_Pago/listarmetodospago.php?mensaje=".$mensaje);
}