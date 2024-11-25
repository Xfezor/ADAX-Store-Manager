import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/styles_ventas.module.css';
import IniciarSesion from './iniciar_sesion';

const Ventas = () => {
  const navigate = useNavigate();

  
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState(1);

 
  const backButtonHandler = () => {
    console.log("Volver");
    navigate(-1);
  };


  const exitButtonHandler = () => {
    console.log("atras");
    navigate('IniciarSesion');
 
  };

 
  const generarPago = () => {
    console.log("Generar pago");
    navigate('/generar_pago'); 
  };

  const buscarProductoHandler = () => {
    console.log(`Buscando producto: ${producto}`);
    
  };

 
  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  
  const disminuirCantidad = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <>
      <header>
        <div className="contenedorarriba">
          <button className="back" onClick={backButtonHandler}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="adax">
            <h1 className="title">Ventas</h1>
          </div>
          <button className="exit" onClick={exitButtonHandler}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </header>

      <div className="page">
        <div className="left-container">
          <h1 className="big-text">Producto</h1>
          <input
            className="search"
            type="text"
            name="search"
            id="search"
            placeholder="Escriba el nombre de un producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)} 
          />
          <button className="btn btn-danger" id="search-button" onClick={buscarProductoHandler}>
            Buscar
        </button>
        <div className="product-list">
            <button className="btn btn-danger" id="add-button" onClick={aumentarCantidad}>
            {cantidad}+
            </button>
            <button className="btn btn-danger" id="minus-button" onClick={disminuirCantidad}>
            {cantidad}-
            </button>
          </div>
        </div>

        <div className="right-container">
          <h1 className="big-text">Carrito</h1>
          <div className="cart-list">
            <h2 className="text-inside"></h2>
          </div>
          <button className="generar-pago" onClick={generarPago}>
            Generar pago
          </button>
        </div>
      </div>

      <footer>
        <div className="user">
          <h1 className="username">Usuario: "Pepito Peréz"</h1>
          <h1 className="username">Tienda: "Los peregrinos"</h1>
          <h1 className="username">Codigo invitacion: "TX435SX"</h1>
          <button className="btn btn-danger" id="cerrarsesion" onClick={exitButtonHandler}>
            Cerrar sesión
          </button>
        </div>
      </footer>
    </>
  );
};

export default Ventas;
