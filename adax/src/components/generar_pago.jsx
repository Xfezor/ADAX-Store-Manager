import React, { useContext, useEffect,useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import { useNavigate } from 'react-router-dom'; 
import styles from '../styles/styles_generar_pago.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Pago() {
  const [medioDePago, setMedioDePago] = useState('0');
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
    if (rol === "1") {
    return(
      <button onClick={CRUD} className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
      </button>
    );
    }
  };
  const CRUD = () => {
    navigate('/crud/usuarios');
  };
  const handleChange = (e) => {
    setMedioDePago(e.target.value);
  };

 
  const handleGenerarFactura = () => {
    navigate('/factura'); 
  };

  const backbutton = () => {
    console.log("Volver atrás");
    
    navigate(-1); 
  };

  const exitbutton = () => {
    console.log("Salir");
  
  };
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
            <h1 className={styles.title}>Generar factura</h1>
          </div>
          <button className={styles.exit} onClick={exitbutton}>
            <FontAwesomeIcon icon={faXmark} clasName={styles.exit} />
          </button>
        </div>
      </header>

      <div className={styles.page}>
        <div className={styles['left-container']}>
          <h1 className={styles['big-text']}>Dinero recibido</h1>
          <div className={styles['cash-list']}>
            <h2 className={styles['mediodepago-text']}>Medio de pago: </h2>
            <select className={`${styles['form-select']}`} value={medioDePago} onChange={handleChange}>
              <option value="0">Efectivo</option>
              <option value="1">Nequi</option>
              <option value="2">Daviplata</option>
              <option value="3">Tarjeta de credito</option>
              <option value="4">Tarjeta de debito</option>
            </select>
            <h2 className={styles['cantidad-text']}>Cantidad recibida: </h2>
            <input className={styles.cant} type="text" placeholder="Escriba la cantidad..." />
            <h3 className={styles['total-recived']}> =$50.000</h3>
            <h3 className={styles['total-text']}>Total a pagar:</h3>
            <h3 className={styles['total-cant-text']}> =$32.000</h3>
            <h3 className={styles['devolver-text']}>Devolver:</h3>
            <h3 className={styles['devolver-cant-text']}> =$18.000</h3>
          </div>
          <button className={styles['generar-pago']} onClick={handleGenerarFactura}>
            Confirmar y generar factura
          </button>
        </div>

        <div className={styles['right-container']}>
          <h1 className={styles['big-text']}>Carrito</h1>
          <div className={styles['cart-list']}>
            <h2 className={styles['text-inside']}>test</h2>
          </div>
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
}

export default Pago;
