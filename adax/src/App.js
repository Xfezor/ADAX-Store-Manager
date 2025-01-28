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
import RegistrarUsuarios from './components/CRUD/registro/registrarUsuarios.jsx';
import RegistrarFactura from './components/CRUD/registro/registrarFactura.jsx';
import RegistrarUsuarios from './components/CRUD/registro/registrarUsuarios.jsx';
import RegistrarProveedor from './components/CRUD/registro/registrarProveedor.jsx';
import RegistrarFactura from './components/CRUD/registro/registrarUsuarios.jsx';
import RegistrarCliente from './components/CRUD/registro/registrarCliente.jsx';
import RegistrarMovimiento from './components/CRUD/registro/registrarMovimiento.jsx';
import ActualizarUsuarios from './components/CRUD/actualizar/actualizarUsuario.jsx';
import ActualizarProveedor from './components/CRUD/actualizar/actualizarProveedor.jsx';
import ActualizarFactura from './components/CRUD/actualizar/actualizarFactura.jsx';
import ActualizarCliente from './components/CRUD/actualizar/actualizarCliente.jsx';
import ActualizarMovimiento from './components/CRUD/actualizar/actualizarMovimiento.jsx';
import Tienda from './components/CRUD/tienda.jsx';
import Producto from './components/CRUD/producto.jsx';
import Movimiento from './components/CRUD/movimiento.jsx';
import Facturass from './components/CRUD/facturass.jsx';
import Cliente from './components/CRUD/cliente.jsx';
import Proveedor from './components/CRUD/proveedor.jsx';
import Roles from './components/CRUD/roles.jsx';
import ActualizarRoles from './components/CRUD/actualizar/actualizarRol.jsx';
import RegistrarRoles from './components/CRUD/registro/registrarRol.jsx';
import EntregaPedidos from './components/CRUD/entrega_pedidos.jsx';
import Inventario from './components/CRUD/inventario.jsx';
import Metodos_de_Pago from './components/CRUD/metodosdepago.jsx';
import Venta from './components/CRUD/ventas.jsx';

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
          <Route path="/crud/factura" element={<Facturass />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/gestionar_productos" element={<GestionarProductos />} />
          <Route path="/gestionar_proveedores" element={<Gestionarproveedores />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/crud/movimiento" element={<Movimiento />} />
          <Route path="/gestionar_ventas" element={<GestionarVentas />} />
          <Route path="/detalle_factura" element={<DetalleFactura />} />
          <Route path="/crud/usuarios" element={<Usuarios />} />
          <Route path="/crud/registrar_usuarios" element={<RegistrarUsuarios />} />
          <Route path="/crud/registrar_proveedor" element={<RegistrarProveedor />} />
          <Route path="/crud/registrar_factura" element={<RegistrarFactura />} />
          <Route path="/crud/registrar_cliente" element={<RegistrarCliente/>} />
          <Route path="/crud/registrar_Movimiento" element={<RegistrarMovimiento/>} />
          <Route path="/crud/actualizar/actualizarUsuario" element={<ActualizarUsuarios />} />
          <Route path="/crud/actualizar/actualizarProveedor" element={<ActualizarProveedor />} />
          <Route path="/crud/actualizar/actualizarFactura/:id" element={<ActualizarFactura />} />
          <Route path="/crud/actualizar/actualizarCliente" element={<ActualizarCliente/>} />
          <Route path="/crud/actualizar/actualizarMovimiento" element={<ActualizarMovimiento/>} />
          <Route path="/crud/tienda" element={<Tienda />} />
          <Route path="/crud/producto" element={<Producto />} />
          <Route path="/crud/proveedor" element={<Proveedor />} />
          <Route path="/crud/cliente" element={<Cliente />} />
          <Route path="/crud/roles" element={<Roles />} />
          <Route path="/crud/actualizar/actualizarRol" element={<ActualizarRoles />} />
          <Route path="/crud/registrar_rol" element={<RegistrarRoles />} />
          <Route path="/crud/entrega_pedidos" element={<EntregaPedidos />} />
          <Route path="/crud/inventario" element={<Inventario />} />
          <Route path="/crud/metodosdepago" element={<Metodos_de_Pago />} />
          <Route path="/crud/ventas" element={<Venta />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </div>
    </ProveedorSesion>
  );
}

export default App;
