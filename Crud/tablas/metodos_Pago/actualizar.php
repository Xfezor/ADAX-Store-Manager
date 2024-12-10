<input?php session_start(); ?>
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
            require '../../Dao/metodopagoDao.php';
            require '../../Dto/metodopagoDto.php';
            require '../../utilidades/conexion.php';

            if ($_POST['ID_Met_pago'] != NULL) {
                $mpDao = new metodopagoDao();
                $metodopago = $mpDao->obtenerMetodosPago($_POST['ID_Met_pago']);
            }
            ?>
            <section class="get-in-touch">
                <h1 class="title">
                    Actualizar
                </h1>
                <form class="contact-form row" action="../../controlador/controlador.metodospago.php" method="POST">
                    <div class="form-group col-lg-6">
                        <label class="label" for="id_met_pago">
                            ID del método de pago
                        </label>
                        <input style="color: grey" name="ID_Met_pago" value="<?php echo $metodopago['ID_Met_pago']; ?> NO PUEDES MODIFICAR EL ID" id="ID_Met_pago"
                            class="input-text js-input" type="text" required readonly> 
                    </div>
                    <div class="form-group col-lg-6">
                        <label class="label" for="text">
                            Nombre del rol
                        </label>
                        <input name="Nombre" value="<?php echo $metodopago['Nombre']; ?>" id="text"
                            class="input-text js-input" type="text" required>
                    </div>
                    <div class="form-field col-lg-6">
                        <input class="submit-btn" value="Cancelar"
                            onclick="window.location.href='listartiendas.php'; return false;">
                    </div>
                    <div class="form-field col-lg-6">
                        <input name="modificarMetodosPago" class="submit-btn" type="submit" value="Actualizar">
                    </div>
                </form>
            </section>
        </div>
    </body>

    </html>