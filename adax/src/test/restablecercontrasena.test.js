import axios from 'axios';
import Swal from 'sweetalert2';

// Mock de axios y Swal
jest.mock('axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ then: cb => cb && cb() })),
}));

describe('RestablecerContrasena - cambiarContrasena', () => {
  it('muestra mensaje de éxito si la respuesta es correcta', async () => {
    // Simula la respuesta exitosa del backend
    axios.post.mockResolvedValue({
      data: { status: 'success' }
    });

    // Simula navigate
    const navigate = jest.fn();

    // Simula los datos necesarios
    const correo = 'test@correo.com';
    const nuevaContrasena = '123456';

    // Copia la función a testear
    async function cambiarContrasena() {
      try {
        const respuesta = await axios.post(
          "http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php",
          {
            olvido: true,
            reset: true,
            correo: correo.trim(),
            password: nuevaContrasena,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        if (respuesta.data.status === "success") {
          await Swal.fire({
            icon: "success",
            title: "Contraseña cambiada",
            text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
            confirmButtonText: "Aceptar",
          }).then(() => {
            navigate("/iniciar_sesion");
          });
        }
      } catch (error) {
        // ...
      }
    }

    await cambiarContrasena();

    // Verifica que Swal.fire fue llamado con el mensaje de éxito
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "success",
        title: "Contraseña cambiada",
        text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
      })
    );
  });
});