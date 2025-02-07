import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';

const ActualizarInventario = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {};
    const [id_Inventario, setid_inventario] = useState(initialData[0] || '');
    const [CantidadInventario, setCantidadInventario] = useState(initialData[1] || '');
    const [fechaModificacion, setfechaModificacion] = useState(initialData[2] || '');
    const [estado_revision, setestado_revision] = useState(initialData[3] || '');
    const [tienda_idtienda, settienda_idtienda] = useState(initialData[4] || '');


    const handleChange = (e) => {
        const { name, value } = e.target;

        
        switch (name) {
            case 'id_Inventario':
                setid_inventario(value);
                break;
            case 'cantidad_inventario':
                setCantidadInventario(value);
                break;
            case 'fecha_modificacion':
                setfechaModificacion(value);
                break;
            case 'estado_revision':
                setestado_revision(value);
                break;
            case 'tienda_idtienda':
                settienda_idtienda(value);
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.inventario.php?`, {
                actualizar: true,
                id_Inventario: id_Inventario,
                cantidadInventario: CantidadInventario,
                fechaModificacion: fechaModificacion,
                estado_revisión: estado_revision,
                tienda_idtienda: tienda_idtienda,

            });
            console.log({
                id_Inventario,
                CantidadInventario,
                fechaModificacion,
                estado_revision,
                tienda_idtienda
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/inventario', {state: mensaje});
            } else {
                console.log('actualizacion no exitosa', respuesta.data)
                return null;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const handleCancel = () => {
        navigate('/crud/inventario');
    };

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar</h1>
                    <form className={`${styles['contact-form']} contact-form row`} action="../../controlador/controlador.usuarios.php" method="POST">
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="id_Inventario" id="name" value={id_Inventario} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="name">Id del Producto</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="cantidad_inventario" value={CantidadInventario} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="email">Cantidad en el Inventario</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="fecha_modificacion" value={fechaModificacion} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="company">Fecha de Modificación del Inventario</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="estado_revision" value={estado_revision} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone">Estado de la Revisión</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="tienda_idtienda" value={tienda_idtienda} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone">Id de la Tienda del Inventario</label>
                        </div>
                        
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button type="button" className={styles['submit-btn']} onClick={handleCancel}>Cancelar</button>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button name="modificar" className={styles['submit-btn']} type="submit" onClick={handleSubmit}>Actualizar</button>                        
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default ActualizarInventario;