<?php

class clienteDto
{
    private $id_Cliente = 0;
    private $Documento = "";
    private $Nombre1_Cliente = "";
    private $Nombre2_Cliente = "";
    private $Apellido1_Cliente = "";
    private $Apellido2_Cliente = "";
    private $Tipo_documento = "";
    
    // GETTERS
    public function getId_Cliente()
    {
        return $this->id_Cliente;
    }
    public function getDocumento()
    {
        return $this->Documento;
    }
    public function getNombre1_Cliente()
    {
        return $this->Nombre1_Cliente;
    }
    public function getNombre2_Cliente()
    {
        return $this->Nombre2_Cliente;
    }
    public function getApellido1_Cliente()
    {
        return $this->Apellido1_Cliente;
    }
    public function getApellido2_Cliente()
    {
        return $this->Apellido2_Cliente;
    }
    public function getTipo_documento()
    {
        return $this->Tipo_documento;
    }
    

    // SETTERS
    public function setId_Cliente($id_Cliente)
    {
        $this->id_Cliente = $id_Cliente;
    }
    public function setDocumento($Documento)
    {
        $this->Documento = $Documento;
    }
    public function setNombre1_Cliente($Nombre1_Cliente)
    {
        $this->Nombre1_Cliente = $Nombre1_Cliente;
    }
    public function setNombre2_Cliente($Nombre2_Cliente)
    {
        $this->Nombre2_Cliente = $Nombre2_Cliente;
    }
    public function setApellido1_Cliente($Apellido1_Cliente)
    {
        $this->Apellido1_Cliente = $Apellido1_Cliente;
    }
    public function setApellido2_Cliente($Apellido2_Cliente)
    {
        $this->Apellido2_Cliente = $Apellido2_Cliente;
    }
    public function setTipo_documento($Tipo_documento)
    {
        $this->Tipo_documento = $Tipo_documento;
    }
  
}