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
        <section class="get-in-touch">
            <h1 class="title">Registrar Entrega de Producto</h1>
            <form class="contact-form row" action="../../controlador/controlador.entregaproductos.php" method="POST">
                <div class="form-field col-lg-12">
                    <input name="proveedor_idproveedor" id="proveedor_idproveedor" class="input-text js-input" type="text" required>
                    <label class="label" for="proveedor_idproveedor">Proveedor ID</label>
                </div>
                <div class="form-field col-lg-12">
                    <input name="producto_id_Producto" id="producto_id_Producto" class="input-text js-input" type="text" required>
                    <label class="label" for="producto_id_Producto">Producto ID</label>
                </div>
                <div class="form-field col-lg-12">
                    <input name="fecha_Entrega" id="fecha_Entrega" class="input-text js-input" type="date" required>
                    <label class="label" for="fecha_Entrega">Fecha de Entrega</label>
                </div>
                <div class="form-field col-lg-12">
                    <input name="cantidad" id="cantidad" class="input-text js-input" type="number" required>
                    <label class="label" for="cantidad">Cantidad</label>
                </div>
                <div class="form-field col-lg-6">
                    <button type="button" class="submit-btn" onclick="window.location.href='listarentregaproductos.php'">Cancelar</button>
                </div>
                <div class="form-field col-lg-6">
                    <input name="registro" class="submit-btn" type="submit" value="Registrar">
                </div>
            </form>
        </section>
    </div>
</body>

</html>
