import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import OlvidoContrasenaCodigo from "./views/olvidocontrasenacodigo";
import OlvidoContrasenaCorreo from "./views/olvidocontrasenacorreo";
import IniciarSesion from "./views/iniciarsesion";
import RegistrarUsuario from "./views/RegistrarUsuario";
import RegistrarUsuarios2 from "./views/RegistrarUsuarios2";
import RegistrarTienda from "./views/RegistrarTienda";
import RegistrarTiendas2 from "./views/RegistrarTiendas2";
import OlvidoContrasena from "./views/contrasenaolvidar";
import MenuPrincipal from "./views/menuPrincipal";
import Actualizar from "./views/actualizar"; 
import GestionarVentas from "./views/gestionarventas";

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
    <Stack.Screen name="RegistrarUsuario" component={RegistrarUsuario} />
    <Stack.Screen name="RegistrarUsuarios2" component={RegistrarUsuarios2} />
    <Stack.Screen name="RegistrarTienda" component={RegistrarTienda} />
    <Stack.Screen name="RegistrarTiendas2" component={RegistrarTiendas2} />
    <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
    <Stack.Screen name="Actualizar" component={Actualizar} />
    <Stack.Screen name="GestionarVentas" component={GestionarVentas} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

