import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_analisis.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



function Movimientos() {
    const navigate = useNavigate();
    const { cerrarSesion } = useContext(ContextoSesion);

    const usuario1 = localStorage.getItem('usuario');
    const tienda1 = localStorage.getItem('tienda');
    const codigo_invitacion1 = localStorage.getItem('codigo_invitacion');
    const rol1 = localStorage.getItem('rol');

    const usuario = JSON.parse(usuario1);
    const tienda = JSON.parse(tienda1);
    const codigo_invitacion = JSON.parse(codigo_invitacion1);
    const rol = JSON.parse(rol1);

    const handleCerrarSesion = () => {
        cerrarSesion();
    };
    const RolCrud = () => {
        if (rol === 1) {
            return (
                <button onClick={CRUD} className={`btn btn-danger`} id={styles.cerrarsesion}>CRUD
                </button>
            );
        }
    };
    const CRUD = () => {
        navigate('/crud/usuarios');
    };

    const [movimientos, setMovimientos] = useState([]);
    const [movimientosOriginales, setMovimientosOriginales] = useState([]);
    const Lista = useCallback(async () => {
        try {
            const respuesta = await axios.get(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.movimiento.php?listarPorTienda=${codigo_invitacion}`);
            if (respuesta.data) {
                setMovimientos(respuesta.data);
                setMovimientosOriginales(respuesta.data);
            } else {
                return null;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    }, [codigo_invitacion]);

    const buscar = (nombre) => {
        if (nombre === "") {
            setProductos(productosOriginales);
        } else {
            const productosFiltrados = productosOriginales.filter((Pro) => Pro[0].toLowerCase().includes(nombre.toLowerCase()));
            setProductos(productosFiltrados);
        }
    }

    const backbutton = () => {

        navigate(-1);
    };

    const exitbutton = () => {

        navigate('/inicio');
    };

    const vermovimientos = () => {

    };

    const [codInv, setCodInv] = useState("?");
    const CodInv = () => {
        if (rol === 2 || rol === 1) {
            setCodInv(codigo_invitacion);
        }
    };

    // eslint-disable-next-line
    useEffect(() => {
        const validador = () => {
            if (localStorage.getItem('usuario') === null) {
                navigate("/inicio");
            };
        };
        validador();
        Lista();
        CodInv();

    }, [navigate, Lista, codInv])
    return (
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>Movimientos</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton} to="/inicio">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </header>
            <div className={`container ${styles.container}`}>
                <div className={styles['txt-arriba']}>
                    <h1 className="d-inline-block">Movimientos</h1>
                </div>
            </div>
            <div className={styles.cuadradoverde}>
                <table className={styles["product-table"]}>
                    <thead className={styles["table-head"]}>
                        <tr className={styles.trgespro}>
                            <th className={styles.thgespro}>ID</th>
                            <th className={styles.thgespro}>Producto</th>
                            <th className={styles.thgespro}>Stock antes</th>
                            <th className={styles.thgespro}>Entradas</th>
                            <th className={styles.thgespro}>Salidas</th>
                            <th className={styles.thgespro}>Stock despues</th>
                            <th className={styles.thgespro}>Fecha del movimiento</th>
                        </tr>
                    </thead>
                    <tbody className={styles["table-body"]}>
                        {movimientos.map((Pro, index) => {
                            return (
                                <tr className={styles.trgespro} key={index}>
                                    <td className={`${styles.tdgespro} ${styles.tdnombre}`}>{Pro[0]}</td>
                                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[1]}</td>
                                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[2]}</td>
                                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[3]}</td>
                                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[4]}</td>
                                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[5]}</td>
                                    <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{Pro[6]}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <footer>
                <div className={styles.user}>
                    <h1 className={styles.username}>Usuario: "{usuario}"</h1>
                    <h1 className={styles.username}>Tienda: "{tienda}"</h1>
                    <h1 className={styles.username}>Codigo invitacion: "{codInv}"</h1>
                    <RolCrud />
                    <button
                        className="btn btn-danger"
                        id={styles.cerrarsesion}
                        onClick={handleCerrarSesion}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </footer>
        </>
    );
}

export default Movimientos;
