import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';

const RegistrarProveedor = () => {
    const navigate = useNavigate();

    // Estados para los campos del proveedor
    const [idproveedor, setIdproveedor] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [id_tienda, setId_tienda] = useState('');
    const [error, setError] = useState(''); // Nuevo estado para manejar errores

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "idproveedor") setIdproveedor(value);
        if (name === "nombre") setNombre(value);
        if (name === "telefono") setTelefono(value);
        if (name === "email") setEmail(value);
        if (name === "id_tienda") setId_tienda(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (idproveedor === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Proveedor ID'.",
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

        if (!telefono) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'telefono'.",
            });
            return;
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un correo electrónico válido.",
            });
            return;
        }

        if (!id_tienda) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un id_tienda válido.",
            });
            return;
        }

        try {
            // Realizamos la solicitud a la API para registrar el proveedor
            const respuesta = await axios.post('http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php', {
                idproveedor,
                nombre,
                telefono,
                email,
                id_tienda,
                registroCrud: "registroCrud",
            });

            console.log('Respuesta del servidor:', respuesta);

            // Verificar si la respuesta tiene la propiedad 'success'
            if (respuesta.data && respuesta.data.success) {
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'El registro fue exitoso, puede continuar con el proceso.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/crud/proveedor'); // Redirige a la lista de proveedor
                    }
                });
            } else {
                const errorMessage = respuesta.data.message || 'Error en el registro. Intente nuevamente.';
                setError(errorMessage); // Actualizar el estado de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: errorMessage,
                });
            }
        } catch (err) {
            console.error('Error al hacer la solicitud:', err);
            setError('Error al registrar el proveedor'); // Actualizar el estado de error
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar el proveedor',
                text: 'Hubo un problema al intentar registrar el proveedor. Por favor, intente más tarde.',
            });
        }
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Registrar proveedor</h1>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar mensaje de error */}

                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="idproveedor"
                                value={idproveedor}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={`${styles.label} label`} htmlFor="idproveedor">proveedor ID</label>
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
                                name="telefono"
                                value={telefono}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="telefono">telefono</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="email"
                                value={email}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="email"
                                required
                            />
                            <label className={styles.label} htmlFor="email">email</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="id_tienda"
                                value={id_tienda}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="id_tienda">Id de la tienda</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button
                                className={styles['submit-btn']}
                                type="button"
                                onClick={() => navigate('/crud/proveedor')}
                            >
                                Cancelar
                            </button>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="registrarproveedorCrud" className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default RegistrarProveedor;
