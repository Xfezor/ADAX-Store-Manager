import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';

const ActualizarProveedor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {};
    const [idproveedor, setIdproveedor] = useState(initialData[0] || '');
    const [nombre, setNombre] = useState(initialData[1] || '');
    const [telefono, setTelefono] = useState(initialData[2] || '');
    const [email, setEmail] = useState(initialData[3] || '');
    const [id_tienda, setId_tienda] = useState(initialData[4] || '');


    const handleChange = (e) => {
        const { name, value } = e.target;

        
        switch (name) {
            case 'idproveedor':
                setIdproveedor(value);
                break;
            case 'nombre':
                setNombre(value);
                break;
            case 'telefono':
                setTelefono(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'id_tienda':
                setId_tienda(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php?`, {
                actualizar: true,
                idproveedor: idproveedor,
                nombre: nombre,
                telefono: telefono,
                email: email,
                id_tienda: id_tienda,
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/proveedor', {state: mensaje});
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
        navigate('/crud/proveedor');
    };
    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar Proveedor</h1>
                    <form className={`${styles['contact-form']} contact-form row`} action="../../controlador/controlador.proveedor.php" method="POST">
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="idproveedor" id="name" value={idproveedor} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="idproveedor">IdProveedor</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre" value={nombre} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="nombre">Nombre</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="telefono" value={telefono} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="telefono">Telefono</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="email" value={email} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="email">Email</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="id_tienda" value={id_tienda} onChange={handleChange} id="text" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="id_tienda">id de tienda</label>
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

export default ActualizarProveedor;
