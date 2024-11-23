import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style_index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fontsource-variable/montserrat';
import { Outlet, Link, NavLink } from "react-router-dom";
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
                <div className="navbar" id="navbar">
                    <div className="title">
                        <img className="logo" src='/img/nombrelogo.webp' alt="" />
                        <h1 className="titulo">Store Manager</h1>
                    </div>
                    <ul className="links">
                        <li><a href="#home">Sobre ADAX</a></li>
                        <li><a href="#hacer">¿Qué puedes hacer con ADAX?</a></li>
                        <li><a href="#beneficios">Beneficios</a></li>
                        <li><a href="#footer">Contacto</a></li>
                    </ul>
                    <Link to="/iniciar_sesion" className="action btn">
                        <FontAwesomeIcon icon={faRocket} className='cohete'></FontAwesomeIcon>
                        Inicia Aquí
                    </Link>
                    <div className="toggle_btn" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                    </div>
                </div>
                <div className={`dropdown_menu ${isOpen ? 'open' : ''}`} id="navbar2">
                    <ul className="dropdown_ul">
                        <li><a href="#home">Sobre ADAX</a></li>
                        <li><a href="#beneficios">Servicios</a></li>
                        <li><a href="#footer">Contacto</a></li>
                        <li><Link to="/iniciar_sesion" className="action btn">
                        <FontAwesomeIcon icon={faRocket} className='cohete'></FontAwesomeIcon>
                        Inicia Aquí
                    </Link>
                    </li>
                    </ul>
                </div>
            </header>
            <div className="contenedor-carousel" id="home">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="overlay"></div>
                        <div className="carousel-item active">
                            <img src="/img/mandarinas.webp" className="d-block w-100" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img src="/img/ventafacil.webp" className="d-block w-100" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img src="/img/abierto.webp" className="d-block w-100" alt="Third slide" />
                        </div>
                    </div>
                    <div className="cuadradito">
                            <h1 className="pregunta-queEs"> ¿Qué es ADAX Store Manager?</h1>
                            <p className="text-queEs">Bienvenido a <b>ADAX STORE MANAGER</b> <br />
                                Solución integral para tu negocio.<br /> Te ayudamos a administrar tu negocio</p>
                        </div>
                </div>
            </div>
            <section className="seccion2" id="hacer">
                <h1 className="hacer">¿Que podras hacer con ADAX Store Manager?</h1>
                <div className="contenedor-seccion2">
                    <div className="registrodeventas">
                        <h5 className="secciontitle">Registro de Ventas</h5>
                        <p className="textseccion2">Control completo de todas tus transacciones comerciales</p>
                    </div>
                    <div className="controlinv">
                        <h5 className="secciontitle">Control de Inventario</h5>
                        <p className="textseccion2">Gestión eficiente de Stock y Productos
                        </p>
                    </div>
                    <div className="mercancia">
                        <h5 className="secciontitle">Mercancia</h5>
                        <p className="textseccion2">Seguimiento de entradas y salidas de productos</p>
                    </div>
                    <div className="flujodecaja">
                        <h5 className="secciontitle">Flujo de Caja</h5>
                        <p className="textseccion2">Monitoreo detallado de ingresos y gastos</p>
                    </div>
                </div>
            </section>
            <section id="beneficios" className="seccion3">
                <h1 className="beneficios">Beneficios de Usar Adax Store Manager</h1>
                <div className="contenedor-seccion3">
                    <div className="ahorro">
                        <h5>Ahorro de Tiempo</h5>
                        <p> Automatiza tareas y reduce el tiempo de trabajo en tareas administrativas
                        </p>
                    </div>
                    <div className="control">
                        <h5>Control Total</h5>
                        <p>Manten el control de tu negocio desde cualquier lugar y a cualquier hora</p>
                    </div>
                    <div className="reportes">
                        <h5>Reportes</h5>
                        <p>Genera reportes detallados para tomar decisiones informadas</p>
                    </div>
                    <div className="actualizado">
                        <h5>Actualizado</h5>
                        <p>Tu negocio estara actualiado con las ultimas tecnologias en del desarrollo web</p>
                    </div>
                </div>
            </section>
            <div className="siguientenivel">
                <h3 className="titulosec4">¿Listo para Optimizar tu negocio?</h3>
                <p className="textseccion3">Se el primero en dar el paso a la evolución de tu negocio</p>
                <Link to="/iniciar_sesion" className="botonfinal"><FontAwesomeIcon icon={faRocket} className='cohete'></FontAwesomeIcon> Inicia Aquí </Link>
            </div>
            <script src="../javascript/index.js"></script>
            <footer id="footer">
                <div className="container">
                    <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
                        <div className="logofooter">
                            <img src="../img/logo.webp" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none" width="50" height="60" />
                            <p className="text-body-secondary">© 2024</p>
                        </div>
                        <div className=" integrantes">
                            <h5>Integrantes</h5>
                            <ul className=" contenedorfooter nav flex-column">
                                <li className="nav-item mb-2">Brigitt Natalia Barbosa Gonzales</li>
                                <li className="nav-item mb-2">Damian Alejandro Camacho del Rio</li>
                                <li className="nav-item mb-2">Evelyn Stephanie Giraldo Torres</li>
                                <li className="nav-item mb-2">Santiago Martínez Molina</li>
                                <li className="nav-item mb-2">Sara Sofia Trujillo Mondragón</li>
                            </ul>
                        </div>

                        <div className="correos">
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