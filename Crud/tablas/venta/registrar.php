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
        require '../../Dao/ventaDao.php';
        require '../../Dto/ventaDto.php';
        require '../../utilidades/conexion.php';

        ?>

        <section class="get-in-touch">
            <h1 class="title">Registrar</h1>
            <form class="contact-form row" action="../../controlador/controlador.venta.php" method="POST">
            <div class="form-field col-lg-6">
                <input id="id-venta" name="id_Venta" value="<?php echo $venta['id_Venta']; ?>" class="input-number js-input" type="number" required>
                <label class="label" for="id-venta">id_Venta</label>
            </div>
            <div class="form-field col-lg-6 ">
                <input id="fecha-venta" name="FechaVenta" value="<?php echo $venta['FechaVenta']; ?>" class="input-date js-input" type="date" required>
                <label class="label" for="fecha-venta">Fecha Venta</label>
            </div>
            <div class="form-field col-lg-6 ">
                <input id="hora-venta" name="HoraVenta" value="<?php echo $venta['HoraVenta']; ?>" class="input-time js-input" type="time" required>
                <label class="label" for="hora-venta">HoraVenta</label>
            </div>
            <div class="form-field col-lg-6 ">
                <input id="estado-venta" name="EstadoVenta" value="<?php echo $venta['EstadoVenta']; ?>" class="input-text js-input" type="text" required>
                <label class="label" for="estado-venta">EstadoVenta</label>
            </div>
            <div class="form-fiel1d col-lg-6 ">
                <input id="cliente-id" name="cliente_id_Cliente" value="<?php echo $venta['cliente_id_Cliente']; ?>" class="input-number js-input" type="number" required>
                <label class="label" for="cliente-id">id Cliente </label>
            </div>
            <div class="form-field col-lg-6 ">
                <input id="tienda_idtienda" name="tienda_idtienda" value="<?php echo $venta['tienda_idtienda']; ?>" class="input-number js-input" type="number" required>
                <label class="label" for="tienda_idtienda">id tienda </label>
            </div>
            <div class="form-field col-lg-6 ">
                <input id="metododepago_ID_Met_pago" name="metododepago_ID_Met_pago" value="<?php echo $venta['metododepago_ID_Met_pago']; ?>" class="input-text js-input" type="text" required>
                <label class="label" for="metododepago_ID_Met_pago">id metodo de pagp </label>
            </div>
           
                

                <div class="form-field col-lg-6">
                    <a href="listarventa.php"><input class="submit-btn" value="cancelar" ></a>
                </div>
                <div class="form-field col-lg-6">
                    <input name="registrocrud" class="submit-btn" type="submit" value="Actualizar">
                </div>

            </form>
        </section>
    </div>
</body>