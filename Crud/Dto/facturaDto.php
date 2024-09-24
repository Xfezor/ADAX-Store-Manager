<?php

class facturaDto {
    private $venta_id_Venta;
    private $producto_id_Producto;
    private $Cantidad;
    private $Precio;
    private $Estado;

    //GETTERS
    public function getventa_id_Venta() {
        return $this->venta_id_Venta;
    }
    public function getproducto_id_Producto() {
        return $this->producto_id_Producto;
    }
    public function getCantidad() {
        return $this->Cantidad;
    }
    public function getEstado() {
        return $this->Estado;
    }
    //SETTERS
    public function setventa_id_Venta($venta_id_Venta) {
        $this->venta_id_Venta = $venta_id_Venta;
    }
    public function setproducto_id_Producto($producto_id_Producto) {
        $this->producto_id_Producto = $producto_id_Producto;
    }
    public function setCantidad($Cantidad) {
        $this->Cantidad = $Cantidad;
    }
    public function setEstado($Estado) {
        $this->Estado = $Estado;
    }
}