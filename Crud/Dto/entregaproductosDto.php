<?php

class entregaproductosDto
{
    private $proveedor_idproveedor = 0;
    private $producto_id_Producto = "";
    private $fecha_Entrega = "";
    private $cantidad = "";
    
    // GETTERS
    public function getproveedor_idproveedor()
    {
        return $this->proveedor_idproveedor;
    }
    public function getproducto_id_Producto()
    {
        return $this->producto_id_Producto;
    }
    public function getfecha_Entrega()
    {
        return $this->fecha_Entrega;
    }
    public function getcantidad()
    {
        return $this->cantidad;
    }
    

    // SETTERS
    public function setproveedor_idproveedor($proveedor_idproveedor)
    {
        $this->proveedor_idproveedor = $proveedor_idproveedor;
    }
    public function setproducto_id_Producto($producto_id_Producto)
    {
        $this->producto_id_Producto = $producto_id_Producto;
    }
    public function setfecha_Entrega($fecha_Entrega)
    {
        $this->fecha_Entrega = $fecha_Entrega;
    }
    public function setcantidad($cantidad)
    {
        $this->cantidad = $cantidad;
    }
 
}