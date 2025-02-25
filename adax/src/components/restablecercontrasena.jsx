import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_olvide_Contrasena.module.css';
import '@fontsource-variable/montserrat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function RestablecerContrasena() {
  const navigate = useNavigate();

  // Estados
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [cambioContrasena, setCambioContrasena] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  // Navegación
  const backbutton = () => navigate(-1);
  const exitbutton = () => navigate('/inicio');



  // Enviar código al correo
  const EnviarCodigo = async () => {
    if (!correo) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese su correo electrónico.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    try {
      console.log("Enviando solicitud con correo:", correo); // DEBUG
  
      const respuesta = await axios.post(
        'http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php',
        { enviarCodigo: true, correo },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log("Respuesta del servidor:", respuesta.data); // DEBUG
  
      if (respuesta.data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado correctamente',
          text: 'Revisa tu bandeja de entrada.',
          confirmButtonText: 'Aceptar',
        });
        setCodigoEnviado(true);
        console.log("Estado codigoEnviado actualizado:", codigoEnviado); // Verificar si se actualiza
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: respuesta.data.message || 'No se pudo enviar el código.',
          confirmButtonText: 'Aceptar',
        });
        setCodigoEnviado(false);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al intentar enviar el código.',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  
  const verificarCodigo = async () => {
    if (!codigo) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ingrese el código recibido en su correo",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    try {
        console.log("Enviando datos al backend:", { correo, codigo });

        const respuesta = await axios.post(
            "http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php",
            { verificarCodigo: true, correo, codigo }, 
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Respuesta del backend:", respuesta.data);

        if (respuesta.data.status === "success") {
            Swal.fire({
                title: "Código correcto",
                text: "Ahora puedes cambiar tu contraseña.",
                icon: "success",
                confirmButtonText: "Aceptar"
            }).then(() => {
                setCambioContrasena(true);
            });
        } else {
            Swal.fire({
                title: "Error",
                text: respuesta.data.message || "Código incorrecto",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al verificar el código",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
};


const cambiarContrasena = async (correo, nuevaContrasena, confirmarContrasena, setCambioContrasena, setNuevaContrasena, setConfirmarContrasena) => {
  // Verificar que las contraseñas no sean null
  if (!nuevaContrasena || !confirmarContrasena) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Debes ingresar una nueva contraseña.",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  if (nuevaContrasena !== confirmarContrasena) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Las contraseñas no coinciden.",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  if (nuevaContrasena.length < 8) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "La contraseña debe tener al menos 8 caracteres.",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  try {
    const respuesta = await axios.post(
      "http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php",
      {
        actualizar: true,
        correo: correo,
        nuevaContrasena: nuevaContrasena,
      }
    );

    if (respuesta.data.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Contraseña cambiada",
        text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
        confirmButtonText: "Aceptar",
      });

      // Resetear los campos y cerrar el formulario de cambio de contraseña
      setCambioContrasena(false);
      setNuevaContrasena("");
      setConfirmarContrasena("");
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
        <form className={styles.Contenedorsesion}>
          {/* Bloque 1: Ingresar correo */}
          {!codigoEnviado && !cambioContrasena && (
            <>
              <h1 className={styles.tituloOlvideMiContraseña}>
                <b>Olvidé mi contraseña</b>
              </h1>
              <h2 className={styles.textoOlvide}>
                <b>Escriba el correo asociado con su cuenta para enviarle un código de verificación.</b>
              </h2>
              <h1 className={styles.usernameText}>
                <b>Correo electrónico</b>
              </h1>
              <input
                type="email"
                placeholder="Ingrese su correo electrónico"
                className={styles.input}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <button type="button" onClick={EnviarCodigo} className="btn btn-danger">
                Enviar Código
              </button>
            </>
          )}

          {/* Bloque 2: Ingresar código recibido */}
          {codigoEnviado && !cambioContrasena && (
            <>
              <h1 className={styles.tituloOlvideMiContraseña}>
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
              <button type="button" className="btn btn-danger" onClick={verificarCodigo}>
                Verificar código
              </button>
            </>
          )}

          {cambioContrasena && (
            <>
              <h1 id="bigtitle2" className={styles.tituloOlvideMiContraseña}>
                <b>Nueva contraseña</b>
              </h1>
              <h2 id="text3" className={styles['texto-olvide']}>
                Escriba su nueva contraseña
              </h2>
              <h1 id="middletittle3" className={styles['username-text']} style={{ display: 'none' }}>
            <b>Contraseña</b>
        </h1>
              <input
              id="input3"
              type="password"
              placeholder="Ingrese su contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
              className={styles.input}
              style={{ display: cambioContrasena ? 'block' : 'none' }} 
            />

              
              <input
              id="input4"
              type="password"
              placeholder="Repita su contraseña"
              required
              className={styles.input}
              style={{ padding: '10px' }}
            />

              <button type="button" className="btn btn-danger" onClick={cambiarContrasena}>
                Cambiar contraseña
              </button>
            </>
          )}

        </form>
      </div>
    </>
  );
}

export default RestablecerContrasena;
