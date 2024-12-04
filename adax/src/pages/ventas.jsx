import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_ventas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const Ventas = () => {
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const generarPago = () => {
    console.log("Generar pago");
    navigate('/generar_pago');
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

  const navigate = useNavigate();

  const backbutton = () => {
      console.log("Volver atrás");
      navigate(-1);
  };

  const exitbutton = () => {
      console.log("Salir");
      navigate('/inicio');
  };

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
              {cantidad}+
            </button>
            <button className="btn btn-danger" id={styles['minus-button']} onClick={disminuirCantidad}>
              {cantidad}-
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
          <h1 className={styles.username}>Usuario: "Pepito Peréz"</h1>
          <h1 className={styles.username}>Tienda: "Los peregrinos"</h1>
          <h1 className={styles.username}>Codigo invitacion: "TX435SX"</h1>
          <a href="../Crud/tablas/tablas.php" className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
          </a>
          <button
            className="btn btn-danger"
            id={styles.cerrarsesion}
            onClick=""
          >
            Cerrar sesión
          </button>
        </div>
      </footer>
    </>
  );
};

export default Ventas;
