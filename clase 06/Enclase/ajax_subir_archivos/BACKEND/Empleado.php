<?php

class Empleado{
    public $nombre;
    public $apellido;
    public $sexo;
    public $legajo;
    public $sueldo;
    public $path_info;


    public function __construct($nom,$ape,$sexo,$leg,$suel,$path){
        $this->nombre = $nom;
        $this->apellido = $ape;
        $this->sexo = $sexo;
        $this->legajo = $leg;
        $this->sueldo = $suel;
        $this->path_info = $path;
    }

    public function ToString(){
        return $this->legajo."-".$this->apellido."-".$this->nombre."-".$this->sexo."-".$this->sueldo."-".$this->path_info;
    }

    public static function Verifica($empleado){
        return isset($empleado);
    }

    public static function Agregar($empleado){
        $retorno = false;

        if (isset($empleado)) {
            try{
            $base = new PDO('mysql:host=localhost;dbname=personas_bd;', 'root','');
    
            $sql = "INSERT INTO empleados (legajo,nombre,apellido,sexo,sueldo,foto) VALUES (:legajo,:nombre,:apellido,:sexo,:sueldo,:foto)";
            //$sql = "INSERT INTO personas (legajo,nombre,apellido,sexo,sueldo,foto) VALUES (".$empleado->legajo.",'".$empleado->nombre."','".$empleado->apellido."','".$empleado->sexo."',".$empleado->sueldo.",'".$empleado->path_info."')";

            $recurso = $base->prepare($sql);
    
            $recurso->bindValue(':legajo', $empleado->legajo, PDO::PARAM_INT);
            $recurso->bindValue(':nombre', $empleado->nombre, PDO::PARAM_STR);
            $recurso->bindValue(':apellido', $empleado->apellido, PDO::PARAM_STR);
            $recurso->bindValue(':sexo', $empleado->sexo, PDO::PARAM_STR);
            $recurso->bindValue(':sueldo', $empleado->sueldo, PDO::PARAM_INT);
            $recurso->bindValue(':foto', $empleado->path_info, PDO::PARAM_STR);

            $recurso->execute();

            $retorno = true;
    
            }
            catch (PDOException $e){
            }
        }


        return $retorno;
    }

    public static function TraerTodos(){
        $retorno = array();
        
        try{
            $base = new PDO('mysql:host=localhost;dbname=personas_bd;', 'root','');
    
            $sql = 'SELECT * FROM empleados';
    
            $recurso = $base->prepare($sql);

            $recurso->execute();

            $recurso->setFetchMode(PDO::FETCH_OBJ);
            
            foreach ($recurso->fetchall() as $empleado) {
                array_push($retorno,new Empleado($empleado->nombre,$empleado->apellido,$empleado->sexo,$empleado->legajo,$empleado->sueldo,$empleado->foto));
            }
    
            }
            catch (PDOException $e){
                $retorno = false;
            }

        return $retorno;
    }

    public static function Eliminar($empleado){
        $retorno = false;

        if (isset($empleado)) {
            try{
            $base = new PDO('mysql:host=localhost;dbname=personas_bd;', 'root','');
    
            $sql = "DELETE FROM empleados WHERE legajo = $empleado->legajo";

            $recurso = $base->prepare($sql);
    
            $retorno = $recurso->execute();
            if($retorno){
                unlink($empleado->path_info);
            }
            }
            catch (PDOException $e){
            }
        }
        return $retorno;
    }

    public static function Modificar($empleado){
        $retorno = false;

        if (isset($empleado)) {
            try{
            $base = new PDO('mysql:host=localhost;dbname=personas_bd;', 'root','');
    
            $sql = "UPDATE empleados SET nombre = '$empleado->nombre', apellido = '$empleado->apellido', sueldo = $empleado->sueldo WHERE legajo = $empleado->legajo";
            //$sql = "INSERT INTO personas (legajo,nombre,apellido,sexo,sueldo,foto) VALUES (".$empleado->legajo.",'".$empleado->nombre."','".$empleado->apellido."','".$empleado->sexo."',".$empleado->sueldo.",'".$empleado->path_info."')";

            $recurso = $base->prepare($sql);

            $retorno = $recurso->execute();
            }
            catch (PDOException $e){
            }
        }


        return $retorno;
    }
}
