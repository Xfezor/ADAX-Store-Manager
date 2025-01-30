import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';

const RegistrarMovimiento = () => {
    const navigate = useNavigate();

    const [id_Movimiento, setId_Movimiento] = useState('');
    const [cantidad_despues, setCantidad_Despues] = useState('');
    const [fecha_movimiento, setFecha_Movimiento] = useState('');
    const [fecha_modificacion, setFecha_Modificacion] = useState('');
    const [estado_despues, setEstado_Despues] = useState('');
    const [inventario_id_Inventario, setInventario_Id_Inventario] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Obtener valores del formulario
        var id_Movimiento2 = document.getElementById("id_Movimiento").value;
        var cantidad_despues2 = document.getElementById("cantidad_despues").value;
        var fecha_movimiento2 = document.getElementById("fecha_movimiento").value;
        var fecha_modificacion2 = document.getElementById("fecha_modificacion").value;
        var estado_despues2 = document.getElementById("estado_despues").value;
        var inventario_id_Inventario2 = document.getElementById("inventario_id_Inventario").value;

        // Comprobar si los campos obligatorios están llenos
        if (id_Movimiento2 == null || parseInt(id_Movimiento2) <= 1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo ID de Movimiento",
            });
            return false;
        }
        if (!cantidad_despues2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Cantidad después'.",
            });
            return false;
        }
        if (!fecha_movimiento2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Fecha de movimiento'.",
            });
            return false;
        }
        if (!fecha_modificacion2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Fecha de modificación'.",
            });
            return false;
        }
        if (!estado_despues2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Estado después'.",
            });
            return false;
        }
        if (!inventario_id_Inventario2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Inventario ID Inventario'.",
            });
            return false;
        }

        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.movimiento.php`, {
                id_Movimiento: id_Movimiento,
                cantidad_despues: cantidad_despues,
                fecha_movimiento: fecha_movimiento,
                fecha_modificacion: fecha_modificacion,
                estado_despues: estado_despues,
                inventario_id_Inventario: inventario_id_Inventario,
                registroCrud: "registroCrud",
            });
            console.log(respuesta.data);
            if (respuesta.data.success) {
                console.log('registro exitoso', respuesta.data);
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'El registro fue exitoso',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/crud/movimiento');
                    }
                });
            } else {
                console.log('registro no exitoso', respuesta.data);
                setError('Credenciales Incorrectas');
            }
        } catch (err) {
            console.error(err);
            setError('Error al realizar el registro');
        }
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Registrar Movimiento</h1>
                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="id_Movimiento2"
                                id="id_Movimiento"
                                value={id_Movimiento}
                                onChange={(e) => setId_Movimiento(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="number" />
                            <label className={`${styles.label} label`} htmlFor="id_Movimiento">ID Movimiento</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="cantidad_despues2"
                                id="cantidad_despues"
                                value={cantidad_despues}
                                onChange={(e) => setCantidad_Despues(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="number" />
                            <label className={styles.label} htmlFor="cantidad_despues">Cantidad Después</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="fecha_movimiento2"
                                id="fecha_movimiento"
                                value={fecha_movimiento}
                                onChange={(e) => setFecha_Movimiento(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="date" />
                            <label className={styles.label} htmlFor="fecha_movimiento">Fecha Movimiento</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input
                                name="fecha_modificacion2"
                                id="fecha_modificacion"
                                value={fecha_modificacion}
                                onChange={(e) => setFecha_Modificacion(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="date" />
                            <label className={styles.label} htmlFor="fecha_modificacion">Fecha Modificación</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="estado_despues2"
                                id="estado_despues"
                                value={estado_despues}
                                onChange={(e) => setEstado_Despues(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text" />
                            <label className={styles.label} htmlFor="estado_despues">Estado Después</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="inventario_id_Inventario2"
                                id="inventario_id_Inventario"
                                value={inventario_id_Inventario}
                                onChange={(e) => setInventario_Id_Inventario(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="number" />
                            <label className={styles.label} htmlFor="inventario_id_Inventario">Inventario ID Inventario</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button
                                type="button"
                                onClick={() => navigate('/crud/movimiento')}
                                className={styles['submit-btn']}
                            >
                                Cancelar
                            </button>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="registroCrud" className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </section>
            </div>
        </>
    );
};

export default RegistrarMovimiento;
