<?php

class clienteDto
{
    private $Documento = "";
    private $Tipo_documento = "";
    private $NombreCliente = "";
    private $ApellidoCliente = "";
    private $Correo = "";
    
    // GETTERS
    public function getDocumento()
    {
        return $this->Documento;
    }
    public function getTipo_documento()
    {
        return $this->Tipo_documento;
    }
    public function getNombreCliente()
    {
        return $this->NombreCliente;
    }
    public function getApellidoCliente()
    {
        return $this->ApellidoCliente;
    }
    public function getCorreo()
    {
        return $this->Correo;
    }
    

    // SETTERS
    public function setDocumento($Documento)
    {
        $this->Documento = $Documento;
    }
    public function setTipo_documento($Tipo_documento)
    {
        $this->Tipo_documento = $Tipo_documento;
    }
    public function setNombreCliente($NombreCliente)
    {
        $this->NombreCliente = $NombreCliente;
    }
    public function setApellidoCliente($ApellidoCliente)
    {
        $this->ApellidoCliente = $ApellidoCliente;
    }
    public function setCorreo($Correo)
    {
        $this->Correo = $Correo;
    }
  
}