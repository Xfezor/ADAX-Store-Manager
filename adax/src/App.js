import Index from './pages/index.jsx';
import IniciarSesion from './pages/iniciar_sesion.jsx';
import Factura from './pages/factura.jsx'; 
import Inicio from './pages/inicio.jsx'; 
import Pago from './pages/generar_pago.jsx'; 
import Ventas from './pages/ventas.jsx'; 
import Analisis from './pages/analisis.jsx';
import { Routes, Route } from "react-router-dom";   

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/iniciar_sesion" element={<IniciarSesion />} />
        <Route path="/generar_pago" element={<Pago />} /> 
        <Route path="/factura" element={<Factura />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;

