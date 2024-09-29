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
                        <a class="nav-link dropdown-toggle" href="../tablas.php" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Usuarios
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../usuario/listarusuarios.php">lista</a></li>
                            <li><a class="dropdown-item" href="../usuario/registrar.php">registrar</a></li>
                        </ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Tienda
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tienda/listartienda.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tienda/registrar.php">registrar</a></li>
                        </ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Producto
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="listarproducto.php">lista</a></li>
                            <li><a class="dropdown-item" href="registrar.php">registrar</a></li>
                        </ul>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Factura
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">lista</a></li>
                            <li><a class="dropdown-item" href="#">registrar</a></li>
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
                <th style="font-weight:normal">id_producto</th>
                <th style="font-weight:normal">Nombre</th>
                <th style="font-weight :normal">Precio_unit</th>
                <th style="font-weight :normal">Descripcion</th>
                <th style="font-weight :normal">Marca</th>
                <th style="font-weight :normal">Categoria</th>
                <th style="font-weight :normal">Presentacion</th>
                <th style="font-weight :normal">Fecha_vencimiento</th>
                <th style="font-weight :normal">Stock</th>
                <th style="font-weight :normal">Stock_Min</th>
                <th style="font-weight :normal">inventario_id_Inventario</th>
                <th style="font-weight:normal">Modificar</th>
                <th style="font-weight :normal">Eliminar</th>
            </tr>
        </thead>
        <tbody>
            <?php
            require '../../Dao/productoDao.php';
            require '../../Dto/productoDto.php';
            $pDao = new productoDao();
            $allUsers = $pDao->listarTodos();
            foreach ($allUsers as $user) { ?>
                <tr class="text-center">
                    <td><?php echo $user['id_Producto']; ?></td>
                    <td><?php echo $user['Nombre']; ?></td>
                    <td><?php echo $user['Precio_unit']; ?></td>
                    <td><?php echo $user['Descripcion']; ?></td>
                    <td><?php echo $user['Marca']; ?></td>
                    <td><?php echo $user['Categoria']; ?></td>
                    <td><?php echo $user['Presentacion']; ?></td>
                    <td><?php echo $user['Fecha_vencimiento']; ?></td>
                    <td><?php echo $user['Stock']; ?></td>
                    <td><?php echo $user['Stock_Min']; ?></td>
                    <td><?php echo $user['inventario_id_Inventario']; ?></td>
                    <td>
                        <form action="actualizar.php" method="post">
                            <input type="hidden" name="idtiend" value="<?php echo $user['id_Producto']; ?>">
                            <button type="submit" class="btn btn-warning">Modificar</button>
                        </form>
                    </td>
                    <td><a class="btn btn-danger" href="../../controlador/controlador.producto.php?id_Producto=<?php echo $user['id_Producto']; ?>
                    " onclick=" return confirmar(event);">Eliminar</a>
                    </td>
                </tr>
                <?php
            } ?>
        </tbody>
    </table>
    </div>
    <script src="tablesjs.js"></script>
</body>
</html>