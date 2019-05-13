<?php

require_once "Empleado.php";

$op = isset($_POST["op"]) ? $_POST["op"] : null;


switch ($op) {

    case "subirFoto":

        $objRetorno = new stdClass();
        $objRetorno->Ok = false;

        $objRetorno->nombre = $_POST["nombre"];
        $objRetorno->apellido = $_POST["apellido"];
        $objRetorno->sexo = $_POST["sexo"];
        $objRetorno->legajo = $_POST["legajo"];
        $objRetorno->sueldo = $_POST["sueldo"];

        $destino = "fotos/".$objRetorno->legajo."_".$objRetorno->apellido."_". date("Ymd_His") . ".jpg";

        //$destino = "./fotos/". date("Ymd_His") . ".jpg";

        
        if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
            if(Empleado::Agregar(new Empleado($objRetorno->nombre,$objRetorno->apellido,$objRetorno->sexo,$objRetorno->legajo,$objRetorno->sueldo,$destino))){
                $objRetorno->Ok = true;
                $objRetorno->Path = $destino;
            }
        
        }
        
        //echo json_encode(Empleado::TraerTodos());
        echo json_encode($objRetorno);

        break;
    case "TraerTodos":
        $tabla = '<table align="center"><tr><td>apellido-------------</td><td>nombre-------------</td><td align="center">legajo-------------</td><td>foto-------------</td><td>acciones</td></tr>';
        $array = Empleado::TraerTodos();

        foreach ($array as $key => $value) {
            $auxjson = json_encode($value);
            $tabla .= '<tr><td>'.$value->apellido.'</td>'.'<td>'.$value->nombre.'</td><td>'.$value->legajo.'</td><td><img src="./BACKEND/'.$value->path_info.'"  width="50px" height="50px"/></td><td><input type="button" title="Eliminar" value="X" onclick=Eliminar('.$auxjson.') /><input type="button" value="M" title="Modificar" onclick=Modificar('.$auxjson.') /></td></tr>';
        }
        
        $tabla .="</table>";
        echo $tabla;

        break;
    case "Eliminar":
        $recibe = json_decode($_REQUEST["objeto"]);

        if(Empleado::Eliminar(new Empleado($recibe->nombre,$recibe->apellido,$recibe->sexo,$recibe->legajo,$recibe->sueldo,$recibe->path_info))){
            echo '{"mensaje":"Logro Eliminar"}';
        }
        else {
            echo '{"mensaje":"Fallo al Eliminar"}';
        }
        break;
    case "Modificar":
        $objRetorno = new stdClass();
        $objRetorno->Ok = false;

        $objRetorno->nombre = $_POST["nombre"];
        $objRetorno->apellido = $_POST["apellido"];
        $objRetorno->sexo = $_POST["sexo"];
        $objRetorno->legajo = $_POST["legajo"];
        $objRetorno->sueldo = $_POST["sueldo"];
        $objRetorno->path_info = $_POST["foto"];


        if(Empleado::Modificar(new Empleado($objRetorno->nombre,$objRetorno->apellido,$objRetorno->sexo,$objRetorno->legajo,$objRetorno->sueldo,$objRetorno->path_info))){
            echo '{"mensaje":"Logro Modificar"}';
        }
        else {
            echo '{"mensaje":"Fallo al Modificar"}';
        }
        
        break;
        default:
        echo ":(";
        break;
}