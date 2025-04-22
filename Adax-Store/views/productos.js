import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip, port } from '../utils/ipconfig.js';
import axios from 'axios';

const Productos = () => {
    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState([]);
    const [productosOriginales, setProductosOriginales] = useState([]);
    const navigation = useNavigation();
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState("");
    const [cantidadProducto, setCantidadProducto] = useState("");


    const registrarProducto = async () => {
        try {
            const codigo_invitacion = await AsyncStorage.getItem('codigo_invitacion');
            const respuesta2 = await axios.post(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?`, {
                registrarProductoUnico: true,
                nombre: nombreProducto,
                precio: precioProducto,
                cantidad: cantidadProducto,
                codigo_invitacion: codigo_invitacion,
            });
            if (respuesta2.data.success) {
                Alert.alert('Éxito', 'Producto registrado correctamente.');
                setNombreProducto('');
                setPrecioProducto(0);
                setCantidadProducto(0);
                cargarProductos(); // Recargar la lista de productos después de registrar uno nuevo
            }
            else {
                Alert.alert('Error', 'No se pudo registrar el producto. Intente de nuevo.');
            }
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            Alert.alert('Error', 'No se pudo registrar el producto. Intente de nuevo.');
        }
    }

    const cargarProductos = async () => {
        try {
            const codigo_invitacion = await AsyncStorage.getItem('codigo_invitacion');
            if (!codigo_invitacion) {
                console.warn('No se encontró el código de invitación en AsyncStorage');
                return;
            }

            const response = await fetch(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?listarProductosApp=true&codigo_invitacion=${codigo_invitacion}`);
            const data = await response.json();

            console.log('Productos recibidos:', data);

            if (Array.isArray(data)) {
                setProductos(data);
                setProductosOriginales(data);
            } else {
                console.warn('La respuesta no es un array:', data);
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const filtrarProductos = (texto) => {
        setBusqueda(texto);
        if (texto === '') {
            setProductos(productosOriginales);
        } else {
            const filtrados = productosOriginales.filter((producto) =>
                (producto[1] || '').toLowerCase().includes(texto.toLowerCase())
            );
            setProductos(filtrados);
        }
    };

    const verDetalle = (producto) => {
        if (producto && producto[0]) {
            navigation.navigate('ModificaProducto', { idProducto: producto[0] });
        } else {
            console.warn('El producto seleccionado no tiene un ID válido:', producto);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const menuOptions = [
        { label: 'Productos', icon: require('../assets/producto.png'), route: 'Productos' },
        { label: 'Venta', icon: require('../assets/ventas.png'), route: 'VentaCarrito' },
        { label: 'Análisis', icon: require('../assets/analisis.png'), route: 'Analisis' },
        { label: 'Gestionar Ventas', icon: require('../assets/gestionar_Ventas.png'), route: 'GestionarVentas' },
    ];

    const handleNavigation = (route) => {
        if (route) {
            navigation.navigate(route);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.encabezado}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('MenuPrincipal')}>
                    <Text style={styles.iconoCerrar}>x</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Productos</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Escriba el nombre del producto"
                placeholderTextColor="#555"
                value={busqueda}
                onChangeText={filtrarProductos}
            />

            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Nombre</Text>
                    <Text style={styles.tableHeaderText}>Marca</Text>
                    <Text style={styles.tableHeaderText}>Detalle</Text>
                </View>
                <ScrollView style={styles.productList}>
                    {productos.map((producto, index) => (
                        <View key={index} style={styles.productRow}>
                            <Text style={styles.productText}>
                                {producto[1] || 'Sin nombre'}
                            </Text>
                            <Text style={styles.productText}>
                                {producto[2] || 'Sin marca'}
                            </Text>
                            <TouchableOpacity
                                style={styles.detailButton}
                                onPress={() => verDetalle(producto)}
                            >
                                <Text style={styles.detailButtonText}>Ver Detalle</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <Text style={styles.title2}>Añadir producto</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Escriba el nombre del producto"
                placeholderTextColor="#555"
                onChangeText={setNombreProducto}
                onSubmitEditing="{buscarProducto}"
                returnKeyType="search"
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Escriba el precio sin puntos ni comas"
                placeholderTextColor="#555"
                onChangeValue={setPrecioProducto}
                onSubmitEditing="{buscarProducto}"
                returnKeyType="search"
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Escriba la cantidad"
                placeholderTextColor="#555"
                onChangeValue={setCantidadProducto}
                onSubmitEditing="{buscarProducto}"
                returnKeyType="search"
            />
            <TouchableOpacity style={styles.botonConfirmar} onPress={registrarProducto}>
                <Text style={styles.textoBotonConfirmar}>Registrar producto</Text>
            </TouchableOpacity>
            <View style={styles.menuInferior}>
                {menuOptions.map((opcion, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.opcionMenu}
                        onPress={() => handleNavigation(opcion.route)}
                    >
                        {opcion.icon && (
                            <Image source={opcion.icon} style={styles.iconoMenu} resizeMode="contain" />
                        )}
                        <Text style={styles.textoMenu}>{opcion.label}</Text>
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
    },
    encabezado: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(235,216,160,255)',
        paddingHorizontal: 10,
        paddingTop: 28,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        zIndex: 2,
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
    botonConfirmar: {
        backgroundColor: "#F85F6A",
        borderRadius: 10,
        marginTop: 10,
        alignSelf: "center",
        height: 40,
        width: "50%",
        justifyContent: "center",
    },
    textoBotonConfirmar: {
        color: "black",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    iconoCerrar: {
        fontSize: 40,
        color: 'black',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 100,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    searchInput: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#000',
        marginHorizontal: 20,
    },
    tableContainer: {
        backgroundColor: '#EBD8A0',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        maxHeight: 400,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    productList: {
        flexGrow: 1,
        maxHeight: 350,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productText: {
        flex: 1,
        textAlign: 'center',
    },
    detailButton: {
        backgroundColor: '#D9534F',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    detailButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
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
        minWidth: 80,
        height: 80,
    },
    iconoMenu: {
        width: 32,
        height: 32,
        marginBottom: 5,
    },
    textoMenu: {
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Productos;