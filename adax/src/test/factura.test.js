import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Factura from '../components/factura';
import { ContextoSesion } from '../context/sesion.jsx';

// FakeProvider para el contexto
const FakeProvider = ({ children }) => (
  <ContextoSesion.Provider value={{ cerrarSesion: jest.fn() }}>
    {children}
  </ContextoSesion.Provider>
);

// Simula una ubicación con state
const customLocationState = {
  totalPagar: 8000,
  cantidadRecibida: 10000,
  devuelta: 2000,
  prodCarrito: [
    [1, "Producto A", "Marca X", 4000, 2, { cantidad: 2 }],
    [2, "Producto B", "Marca Y", 2000, 1, { cantidad: 1 }],
  ],
};

beforeEach(() => {
  // Mock localStorage
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
      case 'id_Venta':
        return JSON.stringify(5);
      default:
        return null;
    }
  });

  Storage.prototype.removeItem = jest.fn();
});

test('renderiza Factura sin errores', () => {
  // Simula el componente siendo renderizado con estado
  render(
    <MemoryRouter
      initialEntries={[{ pathname: '/factura', state: customLocationState }]}
    >
      <FakeProvider>
        <Routes>
          <Route path="/factura" element={<Factura />} />
        </Routes>
      </FakeProvider>
    </MemoryRouter>
  );
});
