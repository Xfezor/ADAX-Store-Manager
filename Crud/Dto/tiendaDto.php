<?php

class tiendaDto {
    private $idtienda;
    private $nombreTienda;
    private $direccion;
    private $telefono;
    private $correo;
    private $contrasena;
    private $codigo_invitacion;

    //GETTERS
    public function getIdtienda() {
        return $this->idtienda;
    }
    public function getNombreTienda() {
        return $this->nombreTienda;
    }
    public function getDireccion() {
        return $this->direccion;
    }
    public function getTelefono() {
        return $this->telefono;
    }
    public function getCorreo() {
        return $this->correo;
    }
    public function getContrasena() {
        return $this->contrasena;
    }
    public function getCodigo_invitacion() {
        return $this->codigo_invitacion;
    }

    //SETTERS
    public function setIdtienda($idtienda) {
        $this->idtienda = $idtienda;
    }
    public function setNombreTienda($nombreTienda) {
        $this->nombreTienda = $nombreTienda;
    }
    public function setDireccion($direccion) {
        $this->direccion = $direccion;
    }
    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }
    public function setCorreo($correo) {
        $this->correo = $correo;
    }
    public function setContrasena($contrasena) {
        $this->contrasena = $contrasena;
    }
    public function setCodigo_invitacion($codigo_invitacion) {
        $this->codigo_invitacion = $codigo_invitacion;
    }
}