import React from "react";
import styles from '../styles/styles_gestionar_ventas.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function GestionarVentas() {

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
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>Gestionar Ventas</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton} to="/inicio">
                        <FontAwesomeIcon icon={faXmark} className={styles.exit} />
                    </button>
                </div>
            </header>

            <div className={styles.container}>
                <h1 className={styles['text-left']}>Factura</h1>
                <input type="text" className={styles['form-control']} placeholder="Escriba un numero de venta o de producto" />
                <button className="btn btn-danger" id={styles.buscar}>Buscar</button>
            </div>
            <div className={styles.cuadradoverde}>
                <table id="productos" className={styles['facturas-table']}>
                    <thead className={styles['table-head']}>
                        <tr>
                            <th>ID Venta</th>
                            <th>ID producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody className={styles['table-body']}>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><form action="detalle_factura.php" method="POST"><input type="hidden" name="venta_ID" value="" /><button type="submit" className="btn btn-danger" id={styles.detalle}>Ver detalle</button></form></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <footer>
                <div className={styles.user}>
                    <h1 className={styles.username}>Usuario: "Pepito Peréz"</h1>
                    <h1 className={styles.username}>Tienda: "Los peregrinos"</h1>
                    <h1 className={styles.username}>Codigo invitacion: "TX435SX"</h1>
                    <a href="../Crud/tablas/tablas.php" className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
                    </a>
                    <button
                        className="btn btn-danger"
                        id={styles.cerrarsesion}
                        onClick=""
                    >
                        Cerrar sesión
                    </button>
                </div>
            </footer>
        </>
    );
}

export default GestionarVentas;