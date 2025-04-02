import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PantallaRecuperarContrasena = ({ navigation }) => {
    const [codigo, setCodigo] = useState("");
    const [error, setError] = useState("");

    const handleContinuar = () => {
        if (codigo.trim() === "") {
            setError("El código de verificación es obligatorio.");
            return;
        }
        setError("");
        navigation.navigate("OlvidoContrasena");
    };

    return (
        <View style={styles.contenedor}>
            <StatusBar backgroundColor="#EBD8A0" barStyle="dark-content" />
            
            {/* Encabezado */}
            <View style={styles.encabezado}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('IniciarSesion')}>
                    <Ionicons name="close" size={40} color="black" style={styles.iconoCerrar} />
                </TouchableOpacity>
            </View>

          
            <View style={{ marginTop: 150, alignItems: "center", width: "100%" }}>
                <Text style={styles.titulo}>¿Olvidaste tu contraseña?</Text>
                
                <View style={styles.cajaInformacion}>
                    <Text style={styles.textoInformacion}>
                        Escriba el código que fue enviado a su correo electrónico
                    </Text>
                </View>

                <Text style={styles.etiqueta}>Código de verificación</Text>
                <TextInput
                    style={styles.entrada}
                    placeholder="Código de verificación"
                    placeholderTextColor="#bbb"
                    value={codigo}
                    onChangeText={setCodigo}
                />
                {error ? <Text style={styles.errorTexto}>{error}</Text> : null}

                <TouchableOpacity style={styles.boton} onPress={handleContinuar}>
                    <Text style={styles.textoBoton}>Continuar</Text>
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
        width: '83%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
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

export default PantallaRecuperarContrasena;
