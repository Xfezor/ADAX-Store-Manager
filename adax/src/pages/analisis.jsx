import React from "react";
import '../styles/styles_analisis.css';

function Analisis() {

  const backbutton = () => {
    console.log("Back button clicked"); 
  };

  const exitbutton = () => {
    console.log("Exit button clicked"); 
  };

  const vermovimientos = () => {
    console.log("Ver movimientos clicked"); 
  };

  const buscarProducto = () => {
    console.log("Buscar producto clicked"); 
  };

  const cerrarSesion = () => {
    console.log("Cerrar sesión clicked"); 
  };

  return (
    <div>
      <head>
        <title>ADAX - Análisis</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </head>
      <header>
        <div className="contenedorarriba">
          <button className="back" onClick={backbutton}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="adax">
            <h1 className="title">Análisis</h1>
          </div>
          <button className="exit" onClick={exitbutton}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </header>
      <body>
        <div className="container">
          <div className="txt-arriba">
            <h1 className="d-inline-block">Producto</h1>
            <button
              className="btn btn-danger d-inline-block"
              id="movimientos"
              name="Buscar"
              onClick={vermovimientos}
            >
              Ver movimientos
            </button>
          </div>
          <div>
            <img src="../img/green.png" className="d-inline-block" alt="green" />
            <h5 className="d-inline-block me-3">Popular</h5>
            <img src="../img/yellow.png" className="d-inline-block" alt="yellow" />
            <h5 className="d-inline-block me-3">Medio popular</h5>
            <img src="../img/red.png" className="d-inline-block" alt="red" />
            <h5 className="d-inline-block me-3">No popular</h5>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Escriba el nombre de un producto"
          />
          <select className="form-control w-auto">
            <option defaultValue value="none">
              Ningun filtro
            </option>
            <option value="none">Mayor a menor</option>
            <option value="none">Menor a mayor</option>
            <option value="none">Más caro</option>
            <option value="none">Más barato</option>
          </select>
          <button className="btn btn-danger" id="buscar" onClick={buscarProducto}>
            Buscar
          </button>
        </div>
        <div className="cuadradoverde"></div>
      </body>
      <footer>
        <div className="user">
          <h1 className="username">Usuario: "Pepito Peréz"</h1>
          <h1 className="username">Tienda: "Los peregrinos"</h1>
          <h1 className="username">Codigo invitacion: "TX435SX"</h1>
          <button
            className="btn btn-danger"
            id="cerrarsesion"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Analisis;
