import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Pago() {
  const [medioDePago, setMedioDePago] = useState('0');
  const navigate = useNavigate();  

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

  return (
    <>
      <header>
        <div className="contenedorarriba">
          <button className="back" onClick={backbutton}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="adax">
            <h1 className="title">Generar factura</h1>
          </div>
          <button className="exit" onClick={exitbutton}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </header>

      <div className="page">
        <div className="left-container">
          <h1 className="big-text">Dinero recibido</h1>
          <div className="cash-list">
            <h2 className="mediodepago-text">Medio de pago: </h2>
            <select className="MedioDePago form-select" value={medioDePago} onChange={handleChange}>
              <option value="0">Efectivo</option>
              <option value="1">Nequi</option>
              <option value="2">Daviplata</option>
              <option value="3">Tarjeta de credito</option>
              <option value="4">Tarjeta de debito</option>
            </select>
            <h2 className="cantidad-text">Cantidad recibida: </h2>
            <input className="cant" type="text" placeholder="Escriba la cantidad..." />
            <h3 className="total-recived"> =$50.000</h3>
            <h3 className="total-text">Total a pagar:</h3>
            <h3 className="total-cant-text"> =$32.000</h3>
            <h3 className="devolver-text">Devolver:</h3>
            <h3 className="devolver-cant-text"> =$18.000</h3>
          </div>
          <button className="generar-pago" onClick={handleGenerarFactura}>
            Confirmar y generar factura
          </button>
        </div>

        <div className="right-container">
          <h1 className="big-text">Carrito</h1>
          <div className="cart-list">
            <h2 className="text-inside"></h2>
          </div>
        </div>
      </div>

      <footer>
        <div className="user">
          <h1 className="username">Usuario: "Pepito Peréz"</h1>
          <h1 className="username">Tienda: "Los peregrinos"</h1>
          <h1 className="username">Codigo invitacion: "TX435SX"</h1>
          <button className="btn btn-danger" id="cerrarsesion">
            Cerrar sesión
          </button>
        </div>
      </footer>
    </>
  );
}

export default Pago;
