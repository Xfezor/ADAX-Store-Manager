import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';
import { ip, port } from '../../../utils/ipconfig.js';

const ActualizarCliente = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {};
    const [Documento, setDocumento] = useState(initialData[0] || '');
    const [Tipo_documento, setTipo_documento] = useState(initialData[1] || '');
    const [NombreCliente, setNombre_Cliente] = useState(initialData[2] || '');
    const [ApellidoCliente, setApellido_Cliente] = useState(initialData[3] || '');
    const [Correo, setCorreo] = useState(initialData[4] || '');

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'Documento':
                setDocumento(value);
                break;
            case 'Tipo_documento':
                setTipo_documento(value);
                break;
            case 'Nombre_Cliente':
                setNombre_Cliente(value);
                break;
            case 'Apellido_Cliente':
                setApellido_Cliente(value);
                break;
            case 'Correo':
                setCorreo(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.put(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php?`, {
                Documento: Documento,
                Tipo_documento: Tipo_documento,
                NombreCliente: NombreCliente,
                ApellidoCliente: ApellidoCliente,
                Correo: Correo,
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
    useEffect(() => {
        const validador = () => {
            if (localStorage.getItem('usuario') === null) {
                navigate("/iniciar_sesion");
            };
        };
        validador();
    }, [navigate])

    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar Cliente</h1>

                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Documento" value={Documento}
                                onChange={handleChange} id="Documento"
                                className={`${styles['input-text']} js-input`}
                                type="text"
                            />
                            <label className={styles.label} htmlFor="Documento">Documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input name="Tipo_documento" value={Tipo_documento} onChange={handleChange} id="Tipo_documento" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="Tipo_documento">Tipo de documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Nombre_Cliente" value={NombreCliente} onChange={handleChange} id="Nombre_Cliente" className={`${styles['input-text']} js-input`} type="text"
                            />
                            <label className={styles.label} htmlFor="Nombre_Cliente">Nombre</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="Apellido_Cliente" value={ApellidoCliente} onChange={handleChange} id="Apellido_Cliente" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="Apellido_Cliente">Apellido</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input name="Correo" value={Correo} onChange={handleChange} id="Correo" className={`${styles['input-text']} js-input`} type="text" />
                            <label className={styles.label} htmlFor="Correo">Correo</label>
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
