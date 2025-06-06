import { obtenerClientes } from "../utils/api";
import axios from "axios";

jest.mock("axios");


test('Verificar Lista de clientes', async () => {
    const datosClientes = {
        data: [
                {Documento: 1011322703, tipo_Documento: "CC", NombreCliente: "Alex", ApellidoCliente: "Castaño", correo: "alex.cas@gmail.com"},
                {Documento: 2147483647, tipo_Documento: "TI", NombreCliente: "Damianss", ApellidoCliente: "Camacho", correo: "damonod600@gmail.com"}
        ]
    };
    axios.get.mockResolvedValue(datosClientes);

    const respuesta = await obtenerClientes();

    expect(respuesta).toEqual(datosClientes.data);

    respuesta.forEach(cliente => {
        expect(cliente).toHaveProperty("Documento");
        expect(cliente).toHaveProperty("tipo_Documento");
        expect(cliente).toHaveProperty("NombreCliente");
        expect(cliente).toHaveProperty("ApellidoCliente");
        expect(cliente).toHaveProperty("correo");
    });
}
)

