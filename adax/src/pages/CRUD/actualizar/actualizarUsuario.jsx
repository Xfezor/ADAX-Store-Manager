import React, { useState, useContext } from 'react';
import { Contexto } from '../usuarios.jsx';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_actualizar.module.css';

const ActualizarUsuario = () => {

    const { datos, cargando } = useContext(Contexto);


    const [usuario, setUsuario] = useState({
        documento: Contexto.documento,
        tipoDoc: Contexto.tipoDoc,
        contrasena: Contexto.contrasena,
        correo: Contexto.correo,
        nombre1: Contexto.nombre1,
        nombre2: Contexto.nombre2,
        apellido1: Contexto.apellido1,
        apellido2: Contexto.apellido2,
        rol_id_Rol: Contexto.rol_id_Rol,
        codigo_invitacion: Contexto.codigo_invitacion,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar</h1>
                    <form className={`${styles['contact-form']} contact-form row`} action="../../controlador/controlador.usuarios.php" method="POST">
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="document" id="name" value={usuario.documento} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="name">Documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="tipoDoc" value={usuario.tipoDoc} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} for="email">Tipo de documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="contrasena" value={usuario.contrasena} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} for="company">Contraseña</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="correo" value={usuario.correo} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} for="phone">Correo</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre1" value={usuario.nombre1} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} for="phone">Nombre 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre2" value={usuario.nombre2} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} for="company">Nombre 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="apellido1" value={usuario.apellido1} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} for="phone">Apellido 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="apellido2" value={usuario.apellido2} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} for="company">Apellido 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="idrol" value={usuario.rol_id_Rol} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} for="phone">Id rol</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="codigoinvitacion" value={usuario.codigo_invitacion} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} for="phone">Codigo invitacion</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <a href="listarusuarios.php"><input className={styles['submit-btn']} value="cancelar" /></a>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="modificar" className={styles['submit-btn']} type="submit" value="Actualizar" />
                        </div>

                    </form>
                </section>
            </div>
        </>
    );
}

export default ActualizarUsuario;