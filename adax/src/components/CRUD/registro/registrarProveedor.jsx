import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';

const RegistrarProveedor = () => {

    const navigate = useNavigate();
    const [idproveedor, setIdproveedor] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [id_tienda, setId_tienda] = useState(''); // Cambié setIdTienda a setId_tienda
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const { name, value } = e.target;
        var idproveedor2 = document.getElementById("idproveedor").value;
        var nombre2 = document.getElementById("nombre").value;
        var telefono2 = document.getElementById("telefono").value;
        var email2 = document.getElementById("email").value;
        var id_tienda2 = document.getElementById("id_tienda").value;


       // Comprobar si los campos obligatorios están llenos
       if (idproveedor2 == null|| parseInt(idproveedor2) <= 1) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, complete el campo ID de Proveedor",
        });
        return false;
    }
    if (!nombre2) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, complete el campo 'Nombre del Proveedor'.",
        });
        return false;
    }
    if (!telefono2) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, complete el campo 'telefono'.",
        });
        return false;
    }
    if (!email2) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, complete el campo 'email'.",
        });
        return false;
    }
    if (!id_tienda2) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, complete el campo 'id_tienda'.",
        });
        return false;
    }
    try {
        const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php`, {
            idproveedor: idproveedor,
            nombre: nombre,
            telefono: telefono,
            email: email,
            id_tienda: id_tienda,
            registroCrud: "registroCrud",
        });
        console.log( respuesta.data );
        if (respuesta.data.success) {
            console.log('registro exitoso', respuesta.data)
            Swal.fire({
                title: 'Registro exitoso',
                text: 'El registro fue exitoso',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/crud/proveedor');
                }
            });

        } else {
            console.log('registro no exitoso', respuesta.data)
            setError('Credenciales Incorrectas', respuesta.data.success);
        }
    } catch (err) {
        console.error(err);
        setError('Error al iniciar sesión');
    }
};

return (
    <>
        <div className="form-box">
            <section className={styles['get-in-touch']}>
                <h1 className={styles.title}>Registrar Proveedor</h1>
                <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                    <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                        <input 
                            name="idproveedor2" 
                            id="idproveedor" 
                            value={idproveedor} 
                            onChange={(e) => setIdproveedor(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="number" 
                        />
                        <label className={`${styles.label} label`} htmlFor="idproveedor">Id del Proveedor</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input 
                            name="nombre2" 
                            id="nombre" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="text"
                        />
                        <label className={`${styles.label} label`} htmlFor="nombre">Nombre del Proveedor</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input 
                            name="telefono2" 
                            id="telefono" 
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="text"
                        />
                        <label className={`${styles.label} label`} htmlFor="telefono">Teléfono</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input 
                            name="email2" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="email"
                        />
                        <label className={`${styles.label} label`} htmlFor="email">Email</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input 
                            name="id_tienda2" 
                            id="id_tienda" 
                            value={id_tienda} 
                            onChange={(e) => setId_tienda(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="number"
                        />
                        <label className={`${styles.label} label`} htmlFor="id_tienda">Id Tienda</label>
                    </div>

                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <button
                            type="button"
                            onClick={() => navigate('/crud/proveedores')}
                            className={styles['submit-btn']}
                        >
                            Cancelar
                        </button>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input 
                            name="registroProveedor" 
                            className={styles['submit-btn']} 
                            type="submit" 
                            value="Registrar" 
                        />
                    </div>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </section>
        </div>
    </>
);
}


export default RegistrarProveedor;
