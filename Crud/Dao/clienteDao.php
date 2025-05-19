<?php

class clienteDao
{

    public function registrarcliente(clienteDto $clienteDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $Documento = $clienteDto->getDocumento();
        $Tipo_documento = $clienteDto->getTipo_documento();
        $NombreCliente = $clienteDto->getNombreCliente();
        $ApellidoCliente = $clienteDto->getApellidoCliente();
        $Correo = $clienteDto->getCorreo();

        try {
            $query = $conn->prepare("INSERT INTO cliente (Documento, Tipo_documento, NombreCliente, ApellidoCliente, correo) values (?,?,?,?,?);");
            $query->bindParam(1, $Documento);
            $query->bindParam(2, $Tipo_documento);
            $query->bindParam(3, $NombreCliente);
            $query->bindParam(4, $ApellidoCliente);
            $query->bindParam(5, $Correo);


            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }
    public function registrarClienteCrud(clienteDto $clienteDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $Documento = $clienteDto->getDocumento();
        $Tipo_documento = $clienteDto->getTipo_documento();
        $NombreCliente = $clienteDto->getNombreCliente();
        $ApellidoCliente = $clienteDto->getApellidoCliente();
        $Correo = $clienteDto->getCorreo();

        try {
            $query = $conn->prepare("INSERT INTO cliente (Documento, Tipo_documento, NombreCliente, ApellidoCliente, correo) values (?,?,?,?,?);");
            $query->bindParam(1, $Documento);
            $query->bindParam(2, $Tipo_documento);
            $query->bindParam(3, $NombreCliente);
            $query->bindParam(4, $ApellidoCliente);
            $query->bindParam(5, $Correo);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }
    public function listarTodos()
    {
        $conn = Conexion::getConexion();
        try {
            $listarcliente = 'SELECT * from cliente';
            $query = $conn->prepare($listarcliente);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            echo 'Error' . $ex->getMessage();
        }
    }
    public function listarClientesTienda($codigoInvitacion)
    {
        $conn = Conexion::getConexion();
        try {
            $listarcliente = 'SELECT c.Documento,c.Tipo_documento,c.NombreCliente,c.ApellidoCliente,c.correo from venta v inner join cliente c on c.Documento = v.cliente_documento_Cliente inner join tienda t on v.tienda_idtienda = t.idtienda where t.codigo_invitacion = ?';
            $query = $conn->prepare($listarcliente);
            $query->bindParam(1, $codigoInvitacion);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            echo 'Error' . $ex->getMessage();
        }
    }

    public function modificarcliente(clienteDto $clienteDto)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $Documento = $clienteDto->getDocumento();
        $Tipo_documento = $clienteDto->getTipo_documento();
        $NombreCliente = $clienteDto->getNombreCliente();
        $ApellidoCliente = $clienteDto->getApellidoCliente();
        $Correo = $clienteDto->getCorreo();

        try {
            $query = $cnn->prepare("UPDATE cliente SET Tipo_Documento=?, NombreCliente=?, ApellidoCliente=?, correo=? WHERE Documento=?");
            $query->bindParam(1, $Tipo_documento);
            $query->bindParam(2, $NombreCliente);
            $query->bindParam(3, $ApellidoCliente);
            $query->bindParam(4, $Correo);
            $query->bindParam(5, $Documento);

            
            $query->execute();
            if ($query->rowCount() > 0) {
                $mensaje = "Registro actualizado";
            } else {
                $mensaje = "No se realizaron cambios";
            }
        } catch (Exception $ex) {
            $mensaje = "Error: " . $ex->getMessage();
        }
    
        $cnn = null;
        return $mensaje;
    }
    // obtener cliente
    public function obtenerCliente($Documento)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('SELECT * FROM cliente WHERE Documento=?');
            $query->bindParam(1, $Documento);
            $query->execute();
            return $query->fetch();
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }

    //eliminar cliente 
    public function eliminarcliente($Documento)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM cliente WHERE Documento= ?');
            $query->bindParam(1, $Documento);
            $query->execute();
            $mensaje = "Registro eliminado";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }
}
