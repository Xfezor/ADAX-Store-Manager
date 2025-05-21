import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Movimientos from '../components/movimientos.jsx';
import { ContextoSesion } from '../context/sesion.jsx';
import { MemoryRouter } from 'react-router-dom';

// Mock de axios
jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        [1, 'Producto A', 10, 5, 2, 13, '2024-05-21'],
        [2, 'Producto B', 20, 0, 5, 15, '2024-05-22'],
      ]
    })
  ),
}));

// Mock de localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    switch (key) {
      case 'usuario':
        return JSON.stringify('usuarioTest');
      case 'tienda':
        return JSON.stringify('tiendaTest');
      case 'codigo_invitacion':
        return JSON.stringify('ABC123');
      case 'rol':
        return JSON.stringify(1);
      default:
        return null;
    }
  });
  Storage.prototype.removeItem = jest.fn();
});

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Movimientos', () => {
  const cerrarSesionMock = jest.fn();

  function renderComponent() {
    render(
      <MemoryRouter>
        <ContextoSesion.Provider value={{ cerrarSesion: cerrarSesionMock }}>
          <Movimientos />
        </ContextoSesion.Provider>
      </MemoryRouter>
    );
  }

  test('renderiza la tabla de movimientos y muestra los datos correctamente', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Producto A')).toBeInTheDocument();
      expect(screen.getByText('Producto B')).toBeInTheDocument();
    });

    // Verifica que los datos de la tabla estén presentes (usa getAllByText para valores repetidos)
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('5').length).toBeGreaterThan(1);
    expect(screen.getAllByText('2').length).toBeGreaterThan(0); // <--- Cambiado aquí
    expect(screen.getByText('13')).toBeInTheDocument();
    expect(screen.getByText('2024-05-21')).toBeInTheDocument();

    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('2024-05-22')).toBeInTheDocument();

    expect(screen.getByText(/Usuario: "usuarioTest"/)).toBeInTheDocument();
    expect(screen.getByText(/Tienda: "tiendaTest"/)).toBeInTheDocument();
    expect(screen.getByText(/Codigo invitacion: "ABC123"/)).toBeInTheDocument();
  });

  test('el botón CRUD aparece solo para rol 1', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('CRUD')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('CRUD'));
    expect(mockNavigate).toHaveBeenCalledWith('/crud/usuarios');
  });

  test('el botón Cerrar sesión llama a cerrarSesion', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(cerrarSesionMock).toHaveBeenCalled();
  });

  test('el botón de volver llama a navigate(-1)', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
    });
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('el botón de salir llama a navigate("/inicio")', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
    });
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    expect(mockNavigate).toHaveBeenCalledWith('/inicio');
  });
});