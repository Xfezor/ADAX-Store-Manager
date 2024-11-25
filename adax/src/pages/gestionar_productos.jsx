import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../styles/styles_gestionar_productos.css';


const GestionarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [usuario, setUsuario] = useState('');
  const [tienda, setTienda] = useState('');
  const [codigoInvitacion, setCodigoInvitacion] = useState('');

  useEffect(() => {
    
    const sessionData = {
      nombre1: 'Usuario Demo',
      nombreTienda: 'Tienda Ejemplo',
      codigo_invitacion: '12345',
    };

    if (!sessionData.nombre1) {
      window.location.href = 'iniciar_sesion.php?error=2';
    } else {
      setUsuario(sessionData.nombre1);
      setTienda(sessionData.nombreTienda);
      setCodigoInvitacion(sessionData.codigo_invitacion);
    }

    fetchProductos(sessionData.codigo_invitacion);
  }, []);

  const fetchProductos = async (codigoInvitacion) => {
    try {
     
      const response = await axios.get(`/api/productos?codigo=${codigoInvitacion}`);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  const handleAddProducto = async (e) => {
    e.preventDefault();
    try {
      const nuevoProducto = {
        Nombre: nombreProducto,
        Precio_unit: precioProducto,
        Stock: cantidadProducto,
      };

      await axios.post('/api/productos', nuevoProducto);
      Swal.fire('Registro exitoso', 'El producto fue añadido correctamente', 'success');
      fetchProductos(codigoInvitacion);
    } catch (error) {
      Swal.fire('Error', 'No se pudo añadir el producto', 'error');
    }
  };

  return (
    <div className="page">
      <header>
        <div className="contenedorarriba">
          <button className="back" onClick={() => window.history.back()}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="adax">
            <h1 className="title">Gestionar productos</h1>
          </div>
          <button className="exit" onClick={() => window.location.href = 'cerrarsesion.php'}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </header>

      <div className="left-container">
        <h1 className="big-text">Producto</h1>
        <input
          className="search"
          type="text"
          placeholder="Escriba el nombre de un producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-danger" id="search-button" onClick={() => fetchProductos(codigoInvitacion)}>
          Buscar
        </button>
        <div className="product-list">
          <table className="product-table">
            <thead className="table-head">
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {productos.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.Nombre}</td>
                  <td>{producto.Marca}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => console.log(`Detalles de ${producto.Nombre}`)}>
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="right-container">
        <h1 className="big-text">Añadir producto</h1>
        <div className="add-product">
          <form onSubmit={handleAddProducto}>
            <input
              className="product-name"
              type="text"
              placeholder="Escriba el nombre del producto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
            />
            <input
              className="product-price"
              type="text"
              placeholder="Escriba el precio sin puntos ni comas"
              value={precioProducto}
              onChange={(e) => setPrecioProducto(e.target.value)}
            />
            <span style={{ display: 'flex', gap: '10px' }}>
              <h3 className="text-left">Cantidad:</h3>
              <input
                type="number"
                className="numero"
                placeholder="Número"
                value={cantidadProducto}
                onChange={(e) => setCantidadProducto(e.target.value)}
              />
            </span>
            <button className="añadir-producto" type="submit">
              Añadir producto
            </button>
          </form>
        </div>

        <div className="proveedores">
          <h1 className="big-text-proveedores">Proveedores</h1>
          <button className="gestionar-proveedores" onClick={() => console.log('Gestionar proveedores')}>
            Gestionar proveedores
          </button>
        </div>
      </div>

      <footer>
        <div className="user">
          <h1 className="username">Usuario: "{usuario}"</h1>
          <h1 className="username">Tienda: "{tienda}"</h1>
          <h1 className="username">Código invitación: "{codigoInvitacion}"</h1>
          <button className="btn btn-danger" onClick={() => window.location.href = 'cerrarsesion.php'}>
            Cerrar sesión
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GestionarProductos;
