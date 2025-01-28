import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';

const RegistrarMovimiento = () => {
    const navigate = useNavigate();

    const [id_Movimiento, setid_Movimiento] = useState('');
    const [cantidad_despues, setcantidad_despues] = useState('');
    const [fecha_movimiento, setfecha_movimiento] = useState('');
    const [fecha_modificacion, setfecha_modificacion] = useState('');
    const [estado_despues, setestado_despues] = useState('');
    const [inventario_id_Inventario, setinventario_id_Inventario] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "id_Movimiento") setid_Movimiento(value);
        if (name === "cantidad_despues") setcantidad_despues(Number(value));
        if (name === "fecha_movimiento") setfecha_movimiento(Date(value)); // Convertir a número
        if (name === "fecha_modificacion") setfecha_modificacion(Date(value));    // Convertir a número
        if (name === "estado_despues") setestado_despues(value);
        if (name === "inventario_id_Inventario") setinventario_id_Inventario(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (id_Movimiento === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'id Movimiento' correctamente.",
            });
            return;
        }

        if (!cantidad_despues) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'cantidad despues'.",
            });
            return;
        }

        if (!fecha_movimiento || isNaN(fecha_movimiento) || fecha_movimiento <= 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese una fecha de movimiento válida.",
            });
            return;
        }

        if (!fecha_modificacion || isNaN(fecha_modificacion) || fecha_modificacion <= 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un fecha de modificacion válido.",
            });
            return;
        }

        if (!estado_despues) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'estado_despues'.",
            });
            return;
        }

        if (!inventario_id_Inventario) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'inventario_id_Inventario'.",
            });
            return;
        }


        try {
            // Realizamos la solicitud a la API
            const respuesta = await axios.post('http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.movimiento.php', {
                id_Movimiento,
                cantidad_despues,
                fecha_movimiento,
                fecha_modificacion,
                estado_despues,
                inventario_id_Inventario,
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
                        navigate('/crud/movimiento');
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
            setError('Error al registrar el movimiento');
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar el movimiento',
                text: 'Hubo un problema al intentar registrar el movimiento. Por favor, intente más tarde.',
            });
        }
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Registrar Movimiento</h1>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="id_Movimiento"
                                value={id_Movimiento}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={`${styles.label} label`} htmlFor="id_Movimiento">id Movimiento</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="inventario_id_Inventario"
                                value={inventario_id_Inventario}
                                onChange={handleChange}
                                id="inventario_id_Inventario"
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="inventario_id_Inventario">inventario_id_Inventario</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="cantidad_despues"
                                value={cantidad_despues}
                                onChange={handleChange}
                                id="cantidad_despues"
                                className={`${styles['input-text']} js-input`}
                                type="number"
                                required
                            />
                            <label className={styles.label} htmlFor="cantidad_despues">cantidad despues</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="fecha_movimiento"
                                value={fecha_movimiento}
                                onChange={handleChange}
                                id="fecha_movimiento"
                                className={`${styles['input-text']} js-input`}
                                type="Date"
                                required
                            />
                            <label className={styles.label} htmlFor="fecha_movimiento">fecha movimiento</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input
                                name="fecha_modificacion"
                                value={fecha_modificacion}
                                onChange={handleChange}
                                id="fecha_modificacion"
                                className={`${styles['input-text']} js-input`}
                                type="Date"
                                required
                            />
                            <label className={styles.label} htmlFor="fecha_modificacion">fecha modificacion</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="estado_despues"
                                value={estado_despues}
                                onChange={handleChange}
                                id="estado_despues"
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
                            />
                            <label className={styles.label} htmlFor="estado_despues">estado despues</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button
                                className={styles['submit-btn']}
                                type="button"
                                onClick={() => navigate('/crud/movimiento')}
                            >
                                Cancelar
                            </button>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="registrarMovimientoCrud" className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default RegistrarMovimiento;