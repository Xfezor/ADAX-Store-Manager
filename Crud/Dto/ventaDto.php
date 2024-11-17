<?php

class ventaDto {
    private $id_Venta;
    private $FechaVenta;
    private $HoraVenta;
    private $EstadoVenta;
    private $cliente_id_Cliente;
    private $tienda_idtienda;
    private $metododepago_ID_Met_pago;
    private $usuarios_documento;
    private $usuarios_tienda_idtienda;


    //GETTERS
    public function getId_Venta() {
        return $this->id_Venta;
    }
    public function getFechaVenta() {
        return $this->FechaVenta;
    }
    public function getHoraVenta() {
        return $this->HoraVenta;
    }
    public function getEstadoVenta() {
        return $this->EstadoVenta;
    }
    public function getCliente_id_Cliente() {
        return $this->cliente_id_Cliente;
    }
    public function getTienda_idtienda() {
        return $this->tienda_idtienda;
    }
    public function getMetododepago_ID_Met_pago() {
        return $this->metododepago_ID_Met_pago;
    }
    public function getUsuarios_documento() {
        return $this->usuarios_documento;
    }
    public function getUsuarios_tienda_idtienda() {
        return $this->usuarios_tienda_idtienda;
    }

    //SETTERS
        
    public function setId_Venta($id_Venta) {
        $this->id_Venta = $id_Venta;
    }
    public function setFechaVenta($FechaVenta) {
        $this->FechaVenta = $FechaVenta;
    }
    public function setHoraVenta($HoraVenta) {
        $this->HoraVenta = $HoraVenta;
    }
    public function setEstadoVenta($EstadoVenta) {
        $this->EstadoVenta = $EstadoVenta;
    }
    public function setCliente_id_Cliente($cliente_id_Cliente) {
        $this->cliente_id_Cliente = $cliente_id_Cliente;
    }
    public function setTienda_idtienda($tienda_idtienda) {
        $this->tienda_idtienda = $tienda_idtienda;
    }
    public function setMetododepago_ID_Met_pago($metododepago_ID_Met_pago) {
        $this->metododepago_ID_Met_pago = $metododepago_ID_Met_pago;
    }
    public function setUsuarios_documento($usuarios_documento) {
        $this->usuarios_documento = $usuarios_documento;
    }
    public function setUsuarios_tienda_idtienda($usuarios_tienda_idtienda) {
        $this->usuarios_tienda_idtienda = $usuarios_tienda_idtienda;
    }
    
}