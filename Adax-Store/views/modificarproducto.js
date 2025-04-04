import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ModificarProducto = () => {
  const [nombre, setNombre] = useState('Papaya');
  const [cantidad, setCantidad] = useState('8');
  const [cantidadMinima, setCantidadMinima] = useState('1');
  const [precio, setPrecio] = useState('1500');
  const [marca, setMarca] = useState('Frutas');
  const [presentacion, setPresentacion] = useState('Peso (kg o Lb)');
  const [descripcion, setDescripcion] = useState('Fruta blanda y jugosa');
  const [categoria, setCategoria] = useState('Frutas');
  const [fecha, setFecha] = useState('03/27/2025');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity>
          <MaterialIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.label}>Estado Actual</Text>
        <Text style={styles.radio}>⚪ No Disponible ⚫ Disponible</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder='Nombre' />
          <Text style={styles.label}>Cantidad Mínima</Text>
          <TextInput style={styles.input} value={cantidadMinima} onChangeText={setCantidadMinima} keyboardType='numeric' placeholder='Cantidad Mínima' />
          <Text style={styles.label}>Marca</Text>
          <TextInput style={styles.input} value={marca} onChangeText={setMarca} placeholder='Marca' />
          <Text style={styles.label}>Descripción</Text>
          <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} placeholder='Descripción' />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput style={styles.input} value={cantidad} onChangeText={setCantidad} keyboardType='numeric' placeholder='Cantidad' />
          <Text style={styles.label}>Precio</Text>
          <TextInput style={styles.input} value={precio} onChangeText={setPrecio} keyboardType='numeric' placeholder='Precio' />
          <Text style={styles.label}>Presentación</Text>
          <TextInput style={styles.input} value={presentacion} onChangeText={setPresentacion} placeholder='Presentación' />
          <Text style={styles.label}>Categoría</Text>
          <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder='Categoría' />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput style={styles.input} value={fecha} onChangeText={setFecha} placeholder='Fecha' />
        </View>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.buttonText}>Aplicar Cambios</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Eliminar Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
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
          <Text style={styles.navText}>Gestionar</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCEDC0', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EBD8A0', padding: 20, borderRadius: 10, marginBottom: 10 },
  logo: { width: 120, height: 60, resizeMode: 'contain' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  radio: { fontSize: 14 },
  formContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  column: { flex: 1, marginRight: 10 },
  input: { backgroundColor: '#FFF', padding: 10, borderRadius: 25, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  deleteButton: { backgroundColor: '#F85F6A', padding: 15, borderRadius: 25, alignItems: 'center', marginLeft: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  applyButton: { backgroundColor: '#537182', padding: 15, borderRadius: 25, alignItems: 'center', width: '48%' },
  cancelButton: { backgroundColor: '#F85F6A', padding: 15, borderRadius: 25, alignItems: 'center', width: '48%' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, marginTop: 20 },
  navItem: { alignItems: 'center' },
  icon: { width: 50, height: 50, borderRadius: 25 },
  navText: { marginTop: 5, fontSize: 12, fontWeight: 'bold' }
});

export default ModificarProducto;
