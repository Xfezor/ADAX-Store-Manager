import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('test de prueba: renderiza el componente App sin errores', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // No se realiza ninguna búsqueda ni aserción
});