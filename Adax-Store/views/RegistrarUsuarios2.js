import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
const RegistrarUsuarios2 = ({ route, navigation }) => {
  
  const { documento, nombre, apellido1, apellido2 } = route.params;
  
  
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleRegistro = async () => {
    try {
      // Validaciones
      if (!correo || !contrasena || !confirmarContrasena || !codigo) {
        Alert.alert('Error', 'Complete todos los campos');
        return;
      }
  
      if (contrasena !== confirmarContrasena) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
  
      // Payload CORREGIDO (ajustado exactamente a lo que espera PHP)
      const payload = {
        registro: true,
        documento: documento,
        tipoDoc: "CC", // ← Cambiado a mayúscula
        contrasena: contrasena,
        nombre: nombre, // ← Nombre exacto que espera PHP
        nombre2: "", // ← Campo requerido
        apellido: apellido1, // ← Nombre exacto
        apellido2: apellido2,
        email: correo, // ← 'email' en lugar de 'correo'
        codigo_invitacion: codigo
      };
  
      console.log('Payload:', payload); // ← Verifica en consola
  
      const response = await fetch(
        'http://192.168.20.24/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );
  
      const responseText = await response.text();
      console.log('Respuesta cruda:', responseText); // ← Debug crucial
  
      // Intenta parsear JSON solo si hay contenido
      const jsonData = responseText ? JSON.parse(responseText) : {};
      
      if (jsonData.success) {
        Alert.alert('Éxito', jsonData.message || 'Registro exitoso');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', jsonData.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error completo:', error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };
  return (
    <View style={styles.container}>     
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registrar Usuario</Text>
        
        <View style={styles.form}>
          
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico "
            placeholderTextColor="#AFAFAF"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />

          <Text style={styles.label}>contrasena</Text>
          <TextInput
            style={styles.input}
            placeholder="contraseña"
            placeholderTextColor="#AFAFAF"
            value={contrasena}
            onChangeText={setContrasena}
            keyboardType="contraseña"
          />


          <Text style={styles.label}>confirmarContrasena</Text>
          <TextInput
            style={styles.input}
            placeholder="confirmar Contraseña"
            placeholderTextColor="#AFAFAF"
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
            keyboardType="confirmar Contraseña"
          />
          
          <Text style={styles.label}>codigo</Text>
          <TextInput
            style={styles.input}
            placeholder="codigo de invitacion"
            placeholderTextColor="#AFAFAF"
            value={codigo}
            onChangeText={setCodigo}
            keyboardType="codigo de invitacion"
          />


          
          <TouchableOpacity style={styles.button} onPress={handleRegistro}>
            <Text style={styles.buttonText}>Registrar</Text>
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

export default RegistrarUsuarios2;