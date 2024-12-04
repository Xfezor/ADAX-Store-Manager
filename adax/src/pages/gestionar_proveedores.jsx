import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_gestionar_proveedores.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const GestionarProveedores = () => {
    const navigate = useNavigate();


    const backbutton = () => {
        console.log("Volver atrás");
        navigate(-1);
    };

    const exitbutton = () => {
        console.log("Salir");
        navigate('/inicio');
    };
    const index = () => {
        console.log("Index");
        navigate('/index');
    }

    return (
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>Gestionar Productos</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton}>
                        <FontAwesomeIcon icon={faXmark} className={styles.exit} />
                    </button>
                </div>
            </header>
            <div className={styles.container}>
                <h1 className={styles["text-left"]}>Proveedores</h1>
                <form action="buscar_proveedor.php" method="post" className={styles.formgespro}>
                    <input type="text" className={styles["form-control"]} name="busqueda" placeholder="Escriba el nombre del proveedor o un producto" />
                    <button className="btn btn-danger" id={styles.buscar}>Buscar</button>
                </form>
            </div>
            <div className={styles.cuadradoverde}>

                <table className={`table table-warning ${styles.tablagespro}`}>
                    <thead className={styles.theadgespro}>
                        <tr className={styles.trgespro}>
                            <th style={{ fontWeight: "normal" }} data-dt-column="1" rowSpan="1" colSpan="1" className={`dt-orderable-asc dt-orderable-desc ${styles.thgespro}`} aria-label="Nombre: Activate to sort" tabIndex="0">
                                <span className="dt-column-title" role="button">Nombre</span><span className={`dt-column-order ${styles.spangespro}`}></span>
                            </th>
                            <th style={{ fontWeight: "normal" }} data-dt-column="2" rowSpan="1" colSpan="1" className={`dt-orderable-asc dt-orderable-desc ${styles.thgespro}`} aria-label="Precio_unit: Activate to sort" tabIndex="0">
                                <span className="dt-column-title" role="button">Precio_unit</span><span className={`dt-column-order ${styles.spangespro}`}></span>
                            </th>
                            <th style={{ fontWeight: "normal" }} data-dt-column="3" rowSpan="1" colSpan="1" className={`dt-orderable-asc dt-orderable-desc ${styles.thgespro}`} aria-label="Descripción: Activate to sort" tabIndex="0">
                                <span className="dt-column-title" role="button">Descripción</span><span className={`dt-column-order ${styles.spangespro}`}></span>
                            </th>
                            <th style={{ fontWeight: "normal" }} data-dt-column="4" rowSpan="1" colSpan="1" className={`dt-orderable-asc dt-orderable-desc ${styles.thgespro}`} aria-label="Marca: Activate to sort" tabIndex="0">
                                <span className="dt-column-title" role="button">Marca</span><span className={`dt-column-order ${styles.spangespro}`}></span>
                            </th>
                            <th style={{ fontWeight: "normal" }} data-dt-column="5" rowSpan="1" colSpan="1" className={`dt-orderable-asc dt-orderable-desc ${styles.thgespro}`} aria-label="Categoria: Activate to sort" tabIndex="0">
                                <span className="dt-column-title" role="button">Categoria</span><span className={`dt-column-order ${styles}`}></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <footer>
                <div className={styles.user}>
                    <h1 className={styles.username}>Usuario: "Pepito Peréz"</h1>
                    <h1 className={styles.username}>Tienda: "Los peregrinos"</h1>
                    <h1 className={styles.username}>Codigo invitacion: "TX435SX"</h1>
                    <button className="btn btn-danger" id={styles.cerrarsesion}>cerrar sesion</button>
                </div>
            </footer>
        </>
    )
}

export default GestionarProveedores