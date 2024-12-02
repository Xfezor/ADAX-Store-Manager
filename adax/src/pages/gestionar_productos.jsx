import React from 'react';
import styles from'../styles/styles_gestionar_productos.module.css';
import { useNavigate } from 'react-router-dom';

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
    <div className="page">
      <header>
        <div className="contenedorarriba">
          <button className="back">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="adax">
            <h1 className="title">Gestionar productos</h1>
          </div>
          <button className="exit">
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
        />
        <button className="btn btn-danger" id="search-button" >
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
              
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="btn btn-danger">
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
