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
        require '../../Dao/MovimientoDao.php';
        require '../../Dto/MovimientoDto.php';
        require '../../utilidades/conexion.php';
        ?>

        <section class="get-in-touch">
            <h1 class="title">Registrar</h1>
            <form class="contact-form row" action="../../controlador/controlador.movimiento.php" method="POST">
                <div class="form-field col-lg-6">
                <input name="id_Movimiento" id="name" class="input-text js-input" type="text" required>
                <label class="label" for="name">id Movimientoo</label>
                </div>
                <div class="form-field col-lg-6 ">
                <input name="cantidad_despues" id="text" class="input-text js-input" type="text" required>
                <label class="label" for="name">cantidad despues</label>
                </div>
                <div class="form-field col-lg-6 ">
                <input name="fecha_movimiento" id="text" class="input-text js-input" type="text" required>
                <label class="label" for="company">fecha movimiento</label>
                </div>
                <div class="form-field col-lg-6 ">
                <input name="fecha_modificacion" id="text" class="input-text js-input" type="text" required>
                <label class="label" for="phone">fecha modificacion</label>
                </div>
                <div class="form-field col-lg-6 ">
                <input name="estado_despues" class="input-text js-input" type="text" required>
                <label class="label" for="phone">estado despues</label>
                </div>
                <div class="form-field col-lg-6 ">
                <input name="inventario_id_Inventario" class="input-text js-input" type="text" required>
                <label class="label" for="phone">id Inventario </label>
                </div>


                <div class="form-field col-lg-6">
                    <a href="listarmovimiento.php"><input class="submit-btn" value="cancelar" ></a>
                </div>
                <div class="form-field col-lg-6">
                    <input name="modificar" class="submit-btn" type="submit" value="Registrar">
                </div>

            </form>
        </section>
    </div>
</body>