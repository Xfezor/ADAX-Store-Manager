<?php

header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require '../Dao/clienteDao.php';
require '../Dto/clienteDto.php';
require '../utilidades/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
if(isset($data['registro'])) {
    $id_Cliente = $data['id_Cliente'];
    $documento = $data['documento'];
    $nombre1_Cliente = $data['nombre1_Cliente'];
    $nombre2_Cliente = $data['nombre2_Cliente'];
    $apellido1_Cliente = $data['apellido1_Cliente'];
    $apellido2_Cliente = $data['apellido2_Cliente'];
    $tipo_documento_Cliente = $data['tipo_documento'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}

if (isset($registro)) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setid_Cliente($id_Cliente);
    $cDto->setDocumento($documento);
    $cDto->setNombre1_Cliente($Nombre1_Cliente);
    $cDto->setNombre2_Cliente($Nombre2_Cliente);
    $cDto->setApellido1_Cliente($Apellido1_Cliente);
    $cDto->setApellido2_Cliente($Apellido2_Cliente);
    $cDto->setTipo_documento($tipo_documento_Cliente);

    $mensaje = $cDao->registrarCliente($cDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../../PAGINA/registro.php?registro=exitoso");
        exit;
    }
} else if (isset($listar) || isset($_GET['si'])) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $lista = $cDao->listarTodos();
    $response = [];
    foreach ($lista as $cliente) {
        $response[] = [
            $cliente['id_Cliente'],
            $cliente['Documento'],
            $cliente['Nombre1_Cliente'],
            $cliente['Nombre2_Cliente'],
            $cliente['Apellido1_Cliente'],
            $cliente['Apellido2_Cliente'],
            $cliente['Tipo_documento']
        ];
    }
    echo json_encode($response);
    exit();
} 
else if (isset($_POST['registrocrud'])) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setid_Cliente($_POST['id_Cliente']);
    $cDto->setDocumento($_POST['Documento']);
    $cDto->setNombre1_Cliente($_POST['Nombre1_Cliente']);
    $cDto->setNombre2_Cliente($_POST['Nombre2_Cliente']);
    $cDto->setApellido1_Cliente($_POST['Apellido1_Cliente']);
    $cDto->setApellido2_Cliente($_POST['Apellido2_Cliente']);
    $cDto->setTipo_documento($_POST['Tipo_documento']);


    $mensaje = $cDao->registrarCliente($cDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/cliente/listarcliente.php?mensaje=registro exitoso");
        exit;
    }
} else if ($_GET['id_Cliente'] != null) {
    $cDao = new clienteDao();
    $mensaje = $cDao->eliminarCliente($_GET['id_Cliente']);
    header("Location:../tablas/cliente/listarcliente.php?mensaje=" . $mensaje);
    exit();
} else if (isset($_POST['modificar'])) {
    $cDao = new clienteDao();
    $cDto = new clienteDto();
    $cDto->setid_Cliente($_POST['id_Cliente']);
    $cDto->setDocumento($_POST['Documento']);
    $cDto->setNombre1_Cliente($_POST['Nombre1_Cliente']);
    $cDto->setNombre2_Cliente($_POST['Nombre2_Cliente']);
    $cDto->setApellido1_Cliente($_POST['Apellido1_Cliente']);
    $cDto->setApellido2_Cliente($_POST['Apellido2_Cliente']);
    $cDto->setTipo_documento($_POST['Tipo_documento']);


    $mensaje = $cDao->modificarCliente($cDto);
    header("Location:../tablas/cliente/listarcliente.php?mensaje=" . $mensaje);
}