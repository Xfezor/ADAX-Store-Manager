// filepath: [inicio.test.js](http://_vscodecontentref_/2)
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Inicio from '../components/inicio';
import { ContextoSesion } from '../context/sesion.jsx';

// Fake provider para el contexto
const FakeProvider = ({ children }) => (
  <ContextoSesion.Provider value={{ cerrarSesion: jest.fn() }}>
    {children}
  </ContextoSesion.Provider>
);

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

test('renderiza Inicio sin errores', () => {
  render(
    <MemoryRouter>
      <FakeProvider>
        <Inicio />
      </FakeProvider>
    </MemoryRouter>
  );
  // No se realiza ninguna búsqueda ni aserción, solo prueba de renderizado
});