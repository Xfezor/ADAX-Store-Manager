import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip, port } from '../utils/ipconfig.js';
import axios from 'axios';


const Productos = () => {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);
  const navigation = useNavigation();
  var [codigo_invitacion, setCodigo_invitacion] = useState();

  useEffect(() => {
    const obtenerCodigo = async () => {
      try {
        const codigoString = await AsyncStorage.getItem('codigo_invitacion');
        const codigoNumerico = parseInt(codigoString); // Convertir a número
        
        console.log("CÓDIGO DE TIENDA ACTUAL:", codigoNumerico);
        console.log(typeof(codigoNumerico)) // <-- para verificar
        if (codigoNumerico !== null) {
          setCodigo_invitacion(codigoNumerico);
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
  const cargarProductos = async () => {
    try {

      const response = await axios.get(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?listarProductosApp=true&codigo_invitacion=${codigo_invitacion}`);
      if (response.data) {
        const data = response.data;
        setProductos(data);
        setProductosOriginales(data);
        console.log('Productos recibidos:', data);
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
        <TouchableOpacity onPress={() => console.log('Abrir menú')}>
          <MaterialIcons name="menu" size={40} color="black" />
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
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
