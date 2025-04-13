import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const VentaCarrito = () => {
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([
    { nombre: 'Papaya', precio: 2000, cantidad: 1 },
    { nombre: 'Arroz Diana Premium', precio: 3000, cantidad: 2 },
  ]);
  const [documento, setDocumento] = useState('');

  const modificarCantidad = (index, delta) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = Math.max(1, nuevoCarrito[index].cantidad + delta);
    setCarrito(nuevoCarrito);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity>
          <MaterialIcons name="menu" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Venta</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Escriba el código o nombre del producto"
        placeholderTextColor="#555"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <Text style={styles.title}>Carrito</Text>

      <View style={styles.carritoContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nombre</Text>
          <Text style={styles.headerText}>Precio</Text>
          <Text style={styles.headerText}>Cantidad</Text>
          <Text style={styles.headerText}>Operación</Text>
        </View>
        <ScrollView style={styles.scroll}>
          {carrito.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.nombre}</Text>
              <Text style={styles.cell}>{item.precio}</Text>
              <Text style={styles.cell}>{item.cantidad}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => modificarCantidad(index, 1)} style={styles.opButton}>
                  <Text style={styles.opText}>+1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => modificarCantidad(index, -1)} style={styles.opButton}>
                  <Text style={styles.opText}>-1</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.docContainer}>
        <Text style={styles.label}>Documento</Text>
        <TextInput
          style={styles.docInput}
          placeholder="Ingrese el documento"
          placeholderTextColor="#555"
          value={documento}
          onChangeText={setDocumento}
        />
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Precio Total</Text>
        <Text style={styles.total}>${calcularTotal()}</Text>
        <TouchableOpacity style={styles.pagoBtn}>
          <Text style={styles.pagoText}>Generar Pago</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCEDC0', padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EBD8A0',
    padding: 15,
    borderRadius: 10,
  },
  logo: { width: 100, height: 50, resizeMode: 'contain' },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  searchInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    color: '#000',
  },

  carritoContainer: {
    backgroundColor: '#EBD8A0',
    borderRadius: 10,
    padding: 10,
    maxHeight: 250,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  headerText: { flex: 1, fontWeight: 'bold', textAlign: 'center' },
  scroll: { marginVertical: 5 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  cell: { flex: 1, textAlign: 'center' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'center', flex: 1 },
  opButton: {
    backgroundColor: '#D9534F',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  opText: { color: '#FFF', fontWeight: 'bold' },

  docContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  label: { fontWeight: 'bold', marginRight: 10 },
  docInput: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },

  totalContainer: {
    backgroundColor: '#EBD8A0',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  totalLabel: { fontWeight: 'bold', fontSize: 16 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  pagoBtn: {
    backgroundColor: '#D9534F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  pagoText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#EBD8A0',
    borderRadius: 10,
    marginTop: 10,
  },
  navItem: { alignItems: 'center' },
  icon: { width: 40, height: 40, borderRadius: 20 },
  navText: { fontSize: 12, fontWeight: 'bold' },
});

export default VentaCarrito;
