import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContextoSesion } from '../context/sesion.jsx';


function RolCrud({ rol }) {
  if (rol === 1) {
    return (
      <button className={`btn btn-danger`}>CRUD</button>
    );
  }
  return null;
}

describe('Componente RolCrud', () => {
  test('muestra el botón CRUD cuando el rol es 1', () => {
    render(<RolCrud rol={1} />);
    expect(screen.getByText('CRUD')).toBeInTheDocument();
  });

  test('no muestra el botón CRUD cuando el rol no es 1', () => {
    const { container } = render(<RolCrud rol={2} />);
    expect(container.firstChild).toBeNull();
  });

  test('no muestra el botón CRUD cuando el rol es undefined', () => {
    const { container } = render(<RolCrud />);
    expect(container.firstChild).toBeNull();
  });
});