import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ContextoSesion } from '../context/sesion.jsx'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles_gestionar_clientes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from "sweetalert2";
import { ip, port } from '../utils/ipconfig.js';

const GestionarClientes = () => {
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
    const [clientes, setClientes] = useState([]);
    const [clientesOriginal, setClientesOriginal] = useState([]);
    const Lista = useCallback(async () => {
        try {
            const respuesta = await axios.get(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php?listarClientesTienda=true&codigo_invitacion=${codigo_invitacion}`);
            if (respuesta.data) {
                setClientes(respuesta.data);
                setClientesOriginal(respuesta.data);
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
    const buscar = (nombre) => {
        if (nombre === "") {
            setClientes(clientesOriginal);
        } else {
            const clientesFiltrados = clientesOriginal.filter((Fa) => Fa[2].toLowerCase().includes(nombre.toLowerCase()));
            setClientes(clientesFiltrados);
        }
    }
    const anadirCliente = async () => {
        Swal.fire({
            title: "Añadir nuevo Cliente",
            html: `
                <input type="number" id="Documento" class="swal2-input" placeholder="Documento">
                <input type="text" id="Tipo_documento" class="swal2-input"  placeholder="Tipo Documento">
                <input type="text" id="NombreCliente" class="swal2-input"  placeholder="Nombre Cliente">
                <input type="text" id="ApellidoCliente" class="swal2-input"  placeholder="Apellido Cliente">
                <input type="email" id="Correo" class="swal2-input"  placeholder="Correo Electrónico">
            `,
            showCancelButton: true,
            confirmButtonText: "Agregar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const Documento = document.getElementById('Documento').value;
                const Tipo_documento = document.getElementById('Tipo_documento').value;
                const NombreCliente = document.getElementById('NombreCliente').value;
                const ApellidoCliente = document.getElementById('ApellidoCliente').value;
                const Correo = document.getElementById('Correo').value;

                if (!Documento || !Tipo_documento || !NombreCliente || !ApellidoCliente || !Correo) {
                    Swal.showValidationMessage('Por favor llene todos los campos');
                    return false;
                }
                return { Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo } = result.value;
                agregarCliente(Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo);
                Swal.fire("Agregado!", "", "success");
                Lista();
            }
        });
    };

    const agregarCliente = async (Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo) => {
        try {
            const respuesta2 = await axios.post(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php`, {
                registroCliente: true,
                Documento: Documento,
                Tipo_documento: Tipo_documento,
                NombreCliente: NombreCliente,
                ApellidoCliente: ApellidoCliente,
                Correo: Correo,
            });
            if (respuesta2.data && respuesta2.status === 200 && respuesta2.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente registrado',
                    text: 'Cliente registrado exitosamente.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'El cliente no se pudo registrar',
                    text: 'No ha sido posible registrar el cliente, por favor intentelo de nuevo' + respuesta2.data.error
                });
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    const actualizarClientes = async (cliente) => {
        const { Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo } = cliente;

        Swal.fire({
            title: "Actualizar cliente",
            html: `
                <input type="number" id="Documento" class="swal2-input" style="color: gray;" value="${Documento}" readonly>
                <input type="text" id="Tipo_documento" class="swal2-input" value="${Tipo_documento}">
                <input type="text" id="NombreCliente" class="swal2-input" value="${NombreCliente}">
                <input type="text" id="ApellidoCliente" class="swal2-input" value="${ApellidoCliente}">
                <input type="email" id="Correo" class="swal2-input" value="${Correo}">
            `,
            showCancelButton: true,
            confirmButtonText: "Actualizar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const Documento = document.getElementById('Documento').value;
                const Tipo_documento = document.getElementById('Tipo_documento').value;
                const NombreCliente = document.getElementById('NombreCliente').value;
                const ApellidoCliente = document.getElementById('ApellidoCliente').value;
                const Correo = document.getElementById('Correo').value;

                if (!Tipo_documento || !NombreCliente || !ApellidoCliente || !Correo) {
                    Swal.showValidationMessage('Por favor llene todos los campos');
                    return false;
                }
                return { Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo } = result.value;
                actuaCliente(Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo);
                Swal.fire("Actualizado!", "", "success");
                Lista();
            }
        });
    };
    const actuaCliente = async (Documento, Tipo_documento, NombreCliente, ApellidoCliente, Correo) => {
        try {
            const respuesta3 = await axios.put(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php`, {
                actualizar: true,
                Documento: Documento,
                Tipo_documento: Tipo_documento,
                NombreCliente: NombreCliente,
                ApellidoCliente: ApellidoCliente,
                Correo: Correo,
            });

            if (respuesta3.data && respuesta3.status === 200 && respuesta3.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente actualizado',
                    text: 'Cliente actualizado exitosamente.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'El cliente no se pudo actualizar',
                    text: 'No ha sido posible actualizar el cliente, por favor intentelo de nuevo' + respuesta3.data.error
                });
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    const elimiarClientes = async (Documento) => {
        if (rol === 3) {
            Swal.fire({
                icon: 'error',
                title: 'Acción no permitida',
                text: 'No tienes permisos para eliminar clientes.'
            });
            return;
        }


        Swal.fire({
            title: "¿Estás seguro de eliminar este cliente?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const respuesta4 = await axios.delete(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php`, {
                        data: {
                            eliminar: Documento
                        }
                    });
                    if (respuesta4.data && respuesta4.status === 200 && respuesta4.data.success) {
                        Swal.fire("Eliminado!", "", "success");
                        Lista();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'El cliente no se pudo eliminar',
                            text: 'No ha sido posible eliminar el cliente, por favor intentelo de nuevo' + respuesta4.data.error
                        });
                        console.error('Error al eliminar el cliente:', respuesta4.data.error);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

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
                        <h1 className={styles.title}>Gestionar clientes</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton}>
                        <FontAwesomeIcon icon={faXmark} className={styles.exit} />
                    </button>
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles["tableTitle-Button"]} style={{ display: 'inline-flex' }}>
                    <h1 className={styles["text-left"]}>Clientes</h1>
                    <button className={`btn btn-danger ${styles["btn-anadir"]}`} onClick={anadirCliente}>
                        Agregar cliente
                    </button>
                </div>
                <input type="text" className={styles["form-control"]} name="busqueda" placeholder="Escriba el nombre del proveedor o un producto" onChange={(e) => buscar(e.target.value)} />
            </div>
            <div className={styles.cuadradoverde}>
                <table id="productos" className={styles['facturas-table']}>
                    <thead className={styles['table-head-gesven']}>
                        <tr className={styles.trventas}>
                            <th className={styles.thventas}>Documento</th>
                            <th className={styles.thventas}>Tipo documento</th>
                            <th className={styles.thventas}>Nombre</th>
                            <th className={styles.thventas}>Apellido</th>
                            <th className={styles.thventas}>Correo</th>
                            <th className={styles.thventas}>Editar</th>
                            <th className={styles.thventas}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className={styles['table-body']}>
                        {clientes.map((Fa, index) => (
                            <tr className={styles.trgespro} key={index}>
                                <td className={styles.tdventas}>{Fa[0]}</td>
                                <td className={styles.tdventas}>{Fa[1]}</td>
                                <td className={styles.tdventas}>{Fa[2]}</td>
                                <td className={styles.tdventas}>{Fa[3]}</td>
                                <td className={styles.tdventas}>{Fa[4]}</td>
                                <td className={styles.tdventas}>
                                    <button className={styles.detalle_button} onClick={() => actualizarClientes(
                                        {
                                            Documento: Fa[0],
                                            Tipo_documento: Fa[1],
                                            NombreCliente: Fa[2],
                                            ApellidoCliente: Fa[3],
                                            Correo: Fa[4]
                                        }
                                    )}>
                                        Editar
                                    </button>
                                </td>
                                <td className={styles.tdventas}>
                                    <button className={styles.detalle_button} onClick={() => elimiarClientes(Fa[0])}>
                                        Eliminar
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

export default GestionarClientes;