import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const ActualizarDatos = () => {
  const [tipoDocumento, setTipoDocumento] = useState("CC");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.contenedor}>
      <StatusBar backgroundColor="#EBD8A0" barStyle="dark-content" />
      <View style={styles.encabezado}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Ionicons name="close" size={40} color="black" style={styles.iconoCerrar} />
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
          <TouchableOpacity style={styles.entrada} onPress={() => setModalVisible(true)}>
            <Text> 
              {tipoDocumento === "CC" ? "Cédula de Ciudadanía" : 
              tipoDocumento === "TI" ? "Tarjeta de Identidad" : 
              tipoDocumento === "CE" ? "Cédula de Extranjería" : "Pasaporte"}
            </Text>
          </TouchableOpacity>
          
          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContenedor}>
              <View style={styles.modalContenido}>
                <Picker
                  selectedValue={tipoDocumento}
                  onValueChange={(itemValue) => {
                    setTipoDocumento(itemValue);
                    setModalVisible(false);
                  }}
                >
                  <Picker.Item label="Cédula de Ciudadanía" value="CC" />
                  <Picker.Item label="Tarjeta de Identidad" value="TI" />
                  <Picker.Item label="Cédula de Extranjería" value="CE" />
                  <Picker.Item label="Pasaporte" value="PA" />
                </Picker>
              </View>
            </View>
          </Modal>
          
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
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
  iconoCerrar: {
    width: 40,
    height: 40,
  },
  scrollContenedor: {
    paddingTop: 130,
    paddingHorizontal: 16,
  },
  encabezadoContenedor: {
    alignItems: "center",
    paddingVertical: 10,
  },
  encabezadoTexto: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  formularioContenedor: {
    backgroundColor: "#EBD8A0",
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 48,
    marginTop: 4,
    minHeight: 400,
  },
  etiqueta: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 12,
  },
  entrada: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 16,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
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
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  textoBotonConfirmar: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ActualizarDatos;
