import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Tabla = () => {
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
        </div>
    );
}

export default Tabla;

