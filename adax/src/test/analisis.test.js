import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Analisis from '../components/analisis.jsx';
import { ContextoSesion } from '../context/sesion.jsx';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  localStorage.setItem('usuario', JSON.stringify('Juan'));
  localStorage.setItem('tienda', JSON.stringify('Panadería San Juan'));
  localStorage.setItem('codigo_invitacion', JSON.stringify('ABC123'));
  localStorage.setItem('rol', JSON.stringify(1));
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

describe('Analisis Component', () => {
  it('renderiza correctamente y muestra productos desde la API', async () => {
    const productosMock = [
      ['1', 'Pan de Queso', '15'],
      ['2', 'Bizcocho', '5'],
      ['3', 'Croissant', '10'],
    ];

    axios.get.mockResolvedValue({ data: productosMock });

    render(
      <ContextoSesion.Provider value={{ cerrarSesion: jest.fn() }}>
        <MemoryRouter>
          <Analisis />
        </MemoryRouter>
      </ContextoSesion.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Pan de Queso')).toBeInTheDocument();
      expect(screen.getByText('Bizcocho')).toBeInTheDocument();
      expect(screen.getByText('Croissant')).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Popular|Medio Popular|No Popular/).length).toBeGreaterThan(0);
  });
});
