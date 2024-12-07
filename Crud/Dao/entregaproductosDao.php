<?php

class entregaproductosDao{

    public function registrarEntregaProductos(entregaproductosDto $entregaproductosDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $proveedor_idproveedor= $entregaproductosDto->getproveedor_idproveedor();
        $producto_id_Producto = $entregaproductosDto->getproducto_id_Producto();
        $fecha_Entrega= $entregaproductosDto->getfecha_Entrega();
        $cantidad = $entregaproductosDto->getcantidad();
        
        try {
            $query = $conn->prepare("INSERT INTO entregaproductos(proveedor_idproveedor,producto_id_Producto,fecha_Entrega,cantidad) values (?,?,?,?);");
            $query->bindParam(1,$proveedor_idproveedor);
            $query->bindParam(2,$producto_id_Producto);
            $query->bindParam(3,$fecha_Entrega);
            $query->bindParam(4,$cantidad);
            
            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    } 
    public function registrarEntregaProductoscrud(entregaproductosDto $entregaproductosDto){
        $conn = Conexion::getConexion();
        $mensaje = "";
        $proveedor_idproveedor= $entregaproductosDto->getproveedor_idproveedor();
        $producto_id_Producto = $entregaproductosDto->getproducto_id_Producto();
        $fecha_Entrega= $entregaproductosDto->getfecha_Entrega();
        $cantidad = $entregaproductosDto->getcantidad();
        try {
            $query = $conn->prepare("INSERT INTO entregaproductos values (?,?,?,?);");
            $query->bindParam(1,$proveedor_idproveedor);
            $query->bindParam(2,$producto_id_Producto);
            $query->bindParam(3,$fecha_Entrega);
            $query->bindParam(4,$cantidad);

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
            $listarEntregaProductos = 'SELECT * from entregaproductos';
            $query = $conn->prepare($listarEntregaProductos);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarEntregaProductos(entregaproductosDto $entregaproductosDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $proveedor_idproveedor= $entregaproductosDto->getproveedor_idproveedor();
        $producto_id_Producto = $entregaproductosDto->getproducto_id_Producto();
        $fecha_Entrega= $entregaproductosDto->getfecha_Entrega();
        $cantidad = $entregaproductosDto->getcantidad();
        try {
            $query = $cnn->prepare("UPDATE entregaproductos SET proveedor_idproveedor=?, producto_id_Producto=?, fecha_Entrega=?, cantidad=? WHERE proveedor_idproveedor=?");
            $query->bindParam(1,$proveedor_idproveedor);
            $query->bindParam(2,$producto_id_Producto);
            $query->bindParam(3,$fecha_Entrega);
            $query->bindParam(4,$cantidad); 
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener Entrega Productos
    public function obtenerEntregaProductos($proveedor_idproveedor){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM entregaproductos WHERE proveedor_idproveedor=?');
        $query->bindParam(1, $proveedor_idproveedor);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar Entrega Productos 
    public function eliminarEntregaProductos($proveedor_idproveedor){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM entregaproductos WHERE proveedor_idproveedor= ?');
            $query->bindParam(1, $proveedor_idproveedor);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    

}