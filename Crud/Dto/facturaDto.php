<?php

class facturaDto {
    private $venta_id_Venta;
    private $producto_id_Producto;
    private $Cantidad;
    private $Precio;
    private $Estado;

    //GETTERS
    public function getVenta_id_Venta() {
        return $this->venta_id_Venta;
    }
    public function getProducto_id_Producto() {
        return $this->producto_id_Producto;
    }
    public function getCantidad() {
        return $this->Cantidad;
    }
    public function getPrecio(){
        return $this->Precio;
    }
    public function getEstado() {
        return $this->Estado;
    }
    //SETTERS
    public function setVenta_id_Venta($venta_id_Venta) {
        $this->venta_id_Venta = $venta_id_Venta;
    }
    public function setProducto_id_Producto($producto_id_Producto) {
        $this->producto_id_Producto = $producto_id_Producto;
    }
    public function setCantidad($Cantidad) {
        $this->Cantidad = $Cantidad;
    }
    public function setPrecio($Precio) {
        $this->Precio = $Precio;
    }
    public function setEstado($Estado) {
        $this->Estado = $Estado;
    }
}