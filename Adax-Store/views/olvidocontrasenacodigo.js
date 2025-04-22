import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ip, port } from '../utils/ipconfig.js';
import axios from 'axios';

const PantallaRecuperarContrasena = ({ navigation, route }) => {
  const { email } = route.params;
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validarCodigo = () => {
    if (codigo.trim().length !== 6) {
      setError('El código debe tener 6 dígitos');
      return false;
    }
    setError('');
    return true;
  };

  const verificarCodigo = async () => {
    if (!validarCodigo()) return;

    setLoading(true);
    try {
      const payload = {
        action: 'verificar_codigo',
        correo: email,
        codigo: codigo,
      };

      console.log('Enviando datos:', payload); // <-- DEPURACIÓN

      const response = await fetch(
        `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/servicios/contrasena_movil.php`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log('Respuesta del servidor:', data); // <-- DEPURACIÓN

      if (data.status === 'success') {
        navigation.navigate('OlvidoContrasena', { email, codigo });
      } else {
        throw new Error(data.message || 'Código inválido');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.message.includes('Network')
          ? 'Error de conexión. Verifica tu internet'
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <StatusBar backgroundColor="#EBD8A0" barStyle="dark-content" />
      <View style={styles.encabezado}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('IniciarSesion')}>
          <Ionicons name="close" size={40} color="black" style={styles.iconoCerrar} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 150, alignItems: 'center', width: '100%' }}>
        <Text style={styles.titulo}>¿Olvidaste tu contraseña?</Text>

        <View style={styles.cajaInformacion}>
        <Text style={styles.textoInformacion}>
        Escriba el código que fue enviado a su correo electrónico: {email}
        </Text>

        </View>

        <Text style={styles.etiqueta}>Código de verificación</Text>
        <TextInput
          style={styles.entrada}
          placeholder="Código de verificación"
          placeholderTextColor="#bbb"
          value={codigo}
          onChangeText={setCodigo}
          keyboardType="numeric"
          maxLength={6}
        />
        {error ? <Text style={styles.errorTexto}>{error}</Text> : null}

        <TouchableOpacity style={styles.boton} onPress={verificarCodigo} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.textoBoton}>Continuar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FCE7B5',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    backgroundColor: '#EBD8A0',
    paddingHorizontal: 20,
    paddingTop: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
  },
  iconoCerrar: {
    padding: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  cajaInformacion: {
    backgroundColor: '#E2C673',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    maxWidth: 300,
  },
  textoInformacion: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  etiqueta: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  entrada: {
    width: '83%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorTexto: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  boton: {
    backgroundColor: '#D9534F',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
  },
  textoBoton: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PantallaRecuperarContrasena;
