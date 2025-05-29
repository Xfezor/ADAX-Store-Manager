import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';

const ActualizarTienda = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {};
    const [idtienda, setIdtienda] = useState(initialData[0] || '');
    const [nombreTienda, setNombreTienda] = useState(initialData[1] || '');
    const [direccion, setDireccion] = useState(initialData[2] || '');
    const [telefono, setTelefono] = useState(initialData[3] || '');
    const [correo, setCorreo] = useState(initialData[4] || '');
    const [contrasena, setContrasena] = useState(initialData[5] || '');
    const [codigo_invitacion, setCodigo_invitacion] = useState(initialData[6] || '');

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'idtienda':
                setIdtienda(value);
                break;
            case 'nombreTienda':
                setNombreTienda(value);
                break;
            case 'direccion':
                setDireccion(value);
                break;
            case 'telefono':
                setTelefono(value);
                break;
            case 'correo':
                setCorreo(value);
                break;
            case 'contrasena':
                setContrasena(value);
                break;
            case 'codigo_invitacion':
                setCodigo_invitacion(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('idtienda', idtienda);
        formData.append('nombreTienda', nombreTienda);
        formData.append('direccion', direccion);
        formData.append('telefono', telefono);
        formData.append('correo', correo);
        formData.append('contrasena', contrasena);
        formData.append('codigo_invitacion', codigo_invitacion);
        formData.append('modificar', true);

        const respuesta = await axios.post(
            'http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.tienda.php',
            formData
        );
      
        navigate('/crud/tienda', { state: respuesta.data?.mensaje || "Tienda actualizada" });
    } catch (err) {
        console.error(err);
       
        navigate('/crud/tienda', { state: "Error al actualizar" });
    }
};

    const handleCancel = () => {
        navigate('/crud/tienda');
    };

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar Tienda</h1>

                    <form
                    className={`${styles['contact-form']} contact-form row`}
                    onSubmit={handleSubmit}
                    >
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="idtienda" value={idtienda}
                                onChange={handleChange} id="idtienda"
                                className={`${styles['input-text']} js-input`}
                                type="text"
                            />
                            <label className={styles.label} htmlFor="idtienda">idtienda</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombreTienda" value={nombreTienda} onChange={handleChange} id="nombreTienda" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="nombreTienda">nombreTienda</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="direccion" value={direccion} onChange={handleChange} id="direccion" className={`${styles['input-text']} js-input`} type="text"
                            />
                            <label className={styles.label} htmlFor="direccion">direccion</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="telefono" value={telefono} onChange={handleChange} id="telefono" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="telefono">telefono</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="correo" value={correo} onChange={handleChange} id="correo" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="correo">correo</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="contrasena" value={contrasena} onChange={handleChange} id="contrasena" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="contrasena">contrasena</label>
                        </div>
                         <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input name="codigo_invitacion" value={codigo_invitacion} onChange={handleChange} id="codigo_invitacion" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="codigo_invitacion">codigo_invitacion</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button type="button" className={styles['submit-btn']} onClick={handleCancel}>Cancelar</button>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <button name="modificar" className={styles['submit-btn']} type="submit">
                            Actualizar
                        </button>
                    </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default ActualizarTienda;
