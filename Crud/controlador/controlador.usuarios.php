<?php
// Asegúrate de que no haya espacios en blanco o líneas antes de esta línea
header("Access-Control-Allow-Origin: http://localhost:3000"); // Cambiar * por tu frontend
header("Access-Control-Allow-Credentials: true"); // Permitir credenciales (cookies, sesiones, auth)
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Headers permitidos


// Manejar la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require '../Dao/usuariosDao.php';
require '../Dto/usuariosDto.php';
require '../utilidades/conexion.php';
require '../servicios/contrasena.php';

  
// Deshabilitar el caché
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies


$data = json_decode(file_get_contents('php://input'), true);

//Obtener el método de la solicitud para la App movil (get, post, put, delete)

switch ($_SERVER['REQUEST_METHOD']) {// obtener datos del usuario de la sesion
    case 'GET':
        if (isset($_GET['obtenerUsuario'])) { // Obtener datos del usuario
            $obtenerUsuario = $_GET['obtenerUsuario'];
            $doc = $_GET['obtenerUsuario'];
        }
    case 'POST':
        if(isset($data['action'])){
            $action = $data['action'];
            $correo = $data['correo'];
        }
        else if (isset($data['reset'])){
            $correo = $data['correo'] ?? null;
            $reset = $data['reset'];
        }
    break;
    case 'PUT':
        if (isset($data['actualizarApp'])) {
            $documento = $data['documento'] ?? null;
            $nombre1 = $data['nombre1'] ?? null;
            $nombre2 = $data['nombre2'] ?? null;
            $apellido1 = $data['apellido1'] ?? null;
            $apellido2 = $data['apellido2'] ?? null;
            $tipodoc = $data['tipoDoc'] ?? null;
            $email = $data['email'] ?? null;
            $actualizarApp = $data['actualizarApp'];
        }
    break;
}


$usuarioDao = new UsuarioDao();

// Si se solicita enviar el código de verificación
if (isset($data['action']) && $data['action'] === 'enviar_codigo') {
    // **Verificar si el correo existe**
    $usuario = $usuarioDao->buscarUsuarioPorCorreo($correo);
    if (!$usuario) {
        echo json_encode(['status' => 'error', 'message' => 'El correo no está registrado']);
        exit();
    }
    $respuestaCorreo = Correo::enviarCodigoVerificacion($correo);
    echo $respuestaCorreo;
    exit();
}

if (isset($data['action']) && $data['action'] === 'verificar_codigo') {
    if (!isset($data['correo']) || !isset($data['codigo'])) {
        echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
        exit();
    }

    $correo = $data['correo'];
    $codigo = $data['codigo'];

    // Instancia de UsuarioDao
    $usuarioDao = new UsuarioDao();
    $respuesta = $usuarioDao->verificarCodigo($correo, $codigo);

    echo json_encode($respuesta);
    exit();
}
if (isset($data['olvido']) && isset($data['reset'])) {
    // Verificar que se haya proporcionado la nueva contraseña
    if (!isset($data['password']) || empty($data['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Contraseña no proporcionada']);
        exit();
    }
    
    $newPassword = $data['password'];
    $usuario = $usuarioDao->buscarUsuarioPorCorreo($correo);
    if (!$usuario) {
        echo json_encode(['status' => 'error', 'message' => 'El correo no está registrado']);
        exit();
    }
    $resultado = $usuarioDao->actualizarPassword($correo, $newPassword);
    
    if ($resultado) {
        echo json_encode(['status' => 'success', 'message' => 'Contraseña actualizada correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No se pudo actualizar la contraseña']);
    }
    exit();
}
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
if (isset($data['registroCrud'])) {
    $documento = $data['documento'];
    $tipodoc = $data['tipoDoc'];
    $contrasena = $data['contrasena'];
    $nombre1 = $data['nombre'];
    $nombre2 = $data['nombre2'];
    $apellido1 = $data['apellido'];
    $apellido2 = $data['apellido2'];
    $email = $data['email'];
    $codigo_invitacion = $data['codigo_invitacion'];
    $idRol = $data['idRol'];
    $registroCrud = $data['registroCrud'];
}
if (isset($data['listar'])) {
    $listar = $data['listar'];
}
if (isset($data['eliminar'])) {
    $id = $data['eliminar'];
}
if (isset($data['actualizar']) ){
    $documento = $data['documento'];
    $tipodoc = $data['tipoDoc'];
    $contrasena = $data['contrasena'];
    $nombre1 = $data['nombre'];
    $nombre2 = $data['nombre2'];
    $apellido1 = $data['apellido'];
    $apellido2 = $data['apellido2'];
    $email = $data['email'];
    $codigo_invitacion = $data['codigo_invitacion'];
    $idRol = $data['idRol'];
    $actualizar = $data['actualizar'];
}
if (isset($data['obtenerUsuario'])) {
    $doc = $data['obtenerUsuario'];
    $obtenerUsuario = $data['obtenerUsuario'];
}

if (isset($registro) || isset($_GET['no'])) {
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


} else if (isset($listar) || isset($_GET['si'])) {
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
} else if (isset($registroCrud)) {
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
    $uDto->setRol_id_Rol($idRol);
    $uDto->setCodigoInvitacion($codigo_invitacion);

    $mensaje = $uDao->registrarUsuario($uDto);
    if ($mensaje === 'Registrado Exitosamente') {
        echo json_encode(['success' => true]);
        exit();
    }
} else if (isset($id)) {
    $uDao = new UsuarioDao();
    $mensaje = $uDao->eliminarUsuario($id);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);
    exit();
} else if (isset($actualizar) && !isset($actualizarApp)) {
    $uDao = new UsuarioDao();
    $uDto = new UsuarioDto();
    $uDto->setDocumento($documento);
    $uDto->setTipo_doc($tipodoc);
    $uDto->setContrasena($contrasena);
    $uDto->setNombre1($nombre1);
    $uDto->setNombre2($nombre2);
    $uDto->setApellido1($apellido1);
    $uDto->setApellido2($apellido2);
    $uDto->setCorreo($email);
    $uDto->setRol_id_Rol($idRol);
    $uDto->setCodigoInvitacion($codigo_invitacion);

    $mensaje = $uDao->modificarUsuario($uDto);
    echo json_encode(['respuesta' => true, 'mensaje' => $mensaje]);

} else if (isset($obtenerUsuario)) {
    $uDao = new UsuarioDao();
    $lista = $uDao->obtenerUsuario($doc);

    if (is_array($lista) && !empty($lista)) {
        $response = []; // Inicializa un array para la respuesta
        foreach ($lista as $usuario) {
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
                $usuario['tienda_idtienda']
            ];
        }
        echo json_encode(['status' => 'success', 'data' => $response]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
    }
    exit(); // Detener la ejecución después de enviar la respuesta
} else if (isset($actualizarApp)) {
    $uDao = new UsuarioDao();
    $uDto = new UsuarioDto();
    $uDto->setDocumento($documento);
    $uDto->setNombre1($nombre1);
    $uDto->setNombre2($nombre2);
    $uDto->setApellido1($apellido1);
    $uDto->setApellido2($apellido2);    
    $uDto->setTipo_doc($tipodoc);
    $uDto->setCorreo($email);

    $mensaje = $uDao->modificarUsuarioApp($uDto);
    echo json_encode(['success' => true, 'mensaje' => $mensaje]);
    exit();
}