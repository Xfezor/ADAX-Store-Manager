import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_olvide_Contrasena.module.css';
import '@fontsource-variable/montserrat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Importa Axios

function RestablecerContrasena() {
    const navigate = useNavigate();
    const [correo , setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [codigoEnviado, setCodigoEnviado] = useState(false);
    const [codigoValido, setCodigoValido] = useState(false);
    
    const backbutton = () => {
        navigate(-1);
    };

    const exitbutton = () => {
        navigate('/inicio');
    };

    // Función para enviar el código al backend
    const sendCode = async () => {
        if (!correo) {
            alert("Por favor, ingrese un correo electrónico.");
            return;
        }

        try {
            // Realiza la petición POST para enviar el código de verificación
            const response = await axios.post("http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuario.php", {
                correo: correo
            });

            if (response.data === "Código enviado") {
                setCodigoEnviado(true);
                alert("Se ha enviado un código de verificación al correo.");
            } else {
                alert("Correo no encontrado.");
            }
        } catch (error) {
            console.error("Error al enviar el código:", error);
            alert("Hubo un error, por favor intente nuevamente.");
        }
    };

    // Función para verificar el código ingresado
    const confirmCode = async () => {
        if (!codigo) {
            alert("Por favor, ingrese un código de verificación.");
            return;
        }

        try {
            const response = await axios.post("http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuario.php", {
                documento: correo, // Asumiendo que estás utilizando el correo como documento
                codigo: codigo
            });

            if (response.data === "Código verificado correctamente.") {
                setCodigoValido(true);
                alert("Código verificado correctamente.");
            } else {
                alert("Código incorrecto o expirado.");
            }
        } catch (error) {
            console.error("Error al verificar el código:", error);
            alert("Hubo un error, por favor intente nuevamente.");
        }
    };

    // Función para cambiar la contraseña
    const cambiarContraseña = async () => {
        if (!password || password !== passwordRepeat) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await axios.post("http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.codigo.php", {
                documento: correo,
                password: password
            });

            if (response.data === "Contraseña cambiada exitosamente.") {
                alert("Contraseña cambiada exitosamente.");
                navigate('/inicio'); // Redirige a la página de inicio después de cambiar la contraseña
            } else {
                alert("Error al cambiar la contraseña.");
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            alert("Hubo un error, por favor intente nuevamente.");
        }
    };

    return (
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>ADAX Store Manager</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </header>
            <div className={styles.cuadradoverde} style={{ display: 'block' }}>
                <form className={styles.Contenedorsesion}>
                    <h1 id="bigtitle1" className={styles.tituloOlvideMiContraseña}><b>Olvidé mi contraseña</b></h1>
                    <h1 id="bigtitle2" className={styles.tituloOlvideMiContraseña} style={{ display: 'none' }}><b>Nueva contraseña</b></h1>
                    <h2 id="text1" className={styles.textoOlvide}><b>Escriba el correo asociado con su cuenta, así le podremos enviar un código de confirmación para poder cambiar la contraseña.</b></h2>
                    <h2 id="text2" className={styles.textoOlvide} style={{ display: 'none' }}><b>Se ha enviado un código de seguridad al correo: {correo}</b></h2>
                    <h2 id="text3" className={styles.textoOlvide} style={{ display: 'none' }}><b>Escriba su nueva contraseña</b></h2>
                    <h1 id="middletittle1" className={styles.usernameText}><b>Correo electrónico</b></h1>
                    <h1 id="middletittle2" className={styles.usernameText} style={{ display: 'none' }}><b>Código de seguridad</b></h1>
                    <h1 id="middletittle3" className={styles.usernameText} style={{ display: 'none' }}><b>Contraseña</b></h1>
                    <input
                        id="input1"
                        type="email"
                        placeholder="Ingrese su correo electrónico"
                        className={styles.input}
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                    <input
                        id="input2"
                        type="text"
                        placeholder="Ingrese el código de seguridad"
                        className={styles.input}
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                        style={{ display: codigoEnviado ? 'block' : 'none' }}
                    />
                    <input
                        id="input3"
                        type="password"
                        placeholder="Ingrese su nueva contraseña"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: codigoValido ? 'block' : 'none' }}
                    />
                    <input
                        id="input4"
                        type="password"
                        placeholder="Repita su nueva contraseña"
                        className={styles.input}
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        required
                        style={{ display: codigoValido ? 'block' : 'none' }}
                    />
                    <button
                        className="btn btn-danger"
                        id="buttonSendCode"
                        type="button"
                        onClick={sendCode}
                        style={{ display: !codigoEnviado ? 'block' : 'none' }}
                    >
                        Enviar código
                    </button>
                    <button
                        className="btn btn-danger"
                        id="buttonConfirmCode"
                        type="button"
                        onClick={confirmCode}
                        style={{ display: codigoEnviado && !codigoValido ? 'block' : 'none' }}
                    >
                        Confirmar código
                    </button>
                    <button
                        className="btn btn-danger"
                        id="buttonChangePswd"
                        type="button"
                        onClick={cambiarContraseña}
                        style={{ display: codigoValido ? 'block' : 'none' }}
                    >
                        Cambiar contraseña
                    </button>
                </form>
            </div>
        </>
    );
}

export default RestablecerContrasena;
