import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import axios from 'axios';


DataTable.use(DT);

const Factura = () => {
    const [factura, setFactura] = useState([]);

    const Lista = async () => {
        try {
            const respuesta = await axios.post(
                'http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php', 
                { listar: true }
            );
            console.log(respuesta.data); // Verifica los datos aquí
            if (respuesta.data) {
                setFactura(respuesta.data);
            } else {
                console.log('Listado no exitoso:', respuesta.data);
            }
        } catch (err) {
            console.error('Error al obtener los datos:', err);
        }
    };
    

    useEffect(() => {
        Lista();
    }, []);
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="../tablas.php">ADAX - CRUD</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topnavbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" href="#top" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Usuarios</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../usuario/listarusuarios.php">lista</a></li>
                                    <li><a className="dropdown-item" href="../usuario/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" href="#top" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../tienda/listartienda.php">lista</a></li>
                                    <li><a className="dropdown-item" href="../tienda/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle " href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Producto</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../producto/listarproducto.php">lista</a></li>
                                    <li><a className="dropdown-item" href="../producto/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle active" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Factura</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../factura/listarfactura.php">lista</a></li>
                                    <li><a className="dropdown-item" href="../factura/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Venta</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../venta/listarventa.php">lista</a></li>
                                    <li><a className="dropdown-item" href="../venta/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Proveedor</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../proveedor/listarproveedor.php">lista</a></li>
                                    <li><a className="dropdown-item" href="../proveedor/registrar.php">registrar</a></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle " href="#top" role="button" data-bs-toggle="dropdown" aria-expanded="false">Movimiento</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="../movimiento/listarmovimiento.php">lista</a></li>
                                    <li><a className="dropdown-item" href="../movimiento/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                        </ul>
                        <span className="navbar-text me-3 active">Usuario:
                        </span>
                        <a href="cerrarsesion.php" className="btn btn-outline-danger float-right end-0 me-0" type="submit">cerrar
                            sesión</a>
                    </div>
                </div>
            </nav>
            <div style={{ width: '99.9%' }}>
                <DataTable
                    data={factura}
                    slots={{
                        5: (data, row) => (
                            <form action="factura/actualizar.php" method="post">
                                <input type="hidden" name="venta_id_Venta" value={row.venta_id_Venta} />
                                <button type="submit" className="btn btn-warning">Modificar</button>
                            </form>
                        ),
                        6: (data, row) => (
                            <a
                                className="btn btn-danger"
                                href={`../../controlador/controlador.factura.php?venta_id_Venta=${row.venta_id_Venta}`}
                            >
                                Eliminar
                            </a>
                        ),
                    }}
                    id="usrtable"
                    className="table table-container table-striped table-hover table-bordered table-responsive mt-4 table-sm"
                >
                    <thead className="table-dark light-header">
                        <tr className="text-center">
                            <th>venta_id_Venta</th>
                            <th>producto_id_Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </DataTable>
            </div>
        </div>
    );
};

export default Factura;