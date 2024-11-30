import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/style_index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fontsource-variable/montserrat';
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import { faRocket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
const Index = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        console.log("Menu is now", !isOpen)
    };
    return (
        <>
            <header>
                <div className={styles.navbar} id="navbar">
                    <div className={styles.title}>
                        <img className={styles.logo} src='/img/nombrelogo.webp' alt="logo" />
                        <h1 className={styles.titulo}>Store Manager</h1>
                    </div>
                    <ul className={styles.links}>
                        <li><a className={styles.a} href="#home">Sobre ADAX</a></li>
                        <li><a className={styles.a} href="#hacer">¿Qué puedes hacer con ADAX?</a></li>
                        <li><a className={styles.a} href="#beneficios">Beneficios</a></li>
                        <li><a className={styles.a} href="#footer">Contacto</a></li>
                    </ul>
                    <div className={styles.btnes}>
                        <Link to="/iniciar_sesion" className={styles.alink}>
                            <FontAwesomeIcon icon={faRocket} className={styles.cohete}></FontAwesomeIcon>
                            Inicia Aquí
                        </Link>
                    </div>
                    <div className={styles.toggle_btn} onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                    </div>
                </div>
                <div className={`${styles.dropdown_menu} ${'dropdown_menu'} ${isOpen ? 'open' : ''}`} id="navbar2">
                    <ul className={`${styles.dropdown_ul} ${'dropdown_ul'}`}>
                        <li><a href="#home">Sobre ADAX</a></li>
                        <li><a href="#beneficios">Servicios</a></li>
                        <li><a href="#footer">Contacto</a></li>
                        <li><Link to="/registro" className={styles.btnes}>
                            <FontAwesomeIcon icon={faRocket} className={styles.cohete}></FontAwesomeIcon>
                            Inicia Aquí1
                        </Link>
                        </li>
                    </ul>
                </div>
            </header>
            <div className={styles['contenedor-carousel']} id="home">
                <div id="carouselExampleControls" className={`${styles.carousel} ${styles.slide}`} data-bs-ride="carousel">
                    <div className={styles['carousel-inner']}>
                        <div className={styles.overlay}></div>
                        <div className={`${styles['carousel-item']} ${styles.active}`}>
                            <img src="/img/mandarinas.webp" className="d-block w-100" alt="First slide" />
                        </div>
                        <div className={styles['carousel-item']}>
                            <img src="/img/ventafacil.webp" className="d-block w-100" alt="Second slide" />
                        </div>
                        <div className={styles['carousel-item']}>
                            <img src="/img/abierto.webp" className="d-block w-100" alt="Third slide" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    <div className={styles.cuadradito}>
                        <h1 className={styles['pregunta-queEs']}>¿Qué es ADAX Store Manager?</h1>
                        <p className={styles['text-queEs']}>Bienvenido a <b>ADAX STORE MANAGER</b> <br />
                            Solución integral para tu negocio.<br /> Te ayudamos a administrar tu negocio</p>
                    </div>
                </div>
            </div>
            <section className={styles.seccion2} id="hacer">
                <h1 className={styles.hacer}>¿Que podras hacer con ADAX Store Manager?</h1>
                <div className={styles['contenedor-seccion2']}>
                    <div className={styles.registrodeventas}>
                        <h5 className={styles.secciontitle}>Registro de Ventas</h5>
                        <p className={styles.textseccion2}>Control completo de todas tus transacciones comerciales</p>
                    </div>
                    <div className={styles.controlinv}>
                        <h5 className={styles.secciontitle}>Control de Inventario</h5>
                        <p className={styles.textseccion2}>Gestión eficiente de Stock y Productos
                        </p>
                    </div>
                    <div className={styles.mercancia}>
                        <h5 className={styles.secciontitle}>Mercancia</h5>
                        <p className={styles.textseccion2}>Seguimiento de entradas y salidas de productos</p>
                    </div>
                    <div className={styles.flujodecaja}>
                        <h5 className={styles.secciontitle}>Flujo de Caja</h5>
                        <p className={styles.textseccion2}>Monitoreo detallado de ingresos y gastos</p>
                    </div>
                </div>
            </section>
            <section id="beneficios" className={styles.seccion3}>
                <h1 className={styles.beneficios}>Beneficios de Usar Adax Store Manager</h1>
                <div className={styles['contenedor-seccion3']}>
                    <div className={styles.ahorro}>
                        <h5 className={styles.secciontitle}>Ahorro de Tiempo</h5>
                        <p> Automatiza tareas y reduce el tiempo de trabajo en tareas administrativas
                        </p>
                    </div>
                    <div className={styles.control}>
                        <h5 className={styles.secciontitle}>Control Total</h5>
                        <p>Manten el control de tu negocio desde cualquier lugar y a cualquier hora</p>
                    </div>
                    <div className={styles.reportes}>
                        <h5 className={styles.secciontitle}>Reportes</h5>
                        <p>Genera reportes detallados para tomar decisiones informadas</p>
                    </div>
                    <div className={styles.actualizado}>
                        <h5 className={styles.secciontitle} >Actualizado</h5>
                        <p>Tu negocio estara actualiado con las ultimas tecnologias en del desarrollo web</p>
                    </div>
                </div>
            </section>
            <div className={styles.siguientenivel}>
                <h3 className={styles.titulosec4}>¿Listo para Optimizar tu negocio?</h3>
                <p className={styles.textseccion3}>Se el primero en dar el paso a la evolución de tu negocio</p>
                <Link to="/iniciar_sesion" className={styles.botonfinal}>
                    <FontAwesomeIcon icon={faRocket} className={styles.cohete}>
                    </FontAwesomeIcon>
                    <p className={styles.alink2}>Inicia Aquí</p>
                </Link>
            </div>
            <script src="../javascript/index.js"></script>
            <footer id="footer">
                <div className="container">
                    <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
                        <div className="logofooter">
                            <img src="../img/logo.webp" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none" width="50" height="60" alt="" />
                            <p className="text-body-secondary">© 2024</p>
                        </div>
                        <div className={styles.integrantes}>
                            <h5>Integrantes</h5>
                            <ul className=" contenedorfooter nav flex-column">
                                <li className="nav-item mb-2">Brigitt Natalia Barbosa Gonzales</li>
                                <li className="nav-item mb-2">Damian Alejandro Camacho del Rio</li>
                                <li className="nav-item mb-2">Evelyn Stephanie Giraldo Torres</li>
                                <li className="nav-item mb-2">Santiago Martínez Molina</li>
                                <li className="nav-item mb-2">Sara Sofia Trujillo Mondragón</li>
                            </ul>
                        </div>

                        <div className={styles.correos}>
                            <h5>Correos</h5>
                            <ul className=" con nav flex-column">
                                <li className="nav-item mb-2">BarbozalesNalitt@gmail.com</li>
                                <li className="nav-item mb-2">damono06@gmail.com</li>
                                <li className="nav-item mb-2">Sgiraldotorres@gmail.com</li>
                                <li className="nav-item mb-2">martinotes95@gmail.com</li>
                                <li className="nav-item mb-2">Saragontrujia@gmail.com</li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </footer>
            <Outlet />
        </>
    )
}

export default Index;