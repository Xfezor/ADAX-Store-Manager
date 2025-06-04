import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_olvide_Contrasena.module.css';
import '@fontsource-variable/montserrat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ip, port } from '../utils/ipconfig.js';

function RestablecerContrasena() {
  const navigate = useNavigate();

  // Estados
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [cambioContrasena, setCambioContrasena] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");  
  const [loadingSendCode, setLoadingSendCode] = useState(false);

  // Navegación
  const backbutton = () => navigate(-1);
  const exitbutton = () => navigate('/inicio');

  const enviarCodigo = async () => {
    if (!correo) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un correo electrónico válido.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    setLoadingSendCode(true);
  
    try {
      const response = await axios.post(
        `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php`,
        { action: "enviar_codigo", correo: correo },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ise envían  cookies/sesión
        }
      );
  
      if (response.data.success) {
        Swal.fire({
          title: "Código enviado",
          text: "Se ha enviado un código de verificación a tu correo.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          setCodigoEnviado(true);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "No se pudo enviar el código.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al enviar el código:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar el código. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
     } finally {
    setLoadingSendCode(false);
  }
};
  
  const verificarCodigo = async () => {
    if (!correo || !codigo) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa el código de verificación.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
  
    try {
      const response = await axios.post(
        `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php`,
        {
          action: "verificar_codigo",
          correo: correo,
          codigo: codigo,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
  
      if (response.data.status ) {
        Swal.fire({
          title: "Éxito",
          text: "Código correcto. Puedes cambiar tu contraseña.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          setCambioContrasena(true); // avanzar al cambio de contraseña
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al verificar el código. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  

  const cambiarContrasena = async () => {
    console.log("Enviando datos:", {
      olvido: true,
      reset: true,
      correo: correo.trim(),
      password: nuevaContrasena,
    });
  
    try {
      const respuesta = await axios.post(
        `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php`,
        {
          olvido: true,
          reset: true,
          correo: correo.trim(),
          password: nuevaContrasena,
        },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Respuesta del servidor:", respuesta.data);
      
     if (respuesta.data.success) {
        Swal.fire({
          icon: "success",
          title: "Contraseña cambiada",
          text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/iniciar_sesion");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: respuesta.data.message || "No se pudo cambiar la contraseña.",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cambiar la contraseña.",
        confirmButtonText: "Aceptar",
      });
    }
  };
  
  
  return (
    <>
      <header>
        <div className={styles.contenedorarriba}>
          <button className={styles.back} onClick={backbutton} aria-label="Volver">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className={styles.adax}>
            <h1 className={styles.title}>ADAX Store Manager</h1>
          </div>
          <button className={styles.exit} onClick={exitbutton} aria-label="Salir">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </header>

      <div className={styles.cuadradoverde} style={{ display: 'block' }}>
        <form className={`${styles.Contenedorsesion}`}>
          {/* Bloque 1: Ingresar correo */}
          {!codigoEnviado && !cambioContrasena && (
            <>
              <h1 id="bigtitle1" className={styles["titulo-olvide-mi-contraseña"]}>
              <b>Olvidé mi contraseña</b>
            </h1>

              <h2 className={styles.textoOlvide}>
                <b>Escriba el correo asociado con su cuenta para enviarle un código de confirmmacion para poder cambiar la contraseña.</b>
              </h2>
              <h1 className={styles.usernameText}>
                <b>Correo electrónico</b>
              </h1>
              <input
                type="email"
                placeholder="Ingrese su correo electrónico"
                className={`${styles.input}`}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <button
              type="button"
              id={`${styles.buttonSendCode}`}
              onClick={enviarCodigo}
              disabled={loadingSendCode}
            >
              {loadingSendCode ? "Enviando..." : "Enviar Código"}
            </button>
            </>
          )}

          {/* Bloque 2: Ingresar código recibido */}
          {codigoEnviado && !cambioContrasena && (
            <>
              <h1 className={styles["titulo-olvide-mi-contraseña"]}>
                <b>Olvidé mi contraseña</b>
              </h1>
              <h2 className={styles.textoOlvide}>
                <b>Se ha enviado un código de seguridad al correo ({correo})</b>
              </h2>
              <h1 className={styles.usernameText}>
                <b>Código de seguridad</b>
              </h1>
              <input
                type="text"
                placeholder="Ingrese el código de seguridad"
                className={styles.input}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              <button
                type="button"
                id={`${styles.buttonConfirmCode}`}
                onClick={verificarCodigo}
              >
                confirmar código
              </button>
            </>
          )/* Bloque 3: Cambiar contraseña */}
          {cambioContrasena && (
          <div className={styles.cambiarContrasenaBox}>
           <h1 id="bigtitle2" className={styles["titulo-olvide-mi-contraseña"]}>
            <b>Nueva contraseña</b>
          </h1>


            <h2 className={styles.textoOlvide}>
              Escriba su nueva contraseña
            </h2>
            <h1 id="middletittle3" className={`${styles.usernameText}`}>
            <b>Contraseña</b>
          </h1>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
              id='input3'
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Repita su contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
              className={styles.input}
            />
            <button
              type="button"
              id={`${styles.buttonChangePswd}`}
              onClick={cambiarContrasena}
            >
              Cambiar contraseña
            </button>
          </div>
        )}
        </form>
      </div>
    </>
  );
}

export default RestablecerContrasena;
