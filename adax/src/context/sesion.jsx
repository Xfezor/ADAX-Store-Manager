import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ContextoSesion = createContext();

export const ProveedorSesion = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [tienda, setTienda] = useState(null);
    const [codigo_invitacion, setCodigoInvitacion] = useState(null);
    const [rol, setRol] = useState(null);
    const [token, setToken] = useState(null);

    const iniciarSesion = (usuarioData,tienda,codigo_invitacion,rol,token) => {
        setUsuario(usuarioData);
        setTienda(tienda);
        setCodigoInvitacion(codigo_invitacion);
        setRol(rol);
        setToken(token);
        // Aquí puedes guardar el token en localStorage o sessionStorage
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        localStorage.setItem('tienda', JSON.stringify(tienda));
        localStorage.setItem('codigo_invitacion', JSON.stringify(codigo_invitacion));
        localStorage.setItem('rol', JSON.stringify(rol));
        localStorage.setItem('token', JSON.stringify(token));
    };

    const navigate = useNavigate();
    const cerrarSesion = () => {
        setUsuario(null);
        setTienda(null);
        setCodigoInvitacion(null);
        setRol(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem('tienda');
        localStorage.removeItem('codigo_invitacion');
        localStorage.removeItem('rol');
        localStorage.removeItem('token');
        navigate("/iniciar_sesion");
    };

    return (
        <ContextoSesion.Provider value={{ usuario,tienda,codigo_invitacion,rol,token, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoSesion.Provider>
    );
};