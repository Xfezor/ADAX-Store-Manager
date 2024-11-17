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
        require '../../Dao/usuariosDao.php';
        require '../../Dto/usuariosDto.php';
        require '../../utilidades/conexion.php';

        if ($_POST['doc'] != NULL) {
            $uDao = new UsuarioDao();
            $usuario = $uDao->obtenerUsuario($_POST['doc']);
        }
        ?>

        <section class="get-in-touch">
            <h1 class="title">Actualizar</h1>
            <form class="contact-form row" action="../../controlador/controlador.usuarios.php" method="POST">
                <div class="form-field col-lg-6">
                    <input name="document" value="<?php echo $usuario['documento']; ?>" id="name" class="input-text js-input" type="text" required>
                    <label class="label" for="name">Documento</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="tipodoc" value="<?php echo $usuario['tipo_doc']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="email">Tipo de documento</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="contrasena" value="<?php echo $usuario['contrasena']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="company">Contraseña</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="correo" value="<?php echo $usuario['correo']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Correo</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="nombre1" value="<?php echo $usuario['nombre1']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Nombre 1</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="nombre2" value="<?php echo $usuario['nombre2']; ?>" id="text" class="input-text js-input" type="text">
                    <label class="label" for="company">Nombre 2</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="apellido1" value="<?php echo $usuario['apellido1']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Apellido 1</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="apellido2" value="<?php echo $usuario['apellido2']; ?>" id="text" class="input-text js-input" type="text">
                    <label class="label" for="company">Apellido 2</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="idrol" value="<?php echo $usuario['rol_id_Rol']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Id rol</label>
                </div>

                <div class="form-field col-lg-6 ">
                    <input name="codigoinvitacion" value="<?php echo $usuario['codigo_invitacion']; ?>" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Codigo invitacion</label>
                </div>
                <div class="form-field col-lg-6">
                    <a href="listarusuarios.php"><input class="submit-btn" value="cancelar" ></a>
                </div>
                <div class="form-field col-lg-6">
                    <input name="modificar" class="submit-btn" type="submit" value="Actualizar">
                </div>

            </form>
        </section>
    </div>
</body>