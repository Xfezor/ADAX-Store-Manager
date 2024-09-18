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
        $idtienda= $productoDto->getId_Producto();
        $nombreTienda = $productoDto->getNombre();
        $direccion = $productoDto->getPrecio_unit();
        $telefono = $productoDto->getDescripción();
        $correo = $productoDto->getMarca();
        $documento = $productoDto->getCategoría();
        $tipo_documento = $productoDto->getPresentacion();
        $contrasena = $productoDto->getFecha_vencimiento();
        $codigo_inv = $productoDto->getStock();
        $contrasena = $productoDto->getStock_Min();
        $codigo_inv = $productoDto->getinventario_id_Inventario();
        try {
            $query = $conn->prepare("INSERT INTO tienda values (?,?,?,?,?,?,?,?,?,?,?);");
            $query->bindParam(1,$idtienda);
            $query->bindParam(2,$nombreTienda);
            $query->bindParam(3,$direccion);
            $query->bindParam(4,$telefono);
            $query->bindParam(5,$correo);
            $query->bindParam(6,$documento);
            $query->bindParam(7,$tipo_documento);
            $query->bindParam(8,$contrasena);
            $query->bindParam(9,$codigo_inv);

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
            $listarUsuarios = 'SELECT * from tienda';
            $query = $conn->prepare($listarUsuarios);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error'. $ex->getMessage();
        }
    }

    public function modificarUsuario(tiendaDto $tiendaDto){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $idtienda= $tiendaDto->getIdtienda();
        $nombreTienda = $tiendaDto->getNombretienda();
        $direccion = $tiendaDto->getDireccion();
        $telefono = $tiendaDto->getTelefono();
        $correo = $tiendaDto->getCorreo();
        $documento = $tiendaDto->getDocumento();
        $tipo_documento = $tiendaDto->getTipoDocumento();
        $contrasena = $tiendaDto->getContrasena();
        $codigo_inv = $tiendaDto->getCodigo_invitacion();
        try {
            $query = $cnn->prepare("UPDATE tienda SET idtienda=?, nombreTienda=?, direccion=?, telefono=?, correo=?, documento=?, tipo_documento=?, contrasena=?, codigo_invitacion=? WHERE idtienda=?");
            $query->bindParam(1,$idtienda);
            $query->bindParam(2,$nombreTienda);
            $query->bindParam(3,$direccion);
            $query->bindParam(4,$telefono);
            $query->bindParam(5,$correo);
            $query->bindParam(6,$documento);
            $query->bindParam(7,$tipo_documento);
            $query->bindParam(8,$contrasena);
            $query->bindParam(9,$codigo_inv);
            $query->bindParam(10,$idtienda);
            $query->execute();
            $mensaje= "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn= null;
        return $mensaje;
        }
        // obtener usuario
    public function obtenerTienda($idtienda){
        $cnn = Conexion::getConexion();
        $mensaje = "";
    try {
        $query = $cnn->prepare('SELECT * FROM tienda WHERE idtienda=?');
        $query->bindParam(1, $idtienda);
        $query->execute();
        return $query->fetch();
    
    } catch (Exception  $ex) {
        $mensaje= $ex->getMessage();
    }
    $cnn= null;
    return $mensaje;
    }
    
    //eliminar Usuario
    public function eliminarUsuario($idtienda){
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM tienda WHERE idtienda= ?');
            $query->bindParam(1, $idtienda);
            $query->execute();
            $mensaje= "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje= $ex->getMessage();
        }
        $cnn=null;
        return $mensaje;
    }
    

}