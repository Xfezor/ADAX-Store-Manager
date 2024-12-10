import React, { createContext, useState } from 'react';

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
        localStorage.setItem('tienda', JSON.stringify(usuarioData));
        localStorage.setItem('codigo_invitacion', JSON.stringify(usuarioData));
        localStorage.setItem('rol', JSON.stringify(usuarioData));
    };

    const cerrarSesion = () => {
        setUsuario(null);
        setTienda(null);
        setCodigoInvitacion(null);
        setRol(null);
        localStorage.removeItem('usuario');
    };

    return (
        <ContextoSesion.Provider value={{ usuario,tienda,codigo_invitacion,rol, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoSesion.Provider>
    );
};