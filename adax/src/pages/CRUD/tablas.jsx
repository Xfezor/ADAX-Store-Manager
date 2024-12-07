import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import axios from 'axios';


const Tabla = () => {
    DataTable.use(DT);
    const [usuarios, setUsuarios] = useState([]);
    const Lista = async () => {
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php`, {
                listar: true,
            });
            console.log(respuesta.data);
            if (respuesta.data) {
                setUsuarios(respuesta.data);
            } else {
                console.log('listado no exitoso', respuesta.data)
                return null;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
        console.log(usuarios);
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
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" href="#top" role="button"
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
                <DataTable options={{}} id="usrtable" className="table table-container table-striped table-hover table-bordered table-responsive mt-4 table-sm">
                    <thead className="table-dark light-header">
                        <tr className="text-center">
                            <th style={{ 'fontWeight': 'normal' }}>documento</th>
                            <th style={{ 'fontWeight': 'normal' }}>tipo_doc</th>
                            <th style={{ 'fontWeight': 'normal' }}>contrasena</th>
                            <th style={{ 'fontWeight': 'normal' }}>nombre1</th>
                            <th style={{ 'fontWeight': 'normal' }}>nombre2</th>
                            <th style={{ 'fontWeight': 'normal' }}>apellido1</th>
                            <th style={{ 'fontWeight': 'normal' }}>apellido2</th>
                            <th style={{ 'fontWeight': 'normal' }}>correo</th>
                            <th style={{ 'fontWeight': 'normal' }}>rol_id_Rol</th>
                            <th style={{ 'fontWeight': 'normal' }}>codigo_invitacion</th>
                            <th style={{ 'fontWeight': 'normal' }}>tienda_idtienda</th>
                            <th style={{ 'fontWeight': 'normal' }}>Modificar</th>
                            <th style={{ 'fontWeight': 'normal' }}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr className="text-center" key={index}>
                                <td>{usuario[0]}</td>
                                <td>{usuario[1]}</td>
                                <td>{usuario[2]}</td>
                                <td>{usuario[3]}</td>
                                <td>{usuario[4]}</td>
                                <td>{usuario[5]}</td>
                                <td>{usuario[6]}</td>
                                <td>{usuario[7]}</td>
                                <td>{usuario[8]}</td>
                                <td>{usuario[9]}</td>
                                <td>{usuario[10]}</td>
                                <td>
                                    <form action="actualizar.php" method="post">
                                        <input type="hidden" name="doc" value={usuario[0]} />
                                        <button type="submit" className="btn btn-warning">Modificar</button>
                                    </form>
                                </td>
                                <td>
                                    <a className="btn btn-danger" href={`../../controlador/controlador.usuarios.php?docu=${usuario[0]}`}>
                                        Eliminar
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </DataTable>
            </div>
        </div>
    );
}

export default Tabla;

