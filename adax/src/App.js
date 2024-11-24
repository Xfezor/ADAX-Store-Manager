import Index from './pages/index.jsx';
import IniciarSesion from './pages/iniciar_sesion.jsx';
import Analisis from './pages/analisis.jsx';
import GestionarProductos from './pages/gestionar_productos.jsx';
import { Routes, Route } from "react-router-dom";   

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/iniciar_sesion" element={<IniciarSesion />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/gestionar_productos" element={<GestionarProductos />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
