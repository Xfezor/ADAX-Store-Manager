import Index from './pages/index.jsx';
import IniciarSesion from './pages/iniciar_sesion.jsx';
import Factura from './pages/factura'; 
import Inicio from './pages/inicio'; 
import Pago from './pages/generar_pago'; 
import Ventas from './pages/ventas'; 
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
        <Route path="*" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;

