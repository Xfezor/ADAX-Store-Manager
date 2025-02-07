<?php

class InventarioDto {
    private $id_inventario;
    private $CantidadInventario;
    private $fechaModificacion;
    private $estado_revision;
    private $tienda_idtienda;


    //GETTERS
    public function getId_inventario() {
        return $this->id_inventario;
    }
    public function getCantidadInventario() {
        return $this->CantidadInventario;
    }
    public function getFechaModificacion() {
        return $this->fechaModificacion;
    }
    public function getEstado_revision() {
        return $this->estado_revision;
    }
    public function getTienda_idtienda() {
        return $this->tienda_idtienda;
    }

    //SETTERS
    public function setId_inventario($id_inventario) {
        $this->id_inventario = $id_inventario;
    }
    public function setCantidadInventario($CantidadInventario) {
        $this->CantidadInventario = $CantidadInventario;
    }
    public function setFechaModificacion($fechaModificacion) {
        $this->fechaModificacion = $fechaModificacion;
    }
    public function setEstado_revision($estado_revision) {
        $this->estado_revision = $estado_revision;
    }
    public function setTienda_idtienda($tienda_idtienda) {
        $this->tienda_idtienda = $tienda_idtienda;
    }
}