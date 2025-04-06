import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecuperarContraseña = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = () => {
    if (email.trim() === '') {
      setError('El correo electrónico es obligatorio.');
      return;
    }
    setError('');
    console.log('Enviar código a:', email);
   
    navigation.navigate('OlvidoContrasenaCodigo'); 
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
      <Text style={styles.titulo}>¿Olvidaste tu contraseña?</Text>
      <View style={styles.cajaInformacion}>
        <Text style={styles.textoInformacion}>
          Escriba el correo asociado con su cuenta, así le podremos enviar un código de confirmación para poder cambiar la contraseña.
        </Text>
      </View>
      <Text style={styles.etiqueta}>Correo</Text>
      <TextInput
        style={styles.entrada}
        placeholder="Correo Electrónico"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      {error ? <Text style={styles.errorTexto}>{error}</Text> : null}
      <TouchableOpacity style={styles.boton} onPress={handleSendCode}>
        <Text style={styles.textoBoton}>Enviar Código</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FCE7B5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  encabezado: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
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
    resizeMode: 'contain',
  },
  iconoCerrar: {
    width: 40,
    height: 40,
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
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    textAlign: 'left',
  },
  errorTexto: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
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
  },
  textoBoton: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default RecuperarContraseña;
