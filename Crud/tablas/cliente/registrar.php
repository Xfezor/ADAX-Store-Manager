<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crud - ADAX</title>
    <script src="https://kit.fontawesome.com/436bc767b0.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,500&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="form-box">
        <?php
        require '../../Dao/clienteDao.php';
        require '../../Dto/clienteDto.php';
        require '../../utilidades/conexion.php';
        ?>

        <section class="get-in-touch">
            <h1 class="title">Registrar Cliente</h1>
            <form class="contact-form row" action="../../controlador/controlador.cliente.php" method="POST">

                <div class="form-field col-lg-12">
                    <input name="id_Cliente" 
                           id="id_Cliente" 
                           class="input-text js-input" 
                           type="text" 
                           placeholder="Ingrese el ID del Cliente" 
                           required>
                    <label class="label" for="id_Cliente">ID Cliente</label>
                </div>

                <div class="form-field col-lg-12">
                    <input name="Documento" 
                           id="Documento" 
                           class="input-text js-input" 
                           type="text" 
                           placeholder="Ingrese el Documento" 
                           required>
                    <label class="label" for="Documento">Documento</label>
                </div>

                <div class="form-field col-lg-12">
                    <input name="Nombre1_Cliente" 
                           id="Nombre1_Cliente" 
                           class="input-text js-input" 
                           type="text" 
                           placeholder="Ingrese el Primer Nombre" 
                           required>
                    <label class="label" for="Nombre1_Cliente">Primer Nombre</label>
                </div>

                <div class="form-field col-lg-12">
                    <input name="Nombre2_Cliente" 
                           id="Nombre2_Cliente" 
                           class="input-text js-input" 
                           type="text" 
                           placeholder="Ingrese el Segundo Nombre" 
                           required>
                    <label class="label" for="Nombre2_Cliente">Segundo Nombre</label>
                </div>

                <div class="form-field col-lg-12">
                    <input name="Apellido1_Cliente" 
                           id="Apellido1_Cliente" 
                           class="input-text js-input" 
                           type="text" 
                           placeholder="Ingrese el Primer Apellido" 
                           required>
                    <label class="label" for="Apellido1_Cliente">Primer Apellido</label>
                </div>

                <div class="form-field col-lg-12">
                    <input name="Apellido2_Cliente" 
                           id="Apellido2_Cliente" 
                           class="input-text js-input" 
                           type="text" 
                           placeholder="Ingrese el Segundo Apellido" 
                           required>
                    <label class="label" for="Apellido2_Cliente">Segundo Apellido</label>
                </div>

                <div class="form-field col-lg-12">
                    <input name="Tipo_documento" 
                           id="Tipo_documento" 
                           class="input-text js-input" 
                           type="text" 
                           placeholder="Ingrese el Tipo de Documento" 
                           required>
                    <label class="label" for="Tipo_documento">Tipo de Documento</label>
                </div>

             
                <div class="form-field col-lg-6">
                    <button type="button" class="submit-btn" onclick="window.location.href='listarcliente.php'">Cancelar</button>
                </div>

                <div class="form-field col-lg-6">
                    <input name="registro" class="submit-btn" type="submit" value="Registrar">
                </div>
            </form>
        </section>
    </div>
</body>


</html>
