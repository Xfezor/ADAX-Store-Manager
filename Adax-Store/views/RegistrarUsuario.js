import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegistroUsuario = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro de Usuario</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Documento</Text>
          <TextInput style={styles.input} placeholder="Ingresa su documento" placeholderTextColor="#AFAFAF" />
          
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} placeholder="Ingresa su dos Nombres " placeholderTextColor="#AFAFAF" />
          
          <Text style={styles.label}>Apellido</Text>
          <TextInput style={styles.input} placeholder="Primer Apellido" placeholderTextColor="#AFAFAF" />
          <TextInput style={styles.input} placeholder="Segundo Apellido" placeholderTextColor="#AFAFAF" />
          
          <TouchableOpacity style={styles.button}>
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
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#EBD8A0',
    padding: 25,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    width: '60%',
    fontSize: 30,
    fontWeight: 'Montserrat',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 20,
    fontWeight: 'Montserrat',
    marginTop: 10,
    color: '#000',
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
    marginTop: 5,
    fontSize: 16,
    color: '#333',
    borderWidth: 0,
  },
  button: {
    backgroundColor: '#F85F6A',
    padding: 8,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    width: '50%',
    alignSelf: 'center', // <-- Esto centrará el botón
  },
  
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'Montserrat',
  },
});

export default RegistroUsuario;