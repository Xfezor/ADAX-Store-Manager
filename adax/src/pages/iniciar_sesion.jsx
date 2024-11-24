import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles_iniciar_sesion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fontsource-variable/montserrat';
import { Outlet, Link } from "react-router-dom";
import Swal from "sweetalert2";

function exitbutton() {
    window.location.href = "index.html";
}

function iniciarsesion() {
    window.location.href = "inicio.php";
}
const IniciarSesion = () => {
    const [isEmpleado, setIsEmpleado] = useState(true); // Estado para controlar qué formulario mostrar

    const cambiarestadoBtn1 = () => {
        setIsEmpleado(true);
    };

    const cambiarestadoBtn2 = () => {
        setIsEmpleado(false);
    };

    const validarEmail = (valor) => {
        const regex = /@.*\./;
        return regex.test(valor);
    };

    const handleSubmit = (event) => {
        const email = document.getElementById("email").value;
        const contrasena = document.getElementById("contrasena").value;

        if (!validarEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Correo no válido',
                text: 'Escriba un correo válido'
            });
            event.preventDefault();
        }
        /*  function cambiarestadoBtn1() {
          
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
          */
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
    };

    return (
        <>
            <header>
                <div className="contenedorarriba ">
                    <div className="adax ">
                        <h1 className="title">ADAX Store Manager</h1>
                    </div>
                    <Link className="exit" to="/index">
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </Link>
                </div>
            </header>
            <div className="container-fluid">
                {isEmpleado ? (
                    <form id="cont1" className="Contenedorsesion" action="../Crud/login/procesologin.php?tipo=empleado" method="POST" onSubmit={handleSubmit} noValidate>
                        <div className="cuadradoverde">
                            <h1 className="titulo-iniciar-sesion"><b>Iniciar Sesión</b></h1>
                            <div className="toggle-buttons">
                                <button type="button" className="btn1-active" onClick={cambiarestadoBtn1}>Empleado</button>
                                <button type="button" className="btn2" onClick={cambiarestadoBtn2}>Tienda</button>
                            </div>
                            <h1 className="username-text"><b>Correo electrónico</b></h1>
                            <input id="email" name="email" type="email" placeholder="Ingrese su correo electrónico..." required />
                            <h1 className="contrasena"><b>Contraseña</b></h1>
                            <input id="contrasena" name="contrasena" type="password" placeholder="Ingrese su Contraseña..." required />
                            <p>¿Eres usuario nuevo? Regístrate <a className='aIniciarSesion' href="registro.php">aquí</a><br /> ¿Olvidaste tu contraseña? Entra <a href="olvideContraseña.html">aquí</a></p>
                            <button className="btn btn-danger" type="submit">Iniciar Sesión</button>
                        </div>
                    </form>
                ) : (
                    <form id="cont2" className="Contenedorsesion" action="../Crud/login/procesologin.php?tipo=tienda" method="POST" onSubmit={handleSubmit} noValidate>
                        <div className="cuadradoverde">
                            <h1 className="titulo-iniciar-sesion"><b>Iniciar Sesión</b></h1>
                            <div className="toggle-buttons">
                                <button type="button" className="btn1" onClick={cambiarestadoBtn1}>Empleado</button>
                                <button type="button" className="btn2-active" onClick={cambiarestadoBtn2}>Tienda</button>
                            </div>
                            <h1 className="username-text"><b>Correo electrónico</b></h1>
                            <input id="email" name="email" type="email" placeholder="Ingrese su correo electrónico..." required />
                            <h1 className="contrasena"><b>Contraseña</b></h1>
                            <input id="contrasena" name="contrasena" type="password" placeholder="Ingrese su Contraseña..." required />
                            <p>¿Eres usuario nuevo? Regístrate <a className="aIniciarSesion" href="registro.php">aquí</a><br /> ¿Olvidaste tu contraseña? Entra <a href="olvideContraseña.html">aquí</a></p>
                            <button className="btn btn-danger" type="submit">Iniciar Sesión</button>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

export default IniciarSesion;