import React, { useContext, useEffect, useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/styles_generar_pago.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Pago() {
  const [medioDePago, setMedioDePago] = useState('0');
  const navigate = useNavigate();
  const location = useLocation();
  const prodCarrito = location.state;
  const { cerrarSesion } = useContext(ContextoSesion);

  const usuario1 = localStorage.getItem('usuario');
  const tienda1 = localStorage.getItem('tienda');
  const codigo_invitacion1 = localStorage.getItem('codigo_invitacion');
  const rol1 = localStorage.getItem('rol');

  const usuario = JSON.parse(usuario1);
  const tienda = JSON.parse(tienda1);
  const codigo_invitacion = JSON.parse(codigo_invitacion1);
  const rol = JSON.parse(rol1);


  const [totalPagar, setTotalPagar] = useState(0);
  const [totalPagar2, setTotalPagar2] = useState(0);
  const [cantidadRecibida, setCantidadRecibida] = useState(0);
  const [devuelta, setDevuelta] = useState(0);

  const formater = (cantidadRecibida, devuelta) => {
    const cantidadRecibida2 = cantidadRecibida.toString().split('').reverse().join('').match(/.{1,3}/g).join(".").split('').reverse().join('');
    setCantidadRecibida(cantidadRecibida2);
    if (!devuelta) return;
    if (devuelta.toString().includes(".")) {
      console.log("Devuelta ya formateada:", devuelta);
      return;
    }
    console.log("Devuelta antes formateada:", devuelta);
    const devolver2 = devuelta.toString();
    console.log("Como cadena:", devolver2);
    const reversed = devolver2.split('').reverse().join('');
    console.log("Invertido:", reversed);
    const grouped = reversed.match(/.{1,3}/g).join(".");
    console.log("Agrupado:", grouped);
    const finalResult = grouped.split('').reverse().join('');
    console.log("Resultado final:", finalResult);
    console.log(devolver2);
    setDevuelta(finalResult);
  }
  const handleChange = (e) => {
    if (e === "") {
      setCantidadRecibida("0");
      setDevuelta("0");
      return;
    };
    setCantidadRecibida(e);
    const valor = parseInt(e);
    var devuelta1 = valor - totalPagar2;
    if (devuelta1 < 1) {
      setDevuelta(0);
      formater(e);
      return;
    }
    setDevuelta(devuelta1);
    formater(e, devuelta1);
  };
  const RolCrud = () => {
    if (rol === 1) {
      return (
        <button onClick={CRUD} className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
        </button>
      );
    }
  };
  const handleCerrarSesion = () => {
    cerrarSesion();
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

  };

  const handleGenerarFactura = () => {
    navigate("/factura", {state: {totalPagar, cantidadRecibida, devuelta, prodCarrito}});
  }
  useEffect(() => {
    const validador = () => {
      if (localStorage.getItem('usuario') === null) {
        navigate("/inicio");
      };
    };
    validador();
  }, [navigate])

  useEffect(() => {
    const calcularTotal = (prodCarrito) => {
      let total = 0;
      prodCarrito.forEach((prod) => {
        total += prod[2] * prod.cantidad;
      });
      setTotalPagar2(total);
      total = total.toString().split('').reverse().join('').match(/.{1,3}/g).join(".").split('').reverse().join('');
      setTotalPagar(total);
    };
    calcularTotal(prodCarrito);
  }, []);
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
            <FontAwesomeIcon icon={faXmark} className={styles.exit} />
          </button>
        </div>
      </header>

      <div className={styles.page}>
        <div className={styles['left-container']}>
          <h1 className={styles['big-text']}>Dinero recibido</h1>
          <div className={styles['cash-list']}>
            <h2 className={styles['mediodepago-text']}>Metodo de pago: </h2>
            <select className={`${styles['form-select']}`} value={medioDePago} onChange={(e) => setMedioDePago(e.target.value)}>
              <option value="0">Efectivo</option>
              <option value="1">Nequi</option>
              <option value="2">Daviplata</option>
              <option value="3">Tarjeta de credito</option>
              <option value="4">Tarjeta de debito</option>
            </select>
            <h2 className={styles['cantidad-text']}>Cantidad recibida: </h2>
            <input className={styles.cant} type="text" placeholder="Escriba la cantidad..." onChange={(e) => handleChange(e.target.value)} />
            <h3 className={styles['total-recived']}> =${cantidadRecibida}</h3>
            <h3 className={styles['total-text']}>Total a pagar:</h3>
            <h3 className={styles['total-cant-text']}> =${totalPagar}</h3>
            <h3 className={styles['devolver-text']}>Devolver:</h3>
            <h3 className={styles['devolver-cant-text']}> =${devuelta}</h3>
          </div>
          <button className={styles['generar-pago']} onClick={handleGenerarFactura}>
            Confirmar y generar factura
          </button>
        </div>

        <div className={styles['right-container']}>
          <h1 className={styles['big-text']}>Carrito</h1>
          <div className={styles['cart-list']}>
            <table className={styles["product-table"]}>
              <thead className={styles["table-head"]}>
                <tr className={styles.trgespro}>
                  <th className={styles.thgespro}>Nombre</th>
                  <th className={styles.thgespro}>Marca</th>
                  <th className={styles.thgespro}>Precio</th>
                  <th className={styles.thgespro}>Cantidad</th>
                </tr>
              </thead>
              <tbody className={styles["table-body"]}>
                {prodCarrito.map((ProD, index) => (
                  <tr className={styles.trgespro} key={index}>
                    <td className={`${styles.tdgespro} ${styles.tdnombre}`}>{ProD[0]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD[1]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD[2]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
