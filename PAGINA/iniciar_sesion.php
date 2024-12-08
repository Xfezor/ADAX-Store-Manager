<?php
session_start();
if (isset($_SESSION['nombre1'])) {
  header('Location:inicio.php');
}
// Deshabilitar el caché
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>ADAX - Inicio de sesión</title>
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
  <link rel="stylesheet" href="../styles/styles_iniciar_sesion.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<header>
  <div class="contenedorarriba ">
    <div class="adax ">
      <h1 class="title">ADAX Store Manager</h1>
    </div>
    <button class="exit" onclick="exitbutton()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</header>

<body class="container-fluid">
  <?php
  if (isset($_GET["error"])){
    if ($_GET["error"] == 1) {
      echo "<script>
      Swal.fire({
      title: 'ERROR',
      text: 'Los datos ingresados no son validos o no existen',
      icon: 'error'
      });</script>";
    } elseif ($_GET["error"] == 2) {
      echo "<script>
      Swal.fire({
      title: 'ERROR',
      text: 'Ha ocurrido un error, vuelva a iniciar sesion',
      icon: 'error'
      });</script>";
    }
  }
  ?>
  <form id="cont1" class="Contenedorsesion" action="../Crud/login/procesologin.php?tipo=empleado" method="POST" novalidate>
    <div class="cuadradoverde">
      <h1 class="titulo-iniciar-sesion"><b>Iniciar Sesión</b></h1>
      <div class="toggle-buttons">
        <button class="btn1-active" id="empleadoBtn" onclick="cambiarestadoBtn1(this)">Empleado</button>
        <button class="btn2" id="tiendaBtn" onclick="cambiarestadoBtn2(this)">Tienda</button>
      </div>
      <h1 class="username-text"><b>Correo electronico</b></h1>
      <input id="email" name="email" type="email" placeholder="Ingrese su correo electronico..." >
      <h1 class="contrasena"><b>Contraseña</b></h1>
      <input id="contrasena" name="contrasena" type="password" placeholder="Ingrese su Contraseña...">
      <p>¿Eres Usuario nuevo? Registrate <a href="registro.php">Aquí</a><br> ¿Olvidaste tu contraseña? Entra <a
          href="olvideContraseña.html">Aqui</a></p>
      <button class="btn btn-danger" id="button21" type="submit">Iniciar Sesion</button>
    </div>
  </form>
  <form id="cont2" class="Contenedorsesion" action="../Crud/login/procesologin.php?tipo=tienda" method="POST" style="display: none;">
    <div class="cuadradoverde">
      <h1 class="titulo-iniciar-sesion"><b>Iniciar Sesión</b></h1>
      <div class="toggle-buttons">
        <button class="btn1" id="empleadoBtn" onclick="cambiarestadoBtn11(this)">Empleado</button>
        <button class="btn2-active" id="tiendaBtn" onclick="cambiarestadoBtn22(this)">Tienda</button>
      </div>
      <h1 class="username-text"><b>Correo electronico</b></h1>
      <input id="email2" name="email" type="email" placeholder="Ingrese su correo electronico...">
      <div class="invalid-feedback">Por favor, ingrese su correo electronico</div>
      <h1 class="contrasena"><b>Contraseña</b></h1>
      <input id="contrasena2" name="contrasena" type="password" placeholder="Ingrese su Contraseña...">
      <div class="invalid-feedback">Por favor, ingrese su contraseña</div>
      <p>¿Eres Usuario nuevo? Registrate <a href="registro.php">Aquí</a><br> ¿Olvidaste tu contraseña? Entra <a
          href="olvideContraseña.html">Aqui</a></p>
      <button class="btn btn-danger" id="button22" type="submit">Iniciar Sesion</button>
    </div>
  </form>
  <script src="../javascript/iniciarsesion.js"></script>
</body>

</html>