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
<title>ADAX - Gestionar ventas</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://kit.fontawesome.com/436bc767b0.js" crossorigin="anonymous"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,500&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<link rel="stylesheet" href="../styles/styles_gestionar_ventas.css">
</head>
<header>
  <div class="contenedorarriba">
      <button class="back" onclick="backbutton()">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    <div class="adax">
      <h1 class="title">Gestionar ventas</h1>
    </div>
      <button class="exit" onclick="exitbutton()">
        <i class="fa-solid fa-xmark"></i>
      </button>
  </div>
</header>
<body>
    <div class="container">
        <h1 class="text-left">Factura</h1>
        <input type="text" class="form-control" placeholder="Escriba un numero de venta o de producto">
        <button class="btn btn-danger" id="buscar">Buscar</button>
    </div>
    <div class="cuadradoverde">
      <table id="productos" class="facturas-table">
            <thead class="table-head">
              <tr>
                <th>ID Venta</th>
                <th>ID producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <?php
              require '../Crud/Dao/facturaDao.php';
              require '../Crud/Dto/facturaDto.php';
              $fDao = new facturaDao();
              $allUsers = $fDao->listarFacturas($_SESSION["codigo_invitacion"]);
              foreach ($allUsers as $user) { ?>
                <tr>
                  <td><?php echo $user['venta_id_Venta']; ?></td>
                  <td><?php echo $user['producto_id_Producto']; ?></td>
                  <td><?php echo $user['Cantidad']; ?></td>
                  <td><?php echo $user['Precio']; ?></td>
                  <td><?php echo $user['Estado']; ?></td>
                  <td><form action="detalle_factura.php" method="POST"><input type="hidden" name="venta_ID" value="<?php echo $user['venta_id_Venta']; ?>"><button type="submit" class="btn btn-danger" id="detalle">Ver detalle</button></form></td>
                </tr>
              <?php } ?>
            </tbody>
        </table>
    </div>
    <script src="../javascript/gestionarventas.js"></script>
</body>
<footer>
<div class="user">
        <h1 class="username">Usuario: "<?php echo $_SESSION['nombre1']?>"</h1>
        <h1 class="username">Tienda: "<?php echo $_SESSION['nombreTienda']?>"</h1>
        <?php
        if (isset($rol_id_Rol)){
        ?>
        <h1 class="username">Codigo invitacion: "<?php echo "?"?>"</h1>
        <?php
        } else {
        ?>
        <h1 class="username">Codigo invitacion: "<?php echo $_SESSION['codigo_invitacion']?>"</h1>
        <?php
        }
        ?>
        <?php
        if (isset($rol_id_Rol)){
            if ($rol_id_Rol === 1){
        
        ?>
        <a href="../Crud/tablas/tablas.php" class="btn btn-danger" id="cerrarsesion">CRUD</a>
        <?php
        }
        }
        ?>
        <a href="cerrarsesion.php" class="btn btn-danger" id="cerrarsesion">cerrar sesion</a>
    </div>
</footer>
</html>