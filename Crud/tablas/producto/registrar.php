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
        require '../../Dao/productoDao.php';
        require '../../Dto/productoDto.php';
        require '../../utilidades/conexion.php';

        ?>

        <section class="get-in-touch">
            <h1 class="title">Registrar</h1>
            <form class="contact-form row" action="../../controlador/controlador.producto.php" method="POST">
                <div class="form-field col-lg-6">
                    <input name="id_Producto" id="name" class="input-text js-input" type="text" required>
                    <label class="label" for="name">id Producto</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Nombre" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="email">Nombre producto</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Precio_unit" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="company">Precio unitario</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Descripción" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Descripción</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Marca" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Marca </label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Categoría" id="text" class="input-text js-input" type="text">
                    <label class="label" for="company">Categoría</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Presentacion" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Presentacion</label>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Fecha_vencimiento" id="text" class="input-text js-input" type="text">
                    <label class="label" for="company">Fecha vencimiento</label>
                </div>
                <div class="form-field col-lg-12 ">
                    <input name="Stock" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">Stock</label>
                </div>
                </div>
                <div class="form-field col-lg-6 ">
                    <input name="Stock_Min" id="text" class="input-text js-input" type="text">
                    <label class="label" for="company">Stock Minimo</label>
                </div>
                <div class="form-field col-lg-12 ">
                    <input name="inventario_id_Inventario" id="text" class="input-text js-input" type="text" required>
                    <label class="label" for="phone">inventario_id_Inventario</label>
                </div>

                <div class="form-field col-lg-6">
                    <a href="listarproducto.php"><input class="submit-btn" value="cancelar" ></a>
                </div>
                <div class="form-field col-lg-6">
                    <input name="registrocrud" class="submit-btn" type="submit" value="Actualizar">
                </div>

            </form>
        </section>
    </div>
</body>