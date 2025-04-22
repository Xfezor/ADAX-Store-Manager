import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StatusBar,
    SafeAreaView,
    Image,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const ItemProducto = ({ nombre, precio, marca }) => (
    <View style={styles.itemProducto}>
        <Text style={styles.nombreProducto}>{nombre}</Text>
        <Text style={styles.precioProducto}>{precio}</Text>
        <Text style={styles.marcaProducto}>{marca}</Text>
    </View>
);

const App = () => {
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [productos, setProductos] = useState([
        { id: '1', nombre: 'Papaya', precio: 1200, marca: 'Frutas' },
        { id: '2', nombre: 'Piña', precio: 3000, marca: 'Frutas' },
        { id: '3', nombre: 'Pulpa de Fruta', precio: 2000, marca: 'Frutas' },
    ]);
    const [precioTotal, setPrecioTotal] = useState(5000);

    const navegacion = useNavigation();

    const opcionesMenu = [
        { etiqueta: 'Productos', icono: require('../assets/producto.png'), ruta: 'Productos' },
        { etiqueta: 'Ventas', icono: require('../assets/ventas.png'), ruta: 'Ventas' },
        { etiqueta: 'Análisis', icono: require('../assets/analisis.png'), ruta: 'Analisis' },
        { etiqueta: 'Gestionar Ventas', icono: require('../assets/gestionar_Ventas.png'), ruta: 'GestionarVentas' },
    ];

    const manejarNavegacion = (ruta) => {
        if (ruta) {
            navegacion.navigate(ruta);
        } else {
            console.log(`Ruta no definida para esta opción.`);
        }
    };

    return (
        <SafeAreaView style={styles.areaSegura}>
            <StatusBar
                backgroundColor="rgba(235,216,160,255)"
                barStyle="dark-content"
            />
            <View style={styles.contenedor}>
                {/* Encabezado */}
                <View style={styles.encabezado}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                    <TouchableOpacity onPress={() => navegacion.navigate('MenuPrincipal')}>
                        <Text style={styles.iconoCerrar}>x</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.titulo}>Venta</Text>

                <TextInput
                    style={styles.entradaBusqueda}
                    placeholder="Escriba el código o nombre del producto"
                    value={textoBusqueda}
                    onChangeText={setTextoBusqueda}
                    placeholderTextColor="#555"
                />

                {/* Tabla con fondo naranja */}
                <View style={styles.contenedorTabla}>
                    <View style={styles.encabezadoListaProductos}>
                        <Text style={styles.encabezadoNombre}>Nombre</Text>
                        <Text style={styles.encabezadoPrecio}>Precio U o Lb</Text>
                        <Text style={styles.encabezadoMarca}>Marca</Text>
                    </View>

                    <FlatList
                        data={productos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ItemProducto
                                nombre={item.nombre}
                                precio={item.precio}
                                marca={item.marca}
                            />
                        )}
                    />
                </View>

                <View style={styles.contenedorPrecioTotal}>
                    <Text style={styles.etiquetaPrecioTotal}>Precio Total</Text>
                    <Text style={styles.valorPrecioTotal}>${precioTotal}</Text>
                </View>

                <TouchableOpacity style={styles.botonGenerarPago}>
                    <Text style={styles.textoBotonGenerarPago}>Generar Pago</Text>
                </TouchableOpacity>
            </View>

            {/* Menú inferior */}
            <View style={styles.menuInferior}>
                {opcionesMenu.map((opcion, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.opcionMenu}
                        onPress={() => manejarNavegacion(opcion.ruta)}
                    >
                        {opcion.icono && (
                            <Image source={opcion.icono} style={styles.iconoMenu} resizeMode="contain" />
                        )}
                        <Text style={styles.textoMenu}>{opcion.etiqueta}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    areaSegura: {
        flex: 1,
        backgroundColor: 'rgba(235,216,160,255)',
    },
    contenedor: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 120,
        backgroundColor:'#FCEDC0',
    },
    encabezado: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(235,216,160,255)',
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        zIndex: 1,
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
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 90,
        marginBottom: 15,
        color: 'black',
        alignSelf: 'flex-start',
    },
    entradaBusqueda: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        color: '#000',
        width: '100%',
        alignSelf: 'flex-start',
    },
    contenedorTabla: {
        backgroundColor: '#E2C673',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        minHeight: 290,
        maxHeight: 600,
    },
    encabezadoListaProductos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    encabezadoNombre: {
        flex: 2,
        fontWeight: 'bold',
        color: 'black',
    },
    encabezadoPrecio: {
        flex: 1.5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    encabezadoMarca: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'black',
    },
    itemProducto: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    nombreProducto: {
        flex: 2,
        color: 'black',
    },
    precioProducto: {
        flex: 1.5,
        textAlign: 'center',
        color: 'black',
    },
    marcaProducto: {
        flex: 1,
        textAlign: 'right',
        color: 'black',
    },
    contenedorPrecioTotal: {
        backgroundColor: '#EBD8A0',
        padding: 15,
        borderRadius: 8,
        marginTop: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    etiquetaPrecioTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 5,
    },
    valorPrecioTotal: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    botonGenerarPago: {
        backgroundColor: '#F08080',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
        width: 200,
        alignSelf: 'center',
    },
    textoBotonGenerarPago: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
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
        backgroundColor: 'rgba(235,216,160,255)',
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

export default App;