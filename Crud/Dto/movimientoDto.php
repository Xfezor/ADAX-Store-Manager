<?php

class MovimientoDto {
    private $id_Movimiento;
    private $cantidad_despues;
    private $fecha_movimiento;
    private $fecha_modificacion;
    private $estado_despues;
    private $id_tienda;

    //GETTERS
    public function getId_Movimiento() {
        return $this->id_Movimiento;
    }
    public function getCantidad_despues() {
        return $this->cantidad_despues;
    }
    public function getFecha_movimiento() {
        return $this->fecha_movimiento;
    }
    public function getFecha_modificacion() {
        return $this->fecha_modificacion;
    }
    public function getEstado_despues() {
        return $this->estado_despues;
    }
    public function getId_tienda() {
        return $this->id_tienda;
    }
    //SETTERS
    public function setId_Movimiento($id_Movimiento) {
        $this->id_Movimiento = $id_Movimiento;
    }
    public function setCantidad_despues($cantidad_despues) {
        $this->cantidad_despues = $cantidad_despues;
    }
    public function setFecha_movimiento($fecha_movimiento) {
        $this->fecha_movimiento = $fecha_movimiento;
    }
    public function setFecha_modificacion($fecha_modificacion) {
        $this->fecha_modificacion = $fecha_modificacion;
    }
    public function setEstado_despues($estado_despues) {
        $this->estado_despues = $estado_despues;
    }
    public function setId_tienda($id_tienda) {
        $this->id_tienda = $id_tienda;
    }
}