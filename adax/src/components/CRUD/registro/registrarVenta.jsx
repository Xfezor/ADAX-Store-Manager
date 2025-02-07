import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';

const RegistrarVenta = () => {

    const navigate = useNavigate();
    const [id_Venta, setId_Venta] = useState('');
    const [FechaVenta, setFechaVenta] = useState('');
    const [HoraVenta, setHoraVenta] = useState('');
    const [EstadoVenta, setEstadoVenta] = useState('');
    const [cliente_id_Cliente, setClienteIdCliente] = useState('');
    const [tienda_idtienda, setTiendaIdTienda] = useState('');
    const [metododepago_ID_Met_pago, setMetodoDePago] = useState('');
    const [usuarios_documento, setUsuariosDocumento] = useState('');
    const [usuarios_tienda_idtienda, setUsuariosTiendaIdTienda] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id_Venta || parseInt(id_Venta) <= 0) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Por favor, ingrese un ID de Venta válido." });
            return;
        }
        if (!FechaVenta || !HoraVenta || !EstadoVenta) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Complete todos los campos de fecha, hora y estado." });
            return;
        }
        if (!cliente_id_Cliente || !tienda_idtienda || !metododepago_ID_Met_pago) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Ingrese datos válidos para Cliente, Tienda y Método de Pago." });
            return;
        }
        if (!usuarios_documento || !usuarios_tienda_idtienda) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Ingrese los datos del usuario correctamente." });
            return;
        }

        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.venta.php`, {
                id_Venta,
                FechaVenta,
                HoraVenta,
                EstadoVenta,
                cliente_id_Cliente,
                tienda_idtienda,
                metododepago_ID_Met_pago,
                usuarios_documento,
                usuarios_tienda_idtienda,
                registroCrud: "registroCrud",
            });

            if (respuesta.data.success) {
                Swal.fire({ title: 'Registro exitoso', text: 'La venta fue registrada correctamente', icon: 'success', confirmButtonText: 'Aceptar' })
                    .then(() => navigate('/crud/ventas'));
            } else {
                setError('No se pudo registrar la venta. Intente nuevamente.');
            }
        } catch (err) {
            console.error(err);
            setError('Error en el registro de la venta.');
        }
    };

    return (
        <>
            <div className="form-box">
                <section className={styles['get-in-touch']}>
                    <h1 className={styles.title}>Registrar Venta</h1>
                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input id="id_Venta" value={id_Venta} onChange={(e) => setId_Venta(e.target.value)} className={`${styles['input-text']} js-input`} type="number" required />
                            <label className={`${styles.label} label`} htmlFor="id_Venta">ID Venta</label>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input id="FechaVenta" value={FechaVenta} onChange={(e) => setFechaVenta(e.target.value)} className={`${styles['input-text']} js-input`} type="date" required />
                            <label className={`${styles.label} label`} htmlFor="FechaVenta">Fecha de Venta</label>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input id="HoraVenta" value={HoraVenta} onChange={(e) => setHoraVenta(e.target.value)} className={`${styles['input-text']} js-input`} type="time" required />
                            <label className={`${styles.label} label`} htmlFor="HoraVenta">Hora de Venta</label>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input id="EstadoVenta" value={EstadoVenta} onChange={(e) => setEstadoVenta(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="EstadoVenta">Estado de la Venta</label>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input id="cliente_id_Cliente" value={cliente_id_Cliente} onChange={(e) => setClienteIdCliente(e.target.value)} className={`${styles['input-text']} js-input`} type="number" required />
                            <label className={`${styles.label} label`} htmlFor="cliente_id_Cliente">ID Cliente</label>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input id="tienda_idtienda" value={tienda_idtienda} onChange={(e) => setTiendaIdTienda(e.target.value)} className={`${styles['input-text']} js-input`} type="number" required />
                            <label className={`${styles.label} label`} htmlFor="tienda_idtienda">ID Tienda</label>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input id="metododepago_ID_Met_pago" value={metododepago_ID_Met_pago} onChange={(e) => setMetodoDePago(e.target.value)} className={`${styles['input-text']} js-input`} type="number" required />
                            <label className={`${styles.label} label`} htmlFor="metododepago_ID_Met_pago">Método de Pago</label>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input id="usuarios_documento" value={usuarios_documento} onChange={(e) => setUsuariosDocumento(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} htmlFor="usuarios_documento">Documento Usuario</label>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <button type="button" onClick={() => navigate('/crud/ventas')} className={styles['submit-btn']}>Cancelar</button>
                        </div>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </section>
            </div>
        </>
    );
};

export default RegistrarVenta;