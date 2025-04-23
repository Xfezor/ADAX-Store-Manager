import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
const RegistrarUsuario = ({ navigation }) => {
  
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');

  
  const handleSiguiente = () => {
    if (!documento || !nombre || !apellido1 || !apellido2) {
      Alert.alert('Error', 'Complete todos los campos', [], { cancelable: true });
      return;
    }
    navigation.navigate('RegistrarUsuarios2', { documento, nombre, apellido1, apellido2 });
  };

  return (
    <View style={styles.container}>
      
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registrar Usuario</Text>
        
        <View style={styles.form}>
         
          <Text style={styles.label}>Documento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese documento "
            placeholderTextColor="#AFAFAF"
            value={documento}
            onChangeText={setDocumento}
          />

          <Text style={styles.label}>nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese nombres "
            placeholderTextColor="#AFAFAF"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>apellido1</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese primer apellido "
            placeholderTextColor="#AFAFAF"
            value={apellido1}
            onChangeText={setApellido1}
          />

          <Text style={styles.label}>apellido2</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese segundo apellido "
            placeholderTextColor="#AFAFAF"
            value={apellido2}
            onChangeText={setApellido2}
          />


          
          <TouchableOpacity style={styles.button} onPress={handleSiguiente}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEDC0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
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
  title: {
    fontSize: 40,
    fontFamily: 'Montserrat',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Montserrat',
    marginTop: 10,
    color: '#000',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    marginTop: 5,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#D3A86A',
  },
  button: {
    backgroundColor: '#F85F6A',
    padding: 8,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat',
  },
});

export default RegistrarUsuario;