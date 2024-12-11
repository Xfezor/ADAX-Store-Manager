import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../registro/styles_registro.module.css';
import Swal from 'sweetalert2';


const RegistrarUsuarios = () => {

    const navigate = useNavigate();
    const [documento, setDocumento] = useState('');
    const [tipoDoc, setTipoDoc] = useState('CC');
    const [nombre, setNombre] = useState('');
    const [nombre2, setNombre2] = useState('');
    const [apellido, setApellido] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [codigoinv, setCodigoinv] = useState('');
    const [idrol, setRol] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Obtener valores del formulario
        var documento2 = document.getElementById("documento").value;
        var tipoDoc2 = document.getElementById("tipodoc").value;
        var nombre1 = document.getElementById("nom1").value;
        var apellido1 = document.getElementById("ape1").value;
        var correo = document.getElementById("correo").value;
        var password1 = document.getElementById("pass1").value;
        var codinv = document.getElementById("codinv").value;
        var idrol2 = document.getElementById("idrol").value;

        // Comprobar si los campos obligatorios están llenos
        if (documento2 == null || documento2.length < 10) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Documento', o ingrese un número de documento válido con 10 dígitos",
            });
            return false;
        }
        if (!tipoDoc2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Tipo de documento'.",
            });
            return false;
        }
        if (!nombre1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Nombre'.",
            });
            return false;
        }
        if (!apellido1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Apellido'.",
            });
            return false;
        }
        if (!correo) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Correo'.",
            });
            return false;
        }
        if (!password1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Contraseña'.",
            });
            return false;
        }
        if (!codinv) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'Código de invitación'.",
            });
            return false;
        }
        if (!idrol2) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete el campo 'id Rol'.",
            });
            return false;
        }

        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, ingrese un correo electrónico válido.",
            });
            return false;
        }
        // Comprobar criterios de contraseña
        const validarCont = (password) => {
            const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/; // Al menos 8 caracteres, una mayúscula y un número
            return regex.test(password);
        };

        // Comprobar criterios de contraseña (opcional)
        if (!validarCont(password1)) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula y un número.",
            });
            return false;
        }


        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php`, {
                nombre: nombre,
                nombre2: nombre2,
                apellido: apellido,
                apellido2: apellido2,
                documento: documento,
                tipoDoc: tipoDoc,
                email: email,
                contrasena: contrasena,
                codigo_invitacion: codigoinv,
                idRol: idrol,
                registroCrud: "registroCrud",
            });
            if (respuesta.data.success) {
                console.log('registro exitoso', respuesta.data)
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'El registro fue exitoso, puede iniciar sesión ahora',
                    icon: 'success',
                    confirmButtonText: 'Iniciar sesión'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/crud/usuarios');
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
                            <input name="document" id="documento" value={documento} onChange={(e) => setDocumento(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} for="name">Documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="tipoDoc2" id="tipodoc" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} for="email">Tipo de documento</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="contrasena" id="pass1" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} for="company">Contraseña</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="correo" id="correo" value={email} onChange={(e) => setEmail(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} for="phone">Correo</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre1" id="nom1" value={nombre} onChange={(e) => setNombre(e.target.value)}  className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} for="phone">Nombre 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="nombre2" id="text" value={nombre2} onChange={(e) => setNombre2(e.target.value)} className={`${styles['input-text']} js-input`} type="text" />
                            <label className={`${styles.label} label`} for="company">Nombre 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="apellido1" id="ape1" value={apellido} onChange={(e) => setApellido(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} for="phone">Apellido 1</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="apellido2" id="text" value={apellido2} onChange={(e) => setApellido2(e.target.value)} className={`${styles['input-text']} js-input`} type="text" />
                            <label className={`${styles.label} label`} for="company">Apellido 2</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="idrol" id="idrol" value={idrol} onChange={(e) => setRol(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} for="phone">Id rol</label>
                        </div>

                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="codigoinvitacion" id="codinv" value={codigoinv} onChange={(e) => setCodigoinv(e.target.value)} className={`${styles['input-text']} js-input`} type="text" required />
                            <label className={`${styles.label} label`} for="phone">Codigo invitacion</label>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <a href="listarusuarios.php"><input className={styles['submit-btn']} value="cancelar" /></a>
                        </div>
                        <div className={`form-field ${styles['form-field']} col-lg-6`}>
                            <input name="registrocrud" className={styles['submit-btn']} type="submit" value="Registrar" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default RegistrarUsuarios;