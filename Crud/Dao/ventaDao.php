<?php

class ventaDao {

    public function registrarVenta(ventaDto $ventaDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Venta = $ventaDto->getId_Venta();
        $FechaVenta= $ventaDto->getFechaVenta();
        $HoraVenta = $ventaDto->getHoraVenta();
        $EstadoVenta = $ventaDto->getEstadoVenta();
        $cliente_id_Cliente = $ventaDto->getcliente_id_Cliente();
        $tienda_idtienda = $ventaDto->getTienda_idtienda();
        $metododepago_ID_Met_pago = $ventaDto->getMetododepago_ID_Met_pago();
    
        try {
            $query = $conn->prepare("INSERT INTO venta(id_Venta, FechaVenta, HoraVenta, EstadoVenta, cliente_id_Cliente, tienda_idtienda, metododepago_ID_Met_pago) VALUES (?, ?, ?, ?, ?, ?, ?);");
            $query->bindParam(1, $id_Venta);
            $query->bindParam(2, $FechaVenta);
            $query->bindParam(3, $HoraVenta);
            $query->bindParam(4, $EstadoVenta);
            $query->bindParam(5, $cliente_id_Cliente);
            $query->bindParam(6, $tienda_idtienda);
            $query->bindParam(7, $metododepago_ID_Met_pago);
    
            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 

    public function registrarVentaCrud(ventaDto $ventaDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Venta = $ventaDto->getId_Venta();
        $FechaVenta= $ventaDto->getFechaVenta();
        $HoraVenta = $ventaDto->getHoraVenta();
        $EstadoVenta = $ventaDto->getEstadoVenta();
        $cliente_id_Cliente = $ventaDto->getcliente_id_Cliente();
        $tienda_idtienda = $ventaDto->getTienda_idtienda();
        $metododepago_ID_Met_pago = $ventaDto->getMetododepago_ID_Met_pago();
       
        try {
            $query = $conn->prepare("INSERT INTO venta (id_Venta, FechaVenta, HoraVenta, EstadoVenta, cliente_id_Cliente, tienda_idtienda, metododepago_ID_Met_pago) VALUES (?, ?, ?, ?, ?, ?, ?);");
            $query->bindParam(1, $id_Venta);
            $query->bindParam(2, $FechaVenta);
            $query->bindParam(3, $HoraVenta);
            $query->bindParam(4, $EstadoVenta);
            $query->bindParam(5, $cliente_id_Cliente);
            $query->bindParam(6, $tienda_idtienda);
            $query->bindParam(7, $metododepago_ID_Met_pago);

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
            // Ahora la consulta ya no tiene los campos eliminados
            $listarUsuarios = 'SELECT id_Venta, FechaVenta, HoraVenta, EstadoVenta, cliente_id_Cliente, tienda_idtienda, metododepago_ID_Met_pago FROM venta';
            $query = $conn->prepare($listarUsuarios);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarVenta(ventaDto $ventaDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $id_Venta = $ventaDto->getId_Venta();
        $FechaVenta= $ventaDto->getFechaVenta();
        $HoraVenta = $ventaDto->getHoraVenta();
        $EstadoVenta = $ventaDto->getEstadoVenta();
        $cliente_id_Cliente = $ventaDto->getcliente_id_Cliente();
        $tienda_idtienda = $ventaDto->getTienda_idtienda();
        $metododepago_ID_Met_pago = $ventaDto->getMetododepago_ID_Met_pago();
       
        try {
            $query = $cnn->prepare("UPDATE venta SET FechaVenta=?, HoraVenta=?, EstadoVenta=?, cliente_id_Cliente=?, tienda_idtienda=?, metododepago_ID_Met_pago=? WHERE id_Venta=?");
            
            $query->bindParam(1, $FechaVenta);
            $query->bindParam(2, $HoraVenta);
            $query->bindParam(3, $EstadoVenta);
            $query->bindParam(4, $cliente_id_Cliente);
            $query->bindParam(5, $tienda_idtienda);
            $query->bindParam(6, $metododepago_ID_Met_pago);
            $query->bindParam(7, $id_Venta);
            
            $query->execute();
            
            $mensaje = "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }

    // Obtener Venta
    public function obtenerVenta($id_Venta){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('SELECT * FROM venta WHERE id_Venta=?');
            $query->bindParam(1, $id_Venta);
            $query->execute();
            return $query->fetch();
        } catch (Exception  $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }
    
    // Eliminar Venta
    public function eliminarVenta($id_Venta){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM venta WHERE id_Venta= ?');
            $query->bindParam(1, $id_Venta);
            $query->execute();
            $mensaje = "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }
}
