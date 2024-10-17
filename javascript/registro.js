function cambiarestadoBtn1(){

  setTimeout(function() {
    document.querySelector('#cont2').style.display = "block";
    document.querySelector('#cont1').style.display = "none";
  }, 1);

};

function cambiarestadoBtn2(){
  setTimeout(function() {
    document.querySelector('#cont2').style.display = "block";
    document.querySelector('#cont1').style.display = "none";
  }, 1);
};

function cambiarestadoBtn11(){
    setTimeout(function() {
    document.querySelector('#cont1').style.display = "block";
    document.querySelector('#cont2').style.display = "none";
  }, 1);
};

function cambiarestadoBtn22(){

  setTimeout(function() {
    document.querySelector('#cont2').style.display = "block";
    document.querySelector('#cont1').style.display = "none";

  }, 1);
};

function backbutton(){
  window.location.href = "iniciar_sesion.php"
};
function exitbutton(){
  window.location.href = "index.html";
}

function validarContraseñas() {
  var password1 = document.getElementById("pass1").value;
  var password2 = document.getElementById("pass2").value;

  if (password1 !== password2) {
      alert("Las contraseñas no coinciden");
      return false;
  }

  return true;
}