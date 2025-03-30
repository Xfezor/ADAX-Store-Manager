<?php

class UsuarioDao
{
       public function buscarUsuarioPorCorreo($correo) {
        $conexion = Conexion::getConexion(); // Obtener conexión
        try {
            $query = "SELECT * FROM usuarios WHERE correo = ?";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(1, $correo, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); // Devuelve el usuario si existe
        } catch (PDOException $ex) {
            error_log("Error al buscar usuario: " . $ex->getMessage());
            return false; // Manejo de errores
        }
    }
        public function actualizarPassword($correo, $newPassword) {
            $conexion = Conexion::getConexion(); // Obtener conexión a la base de datos
            try {
                $query = $conexion->prepare("UPDATE usuarios SET contrasena = ? WHERE correo = ?");
                $query->bindParam(1, $newPassword, PDO::PARAM_STR);
                $query->bindParam(2, $correo, PDO::PARAM_STR);
                return $query->execute(); // Ejecutar la consulta y devolver el resultado
            } catch (PDOException $ex) {
                error_log("Error al actualizar la contraseña: " . $ex->getMessage());
                return false; // Manejo de errores
            }
        }

        public function guardarCodigoEnUsuarios($correo, $codigo) {
            $conexion = Conexion::getConexion();
            try {
                // Actualizar la columna `codigo` en la tabla `usuarios`
                $query = "UPDATE usuarios SET codigo = ? WHERE correo = ?";
                $stmt = $conexion->prepare($query);
                $stmt->bindParam(1, $codigo, PDO::PARAM_STR);
                $stmt->bindParam(2, $correo, PDO::PARAM_STR);
        
                return $stmt->execute(); // Retorna true si la actualización fue exitosa
            } catch (PDOException $ex) {
                error_log("Error al guardar el código en la tabla usuarios: " . $ex->getMessage());
                return false;
            }
        }

        public function verificarCodigo($correo, $codigo) {
            $conexion = Conexion::getConexion();
            $query = "SELECT codigo FROM usuarios WHERE correo = ?";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(1, $correo, PDO::PARAM_STR);
            $stmt->execute();
            
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if ($resultado) {
                if ($resultado['codigo'] === $codigo) {
                    return ['status' => 'success', 'message' => 'Código correcto'];
                } else {
                    return ['status' => 'error', 'message' => 'Código incorrecto'];
                }
            } else {
                return ['status' => 'error', 'message' => 'El correo no existe'];
            }
        }
    public function registrarUsuario(UsuarioDto $usuarioDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $documento = $usuarioDto->getDocumento();
        $tipodoc = $usuarioDto->getTipo_doc();
        $contrasena = $usuarioDto->getContrasena();
        $nombre1 = $usuarioDto->getNombre1();
        $nombre2 = $usuarioDto->getNombre2();
        $apellido1 = $usuarioDto->getApellido1();
        $apellido2 = $usuarioDto->getApellido2();
        $correo = $usuarioDto->getCorreo();
        $rol = $usuarioDto->getRol_id_Rol();
        $codinv= $usuarioDto->getCodigoInvitacion();
        try {
            $query = $conn->prepare("select codigo_invitacion from tienda where codigo_invitacion = '$codinv'");
            $query->execute();
            $resultado = $query->fetch();
            $mensaje = "Registrado Exitosamente";
            if ($resultado === false) {
                $mensaje = "El codigo de invitacion es invalido";
                header("Location:../../PAGINA/registro.php?error=3");
                exit; 
            } else {
                try {
                    $query = $conn->prepare("select idtienda from tienda where codigo_invitacion = '$codinv'");
                    $query->execute();
                    $resultado = $query->fetch();
                    $mensaje = "Registrado Exitosamente";
                    $idtienda = $resultado['idtienda'];
                    if ($resultado === false) {
                        $mensaje = "la query no fue exitosa, o el codigo de invitacion no existe";
                        // header("Location:../../HTML/registro.php?error=3");
                        // exit; // Add this to stop the script execution
                    } else {
                        try {
                            $query = $conn->prepare("INSERT INTO usuarios values (?,?,?,?,?,?,?,?,?,?,?)");
                            $query->bindParam(1,$documento);
                            $query->bindParam(2,$tipodoc);
                            $query->bindParam(3,$contrasena);
                            $query->bindParam(4,$nombre1);
                            $query->bindParam(5,$nombre2);
                            $query->bindParam(6,$apellido1);
                            $query->bindParam(7,$apellido2);
                            $query->bindParam(8,$correo);
                            $query->bindParam(9,$rol);
                            $query->bindParam(10,$codinv);
                            $query->bindParam(11, $idtienda);
            
                            $query->execute();
                            $mensaje = "Registrado Exitosamente";
                        } catch (Exception $ex) {
                            $mensaje = $ex->getMessage();
                            //header("Location:../../PAGINA/registro.php?error=4");
                        }
                    }

                } catch (Exception $ex) {
                    $mensaje = $ex->getMessage();
                }

            }
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }

        $conn = null;
        return $mensaje;
    }

    // modificar usuario


    public function listarTodos(){
        $conn = Conexion::getConexion();
        try {
            $listarUsuarios = 'SELECT * from usuarios';
            $query = $conn->prepare($listarUsuarios);
            $query->execute();
            return $query->fetchAll();

        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarUsuario(UsuarioDto $usuarioDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $documento = $usuarioDto->getDocumento();
        $tipodoc = $usuarioDto->getTipo_doc();
        $contrasena = $usuarioDto->getContrasena();
        $nombre1 = $usuarioDto->getNombre1();
        $nombre2 = $usuarioDto->getNombre2();
        $apellido1 = $usuarioDto->getApellido1();
        $apellido2 = $usuarioDto->getApellido2();
        $correo = $usuarioDto->getCorreo();
        $rol = $usuarioDto->getRol_id_Rol();
        $codinv= $usuarioDto->getCodigoInvitacion();
        try {
            $query = $cnn->prepare("UPDATE usuarios SET documento=?, tipo_doc=?, contrasena=?, nombre1=?, nombre2=?, apellido1=?, apellido2=?, correo=?, rol_id_Rol=?, codigo_invitacion=? WHERE documento=?");
            $query->bindParam(1,$documento);
            $query->bindParam(2,$tipodoc);
            $query->bindParam(3,$contrasena);
            $query->bindParam(4,$nombre1);
            $query->bindParam(5,$nombre2);
            $query->bindParam(6,$apellido1);
            $query->bindParam(7,$apellido2);
            $query->bindParam(8,$correo);
            $query->bindParam(9,$rol);
            $query->bindParam(10,$codinv);
            $query->bindParam(11,$documento);
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener usuario
    public function obtenerUsuario($doc){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM usuarios WHERE documento=?');
        $query->bindParam(1, $doc);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar Usuario
    public function eliminarUsuario($doc){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM usuarios WHERE documento= ?');
            $query->bindParam(1, $doc);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    

}
