import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export const RegisterScreen = () => {
    const [form, setForm] = useState({
        document: '',
        name: '',
        firstSurname: '',
        secondSurname: ''
    });

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Registro de Usuario</Text>
            
            <Text style={styles.label}>Documento</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Ingrese su documento" 
                onChangeText={(text) => handleChange('document', text)}
                value={form.document}
            />
            
            <Text style={styles.label}>Nombre</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Ingrese su nombre" 
                onChangeText={(text) => handleChange('name', text)}
                value={form.name}
            />

            <Text style={styles.label}>Apellido</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Primer Apellido" 
                onChangeText={(text) => handleChange('firstSurname', text)}
                value={form.firstSurname}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Segundo Apellido" 
                onChangeText={(text) => handleChange('secondSurname', text)}
                value={form.secondSurname}
            />
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFCBD2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#8B2C39',
    },
    label: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: '#8B2C39',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFD9DF',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#E63950',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
