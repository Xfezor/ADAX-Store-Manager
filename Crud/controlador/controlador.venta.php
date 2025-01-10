<?php
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
};

require '../Dao/ventaDao.php';
require '../Dto/ventaDto.php';
require '../utilidades/conexion.php';

header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies

//*<th style={{ 'fontWeight': 'normal' }}>Id de la Venta</th><th style={{ 'fontWeight': 'normal' }}>Fecha de la Venta</th>
//<th style={{ 'fontWeight': 'normal' }}>Hora de Venta</th>
//<th style={{ 'fontWeight': 'normal' }}>Estado de Venta</th>
//<th style={{ 'fontWeight': 'normal' }}>Cliente</th>
//<th style={{ 'fontWeight': 'normal' }}>Tienda</th>
//<th style={{ 'fontWeight': 'normal' }}>Id del metodo de Pago</th>
//<th style={{ 'fontWeight': 'normal' }}>Documento del Usuario</th>
//<th style={{ 'fontWeight': 'normal' }}>Id Tienda del Usuario</th>
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['registro'])) {
    $id_Venta = $data['id_Venta'];
    $Fecha_de_Venta = $data['FechaVenta'];
    $Hora_de_Venta = $data['HoraVenta'];
    $EstadoVenta = $data['EstadoVenta'];
    $id_Cliente = $data['cliente_id_cliente'];
    $id_Tienda = $data['tienda_idtienda'];
    $id_MetodoPago = $data['metododepago_ID_Met_Pago'];
    $documento_Usuarios = $data[' usarios_documento'];
    $id_Tienda_Usuarios = $data['usuarios_tienda_idtienda'];
}

if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($registrarVenta)) {
    $vDao = new ventaDao();
    $vDto = new ventaDto();
    $vDto->setId_Venta($id_Venta);
    $vDto->setFechaVenta($Fecha_de_Venta );
    $vDto->setHoraVenta($Hora_de_Venta );
    $vDto->setEstadoVenta($EstadoVenta );
    $vDto->setCliente_id_cliente($id_Cliente );
    $vDto->setTienda_idtienda($id_Tienda );
    $vDto->setMetododepago_ID_Met_pago($id_Metodo);
    $vDto->setUsuarios_documento($documento_Usuarios );

    $mensaje = $vDao->registrarVenta($vDto);
    echo $mensaje;
    if ($mensaje == 'Registrado exitosamente') {
        header("Location:../tablas/venta/listarventa.php?mensaje=" . $mensaje);
        exit;
    }
} else if (isset($listar) || isset($GET['si'])) {
    $vDao = new ventaDao;
    $vDto = new ventaDto;
    $listarVenta = $vDao->listarTodos();
    $response = [];
    foreach ($listarVenta as $venta) {
        $response[] = [
            $venta ['id_Venta'],
            $venta ['FechaVenta'],
            $venta ['HoraVenta'],
            $venta ['EstadoVenta'],
            $venta ['cliente_id_Cliente'],
            $venta ['tienda_idtienda'],
            $venta ['metododepago_ID_Met_pago'],
            $venta ['usuarios_documento'],
            $venta ['usuarios_tienda_idtienda'],
        ];
    }
    echo json_encode($response);
    exit();

}else if (isset($_POST['registrocrud'])){$
    $vDao = new ventaDao();
    $vDto = new ventaDto();
    $vDto->setId_Venta($_POST['id_Venta']);
    $vDto->setFechaVenta($_POST['FechaVenta']);
    $vDto->setHoraVenta($_POST['HoraVenta']);
    $vDto->setEstadoVenta($_POST['EstadoVenta']);
    $vDto->setCliente_id_Cliente($_POST['cliente_id_Cliente']);
    $vDto->setTienda_idtienda($_POST['tienda_idtienda']);
    $vDto->setMetododepago_ID_Met_pago($_POST['metododepago_ID_Met_pago']);
    $vDto->setUsuarios_documento($_POST['usuarios_documento']);
    $vDto->setUsuarios_tienda_idtienda($_POST['usuarios_tienda_idtienda']);

    $mensaje = $vDao->registrarVentaCrud($vDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/venta/listarventa.php?mensaje=registro exitoso");
        exit;
    }
}
if (isset($_GET['id_Vent'])) {
    $uDao = new UsuarioDao();
    $mensaje = $uDao->eliminarUsuario($_GET['id_Vent']);
    header("Location:../tablas/venta/listarventa.php?mensaje=".$mensaje);
    exit;
}
else if (isset($_POST['modificar'])){
    $vDao = new ventaDao();
    $vDto = new ventaDto();
    $vDto->setId_Venta($_POST['id_Venta']);
    $vDto->setFechaVenta($_POST['FechaVenta']);
    $vDto->setHoraVenta($_POST['HoraVenta']);
    $vDto->setEstadoVenta($_POST['EstadoVenta']);
    $vDto->setCliente_id_Cliente($_POST['cliente_id_Cliente']);
    $vDto->setTienda_idtienda($_POST['tienda_idtienda']);
    $vDto->setMetododepago_ID_Met_pago($_POST['metododepago_ID_Met_pago']);
    $vDto->setUsuarios_documento($_POST['usuarios_documento']);
    $vDto->setUsuarios_tienda_idtienda($_POST['usuarios_tienda_idtienda']);

    $mensaje =$vDao->modificarVenta($vDto);
    header("Location:../tablas/venta/listarventa.php?mensaje=".$mensaje);
}