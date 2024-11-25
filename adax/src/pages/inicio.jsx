import React from 'react';
import '../styles/styles_inicio.css'; 
import Ventas from './ventas';
import { useNavigate } from 'react-router-dom';

const Inicio= () => {
 
  const session = {
    nombre1: 'John Doe',
    nombreTienda: 'Store Name',
    codigo_invitacion: '12345',
    rol_id_Rol: 1,
  };

  const Ventas = () => {
    navigate('/Ventas');
  };

  const navigate = useNavigate();


 
  const backbutton = () => {
    console.log('Back button clicked');
  };

  const exitbutton = () => {
    console.log('Exit button clicked');
  };

  return (
    <>
      <header>
        <div className="contenedorarriba">
          <button className="back" onClick={backbutton}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="adax">
            <h1 className="title">ADAX Store Manager</h1>
          </div>
          <button className="exit" onClick={exitbutton}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </header>
      <main>
        <div className="big-button-container">
          <div className="linea-big-button">
            <div className="btn" id="Gp">
              <h1 className="textogrande">Gestionar Productos</h1>
            </div>
            <div className="btn" id="An">
              <h1 className="textogrande">Analisis</h1>
            </div>
          </div>
          <div className="linea-big-button">
      <div className="btn" id="Vn" onClick={Ventas}>
        <h1 className="textogrande">Ventas</h1>
      </div>
            <div className="btn" id="Gv">
              <h1 className="textogrande">Gestionar Ventas</h1>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="user">
          <h1 className="username">Usuario: {session.nombre1}</h1>
          <h1 className="username">Tienda: {session.nombreTienda}</h1>
          <h1 className="username">
            Codigo invitacion: {session.rol_id_Rol ? '?' : session.codigo_invitacion}
          </h1>
          {session.rol_id_Rol === 1 && (
            <a href="../Crud/tablas/tablas.php" className="btn btn-danger" id="cerrarsesion">
              CRUD
            </a>
          )}
          <a href="iniciar_sesion" className="btn btn-danger" id="cerrarsesion">
            Cerrar sesión
          </a>
        </div>
      </footer>
    </>
  );
};

export default Inicio;
