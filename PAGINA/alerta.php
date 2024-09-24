<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" >
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <title>Perfil</title>   
</head>
<body>
<div class="alert alert-danger position-absolute d-inline-flex p-2" role="alert" style="margin-top:-45px;">
    <p>La sesion expira en:&nbsp</p><div id="numero" class="text-danger"></div>
</div>

<script type="text/javascript">
    n = 10
    var l =document.getElementById("numero");
    var id=window.setInterval(function(){
       document.onmousemove =function(){
        n= 1500
       };

       l.innerText= n;
       n--;

       if(n<= -1){
        alert("La sesion expiro");
        location.href="cerrarsesion.php";
    }
    }, 1200);

    

    </script>




<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">

</script>  
</body>
</html>