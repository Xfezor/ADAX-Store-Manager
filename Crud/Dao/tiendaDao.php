<?php

class tiendaDao{

    public function registrarTienda(tiendaDto $tiendaDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $idtienda= $tiendaDto->getIdtienda();
        $nombreTienda = $tiendaDto->getNombretienda();
        $direccion = $tiendaDto->getDireccion();
        $telefono = $tiendaDto->getTelefono();
        $correo = $tiendaDto->getCorreo();
        $documento = $tiendaDto->getDocumento();
        $tipo_documento = $tiendaDto->getTipoDocumento();
        $contrasena = $tiendaDto->getContrasena();
        $codigo_inv = $tiendaDto->getCodigo_invitacion();
        try {
            $query = $conn->prepare("INSERT INTO tienda(nombreTienda,direccion,telefono,correo,documento,tipo_documento,contrasena) values (?,?,?,?,?,?,?);");
            $query->bindParam(1,$nombreTienda);
            $query->bindParam(2,$direccion);
            $query->bindParam(3,$telefono);
            $query->bindParam(4,$correo);
            $query->bindParam(5,$documento);
            $query->bindParam(6,$tipo_documento);
            $query->bindParam(7,$contrasena);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 
    public function registrarTiendaCrud(tiendaDto $tiendaDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $idtienda= $tiendaDto->getIdtienda();
        $nombreTienda = $tiendaDto->getNombretienda();
        $direccion = $tiendaDto->getDireccion();
        $telefono = $tiendaDto->getTelefono();
        $correo = $tiendaDto->getCorreo();
        $documento = $tiendaDto->getDocumento();
        $tipo_documento = $tiendaDto->getTipoDocumento();
        $contrasena = $tiendaDto->getContrasena();
        $codigo_inv = $tiendaDto->getCodigo_invitacion();
        try {
            $query = $conn->prepare("INSERT INTO tienda values (?,?,?,?,?,?,?,?,?);");
            $query->bindParam(1,$idtienda);
            $query->bindParam(2,$nombreTienda);
            $query->bindParam(3,$direccion);
            $query->bindParam(4,$telefono);
            $query->bindParam(5,$correo);
            $query->bindParam(6,$documento);
            $query->bindParam(7,$tipo_documento);
            $query->bindParam(8,$contrasena);
            $query->bindParam(9,$codigo_inv);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 
    public function listarTodos(){
        $conn = Conexion::getConexion();
        try {
            $listarUsuarios = 'SELECT * from tienda';
            $query = $conn->prepare($listarUsuarios);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarTienda(tiendaDto $tiendaDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $idtienda= $tiendaDto->getIdtienda();
        $nombreTienda = $tiendaDto->getNombretienda();
        $direccion = $tiendaDto->getDireccion();
        $telefono = $tiendaDto->getTelefono();
        $correo = $tiendaDto->getCorreo();
        $documento = $tiendaDto->getDocumento();
        $tipo_documento = $tiendaDto->getTipoDocumento();
        $contrasena = $tiendaDto->getContrasena();
        $codigo_inv = $tiendaDto->getCodigo_invitacion();
        try {
            $query = $cnn->prepare("UPDATE tienda SET idtienda=?, nombreTienda=?, direccion=?, telefono=?, correo=?, documento=?, tipo_documento=?, contrasena=?, codigo_invitacion=? WHERE idtienda=?");
            $query->bindParam(1,$idtienda);
            $query->bindParam(2,$nombreTienda);
            $query->bindParam(3,$direccion);
            $query->bindParam(4,$telefono);
            $query->bindParam(5,$correo);
            $query->bindParam(6,$documento);
            $query->bindParam(7,$tipo_documento);
            $query->bindParam(8,$contrasena);
            $query->bindParam(9,$codigo_inv);
            $query->bindParam(10,$idtienda);
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener Tienda
    public function obtenerTienda($idtienda){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM tienda WHERE idtienda=?');
        $query->bindParam(1, $idtienda);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar Tienda 
    public function eliminarTienda($idtienda){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM tienda WHERE idtienda= ?');
            $query->bindParam(1, $idtienda);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    

}