import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';

const ActualizarMovimiento = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {};
    const [id_Movimiento, setid_Movimiento] = useState(initialData[0] || '');
    const [cantidad_despues, setcantidad_despues] = useState(initialData[1] || '');
    const [fecha_movimiento, setfecha_movimiento] = useState(initialData[2] || '');
    const [fecha_modificacion, setfecha_modificacion] = useState(initialData[3] || '');
    const [estado_despues, setestado_despues] = useState(initialData[4] || '');
    const [inventario_id_Inventario, setinventario_id_Inventario] = useState(initialData[5] || '');


    const handleChange = (e) => {
        const { name, value } = e.target;
  
        switch (name) {
            case 'id_Movimiento':
                setid_Movimiento(value);
                break;
            case 'cantidad_despues':
                setcantidad_despues(value);
                break;
            case 'fecha_movimiento':
                setfecha_movimiento(value);
                break;
            case 'fecha_modificacion':
                setfecha_modificacion(value);
                break;
            case 'estado_despues':
                setestado_despues(value);
                break;
            case 'inventario_id_Inventario':
                setinventario_id_Inventario(value);
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.movimiento.php?`, {
                actualizar: true,
                id_Movimiento: id_Movimiento,
                cantidad_despues: cantidad_despues,
                fecha_movimiento: fecha_movimiento,
                fecha_modificacion: fecha_modificacion,
                estado_despues: estado_despues,
                inventario_id_Inventario: inventario_id_Inventario,
                
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/movimiento', {state: mensaje});
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
        navigate('/crud/movimiento');
    };

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar</h1>
                    <form className={`${styles['contact-form']} contact-form row`} action="../../controlador/controlador.movimiento.php" method="POST">
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="id_Movimiento" id="name" value={id_Movimiento} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="name">id_Movimiento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="cantidad_despues" value={cantidad_despues} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="email">cantidad_despues</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="fecha_movimiento" value={fecha_movimiento} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="company">fecha_movimiento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="fecha_modificacion" value={fecha_modificacion} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone">fecha_modificacion</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="estado_despues" value={estado_despues} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone"> estado_despues </label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="inventario_id_Inventario" value={inventario_id_Inventario} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="company">inventario_id_Inventario</label>
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

export default ActualizarMovimiento;
