<?php
require_once '../Dao/clienteDao.php';
require_once '../Dto/clienteDto.php';

class clienteController {

    // Método para manejar el registro de un cliente
    public function registrarCliente() {
        // Verificar si los datos del formulario están disponibles
        if (isset($_POST['id_Cliente'], $_POST['Documento'], $_POST['Nombre1_Cliente'], $_POST['Nombre2_Cliente'], 
                  $_POST['Apellido1_Cliente'], $_POST['Apellido2_Cliente'], $_POST['Tipo_documento'])) {

            // Crear un objeto clienteDto con los datos del formulario
            $cliente = new clienteDto();
            $cliente->setid_Cliente($_POST['id_Cliente']);
            $cliente->setDocumento($_POST['Documento']);
            $cliente->setNombre1_Cliente($_POST['Nombre1_Cliente']);
            $cliente->setNombre2_Cliente($_POST['Nombre2_Cliente']);
            $cliente->setApellido1_Cliente($_POST['Apellido1_Cliente']);
            $cliente->setApellido2_Cliente($_POST['Apellido2_Cliente']);
            $cliente->setTipo_documento($_POST['Tipo_documento']);

            // Llamar al método del DAO para registrar el cliente
            $clienteDao = new clienteDao();
            $mensaje = $clienteDao->registrarCliente($cliente);

            // Devolver el mensaje de resultado
            echo $mensaje;
        } else {
            echo "Faltan datos para registrar el cliente.";
        }
    }

    // Método para manejar la eliminación de un cliente
    public function eliminarCliente() {
        // Verificar si el id_Cliente está disponible
        if (isset($_POST['id_Cliente'])) {
            $id_Cliente = $_POST['id_Cliente'];

            // Llamar al método del DAO para eliminar el cliente
            $clienteDao = new clienteDao();
            $mensaje = $clienteDao->eliminarCliente($id_Cliente);

            // Devolver el mensaje de resultado
            echo $mensaje;
        } else {
            echo "Faltó el id_Cliente para eliminar.";
        }
    }

    // Método para manejar la modificación de un cliente
    public function modificarCliente() {
        // Verificar si los datos del formulario están disponibles
        if (isset($_POST['id_Cliente'], $_POST['Documento'], $_POST['Nombre1_Cliente'], $_POST['Nombre2_Cliente'], 
                  $_POST['Apellido1_Cliente'], $_POST['Apellido2_Cliente'], $_POST['Tipo_documento'])) {

            // Crear un objeto clienteDto con los datos del formulario
            $cliente = new clienteDto();
            $cliente->setid_Cliente($_POST['id_Cliente']);
            $cliente->setDocumento($_POST['Documento']);
            $cliente->setNombre1_Cliente($_POST['Nombre1_Cliente']);
            $cliente->setNombre2_Cliente($_POST['Nombre2_Cliente']);
            $cliente->setApellido1_Cliente($_POST['Apellido1_Cliente']);
            $cliente->setApellido2_Cliente($_POST['Apellido2_Cliente']);
            $cliente->setTipo_documento($_POST['Tipo_documento']);

            // Llamar al método del DAO para modificar el cliente
            $clienteDao = new clienteDao();
            $mensaje = $clienteDao->modificarCliente($cliente);

            // Devolver el mensaje de resultado
            echo $mensaje;
        } else {
            echo "Faltan datos para modificar el cliente.";
        }
    }

    // Método para manejar la obtención de todos los clientes
    public function obtenerClientes() {
        $clienteDao = new clienteDao();
        $clientes = $clienteDao->obtenerClientes();

        // Convertir los resultados a formato JSON y devolverlos
        echo json_encode($clientes);
    }

    // Método para manejar la obtención de un cliente por ID
    public function obtenerClientePorId() {
        if (isset($_POST['id_Cliente'])) {
            $id_Cliente = $_POST['id_Cliente'];

            $clienteDao = new clienteDao();
            $cliente = $clienteDao->obtenerClientePorId($id_Cliente);

            // Devolver el cliente como un objeto JSON
            echo json_encode($cliente);
        } else {
            echo "Faltó el id_Cliente para obtener el cliente.";
        }
    }
}
?>
