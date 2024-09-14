function exitbutton(){
    window.location.href = "index.html";
}

function iniciarsesion(){
    window.location.href = "inicio.html";
}

function cambiarestadoBtn1(){

    setTimeout(function() {
      document.querySelector('#cont2').style.display = "flex";
      document.querySelector('#cont1').style.display = "none";
    }, 1);
  
  };
  
  function cambiarestadoBtn2(){
    setTimeout(function() {
      document.querySelector('#cont2').style.display = "flex";
      document.querySelector('#cont1').style.display = "none";
    }, 1);
  };
  
  function cambiarestadoBtn11(){
      setTimeout(function() {
      document.querySelector('#cont1').style.display = "flex";
      document.querySelector('#cont2').style.display = "none";
    }, 1);
  };
  
  function cambiarestadoBtn22(){
  
    setTimeout(function() {
      document.querySelector('#cont2').style.display = "felx";
      document.querySelector('#cont1').style.display = "none";
  
    }, 1);
  };