import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_analisis.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Analisis() {

  const backbutton = () => {
    console.log("Back button clicked"); 
  };

  const exitbutton = () => {
    console.log("Exit button clicked"); 
  };

  const vermovimientos = () => {
    console.log("Ver movimientos clicked"); 
  };

  const buscarProducto = () => {
    console.log("Buscar producto clicked"); 
  };

  const cerrarSesion = () => {
    console.log("Cerrar sesión clicked"); 
  };

  return (
    <div>
      <header>
        <div className={styles.contenedorarriba}>
          <button className={styles.back} onClick={backbutton}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          </button>
          <div className={styles.adax}>
            <h1 className={styles.title}>Análisis</h1>
          </div>
          <button className={styles.exit} onClick={exitbutton}>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </header>
      <body>
        <div className={styles.container}>
          <div className={styles['txt-arriba']}>
            <h1 className="d-inline-block">Producto</h1>
            <button
              className="btn btn-danger d-inline-block"
              id="movimientos"
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
            className="form-control"
            placeholder="Escriba el nombre de un producto"
          />
          <select className="form-control w-auto">
            <option defaultValue value="none">
              Ningun filtro
            </option>
            <option value="none">Mayor a menor</option>
            <option value="none">Menor a mayor</option>
            <option value="none">Más caro</option>
            <option value="none">Más barato</option>
          </select>
          <button className={`${'btn'} ${'btn-danger'} ${styles['btn btn-danger']}`} id="buscar" onClick={buscarProducto}>
            Buscar
          </button>
        </div>
        <div className={styles.cuadradoverde}></div>
      </body>
      <footer>
        <div className={styles.user}>
          <h1 className={styles.username}>Usuario: "Pepito Peréz"</h1>
          <h1 className={styles.username}>Tienda: "Los peregrinos"</h1>
          <h1 className={styles.username}>Codigo invitacion: "TX435SX"</h1>
          <button
            className="btn btn-danger"
            id="cerrarsesion"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Analisis;
