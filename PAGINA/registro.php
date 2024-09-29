<!DOCTYPE html>
<html lang="en">

<head>
  <title>ADAX - Registrarse</title>
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
  <link rel="stylesheet" href="../styles/styles_registro.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
  <?php
  if (isset($_GET["registro"])){
    echo "<script>
    Swal.fire({
    title: 'Registro exitoso',
    text: 'El registro fue exitoso, puede iniciar sesión ahora',
    icon: 'success',
    confirmButtonText: 'Iniciar sesión'
    }).then((result) => {
    if (result.isConfirmed) {
    window.location.href = 'iniciar_sesion.php';
    }
    });</script>";
  }
  if (isset($_GET['error'])){
    if ($_GET["error"] == 3){
      echo "<script>
      Swal.fire({
      title: 'ERROR',
      text: 'El codigo de invitacion es invalido, ingrese uno valido proporcionado por el administrador de la tienda',
      icon: 'error'
      });</script>";
    }
    if ($_GET["error"] == 4){
      echo "<script>
      Swal.fire({
      title: 'ERROR',
      text: 'No fue posible ingresar los datos, por favor, intente de nuevo.',
      icon: 'error'
      });</script>";
    }
  }

  ?>
  <div class="conteiner1" id="cont1">
    <h1 class="Registrarse">Registrarse</h1>
    <div class="toggle-buttons">
      <button class="btn1-active" id="empleadoBtn" onclick="cambiarestadoBtn1(this)">Empleado</button>
      <button class="btn2" id="tiendaBtn" onclick="cambiarestadoBtn2(this)">Tienda</button>
    </div>
    <form id="tienda" onsubmit="return validarContraseñas()" action="../Crud/controlador/controlador.usuarios.php" method="POST">
      <h3 class="documento-txt">Documento *</h3>
      <input name="documento" class="documento" type="number" placeholder="* Número de documento">
      <select name="tipodoc" class="documento-type" type="number">
        <option default value="CC">Cedula de cuidadania</option>
        <option value="TI">Tarjeta de identidad</option>
        <option value="CE">Cedula de extranjeria</option>
        <option value="RC">Registro civil</option>
      </select>

      <h3 class="nombre-txt">Nombre *</h3>
      <input name="nombre1" class="nombre" type="text" placeholder="* Nombre completo">
      <input name="nombre2" class="nombre2" type="text" placeholder="Segundo nombre (opcional)">

      <h3 class="apellido-txt">Apellido *</h3>
      <input name="apellido1" class="apellido" type="apellido" placeholder="* Apellido">
      <input name="apellido2" class="apellido2" type="apellido" placeholder="Segundo apellido (opcional)">

      <h3 class="email-txt">Correo Electronico *</h3>
      <input name="correo" class="email" type="text" placeholder="* Correo electronico (example@example.com)">

      <h3 class="password-txt">Contraseña *</h3>
      <input name="contrasena" id="pass1" class="password" type="password" placeholder="* Ingrese su contraseña">
      <input id="pass2" class="password2" type="password" placeholder="* Repita su contraseña">

      <h3 class="codigo-txt">Codigo de Invitación *</h3>
      <input name="codigoinv" class="codigo" type="text" placeholder="* Ingrese el codigo de invitación">

      <p class="iniciar-sesion">¿Ya eres usuario? Ingresa <a href="iniciar_sesion.php">Aqui</a></p>
      <button name="registro" value="registro" class="btn btn-danger" type="submit" id="boton_regis">Registrarse</button>
    </form>
  </div>

  <div class="conteiner2" id="cont2" style="display: none;">
    <h1 class="Registrarse">Registrarse</h1>
    <div class="toggle-buttons">
      <button class="btn1" id="empleadoBtn" onclick="cambiarestadoBtn11(this)">Empleado</button>
      <button class="btn2-active" id="tiendaBtn" onclick="cambiarestadoBtn22(this)">Tienda</button>
    </div>
    <form id="tienda" onsubmit="return validarContraseñas()" action="../Crud/controlador/controlador.tienda.php" method="POST">
      <h3 class="nombretienda-txt">Nombre Tienda *</h3>
      <input name="nombreTienda" class="nombretienda" type="text" placeholder="* Nombre completo de la tienda">

      <h3 class="telefono-txt">Telefono</h3>
      <input name="telefono" class="telefono" type="text" placeholder="Telefono (opcional)">


      <h3 class="emailtienda-txt">Correo Electronico *</h3>
      <input name="correo" class="emailtienda" type="text" placeholder="* Correo electronico (example@example.com)">

      <h3 class="passwordtienda-txt">Contraseña *</h3>
      <input name="contrasena" class="passwordtienda" type="password" placeholder="* Ingrese su contraseña">
      <input class="passwordtienda2" type="password" placeholder="* Repita su contraseña">

      <h3 class="direccion-txt">Dirección tienda</h3>
      <input name="direccion" class="direccion" type="text" placeholder="Dirección de la tienda (opcional)">

      <p class="iniciar-sesion">¿Ya eres usuario? Ingresa <a href="iniciar_sesion.php">Aqui</a></p>
      <button name="registroTienda" value="registroTienda" class="btn btn-danger" id="boton_regis">Registrarse</button>
    </form>
  </div>
  <script src="../javascript/registro.js"></script>
</body>
</html>