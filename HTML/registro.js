
document.querySelector('#empleadoBtn').addEventListener('click', () => {
  setTimeout(function() {
    document.querySelector('#empleadoBtn').classList.remove('btn1');
    document.querySelector('#empleadoBtn').classList.add('btn1-active');
    document.querySelector('#tiendaBtn').classList.remove('btn2-active');
    document.querySelector('#tiendaBtn').classList.add('btn2');
    document.querySelector('#cont1').style.display = "none";
    document.querySelector('#cont2').style.display = "block";
  }, 0);

}); 

document.querySelector('#tiendaBtn').addEventListener('click', () => {

  setTimeout(function() {
    document.querySelector('#empleadoBtn').classList.remove('btn1-active');
    document.querySelector('#empleadoBtn').classList.add('btn1');
    document.querySelector('#tiendaBtn').classList.remove('btn2');
    document.querySelector('#tiendaBtn').classList.add('btn2-active');
    document.querySelector('#cont1').style.display = "none";
    document.querySelector('#cont2').style.display = "block";
  }, 0);
}); 

document.querySelector('#empleadoBtn1').addEventListener('click', () => {

  setTimeout(function() {
    document.querySelector('#empleadoBtn1').classList.remove('btn1');
    document.querySelector('#empleadoBtn1').classList.add('btn1-active');
    document.querySelector('#tiendaBtn1').classList.remove('btn2-active');
    document.querySelector('#tiendaBtn1').classList.add('btn2');
    document.querySelector('#cont2').style.display = "none";
    document.querySelector('#cont1').style.display = "block";
  }, 0);
}); 

document.querySelector('#tiendaBtn1').addEventListener('click', () => {

  setTimeout(function() {
    document.querySelector('#empleadoBtn1').classList.remove('btn1-active');
    document.querySelector('#empleadoBtn1').classList.add('btn1');
    document.querySelector('#tiendaBtn1').classList.remove('btn2');
    document.querySelector('#tiendaBtn1').classList.add('btn2-active');
    document.querySelector('#cont1').style.display = "none";
    document.querySelector('#cont2').style.display = "block";
  }, 0);
}); 