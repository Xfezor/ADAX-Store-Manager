import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles_olvide_Contrasena.module.css';
import '@fontsource-variable/montserrat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function sendcodeandhide() {
    if (document.getElementById("input1").value.trim() === "") {
        alert("Por favor, ingrese un correo electronico");
        return false;
    } else {
        document.getElementById("text1").style.display = "none";
        document.getElementById("text2").style.display = "block"
        document.getElementById("middletittle1").style.display = "none";
        document.getElementById("middletittle2").style.display = "block";
        document.getElementById("input1").style.display = "none";
        document.getElementById("input2").style.display = "block";
        document.getElementById("buttonSendCode").style.display = "none";
        document.getElementById("buttonConfirmCode").style.display = "block";
    }
}

function confirmcode() {
    if (document.getElementById("input2").value.trim() === "") {
        alert("Por favor, ingrese un codigo");
        return false;
    } else {
        document.getElementById("bigtitle1").style.display = "none";
        document.getElementById("bigtitle2").style.display = "block";
        document.getElementById("text2").style.display = "none"
        document.getElementById("text3").style.display = "block"
        document.getElementById("middletittle2").style.display = "none";
        document.getElementById("middletittle3").style.display = "block";
        document.getElementById("input2").style.display = "none";
        document.getElementById("input3").style.display = "block";
        document.getElementById("input4").style.display = "block";
        document.getElementById("input4").style.marginTop = "2%";
        document.getElementById("buttonConfirmCode").style.display = "none";
        document.getElementById("buttonChangePswd").style.display = "block";
    }
}

function cambiarContra() {
    var password = document.getElementById("input3").value;
    var passwordrepeat = document.getElementById("input4").value;

    if (password === passwordrepeat) {
        alert("Contraseña cambiada exitosamente");

    } else {
        alert("La contraseña no coincide");

    }
}

const RestablecerContrasena = () => {
    const navigate = useNavigate();


    const backbutton = () => {
        console.log("Volver atrás");
        navigate(-1);
    };

    const exitbutton = () => {
        console.log("Salir");
        navigate('/inicio');
    };


    return (
        <>
            <header>
                <div className={styles.contenedorarriba}>
                    <button className={styles.back} onClick={backbutton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={styles.adax}>
                        <h1 className={styles.title}>ADAX Store Manager</h1>
                    </div>
                    <button className={styles.exit} onClick={exitbutton}>
                        <FontAwesomeIcon icon={faXmark} clasName={styles.exit} />
                    </button>
                </div>
            </header>
            <div className={styles.cuadradoverde} style={{ display: 'block' }}>
                <form className={styles.Contenedorsesion}>
                    <h1 id="bigtitle1" className={styles.tituloOlvideMiContraseña}><b>Olvidé mi contraseña</b></h1>
                    <h1 id="bigtitle2" className={styles.tituloOlvideMiContraseña} style={{ display: 'none' }}    ><b>Nueva contraseña</b></h1>
                    <h2 id="text1" className={styles.textoOlvide}><b>Escriba el correo asociado con su cuenta, así le podremos enviar un codigo de confirmación para poder cambiar la contraseña.</b></h2>
                    <h2 id="text2" className={styles.textoOlvide} style={{ display: 'none' }}><b>Se ha enviado un codigo de seguridad al (correo)</b></h2>
                    <h2 id="text3" className={styles.textoOlvide} style={{ display: 'none' }}><b>Escriba su nueva contraseña</b></h2>
                    <h1 id="middletittle1" className={styles.usernameText}><b>Correo electronico</b></h1>
                    <h1 id="middletittle2" className={styles.usernameText} style={{ display: 'none' }}><b>Codigo de seguridad</b></h1>
                    <h1 id="middletittle3" className={styles.usernameText} style={{ display: 'none' }}><b>Contraseña</b></h1>
                    <input id="input1" type="email" placeholder="Ingrese su correo electronico" className={styles.input} required />
                    <input id="input2" type="text" placeholder="Ingrese el codigo de seguridad" className={styles.input} required style={{ display: 'none' }} />
                    <h1 id="middletittle3" className={styles.usernameText} style={{ display: 'none' }}><b>Contraseña</b></h1>
                    <input id="input3" type="password" placeholder="Ingrese su contraseña" className={styles.input} required style={{ display: 'none' }} />
                    <h1 id="middletittle4" className={styles.usernameText}><b>Repita su contraseña</b></h1>
                    <input id="input4" type="password" placeholder="Repita su contraseña" className={styles.input} required style={{ display: 'none' }} />
                    <div className="invalid-feedback">Por favor, ingrese su usuario</div>
                    <button className="btn btn-danger" id="buttonSendCode" type="submit" onclick={sendcodeandhide}>Enviar código</button>
                    <button className="btn btn-danger" id="buttonConfirmCode" type="submit" onclick={confirmcode} style={{ display: 'none' }}>Confirmar código</button>
                </form>
                <button className="btn btn-danger" id="buttonChangePswd" onclick={cambiarContra} style={{ display: 'none' }}>Cambiar contraseña</button>
            </div>
        </>
    )
}

export default RestablecerContrasena;
