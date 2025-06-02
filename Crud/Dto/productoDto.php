<?php

class productoDto {
    private $id_Producto = 0;
    private $Nombre = "";
    private $Precio_unit = 0;
    private $Descripción = "";
    private $Marca = "";
    private $Categoria = "";
    private $Presentacion = "";
    private $Fecha_vencimiento;
    private $Stock = 0;
    private $Stock_Min = 0;
    private $estado = 0;
    private $inventario_id_Inventario = 0;
    private $idProveedor = 0;

    //GETTERS
    public function getId_Producto() {
        return $this->id_Producto;
    }
    public function getNombre() {
        return $this->Nombre;
    }
    public function getPrecio_unit() {
        return $this->Precio_unit;
    }
    public function getDescripcion() {
        return $this->Descripción;
    }
    public function getMarca() {
        return $this->Marca;
    }
    public function getCategoria() {
        return $this->Categoria;
    }
    public function getPresentacion() {
        return $this->Presentacion;
    }
    public function getFecha_vencimiento() {
        return $this->Fecha_vencimiento;
    }
    public function getStock() {
        return $this->Stock;
    }
    public function getStock_Min() {
        return $this->Stock_Min;
    }
    public function getEstado() {
        return $this->estado;
    }
    public function getinventario_id_Inventario() {
        return $this->inventario_id_Inventario;
    }
    public function getIdProveedor() {
        return $this->idProveedor;
    }


    //SETTERS
    public function setId_Producto($id_Producto) {
        $this->id_Producto = $id_Producto;
    }
    public function setNombre($Nombre) {
        $this->Nombre = $Nombre;
    }
    public function setPrecio_unit($Precio_unit) {
        $this->Precio_unit = $Precio_unit;
    }
    public function setDescripción($Descripción) {
        $this->Descripción = $Descripción;
    }
    public function setMarca($Marca) {
        $this->Marca = $Marca;
    }
    public function setCategoría($Categoria) {
        $this->Categoria = $Categoria;
    }
    public function setPresentacion($Presentacion) {
        $this->Presentacion = $Presentacion;
    }
    public function setFecha_vencimiento($Fecha_vencimiento) {
        $this->Fecha_vencimiento = $Fecha_vencimiento;
    }
    public function setStock($Stock) {
        $this->Stock = $Stock;
    }
    public function setStock_Min($Stock_Min) {
        $this->Stock_Min = $Stock_Min;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }
    public function setinventario_id_Inventario($inventario_id_Inventario) {
        $this->inventario_id_Inventario = $inventario_id_Inventario;
    }
    public function setIdProveedor($idProveedor) {
        $this->idProveedor = $idProveedor;
    }
}