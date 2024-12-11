<input?php
session_start();
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
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="form-box">
        <?php
        require '../../Dao/entregaproductosDao.php';
        require '../../Dto/entregaproductosDto.php';
        require '../../utilidades/conexion.php';

       
        ?>

        <section class="get-in-touch">
            <h1 class="title">Actualizar</h1>
            <form class="contact-form row" action="../../controlador/controlador.entregaproductos.php" method="POST">
            <!-- Campo proveedor_idproveedor -->
        <!-- Proveedor ID -->
        <div class="form-field col-lg-12">
        <input name="proveedor_idproveedor" value="<?php echo isset($cliente['proveedor_idproveedor']) ? $cliente['proveedor_idproveedor'] : ''; ?>" id="name" class="input-text js-input" type="text" required>
            <label class="label" for="name">Proveedor ID</label>
        </div>

        <!-- Producto ID -->
        <div class="form-field col-lg-12">
            <input name="producto_id_Producto" value="<?php echo isset($cliente['producto_id_Producto']) ? $cliente['producto_id_Producto'] : ''; ?>" id="text" class="input-text js-input" type="text" required>
            <label class="label" for="email">Producto ID</label>
        </div>

    <!-- Campo fecha_Entrega -->
    <div class="form-field col-lg-12">
        <input name="fecha_Entrega" value="<?php echo $cliente['fecha_Entrega']; ?>" id="text" class="input-text js-input" type="date" required>
        <label class="label" for="company">Fecha de Entrega</label>
    </div>

    <!-- Campo cantidad -->
    <div class="form-field col-lg-12">
        <input name="cantidad" value="<?php echo $cliente['cantidad']; ?>" id="text" class="input-text js-input" type="number" required>
        <label class="label" for="phone">Cantidad</label>
    </div>

    <!-- Botón Cancelar -->
    <div class="form-field col-lg-6">
        <button type="button" class="submit-btn" onclick="window.location.href='listarfactura.php'">Cancelar</button>
    </div>

    <!-- Botón Actualizar -->
    <div class="form-field col-lg-6">
        <input name="modificar" class="submit-btn" type="submit" value="Actualizar">

    </div>
</form>

        </section>
    </div>
</body>