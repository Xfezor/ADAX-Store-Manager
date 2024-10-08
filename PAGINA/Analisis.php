<!DOCTYPE html>
<html lang="en">
<?php
session_start();

if (!isset($_SESSION['nombre1'])){
header('Location:iniciar_sesion.php?error=2');
echo "no esta iniciando la sesion";
}elseif(isset($_SESSION['nombre1'])){
    require '../Crud/Dao/usuariosDao.php';
    require '../Crud/Dto/usuariosDto.php';
    require '../Crud/Dao/tiendaDao.php';
    require '../Crud/Dto/tiendaDto.php';
    require '../Crud/utilidades/conexion.php';
    if (isset($_SESSION["rol_id_Rol"])){
        $rol_id_Rol = $_SESSION["rol_id_Rol"];
    }
    $nombreTienda = $_SESSION["nombreTienda"];
    $codigo_invitacion = $_SESSION["codigo_invitacion"];
}else {
    echo 'ocurrio un error'; 
}
include('../PAGINA/alerta.php');
?>
<head>
  <title>ADAX - Analisis</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://kit.fontawesome.com/436bc767b0.js" crossorigin="anonymous"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,500&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <link rel="stylesheet" href="../styles/styles_analisis.css">
</head>
<header>
  <div class="contenedorarriba">
    <button class="back" onclick="backbutton()">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
    <div class="adax">
      <h1 class="title">Análisis</h1>
    </div>
    <button class="exit" onclick="exitbutton()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</header>

<body>
  <div class="container">
    <div class="txt-arriba">
      <h1 class="d-inline-block">Producto</h1>
      <button class="btn btn-danger d-inline-block" id="movimientos" name="Buscar" onclick="vermovimientos()">Ver movimientos</button>
    </div>
    <div>
      <img src="../img/green.png" class="d-inline-block">
      <h5 class="d-inline-block me-3">Popular</h5>
      <img src="../img/yellow.png" class="d-inline-block">
      <h5 class="d-inline-block me-3">Medio popular</h5>
      <img src="../img/red.png" class="d-inline-block">
      <h5 class="d-inline-block me-3">No popular</h5>
    </div>

    <input type="text" class="form-control" placeholder="Escriba el nombre de un producto">
    <select class="form-control w-auto">
      <option default value="none">Ningun filtro</option>
      <option value="none">Mayor a menor</option>
      <option value="none">Menor a mayor</option>
      <option value="none">Más caro</option>
      <option value="none">Más barato</option>
    </select>
    <button class="btn btn-danger" id="buscar">Buscar</button>
  </div>
  <div class="cuadradoverde">
  </div>
  <script src="../javascript/analisis.js"></script>
</body>
<footer>
  <div class="user">
    <h1 class="username">Usuario: "Pepito Peréz"</h1>
    <h1 class="username">Tienda: "Los peregrinos"</h1>
    <h1 class="username">Codigo invitacion: "TX435SX"</h1>
    <button class="btn btn-danger" id="cerrarsesion">cerrar sesion</button>
  </div>
</footer>

</html>