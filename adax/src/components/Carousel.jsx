import React from "react";
import styles from '../styles/style_index.module.css'

const Carousel = () => {
    return (
        <div className={`contenedor-carousel`} id="home">
            <div id="carouselExampleAutoplaying" className={`carousel slide ${styles.carousel}`} data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                <div className={styles.overlay}></div>
                    <div className={`carousel-item active`}>
                        <img src="../../../img/abierto.webp" className={`d-block w-100`} alt="Abierto" />
                    </div>
                    <div className={`carousel-item ${styles["carousel-item"]}`}>
                        <img src="../../../img/mandarinas.webp" className={`d-block w-100 ${styles.img}`} alt="Mandarinas" />
                    </div>
                    <div className={`carousel-item ${styles["carousel-item"]}`}>
                        <img src="../../../img/ventafacil.webp" className={`d-block w-100 ${styles.img}`} alt="venta Facil" />
                    </div>
                    <div className={styles.cuadradito}>
                        <h1 className={styles['pregunta-queEs']}>¿Qué es ADAX Store Manager?</h1>
                        <p className={styles['text-queEs']}>Bienvenido a <b>ADAX STORE MANAGER</b> <br />
                            Solución integral para tu negocio.<br /> Te ayudamos a administrar tu negocio</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Carousel