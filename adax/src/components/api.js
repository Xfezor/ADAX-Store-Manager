import axios from "axios";

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