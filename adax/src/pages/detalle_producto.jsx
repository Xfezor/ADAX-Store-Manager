import React from 'react';
import { useNavigate } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';  
import './styles/styles_detalle_producto.css';  

export function Detalle() {
  const navigate = useNavigate(); 

  
  const backbutton = () => {
    console.log("Volver");
    navigate(-1);  
  };

  
  const exitbutton = () => {
    console.log("Salir");
    navigate('/inicio');  
  };

  return (
    <div>
      <header>
        <div className="contenedorarriba">
          {/* Botón de Volver */}
          <button className="back" onClick={backbutton}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="adax">
            <h1 className="title">Detalle producto</h1>
          </div>

          {/* Botón de Salir */}
          <button className="exit" onClick={exitbutton}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </header>

      <div className="container">
        <h1>Modificar producto</h1>
        <h3 className="mt-3 text-end px-3">Estado actual:</h3>
        <div className="mt-4">
          <div className="form-check d-inline-block">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Disponible
            </label>
          </div>
          <div className="form-check d-inline-block">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              No disponible
            </label>
          </div>
        </div>
      </div>

      <div className="cuadradoverde">
        <h4 className="nombre-txt">Nombre</h4>
        <input className="nombre-input" type="text" placeholder="" />
        <h4 className="cantidad-txt">Cantidad</h4>
        <input className="cantidad-input" type="number" placeholder="" />
        <h4 className="precio-txt">Precio</h4>
        <input className="precio-input" type="text" placeholder="" />
        <h4 className="stock-txt">Stock minimo</h4>
        <input className="stock-input" type="number" placeholder="" />
        <h4 className="marca-txt">Marca</h4>
        <input className="marca-input" type="text" placeholder="" />
        <h4 className="presentacion-txt">Presentación</h4>
        <input className="presentacion-input" type="text" placeholder="" />
        <h4 className="descuento-txt">Descuento</h4>
        <input className="descuento-input" type="number" placeholder="" />
        <input className="descuento-input2" type="text" placeholder="" />
        <h4 className="categoria-txt">Categoria</h4>
        <input className="categoria-input" type="text" placeholder="" />
        <h4 className="fechav-txt">Fecha de caducidad</h4>
        <input className="fechav-input" type="date" placeholder="" />
        
        <div className="mt-3">
          <button className="btn btn-danger" id="borrar" onClick={backbutton}>
            Eliminar producto
          </button>
          <button className="btn btn-secondary" id="cancelar" onClick={exitbutton}>
            Cancelar
          </button>
          <button className="btn btn-primary" id="aplicar">
            Aplicar cambios
          </button>
        </div>
      </div>

     
      <footer>
        <div className="user">
          <h1 className="username">Usuario: "Pepito Peréz"</h1>
          <h1 className="username">Tienda: "Los peregrinos"</h1>
          <h1 className="username">Código invitación: "TX435SX"</h1>
          <button className="btn btn-danger" id="cerrarsesion">
            Cerrar sesión
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Detalle;
