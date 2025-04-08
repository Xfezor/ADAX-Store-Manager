<?php
class proveedorDao
{
    public function registrarProveedor(proveedorDto $proveedorDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = '';
        $idproveedor = $proveedorDto->getidproveedor();
        $nombre = $proveedorDto->getnombre();
        $telefono = $proveedorDto->gettelefono();
        $email = $proveedorDto->getemail();
        $id_tienda = $proveedorDto->getid_tienda();

        try {
            $query = $conn->prepare("INSERT INTO proveedor(idproveedor, nombre, telefono, email, id_tienda) VALUES (?, ?, ?, ?, ?)");
            $query->bindParam(1, $idproveedor);
            $query->bindParam(2, $nombre);
            $query->bindParam(3, $telefono);
            $query->bindParam(4, $email);
            $query->bindParam(5, $id_tienda);
            $query->execute();
            $mensaje = "Proveedor registrado exitosamente";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        } finally {
            $conn = null;
        }
        return $mensaje;
    }

    public function registroProveedorCrud(proveedorDto $proveedorDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = '';
        $idproveedor = $proveedorDto->getidproveedor();
        $nombre = $proveedorDto->getnombre();
        $telefono = $proveedorDto->gettelefono();
        $email = $proveedorDto->getemail();
        $id_tienda = $proveedorDto->getid_tienda();

        try {
            $query = $conn->prepare("INSERT INTO proveedor(idproveedor, nombre, telefono, email, id_tienda) VALUES (?, ?, ?, ?, ?)");
            $query->bindParam(1, $idproveedor);
            $query->bindParam(2, $nombre);
            $query->bindParam(3, $telefono);
            $query->bindParam(4, $email);
            $query->bindParam(5, $id_tienda);
            $query->execute();
            $mensaje = "Proveedor registrado exitosamente en CRUD";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        } finally {
            $conn = null;
        }
        return $mensaje;
    }

    public function listarTodos()
    {
        $conn = Conexion::getConexion();
        try {
            $listarProveedor = "SELECT * FROM proveedor";
            $query = $conn->prepare($listarProveedor);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            return []; 
        } finally {
            $conn = null;
        }
    }
    public function listarTodosPorTienda($codigo_invitacion)
    {
        $conn = Conexion::getConexion();
        try {
            $query = $conn->prepare("SELECT pr.nombre, pr.telefono, pr.email, p.Nombre, pr.idproveedor from proveedor pr inner join producto p on pr.idproveedor = p.idProveedor inner join tienda t on pr.id_tienda = t.idtienda where t.codigo_invitacion = ? group by pr.idproveedor;");
            $query->bindParam(1, $codigo_invitacion);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            return []; 
        } finally {
            $conn = null;
        }
    }
    public function listarProductos($idproveedor)
    {
        $conn = Conexion::getConexion();
        try {
            $query = $conn->prepare("SELECT p.Nombre, p.Marca from producto p inner join proveedor pr on pr.idproveedor = p.idProveedor where p.idproveedor = ?;");
            $query->bindParam(1, $idproveedor);
            $query->execute();
            return $query->fetchAll();
        } catch (Exception $ex) {
            return []; 
        } finally {
            $conn = null;
        }
    }

    public function modificarProveedor(proveedorDto $proveedorDto)
    {
        $conn = Conexion::getConexion();
        $mensaje = "";
        $idproveedor = $proveedorDto->getidproveedor();
        $nombre = $proveedorDto->getnombre();
        $telefono = $proveedorDto->gettelefono();
        $email = $proveedorDto->getemail();
        $id_tienda = $proveedorDto->getid_tienda();

        try {
            $query = $conn->prepare("UPDATE proveedor SET nombre=?, telefono=?, email=?, id_tienda=? WHERE idproveedor=?");
            $query->bindParam(1, $nombre);
            $query->bindParam(2, $telefono);
            $query->bindParam(3, $email);
            $query->bindParam(4, $id_tienda);
            $query->bindParam(5, $idproveedor);
            $query->execute();
            $mensaje = "Registro actualizado";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        } finally {
            $conn = null;
        }
        return $mensaje;
    }

    public function obtenerProveedor($idproveedor)
    {
        $conn = Conexion::getConexion();
        try {
            $query = $conn->prepare("SELECT * FROM proveedor WHERE idproveedor = ?");
            $query->bindParam(1, $idproveedor, PDO::PARAM_INT);
            $query->execute();
            $resultado = $query->fetch();
            if (!$resultado) {
                throw new Exception("Proveedor no encontrado");
            }
            return $resultado;
        } catch (Exception $ex) {
            throw new Exception("Error al obtener proveedor: " . $ex->getMessage());
        } finally {
            $conn = null;
        }
    }

    public function eliminarProveedor($idproveedor)
    {
        $conn = Conexion::getConexion();
        $mensaje = '';
        try {
            $query = $conn->prepare("DELETE FROM proveedor WHERE idproveedor = ?");
            $query->bindParam(1, $idproveedor);
            $query->execute();
            $mensaje = "Proveedor eliminado con éxito";
        } catch (Exception $ex) {
            $mensaje = $ex->getMessage();
        } finally {
            $conn = null;
        }
        return $mensaje;
    }
}
?>
