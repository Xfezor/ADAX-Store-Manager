import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ip, port } from '../utils/ipconfig.js';
import axios from 'axios';

const Contrasena = ({ navigation, route }) => {
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [repetirContrasena, setRepetirContrasena] = useState("");
    const [error, setError] = useState("");

    const handleContinuar = async () => {
        if (nuevaContrasena.trim() === "" || repetirContrasena.trim() === "") {
            setError("Ambos campos de contraseña son obligatorios.");
            return;
        }

        if (nuevaContrasena !== repetirContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError("");

        try {
            const response = await axios.post(`http://${ip}:${port}/adx/ADAX-Store-Manager/Crud/servicios/contrasena_movil.php`, {
                action: "cambiar_contrasena",
                correo: route.params.email, // Asegúrate de que esto venga desde la pantalla anterior
                nuevaContrasena: nuevaContrasena
            });


            if (response.data.status === "success") {
                Alert.alert("Éxito", "Contraseña actualizada correctamente", [
                    { text: "OK", onPress: () => navigation.navigate("IniciarSesion") }
                ]);
            } else {
                setError(data.message || "Error al cambiar la contraseña");
            }
        } catch (err) {
            setError("Error de red o del servidor");
            console.error(err);
        }
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

            <View style={styles.cuerpo}>
                <Text style={styles.titulo}>Nueva Contraseña</Text>

                <View style={styles.cajaInformacion}>
                    <Text style={styles.textoInformacion}>
                        Escriba su nueva contraseña y repítala para confirmarla.
                    </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.etiqueta}>Contraseña</Text>
                    <TextInput
                        style={styles.entrada}
                        placeholder="Escriba su nueva contraseña"
                        placeholderTextColor="#bbb"
                        secureTextEntry
                        value={nuevaContrasena}
                        onChangeText={setNuevaContrasena}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.etiqueta}>Repetir Contraseña</Text>
                    <TextInput
                        style={styles.entrada}
                        placeholder="Repita su nueva contraseña"
                        placeholderTextColor="#bbb"
                        secureTextEntry
                        value={repetirContrasena}
                        onChangeText={setRepetirContrasena}
                    />
                </View>

                {error ? <Text style={styles.errorTexto}>{error}</Text> : null}

                <TouchableOpacity style={styles.boton} onPress={handleContinuar}>
                    <Text style={styles.textoBoton}>Cambiar contraseña</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#FCE7B5',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    encabezado: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 130,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EBD8A0',
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
        padding: 10,
    },
    cuerpo: {
        marginTop: 180,
        alignItems: "center",
        width: "100%",
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
    campo: {
        width: '85%',
        marginBottom: 15,
    },
    etiqueta: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
        textAlign: 'left',
    },
    entrada: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    errorTexto: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
    },
    boton: {
        backgroundColor: '#D9534F',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginTop: 10,
    },
    textoBoton: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Contrasena;
