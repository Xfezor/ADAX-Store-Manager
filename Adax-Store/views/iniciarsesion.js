import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const IniciarSesion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState('empleado');
  
  // Variables de conexión
  const serverIP = "192.168.0.12"; // Asegúrate de que esta sea la IP correcta de tu servidor
  const serverPort = "80"; // Puerto predeterminado para HTTP

  const login = async () => {
    try {
      const response = await fetch(`http://${serverIP}:${serverPort}/adx/ADAX-Store-Manager/Crud/login/procesologin.php?tipo=${selectedTab}&email=${email}&contrasena=${password}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log('Login successful:', data);
      // Si el login es exitoso, navega a la pantalla de Actualizar
      navigation.navigate('Actualizar');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Intente de nuevo.');
    }
  };

  const handleLogin = () => {
    // Verificar si los campos de correo y contraseña están completos
    if (!email || !password) {
      Alert.alert('Campos incompletos', 'Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }
    // Ejecuta la función de login
    login();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.clock}>9:31</Text>
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

        <TouchableOpacity>
          <Text style={styles.link}>
            ¿Eres usuario nuevo? Regístrate <Text style={styles.highlight}>Aquí</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('OlvidoContrasenaCorreo')}>
          <Text style={styles.link}>
            ¿Olvidaste tu contraseña? Ingresa <Text style={styles.highlight}>Aquí</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
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
  clock: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 16,
    color: '#333',
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
});

export default IniciarSesion;
