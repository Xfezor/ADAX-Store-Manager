import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style_index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import '@fontsource-variable/montserrat';
function App() {
  return (
    <div className="App">
      <header>
        <div className="navbar" id="navbar">
          <div className="title">
            <img src="/img/nombre logo.png" style={{ width: '20%', height: '100%' }} alt="Logo" />
            <h1 className="titulo">Store Manager</h1>
          </div>
          <ul className="links">
            <li><a href="#sobre">Sobre ADAX</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#footer">Contacto</a></li>
          </ul>
          <a href="iniciar_sesion.php" className="action btn"><FontAwesomeIcon icon={faRocket} /> Inicia Aquí </a>
          <div className="toggle_btn">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </header>
      <div className="dropdown_menu" id="navbar2">
        <ul className="dropdown_ul">
          <li><a href="#sobre">Sobre ADAX</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#footer">Contacto</a></li>
          <li><a href="iniciar_sesion.php" className="action btn">Inicia Aquí</a></li>
        </ul>
      </div>
      <section className="queEs">
        <img src="/img/animacionadaxstoremanager.gif" alt="adax_letrero_neon" className="adax_letrero_neon" />
        <div className="cuadradito">
          <h1 className="pregunta-queEs"> ¿Qué es ADAX Store Manager?</h1>
          <p className="text-queEs">Bienvenido a <b>ADAX STORE MANAGER</b> <br />
            Ofrecemos una solución integral para la administración eficiente de tiendas con pequeños y medianos inventarios. Nuestro software está diseñado para simplificar:</p>
          <ul className="simplificar">
            <li className="caracteristicas">Registro de Ventas</li>
            <li className="caracteristicas">Control de Inventario</li>
            <li className="caracteristicas">Gestión de entradas y salidas de mercancía</li>
            <li className="caracteristicas">Seguimiento de flujo de caja</li>
          </ul>
        </div>
      </section>
      <section className="funcionalidad">
        <img src="/img/funcionalidades.png" alt="funcionalidades" className="funcionalidades" />
        <div className="cuadradito2">
          <h1 className="pregunta-inicio">Funcionalidades</h1>
          <p className="text-inicio">Podrás Gestionar tus:</p>
          <ul className="funcionalidades_text">
            <li className="gestiona">Movimientos (entradas y salidas)</li>
            <li className="gestiona">Proveedores</li>
            <li className="gestiona">Productos</li>
            <li className="gestiona">Inventario</li>
            <li className="gestiona">Reportes</li>
            <li className="gestiona">Facturas</li>
            <li className="gestiona">Clientes</li>
            <li className="gestiona">Ventas</li>
          </ul>
        </div>
      </section>
      <section className="sobre_adax" id="sobre">
        <img src="/img/logo.png" alt="logo" className="logo" />
        <div className="cuadrito3">
          <h1 className="adax">Sobre <img src="/img/nombre logo.png" alt="logo" className="logo2" /></h1>
          <p className="text_sobreadax">Somos aprendices del SENA del Énfasis de Análisis y Desarrollo de Software (ADSO), que quisieron seguir y mejorar sus conocimientos del técnico de Desarrollo de Software del colegio. Somos proactivos, nos encanta el trabajo en equipo e intentamos resolver todo de manera rápida y efectiva. Cada uno aporta a través de la creatividad o de sus conocimientos. Este grupo está conformado por: </p>
          <ul className="sobre_grupo">
            <li className="sobre_grupo">Brigitt Natalia Barbosa Gonzales</li>
            <li className="sobre_grupo">Damian Alejandro Camacho del Río</li>
            <li className="sobre_grupo">Evelyn Stephanie Giraldo Torres</li>
            <li className="sobre_grupo">Santiago Martínez Molina</li>
            <li className="sobre_grupo">Sara Sofía Trujillo Mondragón</li>
          </ul>
          
        </div>
      </section>
      <section className="caracteristicas_adax">
        <img src="/img/equipo.png" alt="imagen de equipo de trabajo" className="equipo" />
        <div className="cuadradito4">
          <h1 className="titulo_cuadradito3">En qué nos destacamos</h1>
          <h3 className="text1">Comunicación y Colaboración</h3>
          <ul className="destacar_text">
            <li className="caracteristica1">Mantenemos un diálogo abierto y frecuente con nuestros clientes</li>
            <li className="caracteristica2">Presentamos avances y resultados parciales de manera periódica</li>
          </ul>
          <h3 className="text2">Flexibilidad y Adaptabilidad</h3>
          <ul className="destacar_text">
            <li className="caracteristica3">Valoramos sugerencias y opiniones de nuestros clientes</li>
            <li className="caracteristica4">Incorporamos cambios ágilmente en el proceso de desarrollo</li>
          </ul>
          <h3 className="text3">Transparencia y Confianza</h3>
          <ul className="destacar_text">
            <li className="caracteristica5">Compartimos desafíos y logros del proyecto de manera clara y honesta</li>
            <li className="caracteristica6">Fomentamos un ambiente de confianza mutua</li>
          </ul>
          <h3 className="text4">Mejora Continua</h3>
          <ul className="destacar_text">
            <li className="caracteristica7">Utilizamos retroalimentación de clientes para perfeccionar nuestros procesos</li>
            <li className="caracteristica8">Elevamos la cantidad de nuestros servicios</li>
          </ul>
          <h3 className="text5">Nuestro Enfoque</h3>
          <ul className="destacar_text">
            <li className="caracteristica9">Trabajamos en estrecha colaboración con nuestros clientes para alcanzar resultados excelentes</li>
            <li className="caracteristica10">Construimos relaciones duraderas basadas en la confianza y el entendimiento mutuo</li>
          </ul>
        </div>
        <br />
        <hr />
      </section>
      <section className="servicios" id="servicios">
        <img src="/img/programador.jpeg" alt="imagen de un programador" className="imagen_programador" />
        <div className="cuadradito5">
          <h1 className="">Servicios</h1>
          <ul className="servicios_text">
            <li className="servicio">Consultoría en tecnología y arquitectura de software</li>
            <li className="servicio">Mantenimiento y Soporte de Software</li>
            <li className="servicio">Desarrollo Web (Sitios y Aplicaciones)</li>
            <li className="servicio">Desarrollo de Software a la Medida</li>
            <li className="servicio">Asesoría y apoyo en proyectos</li>
          </ul>
        </div>
      </section>
      <footer id="footer">
        <div className="container">
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
            <div className="logofooter col mb-3">
              <img src="/img/logo.png" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none" width="50" height="60" alt="Logo Footer" />
              <p className="text-body-secondary">© 2024</p>
            </div>
            <div className="integrantes col mb-3">
              <h5>Integrantes</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">Brigitt Natalia Barbosa Gonzales</li>
                <li className="nav-item mb-2">Damian Alejandro Camacho del Río</li>
                <li className="nav-item mb-2">Evelyn Stephanie Giraldo Torres</li>
                <li className="nav-item mb-2">Santiago Martínez Molina</li>
                <li className="nav-item mb-2">Sara Sofía Trujillo Mondragón</li>
              </ul>
            </div>
            <div className="correos col mb-3">
              <h5>Correos</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">BarbozalesNalitt@gmail.com</li>
                <li className="nav-item mb-2">damono06@gmail.com</li>
                <li className="nav-item mb-2">Sgiraldotorres@gmail.com</li>
                <li className="nav-item mb-2">martinotes95@gmail.com</li>
                <li className="nav-item mb-2">Saragontrujia@gmail.com</li>
              </ul>
            </div>
          </footer>
        </div>
      </footer>
    </div>
  );
}

export default App;