import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Ventas = () => {

    const navigate = useNavigate();
    
    const handleCerrarSesion = () => {
        navigate("/inicio");
    }
    const handleRegistro = () => {
        navigate("/crud/registrar_usuarios")
    }
    const handleUsuario = () => {
        navigate("/crud/usuarios")
    }
    const handleTienda = () => {
        navigate("/crud/tienda")
    }
    const handleProducto = () => {
        navigate("/crud/producto")
    }
    const handleFactura = () => {
        navigate("/crud/factura")
    }
    const handleCliente = () => {
        navigate("/crud/cliente")
    }
    const handleProveedor = () => {
        navigate("/crud/proveedor")
    }
    const handleMovimiento = () => {
        navigate("/crud/movimiento")
    }
    const handleRoles = () => {
        navigate("/crud/roles")
    }
    const handleEntregaProductos = () => {
        navigate("/crud/entrega_productos")
    }
    const handleInventario = () => {
        navigate("/crud/inventario")
    }
    const handleMetodosDePago = () => {
        navigate("/crud/metodosdepago")
    }
    const handleVentas = () => {
        navigate("/crud/ventas")
    }
    DataTable.use(DT);
    const [ventas, setVentas] = useState([]);
    // eslint-disable-next-line
    const [mensaje, setMensaje] = useState(null);

    const usuario1 = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuario1);
    
    const Lista = async () => {
        try {
            const respuesta = await axios.post(`http://localhost/adx/ADAX-Store-Manager/Crud/controlador/controlador.venta.php`, {
                listar: true,
            });
            console.log(respuesta.data);
            if (respuesta.data) {
                setVentas(respuesta.data);
            } else {
                console.log('listado no exitoso', respuesta.data)
                return null;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
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
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle " href="#top" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Usuarios</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleUsuario}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle active" href="#top" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">Tienda</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleTienda}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Producto</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleProducto}>lista</button></li>
                                    <li><button className="dropdown-item" onClick={handleRegistro}>registrar</button></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#top" role="button" data-bs-toggle="dropdown"
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
                        <span className="navbar-text me-3 active">Usuario: {usuario}
                        </span>
                        <button onClick={handleCerrarSesion} className="btn btn-outline-danger float-right end-0 me-0" type="submit">cerrar sesión</button>
                        <span className="navbar-text me-3 ms-3 active">Operacion: {mensaje}</span>
                    </div>
                </div>
            </nav>
            <div style={{ 'width': '99.9%' }}>
                <DataTable data={ventas} slots={{
                    9: (data, row) => (
                        <form action="actualizar.php" method="post">
                            <input type="hidden" name="doc" value={ventas[0]} />
                            <button type="submit" className="btn btn-warning">Modificar</button>
                        </form>
                    ),
                    10: (data, row) => (
                        <a className="btn btn-danger" href={`../../controlador/controlador.usuarios.php?docu=${row[0]}`}>
                            Eliminar
                        </a>
                    )
                }} id="usrtable" className="table table-container table-striped table-hover table-bordered table-responsive mt-4 table-sm">
                    <thead className="table-dark light-header">
                        <tr className="text-center">
                            <th style={{ 'fontWeight': 'normal' }}>Id de la Venta</th>
                            <th style={{ 'fontWeight': 'normal' }}>Fecha de la Venta</th>
                            <th style={{ 'fontWeight': 'normal' }}>Hora de Venta</th>
                            <th style={{ 'fontWeight': 'normal' }}>Estado de Venta</th>
                            <th style={{ 'fontWeight': 'normal' }}>Cliente</th>
                            <th style={{ 'fontWeight': 'normal' }}>Tienda</th>
                            <th style={{ 'fontWeight': 'normal' }}>Id del metodo de Pago</th>
                            <th style={{ 'fontWeight': 'normal' }}>Documento del Usuario</th>
                            <th style={{ 'fontWeight': 'normal' }}>Id Tienda del Usuario</th>
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

export default Ventas;