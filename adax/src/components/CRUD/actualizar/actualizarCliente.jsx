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
    const [id_Cliente, setId_Cliente] = useState(initialData[0] || '');
    const [Documento, setDocumento] = useState(initialData[1] || '');
    const [Nombre1_Cliente, setNombre1_Cliente] = useState(initialData[2] || '');
    const [Nombre2_Cliente, setNombre2_Cliente] = useState(initialData[3] || '');
    const [Apellido1_Cliente, setApellido1_Cliente] = useState(initialData[4] || '');
    const [Apellido2_Cliente, setApellido2_Cliente] = useState(initialData[5] || '');
    const [Tipo_documento, setTipo_documento] = useState(initialData[6] || '');

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'id_Cliente':
                setId_Cliente(value);
                break;
            case 'Documento':
                setDocumento(value);
                break;
            case 'Nombre1_Cliente':
                setNombre1_Cliente(value);
                break;
            case 'Nombre2_Cliente':
                setNombre2_Cliente(value);
                break;
            case 'Apellido1_Cliente':
                setApellido1_Cliente(value);
                break;
            case 'Apellido2_Cliente':
                setApellido2_Cliente(value);
                break;
            case 'Tipo_documento':
                setTipo_documento(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador.cliente.php?`, {
                id_Cliente: id_Cliente,
                Documento: Documento,
                Nombre1_Cliente: Nombre1_Cliente,
                Nombre2_Cliente: Nombre2_Cliente,
                Apellido1_Cliente: Apellido1_Cliente,
                Apellido2_Cliente: Apellido2_Cliente,
                Tipo_documento: Tipo_documento,

                actualizar: true,
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/cliente', { state: mensaje });
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

                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="id_Cliente"
                                id="id_Cliente"
                                value={id_Cliente}
                                onChange={handleChange} className={`${styles['input-text']} js-input`}
                                type="text"
                            />
                            <label className={`${styles.label} label`} htmlFor="id_Cliente">ID Cliente</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Documento" value={Documento}
                                onChange={handleChange} id="Documento"
                                className={`${styles['input-text']} js-input`}
                                type="text" 
                            />
                            <label className={styles.label} htmlFor="Documento">Documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Nombre1_Cliente" value={Nombre1_Cliente} onChange={handleChange} id="Nombre1_Cliente" className={`${styles['input-text']} js-input`} type="text"
                            />
                            <label className={styles.label} htmlFor="Nombre1_Cliente">Nombre 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Nombre2_Cliente" value={Nombre2_Cliente} onChange={handleChange} id="Nombre2_Cliente" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="Nombre2_Cliente">Nombre 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Apellido1_Cliente" value={Apellido1_Cliente} onChange={handleChange} id="Apellido1_Cliente" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="Apellido1_Cliente">Apellido 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Apellido2_Cliente" value={Apellido2_Cliente} onChange={handleChange} id="Apellido2_Cliente" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="Apellido2_Cliente">Apellido 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input name="Tipo_documento" value={Tipo_documento} onChange={handleChange} id="Tipo_documento" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="Tipo_documento">Tipo de documento</label>
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
