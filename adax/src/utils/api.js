import axios from "axios";
import { ip } from "./ipconfig";
import { port } from "./ipconfig";
import { protocol } from "./ipconfig";

export const obtenerProductos = async (codigo_invitacion) => {
    const codigo = codigo_invitacion || 94;
  try {
    const respuesta = await axios.get(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?listarProductosApp=true&codigo_invitacion=${codigo}`);
    return respuesta.data || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const obtenerClientes = async (codigo_invitacion) => {
  const codigo = codigo_invitacion || 94;
  try {
    const respuesta = await axios.get(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.cliente.php?listarClientesTienda=true&codigo_invitacion=${codigo}`);
    return respuesta.data || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}