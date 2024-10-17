<?php

class proveedorDto {
    private $idproveedor;
    private $nombre;
    private $telefono;
    private $email;
    private $id_tienda;

    //GETTERS
    public function getIdproveedor() {
        return $this->idproveedor;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function getTelefono() {
        return $this->telefono;
    }
    public function getEmail() {
        return $this->email;
    }
    public function getId_tienda() {
        return $this->id_tienda;
    }
    

    //SETTERS
    public function setIdproveedor($idproveedor) {
        $this->idproveedor = $idproveedor;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }
    public function setEmail($email) {
        $this->email = $email;
    }
    public function setId_tienda($id_tienda) {
        $this->id_tienda = $id_tienda;
    }
}