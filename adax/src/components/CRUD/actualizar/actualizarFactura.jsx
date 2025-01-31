import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Solo esta línea es necesaria
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './styles_registro.module.css';


const ActualizarFactura = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {}; 
    const [venta_id_Venta, setVenta_id_Venta] = useState(initialData[0] || '');
    const [producto_id_Producto, setProducto_id_Producto] = useState(initialData[1] || '');
    const [Cantidad, setCantidad] = useState(initialData[2] || '');
    const [Precio, setPrecio] = useState(initialData[3] || '');
    const [Estado, setEstado] = useState(initialData[4] || '');


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Actualizar el estado correspondiente según el campo modificado
        switch (name) {
            case 'venta_id_Venta':
                setVenta_id_Venta(value);
                break;
            case 'producto_id_Producto':
                setProducto_id_Producto(value);
                break;
            case 'Cantidad':
                setCantidad(value);
                break;
            case 'Precio':
                setPrecio(value);
                break;
            case 'Estado':
                setEstado(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post('http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php', {
                actualizar: true,
                venta_id_Venta:venta_id_Venta,
                producto_id_Producto:producto_id_Producto,
                Cantidad:Cantidad,
                Precio:Precio,
                Estado:Estado,
            });

            if (respuesta.data) {
                const mensaje = respuesta.data.mensaje;
                navigate('/crud/factura', { state: mensaje });
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
        navigate('/crud/factura');
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Actualizar Factura</h1>
                    
                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="venta_id_Venta"
                                id="venta_id_Venta"
                                value={venta_id_Venta}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={`${styles.label} label`} htmlFor="venta_id_Venta">Venta ID</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="producto_id_Producto"
                                value={producto_id_Producto}
                                onChange={handleChange}
                                id="producto_id_Producto"
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={styles.label} htmlFor="producto_id_Producto">Producto ID</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Cantidad"
                                value={Cantidad}
                                onChange={handleChange}
                                id="Cantidad"
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={styles.label} htmlFor="Cantidad">Cantidad</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input
                                name="Precio"
                                value={Precio}
                                onChange={handleChange}
                                id="Precio"
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={styles.label} htmlFor="Precio">Precio</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-12`}>
                            <input
                                name="Estado"
                                value={Estado}
                                onChange={handleChange}
                                id="Estado"
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                
                            />
                            <label className={styles.label} htmlFor="Estado">Estado</label>
                        </div>

                        {/* Botón de Cancelar - Redirige a la página de la lista */}
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button type="button" className={styles['submit-btn']} onClick={handleCancel}>Cancelar</button>
                        </div>

                       
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button name="modificar" className={styles['submit-btn']} type="submit"  onClick={handleSubmit}>Actualizar</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default ActualizarFactura;
