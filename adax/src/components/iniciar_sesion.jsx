import React, { useState, useContext, useEffect } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_iniciar_sesion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '@fontsource-variable/montserrat';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';
import axiosInstance from '../utils/axios';
import { jwtDecode } from "jwt-decode";
import { ip, port, protocol } from '../utils/ipconfig.js';


const IniciarSesion = () => {
    const { iniciarSesion } = useContext(ContextoSesion);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
    const Error = async () => {
        Swal.fire({
            title: "Error",
            html: "Se produjo un error, por favor intente mas tarde",
            icon: "error",
            confirmButtonText: "Ok",
        });
    };
    const Incorrect = async () => {
        Swal.fire({
            title: "Credenciales incorrectas",
            html: "Usuario o contraseña incorrectos",
            icon: "warning",
            confirmButtonText: "Ok",
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');


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
            if (contrasena === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña vacia',
                    text: 'Por favor ingrese una contraseña'
                });
                return;
            } else {
                const params = new URLSearchParams({
                    tipo: isEmpleado ? 'empleado' : 'tienda', // Determina el tipo según el estado
                });
                try {
                    const respuesta = await axios.get(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/login/procesologin.php?${params.toString()}&email=${email}&contrasena=${contrasena}`);
                    if (respuesta.data.success) {
                        const token = respuesta.data.token;
                        localStorage.setItem('token', token);

                        // Para obtener los datos del usuario
                        const userData = jwtDecode(token);
                        const usuarioData = email;
                        const documento = userData.data.documento;
                        const tienda = userData.data.nombreTienda;
                        const id_tienda = userData.data.id_Tienda;
                        const rol = userData.data.rol;
                        const codigo_invitacion = userData.data.codigo_invitacion;

                        // Guardar el datos en el localStorage 
                        localStorage.setItem('id_Tienda', JSON.stringify(id_tienda));
                        localStorage.setItem('documento', JSON.stringify(documento));

                        iniciarSesion(usuarioData, tienda, codigo_invitacion, rol);
                        navigate('/inicio');
                    } else {
                        setError('Credenciales Incorrectas', respuesta.data.success);
                        Incorrect();
                    }
                } catch (err) {
                    setError('Error al iniciar sesión');
                    Error();
                }
            }
        }

    };
    // eslint-disable-next-line
    useEffect(() => {
        const validadorSesion = () => {
            if (localStorage.getItem('usuario')) {
                navigate("/inicio");
            };
        }
        validadorSesion();
    }, [navigate])

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
                <img src="/img/logo.webp" className={styles.logo}></img>
            </header>

            <div className={styles['container-main']}>
                {isEmpleado ? (
                    <form
                        id="cont1"
                        className={styles.Contenedorsesion}
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
                            <input className={styles.input} id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su correo electrónico..." required />
                            <h1 className={styles.contrasena}><b>Contraseña</b></h1>
                            <input className={styles.input} id="contrasena" name="contrasena" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese su Contraseña..." required />
                            <p>¿Eres usuario nuevo? Regístrate&nbsp;
                                <Link to="/registro" className={styles.aIniciarSesion} >
                                    Aqui
                                </Link>
                            </p>
                            <p className={styles.restablecerContra}>
                                ¿Olvidaste tu contraseña?&nbsp;
                                <Link to="/restablecer_contrasena" className={styles.aIniciarSesion}> Aquí </Link>
                            </p>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                            <input id="email" className={styles.input} name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su correo electrónico..." required />
                            <h1 className={styles.contrasena}><b>Contraseña</b></h1>
                            <input id="contrasena" className={styles.input} name="contrasena" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese su Contraseña..." required />
                            <p>¿Eres usuario nuevo? Regístrate&nbsp;
                                <Link to="/registro" className={styles.aIniciarSesion} >
                                    Aqui
                                </Link>
                            </p>
                            <p className={styles.restablecerContra}>
                                ¿Olvidaste tu contraseña?&nbsp;
                                <Link to="/restablecer_contrasena" className={styles.aIniciarSesion}> Aquí </Link>
                            </p>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button className="btn btn-danger" type="submit" id={styles.button2}>Iniciar Sesión</button>

                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default IniciarSesion;
