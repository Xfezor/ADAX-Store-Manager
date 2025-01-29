import React, { useContext, useEffect, useState } from 'react';
import { ContextoSesion } from '../context/sesion.jsx'
import styles from '../styles/styles_gestionar_ventas.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function GestionarVentas() {

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
    }

    const [factura, setFactura] = useState([]);
    const [facturasOriginales, setFacturasOriginales] = useState([]);
    const Lista = async () => {
        try {
            const respuesta = await axios.post(
                'http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php',
                {
                    listarTienda: true,
                    codigo_invitacion: codigo_invitacion,
                }
            );
            if (respuesta.data) {
                setFactura(respuesta.data);
                setFacturasOriginales(respuesta.data);
            } else {
                console.log('Listado no exitoso:', respuesta.data);
                return null;
            }
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            return null;
        }
    }
    const buscar = (valor) => {
        if (valor === "") {
            setFactura(facturasOriginales);
        } else {
            const facturasFiltrados = facturasOriginales.filter((Fa) => {
                const idVenta = String(Fa[0]).toLowerCase();
                const idProducto = String(Fa[1]).toLowerCase();
                return idVenta.includes(valor.toLowerCase()) || idProducto.includes(valor.toLowerCase());
            });
            setFactura(facturasFiltrados);
        }
    };

    const CRUD = () => {
        navigate('/crud/usuarios');
    }

    const backbutton = () => {
        console.log("Volver atrás");
        navigate(-1);
    };

    const exitbutton = () => {
        console.log("Salir");
        navigate('/inicio');
    };

    useEffect(() => {
        const validador = () => {
            if (localStorage.getItem('usuario') === null) {
                navigate("/iniciar_sesion");
            };
        };
        validador();
        Lista();
    }, [navigate])
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
                <input type="text" onChange={(e) => buscar(e.target.value)} className={styles['form-control']} placeholder="Escriba un numero de venta o de producto" />
            </div>
            <div className={styles.cuadradoverde}>
                <table id="productos" className={styles['facturas-table']}>
                    <thead className={styles['table-head-gesven']}>
                        <tr className={styles.trventas}>
                            <th className={styles.thventas}>ID Venta</th>
                            <th className={styles.thventas}>ID producto</th>
                            <th className={styles.thventas}>Cantidad</th>
                            <th className={styles.thventas}>Precio</th>
                            <th className={styles.thventas}>Estado</th>
                            <th className={styles.thventas}>Detalle</th>
                        </tr>
                    </thead>
                    <tbody className={styles['table-body']}>
                        {factura.map((Fa, index) => (
                            <tr className={styles.trgespro} key={index}>
                                <td className={styles.tdventas}>{Fa[0]}</td>
                                <td className={styles.tdventas}>{Fa[1]}</td>
                                <td className={styles.tdventas}>{Fa[2]}</td>
                                <td className={styles.tdventas}>{Fa[3]}</td>
                                <td className={styles.tdventas}>{Fa[4]}</td>
                                <td className={styles.tdventas}>
                                    <button type="submit" className="btn btn-danger" id={styles.detalle}>
                                        Ver detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer>
                <div className={styles.user}>
                    <h1 className={styles.username}>Usuario: "{usuario}"</h1>
                    <h1 className={styles.username}>Tienda: "{tienda}"</h1>
                    <h1 className={styles.username}>Codigo invitacion: "{codigo_invitacion}"</h1>
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

export default GestionarVentas;