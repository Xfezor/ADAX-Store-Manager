import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';
import { ip, port } from '../../../utils/ipconfig.js';

const RegistrarCliente = () => {
    const navigate = useNavigate();
    const [Documento, setDocumento] = useState('');
    const [Tipo_documento, setTipo_documento] = useState('');
    const [NombreCliente, setNombre_Cliente] = useState('');
    const [ApellidoCliente, setApellidoCliente] = useState('');
    const [Correo, setCorreo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(
            Documento,
            Tipo_documento,
            NombreCliente,
            ApellidoCliente,
            Correo
        )

        // Validaciones
        if (Documento === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Documento'.",
            });
            return;
        }
        if (!NombreCliente) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Nombre'.",
            });
            return;
        }

        if (!ApellidoCliente) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Apellido'.",
            });
            return;
        }

        if (!Tipo_documento) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un tipo de documento válido.",
            });
            return;
        }

        try {
            // Realizamos la solicitud a la API para registrar el cliente
            const respuesta = await axios.post(
                `${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php`,
                {
                    Documento,
                    Tipo_documento,
                    NombreCliente,
                    ApellidoCliente,
                    Correo,
                    registroCrud: "registroCrud",
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Para depurar la respuesta
            console.log('Respuesta del backend:', respuesta.data);
            if (respuesta.data) {
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'El registro fue exitoso, puede continuar con el proceso.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/crud/cliente');  // Redirige a la lista de clientes
                    }
                });
            } else {
                console.error('Error en el registro:', respuesta.data);
                setError(respuesta.data.message || 'Error desconocido');
            }
        } catch (err) {
            console.error(err);
            setError('Error al registrar la cliente');
        }
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Registrar Cliente</h1>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Documento"
                                value={Documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="Documento">Documento</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Nombre1_Cliente"
                                value={NombreCliente}
                                onChange={(e) => setNombre_Cliente(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"

                            />
                            <label className={styles.label} htmlFor="Nombre1_Cliente">Nombre</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="ApellidoCliente"
                                value={ApellidoCliente}
                                onChange={(e) => setApellidoCliente(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"

                            />
                            <label className={styles.label} htmlFor="Apellido1_Cliente">Apellido</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Tipo_documento"
                                value={Tipo_documento}
                                onChange={(e) => setTipo_documento(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"

                            />
                            <label className={styles.label} htmlFor="Tipo_documento">Tipo de documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Correo"
                                value={Correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="email"
                            />
                            <label className={styles.label} htmlFor="Correo">Correo</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button
                                className={styles['submit-btn']}
                                type="button"
                                onClick={() => navigate('/crud/cliente')}
                            >
                                Cancelar
                            </button>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="registrocrud" className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default RegistrarCliente;
