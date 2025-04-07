import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  StatusBar,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const popularImages = {
  popular: require('../assets/popular.png'),
  mediopopular: require('../assets/mediopopular.png'),
  nopopular: require('../assets/nopopular.png')
};

const ADAXApp = ({ navigation }) => {
  // Datos para la tabla con imágenes
  const tableData = [
    { 
      id: '5', 
      nombre: 'Papaya', 
      cantidad: '20', 
      popularidad: 'Popular',
      icono: 'popular' 
    },
    { 
      id: '1', 
      nombre: 'Pitaya', 
      cantidad: '1', 
      popularidad: 'No Popular',
      icono: 'nopopular' 
    },
    { 
      id: '3', 
      nombre: 'Mango', 
      cantidad: '15', 
      popularidad: 'Medio Popular',
      icono: 'mediopopular' 
    }
  ];

  const menuOptions = [
    { label: 'Productos', icon: null },
    { label: 'Ventas', icon: require('../assets/ventas.png') },
    { label: 'Análisis', icon: null },
    { label: 'Gestión Venta', icon: null }
  ];

  // Renderizar estado de popularidad con imagen
  const renderPopularidad = (item) => {
    const imageSource = popularImages[item.icono];
    
    return (
      <View style={styles.popularidadContainer}>
        {imageSource ? (
          <Image 
            source={imageSource} 
            style={styles.iconoPopularidad}
            onError={(e) => console.log('Error al cargar imagen:', e.nativeEvent.error)}
          />
        ) : (
          <Text style={styles.textoError}>!</Text>
        )}
        <Text style={styles.textoPopularidad}>{item.popularidad}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EBD8A0" barStyle="dark-content" />
      
      {/* Encabezado */}
      <View style={styles.encabezado}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('IniciarSesion')}>
          <Ionicons name="close" size={40} color="black" style={styles.iconoCerrar} />
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.tituloPrincipal}>Dashboard</Text>
        
        {/* Tabla de productos */}
        <Text style={styles.subtitulo}>Inventario Actual</Text>
        <View style={styles.tablaContenedor}>
          {/* Encabezados de tabla */}
          <View style={styles.filaEncabezado}>
            <Text style={[styles.celda, styles.encabezadoCelda]}>ID</Text>
            <Text style={[styles.celda, styles.encabezadoCelda]}>Producto</Text>
            <Text style={[styles.celda, styles.encabezadoCelda]}>Cantidad</Text>
            <Text style={[styles.celda, styles.encabezadoCelda]}>Estado</Text>
          </View>
          
          {/* Filas de datos */}
          {tableData.map((item) => (
            <View key={item.id} style={styles.filaDatos}>
              <Text style={styles.celda}>{item.id}</Text>
              <Text style={styles.celda}>{item.nombre}</Text>
              <Text style={styles.celda}>{item.cantidad}</Text>
              <View style={styles.celda}>
                {renderPopularidad(item)}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Menú inferior */}
      <View style={styles.menuInferior}>
        {menuOptions.map((opcion, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.opcionMenu}
            onPress={() => console.log(`Seleccionado: ${opcion.label}`)}
          >
            {opcion.icon && (
              <Image source={opcion.icon} style={styles.iconoMenu} />
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
    backgroundColor: '#FDF5E6',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EBD8A0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    zIndex: 2,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  iconoCerrar: {
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 30,
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 15,
  },
  tablaContenedor: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  filaEncabezado: {
    flexDirection: 'row',
    backgroundColor: '#E2C673',
    paddingVertical: 12,
  },
  filaDatos: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  celda: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
    fontSize: 14,
    justifyContent: 'center',
  },
  encabezadoCelda: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  popularidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoPopularidad: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  textoPopularidad: {
    fontSize: 14,
  },
  textoError: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: 5,
  },
  menuInferior: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EBD8A0',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#D4B96A',
  },
  opcionMenu: {
    alignItems: 'center',
    minWidth: 70,
  },
  iconoMenu: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  textoMenu: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ADAXApp;