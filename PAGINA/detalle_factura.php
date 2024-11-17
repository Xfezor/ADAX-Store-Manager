<!DOCTYPE html>
<html lang="en">
<?php
session_start();

if (!isset($_SESSION['nombre1'])) {
    header('Location:iniciar_sesion.php?error=2');
    echo "no esta iniciando la sesion";
} elseif (isset($_SESSION['nombre1'])) {
    require '../Crud/Dao/usuariosDao.php';
    require '../Crud/Dto/usuariosDto.php';
    require '../Crud/Dao/tiendaDao.php';
    require '../Crud/Dto/tiendaDto.php';
    require '../Crud/utilidades/conexion.php';
    if (isset($_SESSION["rol_id_Rol"])) {
        $rol_id_Rol = $_SESSION["rol_id_Rol"];
    }
    $nombreTienda = $_SESSION["nombreTienda"];
    $codigo_invitacion = $_SESSION["codigo_invitacion"];
} else {
    echo 'ocurrio un error';
}

?>

<head>
    <title>ADAX - Detalle factura</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
    <link rel="stylesheet" href="../styles/styles_detalle_factura.css">
</head>
<header>
    <div class="contenedorarriba">
        <button class="back" onclick="backbutton()">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div class="adax">
            <h1 class="title">Detalle de la factura</h1>
        </div>
        <button class="exit" onclick="exitbutton()">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
</header>

<body>
    <div class="container">
        <h1 class="text-left">Detalles</h1>
    </div>
    <div class="cuadrado1 text-center">
        <?php
        require '../Crud/Dao/facturaDao.php';
        require '../Crud/Dto/facturaDto.php';

        if ($_POST['venta_ID'] != NULL) {
            $venta_ID = $_POST['venta_ID'];
            $fDao = new facturaDao();
            $factura_detalle = $fDao->detalleFactura($venta_ID);
            $productos_vendidos = $fDao->listaProductos($venta_ID);
        }
        foreach ($factura_detalle as $user) { ?>
            <div>
                <h3 class="numf d-inline-block">Numero de venta: </h3>
                <h3 class="idf d-inline-block"><?php echo $user['venta_id_Venta']; ?></h3>
            </div>
            <div>
                <h3 class="valftxt d-inline-block">Valor de la factura: </h3>
                <h3 class="valf d-inline-block">$<?php echo $user['precio']; ?></h3>
            </div>
            <div>
                <h3 class="fechaftxt d-inline-block">Fecha de la factura: </h3>
                <h3 class="fechaf d-inline-block"><?php echo $user['FechaVenta']; ?></h3>
            </div>
            <div>
                <h3 class="horaftxt d-inline-block">Hora de facturación: </h3>
                <h3 class="horaf d-inline-block"><?php echo $user['HoraVenta']; ?></h3>
            </div>
            <div>
                <h3 class="statusftxt d-inline-block">Estado: </h3>
                <h3 class="statusf d-inline-block"><?php echo $user['EstadoVenta']; ?></h3>
            </div>
            <div>
                <h3 class="cantidadtxt d-inline-block">Cantidad productos: </h3>
                <h3 class="cantidad d-inline-block"><?php echo $user['cantidadProductos']; ?></h3>
            </div>|
        </div>
    <?php } ?>
    <div class="container">
        <h1 class="text-left">Productos vendidos</h1>
    </div>
    <div class="cuadrado2">
        <table id="productos" class="product-table">
            <thead class="table-head">
                <tr>
                    <th>ID Producto</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody class="table-body">

                <?php
                foreach ($productos_vendidos as $products) { ?>
                    <tr>

                        <td><?php echo $products['producto_id_Producto']; ?></td>
                        <td><?php echo $products['Nombre']; ?></td>
                        <td><?php $cantidad = $products['cantidad']; echo $cantidad; ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
    <script src="../javascript/detalle_factura.js"></script>
</body>
<footer>
    <div class="user">
        <h1 class="username">Usuario: "<?php echo $_SESSION['nombre1'] ?>"</h1>
        <h1 class="username">Tienda: "<?php echo $_SESSION['nombreTienda'] ?>"</h1>
        <?php
        if (isset($rol_id_Rol)) {
            ?>
            <h1 class="username">Codigo invitacion: "<?php echo "?" ?>"</h1>
            <?php
        } else {
            ?>
            <h1 class="username">Codigo invitacion: "<?php echo $_SESSION['codigo_invitacion'] ?>"</h1>
            <?php
        }
        ?>
        <?php
        if (isset($rol_id_Rol)) {
            if ($rol_id_Rol === 1) {

                ?>
                <a href="../Crud/tablas/tablas.php" class="btn btn-danger" id="cerrarsesion">CRUD</a>
                <?php
            }
        }
        ?>
        <a href="cerrarsesion.php" class="btn btn-danger" id="cerrarsesion">cerrar sesion</a>
    </div>
</footer>

</html>