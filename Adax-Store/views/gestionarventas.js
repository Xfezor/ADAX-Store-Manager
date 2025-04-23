import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Platform, StatusBar } from 'react-native';
import axios from 'axios';

const GestionarVentas = ({ navigation }) => {
    const [busqueda, setBusqueda] = useState('');

    const productos = [
        { nombre: 'Papaya', cantidad: 'Diana', precio: '$2500' },
        { nombre: 'Arroz Premium', cantidad: 'Diana', precio: '$2800' },
        { nombre: 'Lapiz Norma 2A', cantidad: 'Norma', precio: '$2000' },
        { nombre: 'Cuaderno', cantidad: 'Norma', precio: '$1500' },
        { nombre: 'Borrador', cantidad: 'Norma', precio: '$500' },
        { nombre: 'Tijeras', cantidad: 'Norma', precio: '$3000' },
    ];

    const menuOptions = [
        { label: 'Productos', icon: require('../assets/producto.png'), route: 'Productos' },
        { label: 'Venta',     icon: require('../assets/ventas.png'),    route: 'Venta' },
        { label: 'Análisis',  icon: require('../assets/analisis.png'),  route: 'Analisis' },
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
                    placeholder="Escriba el código de la venta a buscar"
                    placeholderTextColor="#555"
                    value={busqueda}
                    onChangeText={setBusqueda}
                />

                <View style={styles.infoContainer}>
                    <View style={styles.smallBox}>
                        <Text style={styles.infoTitle}>Id Venta</Text>
                        <Text>15</Text>
                    </View>
                    <View style={styles.smallBox}>
                        <Text style={styles.infoTitle}>Precio Total</Text>
                        <Text>$7300</Text>
                    </View>
                    <View style={styles.smallBox}>
                        <Text style={styles.infoTitle}>Cliente</Text>
                        <Text>1011522703</Text>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <View style={styles.tableHeaderBox}><Text style={styles.tableHeaderText}>Productos</Text></View>
                        <View style={styles.tableHeaderBox}><Text style={styles.tableHeaderText}>Cantidad</Text></View>
                        <View style={styles.tableHeaderBox}><Text style={styles.tableHeaderText}>Precio</Text></View>
                    </View>
                    <ScrollView style={styles.productList}>
                        {productos.map((producto, index) => (
                            <View key={index} style={styles.productRow}>
                                <Text style={styles.productText}>{producto.nombre}</Text>
                                <Text style={styles.productText}>{producto.cantidad}</Text>
                                <Text style={styles.productText}>{producto.precio}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>ESTADO</Text>
                    <Text style={styles.statusText}>Pendiente</Text>
                </View>
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
