import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_iniciar_sesion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fontsource-variable/montserrat';
import { Outlet, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { faShuttleSpace } from '@fortawesome/free-solid-svg-icons';

function exitbutton() {
    window.location.href = "index.html";
}

function iniciarsesion() {
    window.location.href = "inicio.php";
}

const IniciarSesion = () => {
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
                <div className={styles.contenedorarriba}>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>ADAX Store Manager</h1>
                    </div>
                    <Link className={styles.exit} to="/index">
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </Link>
                </div>
            </header>

            <div className={styles['container-main']}>
                {isEmpleado ? (
                    <form
                        id="cont1"
                        className={styles.Contenedorsesion}
                        action="../Crud/login/procesologin.php?tipo=empleado"
                        method="POST"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className={styles.cuadradoverde}>
                            <h1 className={styles["titulo-iniciar-sesion"]}><b>Iniciar Sesión</b></h1>
                            <div className={styles['toggle-buttons']}>
                                <button type="button" className={styles['btn1-active']} onClick={cambiarestadoBtn1}>Empleado</button>
                                <button type="button" className={styles.btn2} onClick={cambiarestadoBtn2}>Tienda</button>
                            </div>
                            <h1 className={styles['username-text']}><b>Correo electrónico</b></h1>
                            <input className={styles.input} id="email" name="email" type="email" placeholder="Ingrese su correo electrónico..." required />
                            <h1 className={styles.contrasena}><b>Contraseña</b></h1>
                            <input className={styles.input} id="contrasena" name="contrasena" type="password" placeholder="Ingrese su Contraseña..." required />
                            <p>¿Eres usuario nuevo? Regístrate
                                <Link to="/registro">
                                    Aqui
                                </Link>
                            
                            <br></br>
                            ¿Olvidaste tu contraseña? Entra <Link to="/RestablecerContrasena" className={styles.restablecerContra}>aquí</Link></p>
                            <button className="btn btn-danger" type="submit" id={styles.button2}>Iniciar Sesión</button>
                        </div>
                    </form>
                ) : (
                    <form
                        id="cont2"
                        className={styles.Contenedorsesion}
                        action="../Crud/login/procesologin.php?tipo=tienda"
                        method="POST"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className={styles.cuadradoverde}>
                            <h1 className={styles['titulo-iniciar-sesion']}><b>Iniciar Sesión</b></h1>
                            <div className={styles['toggle-buttons']}>
                                <button type="button" className={styles.btn1} onClick={cambiarestadoBtn1}>Empleado</button>
                                <button type="button" className={styles['btn2-active']} onClick={cambiarestadoBtn2}>Tienda</button>
                            </div>
                            <h1 className={styles['username-text']}><b>Correo electrónico</b></h1>
                            <input className={styles.input} id="email" name="email" type="email" placeholder="Ingrese su correo electrónico..." required />
                            <h1 className={styles.contrasena}><b>Contraseña</b></h1>
                            <input className={styles.input} id="contrasena" name="contrasena" type="password" placeholder="Ingrese su Contraseña..." required />
                            <p>¿Eres usuario nuevo? Regístrate <a className={styles.aIniciarSesion} href="registro.php">aquí</a><br /> ¿Olvidaste tu contraseña? Entra <a href="olvideContraseña.html">aquí</a></p>
                            <button className="btn btn-danger" type="submit" id={styles.button2}>
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
