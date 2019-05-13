/// <reference path="./libs/jquery/node_modules/@types/jquery/index.d.ts" />

/*! Comentario visible en .js

Función para subir una foto al servidor web y 
mostrarla en un tag img, utilizando AJAX

*/
window.onload = () =>{
    MostrarListado();
}

localStorage.setItem("Modificar","false");                   

function SubirFoto() : void {
    //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
    let foto : any = (<HTMLInputElement> document.getElementById("foto"));

    var nombre : any = $("#nombre").val(); //(<HTMLInputElement> document.getElementById("nombre")).value;
    var apellido : any = $("#apellido").val(); //(<HTMLInputElement> document.getElementById("apellido")).value;
    var sexo : any = $("#sexo").val(); //(<HTMLInputElement> document.getElementById("sexo")).value;
    var legajo : any = $("#legajo").val(); //parseInt((<HTMLInputElement> document.getElementById("legajo")).value);
    var sueldo : any = $("#sueldo").val(); //parseFloat((<HTMLInputElement> document.getElementById("sueldo")).value);

    //INSTANCIO OBJETO FORMDATA
    let form : FormData = new FormData();

    //AGREGO PARAMETROS AL FORMDATA:

    //PARAMETRO RECUPERADO POR $_FILES
    form.append('foto', foto.files[0]);

    form.append('nombre',nombre);
    form.append('apellido',apellido);
    form.append('sexo',sexo);
    form.append('legajo',legajo.toString());
    form.append('sueldo',sueldo.toString());

    //PARAMETRO RECUPERADO POR $_POST O $_GET (SEGUN CORRESPONDA)

    if (localStorage.getItem("Modificar")== "true") {
        form.append('op', "Modificar");
        localStorage.setItem("Modificar","false");
    }
    else{
        form.append('op', "subirFoto");
    }

    $.ajax({
        type : 'POST',
        url : './BACKEND/nexo.php',
        dataType : "json",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        async: true
    }).done((json) => {

            if(!json.Ok){
                console.error("NO se subió la foto!!!");
            }
            else{
                console.info("Foto subida OK!!!");
                $("#imgFoto").attr("src","./BACKEND/"+json.Path)
                console.log(json.nombre+"-"+json.apellido+"-"+json.sexo+"-"+json.legajo+"-"+json.sueldo);
            }
    });

}

function MostrarListado() {
        //INSTANCIO OBJETO FORMDATA
        let form : FormData = new FormData();

        form.append('op', "TraerTodos");

        $.ajax({
            type : 'POST',
            url : './BACKEND/nexo.php',
            dataType : "",
            cache: false,
            contentType: false,
            processData: false,
            data: form,
            async: true
        }).done((tabla : string)=>{
            $("#mostrar").html(tabla);
        });

}

function Eliminar(param : any) {
    console.log(param);
    if(confirm("¿Seguro que desea eliminar a: "+JSON.stringify(param))){
        //INSTANCIO OBJETO FORMDATA
        let form : FormData = new FormData();
    
        form.append('op',"Eliminar");
    
        var auxstring : string = JSON.stringify(param);
    
        form.append('objeto',auxstring);
 
        $.ajax({
            type : 'POST',
            url : './BACKEND/nexo.php',
            dataType : "json",
            cache: false,
            contentType: false,
            processData: false,
            data: form,
            async: true
        }).done((mensaje : JSON) =>{
            alert(JSON.stringify(mensaje));
        });

    }
}

function Modificar(param:any) {
    console.log(param);

    $("#imgFoto").attr("src","./BACKEND/"+param.path_info);
    $("#nombre").val(param.nombre);
    $("#apellido").val(param.apellido);
    $("#sexo").val(param.sexo);
    $("#legajo").attr("disabled","true").val(param.legajo);
    $("#sueldo").val(param.sueldo);
    
    if (localStorage.getItem("Modificar")== "false") {
        localStorage.setItem("Modificar","true");
    }
}




