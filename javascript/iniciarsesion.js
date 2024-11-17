function exitbutton() {
  window.location.href = "index.html";
}

function iniciarsesion() {
  window.location.href = "inicio.php";
}

function cambiarestadoBtn1() {

  setTimeout(function () {
    document.querySelector('#cont2').style.display = "flex";
    document.querySelector('#cont1').style.display = "none";
  }, 1);

};

function cambiarestadoBtn2() {
  setTimeout(function () {
    document.querySelector('#cont2').style.display = "flex";
    document.querySelector('#cont1').style.display = "none";
  }, 1);
};

function cambiarestadoBtn11() {
  setTimeout(function () {
    document.querySelector('#cont1').style.display = "flex";
    document.querySelector('#cont2').style.display = "none";
  }, 1);
};
function cambiarestadoBtn22() {

  setTimeout(function () {
    document.querySelector('#cont2').style.display = "felx";
    document.querySelector('#cont1').style.display = "none";

  }, 1);
};
function validarCont(valor) {
  // Expresión regular que verifica las condiciones
  const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  return regex.test(valor);
}
function validarEmail(valor) {
  // Expresión regular que verifica las condiciones
  const regex = /@.*\./;
  return regex.test(valor);
}

let formlogin = document.getElementById("cont1");
let formlogin2 = document.getElementById("cont2");
formlogin.addEventListener("submit", function (event) {
  let email = document.getElementById("email").value;
  let contrasena = document.getElementById("contrasena").value;
  if (!validarEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Correo no valido',
      text: 'Escriba un correo valido'
    });
  event.preventDefault();

  } 
  
  else {

  }
})
formlogin2.addEventListener("submit", function (event) {
  let email = document.getElementById("email").value;
  let contrasena = document.getElementById("contrasena").value;
  if (!validarEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Correo no valido',
      text: 'Escriba un correo valido'
    });
  event.preventDefault();

  }
  else {

  }
})
