<?php
include_once __DIR__ . '/../utilidades/conexion.php';
class productoDao{

    public function registrarProducto(productoDto $productoDto){ 
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_Producto = $productoDto->getId_Producto(); 
        $Nombre = $productoDto->getNombre();
        $Precio_unit = $productoDto->getPrecio_unit();
        $Descripcion = $productoDto->getDescripcion();
        $Marca = $productoDto->getMarca();
        $Categoria = $productoDto->getCategoria();
        $Presentacion = $productoDto->getPresentacion();
        $Fecha_vencimiento = $productoDto->getFecha_vencimiento();
        $Stock = $productoDto->getStock();
        $Stock_Min = $productoDto->getStock_Min();
        $inventario_id_Inventario = $productoDto->getinventario_id_Inventario();
        try {
            $query = $conn->prepare("INSERT INTO producto(Nombre,Precio_unit,Descripcion,Marca,Categoria,Presentacion,Fecha_vencimiento,Stock,Stock_Min,inventario_id_Inventario) values (?,?,?,?,?,?,?,?,?,?);");
            $query->bindParam(1,$Nombre);
            $query->bindParam(2,$Precio_unit);
            $query->bindParam(3,$Descripcion);
            $query->bindParam(4,$Marca);
            $query->bindParam(5,$Categoria);
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
    public function registrarProductoUnico(productoDto $productoDto, $codigo_invitacion){ 
        $conn = Conexion::getConexion();
        $mensaje = "";
        $Nombre = $productoDto->getNombre();
        $Precio_unit = $productoDto->getPrecio_unit();
        $Descripcion = $productoDto->getDescripcion();
        $Marca = $productoDto->getMarca();
        $Categoria = $productoDto->getCategoria();
        $Presentacion = $productoDto->getPresentacion();
        $Fecha_vencimiento = $productoDto->getFecha_vencimiento();
        $Stock = $productoDto->getStock();
        $Stock_Min = $productoDto->getStock_Min();
        $sentencia = $conn->prepare("SELECT idtienda from tienda where codigo_invitacion = $codigo_invitacion;");
        $sentencia->execute();
        $valor = $sentencia->fetch(PDO::FETCH_OBJ);
        $idtienda = $valor->idtienda;
        if ($valor === FALSE) {
            header('Location:../../PAGINA/inicio.php?error=1');
            exit();
        } elseif ($sentencia->rowcount() == 1) {
            $sentencia2 = $conn->prepare("SELECT id_Inventario from inventario where tienda_idtienda = $idtienda;");
            $sentencia2->execute();
            $valor2 = $sentencia2->fetch(PDO::FETCH_OBJ);
            $id_Inventario = $valor2->id_Inventario;
            try {
                $query = $conn->prepare("INSERT INTO producto(Nombre,Precio_unit,Descripcion,Marca,Categoria,Presentacion,Fecha_vencimiento,Stock,Stock_Min,inventario_id_Inventario) values (?,?,?,?,?,?,?,?,?,?);");
                $query->bindParam(1,$Nombre);
                $query->bindParam(2,$Precio_unit);
                $query->bindParam(3,$Descripcion);
                $query->bindParam(4,$Marca);
                $query->bindParam(5,$Categoria);
                $query->bindParam(6,$Presentacion);
                $query->bindParam(7,$Fecha_vencimiento);
                $query->bindParam(8,$Stock);
                $query->bindParam(9,$Stock_Min);
                $query->bindParam(10,$id_Inventario);
                $query->execute();
                $mensaje = "Registrado Exitosamente";
            } catch (Exception $ex) {
                $mensaje = $ex->getMessage();
            }
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
        $Descripcion = $productoDto->getDescripcion();
        $Marca = $productoDto->getMarca();
        $Categoria = $productoDto->getCategoria();
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
            $query->bindParam(4,$Descripcion);
            $query->bindParam(5,$Marca);
            $query->bindParam(6,$Categoria);
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
    public function listarProductos($codigo_invitacion){
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
            $query = $conn->prepare('SELECT p.Nombre,p.Marca from producto p inner join inventario i on i.id_Inventario = p.inventario_id_Inventario where tienda_idtienda = ?;');
            $query->bindParam(1, $idtienda);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }
    }
    public function modificarProducto(productoDto $productoDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $id_Producto= $productoDto->getId_Producto();
        $Nombre = $productoDto->getNombre();
        $Precio_unit = $productoDto->getPrecio_unit();
        $Descripcion = $productoDto->getDescripcion();
        $Marca = $productoDto->getMarca();
        $Categoria = $productoDto->getCategoria();
        $Presentacion = $productoDto->getPresentacion();
        $Fecha_vencimiento = $productoDto->getFecha_vencimiento();
        $Stock = $productoDto->getStock();
        $Stock_Min = $productoDto->getStock_Min();
        $inventario_id_Inventario = $productoDto->getinventario_id_Inventario();
        try {
            $query = $cnn->prepare("UPDATE producto SET id_Producto=?, Nombre=?, Precio_unit=?, Descripcion=?, Marca=?, Categoria=?, Presentacion=?, Fecha_vencimiento=?, Stock=?, Stock_Min=? , Stock_Min=?,inventario_id_Inventario=? WHERE id_Producto=?");
            $query->bindParam(1,$id_Producto);
            $query->bindParam(2,$Nombre);
            $query->bindParam(3,$Precio_unit);
            $query->bindParam(4,$Descripcion);
            $query->bindParam(5,$Marca);
            $query->bindParam(6,$Categoria);
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