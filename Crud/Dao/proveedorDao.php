<?php

class proveedorDao{

    public function registrarProveedor(proveedorDto $proveedorDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $idproveedor = $proveedorDto->getIdproveedor();
        $nombre = $proveedorDto->getNombre();
        $telefono = $proveedorDto->gettelefono();
        $email = $proveedorDto->getEmail();
        $id_tienda = $proveedorDto->getId_tienda();
       
        try {
            $query = $conn->prepare("INSERT INTO proveedor(nombre,telefono,email,id_tienda) values (?,?,?,?,?);");
            $query->bindParam(1,$idproveedor);
            $query->bindParam(2,$nombre);
            $query->bindParam(3,$telefono);
            $query->bindParam(4,$email);
            $query->bindParam(5,$id_tienda);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 
    public function registrarProveedorCrud(proveedorDto $proveedorDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $idproveedor = $proveedorDto->getIdproveedor();
        $nombre = $proveedorDto->getNombre();
        $telefono = $proveedorDto->getTelefono();
        $email = $proveedorDto->getEmail();
        $id_tienda = $proveedorDto->getId_tienda();
       
        try {
            $query = $conn->prepare("INSERT INTO proveedor values (?,?,?,?,?);");
            $query->bindParam(1,$idproveedor);
            $query->bindParam(2,$nombre);
            $query->bindParam(3,$telefono);
            $query->bindParam(4,$email);
            $query->bindParam(5,$id_tienda);
           

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
            $listarProveedor = 'SELECT * from proveedor';
            $query = $conn->prepare($listarProveedor);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarProveedor(proveedorDto $proveedorDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $idproveedor = $proveedorDto->getIdproveedor();
        $nombre = $proveedorDto->getNombre();
        $telefono = $proveedorDto->getTelefono();
        $email = $proveedorDto->getEmail();
        $id_tienda = $proveedorDto->getId_tienda();
       
        try {
            $query = $cnn->prepare("UPDATE proveedor SET idproveedor=?, nombre=?, telefono=?, email=?, id_tienda=? WHERE idproveedor=?");
            $query->bindParam(1,$idproveedor);
            $query->bindParam(2,$nombre);
            $query->bindParam(3,$telefono);
            $query->bindParam(4,$email);
            $query->bindParam(5,$id_tienda);
            
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener Proveedor
    public function obtenerProveedor($idproveedor){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM proveedor WHERE idproveedor=?');
        $query->bindParam(1, $idproveedor);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar Proveedor
    public function eliminarProveedor($idproveedor){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM proveedor WHERE idproveedor= ?');
            $query->bindParam(1, $idproveedor);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    

}