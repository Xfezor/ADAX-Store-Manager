import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  Image, Alert, ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip, port } from '../utils/ipconfig.js';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ModificarProducto = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idProducto } = route.params || {};

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [cantidadMinima, setCantidadMinima] = useState('');
  const [precio, setPrecio] = useState('');
  const [marca, setMarca] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('1');
  const [proveedorActual, setProveedorActual] = useState('');
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
  const [proveedoresDatos, setProveedoresDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const codigo_invitacion = AsyncStorage.getItem('codigo_invitacion');


  useEffect(() => {
    if (idProducto) {
      consultarProducto(idProducto);
      cargarProveedoresDeTienda(codigo_invitacion);
    } else {
      Alert.alert("Error", "No se proporcionó un ID de producto.");
      navigation.goBack();
    }
  }, [idProducto]);

  const cargarProveedoresDeTienda = async () => {
    let codigo_invitacion = await AsyncStorage.getItem('codigo_invitacion');
    console.log('Código de invitación:', codigo_invitacion);
    codigo_invitacion = parseInt(codigo_invitacion);
    try {
      const response = await fetch(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.proveedor.php?listarNombreID=true&codigo_invitacion=${codigo_invitacion}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        const proveedoresFiltrados = data.map((proveedor) => ({
          id: proveedor[1], // Asegúrate de que estas propiedades existan
          nombre: proveedor[0],
        }));
        setProveedoresDatos(proveedoresFiltrados);
      } else {
        console.warn('No se recibieron datos de proveedores o el formato es incorrecto.');
      }
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    }
  };

  const consultarProducto = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?consultaDatosProducto=${id}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const producto = data[0];
        setNombre(producto[0] || '');
        setMarca(producto[1] || '');
        setPrecio(producto[2]?.toString() || '');
        setDescripcion(producto[3] || '');
        setCategoria(producto[5] || '');
        setPresentacion(producto[6] || '');
        setFecha(producto[7] || '');
        setCantidad(producto[8]?.toString() || '');
        setCantidadMinima(producto[9]?.toString() || '');
        setEstado(producto[10]?.toString() || '1');
        setProveedorActual(producto[11] || '');
        setProveedorSeleccionado(producto[12] || '');
      } else {
        Alert.alert("Error", "Producto no encontrado.");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error al consultar producto:", error);
      Alert.alert("Error", "No se pudieron obtener los datos del producto.");
    } finally {
      setIsLoading(false);
    }
  };

  const modificarProducto = async () => {
    setIsLoading(true);
    try {
      const datosProducto = {
        modificarProducto: idProducto,
        nombre,
        stock: cantidad,
        stock_min: cantidadMinima,
        precio,
        marca,
        presentacion,
        descripcion,
        categoria,
        fechaVencimiento: fecha,
        estado,
        idProveedor: proveedorSeleccionado
      };

      const response = await fetch(
        `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosProducto),
        }
      );

      const text = await response.text();
      if (!text.trim()) throw new Error("Respuesta vacía del servidor.");
      const data = JSON.parse(text);

      if (data.mensaje?.toLowerCase().includes("actualizado")) {
        Alert.alert("Éxito", "Producto modificado correctamente.");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.mensaje || "No se pudo modificar el producto.");
      }
    } catch (error) {
      console.error("Error al modificar:", error);
      Alert.alert("Error", error.message || "Hubo un problema al modificar el producto.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEliminar = () => {
    if (!idProducto) {
      Alert.alert("Error", "No se puede eliminar sin ID.");
      return;
    }

    Alert.alert("Eliminar producto", "¿Seguro que deseas eliminar este producto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar", style: "destructive", onPress: async () => {
          try {
            const response = await axios.delete(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?id_Producto=${idProducto}`);

            if (response.data?.Operacion === true) {
              Alert.alert("Éxito", "Producto eliminado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } else {
              Alert.alert(
                "Error",
                response.data?.Mensaje || "No se pudo eliminar el producto."
              );
            }
          } catch (error) {
            console.error("Error al eliminar:", error);
            Alert.alert(
              "Error",
              "Hubo un problema al intentar eliminar el producto. Inténtalo nuevamente."
            );
          }
        },
      },
    ]);
  };

  const handleCancelar = () => navigation.goBack();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('MenuPrincipal')} >
          <MaterialIcons name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.label}>Estado Actual</Text>
        <Text style={styles.radio}>
          {estado === "1" ? "⚫ Disponible ⚪ No Disponible" : "⚪ Disponible ⚫ No Disponible"}
        </Text>
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
          <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} placeholder='Descripción' multiline />
        </View>
        <View style={[styles.column, { marginLeft: 10 }]}>
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
        <View style={{ flex: 1, marginRight: 5 }}>
          <Text style={styles.label}>Proveedor actual</Text>
          <TextInput style={styles.input} value={proveedorActual} editable={false} placeholder='Proveedor' />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Text style={styles.label}>Cambiar proveedor</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={proveedorSeleccionado}
              onValueChange={(itemValue) => setProveedorSeleccionado(itemValue)}
            >
              <Picker.Item label="Seleccione un proveedor" value="" />
              {proveedoresDatos.map((proveedor, index) => (
                <Picker.Item
                  key={proveedor.id || index} // Usa el índice como respaldo si `id` está vacío
                  label={proveedor.nombre} // Muestra un valor predeterminado si `nombre` está vacío
                  value={proveedor.id || ''} // Asegúrate de que el valor sea válido
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.applyButton} onPress={modificarProducto}>
        <Text style={styles.buttonText}>Aplicar Cambios</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleEliminar}>
          <Text style={styles.buttonText}>Eliminar Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCEDC0', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EBD8A0', padding: 20, borderRadius: 10, marginBottom: 10 },
  backButton: { marginRight: 10 },
  logo: { width: 120, height: 60, resizeMode: 'contain' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  radio: { fontSize: 14 },
  formContainer: { flexDirection: 'row', marginBottom: 10 },
  column: { flex: 1 },
  input: { backgroundColor: '#FFF', padding: 10, borderRadius: 25, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A0AEC0',
    marginBottom: 15,
    height: 60, // Aumenta la altura para que el Picker sea visible
    justifyContent: 'center', // Centra el contenido verticalmente
    paddingHorizontal: 10, // Ajusta el padding interno
    elevation: 3, // Sombra para mejor visibilidad
  },
  applyButton: { backgroundColor: '#537182', padding: 15, borderRadius: 25, alignItems: 'center', marginBottom: 10 },
  deleteButton: { backgroundColor: '#F85F6A', padding: 15, borderRadius: 25, alignItems: 'center', flex: 1, marginRight: 5 },
  cancelButton: { backgroundColor: '#F85F6A', padding: 15, borderRadius: 25, alignItems: 'center', flex: 1, marginLeft: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ModificarProducto;