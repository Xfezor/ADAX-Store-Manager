<?php

class InventarioDto {
    private $id_inventario;
    private $CantidadInventario;
    private $fechaModificacion;
    private $estado_revision;
    private $tienda_idtienda;


    //GETTERS
    public function getid_inventario() {
        return $this->id_inventario;
    }
    public function getCantidadInventario() {
        return $this->CantidadInventario;
    }
    public function getfechaModificacion() {
        return $this->fechaModificacion;
    }
    public function getestado_revision() {
        return $this->estado_revision;
    }
    public function gettienda_idtienda() {
        return $this->tienda_idtienda;
    }

    //SETTERS
    public function setid_inventario($id_inventario) {
        $this->id_inventario = $id_inventario;
    }
    public function setCantidadInventario($CantidadInventario) {
        $this->CantidadInventario = $CantidadInventario;
    }
    public function setfechaModificacion($fechaModificacion) {
        $this->fechaModificacion = $fechaModificacion;
    }
    public function setestado_revision($estado_revision) {
        $this->estado_revision = $estado_revision;
    }
    public function settienda_idtienda($tienda_idtienda) {
        $this->tienda_idtienda = $tienda_idtienda;
    }
}