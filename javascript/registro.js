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
function validarformulario() {
  // Obtener valores del formulario
  var documento = document.getElementById("documento").value;
  var nombre1 = document.getElementById("nomcom").value;
  var apellido1 = document.getElementById("ape1").value;
  var correo = document.getElementById("correo").value;
  var password1 = document.getElementById("pass1").value;
  var password2 = document.getElementById("pass2").value;
  var codinv = document.getElementById("codinv").value;

  // Comprobar si los campos obligatorios están llenos
  if (documento == null || documento.length < 10) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete el campo 'Número de documento', o ingrese un número de documento válido con 10 dígitos",
    });
    return false;
  }
  if (!nombre1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete el campo 'Nombre'.",
    });
    return false;
  }
  if (!apellido1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete el campo 'Apellido'.",
    });
    return false;
  }
  if (!correo) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete el campo 'Correo'.",
    });
    return false;
  }
  if (!password1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete el campo 'Contraseña'.",
    });
    return false;
  }
  if (!password2) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete el campo 'Repita su contraseña'.",
    });
    return false;
  }
  if (!codinv) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:"Por favor, complete el campo 'Código de invitación'.",
    });
    return false;
  }

  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, ingrese un correo electrónico válido.",
    });
    return false;
  }

  // Comprobar criterios de contraseña
  const validarCont = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/; // Al menos 8 caracteres, una mayúscula y un número
    return regex.test(password);
  };

  // Comprobar criterios de contraseña (opcional)
  if (!validarCont(password1)) {

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula y un número.",
    });
    return false;
  }

  // Comprobar si las contraseñas coinciden
  if (password1 !== password2) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las contraseñas no coinciden",
    });
    return false;
  }

  // Si todas las validaciones pasan
  return true;
}