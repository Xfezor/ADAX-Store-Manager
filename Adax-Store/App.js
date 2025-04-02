import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importar las vistas (asegúrate de que las rutas sean correctas)
import OlvidoContrasenaCodigo from "./views/olvidocontrasenacodigo";
import OlvidoContrasenaCorreo from "./views/olvidocontrasenacorreo";
import IniciarSesion from "./views/iniciarsesion";
import OlvidoContrasena from "./views/contrasenaolvidar";
import Actualizar from "./views/actualizar"; // Importa el nuevo archivo

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
    initialRouteName="IniciarSesion" 
    screenOptions={{ headerShown: false }}
    >
    <Stack.Screen name="IniciarSesion" component={IniciarSesion} />
    <Stack.Screen name="OlvidoContrasenaCodigo" component={OlvidoContrasenaCodigo} />
    <Stack.Screen name="OlvidoContrasenaCorreo" component={OlvidoContrasenaCorreo} />
    <Stack.Screen name="OlvidoContrasena" component={OlvidoContrasena} />
    <Stack.Screen name="Actualizar" component={Actualizar} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

