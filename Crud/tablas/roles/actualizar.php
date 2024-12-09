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
            require '../../rolDao.php';
            require '../../rolDto.php';
            require '../utilidades/conexion.php';

            if ($_POST['id_Rol'] != NULL) {
                $rDao = new rolDao();
                $rol = $rDao->obtenerRol($_POST['id_Rol']);
            }
            ?>
            <section class="get-in-touch">
                <h1 class="form-fild col-lg-6">
                    Actualizar
                </h1>
                <form class="contact-form row" action="../../controlador/controlador.rol.php" method="POST">
                    <div class="form-group col-lg-6">
                        <input name="id_Rol" value="<?php echo $rol['id_Rol']; ?>" id="name" class="input-text js-input" type="text" required>
                        <label class="label" for="name">
                            id_Rol
                        </label>
                    </div>
                    <div class="form-group col-lg-6">
                        <input name="nombreRol" value="<?php echo $rol['nombreRol']; ?>" id="text" class="input-text js-input" type="text" required>
                        <label class="label" for="name">
                            Nombre del rol
                        </label>
                    </div>
                    <div class="form-group col-lg-6">
                        <input name="descripcion" value="<?php echo $rol['descripcion']; ?>" id="text" class="input-text js-input" type="text" required>
                        <label class="label" for="name">
                            Descripción
                        </label>
                    </div>
                    <div class="form-field col-lg-6">
                        <a href="listarRol.php"></a>
                    </div>
                </form>
            </section>
        </div>
    </body>