import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ProveedorSesion } from './context/sesion.jsx';
import Index from './components/index.jsx';
import IniciarSesion from './components/iniciar_sesion.jsx';
import Registro from './components/registro.jsx';
import Restablecer from './components/restablecercontrasena.jsx';
import Factura from './components/factura.jsx';
import Inicio from './components/inicio.jsx';
import Pago from './components/generar_pago.jsx';
import Ventas from './components/ventas.jsx';
import GestionarProductos from './components/gestionar_productos.jsx';
import Gestionarproveedores from './components/gestionar_proveedores.jsx';
import Analisis from './components/analisis.jsx';
import GestionarVentas from './components/gestionar_ventas.jsx';
import DetalleFactura from './components/detalle_factura.jsx';
import Usuarios from './components/CRUD/usuarios.jsx';
import ActualizarUsuarios from './components/CRUD/actualizar/actualizarUsuario.jsx';
import Tienda from './components/CRUD/tienda.jsx';
import Producto from './components/CRUD/producto.jsx';
function App() {
  return (
    <ProveedorSesion>
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
          <Route path="/gestionar_proveedores" element={<Gestionarproveedores />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/gestionar_ventas" element={<GestionarVentas />} />
          <Route path="/detalle_factura" element={<DetalleFactura />} />
          <Route path="/crud/usuarios" element={<Usuarios />} />
          <Route path="/crud/actualizar/actualizar_usuario" element={<ActualizarUsuarios />} />
          <Route path="/crud/tienda" element={<Tienda />} />
          <Route path="/crud/producto" element={<Producto />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </div>
    </ProveedorSesion>
  );
}

export default App;

