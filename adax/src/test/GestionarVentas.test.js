import React from 'react';
import { render, screen } from '@testing-library/react';
import GestionarVentas from '../components/gestionar_ventas.jsx';
import { ContextoSesion } from '../context/sesion.jsx';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


// Mock de localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    switch (key) {
      case 'usuario': return JSON.stringify('usuarioTest');
      case 'tienda': return JSON.stringify('tiendaTest');
      case 'codigo_invitacion': return JSON.stringify('ABC123');
      case 'rol': return JSON.stringify(1); // Puedes cambiar a 3 para probar diferentes roles
      default: return null;
    }
  });

  Storage.prototype.removeItem = jest.fn();
});

// Mock del contexto
const cerrarSesion = jest.fn();

// TEST: Renderiza el título principal correctamente
test('Renderiza el título "Gestionar Facturas"', () => {
  render(
    <ContextoSesion.Provider value={{ cerrarSesion }}>
      <BrowserRouter>
        <GestionarVentas />
      </BrowserRouter>
    </ContextoSesion.Provider>
  );

  expect(screen.getByText('Gestionar Facturas')).toBeInTheDocument();
});

// TEST: Renderiza la sección del usuario y botón de cerrar sesión
test('Muestra nombre de usuario y botón de cerrar sesión', () => {
  render(
    <ContextoSesion.Provider value={{ cerrarSesion }}>
      <BrowserRouter>
        <GestionarVentas />
      </BrowserRouter>
    </ContextoSesion.Provider>
  );

  expect(screen.getByText(/Usuario: "usuarioTest"/)).toBeInTheDocument();
  expect(screen.getByText(/Tienda: "tiendaTest"/)).toBeInTheDocument();
  expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
});

// TEST: Renderiza el input de búsqueda
test('Renderiza el campo de búsqueda', () => {
  render(
    <ContextoSesion.Provider value={{ cerrarSesion }}>
      <BrowserRouter>
        <GestionarVentas />
      </BrowserRouter>
    </ContextoSesion.Provider>
  );

  const inputBusqueda = screen.getByPlaceholderText('Escriba un numero de venta o de producto');
  expect(inputBusqueda).toBeInTheDocument();
});