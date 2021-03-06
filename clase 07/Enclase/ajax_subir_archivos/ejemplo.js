"use strict";
window.onload = function () {
    MostrarListado();
};
localStorage.setItem("Modificar", "false");
function SubirFoto() {
    var xhr = new XMLHttpRequest();
    var foto = document.getElementById("foto");
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var sexo = document.getElementById("sexo").value;
    var legajo = parseInt(document.getElementById("legajo").value);
    var sueldo = parseFloat(document.getElementById("sueldo").value);
    var form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('nombre', nombre);
    form.append('apellido', apellido);
    form.append('sexo', sexo);
    form.append('legajo', legajo.toString());
    form.append('sueldo', sueldo.toString());
    if (localStorage.getItem("Modificar") == "true") {
        form.append('op', "Modificar");
        localStorage.setItem("Modificar", "false");
    }
    else {
        form.append('op', "subirFoto");
    }
    xhr.open('POST', './BACKEND/nexo.php', true);
    xhr.setRequestHeader("enctype", "multipart/form-data");
    xhr.send(form);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var retJSON = JSON.parse(xhr.responseText);
            if (!retJSON.Ok) {
                console.error("NO se subió la foto!!!");
            }
            else {
                console.info("Foto subida OK!!!");
                document.getElementById("imgFoto").src = "./BACKEND/" + retJSON.Path;
                console.log(retJSON.nombre + "-" + retJSON.apellido + "-" + retJSON.sexo + "-" + retJSON.legajo + "-" + retJSON.sueldo);
            }
        }
    };
}
function MostrarListado() {
    var xhr = new XMLHttpRequest();
    var form = new FormData();
    form.append('op', "TraerTodos");
    xhr.open('POST', './BACKEND/nexo.php', true);
    xhr.setRequestHeader("enctype", "multipart/form-data");
    xhr.send(form);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("mostrar").innerHTML = xhr.responseText;
        }
    };
}
function Eliminar(param) {
    console.log(param);
    if (confirm("¿Seguro que desea eliminar a: " + JSON.stringify(param))) {
        var xhr_1 = new XMLHttpRequest();
        var form = new FormData();
        form.append('op', "Eliminar");
        var auxstring = JSON.stringify(param);
        form.append('objeto', auxstring);
        xhr_1.open('POST', './BACKEND/nexo.php', true);
        xhr_1.setRequestHeader("enctype", "multipart/form-data");
        xhr_1.send(form);
        xhr_1.onreadystatechange = function () {
            if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                if (xhr_1.responseText != "") {
                    alert(xhr_1.responseText);
                }
                else {
                    alert("No logro eliminar a la persona.");
                }
            }
        };
    }
}
function Modificar(param) {
    console.log(param);
    document.getElementById("imgFoto").src = "BACKEND/" + param.path_info;
    document.getElementById("nombre").value = param.nombre;
    document.getElementById("apellido").value = param.apellido;
    document.getElementById("sexo").value = param.sexo;
    document.getElementById("legajo").disabled = true;
    document.getElementById("legajo").value = param.legajo;
    document.getElementById("sueldo").value = param.sueldo;
    if (localStorage.getItem("Modificar") == "false") {
        localStorage.setItem("Modificar", "true");
    }
}
//# sourceMappingURL=ejemplo.js.map