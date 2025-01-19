import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Factura = () => {
    const navigate = useNavigate();
    
    const handleCerrarSesion = () => {
      navigate("/inicio");
    };
    const handleRegistro = () => {
      navigate("/crud/registrar_usuarios");
    };
    const handleRegistroFactura = () => {
      navigate("/crud/registrar_factura");
    };
    const handleActualizarFactura = (row) => {
        const data = row;
        navigate(`/crud/actualizar/actualizarFactura/${row[0]}`, {state: data});  // Asegúrate de que el ID es el correcto
    }

    const [factura, setFactura] = useState([]);
    const [mensaje, setMensaje] = useState(null);

    const usuario1 = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuario1);

    const Lista = async () => {
        try {
            const respuesta = await axios.post(
                'http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php',
                { listar: true }
            );
            if (respuesta.data) {
                setFactura(respuesta.data);  // Asegúrate de que la respuesta tiene los datos correctos
            } else {
                console.log('Listado no exitoso:', respuesta.data);
                setFactura([]);  // Vaciar factura si no hay datos
            }
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            setFactura([]);  // Vaciar factura en caso de error
        }
    }

    const Eliminar = async (id) => {
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php`, {
                eliminar: id,
            });
            if (respuesta.data.respuesta) {
                setMensaje(respuesta.data.mensaje);
                Lista();  // Actualizar la lista después de eliminar
            } else {
                console.log('No fue exitoso:', respuesta.data.respuesta)
                setMensaje(respuesta.data.mensaje);
            }
        } catch (err) {
            console.error('Error al eliminar factura:', err);
        }
    }

    const handleModificarFactura = (row) => {
        // Asegúrate de que row[0] contiene el ID de la factura que se va a modificar
        navigate(`/crud/actualizarFactura/:id/${row[0]}`);
    }

    useEffect(() => {
        Lista();  // Cargar las facturas cuando el componente se monta
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <marque><a className="navbar-brand" href="../tablas.php">ADAX - CRUD</a></marque>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topnavbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle " href="#top" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Usuarios</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleUsuario}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistroFactura}>registrar</button></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle " href="#top" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleTienda}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle " href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Producto</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleProducto}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle active" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Factura</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleFactura}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Cliente</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleCliente}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Proveedor</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleProveedor}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown" aria-expanded="false">Movimiento</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleMovimiento}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown" aria-expanded="false">Roles</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleRoles}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown" aria-expanded="false">Entrega Pedidos</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleEntregaProductos}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown" aria-expanded="false">Inventario</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleInventario}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown" aria-expanded="false">Metodos de Pago</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleMetodosDePago}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ventas</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleVentas}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>

                        </ul>
                        <span className="navbar-text me-3 active">Usuario: {usuario}</span>
                        <button onClick={handleCerrarSesion} className="btn btn-outline-danger float-right end-0 me-0" type="submit">cerrar sesión</button>
                        <span className="navbar-text me-3 ms-3 active">Operacion: {mensaje}</span>
                    </div>
                </div>
            </nav>
            <div style={{ width: '99.9%' }}>
            <DataTable data={factura} slots={{
                    5: (data, row) => (
                        <button type="submit" className="btn btn-warning" onClick={() => handleActualizarFactura(row)}>Modificar</button>
                    ),
                    6: (data, row) => (
                        <button className="btn btn-danger" onClick={() => Eliminar(row[0])} >
                            Eliminar
                        </button>
                    )
                    }}id="usrtable" className="table table-container table-striped table-hover table-bordered table-responsive mt-4 table-sm"
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
