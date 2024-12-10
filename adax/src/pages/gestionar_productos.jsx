import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_gestionar_productos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const GestionarProductos = () => {

  const navigate = useNavigate();


  const backbutton = () => {
    console.log("Volver atrás");
    navigate(-1);
  };

  const exitbutton = () => {
    console.log("Salir");
    navigate('/inicio');
  };
  const index = () => {
    console.log("Index");
    navigate('/index');
  }

  const gestionarprov = () => {
  console.log ("Gestionar proveedores");
  navigate('/gestionar_proveedores');
  }
  return (
    <div>
      <header>
        <div className={styles.contenedorarriba}>
          <button className={styles.back} onClick={backbutton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className={styles.adax}>
            <h1 className={styles.title}>Gestionar Productos</h1>
          </div>
          <button className={styles.exit} onClick={exitbutton}>
            <FontAwesomeIcon icon={faXmark} className={styles.exit} />
          </button>
        </div>
      </header>
      <div className={styles.page}>
        <div className={styles["left-container"]}>
          <h1 className={styles["big-text"]}>Producto</h1>
          <input
            className={styles["search"]}
            type="text"
            placeholder="Escriba el nombre de un producto"
            id="search"
          />
          <button className="btn btn-danger" id={styles["search-button"]} >
            Buscar
          </button>
          <div className={styles["product-list"]}>
            <table className={styles["product-table"]}>
              <thead className={styles["table-head"]}>
                <tr className={styles.trgespro}>
                  <th className={styles.thgespro}>Nombre</th>
                  <th className={styles.thgespro}>Marca</th>
                  <th className={styles.thgespro}>Detalle</th>
                </tr>
              </thead>
              <tbody className={styles["table-body"]}>
                <tr className={styles.trgespro}>
                  <td className={`${styles.tdgespro} ${styles.tdmarca}`}></td>
                  <td className={`${styles.tdgespro} ${styles.tdnombre}`}></td>
                  <td className={`${styles.tdgespro} ${styles.tdbotondetalle}`}>
                      <button className={`{btn btn-danger`} id={styles["search-button"]}>
                        Ver detalle
                      </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles["right-container"]}>
          <h1 className={styles["big-text"]}>Añadir producto</h1>
          <div className={styles["add-product"]}>
            <form >
              <input
                className={styles["product-name"]}
                type="text"
                placeholder="Escriba el nombre del producto"
              />
              <input
                className={styles["product-price"]}
                type="text"
                placeholder="Escriba el precio sin puntos ni comas"
              />
              <span style={{ 'display': 'flex', 'gap': '10px' }}>
                <h3 className={styles["text-left"]}>Cantidad:</h3>
                <input
                  type="number"
                  className={styles["numero"]}
                  placeholder="Número"
                />
              </span>
              <button className={styles["añadir-producto"]} type="submit">
                Añadir producto
              </button>
            </form>
          </div>
          <div className={styles["proveedores"]}>
            <h1 className={styles["big-text-proveedores"]}>
              Proveedores
            </h1>
            <button className={styles["gestionar-proveedores"]} onClick={gestionarprov}>
              Gestionar proveedores
            </button>
          </div>
        </div>
      </div>
      <footer>
        <div className={styles["user"]}>
          <h1 className={styles["username"]}>Usuario: ""</h1>
          <h1 className={styles["username"]}>Tienda: ""</h1>
          <h1 className={styles["username"]}>Código invitación: ""</h1>
          <button className="btn btn-danger" onClick={index} >
            Cerrar sesión
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GestionarProductos;