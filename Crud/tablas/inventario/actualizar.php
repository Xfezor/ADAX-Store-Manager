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
        require '../../Dao/inventarioDao.php';
        require '../../Dto/inventarioDto.php';
        require '../../utilidades/conexion.php';

        $inventario = [
            'id_inventario' => '',
            'CantidadInventario' => '',
            'fechaModificacion' => '',
            'estado_revision' => '',
            'tienda_idtienda' => ''
        ];

        if (!empty($_POST['id_inventario'])) {
            $iDao = new inventarioDao();
            $inventario = $iDao->obtenerinventario($_POST['id_inventario']);
        }
        ?>
        <section class="get-in-touch">
            <h1 class="title">Actualizar</h1>
            <form class="contact-form row" action="../../controlador/controlador.inventario.php" method="POST">
                <div class="form-field col-lg-6">
                    <input name="id_inventario" value="<?php echo htmlspecialchars($inventario['id_inventario']); ?>" id="id_inventario" class="input-text js-input" type="text" required>
                    <label class="label" for="id_inventario">ID Inventario</label>
                </div>
                <div class="form-field col-lg-6">
                    <input name="CantidadInventario" value="<?php echo htmlspecialchars($inventario['CantidadInventario']); ?>" id="CantidadInventario" class="input-text js-input" type="text" required>
                    <label class="label" for="CantidadInventario">Cantidad de Inventario</label>
                </div>
                <div class="form-field col-lg-6">
                    <input name="fechaModificacion" value="<?php echo htmlspecialchars($inventario['fechaModificacion']); ?>" id="fechaModificacion" class="input-text js-input" type="text" required>
                    <label class="label" for="fechaModificacion">Fecha de Modificación</label>
                </div>
                <div class="form-field col-lg-6">
                    <input name="estado_revision" value="<?php echo htmlspecialchars($inventario['estado_revision']); ?>" id="estado_revision" class="input-text js-input" type="text" required>
                    <label class="label" for="estado_revision">Estado Revisión</label>
                </div>
                <div class="form-field col-lg-12">
                    <input name="tienda_idtienda" value="<?php echo htmlspecialchars($inventario['tienda_idtienda']); ?>" id="tienda_idtienda" class="input-text js-input" type="text" required>
                    <label class="label" for="tienda_idtienda">ID Tienda</label>
                </div>
                <div class="form-field col-lg-6">
                    <a href="listarinventario.php" class="submit-btn">Cancelar</a>
                </div>
                <div class="form-field col-lg-6">
                    <input name="modificar" class="submit-btn" type="submit" value="Actualizar">
                </div>
            </form>
        </section>
    </div>
</body>
