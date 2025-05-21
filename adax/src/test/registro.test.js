import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registro from '../components/registro';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

test('renderiza Registro sin errores y cambia estado isEmpleado', () => {
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );

  const empleadoBtn = screen.getByText(/Empleado/i);
  expect(empleadoBtn).toBeInTheDocument();

  const tiendaBtn = screen.getByText(/Tienda/i);
  expect(tiendaBtn).toBeInTheDocument();

  fireEvent.click(tiendaBtn);

  fireEvent.click(empleadoBtn);
});
