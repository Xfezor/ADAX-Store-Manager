function sendcodeandhide(){
    if (document.getElementById("input1").value.trim() === ""){
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
    if (document.getElementById("input2").value.trim() === ""){
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
        document.getElementById("input3").style.display= "block";
        document.getElementById("input4").style.display = "block";
        document.getElementById("input4").style.marginTop = "2%";
        document.getElementById("buttonConfirmCode").style.display = "none";
        document.getElementById("buttonChangePswd").style.display = "block";
    }
}

function cambiarContra(){
    var  password = document.getElementById("input3").value;
    var  passwordrepeat = document.getElementById("input4").value;

    if (password === passwordrepeat){
        alert("Contraseña cambiada exitosamente");

    } else {
        alert("La contraseña no coincide");

    }
}

function exitbutton(){
    window.location.href = "index.html";
}

function backbutton(){
    window.location.href = "iniciar_sesion.php";
}