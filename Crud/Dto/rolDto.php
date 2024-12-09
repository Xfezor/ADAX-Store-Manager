<?php

class rolDto
{
    private $id_Rol = 0;
    private $nombreRol = "";
    private $descripcion = "";

    //GETTERS

    public function getId_Rol()
    {
        return $this->id_Rol;
    }

    public function getnombreRol()
    {
        return $this->nombreRol;

    }

    public function getdescripcion()
    {
        return $this->descripcion;
    }

    //SETTERS

    public function setId_Rol($id_Rol)
    {
        $this->id_Rol = $id_Rol;
    }

    public function setnombreRol($nombre_Rol)
    {
        $this->nombreRol = $nombre_Rol;
    }

    public function setdescripcion($descripcion)
    {
        $this->descripcion = $descripcion;
    }
}