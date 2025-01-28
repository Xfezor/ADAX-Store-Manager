import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';


const RegistrarRoles = () => {

    const navigate = useNavigate();
    const [id_Rol, setId_Rol] = useState('');
    const [nombreRol, setNombreRol] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // Obtener valores del formulario
        var id_Rol2 = document.getElementById("id_Rol").value;
        var nombreRol2 = document.getElementById("nombreRol").value;
        var descripcion2 = document.getElementById("descripcion").value;

        // Comprobar si los campos obligatorios están llenos
        if (id_Rol2 == null|| parseInt(id_Rol2) <= 1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo ID de Rol",
            });
            return false;
        }
        if (!nombreRol2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Nombre del Rol'.",
            });
            return false;
        }
        if (!descripcion2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Descripción'.",
            });
            return false;
        }
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.rol.php`, {
                id_Rol: id_Rol,
                nombreRol: nombreRol,
                descripcion: descripcion,
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
                        navigate('/crud/roles');
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
                    <h1 className={styles.title}>registrar</h1>
                    <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                        <div className={`form-field col-lg-6 ${styles['form-field']}`}>
                            <input 
                            name="id_Rol2" 
                            id="id_Rol" 
                            value={id_Rol} 
                            onChange={(e) => setId_Rol(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="number" />
                            <label className={`${styles.label} label`} htmlFor="name">Id del Rol</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input 
                            name="nombreRol2" 
                            id="nombreRol" 
                            value={nombreRol} 
                            onChange={(e) => setNombreRol(e.target.value)} 
                            className={`${styles['input-text']} js-input`} 
                            type="text"/>
                            <label className={`${styles.label} label`} htmlFor="name">Nombre del Rol</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="desc" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className={`${styles['input-text']} js-input`} type="text"/>
                            <label className={`${styles.label} label`} htmlFor="company">Descripción</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <button
                                type="button"
                                onClick={() => navigate('/crud/roles')}
                                className={styles['submit-btn']}
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="registroCrud" className={styles['submit-btn']} type="submit" value="registrar" />
                        </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </section>
            </div>
        </>
    )
}

export default RegistrarRoles;