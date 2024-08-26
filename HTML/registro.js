document.addEventListener('DOMContentLoaded', function () {
const empleadoBtn = document.getElementById('empleadoBtn');
const tiendaBtn = document.getElementById('tiendaBtn');
const empleadoForm = document.getElementById('empleadoForm');
const tiendaForm = document.getElementById('tiendaForm');

empleadoBtn.addEventListener('click', () => {
  empleadoBtn.classList.add('active');
  tiendaBtn.classList.remove('active');
  empleadoForm.style.display = 'block';
  tiendaForm.style.display = 'none';
});

tiendaBtn.addEventListener('click', () => {
  tiendaBtn.classList.add('active');
  empleadoBtn.classList.remove('active');
  tiendaForm.style.display = 'block';
  empleadoForm.style.display = 'none';
});
})