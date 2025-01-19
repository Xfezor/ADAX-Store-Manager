import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';

const ActualizarCliente = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {};
    const [idCliente, setIdCliente] = useState(initialData[0] || '');
    const [documento, setDocumento] = useState(initialData[1] || '');
    const [nombre1Cliente, setNombre1Cliente] = useState(initialData[2] || '');
    const [nombre2Cliente, setNombre2Cliente] = useState(initialData[3] || '');
    const [apellido1Cliente, setApellido1Cliente] = useState(initialData[4] || '');
    const [apellido2Cliente, setApellido2Cliente] = useState(initialData[5] || '');
    const [tipoDoc, setTipoDoc] = useState(initialData[6] || '');

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'idCliente':
                setIdCliente(value);
                break;
            case 'documento':
                setDocumento(value);
                break;
            case 'nombre1Cliente':
                setNombre1Cliente(value);
                break;
            case 'nombre2Cliente':
                setNombre2Cliente(value);
                break;
            case 'apellido1Cliente':
                setApellido1Cliente(value);
                break;
            case 'apellido2Cliente':
                setApellido2Cliente(value);
                break;
            case 'tipoDoc':
                setTipoDoc(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/cliente.php?`, {
                actualizar: true,
                idCliente: idCliente,
                documento: documento,
                nombre1Cliente: nombre1Cliente,
                nombre2Cliente: nombre2Cliente,
                apellido1Cliente: apellido1Cliente,
                apellido2Cliente: apellido2Cliente,
                tipoDoc: tipoDoc,
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/clientes', {state: mensaje});
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
        navigate('/crud/cliente');
    };

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar Cliente</h1>
                    <form className={`${styles['contact-form']} contact-form row`} action="../../controlador/controlador.cliente.php" method="POST">
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="idCliente" id="idCliente" value={idCliente} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="idCliente">ID Cliente</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="documento" value={documento} onChange={handleChange} id="documento" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="documento">Documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre1Cliente" value={nombre1Cliente} onChange={handleChange} id="nombre1Cliente" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="nombre1Cliente">Nombre 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre2Cliente" value={nombre2Cliente} onChange={handleChange} id="nombre2Cliente" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="nombre2Cliente">Nombre 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="apellido1Cliente" value={apellido1Cliente} onChange={handleChange} id="apellido1Cliente" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="apellido1Cliente">Apellido 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="apellido2Cliente" value={apellido2Cliente} onChange={handleChange} id="apellido2Cliente" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="apellido2Cliente">Apellido 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input name="tipoDoc" value={tipoDoc} onChange={handleChange} id="tipoDoc" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="tipoDoc">Tipo de documento</label>
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

export default ActualizarCliente;
