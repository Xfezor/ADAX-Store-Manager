import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_iniciar_sesion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '@fontsource-variable/montserrat';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


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
        } else {
            if (contrasena === ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña vacia',
                    text: 'Por favor ingrese una contraseña'
                });
                return; 
            } else {
                window.location.href = "/inicio";
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
                        <FontAwesomeIcon style={{ color: "black" }} icon={faXmark} />
                    </Link>
                </div>
            </header>

            <div className={styles['container-main']}>
                {isEmpleado ? (
                    <form
                        id="cont1"
                        className={styles.Contenedorsesion}
                        /*action="../Crud/login/procesologin.php?tipo=empleado"
                        method="POST"*/
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
                            <input id="email" name="email" type="email" placeholder="Ingrese su correo electrónico..." required />
                            <h1 className={styles.contrasena}><b>Contraseña</b></h1>
                            <input id="contrasena" name="contrasena" type="password" placeholder="Ingrese su Contraseña..." required />
                            <p>¿Eres usuario nuevo? Regístrate&nbsp;
                                <Link to="/registro" className={styles.aIniciarSesion} >
                                    Aqui
                                </Link>
                            </p>
                            <p className={styles.restablecerContra}>
                                ¿Olvidaste tu contraseña?&nbsp;
                                <Link to="/restablecer_contrasena" className={styles.aIniciarSesion}> Aquí </Link>
                            </p>
                            <button className="btn btn-danger" type="submit" id={styles.button2}>Iniciar Sesión</button>
                        </div>
                    </form>
                ) : (
                    <form
                        id="cont2"
                        className={styles.Contenedorsesion}
                        /*action="../Crud/login/procesologin.php?tipo=tienda"
                        method="POST"*/
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
                            <input id="email" name="email" type="email" placeholder="Ingrese su correo electrónico..." required />
                            <h1 className={styles.contrasena}><b>Contraseña</b></h1>
                            <input id="contrasena" name="contrasena" type="password" placeholder="Ingrese su Contraseña..." required />
                            <p>¿Eres usuario nuevo? Regístrate&nbsp;
                                <Link to="/registro" className={styles.aIniciarSesion} >
                                    Aqui
                                </Link>
                            </p>
                            <p className={styles.restablecerContra}>
                                ¿Olvidaste tu contraseña?&nbsp;
                                <Link to="/restablecer_contrasena" className={styles.aIniciarSesion}> Aquí </Link>
                            </p>
                            <button className="btn btn-danger" type="submit" id={styles.button2}>Iniciar Sesión</button>

                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default IniciarSesion;
