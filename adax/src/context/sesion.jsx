import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ContextoSesion = createContext();

export const ProveedorSesion = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [tienda, setTienda] = useState(null);
    const [codigo_invitacion, setCodigoInvitacion] = useState(null);
    const [rol, setRol] = useState(null);

    const iniciarSesion = (usuarioData,tienda,codigo_invitacion,rol) => {
        setUsuario(usuarioData);
        setTienda(tienda);
        setCodigoInvitacion(codigo_invitacion);
        setRol(rol);
        // Aquí puedes guardar el token en localStorage o sessionStorage
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        localStorage.setItem('tienda', JSON.stringify(tienda));
        localStorage.setItem('codigo_invitacion', JSON.stringify(codigo_invitacion));
        localStorage.setItem('rol', JSON.stringify(rol));
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
        navigate("/iniciar_sesion");
    };

    return (
        <ContextoSesion.Provider value={{ usuario,tienda,codigo_invitacion,rol, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoSesion.Provider>
    );
};