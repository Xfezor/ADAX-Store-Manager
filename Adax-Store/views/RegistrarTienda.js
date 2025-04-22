import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const RegistrarTienda = ({ navigation }) => {
  const [nombreTienda, setNombreTienda] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSiguiente = () => {
    if (nombreTienda && direccion && telefono) {
      // Navegar a la siguiente pantalla con los datos
      navigation.navigate('RegistrarTiendas2', { nombreTienda, direccion, telefono });
    } else {
      alert('Por favor complete todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registrar Tienda</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nombre Tienda</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el nombre de la tienda *"
            placeholderTextColor="#AFAFAF"
            value={nombreTienda}
            onChangeText={setNombreTienda}
          />

          <Text style={styles.label}>Dirección Tienda</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección de la tienda (opcional)"
            placeholderTextColor="#AFAFAF"
            value={direccion}
            onChangeText={setDireccion}
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono (opcional)"
            placeholderTextColor="#AFAFAF"
            value={telefono}
            onChangeText={setTelefono}
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

export default RegistrarTienda;
