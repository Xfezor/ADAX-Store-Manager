<?php
// Activar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración de sesión mejorada
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', false); // true en producción con HTTPS
ini_set('session.cookie_httponly', true);
ini_set('session.cookie_lifetime', 3600);
ini_set('session.gc_maxlifetime', 3600);

// Establecer parámetros de la cookie antes de iniciar sesión
session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'domain' => 'localhost', // Ajusta si usas un dominio diferente
    'secure' => false, // true si usas HTTPS
    'httponly' => true,
    'samesite' => 'None'
]);

// Iniciar sesión
session_start(); 

// Verificar si la sesión se está iniciando correctamente
error_log("🔵 Session ID en Correo.php: " . session_id());
error_log("🔵 Código generado: " . ($_SESSION['codigo_verificacion'] ?? 'No guardado'));
error_log("🔵 Correo almacenado: " . ($_SESSION['correo_verificacion'] ?? 'No guardado'));

// Headers para CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

class Correo {

    public static function enviarCodigoVerificacion($correo) {
        if (empty($correo)) {
            return json_encode(['success' => false, 'message' => 'El correo es inválido o está vacío']);
        }
    
        require_once __DIR__ . '/../Dao/usuariosDao.php';
        $uDao = new UsuarioDao();
        $usuario = $uDao->buscarUsuarioPorCorreo($correo);
    
        if (!$usuario) {
            return json_encode(['success' => false, 'message' => 'El correo no está registrado']);
        }
    
        // **Generar código aleatorio de 6 dígitos**
        $codigo = rand(100000, 999999);
    
        // **Guardar el código en la tabla `usuarios`**
        if (!$uDao->guardarCodigoEnUsuarios($correo, $codigo)) {
            return json_encode(['success' => false, 'message' => 'Error al guardar el código en la base de datos']);
        }
    
        // Configuración de PHPMailer para enviar el código
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host       = "smtp.gmail.com";
            $mail->SMTPAuth   = true;
            $mail->Username   = "adaxsoporte@gmail.com";
            $mail->Password   = "mqahbrxozsnxbgqy";
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;
    
            $mail->setFrom("adaxsoporte@gmail.com", "ADMINISTRADOR");
            $mail->addAddress($correo);
    
            $mail->isHTML(true);
            $mail->Subject = "Tu código de verificación";
            $mail->Body    = "<h2>Tu código de verificación es: <strong>$codigo</strong></h2>";
    
            if ($mail->send()) {
                return json_encode(['success' => true, 'message' => 'Correo enviado correctamente']);
            } else {
                return json_encode(['success' => false, 'message' => 'Error al enviar el correo']);
            }
        } catch (Exception $e) {
            return json_encode(['success' => false, 'message' => 'Error al enviar el correo: ' . $mail->ErrorInfo]);
        }
    }
       
 }
?>
