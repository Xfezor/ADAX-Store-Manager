import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const ActualizarDatos = ({ navigation }) => {
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("CC");
  const [modalVisible, setModalVisible] = useState(false);
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [serverIP, setServerIP] = useState('192.168.10.16');
  const [serverPort, setServerPort] = useState('80'); 

  const ObtnerDatosClienteSesion = async () => {
    try { 
      const response = await fetch(`https://${serverIP}:${serverPort}/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuario.php?obtenerUsuario=${documento}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log('Datos del cliente:', data);
      if (data) {
        setPrimerNombre(data.primer_nombre);
        setSegundoNombre(data.segundo_nombre);
        setPrimerApellido(data.primer_apellido);
        setSegundoApellido(data.segundo_apellido);
        setCorreo(data.correo);
        setTipoDocumento(data.tipo_documento);
      } else {
        console.log('No se encontraron datos para el documento proporcionado.');
      }
    }
    catch (error) {
      console.error('Error al obtener los datos del cliente:', error);
    }
  }
  return (
    <View style={styles.contenedor}>
      <StatusBar backgroundColor="#EBD8A0" barStyle="dark-content" />
      <View style={styles.encabezado}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity
          onPress={() => {
            console.log("Icono presionado");
            navigation.navigate('MenuPrincipal');
          }}
        >
          <Ionicons name="close" size={40} color="black" style={styles.iconoCerrar} />
        </TouchableOpacity>

      </View>
      <ScrollView contentContainerStyle={styles.scrollContenedor}>
        <View style={styles.encabezadoContenedor}>
          <Text style={styles.encabezadoTexto}>Actualizar Datos</Text>
        </View>
        <View style={styles.formularioContenedor}>
          <Text style={styles.etiqueta}>Nombres</Text>
          <TextInput style={styles.entrada} placeholder="Primer Nombre" />
          <TextInput style={styles.entrada} placeholder="Segundo Nombre (opcional)" />

          <Text style={styles.etiqueta}>Apellidos</Text>
          <TextInput style={styles.entrada} placeholder="Primer Apellido" />
          <TextInput style={styles.entrada} placeholder="Segundo Apellido (opcional)" />

          <Text style={styles.etiqueta}>Tipo de Documento</Text>
          <View style={styles.entradaTipoDoc}> 
            <Picker
              selectedValue={tipoDocumento}
              onValueChange={(itemValue) => setTipoDocumento(itemValue)}
            >
              <Picker.Item label="Cédula de Ciudadanía" value="CC" />
              <Picker.Item label="Tarjeta de Identidad" value="TI" />
              <Picker.Item label="Cédula de Extranjería" value="CE" />
              <Picker.Item label="Pasaporte" value="PA" />
            </Picker>
          </View>
          <Text style={styles.etiqueta}>Correo</Text>
          <TextInput style={styles.entrada} placeholder="Correo Electrónico" />
          <Text style={styles.etiqueta}>Contraseña</Text>
          <TextInput style={styles.entrada} placeholder="********" secureTextEntry />
          <TouchableOpacity style={styles.botonEnlace}>
            <Text style={styles.textoEnlace}>¿Quieres cambiar tu contraseña? Haz clic aquí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonConfirmar}>
            <Text style={styles.textoBotonConfirmar}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#FCEDC0",
  },
  encabezado: {
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EBD8A0",
    paddingHorizontal: 20,
    paddingTop: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: "contain",
  },
  scrollContenedor: {
    alignItems: "center",
  },
  encabezadoContenedor: {
    alignItems: "center",
    paddingVertical: 20,
  },
  encabezadoTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  formularioContenedor: {
    backgroundColor: "#EBD8A0",
    padding: 16,
    borderRadius: 10,
    height: 'auto',
    width: '85%',
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginTop: 12,
  },
  entrada: {
    borderWidth: 1,
    borderColor: "none",
    borderRadius: 16,
    marginTop: 5,
    backgroundColor: "#fff",
    padding: 5,
    paddingLeft: 15,
    height: 30, 
    justifyContent: "center",
    fontSize: 14,
  },
  entradaTipoDoc: {
    borderWidth: 1,
    borderColor: "none",
    borderRadius: 16,
    marginTop: 5,
    backgroundColor: "#fff",
    height: 30, 
    justifyContent: "center",
    fontSize: 14,
  },
  
  modalContenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContenido: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  botonEnlace: {
    marginTop: 8,
  },
  textoEnlace: {
    color: "#FF0000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
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

export default ActualizarDatos;
