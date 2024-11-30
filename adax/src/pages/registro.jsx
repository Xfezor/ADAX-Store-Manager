import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource-variable/montserrat';
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import styles from '../styles/styles_registro.module.css'


function backbutton() {
  window.location.href = "iniciar_sesion"
};
function exitbutton() {
  window.location.href = "index";
}
function validarContraseñas(event) {
  event.preventDefault();
  var password1 = document.getElementById("pass1").value;
  var password2 = document.getElementById("pass2").value;

  if (password1 !== password2) {
    alert("Las contraseñas no coinciden");
    return false;
  }
  return true;
}
function validarformulario(event) {
  event.preventDefault();
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
      text: "Por favor, complete el campo 'Código de invitación'.",
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
  return false;
}
const Registro = () => {
  const [isEmpleado, setIsEmpleado] = useState(true);

  const cambiarestadoBtn1 = () => {
    setIsEmpleado(true);
  };

  const cambiarestadoBtn2 = () => {
    setIsEmpleado(false);
  };

  return (
    <>
      <header>
        <div className={styles.contenedorarriba}>
          <button className={styles.back} onClick={backbutton}>
            <Link className={styles.back}>
              <FontAwesomeIcon icon={faArrowLeft}style={{color: "black"}}></FontAwesomeIcon>
            </Link>
          </button>
          <div className={styles.adax}>
            <h1 className={styles.title}>ADAX Store Manager</h1>
          </div>
          <button className={styles.exit} onClick={exitbutton}>
            <FontAwesomeIcon icon={faXmark} className={`${styles.exit}`}></FontAwesomeIcon>
          </button>
        </div>
      </header>
      <div className={styles['conteiner-main']}>
        {isEmpleado ? (
          <div
            className={styles.conteiner1}
            id="cont1"
          >
            <h1 className={styles.Registrarse}>Registrarse</h1>
            <div className={styles["toggle-buttons"]}>
              <button className={styles["btn1-active"]} id={styles.empleadoBtn} onClick={cambiarestadoBtn1}> Empleado</button>
              <button className={styles.btn2} id={styles.tiendaBtn} onClick={cambiarestadoBtn2}>Tienda</button>
            </div>
            <form id={styles.tienda} onSubmit={validarContraseñas} /*action="../Crud/controlador/controlador.usuarios.php"*/ method="POST">
              <h3 className={styles["documento-txt"]}>Documento *</h3>
              <input name="documento" className={`${styles.documento} ${styles.input}`} type="number" placeholder="* Número de documento" id="documento" />
              <select name="tipodoc" className={`${styles["documento-type"]} ${styles.input}`} type="number" id="tp">
                <option default value="CC">Cedula de cuidadania</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CE">Cedula de extranjeria</option>
                <option value="RC">Registro civil</option>
              </select>
              <h3 className={styles["nombre-txt"]}>Nombre *</h3>
              <input name="nombre1" className={`${styles.nombre} ${styles.input}`} type="text" placeholder="* Nombre completo" id="nomcom" />
              <input name="nombre2" className={`${styles.nombre2} ${styles.input}`} type="text" placeholder="Segundo nombre (opcional)" id="segnom" />
              <h3 className={styles["apellido-txt"]}>Apellido *</h3>
              <input name="apellido1" className={`${styles.apellido} ${styles.input}`} type="apellido" placeholder="* Apellido" id="ape1" />
              <input name="apellido2" className={`${styles.apellido2} ${styles.input}`} type="apellido" placeholder="Segundo apellido (opcional)" id="ape2" />
              <h3 className={styles["email-txt"]}>Correo Electronico *</h3>
              <input name="correo" className={`${styles.email} ${styles.input} `} type="text" placeholder="* Correo electronico (example@example.com)" id="correo" />

              <h3 className={`${styles["password-txt"]}`}>Contraseña *</h3>
              <input name="contrasena" id="pass1" className={`${styles.password} ${styles.input}`} type="password" placeholder="* Ingrese su contraseña" />
              <input id="pass2" className={`${styles.password2} ${styles.input}`} type="password" placeholder="* Repita su contraseña" />
              <h3 className={styles["codigo-txt"]}>Codigo de Invitación *</h3>
              <input name="codigoinv" className={`${styles.codigo} ${styles.input}`} type="text" placeholder="* Ingrese el codigo de invitación" id="codinv" />
              <p className={styles["iniciar-sesion"]}>¿Ya eres usuario? Ingresa <Link className={styles.textorojo} to="/iniciar_sesion">Aqui</Link></p>
              <Link to="/iniciar_sesion"><button name="registro" value="registro" className={styles["btn btn-danger"]} type="" id={styles["boton_regis"]}>Registrarse</button></Link>
            </form>
          </div>
        ) : (
          <div className={styles.conteiner2} id="cont2">
            <h1 className={styles.Registrarse}>Registrarse</h1>
            <div className={styles["toggle-buttons"]}>
              <button className={styles.btn1} id="empleadoBtn" onClick={cambiarestadoBtn1}>Empleado</button>
              <button className={styles["btn2-active"]} id="tiendaBtn" onClick={cambiarestadoBtn2}>Tienda</button>
            </div>
            <form id={styles.tienda} onSubmit="return validarContraseñas()" action="../Crud/controlador/controlador.tienda.php" method="POST">
              <h3 className={styles["nombretienda-txt"]}>Nombre Tienda *</h3>
              <input name="nombreTienda" className={`${styles.nombretienda} ${styles.input}`} type="text" placeholder="* Nombre completo de la tienda" />

              <h3 className={styles["telefono-txt"]}>Telefono</h3>
              <input name="telefono" className={`${styles.telefono} ${styles.input}`} type="text" placeholder="Telefono (opcional)" />

              <h3 className={styles["emailtienda-txt"]}>Correo Electronico *</h3>
              <input name="correo" className={`${styles.emailtienda} ${styles.input}`} type="text" placeholder="* Correo electronico (example@example.com)" />

              <h3 className={styles["passwordtienda-txt"]}>Contraseña *</h3>
              <input name="contrasena" className={`${styles["passwordtienda"]} ${styles.input}} ${styles.input}`} type="password" placeholder="* Ingrese su contraseña" />
              <input className={`${styles["passwordtienda2"]} ${styles.input}`} type="password" placeholder="* Repita su contraseña" />

              <h3 className={styles["direccion-txt"]}>Dirección tienda</h3>
              <input name="direccion" className={`${styles.direccion} ${styles.input}`} type="text" placeholder="Dirección de la tienda (opcional)" />

              <p className={styles["iniciar-sesion"]}>¿Ya eres usuario? Ingresa <Link className={styles.textorojo} to="/iniciar_sesion">Aqui</Link></p>
              <button name="registroTienda" value="registroTienda" className={styles["btn btn-danger"]} id={styles["boton_regis"]}>Registrarse</button>
            </form>

          </div>
        )}

      </div>
    </>
  )
};
export default Registro;