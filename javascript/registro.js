function cambiarestadoBtn1(){

  setTimeout(function() {
    document.querySelector('#cont2').style.display = "block";
    document.querySelector('#cont1').style.display = "none";
  }, 1);

};

function cambiarestadoBtn2(){
  setTimeout(function() {
    document.querySelector('#cont2').style.display = "block";
    document.querySelector('#cont1').style.display = "none";
  }, 1);
};

function cambiarestadoBtn11(){
    setTimeout(function() {
    document.querySelector('#cont1').style.display = "block";
    document.querySelector('#cont2').style.display = "none";
  }, 1);
};

function cambiarestadoBtn22(){

  setTimeout(function() {
    document.querySelector('#cont2').style.display = "block";
    document.querySelector('#cont1').style.display = "none";

  }, 1);
};

function backbutton(){
  window.location.href = "iniciar_sesion.html"
};
function exitbutton(){
  window.location.href = "https://www.google.com";
}