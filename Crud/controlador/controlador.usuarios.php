<?php
// Asegúrate de que no haya espacios en blanco o líneas antes de esta línea
header("Access-Control-Allow-Origin: *"); // Permite todas las solicitudes de cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
header('Content-Type: application/json');
// Manejar la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Si es una solicitud OPTIONS, simplemente devuelve un 200 OK
    http_response_code(200);
    exit();
}

require '../Dao/usuariosDao.php';
require '../Dto/usuariosDto.php';
require '../utilidades/conexion.php';


// Deshabilitar el caché
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies



$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['registro'])) {
    $documento = $data['documento'];
    $tipodoc = $data['tipoDoc'];
    $contrasena = $data['contrasena'];
    $nombre1 = $data['nombre'];
    $nombre2 = $data['nombre2'];
    $apellido1 = $data['apellido'];
    $apellido2 = $data['apellido2'];
    $email = $data['email'];
    $codigo_invitacion = $data['codigo_invitacion'];
    $registro = $data['registro'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}


if (isset($registro)||isset($_GET['no'])) {
    $uDao = new UsuarioDao();
    $uDto = new usuarioDto();
    $uDto->setDocumento($documento);
    $uDto->setTipo_doc($tipodoc);
    $uDto->setContrasena($contrasena);
    $uDto->setNombre1($nombre1);
    $uDto->setNombre2($nombre2);
    $uDto->setApellido1($apellido1);
    $uDto->setApellido2($apellido2);
    $uDto->setCorreo($email);
    $uDto->setRol_id_Rol('2');
    $uDto->setCodigoInvitacion($codigo_invitacion);

    $mensaje = $uDao->registrarUsuario($uDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }


} else if (isset($listar) ||isset($_GET['si'])) {
    $uDao = new UsuarioDao();
    $uDto = new usuarioDto();
    $lista = $uDao->listarTodos();
    $response = []; // Inicializa un array para la respuesta
    foreach ($lista as $usuario) {
        // Asegúrate de que cada usuario sea un array o un objeto
        $response[] = [
            $usuario['documento'],
            $usuario['tipo_doc'],
            preg_replace('/[^\x20-\x7E]/', '', $usuario['contrasena']),
            $usuario['nombre1'],
            $usuario['nombre2'],
            $usuario['apellido1'],
            $usuario['apellido2'],
            $usuario['correo'],
            $usuario['rol_id_Rol'],
            $usuario['codigo_invitacion'],
            $usuario['tienda_idtienda'] // Asegúrate de que este método exista
        ];
    }
    echo json_encode($response);
    exit();
} else if (isset($_POST['registrocrud'])) {
    $uDao = new UsuarioDao();
    $uDto = new usuarioDto();
    $uDto->setDocumento($_POST['document']);
    $uDto->setTipo_doc($_POST['tipodoc']);
    $uDto->setContrasena($_POST['contrasena']);
    $uDto->setNombre1($_POST['nombre1']);
    $uDto->setNombre2($_POST['nombre2']);
    $uDto->setApellido1($_POST['apellido1']);
    $uDto->setApellido2($_POST['apellido2']);
    $uDto->setCorreo($_POST['correo']);
    $uDto->setRol_id_Rol($_POST['idrol']);
    $uDto->setCodigoInvitacion($_POST['codigoinvitacion']);

    $mensaje = $uDao->registrarUsuario($uDto);
    echo $mensaje;
    if ($mensaje === 'Registrado Exitosamente') {
        header("Location:../tablas/usuario/listarusuarios.php?mensaje=registro exitoso");
        exit();
    }
} else if ($_GET['docu'] != null) {
    $uDao = new UsuarioDao();
    $mensaje = $uDao->eliminarUsuario($_GET['docu']);
    header("Location:../tablas/usuario/listarusuarios.php?mensaje=" . $mensaje);
    exit();
} else if (isset($_POST['modificar'])) {
    $uDao = new UsuarioDao();
    $uDto = new UsuarioDto();
    $uDto->setDocumento($_POST['document']);
    $uDto->setTipo_doc($_POST['tipodoc']);
    $uDto->setContrasena($_POST['contrasena']);
    $uDto->setNombre1($_POST['nombre1']);
    $uDto->setNombre2($_POST['nombre2']);
    $uDto->setApellido1($_POST['apellido1']);
    $uDto->setApellido2($_POST['apellido2']);
    $uDto->setCorreo($_POST['correo']);
    $uDto->setRol_id_Rol($_POST['idrol']);
    $uDto->setCodigoInvitacion($_POST['codigoinvitacion']);

    $mensaje = $uDao->modificarUsuario($uDto);
    header("Location:../tablas/usuario/listarusuarios.php?mensaje=" . $mensaje);
}