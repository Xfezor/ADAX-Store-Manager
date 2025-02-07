<?php
class InventarioDao
{

    public function registrarInventario(InventarioDto $InventarioDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_inventario = $InventarioDto->getid_inventario();
        $CantidadInventario = $InventarioDto->getCantidadInventario();
        $fechaModificacion = $InventarioDto->getfechaModificacion();
        $estado_revision = $InventarioDto->getestado_revision();
        $tienda_idtienda = $InventarioDto->gettienda_idtienda();
        try {
            $query = $conn->prepare("INSERT INTO Inventario (id_inventario,CantidadInventario,fechaModificacion,estado_revision,tienda_idtienda) values (?,?,?,?,?);");
            $query->bindParam(1, $id_inventario);
            $query->bindParam(2, $CantidadInventario);
            $query->bindParam(3, $fechaModificacion);
            $query->bindParam(4, $estado_revision);
            $query->bindParam(5, $tienda_idtienda);

            $query->execute();
            $mensaje = "Registrado Exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }
    public function registrarInventarioCrud(InventarioDto $InventarioDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $id_inventario = $InventarioDto->getid_inventario();
        $CantidadInventario = $InventarioDto->getCantidadInventario();
        $fechaModificacion = $InventarioDto->getfechaModificacion();
        $estado_revision = $InventarioDto->getestado_revision();
        $tienda_idtienda = $InventarioDto->gettienda_idtienda();

        try {
            $query = $conn->prepare("INSERT INTO Inventario values (?,?,?,?,?);");
            $query->bindParam(1, $id_inventario);
            $query->bindParam(2, $CantidadInventario);
            $query->bindParam(3, $fechaModificacion);
            $query->bindParam(4, $estado_revision);
            $query->bindParam(5, $tienda_idtienda);

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
            $listarInventario = 'SELECT * from Inventario';
            $query = $conn->prepare($listarInventario);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception  $ex) {
            echo 'Error' . $ex->getMessage();
        }
    }

    public function modificarInventario(InventarioDto $InventarioDto)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $id_inventario = $InventarioDto->getid_inventario();
        $CantidadInventario = $InventarioDto->getCantidadInventario();
        $fechaModificacion = $InventarioDto->getfechaModificacion();
        $estado_revision = $InventarioDto->getestado_revision();
        $tienda_idtienda = $InventarioDto->gettienda_idtienda();
        try {
            $query = $cnn->prepare("UPDATE inventario SET CantidadInventario=?, fechaModificacion=?, estado_revision=?, tienda_idtienda=? WHERE id_inventario=?");
            $query->bindParam(1, $CantidadInventario);
            $query->bindParam(2, $fechaModificacion);
            $query->bindParam(3, $estado_revision);
            $query->bindParam(4, $tienda_idtienda);
            $query->bindParam(5, $id_inventario);
            $query->execute();
            $mensaje = "Registro actualizado";
        } catch (Exception  $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }
    // obtener Inventario
    public function obtenerInventario($id_inventario)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('SELECT * FROM Inventario WHERE id_inventario=?');
            $query->bindParam(1, $id_inventario);
            $query->execute();
            return $query->fetch();
        } catch (Exception  $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }

    //eliminar Inventario
    public function eliminarInventario($id_inventario)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        try {
            $query = $cnn->prepare('DELETE FROM Inventario WHERE id_inventario= ?');
            $query->bindParam(1, $id_inventario);
            $query->execute();
            $mensaje = "Registro eliminado";
        } catch (Exception  $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }
}
