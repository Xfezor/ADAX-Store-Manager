import React, { useContext, useEffect } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/styles_inicio.module.css';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();
  const { cerrarSesion } = useContext(ContextoSesion);

  const usuario1 = localStorage.getItem('usuario');
  const tienda1 = localStorage.getItem('tienda');
  const codigo_invitacion1 = localStorage.getItem('codigo_invitacion');
  const rol1 = localStorage.getItem('rol');

  const usuario = JSON.parse(usuario1);
  const tienda = JSON.parse(tienda1);
  const codigo_invitacion = JSON.parse(codigo_invitacion1);
  const rol = JSON.parse(rol1);
  console.log(rol);

  const handleCerrarSesion = () => {
    cerrarSesion();
  };
  const RolCrud = () => {
    if (rol === 1) {
    return(
      <button onClick={CRUD} className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
      </button>
    );
    }
  };
  const CRUD = () => {
    navigate('/crud/usuarios');
  };
  const Ventas = () => {
    navigate('/ventas');
  };
  const GestionarProductos = () => {
    navigate('/gestionar_productos');
  };
  const Analisis = () => {
    navigate('/analisis');
  };
  const GestionarVentas = () => {
    navigate('/gestionar_ventas');
  };
  const backbutton = () => {
    console.log('Back button clicked');
  };
  const exitbutton = () => {
    console.log('Exit button clicked');
  };

  useEffect(() => {
    const validador = () => {
        if (localStorage.getItem('usuario') === null) {
            navigate("/iniciar_sesion");
        };
    };
    validador();
}, [navigate])
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
            <FontAwesomeIcon icon={faXmark} className={styles.exit} />
          </button>
        </div>
      </header>
      <main>
        <div className={styles['big-button-container']}>
          <div className={styles['linea-big-button']}>
            <div className={styles.btn} id="Gp" onClick={GestionarProductos}>
              <h1 className={styles.textogrande}>Gestionar Productos</h1>
            </div>
            <div className={styles.btn} id="An" onClick={Analisis}>
              <h1 className={styles.textogrande}>Analisis</h1>
            </div>
          </div>
          <div className={styles['linea-big-button']}>
            <div className={styles.btn} id="Vn" onClick={Ventas}>
              <h1 className={styles.textogrande}>Ventas</h1>
            </div>
            <div className={styles.btn} id="Gv" onClick={GestionarVentas}>
              <h1 className={styles.textogrande}>Gestionar Ventas</h1>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className={styles.user}>
          <h1 className={styles.username}>Usuario: "{usuario}"</h1>
          <h1 className={styles.username}>Tienda: "{tienda}"</h1>
          <h1 className={styles.username}>Codigo invitacion: "{codigo_invitacion}"</h1>
          <RolCrud />
          <button
            className="btn btn-danger"
            id={styles.cerrarsesion}
            onClick={handleCerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </footer>
    </>
  );
};

export default Inicio;
