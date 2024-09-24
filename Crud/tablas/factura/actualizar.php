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
        require '../../Dao/facturaDao.php';
        require '../../Dto/facturaDto.php';
        require '../../utilidades/conexion.php';

        if ($_POST['venta_id_Venta'] != NULL) {
            $fDao = new facturaDao();
            $factura = $fDao->obtenerFactura($_POST['venta_id_Venta']);
        }
        ?>

        <section class="get-in-touch">
            <h1 class="title">Actualizar</h1>
            <form class="contact-form row" action="../../controlador/controlador.factura.php" method="POST">
                <div class="form-field col-lg-6">
                    <input name="venta_id_Venta" value="<?php echo $factura['venta_id_Venta']; ?>" id="name" class="input-text js-input" type="text" required>
                    <label class="label" for="name">id Venta</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="producto_id_producto" value="<?php echo $factura['producto_id_producto']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="email">id producto</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="cantidad" value="<?php echo $factura['cantidad']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="company">cantidad</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="precio" value="<?php echo $factura['precio']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">precio</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="estado" value="<?php echo $factura['estado']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">estado</label>
                </div>
                
                <div class="form-field col-lg-6">
                    <a href="listarfactura.php"><input class="submit-btn" value="cancelar" ></a>
                </div>
                <div class="form-field col-lg-6">
                    <input name="modificar" class="submit-btn" type="submit" value="Actualizar">
                </div>

            </form>
        </section>
    </div>
</body>