<?php
// Conexión a la base de datos
$conn = new PDO("mysql:host=localhost;dbname=adaxstore", "root", "");
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Obtener el valor de búsqueda del formulario
$busqueda = $_POST['busqueda'];

// Consulta SQL para buscar proveedores por nombre
$sql = "SELECT p.idproveedor, p.nombre AS nombre_proveedor, p.telefono, p.email, pr.nombre AS nombre_producto
        FROM proveedor p
        INNER JOIN producto pr ON p.idproveedor = pr.idproveedor
        WHERE p.nombre LIKE :busqueda OR pr.nombre LIKE :busqueda";

// Preparar la consulta
$stmt = $conn->prepare($sql);

// Bindar el valor de búsqueda al marcador de posición
$stmt->bindValue(':busqueda', '%' . $busqueda . '%', PDO::PARAM_STR);

// Ejecutar la consulta
$stmt->execute();

// Mostrar los resultados en una tabla
echo "<table>";
echo "<tr><th>Nombre Proveedor</th><th>Teléfono</th><th>Email</th><th>Nombre Producto</th></tr>";
foreach ($stmt->fetchAll() as $row) {
    echo "<tr>";
    echo "<td>" . $row['nombre_proveedor'] . "</td>";
    echo "<td>" . $row['telefono'] . "</td>";
    echo "<td>" . $row['email'] . "</td>";
    echo "<td>" . $row['nombre_producto'] . "</td>";
    echo "</tr>";
}
echo "</table>";

// Cerrar la conexión a la base de datos
$conn = null;
?>





<!DOCTYPE html>
<html lang="en">
<head>
<title>ADAX - Proveedores</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://kit.fontawesome.com/436bc767b0.js" crossorigin="anonymous"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,500&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<link rel="stylesheet" href="../styles/styles_proveedores.css">

</head>
<header>
  <div class="contenedorarriba">
      <button class="back" onclick="backbutton()">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    <div class="adax">
      <h1 class="title">Proveedores</h1>
    </div>
      <button class="exit" onclick="exitbutton()">
        <i class="fa-solid fa-xmark"></i>
      </button>
  </div>
</header>
<body>
  
    <div class="container">
        <h1 class="text-left">Proveedores</h1>
        <form action="buscar_proveedor.php" method="post">
        <input type="text" class="form-control" name="busqueda" placeholder="Escriba el nombre del proveedor o un producto">
        <button class="btn btn-danger" id="buscar">Buscar</button>
        </form>



        
    </div>
    <div class="cuadradoverde">

    <table class="table table-warning ">
     <thead>
       <tr>
       <th style="font-weight:normal" data-dt-column="1" rowspan="1" colspan="1" class="dt-orderable-asc dt-orderable-desc" aria-label="Nombre: Activate to sort" tabindex="0">
         <span class="dt-column-title" role="button">Nombre</span><span class="dt-column-order"></span>

     </th><th style="font-weight :normal" data-dt-column="2" rowspan="1" colspan="1" class="dt-orderable-asc dt-orderable-desc" aria-label="Precio_unit: Activate to sort" tabindex="0">
         <span class="dt-column-title" role="button">Precio_unit</span><span class="dt-column-order"></span>

     </th><th style="font-weight :normal" data-dt-column="3" rowspan="1" colspan="1" class="dt-orderable-asc dt-orderable-desc" aria-label="Descripción: Activate to sort" tabindex="0">
         <span class="dt-column-title" role="button">Descripción</span><span class="dt-column-order"></span>

     </th><th style="font-weight :normal" data-dt-column="4" rowspan="1" colspan="1" class="dt-orderable-asc dt-orderable-desc" aria-label="Marca: Activate to sort" tabindex="0">
         <span class="dt-column-title" role="button">Marca</span><span class="dt-column-order"></span>

     </th><th style="font-weight :normal" data-dt-column="5" rowspan="1" colspan="1" class="dt-orderable-asc dt-orderable-desc" aria-label="Categoria: Activate to sort" tabindex="0">
             <span class="dt-column-title" role="button">Categoria</span><span class="dt-column-order"></span>
       </th></tr>
     </thead>
     <tbody>  
 </tbody>
</table>
    

        
    </div>
    <script src="../javascript/proveedores.js"></script>
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