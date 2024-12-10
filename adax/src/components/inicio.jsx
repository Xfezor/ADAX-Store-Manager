import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/styles_inicio.module.css';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {

  const Ventas = () => {
    navigate('/ventas');
  };
  const GestionarProductos = () => {
    navigate('/gestionar_productos');
  }
  const Analisis = () => {
    navigate('/analisis');
  }
  const GestionarVentas = () => {
    navigate('/gestionarVentas');
  }

  const navigate = useNavigate();



  const backbutton = () => {
    console.log('Back button clicked');
  };

  const exitbutton = () => {
    console.log('Exit button clicked');
  };

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
            <FontAwesomeIcon icon={faXmark} clasName={styles.exit} />
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

export default Inicio;
