import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ventas from '../components/ventas';
import { ContextoSesion } from '../context/sesion.jsx';

// Proveedor falso para simular una sesión activa
const FakeSesionProvider = ({ children }) => (
  <ContextoSesion.Provider value={{ cerrarSesion: jest.fn() }}>
    {children}
  </ContextoSesion.Provider>
);


beforeEach(() => {
  localStorage.setItem('usuario', JSON.stringify('UsuarioTest'));
  localStorage.setItem('id_Tienda', JSON.stringify(1));
  localStorage.setItem('tienda', JSON.stringify('TiendaTest'));
  localStorage.setItem('codigo_invitacion', JSON.stringify('ABC123'));
  localStorage.setItem('rol', JSON.stringify(2));
  localStorage.setItem('documento', JSON.stringify('123456'));
  localStorage.removeItem('prodCarrito');
});


jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        [1, 'Producto1', 'Marca1', 100, 1, 10],
        [2, 'Producto2', 'Marca2', 200, 1, 5],
      ],
    })
  ),
}));

describe('Comportamiento de usuario en Ventas', () => {
  test('Un usuario agrega dos veces el mismo producto al carrito y ve la cantidad correcta', async () => {
    //usuario entra a la pantalla de ventas
    render(
      <MemoryRouter>
        <FakeSesionProvider>
          <Ventas />
        </FakeSesionProvider>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Producto1')).toBeInTheDocument());

    
    const botonAgregar = screen.getAllByText('1+')[0];
    fireEvent.click(botonAgregar);
    await waitFor(() => {
      expect(screen.getAllByText('Producto1').length).toBeGreaterThan(0);
      expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    });

    fireEvent.click(botonAgregar);
    await waitFor(() => {
      expect(screen.getAllByText('2').length).toBeGreaterThan(0);
    });
  });
});