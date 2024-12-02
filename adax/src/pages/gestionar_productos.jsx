import React, { useState } from 'react';
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


  return (
    <div className={styles.page}>
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
      <div className={styles["left-container"]}>
        <h1 className={styles["big-text"]}>Producto</h1>
        <input
          className={styles["search"]}
          type="text"
          placeholder="Escriba el nombre de un producto"
        />
        <button className="btn btn-danger" id={styles["search-button"]} >
          Buscar
        </button>
        <div className={styles["product-list"]}>
          <table className={styles["product-table"]}>
            <thead className={styles["table-head"]}>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody className="table-body">
                <tr className={styles.trgespro}>
                  <td className={styles.tdgespro}></td>
                  <td className={styles.tdgespro}></td>
                  <td className={styles.tdgespro}>
                    <button className={`{btn btn-danger ${styles["search-button"]}`}>
                      Ver detalle
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="right-container">
        <h1 className="big-text">Añadir producto</h1>
        <div className="add-product">
          <form >
            <input
              className="product-name"
              type="text"
              placeholder="Escriba el nombre del producto"
            />
            <input
              className="product-price"
              type="text"
              placeholder="Escriba el precio sin puntos ni comas"
            />
            <span style={{ display: 'flex', gap: '10px' }}>
              <h3 className="text-left">Cantidad:</h3>
              <input
                type="number"
                className="numero"
                placeholder="Número"
              />
            </span>
            <button className="añadir-producto" type="submit">
              Añadir producto
            </button>
          </form>
        </div>

        <div className="proveedores">
          <h1 className="big-text-proveedores">Proveedores</h1>
          <button className="gestionar-proveedores">
            Gestionar proveedores
          </button>
        </div>
      </div>

      <footer>
        <div className="user">
          <h1 className="username">Usuario: ""</h1>
          <h1 className="username">Tienda: ""</h1>
          <h1 className="username">Código invitación: ""</h1>
          <button className="btn btn-danger" >
            Cerrar sesión
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GestionarProductos;
