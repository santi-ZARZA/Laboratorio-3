"use strict";
window.onload = function () {
    MostrarListado();
};
localStorage.setItem("Modificar", "false");
function SubirFoto() {
    var foto = document.getElementById("foto");
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var sexo = $("#sexo").val();
    var legajo = $("#legajo").val();
    var sueldo = $("#sueldo").val();
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
    $.ajax({
        type: 'POST',
        url: './BACKEND/nexo.php',
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        async: true
    }).done(function (json) {
        if (!json.Ok) {
            console.error("NO se subió la foto!!!");
        }
        else {
            console.info("Foto subida OK!!!");
            $("#imgFoto").attr("src", "./BACKEND/" + json.Path);
            console.log(json.nombre + "-" + json.apellido + "-" + json.sexo + "-" + json.legajo + "-" + json.sueldo);
        }
    });
}
function MostrarListado() {
    var form = new FormData();
    form.append('op', "TraerTodos");
    $.ajax({
        type: 'POST',
        url: './BACKEND/nexo.php',
        dataType: "",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        async: true
    }).done(function (tabla) {
        $("#mostrar").html(tabla);
    });
}
function Eliminar(param) {
    console.log(param);
    if (confirm("¿Seguro que desea eliminar a: " + JSON.stringify(param))) {
        var form = new FormData();
        form.append('op', "Eliminar");
        var auxstring = JSON.stringify(param);
        form.append('objeto', auxstring);
        $.ajax({
            type: 'POST',
            url: './BACKEND/nexo.php',
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            data: form,
            async: true
        }).done(function (mensaje) {
            alert(JSON.stringify(mensaje));
        });
    }
}
function Modificar(param) {
    console.log(param);
    $("#imgFoto").attr("src", "./BACKEND/" + param.path_info);
    $("#nombre").val(param.nombre);
    $("#apellido").val(param.apellido);
    $("#sexo").val(param.sexo);
    $("#legajo").attr("disabled", "true").val(param.legajo);
    $("#sueldo").val(param.sueldo);
    if (localStorage.getItem("Modificar") == "false") {
        localStorage.setItem("Modificar", "true");
    }
}
//# sourceMappingURL=ejemplo.js.map