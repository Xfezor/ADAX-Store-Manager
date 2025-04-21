import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { ip, port } from '../utils/ipconfig.js';

const RegistrarTiendas2 = ({ route, navigation }) => {
  const { nombreTienda, direccion, telefono } = route.params;
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleRegistrar = async () => {
    if (!correo || !contrasena || !confirmarContrasena) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }
    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const payload = {
      registroTienda: true,
      nombreTienda,
      direccion,
      telefono,
      email: correo,
      contrasena,
    };

    try {
      const response = await fetch(
        `http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.tienda.php`,
        
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();
      if (json.success) {
        Alert.alert('Éxito', json.mensaje || 'Tienda registrada');
        navigation.reset({
          index: 0,
          routes: [{ name: 'RegistrarTienda' }],
        });
      } else {
        Alert.alert('Error', json.mensaje || 'No se pudo registrar la tienda');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de conexión', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registrarse</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa su correo electrónico"
            placeholderTextColor="#AFAFAF"
            autoCapitalize="none"
            keyboardType="email-address"
            value={correo}
            onChangeText={setCorreo}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa su contraseña"
            placeholderTextColor="#AFAFAF"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
          />

          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Repite la contraseña"
            placeholderTextColor="#AFAFAF"
            secureTextEntry
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegistrar}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCEDC0', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 20 },
  formContainer: {
    backgroundColor: '#EBD8A0',
    padding: 25,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: { fontSize: 40, fontFamily: 'Montserrat-Bold', marginBottom: 10, color: '#000', textAlign: 'center' },
  form: { width: '100%' },
  label: { fontSize: 20, fontFamily: 'Montserrat-Bold', marginTop: 10, color: '#000' },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    marginTop: 5,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#D3A86A',
    fontFamily: 'Montserrat-Regular',
  },
  button: { backgroundColor: '#F85F6A', padding: 8, borderRadius: 15, alignItems: 'center', marginTop: 30, width: '50%', alignSelf: 'center' },
  buttonText: { color: 'white', fontSize: 20, fontFamily: 'Montserrat-Bold' },
});

export default RegistrarTiendas2;
