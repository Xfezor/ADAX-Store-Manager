import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';

const RegistrarCliente = () => {
    const navigate = useNavigate();
    const [id_Cliente, setId_Cliente] = useState('');
    const [Documento, setDocumento] = useState('');
    const [Nombre1_Cliente, setNombre1_Cliente] = useState('');
    const [Nombre2_Cliente, setNombre2_Cliente] = useState('');
    const [Apellido1_Cliente, setApellido1_Cliente] = useState('');
    const [Apellido2_Cliente, setApellido2_Cliente] = useState('');
    const [Tipo_documento, setTipo_documento] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (id_Cliente === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Cliente ID'.",
            });
            return;
        }
        if (Documento === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Documento'.",
            });
            return;
        }
        if (!Nombre1_Cliente) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Nombre'.",
            });
            return;
        }

        if (!Apellido1_Cliente) {
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
            const respuesta = await axios.post('http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php', {
                id_Cliente,
                Documento,
                Nombre1_Cliente,
                Nombre2_Cliente,
                Apellido1_Cliente,
                Apellido2_Cliente,
                Tipo_documento,
                registroCrud: "registroCrud",
            });

            console.log('Respuesta de la api:', respuesta.data);  // Para depurar la respuesta

           
            if (respuesta.data.success) {
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
                console.log('Registro no exitoso', respuesta.data);
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
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="id_Cliente"
                                value={id_Cliente}
                                onChange={(e) => setId_Cliente(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={`${styles.label} label`} htmlFor="id_Cliente">Cliente ID</label>
                        </div>

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
                                value={Nombre1_Cliente}
                                onChange={(e) => setNombre1_Cliente(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={styles.label} htmlFor="Nombre1_Cliente">Nombre 1</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Nombre2_Cliente"
                                value={Nombre2_Cliente}
                                onChange={(e) => setNombre2_Cliente(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={styles.label} htmlFor="Nombre2_Cliente">Nombre 2</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Apellido1_Cliente"
                                value={Apellido1_Cliente}
                                onChange={(e) => setApellido1_Cliente(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={styles.label} htmlFor="Apellido1_Cliente">Apellido 1</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Apellido2_Cliente"
                                value={Apellido2_Cliente}
                                onChange={(e) => setApellido2_Cliente(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={styles.label} htmlFor="Apellido2_Cliente">Apellido 2</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
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
