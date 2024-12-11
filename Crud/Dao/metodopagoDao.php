<?php

class metodopagoDao
{

    public function registrarMetodoPago(metodopagoDto $metodopagoDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $ID_Met_pago = $metodopagoDto->getId_metodopago();
        $Nombre = $metodopagoDto->getNombre_metodopago();

        try {
            $query = $conn->prepare("INSERT INTO metododepago(ID_Met_pago, nombre) VALUES (?, ?);");
            $query->bindParam(1, $ID_Met_pago);
            $query->bindParam(2, $Nombre);
            $query->execute();
            $mensaje = "Metodo de pago registrado con exito";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }

    public function registrarMetodoPagoCrud(metodopagoDto $metodopagoDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $Nombre = $metodopagoDto->getNombre_metodopago();

        try {
            $query = $conn->prepare("INSERT INTO metododepago(nombre) VALUES (?);");
            $query->bindParam(1, $Nombre);
            $query->execute();
            $mensaje = "Metodo de Pago registrado Exitosamente";
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
            $listarMetodosPago = "SELECT * FROM metododepago";
            $query = $conn->prepare($listarMetodosPago);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            echo 'Error' . $ex->getMessage();
        }
    }

    public function modificarMetodosPago(metodopagoDto $metodopagoDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";

        $id_metodopago = $metodopagoDto->getId_metodopago();
        $Nombre = $metodopagoDto->getNombre_metodopago();
        try {
            $query = $conn->prepare("UPDATE metododepago SET nombre = ? WHERE ID_Met_pago = ?");
            $query->bindParam(1, $Nombre);
            $query->bindParam(2, $id_metodopago);
            $query->execute();
            $mensaje = "Metodo de pago modificado con exito";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }

    public function obtenerMetodosPago($ID_Met_pago)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";

        try {
            $query = $conn->prepare("SELECT * FROM metododepago WHERE ID_Met_pago = ?");
            $query->bindParam(1, $ID_Met_pago);
            $query->execute();
            return $query->fetch();
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }

    public function eliminarMetodosPago($ID_Met_pago)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $conn->prepare("DELETE FROM metododepago WHERE ID_Met_pago = ?");
            $query->bindParam(1, $ID_Met_pago);
            $query->execute();
            $mensaje = "Metodo de pago eliminado con exito";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }
}