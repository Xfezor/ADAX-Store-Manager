import React from "react";
import styles from '../styles/styles_detalle_factura.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
function DetalleFactura() {

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
                        <h1 className={styles.title}>Factura</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton} to="/inicio">
                        <FontAwesomeIcon icon={faXmark} className={styles.exit} />
                    </button>
                </div>
            </header>
            <div className={styles.container}>
                <h1 className={styles['text-left']}>Detalles</h1>
            </div>
            <div className={`${styles.cuadrado1} text-center`}>
                <div>
                    <h3 className={`${styles.numf} d-inline-block`}>Numero de venta: </h3>
                    <h3 className={`${styles.idf} d-inline-block`}>test</h3>
                </div>
                <div>
                    <h3 className={`${styles.valftxt} d-inline-block`}>Valor de la factura: </h3>
                    <h3 className={`${styles.valf} d-inline-block`}>test</h3>
                </div>
                <div>
                    <h3 className={`${styles.fechaftxt} d-inline-block`}>Fecha de la factura: </h3>
                    <h3 className={`${styles.fechaf} d-inline-block`}>test</h3>
                </div>
                <div>
                    <h3 className={`${styles.horaftxt} d-inline-block`}>Hora de facturación: </h3>
                    <h3 className={`${styles.horaf} d-inline-block`}>test</h3>
                </div>
                <div>
                    <h3 className={`${styles.statusftxt} d-inline-block`}>Estado: </h3>
                    <h3 className={`${styles.statusf} d-inline-block`}>test</h3>
                </div>
                <div>
                    <h3 className={`${styles.cantidadtxt} d-inline-block`}>Cantidad productos: </h3>
                    <h3 className={`${styles.cantidad} d-inline-block`}>test</h3>
                </div>
            </div>
            <div className={styles.container}>
                <h1 className={styles['text-left']}>Productos vendidos</h1>
            </div>
            <div className={styles.cuadrado2}>
                <table id="productos" className={styles['product-table']}>
                    <thead className={styles['table-head']}>
                        <tr className={styles.trdefac}>
                            <th className={styles.thdecfac}>ID Producto</th>
                            <th className={styles.thdecfac}>Nombre</th>
                            <th className={styles.thdecfac}>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody className={styles['table-body']}>
                        <tr className={styles.trdefac}>
                            <td className={styles.tddefac}></td>
                            <td className={styles.tddefac}></td>
                            <td className={styles.tddefac}></td>
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

export default DetalleFactura;