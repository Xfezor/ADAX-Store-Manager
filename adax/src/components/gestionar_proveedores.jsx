import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ContextoSesion } from '../context/sesion.jsx'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_gestionar_proveedores.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from "sweetalert2";


const GestionarProveedores = () => {
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
    const CRUD = () => {
        navigate('/crud/usuarios');
    }

    const backbutton = () => {

        navigate(-1);
    };

    const exitbutton = () => {

        navigate('/inicio');
    };
    // const cargando = async () => {
    //     let timerInterval;
    //     Swal.fire({
    //         title: "Cargando...",
    //         html: "Por favor espere, tiempo restante <b></b> milisegundos.",
    //         timer: 50,
    //         timerProgressBar: true,
    //         didOpen: () => {
    //             Swal.showLoading();
    //             const timer = Swal.getPopup().querySelector("b");
    //             timerInterval = setInterval(() => {
    //                 timer.textContent = `${Swal.getTimerLeft()}`;
    //             }, 100);
    //         },
    //         willClose: () => {
    //             clearInterval(timerInterval);
    //         }
    //     }).then((result) => {
    //         /* Read more about handling dismissals below */
    //         if (result.dismiss === Swal.DismissReason.timer) {
    //             productosAlert();
    //         }
    //     });
    // }
    const productosAlert = async () => {

        Swal.fire({
            title: "Lista de productos",
            html: `${productos.map((producto, index) => `<p key=${index}>${producto[0]}</p>`).join('<br>')}`,
            icon: "info",
            confirmButtonText: "Ok",
        });
    };
    var [productos, setProductos] = useState([]);
    const verProductos = (async (idproveedor) => {
        try {
            setProductos([]);
            const respuesta = await axios.get(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php?listarProductos=true&idproveedor=${idproveedor}`);
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

    const [proveedores, setProveedores] = useState([]);
    const Lista = useCallback(async () => {
        try {
            const respuesta = await axios.get(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php?listarPorTienda=true&codigo_invitacion=${codigo_invitacion}`);
            if (respuesta.data) {
                setProveedores(respuesta.data);
            } else {

                return null;
            }
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            return null;
        }
    }, [codigo_invitacion]);

    const [codInv, setCodInv] = useState("?");
    const CodInv = () => {
        if (rol === 2 || rol === 1) {
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
    }, [navigate, Lista, codInv])
    return (
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>Gestionar proveedores</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton}>
                        <FontAwesomeIcon icon={faXmark} className={styles.exit} />
                    </button>
                </div>
            </header>
            <div className={styles.container}>
                <h1 className={styles["text-left"]}>Proveedores</h1>
                <input type="text" className={styles["form-control"]} name="busqueda" placeholder="Escriba el nombre del proveedor o un producto" />
            </div>
            <div className={styles.cuadradoverde}>
                <table id="productos" className={styles['facturas-table']}>
                    <thead className={styles['table-head-gesven']}>
                        <tr className={styles.trventas}>
                            <th className={styles.thventas}>Nombre</th>
                            <th className={styles.thventas}>Telefono</th>
                            <th className={styles.thventas}>Correo</th>
                            <th className={styles.thventas}>Producto</th>
                        </tr>
                    </thead>
                    <tbody className={styles['table-body']}>
                        {proveedores.map((Fa, index) => (
                            <tr className={styles.trgespro} key={index}>
                                <td className={styles.tdventas}>{Fa[0]}</td>
                                <td className={styles.tdventas}>{Fa[1]}</td>
                                <td className={styles.tdventas}>{Fa[2]}</td>
                                <td className={styles.tdventas}>
                                    <button className={styles.detail_button} onClick={() => verProductos(Fa[3])}>Ver Productos</button>
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
    )
}

export default GestionarProveedores