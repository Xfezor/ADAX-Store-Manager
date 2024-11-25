import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_iniciar_sesion.css';
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
    const [isEmpleado, setIsEmpleado] = useState(true);
    const [isEmpleado, setIsEmpleado] = useState(true);

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
        event.preventDefault(); 

        const email = document.getElementById("email").value;
        const contrasena = document.getElementById("contrasena").value;

        // Validate the email format
        if (!validarEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Correo no válido',
                text: 'Escriba un correo válido'
            });
            return;
        }

     
        if (email === "juana@labanana.com" && contrasena === "juana") {
           
            window.location.href = "/inicio";
        } else {
           
            let formlogin = document.getElementById("cont1");
            let formlogin2 = document.getElementById("cont2");

            
            if (isEmpleado) {
                formlogin.submit();
            } else {
                formlogin2.submit();
            }
        }
    };

    return (
        <>
            <header>
                <div className="contenedorarriba">
                    <div className="adax">
                        <h1 className="title">ADAX Store Manager</h1>
                    </div>
                    <Link className="exit" to="/index">
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </Link>
                </div>
            </header>

            <div className="container-main"> 
                {isEmpleado ? (
                    <form
                        id="cont1"
                        className="Contenedorsesion"
                        action="../Crud/login/procesologin.php?tipo=empleado"
                        method="POST"
                        onSubmit={handleSubmit}
                        noValidate
                    >
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
                            <p>¿Eres usuario nuevo? Regístrate
                                <Link to="/registro">
                                    Aqui
                                </Link>
                                <Link to="/RestablecerContrasena" className='restablecerContra'> ¿Olvidaste tu contraseña? Entra </Link></p>
                            <button className="btn btn-danger" type="submit">Iniciar Sesión</button>
                        </div>
                    </form>
                ) : (
                    <form
                        id="cont2"
                        className="Contenedorsesion"
                        action="../Crud/login/procesologin.php?tipo=tienda"
                        method="POST"
                        onSubmit={handleSubmit}
                        noValidate
                    >
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
                            <button className="button btn-danger">
                        Iniciar Sesión
                        </button>

                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default IniciarSesion;
