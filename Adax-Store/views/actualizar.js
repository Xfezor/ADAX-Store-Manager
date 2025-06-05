import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar, Modal, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip, port, protocol } from '../utils/ipconfig.js';
import axios from 'axios';

const ActualizarDatos = ({ navigation }) => {
  const [documento, setDocumento] = useState(null);

  const [formData, setFormData] = useState({
    documento: "",
    tipoDocumento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",

  });

  useEffect(() => {
    const ObtenerDocumentoSesion = async () => {
      try {
        const documentoGuardado = await AsyncStorage.getItem('documento');
        if (documentoGuardado) {
          setDocumento(documentoGuardado);
          console.log('Documento guardado:', documentoGuardado);
        } else {
          console.log('No se encontró el documento guardado.');
        }
      } catch (error) {
        console.error('Error al obtener el documento guardado:', error);
      }
    }
    ObtenerDocumentoSesion();
  }, []);
  useEffect(() => {
    if (documento) {
      ObtenerDatosUsuarioSesion();

    }
  }, [documento]);
  const ObtenerDatosUsuarioSesion = async () => {
    try {
      const respuesta = await axios.get(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php?obtenerUsuario=${documento}`);
        if (respuesta.status && respuesta.data) {
          const datosUsuario = respuesta.data.data[0];
          const tipoDocumento = datosUsuario[1] || "";
          const primerNombre = datosUsuario[3] || "";
          const segundoNombre = datosUsuario[4] || "";
          const primerApellido = datosUsuario[5] || "";
          const segundoApellido = datosUsuario[6] || "";
          const correo = datosUsuario[7] || "";
          // Actualiza el estado 'formData'
          setFormData({
            documento: documento || "",
            primerNombre: primerNombre || "",
            segundoNombre: segundoNombre || "",
            primerApellido: primerApellido || "",
            segundoApellido: segundoApellido || "",
            tipoDocumento: tipoDocumento || "",
            correo: correo || "",
          });

          console.log("Datos asignados al formulario:", formData);
        } else {
          console.error("La propiedad 'data' no contiene un array válido o está vacía.");
        } 
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  }
  const VerificarDatos = () => {
    if (!formData.primerNombre || !formData.primerApellido || !formData.tipoDocumento || !formData.correo) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos obligatorios.");
      return;
    } else {
      actualizarUsuarioSesion();
    }
  }
  //Prueba dar click en borton confirmar y mostrar en consola los datos nuevos
  const actualizarUsuarioSesion = async () => {
    console.log("Datos enviados al servidor:", JSON.stringify({
      documento: formData.documento,
      nombre1: formData.primerNombre,
      nombre2: formData.segundoNombre,
      apellido1: formData.primerApellido,
      apellido2: formData.segundoApellido,
      tipoDoc: formData.tipoDocumento,
      correo: formData.correo,
      actualizarApp: true,
    }));
    try {
      const respuesta = await axios.put(`${protocol}://${ip}:${port}/adx/ADAX-Store-Manager/Crud/controlador/controlador.usuarios.php?`,
        {
          documento: formData.documento,
          nombre1: formData.primerNombre,
          nombre2: formData.segundoNombre,
          apellido1: formData.primerApellido,
          apellido2: formData.segundoApellido,
          tipoDoc: formData.tipoDocumento,
          email: formData.correo,
          actualizarApp: true,
        }
      );
      if (respuesta.data.success) {
        Alert.alert("Éxito", "Datos actualizados correctamente.");
        navigation.navigate("MenuPrincipal");
      } else {
        Alert.alert("Error", "No se pudieron actualizar los datos.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
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
          <TextInput
            style={styles.entrada}
            value={formData.primerNombre}
            placeholder="Primer Nombre"
            onChangeText={(text) => setFormData({ ...formData, primerNombre: text })}
          />
          <TextInput
            style={styles.entrada}
            value={formData.segundoNombre}
            placeholder="Segundo Nombre (opcional)"
            onChangeText={(text) => setFormData({ ...formData, segundoNombre: text })}
          />

          <Text style={styles.etiqueta}>Apellidos</Text>
          <TextInput
            style={styles.entrada}
            value={formData.primerApellido}
            placeholder="Primer Apellido"
            onChangeText={(text) => setFormData({ ...formData, primerApellido: text })}
          />
          <TextInput
            style={styles.entrada}
            value={formData.segundoApellido}
            placeholder="Segundo Apellido (opcional)"
            onChangeText={(text) => setFormData({ ...formData, segundoApellido: text })}
          />

          <Text style={styles.etiqueta}>Tipo de Documento</Text>
          <View style={styles.entradaTipoDoc}>
            <Picker
              selectedValue={formData.tipoDocumento}
              onValueChange={(itemValue) => setFormData({ ...formData, tipoDocumento: itemValue })}
            >
              <Picker.Item label="Seleccione un tipo de documento" value="" />
              <Picker.Item label="Cédula de Ciudadanía" value="CC" />
              <Picker.Item label="Tarjeta de Identidad" value="TI" />
              <Picker.Item label="Cédula de Extranjería" value="CE" />
              <Picker.Item label="Pasaporte" value="PA" />
            </Picker>
          </View>

          <Text style={styles.etiqueta}>Correo</Text>
          <TextInput
            style={styles.entrada}
            value={formData.correo}
            placeholder="Correo Electrónico"
            onChangeText={(text) => setFormData({ ...formData, correo: text })}
          />
          <TouchableOpacity style={styles.botonConfirmar} onPress={() => VerificarDatos()}>
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
