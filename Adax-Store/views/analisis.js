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
    }
  ];

  const menuOptions = [
    { label: 'Productos', icon: require('../assets/producto.png'), route: 'Productos' },
    { label: 'Venta', icon: require('../assets/ventas.png'), route: 'Venta' },        
    { label: 'Análisis', icon: require('../assets/analisis.png'), route: 'Analisis' },   
    { label: 'Gestionar Ventas', icon: require('../assets/gestionar_Ventas.png'), route: 'GestionarVentas' }, 
];

const handleNavigation = (route) => {
  if (route) {
      navigation.navigate(route);
  } else {
      console.log(`Ruta no definida para esta opción.`);
  }
};

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
      
      <View style={styles.encabezado}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('MenuPrincipal')}>
          <Ionicons name="close" size={40} color="black" style={styles.iconoCerrar} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tituloContainer}>
          <Text style={styles.tituloPrincipal}>Analisis</Text>
          
          <View style={styles.leyendaPopularidad}>
            <View style={styles.leyendaItem}>
              <Image source={require('../assets/popular.png')} style={styles.leyendaIcono} />
              <Text style={styles.leyendaTexto}>Popular</Text>
            </View>
            <View style={styles.leyendaItem}>
              <Image source={require('../assets/mediopopular.png')} style={styles.leyendaIcono} />
              <Text style={styles.leyendaTexto}>Medio Popular</Text>
            </View>
            <View style={styles.leyendaItem}>
              <Image source={require('../assets/nopopular.png')} style={styles.leyendaIcono} />
              <Text style={styles.leyendaTexto}>No Popular</Text>
            </View>
          </View>
        </View>

        <View style={styles.tablaContenedor}>
          <View style={styles.filaEncabezado}>
            <Text style={[styles.celda, styles.encabezadoCelda]}>ID</Text>
            <Text style={[styles.celda, styles.encabezadoCelda]}>Producto</Text>
            <Text style={[styles.celda, styles.encabezadoCelda]}>Cantidad</Text>
            <Text style={[styles.celda, styles.encabezadoCelda]}>Estado</Text>
          </View>
          
          <View style={[styles.filaDatos, { backgroundColor: '#EBD8A0' }]}>
            <Text style={styles.celda}>5</Text>
            <Text style={styles.celda}>Papaya</Text>
            <Text style={styles.celda}>20</Text>
            <View style={styles.celda}>
              <View style={styles.popularidadContainer}>
                <Image source={require('../assets/popular.png')} style={styles.iconoPopularidad} />
                <Text style={styles.textoPopularidad}>Popular</Text>
              </View>
            </View>
          </View>
          
          <View style={[styles.filaDatos, { backgroundColor: '#EBD8A0' }]}>
            <Text style={styles.celda}>1</Text>
            <Text style={styles.celda}>Pitaya</Text>
            <Text style={styles.celda}>1</Text>
            <View style={styles.celda}>
              <View style={styles.popularidadContainer}>
                <Image source={require('../assets/nopopular.png')} style={styles.iconoPopularidad} />
                <Text style={styles.textoPopularidad}>No Popular</Text>
              </View>
            </View>
          </View>
          
          <View style={[styles.filaDatos, { backgroundColor: '#EBD8A0' }]}>
            <Text style={styles.celda}></Text>
            <Text style={styles.celda}></Text>
            <Text style={styles.celda}></Text>
            <Text style={styles.celda}></Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.menuInferior}>
        {menuOptions.map((opcion, index) => (
          <TouchableOpacity
              key={index}
              style={styles.opcionMenu}
              onPress={() => handleNavigation(opcion.route)}
          >
            {opcion.icon ? (
              <Image 
                source={opcion.icon} 
                style={styles.iconoMenu}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.iconoPlaceholder} />
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
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EBD8A0',
    paddingHorizontal: 20,
    paddingTop: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    zIndex: 2,
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
  },
  iconoCerrar: {
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 150,
    paddingBottom: 150,
  },
  tituloContainer: {
    marginBottom: 20,
    paddingLeft: 10,
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'left',
  },
  leyendaPopularidad: {
    marginTop: 10,
  },
  leyendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  leyendaIcono: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  leyendaTexto: {
    fontSize: 16,
    color: '#333',
  },
  tablaContenedor: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
    minHeight: 250,
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
    paddingVertical: 15,
    alignItems: 'center',
    minHeight: 60,
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
  iconoPlaceholder: {
    width: 32,
    height: 32,
    marginBottom: 5,
  },
  textoMenu: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ADAXApp;