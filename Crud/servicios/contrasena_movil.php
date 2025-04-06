<?php
// servicio_contrasena_movil.php

// 1) Configuración inicial
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2) Obtener y validar datos
$input = json_decode(file_get_contents("php://input"), true) ?? [];
$action = $input['action'] ?? '';

// Definir variables por fuera del try para evitar errores si no se inicializan
$correo = '';
$codigo = '';

if (empty($action)) {
    echo json_encode(['status' => 'error', 'message' => 'Acción no especificada']);
    exit;
}

// 3) Incluir dependencias
require_once __DIR__ . '/../utilidades/conexion.php';
require_once __DIR__ . '/../servicios/contrasena.php';
require_once __DIR__ . '/../Dao/usuariosDao.php';

// 4) Procesar acciones
try {
    $dao = new UsuarioDao();

    switch ($action) {
        case 'enviar_codigo':
            $correo = trim($input['correo'] ?? '');

            if (empty($correo)) {
                throw new Exception('Correo no proporcionado');
            }

            if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Correo no válido');
            }

            if (!$dao->buscarUsuarioPorCorreo($correo)) {
                throw new Exception('Correo no registrado');
            }

            // Enviar código
            $resultado = Correo::enviarCodigoVerificacion($correo);
            $respuesta = json_decode($resultado, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Respuesta inválida del servidor');
            }

            echo $resultado;
            break;

            case 'verificar_codigo':
                $correo = isset($input['correo']) ? trim($input['correo']) : '';
                $codigo = isset($input['codigo']) ? trim($input['codigo']) : '';
            
                if (!$correo || !$codigo) {
                    throw new Exception('Se requieren correo y código');
                }
            
                
                $respuesta = $dao->verificarCodigo($correo, $codigo);
            
                if ($respuesta['status'] === 'success') {
                    if (!$dao->guardarCodigoEnUsuarios($correo, $codigo)) {
                        error_log("Error al guardar código para: $correo");
                    }
                }
            
                echo json_encode($respuesta);
                break;
                case 'cambiar_contrasena':
                    $correo = trim($input['correo'] ?? '');
                    $nuevaContrasena = trim($input['nuevaContrasena'] ?? '');
                
                    if (!$correo || !$nuevaContrasena) {
                        throw new Exception('Se requieren correo y nueva contraseña');
                    }
                
                    if ($dao->actualizarPassword($correo, $nuevaContrasena)) {
                        echo json_encode([
                            'status' => 'success',
                            'message' => 'Contraseña actualizada correctamente'
                        ]);
                    } else {
                        throw new Exception('No se pudo actualizar la contraseña');
                    }
                    break;
                
            
        default:
            throw new Exception('Acción no válida');
    }
} catch (Exception $e) {
    error_log("Error con acción '$action' para $correo. Código: $codigo. Mensaje: " . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

exit;
