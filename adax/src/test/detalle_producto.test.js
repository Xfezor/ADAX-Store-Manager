import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { ContextoSesion } from '../context/sesion.jsx';
import Detalle from '../components/detalle_producto.jsx';
import axios from 'axios';

jest.mock('axios');

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
    useLocation: () => ({
      state: { id_Producto: 1 }
    }),
  };
});

beforeEach(() => {
  localStorage.setItem('usuario', JSON.stringify('Juan'));
  localStorage.setItem('tienda', JSON.stringify('Panadería San Juan'));
  localStorage.setItem('codigo_invitacion', JSON.stringify('ABC123'));
  localStorage.setItem('rol', JSON.stringify(1));
});

describe('Detalle Producto Component', () => {
  it('renderiza correctamente los datos del producto', async () => {
    // Mock de respuesta para producto y proveedores
    axios.get
      .mockResolvedValueOnce({
        data: [
          [
            'Pan de Queso', // nombre
            'MarcaX',       // marca
            '15',           // precio
            'Delicioso',    // descripcion
            'MarcaX',       // marca (repetido)
            'Panadería',    // categoria
            'Bolsa',        // presentacion
            '2025-12-31',   // fechaVencimiento
            '20',           // stock
            '5',            // stock_min
            1,              // estado
            'ProveedorX',   // nombrepr
            2               // idProveedor
          ]
        ]
      })
      .mockResolvedValueOnce({
        data: [
          ['ProveedorX', 2],
          ['ProveedorY', 3]
        ]
      });

    render(
      <ContextoSesion.Provider value={{ cerrarSesion: jest.fn() }}>
        <MemoryRouter>
          <Detalle />
        </MemoryRouter>
      </ContextoSesion.Provider>
    );

    // Espera a que los datos se carguen
    await waitFor(() => {
      expect(screen.getByDisplayValue('Pan de Queso')).toBeInTheDocument();
      expect(screen.getByDisplayValue('MarcaX')).toBeInTheDocument();
      expect(screen.getByDisplayValue('15')).toBeInTheDocument();
      expect(screen.getByDisplayValue('20')).toBeInTheDocument();
      expect(screen.getByDisplayValue('5')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Bolsa')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Delicioso')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Panadería')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2025-12-31')).toBeInTheDocument();

      // Verifica solo el input readonly del proveedor actual
      const proveedorInputs = screen.getAllByDisplayValue('ProveedorX');
      expect(
        proveedorInputs.some(input => input.getAttribute('readonly') !== null)
      ).toBe(true);
    });

    // Verifica que el select de proveedores tenga las opciones correctas
    const options = screen.getAllByRole('option');
    expect(options.some(opt => opt.textContent === 'ProveedorX')).toBe(true);
    expect(options.some(opt => opt.textContent === 'ProveedorY')).toBe(true);

    // Verifica que los botones principales existan
    expect(screen.getByText('Eliminar producto')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Aplicar cambios')).toBeInTheDocument();
  });
});