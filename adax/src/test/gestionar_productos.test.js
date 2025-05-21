import React from "react";
import axios from "axios";
import { obtenerProductos } from "../utils/api.js";
import { ContextoSesion } from "../context/sesion.jsx";
import GestionarProductos from "../components/gestionar_productos.jsx";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock de axios
jest.mock("axios");

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

// boton de CRUD del rol 1
test("Boton CRUD del rol 1", () => {
  const { getByText } = render(
    <MemoryRouter>
      <FakeProvider>
        <GestionarProductos />
      </FakeProvider>
    </MemoryRouter>
  );

  const botonCRUD = getByText("CRUD");
  expect(botonCRUD).toBeInTheDocument();
});

test("Lista funcion del componente gestionar_productos", async () => {
  const datosproducto = {
    data: [
      { id_Producto: 2, Nombre: "Samsung S24 Ultra", Marca: "Samsung" },
      { id_Producto: 27, Nombre: "Cuchillos de Cocina Zwilling", Marca: "Zwilling" }
    ]
  };
  axios.get.mockResolvedValue(datosproducto);

  const respuesta = await obtenerProductos();

  expect(respuesta).toEqual(datosproducto.data);

  respuesta.forEach(producto => {
    expect(producto).toHaveProperty("id_Producto");
    expect(producto).toHaveProperty("Nombre");
    expect(producto).toHaveProperty("Marca");
  });
});

test("Llama a buscar directamente", () => {
  const { getByPlaceholderText } = render(
    <MemoryRouter>
      <FakeProvider>
        <GestionarProductos />
      </FakeProvider>
    </MemoryRouter>
  );

  // Accede al componente y llama a buscar directamente
  const input = getByPlaceholderText("Escriba el nombre de un producto");
  fireEvent.change(input, { target: { value: "Samsung" } });

  // Aquí puedes verificar los efectos de la llamada a buscar
});
