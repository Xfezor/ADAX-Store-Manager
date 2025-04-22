import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert, BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { ip, port } from '../utils/ipconfig.js';
import axios from 'axios';

const IniciarSesion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState('empleado');


  const login = async () => {
    try {
      const response = await axios.get(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/login/procesologin.php?tipo=${selectedTab}&email=${email}&contrasena=${password}`);
      console.log('Respuesta del login:', response.data);

      if (response.data.success) {
        const token = response.data.token;
        const userData = jwtDecode(token);
        const codigo = userData.data.codigo_invitacion.toString();
        const usuario = email;
        const tienda = userData.data.nombreTienda;
        const rol = userData.data.rol.toString();

        if (codigo) {
          await AsyncStorage.setItem('codigo_invitacion', codigo);
          await AsyncStorage.setItem('usuario', usuario);
          await AsyncStorage.setItem('tienda', tienda);
          await AsyncStorage.setItem('rol', rol);
          console.log('Código guardado en AsyncStorage:', codigo);
        }
        navigation.navigate('MenuPrincipal');
      } else {
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error en login:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Intente de nuevo.');
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Campos incompletos', 'Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }
    login();
  };

  useEffect(() => {
    const handleBackPress = () => {
      Alert.alert(
        "Salir de la aplicación",
        "¿Estás seguro de que quieres salir?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Salir", onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.png')} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'empleado' && styles.activeTab]}
            onPress={() => setSelectedTab('empleado')}
          >
            <Text style={styles.tabText}>Empleado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'tienda' && styles.activeTab]}
            onPress={() => setSelectedTab('tienda')}
          >
            <Text style={styles.tabText}>Tienda</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electrónico"
          placeholderTextColor="#C4C4C4"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#C4C4C4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {selectedTab === 'tienda' ? (
          <TouchableOpacity onPress={() => navigation.navigate('RegistrarTienda')}>
            <Text style={styles.link}>
              ¿Eres una tienda nueva? Regístrate <Text style={styles.highlight}>Aquí</Text>
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('RegistrarUsuario')}>
            <Text style={styles.link}>
              ¿Eres usuario nuevo? Regístrate <Text style={styles.highlight}>Aquí</Text>
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('OlvidoContrasenaCorreo')}>
          <Text style={styles.link}>
            ¿Olvidaste tu contraseña? Ingresa <Text style={styles.highlight}>Aquí</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonConfirmar} onPress={handleLogin}>
          <Text style={styles.textoBotonConfirmar}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE5C5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#F7D9A9',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E1C590',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 4,
    width: '100%',
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#C29E65',
    borderRadius: 6,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 16,
  },
  link: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  highlight: {
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#E74C3C',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonConfirmar: {
    backgroundColor: "#F85F6A",
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
    height: 40,
    width: "50%",
    justifyContent: "center",
  },
  textoBotonConfirmar: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IniciarSesion;
