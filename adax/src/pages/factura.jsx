import React from "react";
import styles from '../styles/styles_factura.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
function Factura() {
    const navigate = useNavigate();


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
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>Factura</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton}>
                        <FontAwesomeIcon icon={faXmark} clasName={styles.exit} />
                    </button>
                </div>
            </header>

            <div className={styles.page}>
                <div className={styles['left-container']}>
                    <h1 className={styles['big-text']}>Dinero recibido</h1>
                    <div className={styles['cash-list']}>
                        <h2 className={styles['cantidad-text']}>Cantidad recibida: </h2>
                        <h3 className={styles['total-recived']}> =$50.000</h3>
                        <h2 className={styles['mediodepago-text']}>Medio de pago: </h2>
                        <h2 className={styles['mediodepago-elegido']}> Efectivo </h2>
                        <h2 className={styles['estado-text']}>Estado: </h2>
                        <h2 className={styles.estado}> = Ok </h2>
                        <h3 className={styles['total-text']}>Total pagado:</h3>
                        <h3 className={styles['total-cant-text']}> =$32.000</h3>
                        <h3 className={styles['devolver-text']}>Devuelto:</h3>
                        <h3 className={styles['devolver-cant-text']}> =$18.000</h3>
                    </div>
                    <button className={styles['generar-pago']}>Salir</button>
                </div>

                <div className={styles['right-container']}>
                    <h1 className={styles['big-text']}>Carrito</h1>
                    <div className={styles['cart-list']}>
                        <h2 className={styles['text-inside']}>test</h2>
                    </div>
                </div>
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

export default Factura;
