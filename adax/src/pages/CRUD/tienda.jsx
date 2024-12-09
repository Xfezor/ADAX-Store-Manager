import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import axios from 'axios';


const Tienda = () => {
    DataTable.use(DT);
    const [tienda, setTienda] = useState([]);
    
    const Lista = async () => {
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.tienda.php`, {
                listar: true,
            });
            console.log(respuesta.data);
            if (respuesta.data) {
                setTienda(respuesta.data);
            } else {
                console.log('listado no exitoso', respuesta.data)
                return null;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
        console.log(tienda);
    }
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
                                    <li><a className="dropdown-item" href="usuario/listarusuarios.php">lista</a></li>
                                    <li><a className="dropdown-item" href="usuario/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle active" href="#top" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="tienda/listartienda.php">lista</a></li>
                                    <li><a className="dropdown-item" href="tienda/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Producto</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="producto/listarproducto.php">lista</a></li>
                                    <li><a className="dropdown-item" href="producto/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Factura</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="factura/listarfactura.php">lista</a></li>
                                    <li><a className="dropdown-item" href="factura/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Venta</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="venta/listarventa.php">lista</a></li>
                                    <li><a className="dropdown-item" href="venta/registrar.php">registrar</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Proveedor</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="proveedor/listarproveedor.php">lista</a></li>
                                    <li><a className="dropdown-item" href="proveedor/registrar.php">registrar</a></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown" aria-expanded="false">Movimiento</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="movimiento/listarmovimiento.php">lista</a></li>
                                    <li><a className="dropdown-item" href="Amovimiento/registrar.php">registrar</a></li>
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
            <div style={{ 'width': '99.9%' }}>
                <DataTable data={tienda} slots={{
                    7: (data, row) => (
                        <form action="actualizar.php" method="post">
                            <input type="hidden" name="doc" value={tienda[0]} />
                            <button type="submit" className="btn btn-warning">Modificar</button>
                        </form>
                    ),
                    8: (data, row) => (
                        <a className="btn btn-danger" href={`../../controlador/controlador.usuarios.php?docu=${tienda[0]}`}>
                            Eliminar
                        </a>
                    )
                }} id="usrtable" className="table table-container table-striped table-hover table-bordered table-responsive mt-4 table-sm">
                    <thead className="table-dark light-header">
                        <tr className="text-center">
                            <th style={{ 'fontWeight': 'normal' }}>idtienda</th>
                            <th style={{ 'fontWeight': 'normal' }}>nombreTienda</th>
                            <th style={{ 'fontWeight': 'normal' }}>direccion</th>
                            <th style={{ 'fontWeight': 'normal' }}>telefono</th>
                            <th style={{ 'fontWeight': 'normal' }}>correo</th>
                            <th style={{ 'fontWeight': 'normal' }}>contrasena</th>
                            <th style={{ 'fontWeight': 'normal' }}>codigo_invitacion</th>
                            <th style={{ 'fontWeight': 'normal' }}>Modificar</th>
                            <th style={{ 'fontWeight': 'normal' }}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </DataTable>
            </div>
        </div>
    );
}

export default Tienda;

