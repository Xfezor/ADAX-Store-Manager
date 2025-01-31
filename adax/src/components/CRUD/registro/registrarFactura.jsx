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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones de los campos
        if (venta_id_Venta === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Venta ID' correctamente.",
            });
            return;
        }

        if (producto_id_Producto === '') {
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

            // Mostrar la respuesta de la API para depuración
            console.log("Respuesta de la API: ", respuesta.data);

            if (respuesta.data.success) {
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
                // Mostrar el error recibido desde la API
                console.log('Registro no exitoso', respuesta.data);
                setError(respuesta.data.message || 'Error desconocido');
            }
        } catch (err) {
            console.error(err);
            setError('Error al registrar la factura');
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
                                onChange={(e) => setVenta_id_Venta(e.target.value)}
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
                                onChange={(e) => setProducto_id_Producto(e.target.value)}
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
                                onChange={(e) => setCantidad(e.target.value)}
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
                                onChange={(e) => setPrecio(e.target.value)}
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
                                onChange={(e) => setEstado(e.target.value)}
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
                            <input name="registroCrud" className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default RegistrarFactura;