<?php

class MovimientoDao{

    public function registrarMovimiento(MovimientoDto $MovimientoDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Movimiento= $MovimientoDto->getId_Movimiento();
        $cantidad_despues = $MovimientoDto->getCantidad_despues();
        $fecha_movimiento= $MovimientoDto->getFecha_movimiento();
        $fecha_modificacion = $MovimientoDto->getFecha_modificacion();
        $estado_despues = $MovimientoDto->getEstado_despues();
        $id_tienda = $MovimientoDto->getId_tienda();
        try {
            $query = $conn->prepare("INSERT INTO movimientos(cantidad_despues,fecha_movimiento,fecha_modificacion,estado_despues,inventario_id_Inventario) values (?,?,?,?,?);");
            $query->bindParam(1,$cantidad_despues);
            $query->bindParam(2,$fecha_movimiento);
            $query->bindParam(3,$fecha_modificacion);
            $query->bindParam(4,$estado_despues);
            $query->bindParam(5,$id_tienda);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 
    public function registrarMovimientoCrud(MovimientoDto $MovimientoDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Movimiento= $MovimientoDto->getId_Movimiento();
        $cantidad_despues = $MovimientoDto->getCantidad_despues();
        $fecha_movimiento= $MovimientoDto->getFecha_movimiento();
        $fecha_modificacion = $MovimientoDto->getFecha_modificacion();
        $estado_despues = $MovimientoDto->getEstado_despues();
        $id_tienda = $MovimientoDto->getId_tienda();
        try {
            $query = $conn->prepare("INSERT INTO movimientos values (?,?,?,?,?);");
            $query->bindParam(1,$id_Movimiento);
            $query->bindParam(2,$cantidad_despues);
            $query->bindParam(3,$fecha_movimiento);
            $query->bindParam(4,$fecha_modificacion);
            $query->bindParam(5,$estado_despues);
            $query->bindParam(6,$id_tienda);

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
            $listarMovimiento = 'SELECT * from movimientos';
            $query = $conn->prepare($listarMovimiento);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarMovimiento(MovimientoDto $MovimientoDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $id_Movimiento= $MovimientoDto->getId_Movimiento();
        $cantidad_despues = $MovimientoDto->getCantidad_despues();
        $fecha_movimiento= $MovimientoDto->getFecha_movimiento();
        $fecha_modificacion = $MovimientoDto->getFecha_modificacion();
        $estado_despues = $MovimientoDto->getEstado_despues();
        $id_tienda = $MovimientoDto->getId_tienda();
        try {
            $query = $cnn->prepare("UPDATE movimientos SET id_Movimiento=?, cantidad_despues=?, fecha_movimiento=?, fecha_modificacion=?, estado_despues=?, id_tienda=? WHERE id_Movimiento=?");
            $query->bindParam(1,$id_Movimiento);
            $query->bindParam(2,$cantidad_despues);
            $query->bindParam(3,$fecha_movimiento);
            $query->bindParam(4,$fecha_modificacion);
            $query->bindParam(5,$estado_despues);
            $query->bindParam(6,$id_tienda);
            $query->bindParam(7,$id_Movimiento); 
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener Tienda
    public function obtenerMovimiento($id_Movimiento){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM movimientos WHERE id_Movimiento=?');
        $query->bindParam(1, $id_Movimiento);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar Tienda 
    public function eliminarMovimiento($id_Movimiento){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM movimientos WHERE id_Movimiento= ?');
            $query->bindParam(1, $id_Movimiento);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    

}