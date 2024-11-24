
import Index from './pages/index.jsx';
import IniciarSesion from './pages/iniciar_sesion.jsx';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path='/iniciar_sesion' element={<IniciarSesion />}></Route>
        <Route path='*' element={<Index />}></Route>
      </Routes>
    </div>
  );
}

export default App;