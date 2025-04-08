import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Animated, slideAnim } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MenuPrincipal = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(300)).current;

    const abrirMenu = () => {
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const cerrarMenu = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setVisible(false));
    };



    return (
        <View style={styles.contenedor}>
            {visible && (
                <TouchableWithoutFeedback
                onPress={cerrarMenu} // Solo cierra el menú al tocar el área gris
              >
                <View style={styles.menuOverlay}>
                  <TouchableWithoutFeedback>
                    {/* Este segundo TouchableWithoutFeedback evita que el toque en el menú cierre el overlay */}
                    <View style={styles.menu}>
                      <Image source={require('../assets/logoUsuario.png')} style={styles.logoUsuario} />
                      <Text style={styles.menuItem}>Juan Camilo Rivas Moreno</Text>
                      <Text style={styles.menuItem}>Empleado</Text>
                      <Image source={require('../assets/tipoDocumento.png')} style={styles.logoTipoDoc} />
                      <Text style={styles.menuItem}>Documento: C.C. 1015687426</Text>
                      <Image source={require('../assets/logoTienda.png')} style={styles.logoTienda} />
                      <Text style={styles.menuItem}>Super Market Japón</Text>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Actualizar')}>
                        <Text style={styles.buttonText}>Actualizar Información</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IniciarSesion')}>
                        <Text style={styles.buttonText}>Cerrar Sesión</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
              
            )}

            <View style={styles.encabezado}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity style={styles.menuButton} onPress={abrirMenu}>
                    <Ionicons name="menu" size={40} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.contenidoPrincipal}>
                <View style={styles.contenedoresMenuPrincipal}>
                    <Image source={require('../assets/ventasHoy.png')} style={styles.imagenesContenedorMenu} />
                    <View style={styles.contenedorIndividual}>
                        <Text style={styles.seccionTitulo}>Ventas de Hoy</Text>
                        <View style={styles.contenedorImagenTexto}>
                            <Image style={styles.iconoDollar} source={require('../assets/iconoDollar.png')} />
                            <Text style={styles.TextoVentasHoy}>1500</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.contenedoresMenuPrincipal}>
                    <Image source={require('../assets/estanteProductos.png')} style={styles.imagenesContenedorMenu} />
                    <View style={styles.contenedorIndividual}>
                        <Text style={styles.seccionTitulo}>Ventas de Hoy</Text>
                        <View style={styles.contenedorImagenTexto}>
                            <Text style={styles.TextoVentasHoy}>1500</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.contenedoresMenuPrincipal}>
                    <Image source={require('../assets/ventasPendientes.png')} style={styles.imagenesContenedorMenu} />
                    <View style={styles.contenedorIndividual}>
                        <Text style={styles.seccionTitulo}>Ventas de Hoy</Text>
                        <View style={styles.contenedorImagenTexto}>
                            <Text style={styles.TextoVentasHoy}>1500</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.contenedoresMenuPrincipalBajoStock}>
                <Text style={styles.seccionTituloBajoStock}>Productos con Bajo Stock</Text>
                </View>
                {/* Actividad Reciente */}
                <View style={styles.contenedorActividadReciente}>
                </View>
            </View>
            {/* <View style={styles.bottomNav}>
                <View style={styles.navItem}>
                    <Image source={require('../assets/producto.png')} style={styles.icon} />
                    <Text style={styles.navText}>Productos</Text>
                </View>
                <View style={styles.navItem}>
                    <Image source={require('../assets/ventas.jpeg')} style={styles.icon} />
                    <Text style={styles.navText}>Ventas</Text>
                </View>
                <View style={styles.navItem}>
                    <Image source={require('../assets/analisis.png')} style={styles.icon} />
                    <Text style={styles.navText}>Análisis</Text>
                </View>
                <View style={styles.navItem}>
                    <Image source={require('../assets/gestionar.jpeg')} style={styles.icon} />
                    <Text style={styles.navText}>Gestionar Ventas</Text>
                </View>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#FCE7B5',
    },
    contenidoPrincipal: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        marginTop: 90, // Add space for the header
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
        zIndex: 1,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    menuButton: {
        padding: 10,
    },
    menuOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 2,
    },
    menu: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '70%',
        height: '100%',
        backgroundColor: 'rgba(235,216,160,255)',
        paddingTop: 20,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        zIndex: 3,
    },
    logoUsuario: {
        marginTop: 20,
        width: 50,
        height: 50,
        resizeMode: 'contain',
        shadowColor: '#000', // Color de la sombra
        shadowOpacity: 0.5, // Más oscuro
        shadowOffset: { width: 5, height: 5 }, // Desplaza la sombra
        shadowRadius: 10, // Expande el área de la sombra
        elevation: 10, // Altura para efectos en Android
        borderRadius: 10, // Reduce el círculo
    },
    logoTipoDoc: {
        marginTop: 20,
        width: 50,
        height: 50,
        resizeMode: 'contain',
        shadowColor: '#000',
        shadowOpacity: 1.2,
        shadowOffset: { width: 8, height: 8 }, // Distribuye la sombra más lejos
        elevation: 30,    },
    logoTienda: {
        marginTop: 20,
        width: 50,
        height: 50,
        resizeMode: 'contain',
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowOffset: { width: 10, height: 10 }, // Sombra más pronunciada
        shadowRadius: 15, // Ajuste similar al diseño de la imagen
        elevation: 20,
        borderRadius: 10, // Esquinas más suaves pero no circulares
    },
    menuItem: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#F3BF70',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    imagenesContenedorMenu: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 10,
    },
    contenedoresMenuPrincipal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        width: '100%',
        marginBottom: 20,
    },
    contenedorIndividual: {
        justifyContent: 'center',
        backgroundColor: '#ebd8a0',
        borderRadius: 10,
        width: '80%',
        height: 'auto',
        padding: 10,
    },
    contenedoresMenuPrincipalBajoStock: {
        textAlign: 'left',
        width: '100%',

    },
    iconoDollar: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 0,
    },
    TextoVentasHoy: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    contenedorImagenTexto: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contenedorProductos: {
        width: '90%',
        backgroundColor: '#ebd8a0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    contenedorVentasPendientes: {
        width: '90%',
        backgroundColor: '#ebd8a0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    contenedorActividadReciente: {
        width: '100%',
        backgroundColor: '#ebd8a0',
        borderRadius: 10,
        padding: 15,
        minHeight: '30%'
    },
    seccionTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        paddingLeft: 5,
    },
    seccionTituloBajoStock: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        textAlign: 'left',
    },
    seccionContenido: {
        fontSize: 16,
        color: '#333',
        paddingLeft: 15,
    },

});

export default MenuPrincipal;