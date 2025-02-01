import React, { useContext, useEffect, useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import styles from '../styles/styles_detalle_producto.module.css';
import axios from 'axios';


export function Detalle() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cerrarSesion } = useContext(ContextoSesion);
  const { id_Producto } = location.state;

  const usuario1 = localStorage.getItem('usuario');
  const tienda1 = localStorage.getItem('tienda');
  const codigo_invitacion1 = localStorage.getItem('codigo_invitacion');
  const rol1 = localStorage.getItem('rol');

  const usuario = JSON.parse(usuario1);
  const tienda = JSON.parse(tienda1);
  const codigo_invitacion = JSON.parse(codigo_invitacion1);
  const rol = JSON.parse(rol1);

  const [productos, setProductos] = useState([]);
  const [formValues, setFormValues] = useState({
    nombre: '',
    stock: '',
    precio: '',
    stock_min: '',
    marca: '',
    presentacion: '',
    descripcion: '',
    categoria: '',
    fechaVencimiento: '',
  });


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
    console.log("Volver");
    navigate(-1);
  };


  const exitbutton = () => {
    console.log("Salir");
    navigate('/inicio');
  };

  const consultarProducto = async () => {
    console.log("se esta ejecutando la funcion consultarProducto");
    console.log("id_Producto", id_Producto);
    if (!id_Producto) return;
    try {
      const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php`, {
        consultaDatosProducto: id_Producto,
      });
      if (respuesta.data) {
        setProductos(respuesta.data);
        setFormValues({
          nombre: respuesta.data[0][0],
          stock: respuesta.data[0][8],
          precio: respuesta.data[0][2],
          stock_min: respuesta.data[0][9],
          marca: respuesta.data[0][1],
          presentacion: respuesta.data[0][6],
          descripcion: respuesta.data[0][3],
          categoria: respuesta.data[0][5],
          fechaVencimiento: respuesta.data[0][7],
        });
        console.log(productos);
      } else {
        console.log('listado no exitoso', respuesta.data)
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  useEffect(() => {
    const validador = () => {
      if (localStorage.getItem('usuario') === null) {
        navigate("/inicio");
      };
    };
    validador();
    consultarProducto();
  }, []);

  useEffect(() => {
  }, []);
  return (
    <div>
      <header>
        <div className={styles.contenedorarriba}>
          <button className={styles.back} onClick={backbutton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className={styles.adax}>
            <h1 className={styles.title}>Detalle Producto</h1>
          </div>
          <button className={styles.exit} onClick={exitbutton}>
            <FontAwesomeIcon icon={faXmark} className={styles.exit} />
          </button>
        </div>
      </header>

      <div className={styles.container}>
        <h1>Modificar producto</h1>
        <h3 className="mt-3 text-end pe-2">Estado actual:</h3>
        <div className="mt-3">
          <div className="form-check d-inline-block pe-2 me-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Disponible
            </label>
          </div>
          <div className="form-check d-inline-block p-2">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              No disponible
            </label>
          </div>
        </div>
      </div>
      {productos.length > 0 ? (
        <div className={styles.cuadradoverde}>
          <h4 className={styles["nombre-txt"]}>Nombre</h4>
          <input className={styles["nombre-input"]} type="text" placeholder="" value={formValues.nombre} onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })} />
          <h4 className={styles["cantidad-txt"]}>Cantidad</h4>
          <input className={styles["cantidad-input"]} type="number" placeholder="" value={formValues.stock} onChange={(e) => setFormValues({ ...formValues, stock: e.target.value })} />
          <h4 className={styles["precio-txt"]}>Precio</h4>
          <input className={styles["precio-input"]} type="text" placeholder="" value={formValues.precio} onChange={(e) => setFormValues({ ...formValues, precio: e.target.value })} />
          <h4 className={styles["stock-txt"]}>Cantidad minima</h4>
          <input className={styles["stock-input"]} type="number" placeholder="" value={formValues.stock_min} onChange={(e) => setFormValues({ ...formValues, stock_min: e.target.value })} />
          <h4 className={styles["marca-txt"]}>Marca</h4>
          <input className={styles["marca-input"]} type="text" placeholder="" value={formValues.marca} onChange={(e) => setFormValues({ ...formValues, marca: e.target.value })} />
          <h4 className={styles["presentacion-txt"]}>Presentación</h4>
          <input className={styles["presentacion-input"]} type="text" placeholder="" value={formValues.presentacion} onChange={(e) => setFormValues({ ...formValues, presentacion: e.target.value })} />
          <h4 className={styles["descripcion-txt"]}>Descripción</h4>
          <input className={styles["descripcion-input"]} type="number" placeholder="" value={formValues.descripcion} onChange={(e) => setFormValues({ ...formValues, descripcion: e.target.value })} />
          <h4 className={styles["categoria-txt"]}>Categoria</h4>
          <input className={styles["categoria-input"]} type="text" placeholder="" value={formValues.categoria} onChange={(e) => setFormValues({ ...formValues, categoria: e.target.value })} />
          <h4 className={styles["fechav-txt"]}>Fecha de vencimiento</h4>
          <input className={styles["fechav-input"]} type="date" placeholder="" value={formValues.fechaVencimiento} onChange={(e) => setFormValues({ ...formValues, fechaVencimiento: e.target.value })} />

          <button className="btn btn-danger" id={styles.borrar} onClick={backbutton}>
            Eliminar producto
          </button>
          <button className="btn btn-secondary" id={styles.cancelar} onClick={exitbutton}>
            Cancelar
          </button>
          <button className="btn btn-primary" id={styles.aplicar}>
            Aplicar cambios
          </button>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}

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
}

export default Detalle;
