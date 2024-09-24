<?php

class productoDao{

    public function registrarProducto(productoDto $productoDto){ 
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Producto = $productoDto->getId_Producto(); 
        $Nombre = $productoDto->getNombre();
        $Precio_unit = $productoDto->getPrecio_unit();
        $Descripción = $productoDto->getDescripción();
        $Marca = $productoDto->getMarca();
        $Categoría = $productoDto->getCategoría();
        $Presentacion = $productoDto->getPresentacion();
        $Fecha_vencimiento = $productoDto->getFecha_vencimiento();
        $Stock = $productoDto->getStock();
        $Stock_Min = $productoDto->getStock_Min();
        $inventario_id_Inventario = $productoDto->getinventario_id_Inventario();
        try {
            $query = $conn->prepare("INSERT INTO producto(Nombre,Precio_unit,Descripción,Marca,Categoría,Presentacion,Fecha_vencimiento,Stock,Stock_Min,inventario_id_Inventario) values (?,?,?,?,?,?,?);");
            $query->bindParam(1,$Nombre);
            $query->bindParam(2,$Precio_unit);
            $query->bindParam(3,$Descripción);
            $query->bindParam(4,$Marca);
            $query->bindParam(5,$Categoría);
            $query->bindParam(6,$Presentacion);
            $query->bindParam(7,$Fecha_vencimiento);
            $query->bindParam(8,$Stock);
            $query->bindParam(9,$Stock_Min);
            $query->bindParam(10,$inventario_id_Inventario);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 
    public function registrarProductoCrud(productoDto $productoDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Producto= $productoDto->getId_Producto();
        $Nombre = $productoDto->getNombre();
        $Precio_unit = $productoDto->getPrecio_unit();
        $Descripción = $productoDto->getDescripción();
        $Marca = $productoDto->getMarca();
        $Categoría = $productoDto->getCategoría();
        $Presentacion = $productoDto->getPresentacion();
        $Fecha_vencimiento = $productoDto->getFecha_vencimiento();
        $Stock = $productoDto->getStock();
        $Stock_Min = $productoDto->getStock_Min();
        $inventario_id_Inventario = $productoDto->getinventario_id_Inventario();
        try {
            $query = $conn->prepare("INSERT INTO producto values (?,?,?,?,?,?,?,?,?,?,?);");
            $query->bindParam(1,$id_Producto);
            $query->bindParam(2,$Nombre);
            $query->bindParam(3,$Precio_unit);
            $query->bindParam(4,$Descripción);
            $query->bindParam(5,$Marca);
            $query->bindParam(6,$Categoría);
            $query->bindParam(7,$Presentacion);
            $query->bindParam(8,$Fecha_vencimiento);
            $query->bindParam(9,$Stock);
            $query->bindParam(10,$Stock_Min);
            $query->bindParam(11,$inventario_id_Inventario);

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
            $listarProducto = 'SELECT * from producto';
            $query = $conn->prepare($listarProducto);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarProducto(productoDto $productoDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $id_Producto= $productoDto->getId_Producto();
        $Nombre = $productoDto->getNombre();
        $Precio_unit = $productoDto->getPrecio_unit();
        $Descripción = $productoDto->getDescripción();
        $Marca = $productoDto->getMarca();
        $Categoría = $productoDto->getCategoría();
        $Presentacion = $productoDto->getPresentacion();
        $Fecha_vencimiento = $productoDto->getFecha_vencimiento();
        $Stock = $productoDto->getStock();
        $Stock_Min = $productoDto->getStock_Min();
        $inventario_id_Inventario = $productoDto->getinventario_id_Inventario();
        try {
            $query = $cnn->prepare("UPDATE producto SET id_Producto=?, Nombre=?, Precio_unit=?, Descripción=?, Marca=?, Categoría=?, Presentacion=?, Fecha_vencimiento=?, Stock=?, Stock_Min=? , Stock_Min=?,inventario_id_Inventario=? WHERE id_Producto=?");
            $query->bindParam(1,$id_Producto);
            $query->bindParam(2,$Nombre);
            $query->bindParam(3,$Precio_unit);
            $query->bindParam(4,$Descripción);
            $query->bindParam(5,$Marca);
            $query->bindParam(6,$Categoría);
            $query->bindParam(7,$Presentacion);
            $query->bindParam(8,$Fecha_vencimiento);
            $query->bindParam(9,$Stock);
            $query->bindParam(10,$Stock_Min);
            $query->bindParam(11,$inventario_id_Inventario);
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener usuario
    public function obtenerProducto($id_Producto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM producto WHERE id_Producto=?');
        $query->bindParam(1, $id_Producto);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar producto
    public function eliminarProducto($id_Producto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM producto WHERE id_Producto= ?');
            $query->bindParam(1, $id_Producto);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    
    

}