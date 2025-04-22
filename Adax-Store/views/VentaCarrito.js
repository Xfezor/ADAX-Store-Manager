import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
    Image, Keyboard, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ip, port } from '../utils/ipconfig.js';
import axios from 'axios';

const VentaCarrito = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [busqueda, setBusqueda] = useState('');
    const [carrito, setCarrito] = useState({});
    const [documento, setDocumento] = useState('');
    var [codigoTienda, setCodigoTienda] = useState();
    var [cargandoTienda, setCargandoTienda] = useState(false);
    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [cargandoProductos, setCargandoProductos] = useState(false);

    const menuOptions = [
        { label: 'Productos', icon: require('../assets/producto.png'), route: 'Productos' },
        { label: 'Venta', icon: require('../assets/ventas.png'), route: 'VentaCarrito' },
        { label: 'Análisis', icon: require('../assets/analisis.png'), route: 'Analisis' },
        { label: 'Gestionar Ventas', icon: require('../assets/gestionar_Ventas.png'), route: 'GestionarVentas' },
    ];

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const codigoGuardado = await AsyncStorage.getItem('codigo_invitacion');
                if (!codigoGuardado) {
                    Alert.alert('Tienda no configurada', 'No se encontró información de la tienda.');
                    return;
                }
                setCodigoTienda(codigoGuardado);
                codigoTienda = parseInt(codigoGuardado);
                cargandoTienda = false;
                await cargarProductos(codigoTienda);
            } catch (error) {
                Alert.alert('Error', 'No se pudo cargar la información de la tienda');
            } finally {
            }
        };
        cargarDatos();
    }, [isFocused]);

    const cargarProductos = async (codigo) => {
        setCargandoProductos(true);
        try {
            const response = await axios.get(
                `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?listarProductosAppPrecio=true&codigo_invitacion=${codigo}`
            );

            if (response.data) {
                const productosFormateados = response.data.filter(item => Array.isArray(item) && item.length >= 3)
                    .map((item) => ({
                        id: item[0], // Usa el ID original del producto
                        nombre: item[1], // Asigna el nombre correctamente
                        precio: parseFloat(item[3]) || 0,
                    }));
                setProductosDisponibles(productosFormateados);
            } else {
                Alert.alert('Error', 'Los datos recibidos no son válidos');
            }
        } catch (error) {
            // Alert.alert('Error', 'No se pudo cargar la lista de productos');
            console.log(error);
        } finally {
            setCargandoProductos(false);
        }
    };

    const modificarCantidad = (productoId, delta) => {
        setCarrito(prev => {
            const nuevo = { ...prev };
            const cantidadActual = nuevo[productoId] || 0;
            const nuevaCantidad = Math.max(0, cantidadActual + delta);
            if (nuevaCantidad > 0) nuevo[productoId] = nuevaCantidad;
            else delete nuevo[productoId];
            return nuevo;
        });
    };

    const calcularTotal = () => {
        return Object.keys(carrito).reduce((total, id) => {
            const p = productosDisponibles.find(p => p.id === parseInt(id)); // Convierte id a número
            return p ? total + p.precio * carrito[id] : total;
        }, 0).toFixed(2);
    };

    const buscarProducto = () => {
        if (!codigoTienda) {
            Alert.alert('Tienda no configurada', 'No se encontró información de la tienda');
            return;
        }
        if (busqueda.trim() === '') {
            Alert.alert('Error', 'Ingresa un término de búsqueda');
            return;
        }
        const termino = busqueda.toLowerCase().trim();
        const encontrado = productosDisponibles.find(p => p.nombre.toLowerCase().includes(termino));
        if (encontrado) {
            setCarrito(prev => ({
                ...prev,
                [encontrado.id]: (prev[encontrado.id] || 0) + 1,
            }));
        } else {
            Alert.alert('Aviso', 'Producto no encontrado');
        }
        Keyboard.dismiss();
        setBusqueda('');
    };

    const registrarVenta = async () => {
        if (!documento) {
            Alert.alert('Error', 'Ingresa el documento del cliente');
            return;
        }

        const productosVenta = Object.keys(carrito).map(id => {
            const p = productosDisponibles.find(p => p.id === id);
            return {
                nombre: p.nombre,
                cantidad: carrito[id],
                precio_unitario: p.precio,
                id: p.originalId,
            };
        }).filter(p => p.cantidad > 0);

        if (productosVenta.length === 0) {
            Alert.alert('Error', 'No hay productos en el carrito');
            return;
        }

        try {
            const response = await fetch(
                'http://192.168.1.11/adx/ADAX-Store-Manager/Crud/controlador/controlador.venta.php?registrarVenta=true',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ documento, codigo_tienda: codigoTienda, productos: productosVenta })
                }
            );
            const resultado = await response.json();
            if (resultado.success) {
                Alert.alert('Éxito', 'Venta registrada correctamente');
                setCarrito({});
                setDocumento('');
            } else {
                Alert.alert('Error', resultado.message || 'No se pudo registrar la venta');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    const generarPago = () => {
        const productosEnCarrito = productosDisponibles
            .filter(item => carrito[item.id] > 0)
            .map(item => ({
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: carrito[item.id],
                subtotal: item.precio * carrito[item.id]
            }));

        navigation.navigate('Venta', {
            productos: productosEnCarrito,
            total: calcularTotal()
        });
    };

    const handleNavigation = (route) => {
        navigation.navigate(route);
    };

    if (cargandoTienda === true) {
        return (
            <View style={styles.cargandoContainer}>
                <Text>Cargando información de la tienda...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.tiendaText}>
                    Tienda: {codigoTienda || 'No configurada'}
                </Text>
            </View>

            <Text style={styles.title}>Venta</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar producto por nombre"
                placeholderTextColor="#555"
                value={busqueda}
                onChangeText={setBusqueda}
                onSubmitEditing={buscarProducto}
                returnKeyType="search"
            />

            {cargandoProductos && <Text style={{ textAlign: 'center' }}>Cargando productos...</Text>}

            <Text style={styles.title}>Carrito</Text>
            <View style={styles.carritoContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, { flex: 2 }]}>Producto</Text>
                    <Text style={[styles.headerText, { flex: 1 }]}>Precio</Text>
                    <Text style={[styles.headerText, { flex: 1 }]}>Cantidad</Text>
                    <Text style={[styles.headerText, { flex: 2 }]}>Acciones</Text>
                </View>

                <ScrollView style={styles.scroll}>
                    {productosDisponibles.length > 0 ? (
                        productosDisponibles.map((item) => (
                            <View key={item.id} style={styles.row}>
                                <Text style={[styles.cell, { flex: 2 }]} numberOfLines={1}>
                                    {item.nombre}
                                </Text>
                                <Text style={[styles.cell, { flex: 1 }]}>{`$${item.precio.toFixed(2)}`}</Text>
                                <Text style={[styles.cell, { flex: 1, textAlign: 'center' }]}>
                                    {carrito[item.id] || 0}
                                </Text>
                                <View style={[styles.cell, { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                                    <TouchableOpacity
                                        style={styles.cantidadBtn}
                                        onPress={() => modificarCantidad(item.id, -1)}
                                    >
                                        <Text style={styles.cantidadText}>-</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.cantidadBtn}
                                        onPress={() => modificarCantidad(item.id, 1)}
                                    >
                                        <Text style={styles.cantidadText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.carritoVacio}>No hay productos disponibles</Text>
                    )}
                </ScrollView>
            </View>

            <View style={styles.docContainer}>
                <Text style={styles.label}>Documento del cliente:</Text>
                <TextInput
                    style={styles.docInput}
                    placeholder="Número de documento"
                    placeholderTextColor="#555"
                    value={documento}
                    onChangeText={setDocumento}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total a pagar:</Text>
                <Text style={styles.total}>{`$${calcularTotal()}`}</Text>

                <TouchableOpacity style={styles.pagoBtn} onPress={generarPago}>
                    <Text style={styles.pagoBtnText}>Generar Pago</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuInferior}>
                {menuOptions.map((opcion, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.opcionMenu}
                        onPress={() => handleNavigation(opcion.route)}
                    >
                        <Image source={opcion.icon} style={styles.iconoMenu} />
                        <Text style={styles.labelMenu}>{opcion.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCEDC0',
        padding: 20,
        paddingBottom: 0
    },
    cargandoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCEDC0'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EBD8A0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    tiendaText: {
        fontWeight: 'bold',
        color: '#D9534F',
        fontSize: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
        textAlign: 'center'
    },
    searchInput: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
        color: '#000',
        fontSize: 16,
    },
    carritoContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        maxHeight: 250,
        borderWidth: 1,
        borderColor: '#EBD8A0',
        marginBottom: 15,
    },
    carritoVacio: {
        textAlign: 'center',
        padding: 20,
        color: '#777',
        fontStyle: 'italic'
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#EBD8A0',
        paddingBottom: 8,
        marginBottom: 5,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        fontSize: 14
    },
    scroll: {
        marginVertical: 5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#EBD8A0',
        paddingVertical: 8,
    },
    cell: {
        textAlign: 'center',
        color: '#333',
        fontSize: 14,
        paddingHorizontal: 2
    },
    cantidadBtn: {
        backgroundColor: '#D9534F',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3
    },
    cantidadText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    docContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
        color: '#333',
        fontSize: 16,
        flex: 1
    },
    docInput: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 2,
        color: '#000',
        fontSize: 16,
    },
    totalContainer: {
        backgroundColor: '#EBD8A0',
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
        alignItems: 'center',
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333'
    },
    total: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#D9534F'
    },
    pagoBtn: {
        backgroundColor: '#D9534F',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        opacity: 1
    },
    pagoText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    menuInferior: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#EBD8A0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10,
        elevation: 10,
    },
    opcionMenu: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconoMenu: {
        width: 28,
        height: 28,
        marginBottom: 5,
    },
    textoMenu: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default VentaCarrito;