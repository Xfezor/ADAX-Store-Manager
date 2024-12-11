import React, { useContext, useEffect, useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_ventas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const Ventas = () => {
  const navigate = useNavigate();
  const { cerrarSesion } = useContext(ContextoSesion);
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const usuario1 = localStorage.getItem('usuario');
  const tienda1 = localStorage.getItem('tienda');
  const codigo_invitacion1 = localStorage.getItem('codigo_invitacion');
  const rol1 = localStorage.getItem('rol');

  const usuario = JSON.parse(usuario1);
  const tienda = JSON.parse(tienda1);
  const codigo_invitacion = JSON.parse(codigo_invitacion1);
  const rol = JSON.parse(rol1);

  const RolCrud = () => {
    if (rol === "1") {
    return(
      <a onClick={CRUD} className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
      </a>
    );
    }
  }
  const CRUD = () => {
    navigate('/crud/usuarios');
  }
  const validador = () => {
    if (localStorage.getItem('usuario') === null) {
      navigate("/inicio");
    };
  };

  const generarPago = () => {
    console.log("Generar pago");
    navigate('/generar_pago');
  };
  const handleCerrarSesion = () => {
    cerrarSesion();
  };
  const buscarProductoHandler = () => {
    console.log(`Buscando producto: ${producto}`);
  };
  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };
  const disminuirCantidad = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };
  const backbutton = () => {
      console.log("Volver atrás");
      navigate(-1);
  };
  const exitbutton = () => {
      console.log("Salir");
      navigate('/inicio');
  };
  useEffect(() => {
    validador();
  }, [validador])
  return (
    <>
      <header>
        <div className={styles.contenedorarriba}>
          <button className={styles.back} onClick={backbutton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className={styles.adax}>
            <h1 className={styles.title}>Ventas</h1>
          </div>
          <button className={styles.exit} onClick={exitbutton}>
            <FontAwesomeIcon icon={faXmark} clasName={styles.exit} />
          </button>
        </div>
      </header>

      <div className={styles.page}>
        <div className={styles['left-container']}>
          <h1 className={styles['big-text']}>Producto</h1>
          <input
            className={styles.search}
            type="text"
            name="search"
            id="search"
            placeholder="Escriba el nombre de un producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          />
          <button className="btn btn-danger" id={styles['search-button']} onClick={buscarProductoHandler}>
            Buscar
          </button>
          <div className={styles['product-list']}>
            <button className="btn btn-danger" id={styles['add-button']} onClick={aumentarCantidad}>
              1+
            </button>
            <button className="btn btn-danger" id={styles['minus-button']} onClick={disminuirCantidad}>
              1-
            </button>
          </div>
        </div>

        <div className={styles['right-container']}>
          <h1 className={styles['big-text']}>Carrito</h1>
          <div className={styles['cart-list']}>
            <h2 className={styles['text-inside']}>test?</h2>
          </div>
          <button className={styles['generar-pago']} onClick={generarPago}>
            Generar pago
          </button>
        </div>
      </div>
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

export default Ventas;
