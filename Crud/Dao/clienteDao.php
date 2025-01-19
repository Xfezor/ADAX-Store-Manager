<?php

class clienteDao{

    public function registrarcliente(clienteDto $clienteDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Cliente = $clienteDto->getid_Cliente();
        $Documento = $clienteDto->getDocumento();
        $Nombre1_Cliente = $clienteDto->getNombre1_Cliente();
        $Nombre2_Cliente = $clienteDto->getNombre2_Cliente();
        $Apellido1_Cliente = $clienteDto->getApellido1_Cliente();
        $Apellido2_Cliente = $clienteDto->getApellido2_Cliente();
        $Tipo_documento = $clienteDto->getTipo_documento();

        try {
            $query = $conn->prepare("INSERT INTO cliente(id_Cliente,Documento,Nombre1_Cliente,Nombre2_Cliente,Apellido1_Cliente,Apellido2_Cliente,Tipo_documento) values (?,?,?,?,?,?,?);");
            $query->bindParam(1,$id_Cliente);
            $query->bindParam(2,$Documento);
            $query->bindParam(3,$Nombre1_Cliente);
            $query->bindParam(4,$Nombre2_Cliente);
            $query->bindParam(5,$Apellido1_Cliente);
            $query->bindParam(6,$Apellido2_Cliente);
            $query->bindParam(7,$Tipo_documento);
            

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 
    public function registrarClienteCrud(clienteDto $clienteDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Cliente = $clienteDto->getId_Cliente();
        $Documento = $clienteDto->getDocumento();
        $Nombre1_Cliente = $clienteDto->getNombre1_Cliente();
        $Nombre2_Cliente = $clienteDto->getNombre2_Cliente();
        $Apellido1_Cliente = $clienteDto->getApellido1_Cliente();
        $Apellido2_Cliente = $clienteDto->getApellido2_Cliente();
        $Tipo_documento = $clienteDto->getTipo_documento();
       
        try {
            $query = $conn->prepare("INSERT INTO cliente values (?,?,?,?,?,?,?);");
            $query->bindParam(1,$id_Cliente);
            $query->bindParam(2,$Documento);
            $query->bindParam(3,$Nombre1_Cliente);
            $query->bindParam(4,$Nombre2_Cliente);
            $query->bindParam(5,$Apellido1_Cliente);
            $query->bindParam(6,$Apellido2_Cliente);
            $query->bindParam(7,$Tipo_documento);
           

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
            $listarcliente = 'SELECT * from cliente';
            $query = $conn->prepare($listarcliente);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarcliente(clienteDto $clienteDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $id_Cliente = $clienteDto->getId_Cliente();
        $Documento = $clienteDto->getDocumento();
        $Nombre1_Cliente = $clienteDto->getNombre1_Cliente();
        $Nombre2_Cliente = $clienteDto->getNombre2_Cliente();
        $Apellido1_Cliente = $clienteDto->getApellido1_Cliente();
        $Apellido2_Cliente = $clienteDto->getApellido2_Cliente();
        $Tipo_documento = $clienteDto->getTipo_documento();
       
       
        try {
            $query = $cnn->prepare("UPDATE cliente SET id_Cliente=?, Documento=?, Nombre1_Cliente=?, Nombre2_Cliente=?, Apellido1_Cliente=?,  Apellido2_Cliente=?, Tipo_documento=? WHERE id_Cliente=?");
            $query->bindParam(1,$id_Cliente);
            $query->bindParam(2,$Documento);
            $query->bindParam(3,$Nombre1_Cliente);
            $query->bindParam(4,$Nombre2_Cliente);
            $query->bindParam(5,$Apellido1_Cliente);
            $query->bindParam(6,$Apellido2_Cliente);
            $query->bindParam(7,$Tipo_documento);
            
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener cliente
    public function obtenerCliente($id_Cliente){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM cliente WHERE id_Cliente=?');
        $query->bindParam(1, $id_Cliente);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar cliente 
    public function eliminarcliente($id_Cliente){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM cliente WHERE id_Cliente= ?');
            $query->bindParam(1, $id_Cliente);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    

}
