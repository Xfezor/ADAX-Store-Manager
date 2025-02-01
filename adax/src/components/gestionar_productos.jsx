import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_gestionar_productos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from "sweetalert2";

const GestionarProductos = () => {
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


  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0.0);
  const [cantidad, setCantidad] = useState(0);
  const handleCerrarSesion = () => {
    cerrarSesion();
  };
  const RolCrud = () => {
    if (rol === 1) {
      return (
        <button onClick={CRUD} className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
        </button>
      );
    }
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
    navigate('/inicio');
  };


  const verDetalles = (id_Producto) => {
    console.log("Ver detalles del producto", id_Producto);
    navigate("/detalle_producto", { state : { id_Producto : id_Producto } });
  }

  const gestionarprov = () => {
    console.log("Gestionar proveedores");
    navigate('/gestionar_proveedores');
  }
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);
  const Lista = useCallback(async () => {
    try {
      const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?`, {
        listarProductosApp: true,
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
  const VerificarDatos = async () => {
    Swal.fire({
      title: "¿Agregar producto?",
      html: "¿Estas seguro de agregar este producto? <br><br> <input type='checkbox' id='notext'>No volver a mostrar</input>",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        RegistrarProducto();
      }
    });
  };
  const RegistrarProducto = async () => {
    if (nombre === "" || precio === "" || cantidad === "") {
      console.log("si");
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios',
        text: 'Por favor asegurese de llenar todos los campos.'
      });
      return;
    } else {
      try {
        const respuesta2 = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?`, {
          registrarProductoUnico: true,
          nombre: nombre,
          precio: precio,
          cantidad: cantidad, 
          codigo_invitacion: codigo_invitacion,
        });
        if (respuesta2.data.registro) {
          console.log("exito", respuesta2.data);
          Swal.fire({
            icon: 'success',
            title: 'Producto registrado',
            text: 'Producto registrado exitosamente, por favor dirigase a los detalles del produto para agregar más información del producto.'
          });
          Lista();
        } else {
          console.log('registro no exitoso', respuesta2.data)
          Swal.fire({
            icon: 'error',
            title: 'El producto no se pudo registrar',
            text: 'No ha sido posible registrar el producto, por favor intentelo de nuevo.'
          });
        }
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  }

useEffect(() => {
  const validador = () => {
    if (localStorage.getItem('usuario') === null) {
      navigate("/inicio");
    };
  };
  validador();
  Lista();
}, [Lista, navigate])
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
          onChange={(e) => buscar(e.target.value)}
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
              {productos.map((Pro, index) => (
                <tr className={styles.trgespro} key={index}>
                  <td className={`${styles.tdgespro} ${styles.tdnombre}`}>{Pro[1]}</td>
                  <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[2]}</td>
                  <td className={`${styles.tdgespro} ${styles.tdbotondetalle}`}>
                    <button className={`{btn btn-danger`} id={styles["detail-button"]} onClick={() => verDetalles(Pro[0])}>
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles["right-container"]}>
        <h1 className={styles["big-text"]}>Añadir producto</h1>
        <div className={styles["add-product"]}>
          <input
            className={styles["product-name"]}
            type="text"
            placeholder="Escriba el nombre del producto"
            id='nombre'
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className={styles["product-price"]}
            type="number"
            placeholder="Escriba el precio sin puntos ni comas"
            id='precio'
            onChange={(e) => setPrecio(e.target.value)}
          />
          <span style={{ 'display': 'flex', 'gap': '10px', 'marginBottom': '20px' }}>
            <h3 className={styles["text-left"]}>Cantidad:</h3>
            <input
              type="number"
              className={styles["numero"]}
              placeholder="Número"
              id='cantidad'
              onChange={(e) => setCantidad(e.target.value)}
            />
          </span>
          <button className={styles["añadir-producto"]} onClick={VerificarDatos}>
            Añadir producto
          </button>
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
  </div>
);
};

export default GestionarProductos;
