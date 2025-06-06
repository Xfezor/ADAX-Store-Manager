import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles_registro.module.css';
import { ip, port, protocol } from '../../../utils/ipconfig.js';

const ActualizarProducto = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state || {};

    const [id_Producto, setId_Producto] = useState(initialData[0] || '');
    const [Nombre, setNombre] = useState(initialData[1] || '');
    const [Precio_unit, setPrecio_unit] = useState(initialData[2] || '');
    const [Descripcion, setDescripcion] = useState(initialData[3] || '');
    const [Marca, setMarca] = useState(initialData[4] || '');
    const [Categoria, setCategoria] = useState(initialData[5] || '');
    const [Presentacion, setPresentacion] = useState(initialData[6] || '');
    const [Fecha_vencimiento, setFecha_vencimiento] = useState(initialData[7] || '');
    const [Stock, setStock] = useState(initialData[8] || '');
    const [Stock_Min, setStock_Min] = useState(initialData[9] || '');
    const [estado, setEstado] = useState(initialData[10] || '');
    const [inventario_id_Inventario, setInventario_id_Inventario] = useState(initialData[11] || '');
    const [idProveedor, setIdProveedor] = useState(initialData[12] || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'id_Producto': setId_Producto(value); break;
            case 'Nombre': setNombre(value); break;
            case 'Precio_unit': setPrecio_unit(value); break;
            case 'Descripcion': setDescripcion(value); break;
            case 'Marca': setMarca(value); break;
            case 'Categoria': setCategoria(value); break;
            case 'Presentacion': setPresentacion(value); break;
            case 'Fecha_vencimiento': setFecha_vencimiento(value); break;
            case 'Stock': setStock(value); break;
            case 'Stock_Min': setStock_Min(value); break;
            case 'estado': setEstado(value); break;
            case 'inventario_id_Inventario': setInventario_id_Inventario(value); break;
            case 'idProveedor': setIdProveedor(value); break;
            default: break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id_Producto', id_Producto);
            formData.append('Nombre', Nombre);
            formData.append('Precio_unit', Precio_unit);
            formData.append('Descripcion', Descripcion);
            formData.append('Marca', Marca);
            formData.append('Categoria', Categoria);
            formData.append('Presentacion', Presentacion);
            formData.append('Fecha_vencimiento', Fecha_vencimiento);
            formData.append('Stock', Stock);
            formData.append('Stock_Min', Stock_Min);
            formData.append('estado', estado);
            formData.append('inventario_id_Inventario', inventario_id_Inventario);
            formData.append('idProveedor', idProveedor);
            formData.append('modificarProducto2', true);

            const respuesta = await axios.post(
                `${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php`,
                formData
            );
            navigate('/crud/producto', { state: respuesta.data?.mensaje || "Producto actualizado" });
        } catch (err) {
            console.error(err);
            navigate('/crud/producto', { state: "Error al actualizar" });
        }
    };

    const handleCancel = () => {
        navigate('/crud/producto');
    };
    useEffect(() => {
        const validador = () => {
            if (localStorage.getItem('usuario') === null) {
                navigate("/iniciar_sesion");
            };
        };
        validador();
    }, [navigate])

    return (
        <div className='form-box'>
            <section className={styles['get-in-touch']}>
                <h1 className={styles.title}>Actualizar Producto</h1>
                <form className={`${styles['contact-form']} contact-form row`} onSubmit={handleSubmit}>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="id_Producto" value={id_Producto} onChange={handleChange} id="id_Producto" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="id_Producto">id_Producto</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Nombre" value={Nombre} onChange={handleChange} id="Nombre" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Nombre">Nombre</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Precio_unit" value={Precio_unit} onChange={handleChange} id="Precio_unit" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Precio_unit">Precio_unit</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Descripcion" value={Descripcion} onChange={handleChange} id="Descripcion" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Descripcion">Descripcion</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Marca" value={Marca} onChange={handleChange} id="Marca" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Marca">Marca</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Categoria" value={Categoria} onChange={handleChange} id="Categoria" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Categoria">Categoria</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Presentacion" value={Presentacion} onChange={handleChange} id="Presentacion" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Presentacion">Presentacion</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Fecha_vencimiento" value={Fecha_vencimiento} onChange={handleChange} id="Fecha_vencimiento" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Fecha_vencimiento">Fecha_vencimiento</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Stock" value={Stock} onChange={handleChange} id="Stock" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Stock">Stock</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="Stock_Min" value={Stock_Min} onChange={handleChange} id="Stock_Min" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="Stock_Min">Stock_Min</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="estado" value={estado} onChange={handleChange} id="estado" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="estado">estado</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <input name="inventario_id_Inventario" value={inventario_id_Inventario} onChange={handleChange} id="inventario_id_Inventario" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="inventario_id_Inventario">inventario_id_Inventario</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-12`}>
                        <input name="idProveedor" value={idProveedor} onChange={handleChange} id="idProveedor" className={`${styles['input-text']} js-input`} type="text" />
                        <label className={styles.label} htmlFor="idProveedor">idProveedor</label>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <button type="button" className={styles['submit-btn']} onClick={handleCancel}>Cancelar</button>
                    </div>
                    <div className={`form-field ${styles['form-field']} col-lg-6`}>
                        <button name="modificar" className={styles['submit-btn']} type="submit">
                            Actualizar
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ActualizarProducto;