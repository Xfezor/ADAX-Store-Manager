<?php
session_start();
if (!isset($_SESSION['nombre1'])) {
    header('Location:login.php?error=2');
    echo "no esta iniciando la sesion";
} elseif (isset($_SESSION['nombre1'])) {
    require_once '../../utilidades/conexion.php';
} else {
    echo 'ocurrio un error';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crud - ADAX</title>
    <script src="https://kit.fontawesome.com/436bc767b0.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,500&display=swap"
        rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.6/css/dataTables.dataTables.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.datatables.net/2.1.6/js/dataTables.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="../tablas.php">ADAX - CRUD</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">Usuarios</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../usuario/listarusuarios.php">lista</a></li>
                            <li><a class="dropdown-item" href="../usuario/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tienda/listartienda.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tienda/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Producto</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../producto/listarproducto.php">lista</a></li>
                            <li><a class="dropdown-item" href="../producto/registrar.php">registrar</a></li>
                        </ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Factura</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../factura/listarfactura.php">lista</a></li>
                            <li><a class="dropdown-item" href="../factura/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle  " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Venta</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../venta/listarventa.php">lista</a></li>
                            <li><a class="dropdown-item" href="../venta/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Proveedor</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../proveedor/listarproveedor.php">lista</a></li>
                            <li><a class="dropdown-item" href="../proveedor/registrar.php">registrar</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Inventario</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../inventario/listarinventario.php">lista</a></li>
                            <li><a class="dropdown-item" href="../inventario/registrar.php">registrar</a></li>
                        </ul>

                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            cliente
                        </a>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="../cliente/listarcliente.php">lista</a></li>
                        <li><a class="dropdown-item" href="../cliente/registrar.php">registrar</a></li>
                        </ul>

                   
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Movimiento</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../movimiento/listarmovimiento.php">lista</a></li>
                            <li><a class="dropdown-item" href="../movimiento/registrar.php">registrar</a></li>
                        </ul>
                    </li>

                   

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Entrega Productos
                        </a>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="../entregaproductos/listarentregaproductos.php">Lista</a></li>
                        <li><a class="dropdown-item" href="../entregaproductos/registrar.php">Registrar</a></li>
                        </ul>
                    </li>

                </ul>
                <span class="navbar-text me-3 active">Usuario:
                    <?php
                    echo $_SESSION['nombre1'];
                    ?>
                </span>
                <a href="../cerrarsesion.php" class="btn btn-outline-danger float-right end-0 me-0" type="submit">cerrar
                    sesión</a>
                <?php
                if (isset($_GET['mensaje'])) {
                    ?>
                    <span class="navbar-text me-3 ms-3 active">Operacion: <?php echo $_GET['mensaje'] ?>
                    </span>
                    <?php
                }
                ?>
            </div>
        </div>
    </nav>
    <div style="width: 99.9%">
    <table id="usrtable"
        class="table table-container table-striped table-hover table-bordered table-responsive mt-4 table-sm">
        <thead class="table-dark light-header">
            <tr class="text-center">
                <th style="font-weight:normal">id_inventario</th>
                <th style="font-weight:normal">CantidadInventario</th>
                <th style="font-weight :normal">fechaModificacion</th>
                <th style="font-weight :normal">estado_revision</th>
                <th style="font-weight :normal">tienda_idtienda</th>
                <th style="font-weight:normal">Modificar</th>
                <th style="font-weight :normal">Eliminar</th>
        </thead>
        <tbody>
            <?php
            require '../../Dao/inventarioDao.php';
            require '../../Dto/inventarioDto.php';
            $iDao = new inventarioDao();
            $allUsers = $iDao->listarTodos();
            foreach ($allUsers as $user) { ?>
                <tr class="text-center">
                    <td><?php echo $user['id_Inventario']; ?></td>
                    <td><?php echo $user['cantidadInventario']; ?></td>
                    <td><?php echo $user['fechaModificacion']; ?></td>
                    <td><?php echo $user['estado_revision']; ?></td>
                    <td><?php echo $user['tienda_idtienda']; ?></td>
                    <td>
                    <form action="actualizar.php" method="post">
                        <input type="hidden" name="id_inventario" value="<?php echo isset($user['id_inventario']) ? htmlspecialchars($user['id_inventario']) : ''; ?>">
                        <button type="submit" class="btn btn-warning">Modificar</button>
                    </form>
                </td>

                    <td>
                    <a 
                        class="btn btn-danger" 
                        href="../../controlador/controlador.inventario.php?id_inventario=<?php 
                            echo isset($user['id_inventario']) ? htmlspecialchars($user['id_inventario']) : ''; ?>" 
                        onclick="return confirm('¿Estás seguro de que deseas eliminar este registro?');">
                        Eliminar
                    </a>
                </td>

                </tr>
                <?php
            } ?>
        </tbody>
    </table>
    </div>
    <script src="tablesjs.js"></script>
    <script>
        $(document).ready(function() {
            $('#usrtable').DataTable({
                "paging": true, 
                "searching": true, 
                "ordering": true, 
                "order": [[0, 'desc']],
                "language": {
                    "sSearch": "Buscar:", 
                    "sLengthMenu": "Mostrar _MENU_ registros por página", 
                    "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ entradas", 
                    "oPaginate": {
                        "sPrevious": "Anterior", 
                        "sNext": "Siguiente" 
                    }
                }
            });
        });
    </script>
</body>
</html>