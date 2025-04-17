import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ModificarProducto = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { idProducto } = route.params || {};
    console.log('ID Producto Recibido en ModificarProducto:', idProducto); // <--- LOG PARA DEPURAR

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [cantidadMinima, setCantidadMinima] = useState('');
    const [precio, setPrecio] = useState('');
    const [marca, setMarca] = useState('');
    const [presentacion, setPresentacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [estado, setEstado] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

    useEffect(() => {
        if (idProducto) {
            consultarProducto(idProducto);
        } else {
            Alert.alert("Error", "No se proporcionó un ID de producto para modificar.");
            navigation.goBack(); // Volver si no hay ID
        }
    }, [idProducto]);

    const consultarProducto = async (id) => {
        setIsLoading(true); // Iniciar carga
        try {
            const response = await fetch(`http://192.168.1.11/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php?consultaDatosProducto=${id}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            if (data && data.length > 0) {
                const productoData = data[0];
                setNombre(productoData.Nombre || '');
                setCantidad(productoData.Stock !== undefined ? productoData.Stock.toString() : '');
                setCantidadMinima(productoData.Stock_Min !== undefined ? productoData.Stock_Min.toString() : '');
                setPrecio(productoData.Precio_unit !== undefined ? productoData.Precio_unit.toString() : '');
                setMarca(productoData.Marca || '');
                setPresentacion(productoData.Presentacion || '');
                setDescripcion(productoData.Descripcion || '');
                setCategoria(productoData.Categoria || '');
                setFecha(productoData.Fecha_vencimiento || '');
                setEstado(productoData.Estado !== undefined ? productoData.Estado.toString() : '');
            } else {
                Alert.alert("Error", "No se encontraron datos del producto.");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error al consultar el producto:", error);
            Alert.alert("Error", "Error al conectar con el servidor para consultar el producto.");
            navigation.goBack();
        } finally {
            setIsLoading(false); // Finalizar carga
        }
    };

    const handleCancelar = () => {
        navigation.goBack();
    };

    const modificarProducto = async () => {
        if (!idProducto) {
          Alert.alert("Error", "No se puede modificar el producto sin un ID.");
          return;
        }

        setIsLoading(true); // Iniciar carga para la modificación
        try {
          const formData = new FormData();
          formData.append('id_Producto', idProducto);
          formData.append('nombre', nombre);
          formData.append('cantidad', cantidad);
          formData.append('cantidad_minima', cantidadMinima);
          formData.append('precio', precio);
          formData.append('marca', marca);
          formData.append('presentacion', presentacion);
          formData.append('descripcion', descripcion);
          formData.append('categoria', categoria);
          formData.append('fecha_vencimiento', fecha);
          formData.append('estado', estado);
          formData.append('operacion', 'modificar');

          const response = await fetch('http://192.168.1.11/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php', {
            method: 'POST', 
            body: formData,
            headers: {
              Accept: 'application/json',
            },
          });

          const text = await response.text();
          console.log("Respuesta cruda del servidor (modificar):", text);

          if (!text || text.trim() === "") {
            throw new Error("Respuesta vacía del servidor");
          }

          let data;
          try {
            data = JSON.parse(text);
          } catch (parseError) {
            console.error("Error al parsear JSON (modificar):", parseError);
            throw new Error("La respuesta del servidor no es un JSON válido");
          }

          console.log('Respuesta de modificarProducto:', data);

          if (data?.Operacion === "Producto modificado") {
            Alert.alert("Éxito", "Producto modificado correctamente", [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          } else {
            Alert.alert("Error", data?.Mensaje || "No se pudo modificar el producto");
          }

        } catch (error) {
          console.error("Error al modificar el producto:", error);
          Alert.alert("Error", error.message || "Error al conectar con el servidor");
        } finally {
          setIsLoading(false); // Finalizar carga de la modificación
        }
    };

    if (isLoading) {
        return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    const handleEliminar = () => {
        if (!idProducto) {
            Alert.alert("Error", "No se puede eliminar el producto sin un ID.");
            return;
        }
        Alert.alert("Eliminar producto", "¿Estás seguro de eliminar este producto?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar", style: "destructive", onPress: async () => {
                    try {
                        const formData = new FormData();
                        formData.append('id_Producto', idProducto);
                        formData.append('operacion', 'eliminar');

                        const response = await fetch(`http://192.168.1.11/adx/ADAX-Store-Manager/Crud/controlador/controlador.producto.php`, {
                            method: 'POST',
                            body: formData,
                            headers: {
                                Accept: 'application/json',
                            },
                        });

                        const text = await response.text();
                        console.log('Respuesta cruda del servidor al eliminar:', text);

                        const data = JSON.parse(text);

                        if (data && data.Operacion === true) {
                            Alert.alert("Éxito", "Producto eliminado correctamente", [
                                { text: "OK", onPress: () => navigation.goBack() },
                            ]);
                        } else {
                            Alert.alert("Error", data?.Mensaje || "No se pudo eliminar el producto");
                        }
                    } catch (error) {
                        console.error("Error al eliminar el producto:", error);
                        Alert.alert("Error", "Error al conectar con el servidor para eliminar el producto.");
                    }
                },
            },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity>
                    <MaterialIcons name="menu" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
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
                            <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} placeholder='Descripción' multiline />
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
                        <TouchableOpacity style={styles.applyButton} onPress={modificarProducto}>
                            <Text style={styles.buttonText}>Aplicar Cambios</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleEliminar}>
                            <Text style={styles.buttonText}>Eliminar Producto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomNav}>
                        <View style={styles.navItem}>
                            <Image source={require('../assets/productos.png')} style={styles.icon} />
                            <Text style={styles.navText}>Productos</Text>
                        </View>
                        <View style={styles.navItem}>
                            <Image source={require('../assets/ventas.png')} style={styles.icon} />
                            <Text style={styles.navText}>Ventas</Text>
                        </View>
                        <View style={styles.navItem}>
                            <Image source={require('../assets/analisis.png')} style={styles.icon} />
                            <Text style={styles.navText}>Análisis</Text>
                        </View>
                        <View style={styles.navItem}>
                            <Image source={require('../assets/gestionar_Ventas.png')} style={styles.icon} />
                            <Text style={styles.navText}>Gestionar</Text>
                        </View>
                    </View>
                </View>
            )}
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
    navText: { marginTop: 5, fontSize: 12, fontWeight: 'bold' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCEDC0' },
});

export default ModificarProducto;