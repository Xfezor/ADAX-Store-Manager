import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ip, port } from '../utils/ipconfig.js';
import axios from 'axios';

const RecuperarContraseña = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const validarCorreo = () => {
    if (!correo.trim()) return setError('El correo es obligatorio'), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
      return setError('Correo no válido'), false;
    return setError(''), true;
  };

  const enviarCodigo = async () => {
    if (!validarCorreo()) return;

    setCargando(true);
    try {
      const response = await axios.post(
        `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/servicios/contrasena_movil.php`,
        {
          action: 'enviar_codigo', 
          correo: correo
        }
      );


      if (response.datos.message?.includes('enviado correctamente') || datos.status === 'success') {
        navigation.navigate('OlvidoContrasenaCodigo', { email: correo });
        setTimeout(() => Alert.alert('Éxito', datos.message || 'Código enviado'), 500);
      } else if (response.datos.message?.includes('no registrado')) {
        setError('Este correo no está registrado');
      } else {
        throw new Error(response.datos.message || 'Error al enviar código');
      }
    } catch (error) {
      Alert.alert('Error', error.message.includes('Network')
        ? 'Error de conexión'
        : error.message
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={estilos.contenedor}>
      <StatusBar backgroundColor="#EBD8A0" barStyle="dark-content" />
      <View style={estilos.encabezado}>
        <Image source={require('../assets/logo.png')} style={estilos.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('IniciarSesion')}>
          <Ionicons name="close" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={estilos.titulo}>¿Olvidaste tu contraseña?</Text>

      <View style={estilos.cajaInformacion}>
        <Text style={estilos.textoInformacion}>
          Ingresa el correo asociado a tu cuenta para recibir un código de verificación.
        </Text>
      </View>

      <Text style={estilos.etiqueta}>Correo</Text>
      <TextInput
        style={estilos.entrada}
        placeholder="Correo Electrónico"
        placeholderTextColor="#999"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {error ? <Text style={estilos.textoError}>{error}</Text> : null}

      <TouchableOpacity
        style={[estilos.boton, cargando && estilos.botonDeshabilitado]}
        onPress={enviarCodigo}
        disabled={cargando}
      >
        <Text style={estilos.textoBoton}>
          {cargando ? 'Enviando...' : 'Enviar Código'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos optimizados
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FCE7B5',
    paddingTop: 150,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  encabezado: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(235,216,160,255)',
    paddingHorizontal: 20,
    paddingTop: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: 'contain'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center'
  },
  cajaInformacion: {
    backgroundColor: '#E2C673',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    maxWidth: 300
  },
  textoInformacion: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center'
  },
  etiqueta: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5
  },
  entrada: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20
  },
  textoError: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10
  },
  boton: {
    backgroundColor: '#D9534F',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    minWidth: 150
  },
  botonDeshabilitado: {
    backgroundColor: '#AAAAAA'
  },
  textoBoton: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default RecuperarContraseña;