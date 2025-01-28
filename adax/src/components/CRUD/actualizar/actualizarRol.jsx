import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';

const ActualizarRoles = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || []; // Asegúrate de que sea un array
    console.log('Initial Data:', initialData)
    const [id_Rol, setId_Rol] = useState(initialData[0] || '');
    const [nombreRol, setNombre_Rol] = useState(initialData[1] || '');
    const [descripcion, setDescripcion] = useState(initialData[2] || '');

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'id_Rol':
                setId_Rol(value);
                break;
            case 'nombreRol':
                setNombre_Rol(value);
                break;
            case 'descripcion':
                setDescripcion(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.rol.php?`, {
                actualizar: true,
                id_Rol: id_Rol,
                nombreRol: nombreRol,
                descripcion: descripcion,
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/roles', { state: mensaje });
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
        navigate('/crud/roles');
    };

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar</h1>
                    <form className={`${styles['contact-form']} contact-form row`} action="../../controlador/controlador.rol.php" method="POST">
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="id_Rol" id="id_Rol" value={id_Rol} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="name">Id del Rol</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombreRol" value={nombreRol} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="name">Nombre del Rol</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="descripcion" value={descripcion} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="description">Descripción del Rol</label>
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

export default ActualizarRoles;