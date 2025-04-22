import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const RegistrarUsuarios2 = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro de Usuario</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput style={styles.input} placeholder="Ingresa su correo electrónico" placeholderTextColor="#AFAFAF" />
          
          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} placeholder="Ingresa su nueva contraseña" placeholderTextColor="#AFAFAF" secureTextEntry={true} />
          
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#AFAFAF" secureTextEntry={true} />
          
          <Text style={styles.label}>Código de Invitación</Text>
          <TextInput style={styles.input} placeholder="Ingresa su código de invitación" placeholderTextColor="#AFAFAF" />
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Registrar</Text>
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
    fontWeight: 'Montserrat',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
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
    fontWeight: 'Montserrat',
  },
});

export default RegistrarUsuarios2;