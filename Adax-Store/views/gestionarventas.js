import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Platform, StatusBar, Modal, FlatList } from 'react-native';
import axios from 'axios';
import { ip, port, protocol } from '../utils/ipconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GestionarVentas = ({ navigation }) => {
    const [busqueda, setBusqueda] = useState('');
    const [facturas, setFacturas] = useState([]);
    const [facturasOriginales, setFacturasOriginales] = useState([]);
    const [productos, setProductos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);


    // Listar facturas al cargar
    useEffect(() => {
        listarFacturas();
    }, []);

    const listarFacturas = async () => {
        try {
            const codigo_invitacion = await AsyncStorage.getItem('codigo_invitacion');
            if (!codigo_invitacion) {
                console.warn('No se encontró el código de invitación en AsyncStorage');
                return;
            }
            const url = port
                ? `${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php?listarTienda=true&codigo_invitacion=${codigo_invitacion}`
                : `${protocol}://${ip}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php?listarTienda=true&codigo_invitacion=${codigo_invitacion}`;
            const response = await axios.get(url);
            if (response.data) {
                setFacturas(response.data);
                setFacturasOriginales(response.data);
            }
        } catch (error) {
            console.error('Error al listar facturas:', error);
        }
    };

    // Buscar facturas por id venta o producto
    const buscar = (valor) => {
        setBusqueda(valor);
        if (valor === "") {
            setFacturas(facturasOriginales);
        } else {
            const filtradas = facturasOriginales.filter((fa) => {
                const idVenta = String(fa[0]).toLowerCase();
                const idProducto = String(fa[1]).toLowerCase();
                return idVenta.includes(valor.toLowerCase()) || idProducto.includes(valor.toLowerCase());
            });
            setFacturas(filtradas);
        }
    };

    // Ver productos de una factura
    const verProductos = async (venta_id_Venta) => {
        try {
            const codigo_invitacion = await AsyncStorage.getItem('codigo_invitacion');
            if (!codigo_invitacion) {
                console.warn('No se encontró el código de invitación en AsyncStorage');
                return;
            }
            const url = port
                ? `${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php?listarProductos=true&codigo_invitacion=${codigo_invitacion}&venta_id_Venta=${venta_id_Venta}`
                : `${protocol}://${ip}/adx/ADAX-Store-Manager/Crud/controlador/controlador.factura.php?listarProductos=true&codigo_invitacion=${codigo_invitacion}&venta_id_Venta=${venta_id_Venta}`;
            const response = await axios.get(url);
            if (response.data) {
                setProductos(response.data);
                setFacturaSeleccionada(venta_id_Venta);
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const menuOptions = [
        { label: 'Productos', icon: require('../assets/producto.png'), route: 'Productos' },
        { label: 'Venta', icon: require('../assets/ventas.png'), route: 'Venta' },
        { label: 'Análisis', icon: require('../assets/analisis.png'), route: 'Analisis' },
        { label: 'Gestionar Ventas', icon: require('../assets/gestionar_Ventas.png'), route: 'GestionarVentas' },
    ];

    const handleNavigation = (route) => {
        if (route) navigation.navigate(route);
        else console.log(`Ruta no definida para esta opción.`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('MenuPrincipal')}>
                    <Text style={styles.closeButton}>x</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingTop: 130, paddingBottom: 140 }}>
                <Text style={styles.title}>Gestionar Ventas</Text>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Escriba el código de la venta o producto a buscar"
                    placeholderTextColor="#555"
                    value={busqueda}
                    onChangeText={buscar}
                />

                {/* Tabla de facturas */}
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <View style={styles.tableHeaderBox}><Text style={styles.tableHeaderText}>ID Venta</Text></View>
                        <View style={styles.tableHeaderBox}><Text style={styles.tableHeaderText}>Cantidad</Text></View>
                        <View style={styles.tableHeaderBox}><Text style={styles.tableHeaderText}>Precio</Text></View>
                        <View style={styles.tableHeaderBox}><Text style={styles.tableHeaderText}>Estado</Text></View>
                        <View style={styles.tableHeaderBox}><Text style={styles.tableHeaderText}>Productos</Text></View>
                    </View>
                    <ScrollView style={styles.productList}>
                        {facturas.map((fa, index) => (
                            <View key={index} style={styles.productRow}>
                                <Text style={styles.productText}>{fa[0]}</Text>
                                <Text style={styles.productText}>{fa[3]}</Text>
                                <Text style={styles.productText}>{fa[4]}</Text>
                                <Text style={styles.productText}>{fa[5]}</Text>
                                <TouchableOpacity
                                    style={[styles.productText, { backgroundColor: '#D5C08F', borderRadius: 5, padding: 3 }]}
                                    onPress={() => verProductos(fa[0])}
                                >
                                    <Text style={{ textAlign: 'center' }}>Ver Productos</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Modal para mostrar productos de la factura */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            padding: 20,
                            width: '90%',
                            maxHeight: '70%'
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
                                Productos de la venta {facturaSeleccionada}
                            </Text>
                            <FlatList
                                data={productos}
                                keyExtractor={(_, idx) => idx.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                                        <Text>{item[0]}</Text>
                                        <Text>{item[1]}</Text>
                                    </View>
                                )}
                            />
                            <TouchableOpacity
                                style={{ marginTop: 20, alignSelf: 'center', backgroundColor: '#EBD8A0', padding: 10, borderRadius: 8 }}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>

            {/* ——— Footer Fijo ——— */}
            <View style={styles.footer}>
                {menuOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.navItem}
                        onPress={() => handleNavigation(option.route)}
                    >
                        <Image source={option.icon} style={styles.icon} />
                        <Text style={styles.navText}>{option.label}</Text>
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

    /* ——— HEADER ——— */
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 130,  // Cambié la altura a 130
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(235,216,160,255)',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        zIndex: 10,
    },
    logo: {
        width: 120,  // Ajusté el tamaño del logo
        height: 70,
        resizeMode: 'contain',
    },
    closeButton: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
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
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    smallBox: {
        flex: 1,
        backgroundColor: '#EBD8A0',
        padding: 10,
        marginHorizontal: 3,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D5C08F',
    },
    infoTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tableContainer: {
        backgroundColor: '#EBD8A0',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    tableHeaderBox: {
        flex: 1,
        backgroundColor: '#D5C08F',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 2,
    },
    tableHeaderText: {
        fontWeight: 'bold',
    },
    productList: {
        maxHeight: 200,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productText: {
        flex: 1,
        textAlign: 'center',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBD8A0',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        margin: 20,
    },
    statusLabel: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    statusText: {
        color: '#555',
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(235,216,160,255)',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 6,
    },
    navItem: {
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
    },
    navText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default GestionarVentas;
