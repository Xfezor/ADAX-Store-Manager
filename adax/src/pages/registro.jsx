import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource-variable/montserrat';
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import styles from '../styles/styles_registro.module.css'


const Registro = () => {

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
    return false;
  }
    return (
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </button>
                    <div className={styles.adax}>
                        <h1 className="title">ADAX Store Manager</h1>
                    </div>
                    <button className="exit" onclick="exitbutton()">
                      <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </button>
                </div>
            </header>
            <div className={styles.conteiner1} id="cont1">
                <h1 className={styles.Registrarse}>Registrarse</h1>
                <div className="toggle-buttons">
                    <button className="btn1-active" id="empleadoBtn" onclick="cambiarestadoBtn1(this)">Empleado</button>
                    <button className="btn2" id="tiendaBtn" onClick="cambiarestadoBtn2(this)">Tienda</button>
                </div>
                <form id="tienda" onsubmit="return validarformulario()" action="../Crud/controlador/controlador.usuarios.php" method="POST">
                    <h3 className="documento-txt">Documento *</h3>
                    <input name="documento" className="documento" type="number" placeholder="* Número de documento" id="documento" />
                    <select name="tipodoc" className="documento-type" type="number" id="tp">
                        <option default value="CC">Cedula de cuidadania</option>
                        <option value="TI">Tarjeta de identidad</option>
                        <option value="CE">Cedula de extranjeria</option>
                        <option value="RC">Registro civil</option>
                    </select>
                    <h3 className="nombre-txt">Nombre *</h3>
                    <input name="nombre1" className="nombre" type="text" placeholder="* Nombre completo" id="nomcom" />
                    <input name="nombre2" className="nombre2" type="text" placeholder="Segundo nombre (opcional)" id="segnom" />
                    <h3 className="apellido-txt">Apellido *</h3>
                    <input name="apellido1" className="apellido" type="apellido" placeholder="* Apellido" id="ape1" />
                    <input name="apellido2" className="apellido2" type="apellido" placeholder="Segundo apellido (opcional)" id="ape2" />
                    <h3 className="email-txt">Correo Electronico *</h3>
                    <input name="correo" className="email" type="text" placeholder="* Correo electronico (example@example.com)" id="correo" />

                    <h3 className="password-txt">Contraseña *</h3>
                    <input name="contrasena" id="pass1" className="password" type="password" placeholder="* Ingrese su contraseña" />
                    <input id="pass2" className="password2" type="password" placeholder="* Repita su contraseña" />
                    <h3 className="codigo-txt">Codigo de Invitación *</h3>
                    <input name="codigoinv" className="codigo" type="text" placeholder="* Ingrese el codigo de invitación" id="codinv" />
                    <p className="iniciar-sesion">¿Ya eres usuario? Ingresa <a href="iniciar_sesion.php">Aqui</a></p>
                    <button name="registro" value="registro" className="btn btn-danger" type="submit" id="boton_regis">Registrarse</button>
                </form>
            </div>
            <div className="conteiner2" id="cont2" style={{display : 'none'}}>
                <h1 className="Registrarse">Registrarse</h1>
                <div className="toggle-buttons">
                    <button className="btn1" id="empleadoBtn" onclick="cambiarestadoBtn11(this)">Empleado</button>
                    <button className="btn2-active" id="tiendaBtn" onclick="cambiarestadoBtn22(this)">Tienda</button>
                </div>
                <form id="tienda" onsubmit="return validarContraseñas()" action="../Crud/controlador/controlador.tienda.php" method="POST">
                    <h3 className="nombretienda-txt">Nombre Tienda *</h3>
                    <input name="nombreTienda" className="nombretienda" type="text" placeholder="* Nombre completo de la tienda" />

                    <h3 className="telefono-txt">Telefono</h3>
                    <input name="telefono" className="telefono" type="text" placeholder="Telefono (opcional)" />

                    <h3 className="emailtienda-txt">Correo Electronico *</h3>
                    <input name="correo" className="emailtienda" type="text" placeholder="* Correo electronico (example@example.com)" />

                    <h3 className="passwordtienda-txt">Contraseña *</h3>
                    <input name="contrasena" className="passwordtienda" type="password" placeholder="* Ingrese su contraseña" />
                    <input className="passwordtienda2" type="password" placeholder="* Repita su contraseña" />

                    <h3 className="direccion-txt">Dirección tienda</h3>
                    <input name="direccion" className="direccion" type="text" placeholder="Dirección de la tienda (opcional)" />

                    <p className="iniciar-sesion">¿Ya eres usuario? Ingresa <a href="iniciar_sesion.php">Aqui</a></p>
                    <button name="registroTienda" value="registroTienda" className="btn btn-danger" id="boton_regis">Registrarse</button>
                </form>

            </div>
        </>
    )
};
export default Registro;