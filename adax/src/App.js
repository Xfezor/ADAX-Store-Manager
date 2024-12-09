import Index from './pages/index.jsx';
import IniciarSesion from './pages/iniciar_sesion.jsx';
import Registro from './pages/registro.jsx';
import Restablecer from './pages/restablecercontrasena.jsx';
import Factura from './pages/factura.jsx'; 
import Inicio from './pages/inicio.jsx'; 
import Pago from './pages/generar_pago.jsx'; 
import Ventas from './pages/ventas.jsx'; 
import GestionarProductos from './pages/gestionar_productos.jsx';
import Gestionarproveedores from './pages/gestionar_proveedores.jsx'
import Analisis from './pages/analisis.jsx';
import GestionarVentas from './pages/gestionar_ventas.jsx';
import DetalleFactura from './pages/detalle_factura.jsx';
import Usuarios from './pages/CRUD/usuarios.jsx';
import Tienda from './pages/CRUD/tienda.jsx';
import Producto from './pages/CRUD/producto.jsx';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/iniciar_sesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/restablecer_contrasena" element={<Restablecer />} />
        <Route path="/generar_pago" element={<Pago />} /> 
        <Route path="/factura" element={<Factura />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/gestionar_productos" element={< GestionarProductos />} />
        <Route path="/gestionar_proveedores" element={<Gestionarproveedores />}/>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/gestionar_ventas" element={<GestionarVentas />} />
        <Route path="/detalle_factura" element={<DetalleFactura />} />
        <Route path="/crud/usuarios" element={<Usuarios />} />
        <Route path="/crud/tienda" element={<Tienda />} />
        <Route path="/crud/producto" element={<Producto />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;

