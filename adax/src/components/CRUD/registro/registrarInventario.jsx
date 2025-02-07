import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';


const RegistrarInventario = () => {

    const navigate = useNavigate();
    const [id_inventario, setid_inventario] = useState('');
    const [CantidadInventario, setCantidadInventario] = useState('');
    const [fechaModificacion, setfechaModificacion] = useState('');
    const [estado_revision, setestado_revision] = useState('');
    const [tienda_idtienda, settienda_idtienda] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Obtener valores del formulario
        var id_inventario2 = document.getElementById('id_Inventario').value;
        var CantidadInventario2 = document.getElementById('CantidadInventario').value;
        var fechaModificacion2 = document.getElementById('fechaModificacion').value;
        var estado_revision2 = document.getElementById('estado_revision').value;
        var tienda_idtienda2 = document.getElementById('tienda_idtienda').value;

        // Comprobar si los campos obligatorios están llenos
        if (id_inventario2 == null || parseInt(id_inventario2) <= 1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo ID de Rol",
            });
            return false;
        }
        if (!CantidadInventario2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo Cantidad de Inventario",
            });
            return false;
        }
        if (!fechaModificacion2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo Fecha de Modificación",
            });
            return false;
        }
        if (!estado_revision2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo Estado de Revisión",
            });
            return false;
        }
        if (!tienda_idtienda2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo ID de Tienda",
            });
            return false;
        }
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.inventario.php`, {
                id_inventario: id_inventario,
                CantidadInventario: CantidadInventario,
                fechaModificacion: fechaModificacion,
                estado_revision: estado_revision,
                tienda_idtienda: tienda_idtienda,
                registroCrud: "registroCrud",
            });
            console.log(respuesta.data);
            if (respuesta.data.success) {
                console.log('registro exitoso', respuesta.data)
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'El registro fue exitoso',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/crud/inventario');
                    }
                });

            } else {
                console.log('registro no exitoso', respuesta.data)
                setError('Credenciales Incorrectas', respuesta.data.success);
            }
        } catch (err) {
            console.error(err);
            setError('Error al iniciar sesión');
        }
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Registrar</h1>
                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="idInventario"
                                id="id_Inventario"
                                value={id_inventario}
                                onChange={(e) => setid_inventario(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="number" />
                            <label className={`${styles.label} label`} htmlFor="name">Id del Inventario</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="cantidad"
                                id="CantidadInventario"
                                value={CantidadInventario}
                                onChange={(e) => setCantidadInventario(e.target.value)}
                                className={`${styles['input-text']} js-input`}
                                type="text" />
                            <label className={`${styles.label} label`} htmlFor="name">Cantidad en el inventario</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input 
                            name="fechamodificacion"
                            id="fechaModificacion" 
                            value={fechaModificacion} 
                            onChange={(e) => setfechaModificacion(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="text" />
                            <label className={`${styles.label} label`} htmlFor="company">Fecha de modificación del inventario</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input 
                            name="estadorevision"
                            id="estado_revision"
                            value={estado_revision}
                            onChange={(e) => setestado_revision(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="text" />
                            <label className={`${styles.label} label`} htmlFor="company">Estado de la Revision del Inventario</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                            name="id_tienda"
                            id="tienda_idtienda"
                            value={tienda_idtienda}
                            onChange={(e) => settienda_idtienda(e.target.value)}
                            className={`${styles['input-text']} js-input`}
                            type="number"/>
                            <label className={`${styles.label} label`} htmlFor="company">Id de la tienda del Inventario </label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button
                                type="button"
                                onClick={() => navigate('/crud/inventario')}
                                className={styles['submit-btn']}
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="registroCrud" className={styles['submit-btn']} type="submit" value="registrar" />
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </section>
            </div>
        </>
    )
}

export default RegistrarInventario;