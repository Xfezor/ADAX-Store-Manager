<?php

class metodopagoDto
{
    private $ID_Met_pago;

    private $Nombre;

    //GETTERS

    public function getId_metodopago()
    {
        return $this->ID_Met_pago;
    }
    public function getNombre_metodopago()
    {
        return $this->Nombre;
    }
    //SETTERS
    public function setId_metodopago($ID_Met_pago)
    {
        $this->ID_Met_pago = $ID_Met_pago;
    }
    public function setNombre_Metodo($Nombre)
    {
        $this->Nombre = $Nombre;
    }
}