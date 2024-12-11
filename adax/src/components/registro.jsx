import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource-variable/montserrat';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import styles from '../styles/styles_registro.module.css';
import { useNavigate } from 'react-router-dom';

const Registro = () => {

  const navigate = useNavigate();
  const [isEmpleado, setIsEmpleado] = useState(true);
  const [documento, setDocumento] = useState('');
  const [tipoDoc, setTipoDoc] = useState('CC');
  const [nombre, setNombre] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [apellido, setApellido] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [codigoinv, setCodigoinv] = useState('');
  const [nombreTienda, setNombreTienda] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');


  const cambiarestadoBtn1 = () => {
    setIsEmpleado(true);
  };

  const cambiarestadoBtn2 = () => {
    setIsEmpleado(false);
  };

  const validador = () => {
    if (localStorage.getItem('usuario')) {
      navigate("/inicio");
    };
  }

  const backbutton = () => {
    console.log("Volver atrás");
    navigate(-1);
  };

  const exitbutton = () => {
    console.log("Salir");
    navigate('/inicio');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        text: "Por favor, complete el campo 'Documento', o ingrese un número de documento válido con 10 dígitos",
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
    console.log("handleSubmit ejecutado");
    // Si todas las validaciones pasan

    const params = new URLSearchParams({
      tipo: isEmpleado ? "empleado" : "tienda",

    });
    console.log(params.get('tipo'));
    if (params.get('tipo') === "empleado") {
      try {
        const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php`, {
          nombre: nombre,
          nombre2: nombre2,
          apellido: apellido,
          apellido2: apellido2,
          documento: documento,
          tipoDoc: tipoDoc,
          email: email,
          contrasena: contrasena,
          codigo_invitacion: codinv,
          registro: "registro",
        });
        if (respuesta.data.success) {
          console.log('registro exitoso', respuesta.data)
          Swal.fire({
            title: 'Registro exitoso',
            text: 'El registro fue exitoso, puede iniciar sesión ahora',
            icon: 'success',
            confirmButtonText: 'Iniciar sesión'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/iniciar_sesion');
            }
          });

        } else {
          console.log('registro no exitoso', respuesta.data)
          setError('Credenciales Incorrectas', respuesta.data.success);
        }
      } catch (err) {
        console.error(err);
        setError('Error al iniciar sesión');
      }
    };
  };



  const handleSubmit2 = async (e) => {
    e.preventDefault();
    var nombreTienda = document.getElementById('nombreTienda').value;
    var emailTienda = document.getElementById('emailTienda').value;
    if (!nombreTienda) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, complete el campo 'Nombre'.",
      });
      return false;
    }
    if (!emailTienda) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, complete el campo 'Nombre'.",
      });
      return false;
    }
    const params2 = new URLSearchParams({
      tipo: isEmpleado ? "empleado" : "tienda",

    });
    if (params2.get('tipo') === "tienda") {
      try {
        const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.tienda.php`, {
          nombreTienda: nombreTienda,
          telefono: telefono,
          email: email,
          contrasena: contrasena,
          direccion: direccion,
          registroTienda: "registroTienda",
        });
        if (respuesta.data.success) {
          console.log('registro exitoso', respuesta.data)
          Swal.fire({
            title: 'Registro exitoso',
            text: 'El registro de la tienda fue exitoso, puede iniciar sesión ahora',
            icon: 'success',
            confirmButtonText: 'Iniciar sesión'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/iniciar_sesion');
            }
          });

        } else {
          console.log('registro no exitoso', respuesta.data)
          setError('Credenciales Incorrectas', respuesta.data.success);
        }
      } catch (err) {
        console.error(err);
        setError('Error al iniciar sesión');
      }
    };
  }

  useEffect(() => {
    validador();
  }, [validador]);
  return (
    <>
      <header>
        <div className={styles.contenedorarriba}>
          <button className={styles.back} onClick={backbutton}>
            <Link className={styles.back}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ color: "black" }}></FontAwesomeIcon>
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
            <form id={styles.tienda} onSubmit={handleSubmit} method="POST">
              <h3 className={styles["documento-txt"]}>Documento *</h3>
              <input className={`${styles.documento} ${styles.input}`} type="number" placeholder="* Número de documento" id="documento" value={documento} onChange={(e) => setDocumento(e.target.value)} />
              <select className={`${styles["documento-type"]} ${styles.input}`} type="number" id="tp" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
                <option default value="CC">Cedula de cuidadania</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CE">Cedula de extranjeria</option>
                <option value="RC">Registro civil</option>
              </select>
              <h3 className={styles["nombre-txt"]}>Nombre *</h3>
              <input className={`${styles.nombre} ${styles.input}`} type="text" placeholder="* Nombre completo" id="nomcom" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <input className={`${styles.nombre2} ${styles.input}`} type="text" placeholder="Segundo nombre (opcional)" id="segnom" value={nombre2} onChange={(e) => setNombre2(e.target.value)} />
              <h3 className={styles["apellido-txt"]}>Apellido *</h3>
              <input className={`${styles.apellido} ${styles.input}`} type="apellido" placeholder="* Apellido" id="ape1" value={apellido} onChange={(e) => setApellido(e.target.value)} />
              <input className={`${styles.apellido2} ${styles.input}`} type="apellido" placeholder="Segundo apellido (opcional)" id="ape2" value={apellido2} onChange={(e) => setApellido2(e.target.value)} />
              <h3 className={styles["email-txt"]}>Correo Electronico *</h3>
              <input className={`${styles.email} ${styles.input} `} type="text" placeholder="* Correo electronico (example@example.com)" id="correo" value={email} onChange={(e) => setEmail(e.target.value)} />

              <h3 className={`${styles["password-txt"]}`}>Contraseña *</h3>
              <input id="pass1" className={`${styles.password} ${styles.input}`} type="password" placeholder="* Ingrese su contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              <input id="pass2" className={`${styles.password2} ${styles.input}`} type="password" placeholder="* Repita su contraseña" />
              <h3 className={styles["codigo-txt"]}>Codigo de Invitación *</h3>
              <input className={`${styles.codigo} ${styles.input}`} type="text" placeholder="* Ingrese el codigo de invitación" id="codinv" value={codigoinv} onChange={(e) => setCodigoinv(e.target.value)} />
              <p className={styles["iniciar-sesion"]}>¿Ya eres usuario? Ingresa <Link className={styles.textorojo} to="/iniciar_sesion">Aqui</Link></p>
              <button name="registroTienda" value="registroTienda" className={styles["btn btn-danger"]} id={styles["boton_regis"]} type='submit'>Registrarse</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        ) : (
          <div className={styles.conteiner2} id="cont2">
            <h1 className={styles.Registrarse}>Registrarse</h1>
            <div className={styles["toggle-buttons"]}>
              <button className={styles.btn1} id="empleadoBtn" onClick={cambiarestadoBtn1}>Empleado</button>
              <button className={styles["btn2-active"]} id="tiendaBtn" onClick={cambiarestadoBtn2}>Tienda</button>
            </div>
            <form id={styles.tienda} onSubmit={handleSubmit2} method="POST">
              <h3 className={styles["nombretienda-txt"]}>Nombre Tienda *</h3>
              <input id="nombreTienda" className={`${styles.nombretienda} ${styles.input}`} type="text" placeholder="* Nombre completo de la tienda" value={nombreTienda} onChange={(e) => setNombreTienda(e.target.value)} />

              <h3 className={styles["telefono-txt"]}>Telefono</h3>
              <input className={`${styles.telefono} ${styles.input}`} type="text" placeholder="Telefono (opcional)" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

              <h3 className={styles["emailtienda-txt"]}>Correo Electronico *</h3>
              <input id="emailTienda" className={`${styles.emailtienda} ${styles.input}`} type="text" placeholder="* Correo electronico (example@example.com)" value={email} onChange={(e) => setEmail(e.target.value)} />

              <h3 className={styles["passwordtienda-txt"]}>Contraseña *</h3>
              <input className={`${styles["passwordtienda"]} ${styles.input}} ${styles.input}`} type="password" placeholder="* Ingrese su contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              <input className={`${styles["passwordtienda2"]} ${styles.input}`} type="password" placeholder="* Repita su contraseña" />

              <h3 className={styles["direccion-txt"]}>Dirección tienda</h3>
              <input className={`${styles.direccion} ${styles.input}`} type="text" placeholder="Dirección de la tienda (opcional)" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

              <p className={styles["iniciar-sesion"]}>¿Ya eres usuario? Ingresa <Link className={styles.textorojo} to="/iniciar_sesion">Aqui</Link></p>
              <button value="registroTienda" className={styles["btn btn-danger"]} id={styles["boton_regis"]} type='submit'>Registrarse</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        )}

      </div>
    </>
  )
};
export default Registro;