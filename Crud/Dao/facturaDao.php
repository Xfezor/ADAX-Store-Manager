<?php

class FacturaDao
{

    // Registrar factura
    public function registrarFactura(facturaDto $facturaDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $venta_id_Venta = $facturaDto->getVenta_id_Venta();
        $producto_id_producto = $facturaDto->getProducto_id_producto();
        $Cantidad = $facturaDto->getCantidad();
        $Precio = $facturaDto->getPrecio();
        $Estado = $facturaDto->getEstado();

        try {
            $query = $conn->prepare("INSERT INTO factura (venta_id_Venta, producto_id_producto, Cantidad, Precio, Estado) 
            VALUES (?, ?, ?, ?, ?);");
            $query->bindParam(1, $venta_id_Venta);
            $query->bindParam(2, $producto_id_producto);
            $query->bindParam(3, $Cantidad);
            $query->bindParam(4, $Precio);
            $query->bindParam(5, $Estado);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = "Error al registrar: " . $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }

    // Listar todas las facturas
    public function listarTodos()
    {
        $conn = Conexion::getConexion();
        try {
            $listarFacturas = 'SELECT * FROM factura';
            $query = $conn->prepare($listarFacturas);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $ex) {
            echo 'Error al listar: ' . $ex->getMessage();
        }
        $conn = null;
    }

    public function listarTodosTienda($codigo_invitacion)
    {
        $conn = Conexion::getConexion();
        try {
            $listarFactura = "SELECT f.venta_id_Venta,f.producto_id_Producto,f.Cantidad,f.Precio,f.Estado FROM factura f inner join venta v on f.venta_id_venta = v.id_venta inner join tienda t on t.idtienda = v.tienda_idtienda where t.codigo_invitacion = $codigo_invitacion;";
            $query = $conn->prepare($listarFactura);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error' . $ex->getMessage();
        }
    }
    public function listarFacturas($venta_id_Venta)
    {
        $conn = Conexion::getConexion();
        $sentencia = $conn->prepare("SELECT venta_id_Venta from factura where venta_id_Venta = $venta_id_Venta;");
        $sentencia->execute();
        $valor = $sentencia->fetch(PDO::FETCH_OBJ);
        $venta_id_Venta = $valor->venta_id_Venta;
        if ($valor === FALSE) {
            header('Location:../../PAGINA/inicio.php?error=1');
            exit();
        } elseif ($sentencia->rowcount() == 1) {
            try {
                $query = $conn->prepare('SELECT f.venta_id_Venta,f.producto_id_Producto,f.Cantidad,f.Precio,f.Estado from venta v inner join factura f on v.id_Venta = f.venta_id_Venta where f.venta_id_Venta = (SELECT venta_id_Venta from factura where venta_id_Venta = :venta_id_Venta);');
                $query->bindParam(':venta_id_Venta', $venta_id_Venta);
                $query->execute();
                return $query->fetchAll();
            } catch (Exception  $ex) {
                echo 'Error' . $ex->getMessage();
            }
        }
    }

    public function verAnalsisCodigoInv($codigoInv)
    {
        $conn = Conexion::getConexion();
        try {
            $query = $conn->prepare('SELECT f.producto_id_Producto,p.Nombre,sum(f.cantidad) as "cantidadVendida" from factura f inner join venta v on f.venta_id_Venta = v.id_Venta inner join producto p on f.producto_id_Producto = p.id_Producto inner join tienda t on v.tienda_idtienda = t.idtienda where t.codigo_invitacion = ? group by producto_id_Producto;');
            $query->bindParam(1, $codigoInv);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $ex) {
            echo 'Error al listar: ' . $ex->getMessage();
        }
        $conn = null;
    }

    // Modificar factura
    public function modificarFactura(facturaDto $facturaDto)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $venta_id_Venta = $facturaDto->getVenta_id_Venta();
        $producto_id_producto = $facturaDto->getProducto_id_producto();
        $Cantidad = $facturaDto->getCantidad();
        $Precio = $facturaDto->getPrecio();
        $Estado = $facturaDto->getEstado();

        try {
            $query = $cnn->prepare("UPDATE factura SET producto_id_producto = ?, Cantidad = ?, Precio = ?, Estado = ? 
            WHERE venta_id_Venta = ?");
            $query->bindParam(1, $producto_id_producto);
            $query->bindParam(2, $Cantidad);
            $query->bindParam(3, $Precio);
            $query->bindParam(4, $Estado);
            $query->bindParam(5, $venta_id_Venta);
            $query->execute();
            $mensaje = "Registro actualizado";
        } catch (Exception $ex) {
            $mensaje = "Error al actualizar: " . $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }

    // Obtener factura 
    public function obtenerFactura($venta_id_Venta)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('SELECT * FROM factura WHERE venta_id_Venta = ?');
            $query->bindParam(1, $venta_id_Venta);
            $query->execute();
            return $query->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $ex) {
            $mensaje = "Error al obtener factura: " . $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }

    // Eliminar factura
    public function eliminarFactura($venta_id_Venta)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM factura WHERE venta_id_Venta = ?');
            $query->bindParam(1, $venta_id_Venta);
            $query->execute();
            $mensaje = "Registro eliminado";
        } catch (Exception $ex) {
            $mensaje = "Error al eliminar: " . $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }
}
