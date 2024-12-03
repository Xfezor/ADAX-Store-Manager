import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className={styles.page}>
        <div className={styles['left-container']}>
          <h1 className={styles['big-text']}>Producto</h1>
          <input className={styles.search} type="text" name="search" id="search"
            placeholder="Escriba un el nombre de un producto"></input>
          <button className="btn btn-danger" id={styles['search-button']}>Buscar</button>
          <div className={styles['product-list']}>
            <table id="productos" className={styles['product-table']}>
              <thead className={styles['table-head']}>
                <tr>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>detalle</th>
                </tr>
              </thead>
              <tbody className={styles['table-body']}>
                <tr>
                  <td></td>
                  <td></td>
                  <td><button className="btn btn-danger" id={styles.detalle} onclick="verdetalle()">Ver detalle</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles['right-container']}>
          <h1 className={styles['big-text']}>Añadir producto</h1>
          <div className={styles['add-product']}>
            <form action="../Crud/controlador/controlador.producto.php" className={styles.form} method="POST">
              <input className={styles['product-name']} type="text" name="Nombre" id="addproduct"
                placeholder="Escriba el nombre del producto"></input>
              <input className={styles['product-price']} type="text" name="Precio_unit" id="productPrice"
                placeholder="Escriba el precio sin puntos ni comas"></input>
              <span style={{'display': 'flex', 'gap': '10px'}}>
                <h3 className={styles['text-left']}>Cantidad: </h3>
                <input type="number" className={styles.numero} placeholder="Número" name="Stock"  />
              </span>
              <button className={styles['añadir-producto']} type="submit" name="registrarProductoUnico" value="1">Añadir producto</button>
            </form>
          </div>
          <div className={styles.proveedores}>
            <h1 className={styles['big-text-proveedores']}>Proveedores</h1>
            <button className={styles['gestionar-proveedores']} onclick="gestionarproveedores()">Gestionar proveedores</button>
          </div>
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
    </div>
  );
};

export default GestionarProductos;
