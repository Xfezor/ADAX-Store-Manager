import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';

const ActualizarUsuario = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {};
    const [documento, setDocumento] = useState(initialData[0] || '');
    const [tipoDoc, setTipoDoc] = useState(initialData[1] || '');
    const [contrasena, setContrasena] = useState(initialData[2] || '');
    const [correo, setCorreo] = useState(initialData[7] || '');
    const [nombre1, setNombre1] = useState(initialData[3] || '');
    const [nombre2, setNombre2] = useState(initialData[4] || '');
    const [apellido1, setApellido1] = useState(initialData[5] || '');
    const [apellido2, setApellido2] = useState(initialData[6] || '');
    const [rol_id_Rol, setRolIdRol] = useState(initialData[8] || '');
    const [codigo_invitacion, setCodigoInvitacion] = useState(initialData[9] || '');


    const handleChange = (e) => {
        const { name, value } = e.target;

        
        switch (name) {
            case 'documento':
                setDocumento(value);
                break;
            case 'tipoDoc':
                setTipoDoc(value);
                break;
            case 'contrasena':
                setContrasena(value);
                break;
            case 'correo':
                setCorreo(value);
                break;
            case 'nombre1':
                setNombre1(value);
                break;
            case 'nombre2':
                setNombre2(value);
                break;
            case 'apellido1':
                setApellido1(value);
                break;
            case 'apellido2':
                setApellido2(value);
                break;
            case 'idrol':
                setRolIdRol(value);
                break;
            case 'codigoinvitacion':
                setCodigoInvitacion(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php?`, {
                actualizar: true,
                documento: documento,
                tipoDoc: tipoDoc,
                contrasena: contrasena,
                email: correo,
                nombre: nombre1,
                nombre2: nombre2,
                apellido: apellido1,
                apellido2: apellido2,
                idRol: rol_id_Rol,
                codigo_invitacion: codigo_invitacion,
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/usuarios', {state: mensaje});
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
        navigate('/crud/usuarios');
    };

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar</h1>
                    <form className={`${styles['contact-form']} contact-form row`} action="../../controlador/controlador.usuarios.php" method="POST">
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="documento" id="name" value={documento} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="name">Documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="tipoDoc" value={tipoDoc} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="email">Tipo de documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="contrasena" value={contrasena} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="company">Contraseña</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="correo" value={correo} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone">Correo</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre1" value={nombre1} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone">Nombre 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre2" value={nombre2} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="company">Nombre 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="apellido1" value={apellido1} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone">Apellido 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="apellido2" value={apellido2} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="company">Apellido 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="idrol" value={rol_id_Rol} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone">Id rol</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="codigoinvitacion" value={codigo_invitacion} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="phone">Codigo invitacion</label>
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

export default ActualizarUsuario;
