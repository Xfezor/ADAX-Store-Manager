<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION['nombre1'])){
header('Location:iniciar_sesion.php?error=2');
echo "no esta iniciando la sesion";
}elseif(isset($_SESSION['nombre1'])){
    require '../Crud/Dao/usuariosDao.php';
    require '../Crud/Dto/usuariosDto.php';
    require '../Crud/utilidades/conexion.php';
}else {
     echo 'ocurrio un error'; 
 }
?>
<html lang="en">
<head>
<title>ADAX - Inicio</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://kit.fontawesome.com/436bc767b0.js" crossorigin="anonymous"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,500&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<link rel="stylesheet" href="../styles/styles_inicio.css">
</head>
<header>
  <div class="contenedorarriba">
    <button class="back" onclick="backbutton()">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    <div class="adax">
      <h1 class="title">ADAX Store Manager</h1>
    </div>
      <button class="exit" onclick="exitbutton()">
        <i class="fa-solid fa-xmark"></i>
      </button>
  </div>
</header>
<body>
    <div class="big-button-container">
        <div class="linea-big-button">
            <div class="btn"  id="Gp">
                <h1 class="textogrande">Gestionar Productos</h1>
            </div>
            <div class="btn" id="An">
                <h1 class="textogrande">Analisis</h1>
            </div>
        </div>
        <div class="linea-big-button">
            <div class="btn" id="Vn">
                <h1 class="textogrande">Ventas</h1>
            </div>
            <div class="btn" id="Gv">
                <h1 class="textogrande">Gestionar Ventas</h1>
            </div>
        </div>
    </div>
</body>
<script src="../javascript/inicio.js"></script>
<footer>
    <div class="user">
        <h1 class="username">Usuario: " <?php echo $_SESSION['nombre1']?> "</h1>
        <h1 class="username">Tienda: "Los peregrinos"</h1>
        <h1 class="username">Codigo invitacion: "TX435SX"</h1>
        <a href="cerrarsesion.php" class="btn btn-danger" id="cerrarsesion">cerrar sesion</a>
    </div>
</footer>
</html>