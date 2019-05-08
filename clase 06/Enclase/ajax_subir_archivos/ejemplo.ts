/*! Comentario visible en .js

Función para subir una foto al servidor web y 
mostrarla en un tag img, utilizando AJAX

*/
window.onload = () =>{

    MostrarListado();
}
//Comentario no visible en .js

/*Comentario no visible en .js */                    

function SubirFoto() : void {
    
    //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
    let xhr : XMLHttpRequest = new XMLHttpRequest();

    //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
    let foto : any = (<HTMLInputElement> document.getElementById("foto"));

    var nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
    var apellido : string = (<HTMLInputElement> document.getElementById("apellido")).value;
    var sexo : string = (<HTMLInputElement> document.getElementById("sexo")).value;
    var legajo : number = parseInt((<HTMLInputElement> document.getElementById("legajo")).value);
    var sueldo : number = parseFloat((<HTMLInputElement> document.getElementById("sueldo")).value);


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
    form.append('op', "subirFoto");

    //METODO; URL; ASINCRONICO?
    xhr.open('POST', './BACKEND/nexo.php', true);

    //ESTABLEZCO EL ENCABEZADO DE LA PETICION
    xhr.setRequestHeader("enctype", "multipart/form-data");

    //ENVIO DE LA PETICION
    xhr.send(form);

    //FUNCION CALLBACK
    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {

            console.log(xhr.responseText);
            
            let retJSON = JSON.parse(xhr.responseText);
            if(!retJSON.Ok){
                console.error("NO se subió la foto!!!");
            }
            else{
                console.info("Foto subida OK!!!");
                (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/" + retJSON.Path;
                console.log(retJSON.nombre+"-"+retJSON.apellido+"-"+retJSON.sexo+"-"+retJSON.legajo+"-"+retJSON.sueldo);
            }
        }
    };
}

function MostrarListado() {
        //INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRONICAS
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        //INSTANCIO OBJETO FORMDATA
        let form : FormData = new FormData();

        form.append('op', "TraerTodos");
    
        //METODO; URL; ASINCRONICO?
        xhr.open('POST', './BACKEND/nexo.php', true);
    
        //ESTABLEZCO EL ENCABEZADO DE LA PETICION
        xhr.setRequestHeader("enctype", "multipart/form-data");
    
        //ENVIO DE LA PETICION
        xhr.send(form);
    
        //FUNCION CALLBACK
        xhr.onreadystatechange = () => {
    
            if (xhr.readyState == 4 && xhr.status == 200) {
    
                //console.log(xhr.responseText);
                
                //let retJSON = JSON.parse(xhr.responseText);

                (<HTMLDivElement>document.getElementById("mostrar")).innerHTML = xhr.responseText;
            }
        };

}

function Eliminar(param : any) {
    if(confirm("¿Seguro que desea eliminar a: "+param)){
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        //INSTANCIO OBJETO FORMDATA
        let form : FormData = new FormData();
    
        form.append('op',"Eliminar");
    
        var auxstring : string = JSON.stringify(param);
    
        form.append('objeto',auxstring);
    
        //METODO; URL; ASINCRONICO?
        xhr.open('POST', './BACKEND/nexo.php', true);
    
        //ESTABLEZCO EL ENCABEZADO DE LA PETICION
        xhr.setRequestHeader("enctype", "multipart/form-data");
    
        //ENVIO DE LA PETICION
        xhr.send(form);
    
        //FUNCION CALLBACK
        xhr.onreadystatechange = () => {
    
            if (xhr.readyState == 4 && xhr.status == 200) {
    
                //console.log(xhr.responseText);
                
                //let retJSON = JSON.parse(xhr.responseText);
    
                if(xhr.responseText != ""){
                    alert(xhr.responseText);
                }
                else{
                    alert("No logro eliminar a la persona.");
                }
            }
        };
    
    }
}

function Modificar(param:any) {
    if (confirm("¿Esta seguro que desea Modificar a "+param+" ?")) {
        
        var auxnombre : any = prompt("Ingrese nuevo nombre");
        var auxapellido : any = prompt("Ingrese nuevo apellido");
        var auxsueldo : any = prompt("Ingrese nuevo sueldo");

        let xhr : XMLHttpRequest = new XMLHttpRequest();

        let form : FormData = new FormData();

        form.append('op',"Modificar");

        form.append('objeto',JSON.stringify(param));

        form.append('nombreModificado',auxnombre);

        form.append('apellidoModificado',auxapellido);

        form.append('sueldoModificado',auxsueldo);

        xhr.open('POST', './BACKEND/nexo.php', true);

        xhr.setRequestHeader("enctype", "multipart/form-data");

        xhr.send(form);
    
        xhr.onreadystatechange = () => {
    
            if (xhr.readyState == 4 && xhr.status == 200) {
                if(xhr.responseText != ""){
                    alert(xhr.responseText);
                }
                else{
                    alert("No logro modificar a la persona.");
                }
            }
        };




    }
}
/*
function MostrarVentana(){
    var ventana = document.getElementById("miVentana");
    if(ventana != null){
        ventana.style.marginTop = "100px";
        ventana.style.left = ((document.body.clientWidth-350) / 2) +  "px";
        ventana.style.display = "block";
    }
}

function OcultarVentana(){
    var ventana = document.getElementById("miVentana");
    if(ventana != null){ventana.style.display = "none";}
}
*/
 

