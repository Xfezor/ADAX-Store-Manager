import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity>
          <MaterialIcons name="menu" size={30} color="black" />
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

      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Image source={require('../assets/productos.png')} style={styles.icon} />
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCEDC0', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EBD8A0', padding: 15, borderRadius: 10 },
  logo: { width: 100, height: 50, resizeMode: 'contain' },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
  searchInput: { backgroundColor: '#FFF', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', color: '#000' },

  tableContainer: { 
    backgroundColor: '#EBD8A0', 
    borderRadius: 10, 
    padding: 10, 
    marginVertical: 10,
    maxHeight: 400, 
  },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  tableHeaderText: { fontWeight: 'bold', flex: 1, textAlign: 'center' },

  productList: { flexGrow: 1, maxHeight: 350 }, 
  productRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  productText: { flex: 1, textAlign: 'center' },

  detailButton: { backgroundColor: '#D9534F', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
  detailButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 10, 
    backgroundColor: '#EBD8A0', 
    borderRadius: 10, 
    marginTop: 5 
  },
  navItem: { alignItems: 'center' },
  icon: { width: 40, height: 40, borderRadius: 20 },
  navText: { fontSize: 12, fontWeight: 'bold' },
});

export default Productos;
