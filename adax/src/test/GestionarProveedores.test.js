import React from 'react';
import { render, screen } from '@testing-library/react';
import GestionarProveedores from '../components/gestionar_proveedores.jsx';
import { ContextoSesion } from '../context/sesion.jsx';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    switch (key) {
      case 'usuario': return JSON.stringify('testuser');
      case 'tienda': return JSON.stringify('teststore');
      case 'codigo_invitacion': return JSON.stringify('ABC123');
      case 'rol': return JSON.stringify(1);
      default: return null;
    }
  });
});

// Context mock
const cerrarSesion = jest.fn();

test('renders the title "Gestionar proveedores"', () => {
  render(
    <ContextoSesion.Provider value={{ cerrarSesion }}>
      <BrowserRouter>
        <GestionarProveedores />
      </BrowserRouter>
    </ContextoSesion.Provider>
  );
  expect(screen.getByText('Gestionar proveedores')).toBeInTheDocument();
});