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
  <title>ADAX - Gestionar productos</title>
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
  <link rel="stylesheet" href="../styles/styles_gestionar_productos.css">
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
  crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/2.1.7/js/dataTables.js"></script>
<script src="../javascript/gestionarproductos.js"></script>
  <script src="../javascript/gestionarproductos.js"></script>
</head>
<header>
  <div class="contenedorarriba">
    <button class="back" onclick="backbutton()">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
    <div class="adax">
      <h1 class="title">Gestionar productos</h1>
    </div>
    <button class="exit" onclick="exitbutton()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</header>

<body>
  <div class="page">
    <div class="left-container">
      <h1 class="big-text">Producto</h1>
      <input class="search" type="text" name="search" id="search"
        placeholder="Escriba un el nombre de un producto"></input>
      <button class="btn btn-danger" id="search-button">Buscar</button>
      <div class="product-list">
        <table id="productos" class="product-table">
          <thead class="table-head">
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>detalle</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <?php
            require '../Crud/Dao/productoDao.php';
            require '../Crud/Dto/productoDto.php';
            $pDao = new productoDao();
            $allUsers = $pDao->listarProductos($_SESSION["codigo_invitacion"]);
            foreach ($allUsers as $user) { ?>
              <tr>
                <td><?php echo $user['Nombre']; ?></td>
                <td><?php echo $user['Marca']; ?></td>
                <td><button class="btn btn-danger" id="detalle" onclick="verdetalle()">Ver detalle</button></td>

              </tr>
            <?php } ?>
          </tbody>
        </table>
      </div>
    </div>
    <div class="right-container">
      <h1 class="big-text">Añadir producto</h1>
      <div class="add-product">
        <h2 class="text-inside"></h2>
        <input class="product-name" type="text" name="addProduct" id="addproduct"
          placeholder="Escriba el nombre del producto"></input>
        <input class="product-price" type="text" name="productPrice" id="productPrice"
          placeholder="Escriba el precio sin puntos ni comas"></input>
        <h3 class="text-left">Cantidad: </h3>
        <input type="number" class="numero" placeholder="Número">
        <button class="añadir-producto" onclick="añadirproducto()">Añadir producto</button>
      </div>
      <div class="proveedores">
        <h1 class="big-text-proveedores">Proveedores</h1>
        <button class="gestionar-proveedores" onclick="gestionarproveedores()">Gestionar proveedores</button>
      </div>

    </div>
  </div>

</body>
<script>
  var table = new DataTable('#productos',{
    lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All']
    ],
    language: {
      lengthMenu: "Mostrar _MENU_ Productos",
      info: "Mostrando de _START_ a _END_ Productos de _TOTAL_",
      paging: true
    },
    dom: '<"top"l>rt<"bottom"ip>'
  });

  $('#search').on('keyup', function() {
    table.search(this.value).draw();
  });

  $('#search-button').on('click', function() {
    table.search($('#search').val()).draw();
  });
</script>
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