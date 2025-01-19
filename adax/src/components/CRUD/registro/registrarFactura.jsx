import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';

const RegistrarFactura = () => {
    const navigate = useNavigate();

    const [venta_id_Venta, setVenta_id_Venta] = useState('');
    const [producto_id_Producto, setProducto_id_Producto] = useState('');
    const [Cantidad, setCantidad] = useState('');
    const [Precio, setPrecio] = useState('');
    const [Estado, setEstado] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "venta_id_Venta") setVenta_id_Venta(value);
        if (name === "producto_id_Producto") setProducto_id_Producto(value);
        if (name === "Cantidad") setCantidad(Number(value)); // Convertir a número
        if (name === "Precio") setPrecio(Number(value));    // Convertir a número
        if (name === "Estado") setEstado(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (venta_id_Venta === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Venta ID' correctamente.",
            });
            return;
        }

        if (!producto_id_Producto) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Producto ID'.",
            });
            return;
        }

        if (!Cantidad || isNaN(Cantidad) || Cantidad <= 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese una cantidad válida.",
            });
            return;
        }

        if (!Precio || isNaN(Precio) || Precio <= 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un precio válido.",
            });
            return;
        }

        if (!Estado) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Estado'.",
            });
            return;
        }

        try {
            // Realizamos la solicitud a la API
            const respuesta = await axios.post('http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php', {
                venta_id_Venta,
                producto_id_Producto,
                Cantidad,
                Precio,
                Estado,
                registroCrud: "registroCrud",
            });

            console.log('Respuesta del servidor:', respuesta);  // Para depurar la respuesta

            // Verificar si la respuesta tiene la propiedad 'success'
            if (respuesta.data && respuesta.data.success) {
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'El registro fue exitoso, puede continuar con el proceso.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/crud/factura');
                    }
                });
            } else {
                // Si no tiene la propiedad 'success' o es falsa, mostramos un mensaje de error
                const errorMessage = respuesta.data.message || 'Error en el registro. Intente nuevamente.';
                setError(errorMessage);
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: errorMessage,
                });
            }
        } catch (err) {
            console.error('Error al hacer la solicitud:', err);
            setError('Error al registrar la factura');
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar la factura',
                text: 'Hubo un problema al intentar registrar la factura. Por favor, intente más tarde.',
            });
        }
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Registrar Factura</h1>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input
                                name="venta_id_Venta"
                                value={venta_id_Venta}
                                onChange={handleChange}
                                className={`${styles['input-text']} js-input`}
                                type="text"
                                required
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
                                required
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
                                type="number"
                                required
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
                                type="number"
                                required
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
                                required
                            />
                            <label className={styles.label} htmlFor="Estado">Estado</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button
                                className={styles['submit-btn']}
                                type="button"
                                onClick={() => navigate('/crud/factura')}
                            >
                                Cancelar
                            </button>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="registrarfacturaCrud" className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default RegistrarFactura;
