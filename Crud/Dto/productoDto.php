<?php

class productoDto {
    private $id_Producto;
    private $Nombre;
    private $Precio_unit;
    private $Descripcion;
    private $Marca;
    private $Categoria;
    private $Presentacion;
    private $Fecha_vencimiento;
    private $Stock;
    private $Stock_Min;
    private $inventario_id_Inventario;


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
        return $this->Descripcion;
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
    public function getinventario_id_Inventario() {
        return $this->inventario_id_Inventario;
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
    public function setCategoría($Categoría) {
        $this->Categoría = $Categoría;
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
    public function setinventario_id_Inventario($inventario_id_Inventario) {
        $this->inventario_id_Inventario = $inventario_id_Inventario;
    }
}