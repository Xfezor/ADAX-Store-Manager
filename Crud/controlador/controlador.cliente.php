<?php
require_once '../Dao/clienteDao.php';
require_once '../Dto/clienteDto.php';

class clienteController {

  
    public function registrarCliente() {
       
        if (isset($_POST['id_Cliente'], $_POST['Documento'], $_POST['Nombre1_Cliente'], $_POST['Nombre2_Cliente'], 
                  $_POST['Apellido1_Cliente'], $_POST['Apellido2_Cliente'], $_POST['Tipo_documento'])) {

           
            $cliente = new clienteDto();
            $cliente->setid_Cliente($_POST['id_Cliente']);
            $cliente->setDocumento($_POST['Documento']);
            $cliente->setNombre1_Cliente($_POST['Nombre1_Cliente']);
            $cliente->setNombre2_Cliente($_POST['Nombre2_Cliente']);
            $cliente->setApellido1_Cliente($_POST['Apellido1_Cliente']);
            $cliente->setApellido2_Cliente($_POST['Apellido2_Cliente']);
            $cliente->setTipo_documento($_POST['Tipo_documento']);

            
            $clienteDao = new clienteDao();
            $mensaje = $clienteDao->registrarCliente($cliente);

          
            echo $mensaje;
        } else {
            echo "Faltan datos para registrar el cliente.";
        }
    }

  
    public function eliminarCliente() {
      
        if (isset($_POST['id_Cliente'])) {
            $id_Cliente = $_POST['id_Cliente'];

           
            $clienteDao = new clienteDao();
            $mensaje = $clienteDao->eliminarCliente($id_Cliente);

          
            echo $mensaje;
        } else {
            echo "Faltó el id_Cliente para eliminar.";
        }
    }

    public function modificarCliente() {
        
        if (isset($_POST['id_Cliente'], $_POST['Documento'], $_POST['Nombre1_Cliente'], $_POST['Nombre2_Cliente'], 
                  $_POST['Apellido1_Cliente'], $_POST['Apellido2_Cliente'], $_POST['Tipo_documento'])) {

            
            $cliente = new clienteDto();
            $cliente->setid_Cliente($_POST['id_Cliente']);
            $cliente->setDocumento($_POST['Documento']);
            $cliente->setNombre1_Cliente($_POST['Nombre1_Cliente']);
            $cliente->setNombre2_Cliente($_POST['Nombre2_Cliente']);
            $cliente->setApellido1_Cliente($_POST['Apellido1_Cliente']);
            $cliente->setApellido2_Cliente($_POST['Apellido2_Cliente']);
            $cliente->setTipo_documento($_POST['Tipo_documento']);

            
            $clienteDao = new clienteDao();
            $mensaje = $clienteDao->modificarCliente($cliente);

           
            echo $mensaje;
        } else {
            echo "Faltan datos para modificar el cliente.";
        }
    }

   
    public function obtenerClientes() {
        $clienteDao = new clienteDao();
        $clientes = $clienteDao->obtenerClientes();

        
        echo json_encode($clientes);
    }

    public function obtenerClientePorId() {
        if (isset($_POST['id_Cliente'])) {
            $id_Cliente = $_POST['id_Cliente'];

            $clienteDao = new clienteDao();
            $cliente = $clienteDao->obtenerClientePorId($id_Cliente);

          
            echo json_encode($cliente);
        } else {
            echo "Faltó el id_Cliente para obtener el cliente.";
        }
    }
}
?>
