import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons para el icono del menú

const Productos = () => {
  const [busqueda, setBusqueda] = useState('');
  const productos = [
    { nombre: 'Papaya', marca: '', detalle: 'Ver Detalle' },
    { nombre: 'Arroz Premium', marca: 'Diana', detalle: 'Ver Detalle' },
    { nombre: 'Lapiz Norma 2A', marca: 'Norma', detalle: 'Ver Detalle' },
    { nombre: 'Cuaderno Rayado', marca: 'Éxito', detalle: 'Ver Detalle' },
    { nombre: 'Bolígrafo Azul', marca: 'BIC', detalle: 'Ver Detalle' },
    { nombre: 'Resaltador Amarillo', marca: 'Pelikan', detalle: 'Ver Detalle' },
    { nombre: 'Resaltador Verde', marca: 'Pelikan', detalle: 'Ver Detalle' },
    { nombre: 'Resaltador Naranja', marca: 'Pelikan', detalle: 'Ver Detalle' },
    { nombre: 'Resaltador Rojo', marca: 'Pelikan', detalle: 'Ver Detalle' },
  ];

  const navigation = useNavigation(); // Inicializa navigation

  const menuOptions = [
    { label: 'Productos', icon: require('../assets/producto.png'), route: 'Productos' },
    { label: 'Venta', icon: require('../assets/ventas.png'), route: 'Venta' },   
    { label: 'Análisis', icon: require('../assets/analisis.png'), route: 'Analisis' },   // Añade 'Analisis' como ruta
    { label: 'Gestionar Ventas', icon: require('../assets/gestionar_Ventas.png'), route: 'GestionarVentas' }, // Añade 'GestionarVentas' como ruta
];

  const handleNavigation = (route) => {
    if (route) {
      navigation.navigate(route);
    } else {
      console.log(`Ruta no definida para esta opción.`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => { /* Aquí puedes definir la acción del menú */ console.log('Abrir menú'); }}>
          <MaterialIcons name="menu" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Productos</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Escriba el nombre del producto"
        placeholderTextColor="#555"
        value={busqueda}
        onChangeText={setBusqueda}
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
              <Text style={styles.productText}>{producto.nombre}</Text>
              <Text style={styles.productText}>{producto.marca}</Text>
              <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText}>{producto.detalle}</Text>
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
    height: 90, // Ajusta la altura según sea necesario
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(235,216,160,255)', // El mismo color de fondo
    paddingHorizontal: 10,
    paddingTop: 28, // Considera el paddingTop para el status bar
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    zIndex: 2, // Asegura que esté por encima del contenido
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100, // Ajusta el marginTop para que no se superponga con el encabezado
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