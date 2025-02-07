import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';
const ActualizarVentas = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || [];
    console.log('Initial Data:', initialData)
    const [id_Venta, setId_Venta] = useState(initialData[0] || '');
    const [producto, setProducto] = useState(initialData[1] || '');
    const [cantidad, setCantidad] = useState(initialData[2] || '');
    const [precio, setPrecio] = useState(initialData[3] || '');
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'id_Venta':
                setId_Venta(value);
                break;
            case 'producto':
                setProducto(value);
                break;
            case 'cantidad':
                setCantidad(value);
                break;
            case 'precio':
                setPrecio(value);
                break;
            default:
                break;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.venta.php?`, {
                actualizar: true,
                id_Venta: id_Venta,
                producto: producto,
                cantidad: cantidad,
                precio: precio,
            });
            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/ventas', { state: mensaje });
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
        navigate('/crud/ventas');
    };
    return (
        <>
            <div className='form-box'>
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar Venta</h1>
                    <form className={`${styles['contact-form']} contact-form row`}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input name="id_Venta" id="id_Venta" value={id_Venta} onChange={handleChange} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="id_Venta">ID de Venta</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="producto" value={producto} onChange={handleChange} id="producto" className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={styles.label} htmlFor="producto">Producto</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="cantidad" value={cantidad} onChange={handleChange} id="cantidad" className={`${styles['input-text']} js-input`} type="number" required />
                            <label className={styles.label} htmlFor="cantidad">Cantidad</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="precio" value={precio} onChange={handleChange} id="precio" className={`${styles['input-text']} js-input`} type="number" required />
                            <label className={styles.label} htmlFor="precio">Precio</label>
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
export default ActualizarVentas;