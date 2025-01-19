import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';

const RegistrarCliente = () => {
    const navigate = useNavigate();

    // Estados para los campos del cliente
    const [cliente_id, setCliente_id] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [estado, setEstado] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "cliente_id") setCliente_id(value);
        if (name === "nombre") setNombre(value);
        if (name === "apellido") setApellido(value);
        if (name === "correo") setCorreo(value);
        if (name === "telefono") setTelefono(value);
        if (name === "direccion") setDireccion(value);
        if (name === "estado") setEstado(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (cliente_id === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Cliente ID'.",
            });
            return;
        }

        if (!nombre) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Nombre'.",
            });
            return;
        }

        if (!apellido) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Apellido'.",
            });
            return;
        }

        if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un correo electrónico válido.",
            });
            return;
        }

        if (!telefono || telefono.length < 10) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un teléfono válido.",
            });
            return;
        }

        if (!direccion) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Dirección'.",
            });
            return;
        }

        if (!estado) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Estado'.",
            });
            return;
        }

        try {
            // Realizamos la solicitud a la API para registrar el cliente
            const respuesta = await axios.post('http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php', {
                cliente_id,
                nombre,
                apellido,
                correo,
                telefono,
                direccion,
                estado,
                registroCrud: "registroCrud",
            });

            console.log('Respuesta del servidor:', respuesta);  // Para depurar la respuesta

            // Verificar si la respuesta tiene la propiedad 'success'
            if (respuesta.data && respuesta.data.success) {
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
                // Si no tiene la propiedad 'success' o es falsa, mostramos un mensaje de error
                const errorMessage = respuesta.data.message || 'Error en el registro. Intente nuevamente.';
                setError(errorMessage);
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: errorMessage,
                });
            }
        } catch (err) {
            console.error('Error al hacer la solicitud:', err);
            setError('Error al registrar el cliente');
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar el cliente',
                text: 'Hubo un problema al intentar registrar el cliente. Por favor, intente más tarde.',
            });
        }
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Registrar Cliente</h1>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="cliente_id"
                                value={cliente_id}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={`${styles.label} label`} htmlFor="cliente_id">Cliente ID</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="nombre">Nombre</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="apellido"
                                value={apellido}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="apellido">Apellido</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="correo"
                                value={correo}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="email"
                                required
                            />
                            <label className={styles.label} htmlFor="correo">Correo Electrónico</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="telefono"
                                value={telefono}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="telefono">Teléfono</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="direccion"
                                value={direccion}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="direccion">Dirección</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input
                                name="estado"
                                value={estado}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="estado">Estado</label>
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
                            <input name="registrarclienteCrud" className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default RegistrarCliente;
