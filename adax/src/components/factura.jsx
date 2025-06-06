import React, { useContext, useEffect, useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx';
import styles from '../styles/styles_factura.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import axios from 'axios';
import { ip, port, protocol } from '../utils/ipconfig.js';

function Factura() {
    const navigate = useNavigate();
    const location = useLocation();
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
    const exitbutton = async () => {
        try {
            const idVenta = localStorage.getItem('id_Venta');
            if (!idVenta) {
                console.error("ID de la venta no encontrado en localStorage");
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se encontró el ID de la venta. Intente nuevamente.",
                });
                return;
            }
            //Alerta de seguridad seguro que quieres anular la venta
            const result = await Swal.fire({
                title: '¿Está seguro de que desea anular la venta?',
                text: "Esta acción no se puede deshacer.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, anular venta',
                cancelButtonText: 'Cancelar',
            });
            if (!result.isConfirmed) {
                return; // Si el usuario cancela, no hace nadita
            }
            // Si el usuario confirma, procede a anular la venta con la siguinete llamado de la API para hacer PUT
            const respuesta = await axios.post(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.venta.php`, {
                modificarEstado: true,
                id_Venta: idVenta,
                EstadoVenta: "Anulada",
            });
            if (respuesta.data && respuesta.data.status) {
                Swal.fire({
                    icon: "success",
                    title: "Venta anulada",
                    text: "El estado de la venta se ha modificado correctamente.",
                });
                navigate('/inicio', { replace: true, state: null });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: respuesta.data.mensaje || "No se pudo modificar el estado de la venta.",
                });
            }
        } catch (error) {
            console.error('Error al modificar el estado de la venta:', error);
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor. Intente nuevamente.",
            });
        }
    };
    const { totalPagar, cantidadRecibida, devuelta, prodCarrito } = location.state || {};

    // Botón "Salir"
    const handleSalir = () => {
        // Limpia el carrito y redirige a ventas
        // localStorage.removeItem('prodCarrito');

        //Cambiar el estado a completado
        const idVenta = localStorage.getItem('id_Venta');
        if (!idVenta) {
            console.error("ID de la venta no encontrado en localStorage");
            return;
        }
        const actualizarEstadoVenta = async () => {
            try {
                const respuesta = await axios.post(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.venta.php`, {
                    modificarEstado: true,
                    id_Venta: idVenta,
                    EstadoVenta: "Completada",
                });
                if (respuesta.data && respuesta.data.status) {
                    // console.log("Estado de la venta modificado a completada");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: respuesta.data.mensaje || "No se pudo modificar el estado de la venta.",
                    });
                }
            } catch (error) {
                console.error('Error al modificar el estado de la venta:', error);
            }
        };
        actualizarEstadoVenta();
        
        // Actualizar Estado Pagado a la factura
        const ActualizarEstadoPagadoFactura = async () => {
            try {
                const respuesta = await axios.post(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php`, {
                    ActualizarEstadoPagado: true,
                    venta_id_Venta: idVenta,
                });
                if (respuesta.data && respuesta.data.success) {
                    navigate('/inicio', { replace: true, state: null });
                    Swal.fire({
                        icon: "success",
                        title: "Factura pagada",
                        text: "Venta y factura actualizadas correctamente.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: respuesta.data.mensaje || "No se pudo modificar el estado de la factura.",
                    });
                }
            } catch (error) {
                console.error('Error al modificar el estado de la factura:', error);
            }
        }
        ActualizarEstadoPagadoFactura();
    }
    const [codInv, setCodInv] = useState("?");
    const CodInv = () => {
        if (rol === 3 || rol === 1) {
            setCodInv(codigo_invitacion);
        }
    };
    useEffect(() => {
        const handlePopState = () => {
            navigate('/inicio', { replace: true, state: null });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    useEffect(() => {
        if (!location.state) {
            navigate('/ventas', { replace: true, state: null });
        }
    }, [location.state, navigate]);



    useEffect(() => {
        const validador = () => {
            if (localStorage.getItem('usuario') === null) {
                navigate("/iniciar_sesion");
            };
        };
        validador();
        CodInv();
    }, [navigate, codInv])

    return (
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>Factura</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton}>
                        <FontAwesomeIcon icon={faXmark} className={styles.exit} />
                    </button>
                </div>
            </header>

            <div className={styles.page}>
                <div className={styles['left-container']}>
                    <h1 className={styles['big-text']}>Dinero recibido</h1>
                    <div className={styles['cash-list']}>
                        <h2 className={styles['cantidad-text']}>Cantidad recibida: </h2>
                        <h3 className={styles['total-recived']}> =${cantidadRecibida}</h3>
                        <h2 className={styles['mediodepago-text']}>Medio de pago: </h2>
                        <h2 className={styles['mediodepago-elegido']}> Efectivo </h2>
                        <h2 className={styles['estado-text']}>Estado: </h2>
                        <h2 className={styles.estado}> = Ok </h2>
                        <h3 className={styles['total-text']}>Total pagado:</h3>
                        <h3 className={styles['total-cant-text']}> =${totalPagar}</h3>
                        <h3 className={styles['devolver-text']}>Devuelto:</h3>
                        <h3 className={styles['devolver-cant-text']}> =${devuelta}</h3>
                    </div>
                    <button className={styles['generar-pago']} onClick={handleSalir}>Salir</button>
                </div>

                <div className={styles['right-container']}>
                    <h1 className={styles['big-text']}>Carrito</h1>
                    <div className={styles['cart-list']}>
                        <table className={styles["product-table"]}>
                            <thead className={styles["table-head"]}>
                                <tr className={styles.trgespro}>
                                    <th className={styles.thgespro}>Nombre</th>
                                    <th className={styles.thgespro}>Marca</th>
                                    <th className={styles.thgespro}>Precio</th>
                                    <th className={styles.thgespro}>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody className={styles["table-body"]}>
                                {prodCarrito.map((ProD, index) => (
                                    <tr className={styles.trgespro} key={index}>
                                        <td className={`${styles.tdgespro} ${styles.tdnombre}`}>{ProD[1]}</td>
                                        <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD[2]}</td>
                                        <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD[3]}</td>
                                        <td className={`${styles.tdgespro} ${styles.tdmarca}`}>{ProD.cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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

export default Factura;
