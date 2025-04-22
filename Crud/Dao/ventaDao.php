<?php

class ventaDao
{

    public function registrarVenta(ventaDto $ventaDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $idVentaGuardado = "";
        $EstadoVenta = $ventaDto->getEstadoVenta();
        $cliente_documento_Cliente = $ventaDto->getCliente_documento_Cliente();
        $tienda_idtienda = $ventaDto->getTienda_idtienda();
        $metododepago_ID_Met_pago = $ventaDto->getMetododepago_ID_Met_pago();
        $usuarios_documento = $ventaDto->getUsuarios_documento();


        try {
            $query = $conn->prepare("INSERT INTO venta(EstadoVenta,cliente_documento_Cliente,tienda_idtienda,metododepago_ID_Met_pago,usuarios_documento) values (?,?,?,?,?);");
            $query->bindParam(1, $EstadoVenta);
            $query->bindParam(2, $cliente_documento_Cliente);
            $query->bindParam(3, $tienda_idtienda);
            $query->bindParam(4, $metododepago_ID_Met_pago);
            $query->bindParam(5, $usuarios_documento);

            $query->execute();
            $idVentaGuardado = $conn->lastInsertId();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return [
            'mensaje' => $mensaje,
            'idVentaGuardado' => $idVentaGuardado
        ];
    }
    public function registrarVentaCrud(ventaDto $ventaDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $FechaVenta = $ventaDto->getFechaVenta();
        $HoraVenta = $ventaDto->getHoraVenta();
        $EstadoVenta = $ventaDto->getEstadoVenta();
        $cliente_documento_Cliente = $ventaDto->getCliente_documento_Cliente();
        $tienda_idtienda = $ventaDto->getTienda_idtienda();
        $metododepago_ID_Met_pago = $ventaDto->getMetododepago_ID_Met_pago();
        $usuarios_documento = $ventaDto->getUsuarios_documento();

        try {
            $query = $conn->prepare("INSERT INTO venta values (?,?,?,?,?,?,?);");
            $query->bindParam(1, $FechaVenta);
            $query->bindParam(2, $HoraVenta);
            $query->bindParam(3, $EstadoVenta);
            $query->bindParam(4, $cliente_documento_Cliente);
            $query->bindParam(5, $tienda_idtienda);
            $query->bindParam(6, $metododepago_ID_Met_pago);
            $query->bindParam(7, $usuarios_documento);


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
            $listarUsuarios = 'SELECT * from venta';
            $query = $conn->prepare($listarUsuarios);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            echo 'Error' . $ex->getMessage();
        }
    }

    public function modificarVenta(ventaDto $ventaDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Venta = $ventaDto->getId_Venta();
        $FechaVenta = $ventaDto->getFechaVenta();
        $HoraVenta = $ventaDto->getHoraVenta();
        $EstadoVenta = $ventaDto->getEstadoVenta();
        $cliente_documento_Cliente = $ventaDto->getCliente_documento_Cliente();
        $tienda_idtienda = $ventaDto->getTienda_idtienda();
        $metododepago_ID_Met_pago = $ventaDto->getMetododepago_ID_Met_pago();
        $usuarios_documento = $ventaDto->getUsuarios_documento();


        try {
            $query = $conn->prepare("UPDATE venta SET id_Venta=?, FechaVenta=?, HoraVenta=?, EstadoVenta=?, cliente_documento_Cliente=? , tienda_idtienda=?, metododepago_ID_Met_pago=?, usuarios_documento=? WHERE id_Venta=?");

            $query->bindParam(1, $id_Venta);
            $query->bindParam(2, $FechaVenta);
            $query->bindParam(3, $HoraVenta);
            $query->bindParam(4, $EstadoVenta);
            $query->bindParam(5, $cliente_documento_Cliente);
            $query->bindParam(6, $tienda_idtienda);
            $query->bindParam(7, $metododepago_ID_Met_pago);
            $query->bindParam(8, $usuarios_documento);
            $query->bindParam(9, $id_Venta);

            $query->execute();

            $mensaje = "Registro actualizado";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }
    //modificar columnas EstadoVenta y metododepado_ID_Met_pago
    public function modificarEstadoVenta(ventaDto $ventaDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Venta = $ventaDto->getId_Venta();
        $EstadoVenta = $ventaDto->getEstadoVenta();
        $metododepago_ID_Met_pago = $ventaDto->getMetododepago_ID_Met_pago();

        try {
            $query = $conn->prepare("UPDATE venta SET EstadoVenta=? WHERE id_Venta=?");
            $query->bindParam(1, $EstadoVenta);
            $query->bindParam(2, $id_Venta);

            $query->execute();

            $mensaje = "Registro actualizado";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }
    // obtener Tienda
    public function obtenerVenta($id_Venta)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $conn->prepare('SELECT * FROM venta WHERE id_Venta=?');
            $query->bindParam(1, $id_Venta);
            $query->execute();
            return $query->fetch();

        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }

    //eliminar Tienda 
    public function eliminarVenta($id_Venta)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $conn->prepare('DELETE FROM venta WHERE id_Venta= ?');
            $query->bindParam(1, $id_Venta);
            $query->execute();
            $mensaje = "Registro eliminado";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }


}