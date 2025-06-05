import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ContextoSesion } from '../context/sesion.jsx'
import styles from '../styles/styles_gestionar_ventas.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from "sweetalert2";
import { ip, port, protocol } from '../utils/ipconfig.js';


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
    const productosAlert = async () => {
        Swal.fire({
            title: "Lista de productos",
            html: `
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr>
                            <th style="border-bottom: 1px solid #ddd; padding: 8px;">Producto</th>
                            <th style="border-bottom: 1px solid #ddd; padding: 8px;">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productos.map((producto) => `
                            <tr>
                                <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto[0]}</td>
                                <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto[1]}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `,
            confirmButtonText: "Ok",
        });
    };
    var [productos, setProductos] = useState([]);
    const verProductos = (async (venta_id_Venta) => {
        try {
            setProductos([]);
            const respuesta = await axios.get(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php?listarProductos=true&codigo_invitacion=${codigo_invitacion}&venta_id_Venta=${venta_id_Venta}`);
            if (respuesta.data) {
                productos = (respuesta.data);
                productosAlert();
            } else {
                return null;
            }
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            return null;
        }
    });
    const [factura, setFactura] = useState([]);
    const [facturasOriginales, setFacturasOriginales] = useState([]);
    const Lista = useCallback(async () => {
        try {
            const respuesta = await axios.get(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php?listarTienda=true&codigo_invitacion=${codigo_invitacion}`);
            if (respuesta.data) {
                setFactura(respuesta.data);
                setFacturasOriginales(respuesta.data);
            } else {

                return null;
            }
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            return null;
        }
    },[codigo_invitacion]);
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

        navigate(-1);
    };

    const exitbutton = () => {
        navigate('/inicio');
    };

    const [codInv, setCodInv] = useState("?");
    const CodInv = () => {
      if (rol === 3 || rol === 1) {
        setCodInv(codigo_invitacion);
      }
    };
    useEffect(() => {
        const validador = () => {
            if (localStorage.getItem('usuario') === null) {
                navigate("/iniciar_sesion");
            };
        };
        validador();
        Lista();
        CodInv();
    }, [navigate,Lista,codInv])
    return (
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>Gestionar Facturas</h1>
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
                            <th className={styles.thventas}>Cantidad Productos</th>
                            <th className={styles.thventas}>Precio</th>
                            <th className={styles.thventas}>Estado</th>
                            <th className={styles.thventas}>Productos</th>
                        </tr>
                    </thead>
                    <tbody className={styles['table-body']}>
                        {factura.map((Fa, index) => (
                            <tr className={styles.trgespro} key={index}>
                                <td className={styles.tdventas}>{Fa[0]}</td>
                                <td className={styles.tdventas}>{Fa[3]}</td>
                                <td className={styles.tdventas}>{Fa[4]}</td>
                                <td className={styles.tdventas}>{Fa[5]}</td>
                                <td className={styles.tdventas}>
                                    <button className={styles.detail_button} onClick={() => verProductos(Fa[0])}>Ver Productos</button>
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

export default GestionarVentas;