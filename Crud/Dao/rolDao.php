<?php
class rolDao
{
    public function registrarRol(rolDto $rolDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = '';
        $id_Rol = $rolDto->getid_Rol();
        $nombreRol = $rolDto->getnombreRol();
        $descripcion = $rolDto->getdescripcion();


        try {
            $query = $conn->prepare("INSERT INTO rol(id_Rol, nombreRol, descripcion) VALUES(?,?,?)");
            $query->bindParam(1, $id_Rol);
            $query->bindParam(2, $nombreRol);
            $query->bindParam(3, $descripcion);
            $query->execute();
            $mensaje = "Rol registrado con exito";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }

    public function registroRolCrud(rolDto $rolDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = '';
        $id_Rol = $rolDto->getid_Rol();
        $nombreRol = $rolDto->getnombreRol();
        $descripcion = $rolDto->getdescripcion();

        try {
            $query = $conn->prepare("INSERT INTO rol(id_Rol, nombreRol, descripcion) VALUES(?,?,?)");
            $query->bindParam(1, $id_Rol);
            $query->bindParam(2, $nombreRol);
            $query->bindParam(3, $descripcion);
            $query->execute();
            $mensaje = "Rol registrado con exito";
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
            $listarRoles = 'SELECT * FROM rol';
            $query = $conn->prepare($listarRoles);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            echo 'Error' . $ex->getMessage();
        }
    }

    public function modificarRol(rolDto $rolDto)
    {
        $cnn = Conexion::getConexion();
        $mensaje = "";
        $id_Rol = $rolDto->getId_Rol();
        $nombreRol = $rolDto->getnombreRol();
        $descripcion = $rolDto->getdescripcion();
        try {
            $query = $cnn->prepare("UPDATE rol SET nombreRol=?, descripcion=? WHERE id_Rol=?");
            $query->bindParam(1, $nombreRol);
            $query->bindParam(2, $descripcion);
            $query->bindParam(3, $id_Rol);
            $query->execute();
            $mensaje = "Registro actualizado";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $cnn = null;
        return $mensaje;
    }

    public function obtenerRol($id_Rol)
    {
        $conn = Conexion::getConexion();
        $mensaje = '';
        try {
            $query = $conn->prepare("SELECT * FROM rol WHERE id_Rol = ?");
            $query->bindParam(1, $id_Rol);
            $query->execute();
            return $query->fetch();
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }

    public function eliminarRol($id_Rol)
    {
        $conn = Conexion::getConexion();
        $mensaje = '';
        try {
            $query = $conn->prepare("DELETE FROM rol WHERE id_Rol = ?");
            $query->bindParam(1, $id_Rol);
            $query->execute();
            $mensaje = 'Rol eliminado con exito';
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        }
        $conn = null;
        return $mensaje;
    }
}
