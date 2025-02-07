import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';

const ActualizarMetodosdepago = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || []; // Asegúrate de que sea un array
    console.log('Initial Data:', initialData)
    const [ID_Met_pago, setID_Met_pago] = useState(initialData[0] || '');
    const [Nombre, setNombre] = useState(initialData[1] || '');

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'ID_Met_pago':
                setID_Met_pago(value);
                break;
            case 'Nombre':
                setNombre(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.metodospago.php?`, {
                actualizar: true,
                ID_Met_pago: ID_Met_pago,
                Nombre: Nombre,
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/metodos_pago', { state: mensaje });
            } else {
                console.log('Actualización no exitosa', respuesta.data);
                return null;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const handleCancel = () => {
        navigate('/crud/metodos_pago');
    };

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar Método de Pago</h1>
                    <form className={`${styles['contact-form']} contact-form row`} action="../../controlador/controlador.metodospago.php" method="POST">
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="ID_Met_pago" id="ID_Met_pago" value={ID_Met_pago} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="ID_Met_pago">ID del Método de Pago</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Nombre" value={Nombre} onChange={handleChange} id="Nombre" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="Nombre">Nombre del Método de Pago</label>
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
    )
}

export default ActualizarMetodosdepago;