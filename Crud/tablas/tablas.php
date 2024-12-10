<?php
session_start();
if (!isset($_SESSION['nombre1'])) {
    header('Location:login.php?error=2');
    echo "no esta iniciando la sesion";
} elseif (isset($_SESSION['nombre1'])) {
    require '../utilidades/conexion.php';
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
                    <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">Usuarios</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/usuario/listarusuarios.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/usuario/registrar.php">registrar</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/tienda/listartienda.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/tienda/registrar.php">registrar</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Producto</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/producto/listarproducto.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/producto/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Factura</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/factura/listarfactura.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/factura/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Venta</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/venta/listarventa.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/venta/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Proveedor</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/proveedor/listarproveedor.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/proveedor/registrar.php">registrar</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Inventario</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/inventario/listarinventario.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/inventario/registrar.php">registrar</a></li>
                        </ul>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Cliente
                        </a>
                        <ul class="dropdown-menu">
<<<<<<< HEAD
                        <li><a class="dropdown-item" href="../tablas/cliente/listarcliente.php">lista</a></li>
                        <li><a class="dropdown-item" href="../tablas/cliente/registrar.php">registrar</a></li>
=======
                            <li><a class="dropdown-item" href="../cliente/listarcliente.php">lista</a></li>
                            <li><a class="dropdown-item" href="../cliente/registrar.php">registrar</a></li>
>>>>>>> c82a897bd8dd71e9e7b2eb4105842ddaecf79ad5
                        </ul>


                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Movimiento</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/movimiento/listarmovimiento.php">lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/movimiento/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Entrega Productos
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../tablas/entregaproductos/listarentregaproductos.php">Lista</a></li>
                            <li><a class="dropdown-item" href="../tablas/entregaproductos/registrar.php">Registrar</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Roles</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="roles/listaroles.php">lista</a></li>
                            <li><a class="dropdown-item" href="roles/registrar.php">registrar</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Metodos de Pago</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="metodos_Pago/listarmetodospago.php">lista</a></li>
                            <li><a class="dropdown-item" href="roles/registrar.php">registrar</a></li>
                        </ul>
                    </li>
                </ul>
                <span class="navbar-text me-3 active">Usuario:
                    <?php
                    echo $_SESSION['nombre1'];
                    ?>
                </span>
                <a href="cerrarsesion.php" class="btn btn-outline-danger float-right end-0 me-0" type="submit">cerrar
                    sesión</a>
            </div>
        </div>
    </nav>
</body>

</html>