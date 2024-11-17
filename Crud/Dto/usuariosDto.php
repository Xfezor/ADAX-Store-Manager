<?php

class UsuarioDto
{
    private $documento = 0;
    private $tipo_doc = "";
    private $contrasena = "";
    private $nombre1 = "";
    private $nombre2 = "";
    private $apellido1 = "";
    private $apellido2 = "";
    private $correo = "";
    private $rol_id_Rol = "";
    private $codigo_invitacion;

    // GETTERS
    public function getDocumento()
    {
        return $this->documento;
    }
    public function getTipo_doc()
    {
        return $this->tipo_doc;
    }
    public function getContrasena()
    {
        return $this->contrasena;
    }
    public function getNombre1()
    {
        return $this->nombre1;
    }
    public function getNombre2()
    {
        return $this->nombre2;
    }
    public function getApellido1()
    {
        return $this->apellido1;
    }
    public function getApellido2()
    {
        return $this->apellido2;
    }
    public function getCorreo()
    {
        return $this->correo;
    }
    public function getRol_id_Rol()
    {
        return $this->rol_id_Rol;
    }
    public function getCodigoInvitacion()
    {
        return $this->codigo_invitacion;
    }

    // SETTERS
    public function setDocumento($documento)
    {
        $this->documento = $documento;
    }
    public function setTipo_doc($tipo_doc)
    {
        $this->tipo_doc = $tipo_doc;
    }
    public function setContrasena($contrasena)
    {
        $this->contrasena = $contrasena;
    }
    public function setNombre1($nombre1)
    {
        $this->nombre1 = $nombre1;
    }
    public function setNombre2($nombre2)
    {
        $this->nombre2 = $nombre2;
    }
    public function setApellido1($apellido1)
    {
        $this->apellido1 = $apellido1;
    }
    public function setApellido2($apellido2)
    {
        $this->apellido2 = $apellido2;
    }
    public function setCorreo($correo)
    {
        $this->correo = $correo;
    }
    public function setRol_id_Rol($rol_id_Rol)
    {
        $this->rol_id_Rol = $rol_id_Rol;
    }
    public function setCodigoInvitacion($codigo_invitacion)
    {
        $this->codigo_invitacion = $codigo_invitacion;
    }
}