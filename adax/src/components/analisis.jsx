import React, { useContext, useEffect } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_analisis.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function Analisis() {
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

  const handleCerrarSesion = () => {
    cerrarSesion();
  };
  const RolCrud = () => {
    if (rol === 1) {
      return (
        <button onClick={CRUD} className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
        </button>
      );
    }
  };
  const CRUD = () => {
    navigate('/crud/usuarios');
  };

  const backbutton = () => {
    console.log("Volver atrás");
    navigate(-1);
  };

  const exitbutton = () => {
    console.log("Salir");
    navigate('/inicio');
  };

  const vermovimientos = () => {
    console.log("Ver movimientos clicked");
  };

  const buscarProducto = () => {
    console.log("Buscar producto clicked");
  };
  // eslint-disable-next-line
  useEffect(() => {
    const validador = () => {
      if (localStorage.getItem('usuario') === null) {
        navigate("/inicio");
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
            <h1 className={styles.title}>Análisis</h1>
          </div>
          <button className={styles.exit} onClick={exitbutton} to="/inicio">
            <FontAwesomeIcon icon={faXmark}  />
          </button>
        </div>
      </header>
        <div className={`container ${styles.container}`}>
          <div className={styles['txt-arriba']}>
            <h1 className="d-inline-block">Producto</h1>
            <button
              className="btn btn-danger d-inline-block"
              id={styles.movimientos}
              name="Buscar"
              onClick={vermovimientos}
            >
              Ver movimientos
            </button>
          </div>
          <div>
            <img src="/img/green.webp" className="d-inline-block" alt="green" />
            <h5 className="d-inline-block me-3">Popular</h5>
            <img src="/img/yellow.webp" className="d-inline-block" alt="yellow" />
            <h5 className="d-inline-block me-3">Medio popular</h5>
            <img src="/img/red.webp" className="d-inline-block" alt="red" />
            <h5 className="d-inline-block me-3">No popular</h5>
          </div>

          <input
            type="text"
            className={`form-control ${styles['form-control']}`}
            placeholder="Escriba el nombre de un producto"
          />
          <select className={`form-control w-auto ${styles['form-control']}`}>
            <option defaultValue value="none">
              Ningun filtro
            </option>
            <option value="none">Mayor a menor</option>
            <option value="none">Menor a mayor</option>
            <option value="none">Más caro</option>
            <option value="none">Más barato</option>
          </select>
          <button className={`btn btn-danger ${styles['btn btn-danger']}`} id={styles.buscar} onClick={buscarProducto}>
            Buscar
          </button>
        </div>
        <div className={styles.cuadradoverde}></div>
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
}

export default Analisis;
