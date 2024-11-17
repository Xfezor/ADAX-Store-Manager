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
        require '../../Dao/clienteDao.php';
        require '../../Dto/clienteDto.php';
        require '../../utilidades/conexion.php';

        if ($_POST['id_Cliente'] != NULL) {
            $cDao = new clienteDao();
            $cliente = $cDao->obtenerCliente($_POST['id_Cliente']);
        }
        ?>

        <section class="get-in-touch">
            <h1 class="title">Actualizar</h1>
            <form class="contact-form row" action="../../controlador/controlador.cliente.php" method="POST">
                <div class="form-field col-lg-6">
                    <input name="id_Cliente" value="<?php echo $cliente['id_Cliente']; ?>" id="name" class="input-text js-input" type="text" required>
                    <label class="label" for="name">id_Cliente</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Documento" value="<?php echo $cliente['Documento']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="email">Documento</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Nombre1_Cliente" value="<?php echo $cliente['Nombre1_Cliente']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="company">Nombre1_Cliente</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Nombre2_Cliente" value="<?php echo $cliente['Nombre2_Cliente']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Nombre2_Cliente</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Apellido1_Cliente" value="<?php echo $cliente['Apellido1_Cliente']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Apellido1_Cliente 1</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Apellido2_Cliente" value="<?php echo $cliente['Apellido2_Cliente']; ?>" id="text" class="input-text js-input" type="text">
                    <label class="label" for="company">Apellido2_Cliente 2</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Tipo_documento" value="<?php echo $cliente['Tipo_documento']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Tipo_documento </label>
                </div>
                
                <div class="form-field col-lg-6">
                    <a href="listarcliente.php"><input class="submit-btn" value="cancelar" ></a>
                </div>
                <div class="form-field col-lg-6">
                    <input name="modificar" class="submit-btn" type="submit" value="Actualizar">
                </div>

            </form>
        </section>
    </div>
</body>