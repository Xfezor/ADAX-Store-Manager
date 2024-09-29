<?php

class facturaDao{

    public function registrarFactura(facturaDto $facturaDto){ 
        $conn = Conexion::getConexion();
        $mensaje = "";
        $venta_id_Venta = $facturaDto->getventa_id_Venta(); 
        $producto_id_producto = $facturaDto->getproducto_id_producto();
        $cantidad = $facturaDto->getcantidad();
        $precio = $facturaDto->getprecio();
        $estado = $facturaDto->getestado();
        try {
            $query = $conn->prepare("INSERT INTO factura (venta_id_Venta,producto_id_producto,cantidad,precio,estado) values (?,?,?,?,?);");
            $query->bindParam(1,$venta_id_Venta);
            $query->bindParam(2,$producto_id_producto);
            $query->bindParam(3,$cantidad);
            $query->bindParam(4,$precio);
            $query->bindParam(5,$estado);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 
    public function registrarFacturaCrud(facturaDto $facturaDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $venta_id_Venta= $facturaDto->getventa_id_Venta();
        $producto_id_producto = $facturaDto->getproducto_id_producto();
        $cantidad = $facturaDto->getcantidad();
        $precio = $facturaDto->getprecio();
        $estado = $facturaDto->getestado();
       
        try {
            $query = $conn->prepare("INSERT INTO factura values (?,?,?,?,?);");
            $query->bindParam(1,$venta_id_Venta);
            $query->bindParam(2,$producto_id_producto);
            $query->bindParam(3,$cantidad);
            $query->bindParam(4,$precio);
            $query->bindParam(5,$estado);

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
            $listarFactura = 'SELECT * from factura';
            $query = $conn->prepare($listarFactura);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }
    public function listarFacturas($codigo_invitacion){
        $conn = Conexion::getConexion();
        $sentencia = $conn->prepare("SELECT idtienda from tienda where codigo_invitacion = $codigo_invitacion;");
        $sentencia->execute();
        $valor = $sentencia->fetch(PDO::FETCH_OBJ);
        $idtienda = $valor->idtienda;
        if ($valor === FALSE) {
            header('Location:../../PAGINA/inicio.php?error=1');
            exit();
        } elseif ($sentencia->rowcount() == 1) {
        try {
            $query = $conn->prepare('SELECT f.venta_id_Venta,f.producto_id_Producto,f.Cantidad,f.Precio,f.Estado from venta v inner join factura f on v.id_Venta = f.venta_id_Venta where v.tienda_idtienda = ?;');
            $query->bindParam(1, $idtienda);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }
    }

    public function modificarfactura(facturaDto $facturaDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $venta_id_Venta= $facturaDto->getventa_id_Venta();
        $producto_id_producto = $facturaDto->getproducto_id_producto();
        $cantidad = $facturaDto->getcantidad();
        $precio = $facturaDto->getprecio();
        $estado = $facturaDto->getestado();
        try {
            $query = $cnn->prepare("UPDATE factura SET venta_id_Venta=?, producto_id_producto=?, cantidad=?, precio=?, estado=? WHERE venta_id_Venta=?");
            $query->bindParam(1,$venta_id_Venta);
            $query->bindParam(2,$producto_id_producto);
            $query->bindParam(3,$cantidad);
            $query->bindParam(4,$precio);
            $query->bindParam(5,$estado);
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener Factura
    public function obtenerFactura($venta_id_Venta){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM factura WHERE venta_id_Venta=?');
        $query->bindParam(1, $venta_id_Venta);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar factura
    public function eliminarfactura($venta_id_Venta){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM factura WHERE venta_id_Venta= ?');
            $query->bindParam(1, $venta_id_Venta);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    
    

}