import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IniciarSesion from '../components/iniciar_sesion.jsx';
import { ContextoSesion } from '../context/sesion.jsx';
import { MemoryRouter } from 'react-router-dom';

// Mock de navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

// Mock de axios
jest.mock('axios', () => {
  const actualAxios = jest.requireActual('axios');
  return {
    ...actualAxios,
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          success: true,
          token: 'fake.jwt.token'
        }
      })
    ),
    create: () => {
      // Devuelve el propio mock para que los métodos como get sigan funcionando
      return {
        get: actualAxios.get,
        interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } }
      };
    }
  };
});

// Mock de jwt-decode
jest.mock('jwt-decode', () => ({
  jwtDecode: () => ({
    data: {
      documento: '123456',
      nombreTienda: 'TiendaTest',
      id_Tienda: 1,
      rol: 2,
      codigo_invitacion: 'ABC123'
    }
  }),
}));

describe('IniciarSesion', () => {
  const iniciarSesionMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renderiza el formulario y permite iniciar sesión correctamente', async () => {
    render(
      <MemoryRouter>
        <ContextoSesion.Provider value={{ iniciarSesion: iniciarSesionMock }}>
          <IniciarSesion />
        </ContextoSesion.Provider>
      </MemoryRouter>
    );

    // Verifica que los campos estén en el documento
    expect(screen.getByPlaceholderText('Ingrese su correo electrónico...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese su Contraseña...')).toBeInTheDocument();

    // Escribe en los campos
    fireEvent.change(screen.getByPlaceholderText('Ingrese su correo electrónico...'), {
      target: { value: 'test@email.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Ingrese su Contraseña...'), {
      target: { value: '123456' }
    });

    // Envía el formulario
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // Espera a que se llame a iniciarSesion y navigate
    await waitFor(() => {
      expect(iniciarSesionMock).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/inicio');
    });
  });
});