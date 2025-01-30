import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_ventas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';



const Ventas = () => {
  // Navigate para navegar
  const navigate = useNavigate();

  // Contexto
  const { cerrarSesion } = useContext(ContextoSesion);

  // Obtener datos de localstorage
  const usuario1 = localStorage.getItem('usuario');
  const tienda1 = localStorage.getItem('tienda');
  const codigo_invitacion1 = localStorage.getItem('codigo_invitacion');
  const rol1 = localStorage.getItem('rol');

  const usuario = JSON.parse(usuario1);
  const tienda = JSON.parse(tienda1);
  const codigo_invitacion = JSON.parse(codigo_invitacion1);
  const rol = JSON.parse(rol1);
  // Checkeo de rol
  const RolCrud = () => {
    if (rol === 1) {
      return (
        <button onClick={CRUD} className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
        </button>
      );
    }
  }
  // Estado de productos
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);

  // Llamada de API
  const Lista = useCallback( async () => {
    try {
      const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?`, {
        listarProductosAppPrecio: true,
        codigo_invitacion: codigo_invitacion,
      });
      if (respuesta.data) {
        console.log("etsitosooo", respuesta.data);
        setProductos(respuesta.data);
        setProductosOriginales(respuesta.data);
      } else {
        console.log('listado no exitoso', respuesta.data)
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [codigo_invitacion]);
  const buscar = (nombre) => {
    if (nombre === "") {
      setProductos(productosOriginales);
    } else {
      const productosFiltrados = productosOriginales.filter((Pro) => Pro[0].toLowerCase().includes(nombre.toLowerCase()));
      setProductos(productosFiltrados);
    }
  }

  // Producto carrito
  const [prodCarrito, setProdCarrito] = useState([]);
  
  // Funcion para añadir el producto al carrito
  const agregarProducto = (index) => {
    const producto = productos[index];
    const productoEnCarrito = prodCarrito.find((item) => item[0] === producto[0]);
  
    if (productoEnCarrito) {
      const nuevoCarrito = prodCarrito.map((item) =>
        item[0] === producto[0]
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setProdCarrito(nuevoCarrito);
    } else {
      setProdCarrito([...prodCarrito, { ...producto, cantidad: 1 }]);
    }
  };
  const eliminarProducto = (index) => {
    const nuevoCarrito = [...prodCarrito];
    nuevoCarrito.splice(index, 1);
    setProdCarrito(nuevoCarrito);
  };
  const aumentarCantidad = (index) => {
    const nuevoCarrito = [...prodCarrito];
    nuevoCarrito[index] = {
      ...nuevoCarrito[index],
      cantidad: nuevoCarrito[index].cantidad + 1
    };
    setProdCarrito(nuevoCarrito);
  };
  const disminuirCantidad = (index) => {
    const nuevoCarrito = [...prodCarrito];
    nuevoCarrito[index] = {
      ...nuevoCarrito[index],
      cantidad: nuevoCarrito[index].cantidad - 1
    };
    setProdCarrito(nuevoCarrito);
    if (nuevoCarrito[index].cantidad === 0) {
      eliminarProducto(index);
    }
  };
  
  const CRUD = () => {
    navigate('/crud/usuarios');
  }
  const generarPago = () => {
    console.log("Generar pago");
    console.log(prodCarrito);
    if (prodCarrito.length === 0) {
      console.log("no hay nada en el carrito");
      Swal.fire({
        icon: "error",
        title: "¡Carrito vacio!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } else {
      navigate('/generar_pago', { state: prodCarrito });

    };
  };
  const handleCerrarSesion = () => {
    cerrarSesion();
  };
  const backbutton = () => {
    console.log("Volver atrás");
    navigate(-1);
  };
  const exitbutton = () => {
    console.log("Salir");
    navigate('/inicio');
  };
  // eslint-disable-next-line
  useEffect(() => {
    const validador = () => {
      if (localStorage.getItem('usuario') === null) {
        navigate("/inicio");
      };
    };

    validador();
    Lista();
  }, [Lista,navigate])
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
            <FontAwesomeIcon icon={faXmark} className={styles.exit} />
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
            onChange={(e) => buscar(e.target.value)}
          />
          <div className={styles['product-list']}>
            <table className={styles["product-table"]}>
              <thead className={styles["table-head"]}>
                <tr className={styles.trgespro}>
                  <th className={styles.thgespro}>Nombre</th>
                  <th className={styles.thgespro}>Marca</th>
                  <th className={styles.thgespro}>Precio</th>
                  <th className={styles.thgespro}>Operacion</th>
                </tr>
              </thead>
              <tbody className={styles["table-body"]}>
                {productos.map((Pro, index) => (
                  <tr className={styles.trgespro} key={index}>
                    <td className={`${styles.tdgespro} ${styles.tdnombre}`}>{Pro[0]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[1]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[2]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdbotondetalle}`}>
                      <button className="btn btn-danger" id={styles['add-button']} onClick={() => agregarProducto(index)}>
                        1+
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                  <th className={styles.thgespro}>Operacion</th>
                </tr>
              </thead>
              <tbody className={styles["table-body"]}>
                {prodCarrito.map((ProD, index) => (
                  <tr className={styles.trgespro} key={index}>
                    <td className={`${styles.tdgespro} ${styles.tdnombre}`}>{ProD[0]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD[1]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD[2]}</td>
                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD.cantidad}</td>
                    <td className={`${styles.tdgespro} ${styles.tdbotondetalle}`}>
                      <button className="btn btn-danger" id={styles['add-button']} onClick={() => aumentarCantidad(index)}>
                        1+
                      </button>
                      <button className="btn btn-danger" id={styles['minus-button']} onClick={() => disminuirCantidad(index)}>
                        1-
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
