<?php

class facturaDao{

    public function registrarFactura(facturaDto $facturaDto){ 
        $conn = Conexion::getConexion();
        $mensaje = "";
        $venta_id_Venta = $facturaDto->getventa_id_Venta(); 
        $producto_id_Producto = $facturaDto->getproducto_id_Producto();
        $cantidad = $facturaDto->getcantidad();
        $precio = $facturaDto->getprecio();
        $estado = $facturaDto->getestado();
        try {
            $query = $conn->prepare("INSERT INTO factura (venta_id_Venta, producto_id_Producto, cantidad, precio, estado) VALUES (?, ?, ?, ?, ?);");
            $query->bindParam(1,$venta_id_Venta);
            $query->bindParam(2,$producto_id_Producto);
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
        $venta_id_Venta = $facturaDto->getventa_id_Venta();
        $producto_id_Producto = $facturaDto->getproducto_id_Producto();
        $cantidad = $facturaDto->getcantidad();
        $precio = $facturaDto->getprecio();
        $estado = $facturaDto->getestado();
       
        try {
            $query = $conn->prepare("INSERT INTO factura (venta_id_Venta, producto_id_Producto, cantidad, precio, estado) VALUES (?,?,?,?,?)");
        
     
        $query->bindParam(1, $venta_id_Venta);
        $query->bindParam(2, $producto_id_Producto);
        $query->bindParam(3, $cantidad);
        $query->bindParam(4, $precio);
        $query->bindParam(5, $estado);   
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
    public function listarFacturas($venta_id_Venta){
        $conn = Conexion::getConexion();
        $sentencia = $conn->prepare("SELECT venta_id_Venta from factura where venta_id_Venta = :venta_id_Venta;");
        $sentencia->execute();
        $valor = $sentencia->fetch(PDO::FETCH_OBJ);
        
        if ($valor === FALSE) {
            header('Location:../../PAGINA/inicio.php?error=1');
            exit();
        } elseif ($sentencia->rowcount() == 1) {
        try {
            $query = $conn->prepare('SELECT f.venta_id_Venta,f.producto_id_Producto,f.Cantidad,f.Precio,f.Estado from venta v inner join factura f on v.id_Venta = f.venta_id_Venta where f.venta_id_Venta = (SELECT venta_id_Venta from factura where venta_id_Venta = :venta_id_Venta);');
            $query->bindParam(':venta_id_Venta', $venta_id_Venta);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            error_log($ex->getMessage());
            $mensaje = "Error: " . $ex->getMessage();
                    }
                }
            }

    public function modificarFactura(facturaDto $facturaDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $venta_id_Venta= $facturaDto->getventa_id_Venta();
        $producto_id_Producto = $facturaDto->getproducto_id_Producto();
        $cantidad = $facturaDto->getcantidad();
        $precio = $facturaDto->getprecio();
        $estado = $facturaDto->getestado();
        try {
            $query = $cnn->prepare("UPDATE factura SET venta_id_Venta=?, producto_id_Producto=?, cantidad=?, precio=?, estado=? WHERE venta_id_Venta=?");
            $query->bindParam(1,$venta_id_Venta);
            $query->bindParam(2,$producto_id_Producto);
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
    public function eliminarFactura($venta_id_Venta){
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
    public function detalleFactura($venta_id_Venta){
        $conn = Conexion::getConexion();
        try {
            $conn->query('RESET QUERY CACHE');
            $query = $conn->prepare('SELECT f.venta_id_Venta,sum(f.precio) as precio,v.FechaVenta,v.HoraVenta,v.EstadoVenta,sum(f.Cantidad) as cantidadProductos from  factura f inner join venta v on f.venta_id_Venta = v.id_Venta where venta_id_Venta = ? group by venta_id_Venta;');
            $query->bindParam(1, $venta_id_Venta);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
        $conn = null;
    }
    public function listaProductos($venta_id_Venta){
        $conn = Conexion::getConexion();
        try {
            $conn->query('RESET QUERY CACHE');
            $query = $conn->prepare('SELECT f.producto_id_Producto,p.Nombre,f.cantidad from factura f inner join producto p on p.id_Producto = f.producto_id_Producto where venta_id_Venta = ?;');
            $query->bindParam(1, $venta_id_Venta);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
        $conn = null;
    }
    

}