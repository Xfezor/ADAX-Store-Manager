import React from "react";
import '../styles/styles_factura.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Factura() {
    const navigate = useNavigate(); 
    const backButtonHandler = () => {
        console.log("Volver");
        navigate(-1);
       
    };

    const exitButtonHandler = () => {
       
        console.log("Salir");
    };

    return (
        <>
            <header>
                <div className="contenedorarriba">
                    <button className="back" onClick={backButtonHandler}>
                        <Link to="/factura" className="fa-solid fa-arrow-left"></Link>
                    </button>
                    <div className="adax">
                        <h1 className="title">Factura</h1>
                    </div>
                    <button className="exit" onClick={exitButtonHandler}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </header>

            <div className="page">
                <div className="left-container">
                    <h1 className="big-text">Dinero recibido</h1>
                    <div className="cash-list">
                        <h2 className="cantidad-text">Cantidad recibida: </h2>
                        <h3 className="total-recived"> =$50.000</h3>
                        <h2 className="mediodepago-text">Medio de pago: </h2>
                        <h2 className="mediodepago-elejido"> Efectivo </h2>
                        <h2 className="estado-text">Estado: </h2>
                        <h2 className="estado"> = Ok </h2>
                        <h3 className="total-text">Total pagado:</h3>
                        <h3 className="total-cant-text"> =$32.000</h3>
                        <h3 className="devolver-text">Devuelto:</h3>
                        <h3 className="devolver-cant-text"> =$18.000</h3>
                    </div>
                    <button className="generar-pago">Salir</button>
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
                    <button className="btn btn-danger" id="cerrarsesion">Cerrar sesión</button>
                </div>
            </footer>
        </>
    );
}

export default Factura;
