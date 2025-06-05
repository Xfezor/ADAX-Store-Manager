import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ContextoSesion } from '../context/sesion.jsx'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_gestionar_proveedores.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faListSquares } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from "sweetalert2";
import { ip, port } from '../utils/ipconfig.js';


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

    const eliminarAlerta = (id) => {
        // verificar rol antes de eliminar 
        if (rol === 3) {
            Swal.fire({
                title: 'Acceso Denegado',
                text: 'No tienes permiso para agregar proveedores.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return null;
        }
        Swal.fire({
            title: "Eliminar proveedor",
            html: "¿Está seguro de que desea eliminar este proveedor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Eliminar(id);
                Swal.fire("Eliminado!", "", "success");
            }
        });
    }
    const Eliminar = async (id) => {
        try {
            const respuesta = await axios.delete(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php?eliminar=${id}`);
            if (respuesta.data.respuesta) {
                Lista();
            } else {
                console.log('no exitoso', respuesta.data.respuesta)
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    const backbutton = () => {
        navigate(-1);
    };

    const exitbutton = () => {

        navigate('/inicio');
    };
    const buscar = (nombre) => {
        if (nombre === "") {
            setProductos(proveedoresOriginal);
        } else {
            const proveedoresFiltrados = proveedoresOriginal.filter((Fa) => Fa[0].toLowerCase().includes(nombre.toLowerCase()));
            setProveedores(proveedoresFiltrados);
        }
    }

    const productsadd = async () => {
        if (rol === 3) {
            Swal.fire({
                title: 'Acceso Denegado',
                text: 'No tienes permiso para agregar proveedores.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        Swal.fire({
            title: "Añadir nuevo proveedor",
            html: `
                <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
                <input type="tel" id="telefono" class="swal2-input" placeholder="Teléfono">
                <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico">
            `,
            showCancelButton: true,
            confirmButtonText: "Agregar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const telefono = parseInt(document.getElementById('telefono').value);
                const email = document.getElementById('email').value;

                if (!nombre || !telefono || !email) {
                    Swal.showValidationMessage('Por favor llene todos los campos');
                    return false;
                }
                console.log(telefono);
                return { nombre, telefono, email };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { nombre, telefono, email } = result.value;
                agregarProveedor(nombre, parseInt(telefono), email);
                Swal.fire("Agregado!", "", "success");
            }
            else if (result.isDismissed) {
                Swal.fire("Cancelado", "", "info");
            }

        });
    };

    const agregarProveedor = async (nombre, telefono, email) => {
        try {
            const respuesta = await axios.post(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php`,
                {
                    agregarProveedor: true,
                    nombre: nombre,
                    telefono: telefono,
                    email: email,
                    codigo_invitacion: codigo_invitacion    
                }
            );
            if (respuesta.data.success) {
                Lista();
            } else {

                return null;
            }
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            return null;
        }
        Lista();

    };

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
            const respuesta = await axios.get(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php?listarProductos=true&idproveedor=${idproveedor}`);
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
    const [proveedoresOriginal, setProveedoresOriginal] = useState([]);
    const Lista = useCallback(async () => {
        try {
            const respuesta = await axios.get(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php?listarPorTienda=true&codigo_invitacion=${codigo_invitacion}`);
            if (respuesta.data) {
                setProveedores(respuesta.data);
                setProveedoresOriginal(respuesta.data);
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
                <div className='d-flex justify-content-between align-items-center mb-3 pe-3'>
                    <h1 className={styles["text-left"]}>Proveedores</h1>
                    <button
                        className="btn btn-danger d-inline-block"
                        id={styles.movimientos}
                        name="Buscar"
                        onClick={productsadd}
                    >
                        Añadir proveedor
                    </button>
                </div>

                <input type="text" className={styles["form-control"]} name="busqueda" placeholder="Escriba el nombre del proveedor o un producto" onChange={(e) => buscar(e.target.value)} />
            </div>
            <div className={styles.cuadradoverde}>
                <table id="productos" className={styles['facturas-table']}>
                    <thead className={styles['table-head-gesven']}>
                        <tr className={styles.trventas}>
                            <th className={styles.thventas}>Nombre</th>
                            <th className={styles.thventas}>Telefono</th>
                            <th className={styles.thventas}>Correo</th>
                            <th className={styles.thventas}>Producto</th>
                            <th className={styles.thventas}>Acciones</th>
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
                                <td className={styles.tdventas}>
                                    <button className={styles.detail_button} onClick={() => eliminarAlerta(Fa[3])}>Eliminar</button>
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