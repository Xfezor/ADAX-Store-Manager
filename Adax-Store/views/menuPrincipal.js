import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MenuPrincial = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.contenedor}>
            <View style={styles.encabezado}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('IniciarSesion')}>
                    <Ionicons name="close" size={40} color="black" style={styles.iconoCerrar} />
                </TouchableOpacity>
            </View>
            <View style={styles.contenedorventasHoy}>
                <Image source={require('../assets/ventasHoy.png')} style={styles.ventasHoy} />
                <View style={styles.contenedorTextoVentasHoy}>
                    <Text style={styles.tituloVentas}>Ventas de Hoy</Text>
                    <View style={styles.contenedornumeroVentas}>
                        <Image style={styles.iconoDollar} source={require('../assets/iconoDollar.png')} />
                        <Text style={styles.TextoVentasHoy}>1500</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#FCE7B5',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,
        paddingHorizontal: 20,
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
        paddingHorizontal: 20,
        paddingTop: 28,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    iconoCerrar: {
        paddingBottom: 10,
    },
    ventasHoy: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        paddingTop: '35%',
        marginRight: 10,
    },
    contenedorventasHoy: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contenedorTextoVentasHoy: {
        justifyContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ebd8a0',
        borderRadius: '10%',
        width: '80%',
        height: '28%'
    },
    tituloVentas: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: '8%'
    },
    iconoDollar: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginLeft: '6%',
    },
    contenedornumeroVentas: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
export default MenuPrincial;