import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableOpacity,
    StatusBar, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ip, port} from '../utils/ipconfig.js';

const popularImages = {
    popular: require('../assets/popular.png'),
    mediopopular: require('../assets/mediopopular.png'),
    nopopular: require('../assets/nopopular.png')
};

const ADAXApp = ({ navigation }) => {
    const [productos, setProductos] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [codigoTienda, setCodigoTienda] = useState(null);

    useEffect(() => {
        const obtenerCodigo = async () => {
            try {
                const codigo = await AsyncStorage.getItem('codigo_invitacion');
                console.log("CÓDIGO DE TIENDA ACTUAL:", codigo); // <-- para verificar
                if (codigo !== null) {
                    setCodigoTienda(codigo);
                } else {
                    setErrorMsg('No se encontró el código de la tienda.');
                }
            } catch (error) {
                console.error('Error al obtener el código de la tienda:', error);
                setErrorMsg('Error al acceder al almacenamiento local.');
            } finally {
                setLoading(false);
            }
        };
        obtenerCodigo();
    }, []);


    useEffect(() => {
        if (codigoTienda) {
            const URL = `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php?verAnalisisCodigoInv=${codigoTienda}`;
            fetch(URL)
                .then(async response => {
                    const text = await response.text();
                    try {
                        const json = JSON.parse(text);
                        console.log('JSON recibido:', json);
                        const transformedProductos = json.map(item => ({
                            id_producto: item[0],
                            nombre: item[1],
                            cantidad: item[2],
                        }));
                        setProductos(transformedProductos);
                    } catch (error) {
                        console.error('Error al parsear JSON:', error);
                        console.log('Respuesta del servidor:', text);
                        setErrorMsg('No se pudo obtener información válida del servidor.');
                    }
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                    setErrorMsg('Error al conectar con el servidor.');
                })
                .finally(() => setLoading(false));
        }
    }, [codigoTienda]);

    // Función para calcular popularidad según la cantidad vendida
    const calcularPopularidad = (cantidad) => {
        let productosCant = Object.keys(productos).length;
        let ventasSum = 0;
        let promedio = 0;
        let i = 0;
        for (i; i < productos.length; i++) {        
            ventasSum += parseInt(productos[i].cantidad);
        }
        promedio = ventasSum / productosCant;
 
        const cantidadNumerica = Number(cantidad);
        if (cantidadNumerica > promedio) return { texto: 'Popular', icono: 'popular' };
        if (cantidadNumerica > promedio) return { texto: 'Medio Popular', icono: 'mediopopular' };
        return { texto: 'No Popular', icono: 'nopopular' };
    };

    // Función para renderizar el icono de popularidad
    const renderPopularidad = (item) => {
        const cantidad = item?.cantidad;
        const popularidadData = calcularPopularidad(cantidad);
        const imageSource = popularImages[popularidadData.icono] || null;

        return (
            <View style={styles.popularidadContainer}>
                {imageSource ? (
                    <Image source={imageSource} style={styles.iconoPopularidad} />
                ) : (
                    <Text style={styles.textoError}>!</Text>
                )}
                <Text style={styles.textoPopularidad}>{popularidadData.texto}</Text>
            </View>
        );
    };


    const menuOptions = [
        { label: 'Productos', icon: require('../assets/producto.png'), route: 'Productos' },
        { label: 'Venta', icon: require('../assets/ventas.png'), route: 'VentaCarrito' },
        { label: 'Análisis', icon: require('../assets/analisis.png'), route: 'Analisis' },
        { label: 'Gestionar Ventas', icon: require('../assets/gestionar_Ventas.png'), route: 'GestionarVentas' },
    ];

    // Manejo de navegación al seleccionar una opción del menú
    const handleNavigation = (route) => {
        if (route) navigation.navigate(route);
    };


    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Cargando análisis para la tienda...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#EBD8A0" barStyle="dark-content" />

            <View style={styles.encabezado}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('MenuPrincipal')}>
                    <Ionicons name="close" size={40} color="black" style={styles.iconoCerrar} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <View style={styles.tituloContainer}>
                    <Text style={styles.tituloPrincipal}>Análisis de la Tienda {codigoTienda}</Text>

                    <View style={styles.leyendaPopularidad}>
                        {Object.entries(popularImages).map(([key, img]) => (
                            <View key={key} style={styles.leyendaItem}>
                                <Image source={img} style={styles.leyendaIcono} />
                                <Text style={styles.leyendaTexto}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {errorMsg && (
                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{errorMsg}</Text>
                )}

                <View style={styles.tablaContenedor}>
                    <View style={styles.filaEncabezado}>
                        <Text style={[styles.celda, styles.encabezadoCelda]}>ID</Text>
                        <Text style={[styles.celda, styles.encabezadoCelda]}>Producto</Text>
                        <Text style={[styles.celda, styles.encabezadoCelda]}>Cantidad Vendida</Text>
                        <Text style={[styles.celda, styles.encabezadoCelda]}>Estado</Text>
                    </View>

                    {productos.map((item, index) => (
                        <View key={index} style={[styles.filaDatos, { backgroundColor: '#EBD8A0' }]}>
                            <Text style={styles.celda}>{item?.id_producto}</Text>
                            <Text style={styles.celda}>{item?.nombre}</Text>
                            <Text style={styles.celda}>{item?.cantidad ?? 'N/A'}</Text>
                            <View style={styles.celda}>
                                {item?.cantidad !== undefined
                                    ? renderPopularidad(item)
                                    : <Text style={styles.celda}>N/A</Text>}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.menuInferior}>
                {menuOptions.map((opcion, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.opcionMenu}
                        onPress={() => handleNavigation(opcion.route)}
                    >
                        <Image source={opcion.icon} style={styles.iconoMenu} />
                        <Text style={styles.textoMenu}>{opcion.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FCEDC0' },
    encabezado: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EBD8A0',
        paddingHorizontal: 20,
        paddingTop: 28,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        zIndex: 2,
    },
    logo: { width: 120, height: 70, resizeMode: 'contain' },
    iconoCerrar: { padding: 10 },
    scrollContainer: { flex: 1 },
    scrollContent: { padding: 20, paddingTop: 150, paddingBottom: 150 },
    tituloContainer: { marginBottom: 20, paddingLeft: 10 },
    tituloPrincipal: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'left',
    },
    leyendaPopularidad: { marginTop: 10 },
    leyendaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    leyendaIcono: { width: 24, height: 24, marginRight: 10 },
    leyendaTexto: { fontSize: 16, color: '#333' },
    tablaContenedor: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 30,
        minHeight: 250,
    },
    filaEncabezado: {
        flexDirection: 'row',
        backgroundColor: '#E2C673',
        paddingVertical: 12,
    },
    filaDatos: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEE',
        paddingVertical: 15,
        alignItems: 'center',
    },
    celda: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 5,
        fontSize: 14,
    },
    encabezadoCelda: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    popularidadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconoPopularidad: { width: 24, height: 24, marginRight: 8 },
    textoPopularidad: { fontSize: 14 },
    textoError: { color: 'red', fontWeight: 'bold' },
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
    iconoMenu: { width: 32, height: 32, marginBottom: 5 },
    textoMenu: { fontSize: 14, fontWeight: '500' },
});

export default ADAXApp;
