import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import OlvidoContrasenaCodigo from "./views/olvidocontrasenacodigo";
import OlvidoContrasenaCorreo from "./views/olvidocontrasenacorreo";
import IniciarSesion from "./views/iniciarsesion";
import OlvidoContrasena from "./views/contrasenaolvidar";
import Actualizar from "./views/actualizar"; 

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

