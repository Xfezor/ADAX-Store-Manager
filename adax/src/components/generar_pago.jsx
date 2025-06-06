import React, { useContext, useEffect, useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/styles_generar_pago.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ip, port, protocol } from '../utils/ipconfig.js';

function Pago() {
  const navigate = useNavigate();
  const location = useLocation();
  const prodCarrito = location.state?.prodCarrito || [];
  //datos parseados en json de prodcarrito

  const prodCarrito1 = JSON.parse(localStorage.getItem('prodCarrito'));

  const { cerrarSesion } = useContext(ContextoSesion);

  const usuario1 = localStorage.getItem('usuario');
  const tienda1 = localStorage.getItem('tienda');
  const codigo_invitacion1 = localStorage.getItem('codigo_invitacion');
  const rol1 = localStorage.getItem('rol');
  const id_TiendaUsuario = localStorage.getItem('id_Tienda');
  const documentoUsuario = localStorage.getItem('documento');

  const usuario = JSON.parse(usuario1);
  const tienda = JSON.parse(tienda1);
  const codigo_invitacion = JSON.parse(codigo_invitacion1);
  const rol = JSON.parse(rol1);

  const [medioDePago, setMedioDePago] = useState(0);
  const [totalPagar, setTotalPagar] = useState(0);
  const [totalPagar2, setTotalPagar2] = useState(0);
  const [cantidadRecibida, setCantidadRecibida] = useState(0);
  const [devuelta, setDevuelta] = useState(0);
  const [documentoCliente, setDocumentoCliente] = useState("");



  const formater = (cantidadRecibida, devuelta) => {
    const cantidadRecibida2 = cantidadRecibida.toString().split('').reverse().join('').match(/.{1,3}/g).join(".").split('').reverse().join('');
    setCantidadRecibida(cantidadRecibida2);
    if (!devuelta) return;
    if (devuelta.toString().includes(".")) {
      return;
    }
    const devolver2 = devuelta.toString();
    const reversed = devolver2.split('').reverse().join('');
    const grouped = reversed.match(/.{1,3}/g).join(".");
    const finalResult = grouped.split('').reverse().join('');

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
    navigate(-1, { state: { prodCarrito } });
  };
  //Salir al inicio y borrar el carrito state producto = null o 0
  const exitbutton = () => {
    navigate('/inicio');

  };
  const VerificarPago = async () => {
    const cantidadRecibidaNumerica = parseFloat(cantidadRecibida.toString().replace(/\./g, ""));
    const totalPagarNumerico = parseFloat(totalPagar.toString().replace(/\./g, ""));

    if (!cantidadRecibidaNumerica || isNaN(cantidadRecibidaNumerica) || cantidadRecibidaNumerica <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese una cantidad válida',
      });
      return;
    }
    if (cantidadRecibidaNumerica < totalPagarNumerico) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cantidad recibida es menor al total a pagar',
      });
      return;
    }
    if (medioDePago === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione un medio de pago',
      });
      return;
    }

    try {
      const idVenta = await handleGenerarVenta();

      if (idVenta) {

      }
      await registrarFactura(idVenta);
    } catch (error) {
      console.error('Error al generar la venta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor. Intente nuevamente.',
      });
    }

  }

  const handleGenerarVenta = async () => {
    try {
      const respuesta = await axios.post(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.venta.php`, {
        registro: true,
        EstadoVenta: "Pendiente",
        documento_Cliente: documentoCliente,
        tienda_idtienda: id_TiendaUsuario,
        metododepago_ID_Met_Pago: medioDePago,
        usuarios_documento: documentoUsuario,
      });
      if (respuesta.status === 200) {
        const idVenta = respuesta.data.id_Venta;
        localStorage.setItem('id_Venta', idVenta);
        return idVenta;
      } else {
        console.log("Error al generar la venta");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: respuesta.data.mensaje || "No se pudo registrar la venta.",
        });
        return null;
      }
    } catch (error) {
      console.error('Error al generar la venta:', error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Intente nuevamente.",
      });
      return null;
    }
  }
  //Generar Factura
  const registrarFactura = async (idVenta) => {
    console.log("ID de la venta:", idVenta);
    const prodCarrito2 = JSON.parse(localStorage.getItem('prodCarrito'));

    const productos = prodCarrito2.map((producto) => ({
      id_Producto: producto[0],
      precio: producto[3],
      cantidad: producto.cantidad,
    }));

    try {
      for (const producto of productos) {
        const datosFactura = {
          registro: true,
          venta_id_Venta: idVenta,
          producto_id_Producto: producto.id_Producto,
          Precio: producto.precio,
          Cantidad: producto.cantidad,
          Estado: "Pendiente"
        };
        const respuesta = await axios.post(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php`,
          datosFactura,
        );
        if (respuesta.data && respuesta.data.access) {
          navigate("/factura", { replace: true, state: { totalPagar, cantidadRecibida, devuelta, prodCarrito } });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: respuesta.data.mensaje || "No se pudo registrar la venta.",
          });
        }
      }
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Intente nuevamente.",
      });

    }
  };

  useEffect(() => {
    const handlePopState = () => {
      navigate('/inicio', { replace: true, state: null });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  })
  const [codInv, setCodInv] = useState("?");
  const CodInv = () => {
    if (rol === 3 || rol === 1) {
      setCodInv(codigo_invitacion);
    }
  };
  useEffect(() => {
    const validador = () => {
      if (localStorage.getItem('usuario') === null) {
        navigate("/inicio");
      };
    };
    validador();
    CodInv();
  }, [navigate, codInv])

  useEffect(() => {
    const calcularTotal = (prodCarrito) => {
      let total = 0;
      prodCarrito.forEach((prod) => {
        total += prod[3] * prod.cantidad;
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
              <option value="0">Seleccione un metodo de pago</option>
              <option value="1">Tarjeta de credito</option>
              <option value="2">Tarjeta de debito</option>
              <option value="3">Nequi</option>
              <option value="4">Daviplata</option>
              <option value="5">Efectivo</option>
            </select>
            <h2 className={styles['cantidad-text']}>Cantidad recibida: </h2>
            <input className={styles.cant} type="number" placeholder="Escriba la cantidad..." onChange={(e) => handleChange(e.target.value)} />
            <h3 className={styles['total-recived']}> =${cantidadRecibida}</h3>
            <h3 className={styles['documento-text']}>Documento del Cliente</h3>
            <input className={styles['documento-input']} type="number" placeholder="Escriba el documento" id='documentoCliente' onChange={(e) => setDocumentoCliente(e.target.value)} />
            <h3 className={styles['total-text']}>Total a pagar:</h3>
            <h3 className={styles['total-cant-text']}> =${totalPagar}</h3>
            <h3 className={styles['devolver-text']}>Devolver:</h3>
            <h3 className={styles['devolver-cant-text']}> =${devuelta}</h3>
          </div>
          <button className={styles['generar-pago']} onClick={VerificarPago}>
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
                    <td className={`${styles.tdgespro} ${styles.tdnombre}`}>{ProD[1]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD[2]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD[3]}</td>
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
          <h1 className={styles.username}>Codigo invitacion: "{codInv}"</h1>
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
